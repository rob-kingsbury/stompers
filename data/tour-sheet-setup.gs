/**
 * Swamp City Stompers — Tour Sheet Setup
 *
 * One-time setup for the tour dates Google Sheet.
 *
 * HOW TO INSTALL:
 *   1. Open your tour dates Google Sheet
 *   2. Extensions -> Apps Script
 *   3. Delete any existing code, paste this file in, save (disk icon)
 *   4. Reload the sheet. A "Stompers" menu appears at the top right of the menu bar.
 *   5. Click Stompers -> Set up sheet. Approve permissions when prompted.
 *
 * AFTER SETUP:
 *   - Date column has a native date picker (click cell, calendar appears)
 *   - Age column is a dropdown (All ages / 18+ / 19+ / 21+)
 *   - Past shows auto-grey via conditional formatting
 *   - Stompers menu -> Sort by date to reorder chronologically
 *
 * PUBLISHING TO THE SITE:
 *   File -> Share -> Publish to web -> Sheet 1 -> CSV -> Publish
 *   Copy the URL, send to Rob, he pastes into tour-dates.php line 17.
 */

const HEADERS = ['Date', 'Hour', 'Minute', 'AM/PM', 'Venue', 'Location', 'Age', 'Note'];
const AGE_OPTIONS = ['All ages', '18+', '19+', '21+'];

// Start time is captured as three dropdowns so any time is selectable
// without scrolling a 48-item single dropdown.
const HOUR_OPTIONS   = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const MINUTE_OPTIONS = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
const AMPM_OPTIONS   = ['AM', 'PM'];

const COL = { DATE: 1, HOUR: 2, MINUTE: 3, AMPM: 4, VENUE: 5, LOCATION: 6, AGE: 7, NOTE: 8 };
const ACCENT = '#c9a227'; // Stompers gold
const HEADER_BG = '#1a1a1a';
const HEADER_FG = '#f5f5f0';
const PAST_BG = '#ededed';
const PAST_FG = '#999999';

/**
 * Adds the Stompers menu when the sheet opens.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Stompers')
    .addItem('Set up sheet', 'setupSheet')
    .addItem('Sort by date', 'sortByDate')
    .addItem('Add 10 blank rows', 'addBlankRows')
    .addToUi();
}

/**
 * Full sheet setup. Idempotent — safe to run multiple times.
 */
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // 1. Headers
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setValues([HEADERS])
    .setFontWeight('bold')
    .setBackground(HEADER_BG)
    .setFontColor(HEADER_FG)
    .setHorizontalAlignment('left')
    .setVerticalAlignment('middle');

  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 32);

  // 2. Column widths
  sheet.setColumnWidth(COL.DATE, 110);
  sheet.setColumnWidth(COL.HOUR, 65);
  sheet.setColumnWidth(COL.MINUTE, 70);
  sheet.setColumnWidth(COL.AMPM, 70);
  sheet.setColumnWidth(COL.VENUE, 200);
  sheet.setColumnWidth(COL.LOCATION, 200);
  sheet.setColumnWidth(COL.AGE, 90);
  sheet.setColumnWidth(COL.NOTE, 280);

  // 3. Date column — native date picker via data validation + format
  const lastRow = Math.max(sheet.getMaxRows(), 50);
  const dateRange = sheet.getRange(2, COL.DATE, lastRow - 1, 1);
  dateRange.setNumberFormat('yyyy-mm-dd');
  const dateRule = SpreadsheetApp.newDataValidation()
    .requireDate()
    .setAllowInvalid(false)
    .setHelpText('Pick a date — the column publishes as YYYY-MM-DD.')
    .build();
  dateRange.setDataValidation(dateRule);

  // 4. Time columns — three dropdowns (Hour, Minute, AM/PM)
  const dropdown = (options) => SpreadsheetApp.newDataValidation()
    .requireValueInList(options, true)
    .setAllowInvalid(false)
    .build();

  sheet.getRange(2, COL.HOUR,   lastRow - 1, 1).setDataValidation(dropdown(HOUR_OPTIONS));
  sheet.getRange(2, COL.MINUTE, lastRow - 1, 1).setDataValidation(dropdown(MINUTE_OPTIONS));
  sheet.getRange(2, COL.AMPM,   lastRow - 1, 1).setDataValidation(dropdown(AMPM_OPTIONS));
  sheet.getRange(2, COL.AGE,    lastRow - 1, 1).setDataValidation(dropdown(AGE_OPTIONS));

  // 5. Conditional formatting — grey out past shows
  sheet.clearConditionalFormatRules();
  const dataRange = sheet.getRange(2, 1, lastRow - 1, HEADERS.length);
  const pastRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($A2<>"", $A2<TODAY())')
    .setBackground(PAST_BG)
    .setFontColor(PAST_FG)
    .setRanges([dataRange])
    .build();
  sheet.setConditionalFormatRules([pastRule]);

  // 6. Wrap notes column
  sheet.getRange(2, COL.NOTE, lastRow - 1, 1).setWrap(true);

  SpreadsheetApp.getActiveSpreadsheet().toast('Sheet ready. Click any cell in column A to test the date picker.', 'Stompers', 5);
}

/**
 * Sort the data range by date ascending. Preserves header.
 */
function sortByDate() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  if (lastRow < 3) return;
  sheet.getRange(2, 1, lastRow - 1, HEADERS.length)
    .sort({ column: COL.DATE, ascending: true });
}

/**
 * Append 10 blank rows below the data — useful if you've filled all rows
 * and need more for upcoming shows.
 */
function addBlankRows() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.insertRowsAfter(sheet.getMaxRows(), 10);
  setupSheet(); // re-apply validation to the new rows
}
