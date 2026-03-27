<?php
$page_title = 'Contact | Swamp City Stompers';
$page_description = 'Get in touch with the Swamp City Stompers - booking inquiries and general contact.';
?>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<?php include 'includes/head.php'; ?>
</head>
<body data-barba="wrapper" data-page="contact">
<?php include 'includes/nav.php'; ?>

  <main class="page-main" id="main-content" data-barba="container" data-barba-namespace="contact">
    <section class="page-hero page-hero--contact">
      <div class="page-hero-content">
        <span class="section-number">GET IN TOUCH</span>
        <h1 class="page-title">Contact</h1>
      </div>
    </section>

    <section class="content-section">
      <div class="contact-grid">
        <div class="contact-form-wrapper">
          <h2>Send a Message</h2>
          <form class="contact-form" action="#" method="post">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" name="name" autocomplete="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" autocomplete="email" required>
            </div>
            <div class="form-group">
              <label for="subject">Subject</label>
              <select id="subject" name="subject">
                <option value="booking">Booking Inquiry</option>
                <option value="press">Press / Media</option>
                <option value="general">General</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Send Message</button>
          </form>
        </div>

        <div class="contact-info">
          <div class="info-block">
            <h3>Booking</h3>
            <p>For booking inquiries, please use the form or email us directly.</p>
            <a href="mailto:booking@swampcitystompers.ca">booking@swampcitystompers.ca</a>
          </div>

          <div class="info-block">
            <h3>Follow Us</h3>
            <div class="social-links">
              <a href="https://facebook.com/swampcitystompers" target="_blank" rel="noopener">Facebook</a>
              <a href="https://instagram.com/swampcitystompers" target="_blank" rel="noopener">Instagram</a>
              <a href="https://youtube.com/@swampcitystompers" target="_blank" rel="noopener">YouTube</a>
            </div>
          </div>

          <div class="info-block">
            <h3>Based In</h3>
            <p>Eastern Ontario, Canada</p>
          </div>
        </div>
      </div>
    </section>

    <?php include 'includes/footer.php'; ?>
  </main>

</body>
</html>
