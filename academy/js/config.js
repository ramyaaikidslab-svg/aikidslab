// Academy settings.
export default {
  // Where accounts and progress are stored. The first one that is set is used:
  //  1. FIREBASE    — Firebase Auth + Firestore (see academy/backend/FIREBASE.md).
  //  2. BACKEND_URL — a Google Apps Script web app on a Google Sheet (see academy/backend/SETUP.md).
  //  3. neither     — device-only mode: accounts and progress stay in this browser.
  // These Firebase values are public by design; the Firestore rules protect the data.
  FIREBASE: {
    apiKey: 'AIzaSyC4M_daoewQJkpZvjrx73e5SGSvCIjfbSY',
    authDomain: 'ai-kids-lab-82b81.firebaseapp.com',
    projectId: 'ai-kids-lab-82b81',
    storageBucket: 'ai-kids-lab-82b81.firebasestorage.app',
    messagingSenderId: '60204931223',
    appId: '1:60204931223:web:ac98fb3e6c1b67f30531d2'
  },
  BACKEND_URL: '',

  APP_NAME: 'AI Kids Lab Academy',
  COURSE: 'Artificial Intelligence (417) · Class IX · Part B',
  ORG: 'AI Kids Lab',
  SITE: 'https://www.aikidslab.co',

  // Self-hosted Python (Pyodide). Kept in the repo so school networks that block
  // CDNs still work.
  PYODIDE_URL: new URL('../vendor/pyodide/', import.meta.url).href,

  // How long (ms) after a change progress is synced to the backend. Saves are
  // throttled to at most one per this interval (45 s keeps well inside Firebase's
  // free daily write quota); progress is always kept on the device in between.
  SYNC_DELAY: 45000
};
