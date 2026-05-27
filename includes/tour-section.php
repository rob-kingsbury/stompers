<?php
/**
 * Tour section — Stompers live CSV pipeline (includes/tour-dates.php).
 * First future show is featured; the rest go into the accordion.
 */
require_once __DIR__ . '/tour-dates.php';

$featured = $future_shows[0] ?? null;
$rest     = array_slice($future_shows, 1);

function month_long(string $m): string {
    $map = ['JAN'=>'January','FEB'=>'February','MAR'=>'March','APR'=>'April','MAY'=>'May','JUN'=>'June','JUL'=>'July','AUG'=>'August','SEP'=>'September','OCT'=>'October','NOV'=>'November','DEC'=>'December'];
    return $map[strtoupper($m)] ?? $m;
}

function show_map_url(array $s): string {
    if (!empty($s['map_q'])) {
        return 'https://www.google.com/maps/search/?api=1&query=' . $s['map_q'];
    }
    return '';
}
?>
<section id="tour" class="section" data-screen-label="Tour">
  <header class="section-header">
    <span class="eyebrow">Where we'll be</span>
    <h2 class="section-title">Tour</h2>
    <p class="section-subtitle">Bars, breweries, legions, the odd festival stage. Pull up a chair.</p>
  </header>

  <?php if ($featured):
    $fDate = e($featured['day'] . ' ' . month_long($featured['month']) . ' ' . $featured['year']);
    $fTime = $featured['time'] !== '' ? $featured['time'] : 'Time TBA';
  ?>
    <div class="tour-featured">
      <div class="tour-featured-eyebrow"><span class="star">&#10022;</span>&nbsp; Next show &nbsp;<span class="star">&#10022;</span></div>
      <div class="tour-featured-date">
        <div class="tour-featured-day"><?= e($featured['day']) ?></div>
        <div class="tour-featured-monyear">
          <span class="month"><?= e(month_long($featured['month'])) ?></span>
          <span class="year"><?= e($featured['year']) ?></span>
        </div>
      </div>
      <div class="tour-featured-venue"><?= e($featured['venue']) ?></div>
      <div class="tour-featured-loc"><?= e($featured['location']) ?></div>
      <div class="tour-featured-meta">
        <span><?= e($fTime) ?></span><span>&middot;</span>
        <span><?= e($featured['age']) ?></span>
        <?php if (!empty($featured['note'])): ?>
          <span>&middot;</span><span><?= e($featured['note']) ?></span>
        <?php endif; ?>
      </div>
      <button class="btn btn-primary js-ticket-open"
              data-date="<?= $fDate ?>"
              data-venue="<?= e($featured['venue']) ?>"
              data-loc="<?= e($featured['location']) ?>"
              data-time="<?= e($fTime) ?>"
              data-age="<?= e($featured['age']) ?>"
              data-note="<?= e($featured['note']) ?>"
              data-map="<?= e(show_map_url($featured)) ?>">Show details</button>
    </div>
  <?php else: ?>
    <p class="tour-empty">No shows on the books. Check back soon.</p>
  <?php endif; ?>

  <?php if ($rest): ?>
    <div class="tour-accordion">
      <?php foreach ($rest as $i => $s):
        $sDate = e($s['day'] . ' ' . month_long($s['month']) . ' ' . $s['year']);
        $sTime = $s['time'] !== '' ? $s['time'] : 'Time TBA';
        $sMap  = show_map_url($s);
      ?>
        <div class="tour-acc-item<?= $i === 0 ? ' is-open' : '' ?>">
          <button class="tour-acc-head" type="button" aria-expanded="<?= $i === 0 ? 'true' : 'false' ?>">
            <span class="acc-date"><?= e($s['month']) ?> <?= e($s['day']) ?></span>
            <span class="acc-venue"><?= e($s['venue']) ?></span>
            <span class="acc-loc"><?= e($s['location']) ?></span>
            <span class="acc-icon">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="1" x2="5" y2="9"/><line x1="1" y1="5" x2="9" y2="5"/></svg>
            </span>
          </button>
          <div class="tour-acc-body">
            <div class="tour-acc-body-inner">
              <div class="acc-detail-row"><span class="label">Time</span><span class="value"><?= e($sTime) ?></span></div>
              <div class="acc-detail-row"><span class="label">Age</span><span class="value"><?= e($s['age']) ?></span></div>
              <?php if (!empty($s['note'])): ?>
                <div class="acc-detail-row"><span class="label">Notes</span><span class="value"><?= e($s['note']) ?></span></div>
              <?php endif; ?>
              <div class="acc-cta-row">
                <button class="btn btn-primary js-ticket-open"
                        data-date="<?= $sDate ?>"
                        data-venue="<?= e($s['venue']) ?>"
                        data-loc="<?= e($s['location']) ?>"
                        data-time="<?= e($sTime) ?>"
                        data-age="<?= e($s['age']) ?>"
                        data-note="<?= e($s['note']) ?>"
                        data-map="<?= e($sMap) ?>">Show details</button>
                <?php if ($sMap): ?>
                  <a class="btn btn-ghost" href="<?= e($sMap) ?>" target="_blank" rel="noopener">Map</a>
                <?php endif; ?>
              </div>
            </div>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</section>
