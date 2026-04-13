<?php
$page_title = 'EPK | Swamp City Stompers';
$page_description = 'Electronic Press Kit for the Swamp City Stompers - photos, bio, tech rider, and booking info.';
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<?php include 'includes/head.php'; ?>
</head>
<body data-barba="wrapper" data-page="epk">
<?php include 'includes/nav.php'; ?>

  <main class="page-main" id="main-content" data-barba="container" data-barba-namespace="epk">

    <!-- Hero -->
    <section class="page-hero page-hero--epk">
      <img class="page-hero-bg" src="https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=1600&q=75&auto=format&fit=crop" alt="" loading="eager" aria-hidden="true">
      <div class="page-hero-content">
        <span class="section-number">ELECTRONIC PRESS KIT</span>
        <h1 class="page-title">EPK</h1>
      </div>
    </section>

    <!-- Split Screen EPK -->
    <div class="epk-split">

      <!-- Left: Sticky sidebar with essentials -->
      <aside class="epk-split-left">
        <h2 class="epk-split-band">Swamp City<br>Stompers</h2>
        <span class="section-number">Southern Rock / Blues / Soul</span>
        <div class="epk-split-location">Eastern Ontario, Canada &middot; Est. 2025</div>

        <a href="contact" class="btn btn-primary epk-split-book">Book This Band</a>

      </aside>

      <!-- Right: Scrollable content -->
      <div class="epk-split-right">

        <section class="epk-split-section">
          <h2 class="epk-split-heading">About</h2>
          <p class="epk-split-bio-short">
            The Swamp City Stompers are a four-piece southern rock and blues outfit from Eastern Ontario. We're the B-side guys &mdash; we play the familiar favorites people forgot they loved, the deep cuts that get the best reaction, the songs that deserved a bigger stage.
          </p>
          <p class="epk-split-bio-long">
            No setlists, no obvious hits, no filler. We read the room and pull from a catalogue of rock, blues, soul, and outlaw country that spans five decades. Dual guitars trading leads over a locked-in rhythm section, tight vocal harmonies, and the kind of energy that keeps people off their phones and on their feet. From dive bars to festival stages, we deliver sets built to fill rooms and empty beer fridges.
          </p>
        </section>

        <section class="epk-split-section">
          <h2 class="epk-split-heading">Genre</h2>
          <div class="epk-split-tags">
            <span class="epk-split-tag epk-split-tag--gold">Southern Rock</span>
            <span class="epk-split-tag epk-split-tag--gold">Blues</span>
            <span class="epk-split-tag epk-split-tag--gold">Soul</span>
            <span class="epk-split-tag epk-split-tag--gold">Outlaw Country</span>
          </div>
        </section>

        <section class="epk-split-section">
          <h2 class="epk-split-heading">For Fans Of</h2>
          <div class="epk-split-tags">
            <span class="epk-split-tag">ZZ Top</span>
            <span class="epk-split-tag">CCR</span>
            <span class="epk-split-tag">The Black Keys</span>
            <span class="epk-split-tag">Rival Sons</span>
            <span class="epk-split-tag">Black Crowes</span>
          </div>
        </section>

        <section class="epk-split-section">
          <h2 class="epk-split-heading">Set Lengths</h2>
          <ul class="epk-split-sets">
            <li>
              <span>45-Minute Set</span>
              <span>Festival slot or opening set</span>
            </li>
            <li>
              <span>90-Minute Set</span>
              <span>Standard club or venue booking</span>
            </li>
            <li class="epk-split-sets--featured">
              <span>Full Evening</span>
              <span>Multi-set evening with breaks</span>
            </li>
          </ul>
        </section>

        <section class="epk-split-section">
          <h2 class="epk-split-heading">The Lineup</h2>
          <ul class="epk-split-members">
            <li><strong>Rob</strong> &mdash; Guitar / Vocals</li>
            <li><strong>Jeans</strong> &mdash; Guitar / Vocals</li>
            <li><strong>Kurt</strong> &mdash; Bass / Vocals</li>
            <li><strong>Matt</strong> &mdash; Drums</li>
          </ul>
        </section>

        <section class="epk-split-section">
          <div class="epk-split-quote">
            <blockquote>
              "These guys bring the kind of energy you can't fake. The room was packed and nobody left. Book them."
            </blockquote>
            <cite>&mdash; Venue Owner</cite>
          </div>
        </section>

      </div>
    </div>

    <!-- CTA -->
    <section class="cta-section epk-cta">
      <div class="cta-content">
        <h2>Book the Stompers</h2>
        <p>Festivals, clubs, private events &mdash; we bring the heat.</p>
        <div class="epk-cta-actions">
          <a href="contact" class="btn btn-primary">Get in Touch</a>
        </div>
      </div>
    </section>

    <?php include 'includes/footer.php'; ?>
  </main>

</body>
</html>
