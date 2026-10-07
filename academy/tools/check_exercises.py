#!/usr/bin/env python3
"""Run every reference solution in academy/js/py/exercises.js with CPython.

Usage: python3 academy/tools/check_exercises.py
Checks: schema fields, unique ids, required constructs are used by the solution,
solution runs without error for every test (for low and high param values), and
every CBSE suggested program group is present.
"""
import ast, builtins, contextlib, io, json, os, re, subprocess, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
EX = os.path.join(ROOT, 'js', 'py', 'exercises.js')

dump = subprocess.run(['node', '--input-type=module', '-e',
    f"import ex from {json.dumps('file://' + EX)}; console.log(JSON.stringify(ex))"],
    capture_output=True, text=True)
if dump.returncode:
    print(dump.stderr); sys.exit(1)
exercises = json.loads(dump.stdout)
errors, ids = [], set()
groups = {'PRINT': 0, 'INPUT': 0, 'LIST': 0, 'IF-FOR-WHILE': 0}

def sub(s, p):
    for k, v in p.items():
        s = s.replace('{{' + k + '}}', str(v))
    return s

def run(code, inputs):
    feed = list(inputs)
    out = io.StringIO()
    def fake_input(prompt=''):
        out.write(str(prompt))
        if not feed:
            raise EOFError('needs more input')
        v = feed.pop(0); out.write(v + '\n'); return v
    old = builtins.input; builtins.input = fake_input
    try:
        with contextlib.redirect_stdout(out):
            exec(compile(code, '<sol>', 'exec'), {'__name__': '__main__'})
    finally:
        builtins.input = old
    return out.getvalue()

def uses(code):
    t = ast.parse(code)
    nodes, calls, methods = set(), set(), set()
    for n in ast.walk(t):
        nodes.add(type(n).__name__)
        if isinstance(n, ast.Call):
            if isinstance(n.func, ast.Name): calls.add(n.func.id)
            elif isinstance(n.func, ast.Attribute): methods.add(n.func.attr)
    return nodes, calls, methods

for e in exercises:
    w = e.get('id', '?')
    for k in ('id', 'topic', 'title', 'task', 'tests', 'hints', 'solution'):
        if k not in e: errors.append(f'{w}: missing {k}')
    if w in ids: errors.append(f'{w}: duplicate id')
    ids.add(w)
    if not re.match(r'^py-[a-z0-9-]+$', w): errors.append(f'{w}: bad id')
    if e.get('practical') and e['practical'] not in groups: errors.append(f'{w}: bad practical group')
    if e.get('practical'): groups[e['practical']] += 1
    if e.get('match', 'exact') not in ('exact', 'numbers', 'lines'): errors.append(f'{w}: bad match')
    if not (2 <= len(e.get('hints', [])) <= 3): errors.append(f'{w}: need 2-3 hints')
    params = e.get('params') or {}
    variants = [{k: v[0] for k, v in params.items()}, {k: v[1] for k, v in params.items()}] if params else [{}]
    for p in variants:
        sol = sub(e['solution'], p)
        try:
            nodes, calls, methods = uses(sol)
        except SyntaxError as ex:
            errors.append(f'{w}: solution syntax error {ex}'); continue
        need = e.get('need') or {}
        for n in need.get('nodes', []):
            if n not in nodes: errors.append(f'{w}: solution lacks required node {n}')
        for c in need.get('calls', []):
            if c not in calls: errors.append(f'{w}: solution lacks required call {c}')
        for m in need.get('methods', []):
            if m not in methods: errors.append(f'{w}: solution lacks required method {m}')
        for t in e['tests']:
            ins = [sub(str(x), p) for x in t.get('inputs', [])]
            try:
                out = run(sol, ins)
                if not out.strip(): errors.append(f'{w}: solution prints nothing for inputs {ins}')
            except Exception as ex:
                errors.append(f'{w}: solution fails on {ins}: {type(ex).__name__}: {ex}')
        if 'input' in calls and not any(t.get('inputs') for t in e['tests']):
            errors.append(f'{w}: uses input() but tests give no inputs')

for g, n in groups.items():
    if n == 0: errors.append(f'practical group {g} has no exercises')
print(f'{len(exercises)} exercises; groups: {groups}')
for x in errors: print('ERROR', x)
print('OK' if not errors else f'{len(errors)} error(s)')
sys.exit(1 if errors else 0)
