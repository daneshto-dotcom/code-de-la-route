/**
 * FDTTA Bug Reporter — Google Apps Script Web App
 *
 * Receives bug reports from the FDTTA PWA and appends them to a Google Sheet.
 * Optional screenshots are uploaded to a Drive folder; the URL is stored in
 * the sheet's screenshot_url column.
 *
 * SETUP — see BUG-REPORTER-SETUP.md in the same folder for step-by-step.
 *
 * Quick reference:
 *   1. Create a Google Sheet (e.g. "FDTTA Bug Reports") at Drive root.
 *      Add headers in row 1: timestamp · severity · description · screen ·
 *      question_id · app_version · user_agent · contact · screenshot_url
 *   2. Create a Drive folder (e.g. "FDTTA Bug Screenshots") at Drive root.
 *   3. In the Sheet → Extensions → Apps Script, paste this entire file.
 *   4. Update SHEET_ID and FOLDER_ID below with the IDs from your URLs:
 *        Sheet URL: docs.google.com/spreadsheets/d/{SHEET_ID}/edit
 *        Folder URL: drive.google.com/drive/folders/{FOLDER_ID}
 *   5. Deploy → New deployment → Type=Web app
 *        Execute as: Me
 *        Who has access: Anyone
 *      Copy the resulting /exec URL.
 *   6. In FDTTA → Settings, paste the /exec URL into "Bug reporter endpoint".
 */

const SHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
const FOLDER_ID = 'PASTE_YOUR_FOLDER_ID_HERE';
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    let screenshotUrl = '';
    if (payload.screenshot_base64 && FOLDER_ID && FOLDER_ID !== 'PASTE_YOUR_FOLDER_ID_HERE') {
      try {
        const folder = DriveApp.getFolderById(FOLDER_ID);
        const b64 = payload.screenshot_base64.replace(/^data:image\/\w+;base64,/, '');
        const blob = Utilities.newBlob(Utilities.base64Decode(b64), 'image/png',
          'fdtta-bug-' + new Date().getTime() + '.png');
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        screenshotUrl = file.getUrl();
      } catch (imgErr) {
        screenshotUrl = 'UPLOAD_FAILED: ' + imgErr.message;
      }
    }

    sheet.appendRow([
      payload.timestamp || new Date().toISOString(),
      payload.severity || 'Bug',
      payload.description || '',
      payload.screen || '',
      payload.question_id || '',
      payload.app_version || '',
      payload.user_agent || '',
      payload.contact || '',
      screenshotUrl
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, screenshot_url: screenshotUrl }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('FDTTA Bug Reporter endpoint OK. Use POST to submit bug reports.')
    .setMimeType(ContentService.MimeType.TEXT);
}
