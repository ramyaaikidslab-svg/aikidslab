/* Python runner worker. Loads the self-hosted Pyodide once, then runs learner
   code with captured output, scripted input(), an output cap, and friendly
   error messages. The main thread kills and restarts this worker on timeout,
   which is how infinite loops are stopped. */
const base = new URL(self.location.href).searchParams.get('base');

const HELPER = `
import sys, io, builtins, ast, traceback

class _Cap(io.StringIO):
    LIMIT = 20000
    def write(self, s):
        if self.tell() + len(s) > self.LIMIT:
            super().write(s[: max(0, self.LIMIT - self.tell())])
            raise RuntimeError("Your program printed too much output (over 20,000 characters). Check your loop.")
        return super().write(s)

def _friendly(e, code):
    name = type(e).__name__
    line = None
    if isinstance(e, SyntaxError):
        line = e.lineno
    else:
        for fr in traceback.extract_tb(e.__traceback__):
            if fr.filename == "<your code>":
                line = fr.lineno
    msg = str(e)
    tips = {
        "NameError": "Python doesn't know this name. Check the spelling, and make sure the variable was created before you use it.",
        "SyntaxError": "Python can't read this line. Look for a missing bracket, quote or colon.",
        "IndentationError": "The spaces at the start of a line are wrong. Lines inside if/for/while must be indented the same amount.",
        "TypeError": "You mixed types that don't work together, e.g. adding a number to text. Convert with int() or str().",
        "ValueError": "A value had the right type but the wrong content, e.g. int('abc').",
        "ZeroDivisionError": "You divided by zero.",
        "IndexError": "You used a list position that doesn't exist. Remember: the first item is at index 0.",
        "EOFError": "Your program asked for more input than you gave it. Add a value in the Input box for every input().",
        "AttributeError": "That value doesn't have this method. Check the spelling, e.g. append not add.",
        "KeyError": "That key isn't in the dictionary.",
    }
    tip = tips.get(name, "")
    return {"type": name, "message": msg, "line": line, "tip": tip}

def _aikl_run(code, inputs, prelude):
    out = _Cap()
    feed = list(inputs)
    def _input(prompt=""):
        out.write("\\x01" + str(prompt))
        if not feed:
            raise EOFError("Your program asked for more input than was given.")
        v = str(feed.pop(0))
        out.write(v + "\\n\\x02")
        return v
    g = {"__name__": "__main__", "__builtins__": builtins}
    old_out, old_err, old_in = sys.stdout, sys.stderr, builtins.input
    sys.stdout = out; sys.stderr = out; builtins.input = _input
    err = None
    try:
        if prelude:
            exec(compile(prelude, "<world>", "exec"), g)
        exec(compile(code, "<your code>", "exec"), g)
    except BaseException as e:
        if isinstance(e, SystemExit):
            err = None
        else:
            err = _friendly(e, code)
    finally:
        sys.stdout, sys.stderr, builtins.input = old_out, old_err, old_in
    extra = g.get("__result__", None)
    return {"stdout": out.getvalue(), "error": err, "result": extra}

def _aikl_analyze(code):
    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        return {"ok": False, "error": _friendly(e, code)}
    nodes, calls, methods, names = set(), set(), set(), set()
    for n in ast.walk(tree):
        nodes.add(type(n).__name__)
        if isinstance(n, ast.Call):
            if isinstance(n.func, ast.Name): calls.add(n.func.id)
            elif isinstance(n.func, ast.Attribute): methods.add(n.func.attr)
        if isinstance(n, ast.Name): names.add(n.id)
    return {"ok": True, "nodes": sorted(nodes), "calls": sorted(calls), "methods": sorted(methods), "names": sorted(names)}
`;

let py = null;
const ready = (async () => {
  const { loadPyodide } = await import(base + 'pyodide.mjs');
  py = await loadPyodide({ indexURL: base });
  py.runPython(HELPER);
  postMessage({ type: 'ready' });
})().catch(err => postMessage({ type: 'fatal', message: String(err && err.message || err) }));

onmessage = async (ev) => {
  const { id, op, code, inputs, prelude } = ev.data;
  try {
    await ready;
    const fn = py.globals.get(op === 'analyze' ? '_aikl_analyze' : '_aikl_run');
    const res = op === 'analyze' ? fn(code) : fn(code, py.toPy(inputs || []), prelude || '');
    const js = res.toJs({ dict_converter: Object.fromEntries });
    res.destroy(); fn.destroy();
    postMessage({ id, ok: true, res: js });
  } catch (e) {
    postMessage({ id, ok: false, error: String(e && e.message || e) });
  }
};
