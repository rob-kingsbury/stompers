/**
 * Stompers Drive Permission Sync
 * ------------------------------------------------------------------
 * Bound Apps Script for the "Stompers - Band Access Roster" sheet:
 * https://docs.google.com/spreadsheets/d/1dEuDPF1AuGS-4a0QW-JIBkzDysyEFNjPVa5nzGANIKk/edit
 *
 * Reads the Roster + Tier Rules tabs, grants Drive folder access to
 * active band members according to their access tier.
 *
 * Design:
 *   - Add-only. Never revokes existing access. To remove someone,
 *     manually revoke in Drive (and set Status=Inactive in the sheet).
 *   - Promotions work (Viewer -> Editor via addEditor). Demotions
 *     (Editor -> Viewer) do not work via the API; manual revoke +
 *     re-grant required.
 *   - Skips rows with empty email; logs to Sync Log tab.
 *   - Non-Google emails (e.g. hotmail) create a pending invite. The
 *     recipient must create a Google account on that address before
 *     they can open the shared folder.
 *
 * Install: Extensions -> Apps Script -> paste this file -> Save.
 * First run authorizes Drive + Sheets scopes. Then use the
 * "Stompers" menu on the sheet -> "Sync Drive Permissions".
 */

// === CONFIG ========================================================
// Folder name (must match Tier Rules header exactly) -> Drive folder ID
const FOLDER_IDS = {
  'Inbox - Upload Here':  '1evF3jJ5goDivRvfyicSmzd8h8T4XrRlh',
  'EPK Press Kit':        '1gOqNA2UR0m9bGGpVY-xyLe1mkGr_xit8',
  'Show Photos':          '1E0QJCopN4FfXCJoXTTxgFaJPykEPZgc_',
  'Set Lists and Charts': '1PFaIGawLbipIYoRudx9_fOUcrhn3u1i3',
  'Admin (Rob Only)':     '1seDiMtezcwc8T50YRM2LLWix_SaGuYmW',
};

const ROSTER_SHEET = 'Roster';
const RULES_SHEET  = 'Tier Rules';
const LOG_SHEET    = 'Sync Log';
const LOG_HEADER   = ['Timestamp', 'Name', 'Email', 'Folder', 'Action', 'Message'];

// === MENU ==========================================================
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Stompers')
    .addItem('Sync Drive Permissions', 'syncPermissions')
    .addSeparator()
    .addItem('Dry Run (preview only)', 'dryRunPermissions')
    .addToUi();
}

// === PUBLIC ENTRY POINTS ===========================================
function syncPermissions() { runSync(false); }
function dryRunPermissions() { runSync(true); }

// === MAIN ==========================================================
function runSync(dryRun) {
  const ss  = SpreadsheetApp.getActiveSpreadsheet();
  const log = ensureLogSheet_(ss);
  const ts  = new Date();
  const tag = dryRun ? '[DRY RUN] ' : '';

  log.appendRow([ts, `${tag}--- SYNC START ---`, '', '', '', '']);

  const rules  = readTierRules_(ss);
  const roster = readRoster_(ss);

  let granted = 0, skipped = 0, errors = 0;

  roster.forEach((member) => {
    if (member.status !== 'Active') {
      log.appendRow([new Date(), member.name, member.email || '(none)',
                     '', 'skip', `Status: ${member.status}`]);
      skipped++;
      return;
    }
    if (!member.email) {
      log.appendRow([new Date(), member.name, '(no email)', '',
                     'skip', 'No email on file']);
      skipped++;
      return;
    }
    const tierRules = rules[member.tier];
    if (!tierRules) {
      log.appendRow([new Date(), member.name, member.email, '',
                     'error', `Unknown tier: ${member.tier}`]);
      errors++;
      return;
    }

    Object.entries(tierRules).forEach(([folderName, level]) => {
      const normLevel = (level || '').toLowerCase();
      if (!normLevel || normLevel === 'none') return;

      const folderId = FOLDER_IDS[folderName];
      if (!folderId) {
        log.appendRow([new Date(), member.name, member.email, folderName,
                       'error', 'No folder ID configured in script']);
        errors++;
        return;
      }

      if (dryRun) {
        log.appendRow([new Date(), member.name, member.email, folderName,
                       `would-${normLevel}`, '(dry run)']);
        granted++;
        return;
      }

      try {
        const folder = DriveApp.getFolderById(folderId);
        if (normLevel === 'editor') {
          folder.addEditor(member.email);
        } else if (normLevel === 'viewer') {
          folder.addViewer(member.email);
        } else {
          log.appendRow([new Date(), member.name, member.email, folderName,
                         'error', `Unknown level: ${level}`]);
          errors++;
          return;
        }
        log.appendRow([new Date(), member.name, member.email, folderName,
                       level, 'OK']);
        granted++;
      } catch (e) {
        log.appendRow([new Date(), member.name, member.email, folderName,
                       'error', String(e.message || e)]);
        errors++;
      }
    });
  });

  log.appendRow([new Date(),
    `${tag}--- DONE: ${granted} grants, ${skipped} skipped, ${errors} errors ---`,
    '', '', '', '']);

  SpreadsheetApp.getUi().alert(
    `${dryRun ? 'Dry run' : 'Sync'} complete.\n\n` +
    `Granted: ${granted}\nSkipped: ${skipped}\nErrors: ${errors}\n\n` +
    `See "${LOG_SHEET}" tab for details.`
  );
}

// === READERS =======================================================
function readRoster_(ss) {
  const sheet = ss.getSheetByName(ROSTER_SHEET);
  if (!sheet) throw new Error(`Sheet not found: ${ROSTER_SHEET}`);
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  const header = data[0].map(String);
  const idx = {
    name:   header.indexOf('Name'),
    role:   header.indexOf('Role'),
    email:  header.indexOf('Email'),
    tier:   header.indexOf('Access Tier'),
    status: header.indexOf('Status'),
  };
  ['name','email','tier','status'].forEach((k) => {
    if (idx[k] < 0) throw new Error(`Roster tab missing column: ${k}`);
  });

  const rows = [];
  for (let i = 1; i < data.length; i++) {
    const r = data[i];
    if (!r[idx.name]) continue;
    rows.push({
      name:   String(r[idx.name]).trim(),
      role:   String(r[idx.role] || '').trim(),
      email:  String(r[idx.email] || '').trim(),
      tier:   String(r[idx.tier] || '').trim(),
      status: String(r[idx.status] || 'Active').trim(),
    });
  }
  return rows;
}

function readTierRules_(ss) {
  const sheet = ss.getSheetByName(RULES_SHEET);
  if (!sheet) throw new Error(`Sheet not found: ${RULES_SHEET}`);
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return {};

  const header = data[0].map((h) => String(h).trim());
  const rules = {};
  for (let i = 1; i < data.length; i++) {
    const r = data[i];
    const tier = String(r[0]).trim();
    if (!tier) continue;
    rules[tier] = {};
    for (let j = 1; j < header.length; j++) {
      rules[tier][header[j]] = String(r[j] || '').trim();
    }
  }
  return rules;
}

// === LOG TAB SETUP =================================================
function ensureLogSheet_(ss) {
  let log = ss.getSheetByName(LOG_SHEET);
  if (!log) {
    log = ss.insertSheet(LOG_SHEET);
  }
  // Add header row if empty
  if (log.getLastRow() === 0) {
    log.appendRow(LOG_HEADER);
    log.getRange(1, 1, 1, LOG_HEADER.length).setFontWeight('bold');
    log.setFrozenRows(1);
  }
  return log;
}
