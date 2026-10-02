<?php
/**
 * Add-to-calendar: calendar.php?show=<id> returns one show as an .ics file.
 * Ids come from includes/tour-dates.php (date + venue slug). The UID is the
 * same id, so re-adding a changed show updates the existing entry in Apple
 * Calendar and Outlook rather than adding a second copy.
 *
 * Shows with a time run 3 hours. Shows without one are all-day events.
 */
require_once __DIR__ . '/includes/tour-dates.php';

const ICS_TZ        = 'America/Toronto';
const ICS_SET_HOURS = 3;

$id   = (string)($_GET['show'] ?? '');
$show = null;
foreach ($future_shows as $s) {
    if ($s['id'] === $id) { $show = $s; break; }
}

if (!$show) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo "Show not found. It may have been moved or already happened.\n";
    exit;
}

function ics_text(string $s): string {
    return str_replace(["\\", ';', ',', "\r\n", "\n"], ["\\\\", '\;', '\,', '\n', '\n'], $s);
}

// RFC 5545: lines longer than 75 octets continue on the next line after a space.
function ics_fold(string $line): string {
    $out = '';
    while (strlen($line) > 75) {
        $cut = 75;
        while ($cut > 0 && (ord($line[$cut]) & 0xC0) === 0x80) $cut--; // don't split a UTF-8 char
        $out  .= substr($line, 0, $cut) . "\r\n ";
        $line  = substr($line, $cut);
    }
    return $out . $line;
}

$date  = date('Y-m-d', $show['_ts']);
$utc   = new DateTimeZone('UTC');
$lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Swamp City Stompers//Tour//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:' . $show['id'] . '@swampcitystompers.ca',
    'DTSTAMP:' . gmdate('Ymd\THis\Z'),
];

$start = $show['time'] !== ''
    ? DateTime::createFromFormat('Y-m-d g:i A', $date . ' ' . $show['time'], new DateTimeZone(ICS_TZ))
    : false;

if ($start) {
    $end = (clone $start)->modify('+' . ICS_SET_HOURS . ' hours');
    $lines[] = 'DTSTART:' . $start->setTimezone($utc)->format('Ymd\THis\Z');
    $lines[] = 'DTEND:'   . $end->setTimezone($utc)->format('Ymd\THis\Z');
} else {
    $lines[] = 'DTSTART;VALUE=DATE:' . date('Ymd', $show['_ts']);
    $lines[] = 'DTEND;VALUE=DATE:'   . date('Ymd', strtotime('+1 day', $show['_ts']));
}

$details = array_filter([
    $show['time'] === '' ? 'Time TBA' : '',
    $show['age'],
    $show['note'],
    'swampcitystompers.ca',
]);

$lines[] = 'SUMMARY:' . ics_text('Swamp City Stompers at ' . $show['venue']);
$lines[] = 'LOCATION:' . ics_text($show['venue'] . ', ' . $show['location']);
$lines[] = 'DESCRIPTION:' . ics_text(implode("\n", $details));
$lines[] = 'URL:https://swampcitystompers.ca/#tour';
$lines[] = 'END:VEVENT';
$lines[] = 'END:VCALENDAR';

header('Content-Type: text/calendar; charset=utf-8');
header('Content-Disposition: attachment; filename="stompers-' . $show['id'] . '.ics"');
header('Cache-Control: no-cache');
echo implode("\r\n", array_map('ics_fold', $lines)) . "\r\n";
