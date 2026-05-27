<?php
// Watch section — real YouTube videos via facade pattern.
// Thumbnails pulled from i.ytimg.com (no extra requests). Click loads
// the iframe with autoplay. JS handles the swap + iframe injection.
$videos = [
  ['id'=>'3SXXD0hYfRI', 'title'=>'Stompers @ The Neighbourhood Pub', 'tag'=>'Ottawa · 2025'],
  ['id'=>'5ojuRA6IuWE', 'title'=>'Neighbourhood Pub',                'tag'=>'Ottawa · Apr 18 2025'],
  ['id'=>'AOFHYaxoUFg', 'title'=>'Stompers @ Busters',               'tag'=>'Kanata · Mar 1 2025'],
  ['id'=>'NmrDp1uzJMc', 'title'=>'Neighbourhood Pub',                'tag'=>'Ottawa · Apr 18 2025'],
  ['id'=>'PZC1ZlgIBa8', 'title'=>'Stompers @ Busters',               'tag'=>'Kanata · Mar 1 2025'],
  ['id'=>'YJfmNoQI_ZY', 'title'=>'Neighbourhood Pub',                'tag'=>'Ottawa · Apr 18 2025'],
  ['id'=>'xIrgX2n32go', 'title'=>'Neighbourhood Pub',                'tag'=>'Ottawa · Apr 18 2025'],
];
$first = $videos[0];
$thumb = "https://i.ytimg.com/vi/{$first['id']}/hqdefault.jpg";
?>
<section id="watch" class="section section-tobacco" data-screen-label="Watch">
  <div class="section-tobacco-inner">
    <header class="section-header">
      <span class="eyebrow">Live from the swamp</span>
      <h2 class="section-title">Watch</h2>
      <p class="section-subtitle">A few clips off the road. Full playlist on YouTube.</p>
    </header>
    <div class="watch-frame" id="js-watch-frame" data-video-id="<?= e($first['id']) ?>">
      <img id="js-watch-img" src="<?= e($thumb) ?>" alt="<?= e($first['title']) ?>" loading="lazy"/>
      <button class="watch-play" id="js-watch-play" type="button" aria-label="Play video">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
      </button>
      <div class="watch-meta">
        <div class="watch-title" id="js-watch-title"><?= e($first['title']) ?></div>
        <div class="watch-stamp" id="js-watch-stamp"><?= e($first['tag']) ?></div>
      </div>
    </div>
    <div class="watch-thumbs">
      <?php foreach ($videos as $i => $v):
        $vThumb = "https://i.ytimg.com/vi/{$v['id']}/hqdefault.jpg";
      ?>
      <button class="watch-thumb<?= $i === 0 ? ' is-active' : '' ?>"
              data-video-id="<?= e($v['id']) ?>"
              data-thumb="<?= e($vThumb) ?>"
              data-title="<?= e($v['title']) ?>"
              data-stamp="<?= e($v['tag']) ?>">
        <img src="<?= e($vThumb) ?>" alt="<?= e($v['title']) ?>" loading="lazy"/>
        <span class="watch-thumb-label"><?= e($v['title']) ?></span>
      </button>
      <?php endforeach; ?>
    </div>
    <div style="text-align:center; margin-top:28px;">
      <a class="btn btn-outline" href="https://youtube.com/playlist?list=PLy1-_1Va1knJ8knIMNVISzCq9HsexLwf-" target="_blank" rel="noopener">Full playlist on YouTube</a>
    </div>
  </div>
</section>
