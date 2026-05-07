# FDTTA Bug Reporter — Google Form backend (S50)

In-app "Report a bug" button submits to a Google Form. Responses land in
the Form's response Sheet automatically — **no Apps Script, no deploy step**.

## Wiring (one-time, already done)

The Form URL and entry ID are hardcoded in `app/js/bug-reporter.js`:

```js
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfMkKaSlduvn4OrXxZOQnT8rfRfrIkFyWplwPGC6a2rzuS-Vw/formResponse';
const FORM_ENTRY = 'entry.1141707440';
```

The Form has one paragraph field. Each report is sent as a single text blob:

```
[Q: <question_id> | screen: <screen> | sev: <severity> | v: <app_version> | from: <contact>]
<description>

UA: <user_agent>
TS: <iso8601>
```

## Receiving reports

1. Open the Form in edit mode (drive.google.com → FDTTA Bug Reports).
2. Click the **Responses** tab → **Link to Sheets** (icon, top right) →
   either create a new spreadsheet or attach to an existing one.
3. Future submissions append a row automatically.

## Updating the Form

If you ever change the Form's single field (delete it, replace it,
add structured fields), the entry ID will change. To re-wire:

1. Visit the Form's `/viewform` URL.
2. View source, search for `FB_PUBLIC_LOAD_DATA_`.
3. The entry ID is the integer after the inner `[[` — e.g. `[[1141707440,null,0]]`.
4. Update `FORM_ENTRY` in `app/js/bug-reporter.js`.
5. Bump `CACHE_NAME` in `app/sw.js` so PWAs re-fetch.

## Test

1. Click the floating bug button (bottom-right).
2. Pick a severity, type a description, submit.
3. Check the Form's Responses tab — a new row appears within ~1 second.

## Offline

Reports submitted while offline are queued in IndexedDB
(`fdtta-bug-queue`) and flushed on the next `online` event.

## Privacy

- Form responses are visible only to the Form owner (you).
- Submission is `mode: 'no-cors'` — the browser cannot read the
  response, but the POST does land. No client tokens or auth needed.
- The Form accepts submissions from anyone with the URL.
