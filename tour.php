<?php
$page_title = 'Tour | Swamp City Stompers';
$page_description = 'Catch the Swamp City Stompers live - upcoming shows and tour dates.';
require_once 'includes/tour-dates.php';
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<?php include 'includes/head.php'; ?>
</head>
<body data-barba="wrapper" data-page="tour">
<?php include 'includes/nav.php'; ?>

  <main class="page-main" id="main-content" data-barba="container" data-barba-namespace="tour">

    <!-- HERO -->
    <section class="page-hero page-hero--tour">
      <img class="page-hero-bg" src="https://images.unsplash.com/photo-1658091747909-91188be4df87?w=1600&q=75&auto=format&fit=crop" alt="" loading="eager" aria-hidden="true">
      <div class="page-hero-content">
        <span class="eyebrow">Live Shows</span>
        <h1 class="page-title">Tour</h1>
        <p class="page-subtitle"><?= count($future_shows) ?> upcoming dates across Eastern Ontario &amp; Western Quebec</p>
      </div>
    </section>

    <!-- ALL SHOWS -->
    <section class="content-section tour-page-dates">
      <header class="section-header section-header--center">
        <span class="eyebrow">Upcoming</span>
        <h2 class="section-title">All Shows</h2>
      </header>

      <div class="tour-accordion-list" id="tour-page-accordion">
        <?php foreach ($future_shows as $i => $show): ?>
        <div class="tour-accordion-item<?= $i >= 50 ? ' is-hidden' : '' ?>" data-venue="<?= htmlspecialchars($show['venue']) ?>">
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
      <?php if (count($future_shows) > 50): ?>
      <button class="tour-show-more" id="tour-page-show-more" aria-label="Show more dates">
        Show More Dates
      </button>
      <?php endif; ?>

      <?php if (empty($future_shows)): ?>
      <p class="tour-no-shows">No upcoming shows scheduled. Check back soon or follow us on social media for announcements.</p>
      <?php endif; ?>
    </section>

    <!-- CTA -->
    <section class="cta-section tour-cta">
      <div class="cta-content">
        <span class="eyebrow">Bookings</span>
        <h2>Book the Stompers</h2>
        <p>Looking for a band that packs the house? Let's talk.</p>
        <a href="contact" class="btn btn-primary">Get in Touch</a>
      </div>
    </section>

    <?php include 'includes/footer.php'; ?>
  </main>

</body>
</html>
