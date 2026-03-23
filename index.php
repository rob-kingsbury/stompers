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

  <!-- Progress Nav (MetaMask Style - Vertical Pill with Blob) -->
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

      <button class="progress-dot" data-section="quote" aria-label="Go to Quote section">
        <span class="dot-inner"></span>
        <span class="dot-bar"></span>
        <span class="dot-tooltip">Words</span>
      </button>

      <button class="progress-dot" data-section="contact" aria-label="Go to Contact section">
        <span class="dot-inner"></span>
        <span class="dot-bar"></span>
        <span class="dot-tooltip">Contact</span>
      </button>
    </div>
  </nav>

  <main class="immersive" id="main-content" data-barba="container" data-barba-namespace="home">
    <!-- SECTION 1: HERO -->
    <section id="hero" class="section section--hero" data-section="hero">
      <video class="hero-video-grain" autoplay muted loop playsinline aria-hidden="true">
        <source src="img/grunge-loop.mp4" type="video/mp4">
      </video>
      <div class="hero-grain" aria-hidden="true"></div>
      <div class="hero-sparks" aria-hidden="true"></div>

      <div class="hero-logo-reveal">
        <img class="hero-logo-img" src="img/stompers-logo-full.png" alt="Swamp City Stompers" width="600" height="600">

        <div class="hero-meta">
          <span class="meta-year">Est. 2019</span>
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

    <!-- SECTION 2: ABOUT -->
    <section id="about" class="section section--about" data-section="about">
      <article class="about-card about-card--1">
        <div class="about-card-image">
          <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800" alt="Live performance" loading="lazy">
        </div>
        <div class="about-card-content">
          <span class="about-card-number">01</span>
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
          <img src="https://images.unsplash.com/photo-1501612780327-45045538702b?w=800" alt="Concert crowd" loading="lazy">
        </div>
        <div class="about-card-content">
          <span class="about-card-number">02</span>
          <h2 class="about-card-title">The Vibe</h2>
          <p class="about-card-text">
            Every show is a party, every song is a story. We don't do setlists -
            we read the room and play what feels right. Sometimes that means three
            encores. Sometimes it means one very long jam.
          </p>
        </div>
      </article>

      <article class="about-card about-card--3">
        <div class="about-card-image">
          <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800" alt="Guitar close-up" loading="lazy">
        </div>
        <div class="about-card-content">
          <span class="about-card-number">03</span>
          <h2 class="about-card-title">The Mission</h2>
          <p class="about-card-text">
            Keep real rock and roll alive. No backing tracks, no auto-tune,
            no bullshit. Just four people making noise loud enough to feel
            in your chest.
          </p>
        </div>
      </article>

      <article class="about-card about-card--4 about-card--reverse">
        <div class="about-card-image">
          <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800" alt="Stage lights" loading="lazy">
        </div>
        <div class="about-card-content">
          <span class="about-card-number">04</span>
          <h2 class="about-card-title">The Road</h2>
          <p class="about-card-text">
            From dive bars to festival stages, we've played them all. Every mile,
            every broken string, every 3 AM load-out has shaped who we are.
            The road is home.
          </p>
        </div>
      </article>
    </section>

    <!-- SECTION 3: BAND -->
    <section id="band" class="section section--band" data-section="band">
      <header class="section-header section-header--center">
        <span class="section-number">02</span>
        <h2 class="section-title">The Band</h2>
      </header>

      <div class="stack-container">
        <article class="stack-card" data-index="0">
          <div class="stack-card-inner">
            <div class="stack-card-image">
              <img src="img/rob.jpg" alt="Rob" loading="lazy">
            </div>
            <div class="stack-card-content">
              <span class="member-number">01</span>
              <h3 class="member-name">Rob</h3>
              <p class="member-role">Guitar / Vocals</p>
              <p class="member-bio">The riffs. The voice. Started the band with nothing but a broken amp and a dream. Former construction worker who traded his hard hat for a six-string.</p>
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
              <span class="member-number">02</span>
              <h3 class="member-name">Jeans</h3>
              <p class="member-role">Guitar / Vocals</p>
              <p class="member-bio">Tone wizard. Pedal hoarder. Spent a decade studying the greats before finding his own voice. Will spend 45 minutes getting his sound right, then play a solo that makes you forget your own name.</p>
              <blockquote class="member-quote">"The sound isn't something we invented. It's something we discovered."</blockquote>
            </div>
          </div>
        </article>

        <article class="stack-card" data-index="2">
          <div class="stack-card-inner">
            <div class="stack-card-image">
              <img src="img/kurt.jpg" alt="Kurt" loading="lazy">
            </div>
            <div class="stack-card-content">
              <span class="member-number">03</span>
              <h3 class="member-name">Kurt</h3>
              <p class="member-role">Bass / Vocals</p>
              <p class="member-bio">The pocket. The groove. The guy who keeps us from completely falling apart. Someone has to be the adult in the room. Also the designated driver.</p>
              <blockquote class="member-quote">"Lock in with the kick drum and let the music breathe."</blockquote>
            </div>
          </div>
        </article>

        <article class="stack-card" data-index="3">
          <div class="stack-card-inner">
            <div class="stack-card-image">
              <img src="img/matt.jpg" alt="Matt" loading="lazy">
            </div>
            <div class="stack-card-content">
              <span class="member-number">04</span>
              <h3 class="member-name">Matt</h3>
              <p class="member-role">Drums</p>
              <p class="member-bio">Hits like thunder. Drives the bus. Self-taught. Been keeping time since day one, and breaks about three sticks per show. It's part of the act now.</p>
              <blockquote class="member-quote">"Play every show like it's your last."</blockquote>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- SECTION 4: TOUR -->
    <section id="tour" class="section section--tour" data-section="tour">
      <!-- TODO: Replace placeholder images with venue/event photos -->
      <div class="tour-fullpage-cards">
        <article class="tour-fullpage-card" data-show="0">
          <div class="fullpage-card-bg">
            <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1600" alt="Kaffe 1870 Wakefield - placeholder" loading="lazy">
          </div>
          <div class="fullpage-card-content">
            <div class="show-date-big">
              <span class="date-day">27</span>
              <span class="date-month">MAR</span>
              <span class="date-year">2026</span>
            </div>
            <h3 class="show-venue-big">Kaffe 1870</h3>
            <p class="show-location-big">Wakefield, QC</p>
            <div class="show-details-big"><span>18+</span></div>
          </div>
        </article>

        <article class="tour-fullpage-card" data-show="1">
          <div class="fullpage-card-bg">
            <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600" alt="Rob Roy's Smiths Falls - placeholder" loading="lazy">
          </div>
          <div class="fullpage-card-content">
            <div class="show-date-big">
              <span class="date-day">17</span>
              <span class="date-month">APR</span>
              <span class="date-year">2026</span>
            </div>
            <h3 class="show-venue-big">Rob Roy's</h3>
            <p class="show-location-big">Smiths Falls, ON</p>
            <div class="show-details-big"><span>19+</span></div>
          </div>
        </article>

        <article class="tour-fullpage-card" data-show="2">
          <div class="fullpage-card-bg">
            <img src="https://images.unsplash.com/photo-1501612780327-45045538702b?w=1600" alt="Hard Rock Cafe Ottawa - placeholder" loading="lazy">
          </div>
          <div class="fullpage-card-content">
            <div class="show-date-big">
              <span class="date-day">30</span>
              <span class="date-month">APR</span>
              <span class="date-year">2026</span>
            </div>
            <h3 class="show-venue-big">Hard Rock Cafe</h3>
            <p class="show-location-big">Ottawa, ON (Blues Society)</p>
            <div class="show-details-big"><span>Pending</span><span>19+</span></div>
          </div>
        </article>
      </div>

      <div class="tour-list-section">
        <header class="section-header section-header--center">
          <span class="section-number">03</span>
          <h2 class="section-title">All Shows</h2>
        </header>

        <div class="tour-accordion-list" data-page="1">
          <?php
          $shows = [
            ['date' => 'MAR 27', 'venue' => 'Kaffe 1870', 'location' => 'Wakefield, QC', 'age' => '18+', 'map_q' => 'Kaffe+1870+Wakefield+QC'],
            ['date' => 'APR 17', 'venue' => "Rob Roy's", 'location' => 'Smiths Falls, ON', 'age' => '19+', 'map_q' => 'Rob+Roys+Smiths+Falls+ON'],
            ['date' => 'APR 30', 'venue' => 'Hard Rock Cafe (Blues Society)', 'location' => 'Ottawa, ON', 'age' => '19+', 'map_q' => 'Hard+Rock+Cafe+Ottawa+ON', 'status' => 'Pending'],
            ['date' => 'MAY 22', 'venue' => 'Busters', 'location' => 'Kanata, ON', 'age' => '19+', 'map_q' => 'Busters+Bar+and+Grill+Kanata+ON'],
            ['date' => 'MAY 23', 'venue' => 'The Buckle', 'location' => 'Kingston, ON', 'age' => '19+', 'map_q' => 'The+Buckle+Kingston+ON'],
            ['date' => 'JUN 12', 'venue' => 'Kaffe 1870', 'location' => 'Wakefield, QC', 'age' => '18+', 'map_q' => 'Kaffe+1870+Wakefield+QC'],
            ['date' => 'JUL 01', 'venue' => 'Aylmer Legion', 'location' => 'Aylmer, QC', 'age' => '18+', 'map_q' => 'Royal+Canadian+Legion+Aylmer+QC'],
          ];
          foreach ($shows as $show): ?>
          <div class="tour-accordion-item" data-venue="<?= htmlspecialchars($show['venue']) ?>">
            <button class="accordion-header" aria-expanded="false">
              <span class="accordion-date"><?= $show['date'] ?></span>
              <span class="accordion-venue"><?= htmlspecialchars($show['venue']) ?></span>
              <span class="accordion-location"><?= $show['location'] ?></span>
              <span class="accordion-icon"></span>
            </button>
            <div class="accordion-body" role="region">
              <div class="accordion-map">
                <iframe src="https://www.google.com/maps?q=<?= $show['map_q'] ?>&output=embed" loading="lazy" title="Map showing <?= htmlspecialchars($show['venue']) ?>, <?= $show['location'] ?>"></iframe>
              </div>
              <div class="accordion-details">
                <?php if (!empty($show['status'])): ?>
                <p><strong>Status:</strong> <?= $show['status'] ?></p>
                <?php endif; ?>
                <p><strong>Age:</strong> <?= $show['age'] ?></p>
                <a href="#" class="btn-tickets">Get Tickets</a>
              </div>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </section>

    <!-- SECTION 5: QUOTE -->
    <section id="quote" class="section section--quote" data-section="quote">
      <div class="quote-pin-wrapper">
        <div class="quote-content">
          <blockquote class="exploding-quote">
            <p class="quote-line">"We didn't set out</p>
            <p class="quote-line">to be famous.</p>
            <p class="quote-line">We set out to be</p>
            <p class="quote-line quote-line--accent">remembered."</p>
          </blockquote>
          <cite class="quote-attribution">— Rob, 2024</cite>
        </div>
      </div>
    </section>

    <!-- SECTION 6: CONTACT/FOOTER -->
    <section id="contact" class="section section--contact" data-section="contact">
      <div class="contact-parallax-wrapper">
        <div class="contact-inner">
          <header class="section-header section-header--center">
            <span class="section-number">04</span>
            <h2 class="section-title">Get In Touch</h2>
          </header>

          <div class="contact-grid">
            <div class="contact-block">
              <h3>Book The Band</h3>
              <a href="mailto:booking@swampcitystompers.ca" class="contact-email">booking@swampcitystompers.ca</a>
            </div>

            <div class="contact-block">
              <h3>Follow Us</h3>
              <div class="social-links">
                <a href="https://facebook.com/swampcitystompers" target="_blank" rel="noopener" class="social-link">Facebook</a>
                <a href="https://instagram.com/swampcitystompers" target="_blank" rel="noopener" class="social-link">Instagram</a>
                <a href="https://youtube.com/@swampcitystompers" target="_blank" rel="noopener" class="social-link">YouTube</a>
              </div>
            </div>

            <div class="contact-block">
              <h3>Resources</h3>
              <a href="epk.php" class="resource-link">Electronic Press Kit</a>
            </div>
          </div>

          <footer class="site-footer">
            <img src="img/logo-goon.png" alt="Swamp City Stompers" class="footer-logo" loading="lazy">
            <p>&copy; <?= date('Y') ?> Swamp City Stompers</p>
            <p>Eastern Ontario, Canada</p>
          </footer>
        </div>
      </div>
    </section>
  </main>

</body>
</html>
