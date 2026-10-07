// Firebase backend: Firebase Authentication (email + password) and Cloud Firestore (lite).
// Same interface as the other backends in store.js. Data layout and access rules are in
// backend/firestore.rules; setup steps in backend/FIREBASE.md.
//
// Learners keep a 4-digit PIN. Firebase needs a 6+ character password, so the password is
// derived from the PIN hash the sign-in screen already computes (never the raw PIN).

const V = '../../vendor/firebase/';
let fb = null;

async function init(cfg) {
  if (fb) return fb;
  const [app, auth, fs] = await Promise.all([
    import(V + 'firebase-app.js'), import(V + 'firebase-auth.js'), import(V + 'firebase-firestore-lite.js')
  ]);
  const a = app.initializeApp(cfg);
  const au = auth.getAuth(a), db = fs.getFirestore(a);
  if (globalThis.__AIKL_FB_EMULATOR) {            // tests only
    auth.connectAuthEmulator(au, 'http://127.0.0.1:9099', { disableWarnings: true });
    fs.connectFirestoreEmulator(db, '127.0.0.1', 8080);
  }
  fb = { auth, fs, au, db };
  return fb;
}

const pw = pinHash => 'aikl-' + String(pinHash).slice(0, 32);
const code = e => (e && e.code) || '';
const BAD_CRED = ['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found', 'auth/invalid-login-credentials'];
const isNet = e => /network|unavailable|deadline/i.test(code(e)) || /network|fetch/i.test(String(e && e.message));
function fail(e) {                                 // network errors propagate (UI says "could not reach")
  if (isNet(e)) throw e;
  if (code(e) === 'auth/too-many-requests') return { ok: false, error: 'locked' };
  if (/permission-denied/.test(code(e))) return { ok: false, error: 'not_allowed', message: 'Permission denied by the database rules.' };
  return { ok: false, error: 'server_error', message: code(e) || String(e && e.message || e) };
}

export class FirebaseBackend {
  constructor(cfg) { this.cfg = cfg; this.lastSummary = ''; this.lastSummaryAt = 0; this.lastName = ''; }
  get kind() { return 'firebase'; }
  async ready() { return init(this.cfg); }

  async access(email) {
    const { fs, db } = await this.ready();
    const cfg = await fs.getDoc(fs.doc(db, 'config', 'access'));
    if (!cfg.exists() || cfg.data().mode !== 'allowlist') return true;
    return (await fs.getDoc(fs.doc(db, 'allowlist', email))).exists();
  }

  async lookup(email) {
    try {
      const { fs, db } = await this.ready();
      const [allowed, dir] = await Promise.all([this.access(email), fs.getDoc(fs.doc(db, 'directory', email))]);
      return { ok: true, exists: dir.exists(), allowed, name: dir.exists() ? dir.data().name : '', needsPin: false };
    } catch (e) {
      if (/permission-denied/.test(code(e))) return { ok: false, error: 'server_error', message: 'The Firestore security rules have not been published yet (see backend/FIREBASE.md).' };
      return fail(e);
    }
  }

  async register(p) {
    try {
      const { auth, fs, au, db } = await this.ready();
      if (!(await this.access(p.email))) return { ok: false, error: 'not_allowed' };
      try { await auth.createUserWithEmailAndPassword(au, p.email, pw(p.pinHash)); }
      catch (e) {
        if (code(e) !== 'auth/email-already-in-use') throw e;
        // An earlier sign-up got as far as creating the login; finish it if the PIN matches.
        try { await auth.signInWithEmailAndPassword(au, p.email, pw(p.pinHash)); } catch (e2) { return { ok: false, error: 'exists' }; }
      }
      const sref = fs.doc(db, 'students', p.email);
      if ((await fs.getDoc(sref)).exists()) { await auth.signOut(au); return { ok: false, error: 'exists' }; }
      const now = fs.serverTimestamp();
      await fs.setDoc(sref, { email: p.email, name: p.name, school: p.school || '', section: p.section || '', created: now, lastSeen: now,
        topicsDone: 0, certificates: 0, xp: 0, minutesLearning: 0, openMistakes: 0, pythonSolved: 0, lastPage: '' });
      await fs.setDoc(fs.doc(db, 'directory', p.email), { name: p.name, at: now });
      this.lastName = p.name;
      this.log(p.email, p.name, 'register');
      return { ok: true, token: au.currentUser.uid };
    } catch (e) { return fail(e); }
  }

  async login(email, pinHash) {
    try {
      const { auth, au } = await this.ready();
      let reset = false;
      try { await auth.signInWithEmailAndPassword(au, email, pw(pinHash)); }
      catch (e) {
        if (!BAD_CRED.includes(code(e))) throw e;
        // Wrong PIN, or the teacher deleted the login to reset the PIN. Creating the login
        // again only succeeds in the second case; the learner's progress is kept (keyed by email).
        try { await auth.createUserWithEmailAndPassword(au, email, pw(pinHash)); reset = true; }
        catch (e2) { if (code(e2) === 'auth/email-already-in-use') return { ok: false, error: 'bad_pin' }; throw e2; }
      }
      const r = await this.load(email, au.currentUser.uid);
      if (!r.ok) { if (r.error !== 'server_error') await auth.signOut(au); return r; }
      this.log(email, r.profile.name, reset ? 'pin_reset_login' : 'login');
      return { ok: true, token: au.currentUser.uid, profile: r.profile, state: r.state, reset };
    } catch (e) { return fail(e); }
  }

  async load(email) {
    try {
      const { fs, au, db } = await this.ready();
      await au.authStateReady();
      const u = au.currentUser;
      if (!u || String(u.email).toLowerCase() !== email) return { ok: false, error: 'bad_token' };
      if (!(await this.access(email))) return { ok: false, error: 'not_allowed' };
      const [s, st] = await Promise.all([fs.getDoc(fs.doc(db, 'students', email)), fs.getDoc(fs.doc(db, 'state', email))]);
      if (!s.exists()) return { ok: false, error: 'no_user' };
      const d = s.data(); this.lastName = d.name;
      let state = null; if (st.exists()) { try { state = JSON.parse(st.data().json); } catch (e) {} }
      return { ok: true, profile: { email, name: d.name, school: d.school, section: d.section }, state };
    } catch (e) { return fail(e); }
  }

  async save(email, token, state, opts = {}) {
    try {
      const summary = opts.summary || {};
      const { fs, au, db } = await this.ready();
      await au.authStateReady();
      if (!au.currentUser || String(au.currentUser.email).toLowerCase() !== email) return { ok: false, error: 'bad_token' };
      await fs.setDoc(fs.doc(db, 'state', email), { json: JSON.stringify(state), rev: Number(state.rev) || 0, updatedAt: fs.serverTimestamp() });
      // The summary row changes rarely; write it when it does, or every 5 minutes for "last seen".
      const { minutes, ...rest } = summary, key = JSON.stringify(rest);
      if (key !== this.lastSummary || Date.now() - this.lastSummaryAt > 300000) {
        await fs.updateDoc(fs.doc(db, 'students', email), { name: rest.name, school: rest.school, section: rest.section,
          topicsDone: rest.topicsDone, certificates: rest.certs, xp: rest.xp, minutesLearning: minutes, openMistakes: rest.mistakesOpen,
          pythonSolved: rest.pyPassed, lastPage: String(rest.last || '').slice(0, 60), lastSeen: fs.serverTimestamp() });
        this.lastSummary = key; this.lastSummaryAt = Date.now();
        if (rest.name && rest.name !== this.lastName) { await fs.setDoc(fs.doc(db, 'directory', email), { name: rest.name, at: fs.serverTimestamp() }); this.lastName = rest.name; }
      }
      return { ok: true };
    } catch (e) { return fail(e); }
  }

  async cert(email, token, c) {
    try {
      const { fs, db } = await this.ready();
      const ref = fs.doc(db, 'certs', c.id);
      if ((await fs.getDoc(ref)).exists()) return { ok: true };
      await fs.setDoc(ref, { email, name: String(c.name || this.lastName || '').slice(0, 60), title: String(c.title || '').slice(0, 140),
        kind: String(c.kind || ''), ref: String(c.ref || ''), issuedAt: new Date(Number(c.at) || Date.now()) });
      return { ok: true };
    } catch (e) { return fail(e); }
  }

  async verify(id) {
    try {
      const { fs, db } = await this.ready();
      const d = await fs.getDoc(fs.doc(db, 'certs', id));
      if (!d.exists()) return { ok: false, error: 'not_found' };
      const v = d.data(), at = v.issuedAt && v.issuedAt.toDate ? v.issuedAt.toDate() : new Date(v.issuedAt);
      return { ok: true, id, name: v.name, title: v.title, kind: v.kind, issuedAt: at.toISOString() };
    } catch (e) { return fail(e); }
  }

  async signOut() { try { const { auth, au } = await this.ready(); await auth.signOut(au); } catch (e) {} }

  log(email, name, event) {
    this.ready().then(({ fs, db }) => fs.addDoc(fs.collection(db, 'logins'), { email, name: String(name || '').slice(0, 60), event, at: fs.serverTimestamp() })).catch(() => {});
  }
}
