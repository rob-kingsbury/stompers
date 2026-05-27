<?php require_once __DIR__ . '/includes/helpers.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
<?php include __DIR__ . '/includes/head.php'; ?>
</head>
<body>
  <div class="grain-overlay"></div>
  <div class="vignette-overlay"></div>

  <?php include __DIR__ . '/includes/nav.php'; ?>
  <main>
    <?php include __DIR__ . '/includes/hero.php'; ?>
    <?php include __DIR__ . '/includes/about.php'; ?>
    <?php include __DIR__ . '/includes/band.php'; ?>
    <?php include __DIR__ . '/includes/tour-section.php'; ?>
    <?php include __DIR__ . '/includes/watch.php'; ?>
    <?php include __DIR__ . '/includes/epk.php'; ?>
    <?php include __DIR__ . '/includes/contact.php'; ?>
  </main>
  <?php include __DIR__ . '/includes/footer.php'; ?>
  <?php include __DIR__ . '/includes/ticket-modal.php'; ?>

  <script src="js/site.js" defer></script>
</body>
</html>
