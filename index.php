<?php
$page_title = 'Swamp City Stompers | Southern Rock from the Bayou';
$page_description = 'Swamp City Stompers - Gritty southern rock, swamp blues, and roots Americana from Eastern Ontario.';
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<?php include 'includes/head.php'; ?>
</head>
<body data-barba="wrapper">
<?php include 'includes/nav.php'; ?>

  <nav class="progress-nav" aria-label="Section navigation">
    <div class="progress-pill">
      <button class="progress-dot is-active" data-section="hero" aria-label="Go to Home section">
        <span class="dot-inner"></span>
        <span class="dot-bar"></span>
        <span class="dot-tooltip">Home</span>
      </button>

      <button class="progress-dot" data-section="about" aria-label="Go to About section">
        <span class="dot-inner"></span>
        <span class="dot-bar"></span>
        <span class="dot-tooltip">About</span>
      </button>

      <button class="progress-dot" data-section="band" aria-label="Go to Band section">
        <span class="dot-inner"></span>
        <span class="dot-bar"></span>
        <span class="dot-tooltip">Band</span>
      </button>

      <button class="progress-dot" data-section="tour" aria-label="Go to Tour section">
        <span class="dot-inner"></span>
        <span class="dot-bar"></span>
        <span class="dot-tooltip">Tour</span>
      </button>

      <button class="progress-dot" data-section="watch" aria-label="Go to Watch section">
        <span class="dot-inner"></span>
        <span class="dot-bar"></span>
        <span class="dot-tooltip">Watch</span>
      </button>

    </div>
  </nav>

  <main class="immersive" id="main-content" data-barba="container" data-barba-namespace="home">
    <!-- HERO -->
    <section id="hero" class="section section--hero" data-section="hero">
      <video class="hero-video-grain" autoplay muted loop playsinline aria-hidden="true">
        <source src="img/grunge-loop.mp4" type="video/mp4">
      </video>
      <div class="hero-grain" aria-hidden="true"></div>
      <div class="hero-sparks" aria-hidden="true"></div>

      <div class="hero-logo-reveal">
        <img class="hero-logo-img" src="img/stompers-logo-full.png" alt="Swamp City Stompers" width="600" height="600">

        <div class="hero-meta">
          <span class="meta-year">Est. 2025</span>
          <span class="meta-divider">/</span>
          <span class="meta-location">Eastern Ontario, CA</span>
        </div>

        <p class="hero-tagline">Southern Rock &bull; Blues &bull; Soul &bull; Outlaw Country</p>

        <img class="hero-stamp" src="img/sleazy-rock.png" alt="100% Sleazy Rock and Roll" width="200" height="200">
      </div>

      <div class="hero-scroll-cue">
        <span>Scroll</span>
        <div class="scroll-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="section section--about" data-section="about">
      <article class="about-card about-card--1">
        <div class="about-card-image">
          <img src="https://images.unsplash.com/photo-1516734668183-dcbd209d15e0?w=800" alt="Guitarist playing in low light on a dark stage" loading="lazy">
        </div>
        <div class="about-card-content">
          <h2 class="about-card-title">The Sound</h2>
          <p class="about-card-text">
            We blend swamp blues, southern rock, and a healthy dose of grit into something
            that makes you want to drink whiskey and dance on tables. It's not pretty,
            but it's honest.
          </p>
        </div>
      </article>

      <article class="about-card about-card--2 about-card--reverse">
        <div class="about-card-image">
          <img src="https://images.unsplash.com/photo-1581617616979-ca3d553d0120?w=800" alt="Packed dark venue with low ceiling and crowd silhouettes" loading="lazy">
        </div>
        <div class="about-card-content">
          <h2 class="about-card-title">The Vibe</h2>
          <p class="about-card-text">
            We play the kind of music that makes strangers buy each other
            rounds. No phones out, no standing still. Just people having
            a damn good night.
          </p>
        </div>
      </article>

      <article class="about-card about-card--3">
        <div class="about-card-image">
          <img src="https://images.unsplash.com/photo-1553406624-8ddc9cef36b2?w=800" alt="Worn boot on a pedalboard full of guitar pedals on a dark stage" loading="lazy">
        </div>
        <div class="about-card-content">
          <h2 class="about-card-title">The Mission</h2>
          <p class="about-card-text">
            Keep real rock and roll alive. No backing tracks, no auto-tune,
            no bullshit. Just four people playing every note like it matters —
            because it does.
          </p>
        </div>
      </article>

      <article class="about-card about-card--4 about-card--reverse">
        <div class="about-card-image">
          <img src="https://images.unsplash.com/photo-1644405940732-c23906d1afca?w=800" alt="Neon sign reading Cold Beer and Rock and Roll" loading="lazy">
        </div>
        <div class="about-card-content">
          <h2 class="about-card-title">The Road</h2>
          <p class="about-card-text">
            From dive bars to festival stages, we show up and make sure
            you have a hell of a good time. Every mile, every broken string,
            every 3 AM load-out has shaped who we are. The road is home.
          </p>
        </div>
      </article>
    </section>

    <!-- BAND -->
    <section id="band" class="section section--band" data-section="band">
      <header class="section-header section-header--center">
        <h2 class="section-title">The Band</h2>
      </header>

      <div class="stack-container">
        <article class="stack-card" data-index="0">
          <div class="stack-card-inner">
            <div class="stack-card-image">
              <img src="img/rob.jpg" alt="Rob" loading="lazy">
            </div>
            <div class="stack-card-content">
              <h3 class="member-name">Rob</h3>
              <p class="member-role">Guitar / Vocals</p>
              <p class="member-bio">Tone wizard. Pedal hoarder. Spent a decade studying the greats before finding his own voice. Will spend 45 minutes getting his sound right, then play a solo that makes you forget your own name.</p>
              <blockquote class="member-quote">"If it doesn't make you feel something, we're not doing it right."</blockquote>
            </div>
          </div>
        </article>

        <article class="stack-card" data-index="1">
          <div class="stack-card-inner">
            <div class="stack-card-image">
              <img src="img/jeans.jpg" alt="Jeans" loading="lazy">
            </div>
            <div class="stack-card-content">
              <h3 class="member-name">Jeans</h3>
              <p class="member-role">Guitar / Vocals</p>
              <p class="member-bio">Country roots, blues soul. Jeans grew up on Merle and Waylon, then fell headfirst into blues rock and never came back. Always has a Telecaster in hand — it's basically a fifth limb at this point.</p>
              <blockquote class="member-quote">"A Tele through a dirty amp. That's all you need."</blockquote>
            </div>
          </div>
        </article>

        <article class="stack-card" data-index="2">
          <div class="stack-card-inner">
            <div class="stack-card-image">
              <img src="img/kurt.jpg" alt="Kurt" loading="lazy">
            </div>
            <div class="stack-card-content">
              <h3 class="member-name">Kurt</h3>
              <p class="member-role">Bass / Vocals</p>
              <p class="member-bio">Eyes closed, hands draped over the neck like a piano player — that's Kurt. He doesn't watch the fretboard, he feels it. Holds down the low end with a style all his own and a groove you can't fake.</p>
              <blockquote class="member-quote">"You don't find the groove. You let it find you."</blockquote>
            </div>
          </div>
        </article>

        <article class="stack-card" data-index="3">
          <div class="stack-card-inner">
            <div class="stack-card-image">
              <img src="img/matt.jpg" alt="Matt" loading="lazy">
            </div>
            <div class="stack-card-content">
              <h3 class="member-name">Matt</h3>
              <p class="member-role">Drums</p>
              <p class="member-bio">Jazz-trained, rock-unleashed. Matt keeps things steady in the pocket — until he doesn't. When "Mad Matt" decides to go off the rails with a solo, the rest of the band just hangs on and enjoys the ride.</p>
              <blockquote class="member-quote">"Stay in the pocket. Unless the pocket gets boring."</blockquote>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- TOUR -->
    <?php require_once 'includes/tour-dates.php'; ?>
    <section id="tour" class="section section--tour" data-section="tour">
      <div class="tour-fullpage-cards">
        <?php foreach ($upcoming as $i => $show): ?>
        <article class="tour-fullpage-card" data-show="<?= $i ?>">
          <div class="fullpage-card-bg fullpage-card-bg--map">
            <iframe class="tour-static-map" src="https://www.openstreetmap.org/export/embed.html?bbox=<?= $show['lng'] - 0.04 ?>,<?= $show['lat'] - 0.02 ?>,<?= $show['lng'] + 0.04 ?>,<?= $show['lat'] + 0.02 ?>&layer=mapnik&marker=<?= $show['lat'] ?>,<?= $show['lng'] ?>" loading="lazy" title="Map of <?= htmlspecialchars($show['venue']) ?>" aria-hidden="true"></iframe>
          </div>
          <div class="fullpage-card-content">
            <div class="show-date-big">
              <span class="date-day"><?= $show['day'] ?></span>
              <span class="date-month"><?= $show['month'] ?></span>
              <span class="date-year"><?= $show['year'] ?></span>
            </div>
            <h3 class="show-venue-big"><?= htmlspecialchars($show['venue']) ?></h3>
            <p class="show-location-big"><?= $show['location'] ?></p>
            <div class="show-details-big">
              <?php if (!empty($show['note'])): ?><span><?= $show['note'] ?></span><?php endif; ?>
              <span><?= $show['age'] ?></span>
            </div>
          </div>
        </article>
        <?php endforeach; ?>
      </div>

      <div class="tour-list-section">
        <header class="section-header section-header--center">
          <h2 class="section-title">All Shows</h2>
        </header>

        <div class="tour-accordion-list" id="tour-accordion-list">
          <?php foreach ($future_shows as $i => $show): ?>
          <div class="tour-accordion-item<?= $i >= 6 ? ' is-hidden' : '' ?>" data-venue="<?= htmlspecialchars($show['venue']) ?>">
            <button class="accordion-header" aria-expanded="false">
              <span class="accordion-date"><?= $show['month'] ?> <?= $show['day'] ?></span>
              <span class="accordion-venue"><?= htmlspecialchars($show['venue']) ?></span>
              <span class="accordion-location"><?= $show['location'] ?></span>
              <span class="accordion-icon"></span>
            </button>
            <div class="accordion-body" role="region">
              <div class="accordion-map">
                <iframe src="https://www.google.com/maps?q=<?= $show['map_q'] ?>&output=embed" loading="lazy" title="Map showing <?= htmlspecialchars($show['venue']) ?>, <?= $show['location'] ?>"></iframe>
              </div>
              <div class="accordion-details">
                <?php if (!empty($show['note'])): ?>
                <p><strong>Note:</strong> <?= $show['note'] ?></p>
                <?php endif; ?>
                <p><strong>Age:</strong> <?= $show['age'] ?></p>
              </div>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
        <?php if (count($future_shows) > 6): ?>
        <button class="tour-show-more" id="tour-show-more" aria-label="Show more dates">
          Show More Dates
        </button>
        <?php endif; ?>
      </div>
    </section>

    <!-- WATCH -->
    <section id="watch" class="section section--watch" data-section="watch">
      <div class="watch-inner">
        <header class="section-header section-header--center">
          <span class="eyebrow">Live From The Swamp</span>
          <h2 class="section-title">Watch</h2>
        </header>

        <div class="watch-player-frame">
          <div class="watch-main" id="watch-main">
            <!-- Facade: thumbnail + play button, replaced with iframe on click -->
          </div>
        </div>

        <div class="watch-thumbs" id="watch-thumbs">
          <!-- Populated by JS -->
        </div>

        <a href="https://youtube.com/playlist?list=PLy1-_1Va1knJ8knIMNVISzCq9HsexLwf-" target="_blank" rel="noopener" class="watch-playlist-link">
          Full Playlist on YouTube
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>
    </section>

    <?php include 'includes/footer.php'; ?>
  </main>

</body>
</html>
