<?php
$contact_status = $_GET['status'] ?? '';
?>
<section id="contact" class="cta" data-screen-label="Contact">
  <div class="cta-inner">
    <span class="eyebrow">Book the band</span>
    <h2 class="cta-title">Pack the floor with us</h2>
    <p class="cta-text">Bars, breweries, legions, festivals, weddings, parties. We travel. We bring our own gear. Tell us about your room.</p>
  </div>
  <div style="max-width:1180px; margin:40px auto 0; padding:0 32px;">
    <div class="contact-grid">
      <div class="contact-info">
        <div class="contact-info-item">
          <div class="contact-info-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div>
            <div class="contact-info-label">Email</div>
            <div class="contact-info-value"><a href="mailto:booking@swampcitystompers.ca">booking@swampcitystompers.ca</a></div>
          </div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <div class="contact-info-label">Based in</div>
            <div class="contact-info-value">Ottawa, ON &middot; Canada</div>
          </div>
        </div>
        <div class="contact-info-item">
          <div class="contact-info-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <div>
            <div class="contact-info-label">Booking lead time</div>
            <div class="contact-info-value">3-6 weeks preferred</div>
          </div>
        </div>
      </div>

      <?php if ($contact_status === 'sent'): ?>
        <div class="contact-form form-success" role="status">
          <div class="icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h3>Message sent</h3>
          <p>We'll be in touch within 24 hours. Cold beer on standby.</p>
        </div>
      <?php else: ?>
        <form class="contact-form" id="js-contact-form" action="contact-handler.php" method="post" novalidate>
          <?php if ($contact_status === 'error'): ?>
            <div class="form-error" role="alert">Something didn't go through. Check the fields below and try again, or email <a href="mailto:booking@swampcitystompers.ca">booking@swampcitystompers.ca</a> direct.</div>
          <?php endif; ?>
          <!-- Honeypot: must stay empty. Bots fill this; humans never see it. -->
          <div class="hp-field" aria-hidden="true">
            <label for="c-website">Website (leave blank)</label>
            <input id="c-website" name="website" type="text" tabindex="-1" autocomplete="off"/>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="c-name">Your name</label>
              <input id="c-name" name="name" type="text" placeholder="Jane Doe" required/>
            </div>
            <div class="field">
              <label for="c-email">Email</label>
              <input id="c-email" name="email" type="email" placeholder="name@example.com" required/>
            </div>
          </div>
          <div class="field-row">
            <div class="field">
              <label for="c-venue">Venue / event</label>
              <input id="c-venue" name="venue" type="text" placeholder="Where's the gig?"/>
            </div>
            <div class="field">
              <label for="c-date">Target date</label>
              <input id="c-date" name="date" type="text" placeholder="e.g. Sat, Aug 15"/>
            </div>
          </div>
          <div class="field">
            <label for="c-msg">Tell us about it</label>
            <textarea id="c-msg" name="message" placeholder="Room size, set length, vibe of the night, anything you want us to know." required></textarea>
          </div>
          <div style="display:flex; gap:12px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
            <span style="font-family:var(--jk-font-mono); font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:var(--jk-fg-3);">Reply within 24 hrs</span>
            <button class="btn btn-primary" type="submit">Send it</button>
          </div>
        </form>
      <?php endif; ?>
    </div>
  </div>
</section>
