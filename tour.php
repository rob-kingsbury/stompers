<?php
$page_title = 'Tour | Swamp City Stompers';
$page_description = 'Catch the Swamp City Stompers live - upcoming shows and tour dates.';
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<?php include 'includes/head.php'; ?>
</head>
<body data-barba="wrapper" data-page="tour">
<?php include 'includes/nav.php'; ?>

  <main class="page-main" id="main-content" data-barba="container" data-barba-namespace="tour">
    <section class="page-hero page-hero--tour">
      <div class="page-hero-bg">
        <img src="https://images.unsplash.com/photo-1501612780327-45045538702b?w=1600" alt="Concert crowd" loading="lazy">
      </div>
      <div class="page-hero-overlay"></div>
      <div class="page-hero-content">
        <span class="section-number">LIVE SHOWS</span>
        <h1 class="page-title">Tour</h1>
        <p class="page-subtitle">Scroll to explore upcoming dates</p>
      </div>
      <div class="page-hero-scroll-cue">
        <span>Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <section class="tour-horizontal">
      <div class="tour-horizontal-progress">
        <div class="tour-horizontal-progress-bar"></div>
      </div>
      <div class="tour-cards-wrapper">
        <?php
        require_once 'includes/tour-dates.php';
        foreach ($future_shows as $i => $card): ?>
        <article class="tour-card-horizontal">
          <div class="tour-card-horizontal-bg">
            <img src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1200" alt="<?= htmlspecialchars($card['venue']) ?> - placeholder" loading="lazy">
          </div>
          <div class="tour-card-horizontal-overlay"></div>
          <div class="tour-card-horizontal-content">
            <div class="tour-card-horizontal-date">
              <span class="date-day"><?= $card['day'] ?></span>
              <span class="date-month"><?= $card['month'] ?></span>
              <span class="date-year"><?= $card['year'] ?></span>
            </div>
            <div class="tour-card-horizontal-info">
              <h2 class="tour-venue-large"><?= htmlspecialchars($card['venue']) ?></h2>
              <p class="tour-location-large"><?= $card['location'] ?></p>
              <p class="tour-time"><?= $card['age'] ?><?= !empty($card['note']) ? ' / ' . $card['note'] : '' ?></p>
            </div>
          </div>
          <div class="tour-card-horizontal-number"><?= str_pad($i + 1, 2, '0', STR_PAD_LEFT) ?></div>
        </article>
        <?php endforeach; ?>
      </div>
    </section>

    <section class="cta-section tour-cta">
      <div class="cta-content">
        <h2>Book the Stompers</h2>
        <p>Looking for a band that'll shake the rafters and get the crowd moving? Let's talk.</p>
        <a href="contact.php" class="btn btn-primary">Get in Touch</a>
      </div>
    </section>

    <?php include 'includes/footer.php'; ?>
  </main>

</body>
</html>
