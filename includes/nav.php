  <a href="#main-content" class="skip-link">Skip to main content</a>

  <div class="hamburger-container">
<?php if (!empty($nav_extra_before)): ?>
    <?= $nav_extra_before ?>
<?php endif; ?>
    <button class="hamburger" aria-label="Toggle menu" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

  <div class="menu-overlay" aria-hidden="true">
    <nav class="menu-nav">
      <a href="index.php" class="menu-nav-link">Home</a>
      <a href="tour.php" class="menu-nav-link">Tour</a>
      <a href="story.php" class="menu-nav-link">Story</a>
      <a href="epk.php" class="menu-nav-link">EPK</a>
      <a href="merch.php" class="menu-nav-link">Merch</a>
      <a href="contact.php" class="menu-nav-link">Contact</a>
    </nav>
    <div class="menu-footer">
      <a href="https://facebook.com/swampcitystompers" target="_blank" rel="noopener">Facebook</a>
      <a href="https://instagram.com/swampcitystompers" target="_blank" rel="noopener">Instagram</a>
      <a href="https://youtube.com/@swampcitystompers" target="_blank" rel="noopener">YouTube</a>
    </div>
  </div>
