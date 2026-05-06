# FDTTA Bug Reporter — 5-Minute Setup

This wires the in-app "Report a bug" button to a Google Sheet you own. Bug reports (with optional screenshots) auto-append to the sheet within 2 seconds.

**You only do this once.** After it's wired, every bug report from the app lands in your sheet automatically.

---

## Step 1 — Create the Sheet (1 min)

1. Go to https://sheets.google.com → click **Blank**
2. Rename the sheet "FDTTA Bug Reports"
3. In **row 1**, add these column headers exactly:

   | A | B | C | D | E | F | G | H | I |
   |---|---|---|---|---|---|---|---|---|
   | timestamp | severity | description | screen | question_id | app_version | user_agent | contact | screenshot_url |

4. Copy the **Sheet ID** from the URL — it's the long string between `/d/` and `/edit`:
   `https://docs.google.com/spreadsheets/d/`**`THIS_PART_HERE`**`/edit`

   Save this for Step 4.

---

## Step 2 — Create the Drive Folder for Screenshots (30 sec)

1. Go to https://drive.google.com → click **+ New** → **New folder**
2. Name it "FDTTA Bug Screenshots"
3. Open the folder. Copy the **Folder ID** from the URL:
   `https://drive.google.com/drive/folders/`**`THIS_PART_HERE`**

   Save this for Step 4.

---

## Step 3 — Open Apps Script (30 sec)

In your "FDTTA Bug Reports" sheet:
1. Click **Extensions** menu → **Apps Script**
2. A new tab opens with a code editor. Delete any placeholder code.
3. Open `app/scripts/bug-reporter.gs` from this repo and copy its entire contents.
4. Paste into the Apps Script editor.

---

## Step 4 — Plug in your IDs (30 sec)

In the pasted code, find these two lines near the top:

```js
const SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
const FOLDER_ID = 'PASTE_YOUR_FOLDER_ID_HERE';
```

Replace with the IDs you saved in Steps 1 and 2.

Click the **Save** icon (or `Ctrl+S`).

---

## Step 5 — Deploy as Web App (1 min)

1. In Apps Script, click **Deploy** (top right) → **New deployment**
2. Click the gear icon next to "Select type" → choose **Web app**
3. Fill in:
   - **Description:** `FDTTA bug reporter v1`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone`
4. Click **Deploy**
5. Google will ask you to **Authorize access**:
   - Click **Authorize access** → pick your Google account
   - On the "Google hasn't verified this app" screen → click **Advanced** → **Go to FDTTA bug reporter (unsafe)** (this is normal — your own script is "unverified" because you wrote it yourself)
   - Click **Allow** to grant Sheets + Drive access
6. Copy the **Web app URL** that appears (ends in `/exec`)

---

## Step 6 — Plug it into the App (30 sec)

1. Open the FDTTA app
2. Go to **Settings** → scroll to **Bug reporter endpoint**
3. Paste the `/exec` URL into the field
4. The "Report a bug" floating button is now active everywhere in the app

---

## Test it

1. Click the floating bug button (bottom-right)
2. Fill in a test report — e.g. severity "Suggestion", description "test from setup"
3. Submit
4. Check your sheet — a new row should appear within 2 seconds
5. If you included a screenshot, the `screenshot_url` column will link to the image in your Drive folder

---

## Troubleshooting

- **"Bug reporter not configured" toast** → You haven't pasted the `/exec` URL into Settings yet
- **CORS or 403 errors** → "Who has access" wasn't set to "Anyone" in Step 5. Re-deploy with the correct setting.
- **Reports submitted but sheet empty** → SHEET_ID is wrong. Open the sheet, copy the URL, extract the ID between `/d/` and `/edit`.
- **Screenshots fail** → FOLDER_ID is wrong, OR you didn't authorize Drive access. Run `doPost` once manually in the Apps Script editor (Run button) to trigger authorization.
- **Need to update the script later?** → Edit the code → **Deploy → Manage deployments → Edit (pencil)** → Version: New version → Deploy. (The `/exec` URL stays the same — no need to update Settings in the app.)

---

## Privacy notes

- The web app runs **as you** with **your** Google quota — only writes to **your** sheet and folder.
- "Who has access: Anyone" means anyone with the `/exec` URL can POST a bug report. No personal data is exposed because the script doesn't return your sheet contents.
- Screenshots are uploaded with `ANYONE_WITH_LINK` view permission so the link in the sheet works without auth. You can change this in `bug-reporter.gs` if you want stricter control.
