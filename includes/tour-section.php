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
      <div class="tour-featured-grid">
        <div class="tour-featured-info">
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
        <?php if (!empty($featured['map_q'])): ?>
        <div class="tour-featured-map">
          <iframe src="https://www.google.com/maps?q=<?= e($featured['map_q']) ?>&output=embed"
                  loading="lazy"
                  title="Map showing <?= e($featured['venue']) ?>, <?= e($featured['location']) ?>"></iframe>
        </div>
        <?php endif; ?>
      </div>
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
        <div class="tour-acc-item">
          <button class="tour-acc-head" type="button" aria-expanded="false">
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

  <?php if (!empty($past_shows)): ?>
    <div class="tour-archive-cta">
      <button class="tour-archive-link" type="button" id="js-archive-open"
              data-count="<?= count($past_shows) ?>">
        View past shows
        <span class="acc-count"><?= count($past_shows) ?></span>
      </button>
    </div>
  <?php endif; ?>
</section>

<?php if (!empty($past_shows)): ?>
<div class="archive-overlay" id="js-archive-overlay" role="dialog" aria-modal="true" aria-label="Past shows">
  <div class="archive-modal">
    <button class="archive-close" id="js-archive-close" aria-label="Close">&times;</button>
    <header class="archive-header">
      <span class="eyebrow">The road so far</span>
      <h3>Past shows</h3>
      <p class="archive-sub"><?= count($past_shows) ?> show<?= count($past_shows) === 1 ? '' : 's' ?> played, newest first.</p>
    </header>
    <ul class="archive-list" id="js-archive-list" data-page-size="20">
      <?php foreach ($past_shows as $i => $s):
        $sMap = show_map_url($s);
      ?>
        <li class="archive-row" data-idx="<?= $i ?>">
          <span class="archive-date"><?= e($s['month']) ?> <?= e($s['day']) ?> <?= e($s['year']) ?></span>
          <span class="archive-venue"><?= e($s['venue']) ?></span>
          <span class="archive-loc"><?= e($s['location']) ?></span>
          <?php if ($sMap): ?>
            <a class="archive-map-link" href="<?= e($sMap) ?>" target="_blank" rel="noopener">Map</a>
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
    </ul>
    <div class="archive-loadmore-row">
      <button class="btn btn-ghost" id="js-archive-loadmore" type="button" hidden>Load more</button>
    </div>
  </div>
</div>
<?php endif; ?>
