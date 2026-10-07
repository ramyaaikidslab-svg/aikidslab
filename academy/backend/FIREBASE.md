# Firebase backend — setup and teacher guide

The Academy stores accounts and progress in Firebase (free **Spark** plan, no card needed):

- **Firebase Authentication** — email + password. Learners type a 4-digit PIN; the app turns it
  into a longer password behind the scenes.
- **Cloud Firestore** — profiles, progress, certificates, sign-in log, allowlist.

The connection values are in `js/config.js` (`FIREBASE`). They are public by design; the
**security rules** (`backend/firestore.rules`) are what protect the data.

## One-time setup (Firebase console)

1. **Authentication → Sign-in method**
   - **Email/Password** → Enable (first switch only) → Save. *(Students.)*
   - **Add new provider → Google** → Enable → choose a support email → Save. *(Teacher page.)*
2. **Authentication → Settings → Authorized domains** → add `www.aikidslab.co` and `aikidslab.co`.
3. **Firestore Database** → create it (production mode, a region near your students).
4. **Firestore Database → Rules** → replace everything with the contents of
   `backend/firestore.rules`, put your Google account in the `ADMINS` line, then **Publish**.
5. Open `https://www.aikidslab.co/academy/check.html` → **Run check**: both rows should be green.

## Teacher dashboard — `https://www.aikidslab.co/academy/teacher.html`

Sign in with Google using an account listed in `ADMINS`. You can:

- see every student (name, email, school, class, topics done, certificates, XP, hours, open
  mistakes, Python solved, last seen) and **Download CSV** (opens in Excel / Google Sheets);
- download the **sign-in log** as CSV;
- choose **who can sign up**: *Anyone with the link* or *Only emails on the list*, and add or
  remove emails on the list. Removing an email blocks that student at their next save or sign-in.

**More admins:** add their Google emails to the `ADMINS` line in the rules, e.g.
`['you@gmail.com', 'colleague@school.edu.in']`, and Publish.

## Common tasks

| Task | How |
|---|---|
| Forgotten PIN | Firebase console → **Authentication → Users** → find the email → ⋮ → **Delete account**. Progress is kept; the PIN they type at their next sign-in becomes their new PIN. |
| Remove a student completely | Delete their login (as above) and their documents in Firestore: `students/<email>`, `state/<email>`, `directory/<email>`. |
| Stop all new sign-ups | Teacher page → *Only emails on the list* (with the current students on the list). |

## Data layout (Firestore)

| Collection | Document ID | Contents | Who can read |
|---|---|---|---|
| `students` | email | profile + progress summary | the student, admins |
| `state` | email | full progress (JSON) | the student, admins |
| `directory` | email | name (to greet returning learners) | anyone who knows the exact email |
| `certs` | certificate ID | name, title, date | anyone with the ID (verify page) |
| `logins` | auto | sign-up / sign-in events | admins |
| `allowlist` | email | — | anyone who knows the exact email |
| `config` | `access` | `mode: open \| allowlist` | anyone |

## Free-plan limits

About 50,000 reads and 20,000 writes a day. The app saves at most once every 45 seconds while a
student works (`SYNC_DELAY` in `js/config.js`), which is roughly 200 student-hours of study per day.
Progress is always kept on the device in between, so nothing is lost if a save is delayed. If the
daily limit is reached, saving pauses until the next day; you are never charged on the Spark plan.

## Testing locally (`tools/firebase-e2e.cjs`)

`tools/` tests run against the Firebase emulators (`firebase emulators:start` with auth on 9099 and
Firestore on 8080). Setting `window.__AIKL_FB_EMULATOR = true` before the app loads points it at
the emulators.
