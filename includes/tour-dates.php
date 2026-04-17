<?php
/**
 * Tour dates — fetched from Google Sheets (CSV), geocoded via Nominatim.
 *
 * Sheet columns (row 1 = header, ignored):
 *   Day | Month | Year | Venue | Location | Age | Note
 *
 * Provides:
 *   $all_shows    — every show
 *   $future_shows — auto-pruned (day-of stays, removed day after)
 *   $upcoming     — next 3 future shows (homepage fullpage cards)
 *
 * To connect a sheet: paste your published CSV URL into SHEETS_CSV_URL below.
 * File > Share > Publish to web > Sheet 1 > CSV > Publish
 */

const SHEETS_CSV_URL = ''; // <-- paste published CSV URL here

function e($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
const TOUR_CACHE_FILE = __DIR__ . '/../data/tour-cache.json';
const GEO_CACHE_FILE  = __DIR__ . '/../data/geo-cache.json';
const TOUR_CACHE_TTL  = 3600; // seconds before re-fetching the sheet

// ----------------------------------------------------------------
// Fallback — used when Sheets URL is empty or fetch fails
// ----------------------------------------------------------------
const FALLBACK_SHOWS = [
    ['day'=>'17','month'=>'APR','year'=>'2026','venue'=>"Rob Roy's",       'location'=>'Smiths Falls, ON',   'age'=>'19+',      'note'=>''],
    ['day'=>'30','month'=>'APR','year'=>'2026','venue'=>'Hard Rock Cafe',  'location'=>'Ottawa, ON',          'age'=>'19+',      'note'=>''],
    ['day'=>'22','month'=>'MAY','year'=>'2026','venue'=>'Busters',         'location'=>'Kanata, ON',          'age'=>'19+',      'note'=>''],
    ['day'=>'23','month'=>'MAY','year'=>'2026','venue'=>'The Buckle',      'location'=>'Kingston, ON',        'age'=>'19+',      'note'=>''],
    ['day'=>'30','month'=>'MAY','year'=>'2026','venue'=>'Ottawa Fun Fair', 'location'=>'Gloucester, ON',      'age'=>'All ages', 'note'=>''],
    ['day'=>'12','month'=>'JUN','year'=>'2026','venue'=>'Kaffe 1870',      'location'=>'Wakefield, QC',       'age'=>'18+',      'note'=>''],
    ['day'=>'01','month'=>'JUL','year'=>'2026','venue'=>'Aylmer Legion',   'location'=>'Aylmer, QC',          'age'=>'18+',      'note'=>''],
    ['day'=>'11','month'=>'JUL','year'=>'2026','venue'=>'The Point',       'location'=>'Constance Bay, ON',   'age'=>'19+',      'note'=>''],
    ['day'=>'12','month'=>'JUL','year'=>'2026','venue'=>'Brauwerk Hoffman','location'=>"Campbell's Bay, QC",  'age'=>'18+',      'note'=>''],
    ['day'=>'08','month'=>'AUG','year'=>'2026','venue'=>'The Cupboard',    'location'=>'Arnprior, ON',        'age'=>'19+',      'note'=>''],
];

// ----------------------------------------------------------------
// Fetch raw show rows from Google Sheets CSV
// ----------------------------------------------------------------
function fetch_sheets_csv(): ?array {
    if (!SHEETS_CSV_URL) return null;

    // Serve from cache if fresh
    if (file_exists(TOUR_CACHE_FILE) && (time() - filemtime(TOUR_CACHE_FILE)) < TOUR_CACHE_TTL) {
        $cached = json_decode(file_get_contents(TOUR_CACHE_FILE), true);
        if ($cached) return $cached;
    }

    $ctx = stream_context_create(['http' => [
        'timeout' => 5,
        'header'  => "User-Agent: SwampCityStompers/1.0\r\n",
    ]]);
    $csv = @file_get_contents(SHEETS_CSV_URL, false, $ctx);
    if (!$csv) return null;

    $rows = array_map('str_getcsv', explode("\n", trim($csv)));
    array_shift($rows); // drop header row

    $shows = [];
    foreach ($rows as $row) {
        if (count($row) < 6 || empty(trim($row[0]))) continue;
        $shows[] = [
            'day'      => trim($row[0]),
            'month'    => strtoupper(trim($row[1])),
            'year'     => trim($row[2]),
            'venue'    => trim($row[3]),
            'location' => trim($row[4]),
            'age'      => trim($row[5]),
            'note'     => isset($row[6]) ? trim($row[6]) : '',
        ];
    }

    if (empty($shows)) return null;

    @file_put_contents(TOUR_CACHE_FILE, json_encode($shows));
    return $shows;
}

// ----------------------------------------------------------------
// Geocode a venue via Nominatim (cached permanently in geo-cache.json)
// ----------------------------------------------------------------
function geocode_venue(string $venue, string $location): array {
    static $cache = null;

    if ($cache === null) {
        $cache = file_exists(GEO_CACHE_FILE)
            ? (json_decode(file_get_contents(GEO_CACHE_FILE), true) ?: [])
            : [];
    }

    $key = "{$venue}|{$location}";
    if (isset($cache[$key])) return $cache[$key];

    // New venue — hit Nominatim once, cache permanently
    $q   = urlencode("{$venue}, {$location}");
    $url = "https://nominatim.openstreetmap.org/search?q={$q}&format=json&limit=1";
    $ctx = stream_context_create(['http' => [
        'timeout' => 5,
        'header'  => "User-Agent: SwampCityStompers/1.0 (booking@swampcitystompers.ca)\r\n",
    ]]);
    $resp = @file_get_contents($url, false, $ctx);
    $data = $resp ? json_decode($resp, true) : [];

    $coords = !empty($data[0])
        ? ['lat' => $data[0]['lat'], 'lng' => $data[0]['lon']]
        : ['lat' => '0', 'lng' => '0'];

    $cache[$key] = $coords;
    @file_put_contents(GEO_CACHE_FILE, json_encode($cache, JSON_PRETTY_PRINT));

    return $coords;
}

// ----------------------------------------------------------------
// Add coords + map_q to each show
// ----------------------------------------------------------------
function hydrate_shows(array $raw): array {
    return array_map(function($show) {
        $coords        = geocode_venue($show['venue'], $show['location']);
        $show['lat']   = $coords['lat'];
        $show['lng']   = $coords['lng'];
        $show['map_q'] = urlencode($show['venue'] . ' ' . $show['location']);
        return $show;
    }, $raw);
}

// ----------------------------------------------------------------
// Build the three arrays used by index.php and tour.php
// ----------------------------------------------------------------
$raw_shows    = fetch_sheets_csv() ?? FALLBACK_SHOWS;
$all_shows    = hydrate_shows($raw_shows);

$cutoff       = strtotime('yesterday');
$future_shows = array_values(array_filter($all_shows, function($show) use ($cutoff) {
    $month_num = date('n', strtotime($show['month'] . ' 1'));
    $show_date = mktime(0, 0, 0, $month_num, (int)$show['day'], (int)$show['year']);
    return $show_date >= $cutoff;
}));

$upcoming = array_slice($future_shows, 0, 3);
