# Connect the Academy to your Google Sheet (about 5 minutes)

Until you do this, the Academy runs in **device-only mode**: accounts and progress live in each
student's browser. After you do it, every sign-up, sign-in, the full progress of every student and
every certificate is saved in a Google Sheet **you own**, and students can continue on any device.

## 1. Create the sheet and paste the script
1. Go to <https://sheets.google.com> with the Google account that should own the data, and create a blank sheet. Name it e.g. **AI Kids Lab Academy — Students**.
2. Menu **Extensions → Apps Script**. Delete everything in the editor.
3. Open `academy/backend/Code.gs` from this repository, copy all of it, and paste it into the editor. Click **Save** (disk icon).

## 2. Create the tabs
1. In the toolbar's function dropdown choose **setup**, then click **Run**.
2. Google asks for permission the first time: **Review permissions → choose your account → Advanced → Go to (project) → Allow**. (The script only touches this one spreadsheet.)
3. Back in the sheet you'll now see tabs: **Students, State, Logins, Certificates, Allowlist, Settings**.

## 3. Publish it as a web app
1. In Apps Script click **Deploy → New deployment**.
2. Click the gear next to "Select type" → **Web app**.
3. Description: `Academy backend`. **Execute as: Me**. **Who has access: Anyone**.
4. Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).

## 4. Point the Academy at it
Open `academy/js/config.js` and paste the URL:

```js
BACKEND_URL: 'https://script.google.com/macros/s/AKfy…/exec',
```

Commit and publish (or send the URL to your developer). Done — new sign-ups will appear in **Students** within seconds.

> If you ever change `Code.gs`, use **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy** so the same URL keeps working.

## Everyday use

| You want to… | Do this |
|---|---|
| See who has signed up | **Students** tab (name, email, school, last seen, topics mastered, certificates, minutes, open mistakes, Python programs solved). **Logins** has every sign-in with time. |
| Allow only specific students | **Settings** tab: set `ACCESS_MODE` to `allowlist`. Then list allowed emails (one per row, column A) in **Allowlist**. Anyone else sees "This email isn't on the access list yet". Set it back to `open` to let anyone in. |
| Reset a student's forgotten PIN | In **Students**, clear their **PinHash** cell. Next time they sign in they choose a new PIN. Their progress is untouched. |
| Unlock a student after 5 wrong PINs | Clear their **LockedUntil** cell (it also unlocks by itself after 15 minutes). |
| Verify a certificate | Open `https://www.aikidslab.co/academy/verify.html` and type the ID, or search the **Certificates** tab. |
| Export data | **File → Download → .xlsx / .csv**. |

## Notes
- Each student's full progress is stored as JSON in the **State** tab (split across cells if large). Don't edit it by hand.
- PINs are never stored — only a salted SHA-256 hash.
- Good for a few thousand students. For far larger use, the app's storage layer (`js/core/store.js`) can be pointed at a database instead.
