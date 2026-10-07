// Academy settings. The only value you normally change is BACKEND_URL.
export default {
  // Paste your Google Apps Script web-app URL here (see academy/backend/SETUP.md).
  // While empty, the Academy runs in device-only mode: accounts and progress are
  // kept in this browser only.
  BACKEND_URL: 'https://script.google.com/macros/s/AKfycbxhfw8lmE6cwQc_2IX2eH1unyXKlTqOs6KTUUXK8GecXewGw30Oi0aImGUcgPKXLLRA4g/exec',

  APP_NAME: 'AI Kids Lab Academy',
  COURSE: 'Artificial Intelligence (417) · Class IX · Part B',
  ORG: 'AI Kids Lab',
  SITE: 'https://www.aikidslab.co',

  // Self-hosted Python (Pyodide). Kept in the repo so school networks that block
  // CDNs still work.
  PYODIDE_URL: new URL('../vendor/pyodide/', import.meta.url).href,

  // How long (ms) local changes wait before syncing to the backend.
  SYNC_DELAY: 12000
};
