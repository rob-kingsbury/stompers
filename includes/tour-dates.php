<?php
/**
 * Single source of truth for all tour dates.
 *
 * Include this file wherever tour data is needed.
 * Provides:
 *   $all_shows    — every show (raw data)
 *   $future_shows — auto-pruned (day-of stays, removed day after)
 *   $upcoming     — next 3 future shows (for homepage fullpage cards)
 */

$all_shows = [
  ['day' => '27', 'month' => 'MAR', 'year' => '2026', 'venue' => 'Kaffe 1870', 'location' => 'Wakefield, QC', 'age' => '18+', 'lat' => '45.6384', 'lng' => '-75.9231', 'map_q' => 'Kaffe+1870+Wakefield+QC'],
  ['day' => '17', 'month' => 'APR', 'year' => '2026', 'venue' => "Rob Roy's", 'location' => 'Smiths Falls, ON', 'age' => '19+', 'lat' => '44.9042', 'lng' => '-76.0274', 'map_q' => 'Rob+Roys+Smiths+Falls+ON'],
  ['day' => '30', 'month' => 'APR', 'year' => '2026', 'venue' => 'Hard Rock Cafe', 'location' => 'Gloucester, ON', 'age' => '19+', 'lat' => '45.2946', 'lng' => '-75.6056', 'note' => 'Blues Society / Pending', 'map_q' => '4837+Albion+Rd+S+Gloucester+ON'],
  ['day' => '22', 'month' => 'MAY', 'year' => '2026', 'venue' => 'Busters', 'location' => 'Kanata, ON', 'age' => '19+', 'lat' => '45.3088', 'lng' => '-75.9108', 'map_q' => 'Busters+Bar+and+Grill+Kanata+ON'],
  ['day' => '23', 'month' => 'MAY', 'year' => '2026', 'venue' => 'The Buckle', 'location' => 'Kingston, ON', 'age' => '19+', 'lat' => '44.2312', 'lng' => '-76.4860', 'map_q' => 'The+Buckle+Kingston+ON'],
  ['day' => '12', 'month' => 'JUN', 'year' => '2026', 'venue' => 'Kaffe 1870', 'location' => 'Wakefield, QC', 'age' => '18+', 'lat' => '45.6384', 'lng' => '-75.9231', 'map_q' => 'Kaffe+1870+Wakefield+QC'],
  ['day' => '01', 'month' => 'JUL', 'year' => '2026', 'venue' => 'Aylmer Legion', 'location' => 'Aylmer, QC', 'age' => '18+', 'lat' => '45.3941', 'lng' => '-75.8486', 'map_q' => 'Royal+Canadian+Legion+Aylmer+QC'],
  ['day' => '18', 'month' => 'JUL', 'year' => '2026', 'venue' => 'Brauwerk Hoffman', 'location' => "Campbell's Bay, QC", 'age' => '18+', 'lat' => '45.7294', 'lng' => '-76.5917', 'map_q' => 'Brauwerk+Hoffman+Campbells+Bay+QC'],
  ['day' => '08', 'month' => 'AUG', 'year' => '2026', 'venue' => 'The Cupboard', 'location' => 'Arnprior, ON', 'age' => '19+', 'lat' => '45.4346', 'lng' => '-76.3529', 'map_q' => 'The+Cupboard+Arnprior+ON'],
  ['day' => '07', 'month' => 'NOV', 'year' => '2026', 'venue' => 'The Cupboard', 'location' => 'Arnprior, ON', 'age' => '19+', 'lat' => '45.4346', 'lng' => '-76.3529', 'map_q' => 'The+Cupboard+Arnprior+ON'],
];

// Auto-prune: day-of stays visible (shows run past midnight), removed the day after
$cutoff = strtotime('yesterday');
$future_shows = array_values(array_filter($all_shows, function($show) use ($cutoff) {
  $month_num = date('n', strtotime($show['month'] . ' 1'));
  $show_date = mktime(0, 0, 0, $month_num, (int)$show['day'], (int)$show['year']);
  return $show_date >= $cutoff;
}));

// Next 3 shows for homepage fullpage cards
$upcoming = array_slice($future_shows, 0, 3);
