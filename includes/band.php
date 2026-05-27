<?php
$members = [
  ['num'=>1,'name'=>'Rob',  'role'=>'Guitar / Vocals','img'=>'img/rob.jpg',
   'bio'=>'Founder. Tone wizard. Pedal hoarder. Spent a decade studying the greats before finding his own voice. Will spend 45 minutes getting his sound right, then play a solo that makes you forget your own name.',
   'faves'=>'Skynyrd, Tom Petty, SRV, Allmans, Clapton'],
  ['num'=>2,'name'=>'Jeans','role'=>'Guitar / Vocals','img'=>'img/jeans.jpg',
   'bio'=>'Country roots, blues soul. Grew up on Merle and Waylon, then fell headfirst into blues rock. Always has a Telecaster in hand. Basically a fifth limb at this point.',
   'faves'=>'Merle Haggard, Waylon Jennings, Dwight Yoakam, Black Crowes'],
  ['num'=>3,'name'=>'Max',  'role'=>'Bass / Vocals','img'=>'img/max.jpg',
   'bio'=>'New on the low end. Bio coming soon.',
   'faves'=>'(coming soon)'],
  ['num'=>4,'name'=>'Matt', 'role'=>'Drums','img'=>'img/matt.jpg',
   'bio'=>'Jazz-trained, rock-leaning. Matt keeps things steady in the pocket, until he doesn\'t. When "Mad Matt" goes off the rails with a solo, the rest of us hang on and enjoy the ride.',
   'faves'=>'(coming soon)'],
];
?>
<section id="band" class="section" data-screen-label="Band">
  <header class="section-header">
    <span class="eyebrow">The lineup</span>
    <h2 class="section-title">The Band</h2>
    <p class="section-subtitle">Four faces. One sound. Built on a swamp.</p>
  </header>
  <div class="band-grid">
    <?php foreach ($members as $m): ?>
    <article class="member-card">
      <div class="member-card-img"><img src="<?= htmlspecialchars($m['img']) ?>" alt="<?= htmlspecialchars($m['name']) ?>" loading="lazy"/></div>
      <div class="member-card-body">
        <div class="member-card-num">Member &middot; 0<?= $m['num'] ?></div>
        <div class="member-card-name"><?= htmlspecialchars($m['name']) ?></div>
        <div class="member-card-role"><?= htmlspecialchars($m['role']) ?></div>
        <div class="member-card-bio"><?= htmlspecialchars($m['bio']) ?></div>
        <div class="member-card-faves">
          <span class="faves-label">For fans of</span>
          <span class="faves-list"><?= htmlspecialchars($m['faves']) ?></span>
        </div>
      </div>
    </article>
    <?php endforeach; ?>
  </div>
</section>
