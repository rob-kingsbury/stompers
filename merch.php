<?php
$page_title = 'Merch | Swamp City Stompers';
$page_description = 'Official Swamp City Stompers merchandise - t-shirts, hoodies, hats, and more.';
$nav_extra_before = '    <a href="#" class="header-cart" aria-label="Shopping cart">
      <svg viewBox="0 0 24 24">
        <path d="M6 6h15l-1.5 9h-12z"/>
        <circle cx="9" cy="20" r="1"/>
        <circle cx="18" cy="20" r="1"/>
        <path d="M6 6L5 3H2"/>
      </svg>
      <span class="header-cart-badge" data-count="0">0</span>
    </a>
    <span class="header-divider"></span>';
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<?php include 'includes/head.php'; ?>
</head>
<body data-barba="wrapper" data-page="merch">
<?php include 'includes/nav.php'; ?>

  <main class="page-main immersive" id="main-content" data-barba="container" data-barba-namespace="merch">
    <section class="page-hero page-hero--merch">
      <img class="page-hero-bg" src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1600&q=75&auto=format&fit=crop" alt="" loading="eager" aria-hidden="true">
      <div class="page-hero-content">
        <span class="section-number">OFFICIAL GEAR</span>
        <h1 class="page-title">Merch</h1>
      </div>
    </section>

    <section class="section--merch-products">
      <article class="product-slide product-slide--1">
        <div class="product-slide-image">
          <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800" alt="Classic Logo Tee" loading="lazy">
        </div>
        <div class="product-slide-content">
          <span class="product-slide-category">Apparel</span>
          <h2 class="product-slide-title">Classic Logo Tee</h2>
          <p class="product-slide-price">$25</p>
          <p class="product-slide-description">
            Premium cotton tee with the iconic Stompers logo. Comfortable fit that gets better with every wash. Available in black and swamp green.
          </p>
          <div class="product-slide-variants">
            <button class="product-variant-btn">S</button>
            <button class="product-variant-btn is-active">M</button>
            <button class="product-variant-btn">L</button>
            <button class="product-variant-btn">XL</button>
            <button class="product-variant-btn">2XL</button>
          </div>
          <div class="product-slide-actions">
            <button class="btn btn--primary" data-add-cart="tee">Add to Cart</button>
            <button class="btn btn--outline">Size Guide</button>
          </div>
        </div>
      </article>

      <article class="product-slide product-slide--2 product-slide--reverse">
        <div class="product-slide-image">
          <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800" alt="Swamp Hoodie" loading="lazy">
        </div>
        <div class="product-slide-content">
          <span class="product-slide-category">Apparel</span>
          <h2 class="product-slide-title">Swamp Hoodie</h2>
          <p class="product-slide-price">$45</p>
          <p class="product-slide-description">
            Heavyweight hoodie with embroidered logo on chest. Perfect for cold nights at outdoor shows. Soft fleece interior keeps you warm.
          </p>
          <div class="product-slide-variants">
            <button class="product-variant-btn">S</button>
            <button class="product-variant-btn">M</button>
            <button class="product-variant-btn is-active">L</button>
            <button class="product-variant-btn">XL</button>
          </div>
          <div class="product-slide-actions">
            <button class="btn btn--primary" data-add-cart="hoodie">Add to Cart</button>
          </div>
        </div>
      </article>

      <article class="product-slide product-slide--3">
        <div class="product-slide-image">
          <img src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800" alt="Trucker Cap" loading="lazy">
        </div>
        <div class="product-slide-content">
          <span class="product-slide-category">Accessories</span>
          <h2 class="product-slide-title">Trucker Cap</h2>
          <p class="product-slide-price">$20</p>
          <p class="product-slide-description">
            Classic trucker style with mesh back and embroidered front patch. Adjustable snapback fits all. One size fits most.
          </p>
          <div class="product-slide-actions">
            <button class="btn btn--primary" data-add-cart="cap">Add to Cart</button>
          </div>
        </div>
      </article>

      <article class="product-slide product-slide--4 product-slide--reverse">
        <div class="product-slide-image">
          <img src="https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=800" alt="Debut Album Vinyl" loading="lazy">
        </div>
        <div class="product-slide-content">
          <span class="product-slide-category">Music</span>
          <h2 class="product-slide-title">Debut Album</h2>
          <p class="product-slide-price">$30</p>
          <p class="product-slide-description">
            Limited edition 180g vinyl pressing. Audiophile quality with gatefold sleeve featuring exclusive photos and liner notes.
          </p>
          <div class="product-slide-actions">
            <button class="btn btn--primary" data-add-cart="vinyl">Add to Cart</button>
            <button class="btn btn--outline">Listen Preview</button>
          </div>
        </div>
      </article>
    </section>

    <section class="merch-cta">
      <p class="merch-cta-text">
        Merch available at all shows. Online orders ship within 5-7 business days. Questions? <a href="contact" style="color: var(--color-accent);">Contact us</a>.
      </p>
    </section>

    <?php include 'includes/footer.php'; ?>
  </main>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      let cartCount = 0;
      const badge = document.querySelector('.header-cart-badge');

      document.querySelectorAll('[data-add-cart]').forEach(btn => {
        btn.addEventListener('click', () => {
          cartCount++;
          badge.textContent = cartCount;
          badge.dataset.count = cartCount;

          // Simple bounce via CSS animation (no gsap dependency)
          badge.style.transform = 'scale(1.5)';
          badge.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
          setTimeout(() => { badge.style.transform = 'scale(1)'; }, 50);

          const originalText = btn.textContent;
          btn.textContent = 'Added!';
          btn.disabled = true;
          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 1500);
        });
      });

      document.querySelectorAll('.product-slide-variants').forEach(group => {
        const buttons = group.querySelectorAll('.product-variant-btn');
        buttons.forEach(btn => {
          btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
          });
        });
      });
    });
  </script>
</body>
</html>
