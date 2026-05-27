<?php
/**
 * Hero marquee — top artists Stompers cover, pulled from BandPilot.
 *
 * Server-side fetch via Supabase Management API SQL endpoint. Caches
 * the result for 24h in data/marquee-cache.json. Falls back to a curated
 * artist list if config.php is missing or the API call fails.
 */

const MARQUEE_CACHE_FILE = __DIR__ . '/../data/marquee-cache.json';
const MARQUEE_CACHE_TTL  = 86400; // 24h

const MARQUEE_FALLBACK = [
    'Lynyrd Skynyrd', 'Allman Brothers', 'Tom Petty', 'CCR', 'Neil Young',
    'Eric Clapton', 'Jimi Hendrix', 'The Rolling Stones', 'Cream', 'ZZ Top',
    'Bob Dylan', 'Johnny Cash', 'Waylon Jennings', 'Merle Haggard',
    'Black Crowes', 'Big Sugar', 'Aretha Franklin', 'B.B. King',
    'Stevie Ray Vaughan', 'The Band',
];

function fetch_marquee_artists(): array {
    if (file_exists(MARQUEE_CACHE_FILE)
        && (time() - filemtime(MARQUEE_CACHE_FILE)) < MARQUEE_CACHE_TTL) {
        $cached = json_decode(file_get_contents(MARQUEE_CACHE_FILE), true);
        if (is_array($cached) && !empty($cached)) return $cached;
    }

    $cfg_path = __DIR__ . '/../config.php';
    if (!file_exists($cfg_path)) return MARQUEE_FALLBACK;
    $cfg = require $cfg_path;
    if (empty($cfg['supabase_access_token']) || $cfg['supabase_access_token'] === 'sbp_REPLACE_ME') {
        return MARQUEE_FALLBACK;
    }

    $sql = "SELECT MIN(INITCAP(TRIM(s.artist))) AS artist, COUNT(*) AS n "
         . "FROM songs s JOIN band_songs bs ON bs.song_id = s.id "
         . "WHERE bs.band_id = '" . $cfg['stompers_band_id'] . "' "
         . "AND TRIM(s.artist) <> '' "
         . "GROUP BY LOWER(TRIM(s.artist)) "
         . "ORDER BY n DESC, artist ASC LIMIT 25;";

    $url = "https://api.supabase.com/v1/projects/{$cfg['supabase_project_ref']}/database/query";
    $ctx = stream_context_create(['http' => [
        'method'  => 'POST',
        'timeout' => 5,
        'header'  => "Authorization: Bearer {$cfg['supabase_access_token']}\r\n"
                   . "Content-Type: application/json\r\n",
        'content' => json_encode(['query' => $sql]),
        'ignore_errors' => true,
    ]]);
    $resp = @file_get_contents($url, false, $ctx);
    if (!$resp) return MARQUEE_FALLBACK;

    $rows = json_decode($resp, true);
    if (!is_array($rows) || empty($rows)) return MARQUEE_FALLBACK;

    $artists = array_values(array_filter(array_map(fn($r) => $r['artist'] ?? '', $rows)));
    if (empty($artists)) return MARQUEE_FALLBACK;

    @file_put_contents(MARQUEE_CACHE_FILE, json_encode($artists));
    return $artists;
}

$marquee_artists = fetch_marquee_artists();
$marquee_loop    = array_merge($marquee_artists, $marquee_artists);
?>
<div class="hero-marquee" aria-hidden="true">
  <div class="hero-marquee-track">
    <?php foreach ($marquee_loop as $a): ?>
      <span class="hero-marquee-item"><span><?= htmlspecialchars($a) ?></span><span class="star">&#10022;</span></span>
    <?php endforeach; ?>
  </div>
</div>
