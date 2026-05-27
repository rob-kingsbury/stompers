/* ============================================================
   Swamp City Stompers — site.js
   Vanilla JS, no dependencies.
   ============================================================ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Smooth scroll ────────────────────────────────────────────
function navigateTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' });
  closeMenu();
}

document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  if (!id) return;
  e.preventDefault();
  navigateTo(id);
});

// ── Nav scroll state ─────────────────────────────────────────
const navEl = document.querySelector('.nav');
if (navEl) {
  const onScroll = () => navEl.classList.toggle('is-scrolled', window.scrollY > 32);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Hamburger menu ───────────────────────────────────────────
const menuOverlay = document.getElementById('js-menu-overlay');
const menuOpen    = document.getElementById('js-menu-open');
const menuCloseBtn = document.getElementById('js-menu-close');

function closeMenu() {
  menuOverlay?.classList.remove('is-open');
  document.body.style.overflow = '';
}

if (menuOpen && menuOverlay) {
  menuOpen.addEventListener('click', () => {
    menuOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });
  menuCloseBtn?.addEventListener('click', closeMenu);
}

// ── Escape key ───────────────────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  closeMenu();
  closeTicket();
});

// ── Scroll-spy ───────────────────────────────────────────────
const SPY_SECTIONS = ['home','about','band','tour','watch','epk','contact'];
const progressDots = document.querySelectorAll('.progress-dot');
const navLinks     = document.querySelectorAll('.nav-link');

function updateScrollSpy() {
  let active = SPY_SECTIONS[0];
  SPY_SECTIONS.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= window.scrollY + 140) active = id;
  });
  progressDots.forEach(d => d.classList.toggle('is-active', d.dataset.target === active));
  navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === `#${active}`));
}

window.addEventListener('scroll', updateScrollSpy, { passive: true });
progressDots.forEach(d => d.addEventListener('click', () => navigateTo(d.dataset.target)));
updateScrollSpy();

// ── Scroll reveals ───────────────────────────────────────────
document.querySelectorAll('.section-header').forEach(hdr => {
  [['.eyebrow', 0], ['.section-title', 80], ['.section-subtitle', 160]].forEach(([sel, delay]) => {
    const el = hdr.querySelector(sel);
    if (!el) return;
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${delay}ms`);
  });
});

document.querySelectorAll('.cta-inner > *').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.setProperty('--reveal-delay', `${i * 80}ms`);
});

document.querySelectorAll('.about-card').forEach((card) => {
  const rev  = card.classList.contains('reverse');
  const img  = card.querySelector('.about-card-img');
  const body = card.querySelector('.about-card-content');
  if (img)  img.classList.add(rev ? 'reveal-right' : 'reveal-left');
  if (body) { body.classList.add(rev ? 'reveal-left' : 'reveal-right'); body.style.setProperty('--reveal-delay', '120ms'); }
});

document.querySelectorAll('.member-card').forEach((card, i) => {
  card.classList.add('reveal');
  card.style.setProperty('--reveal-delay', `${i * 80}ms`);
});

const tourFeat = document.querySelector('.tour-featured');
if (tourFeat) tourFeat.classList.add('reveal-scale');
const tourAcc = document.querySelector('.tour-accordion');
if (tourAcc) tourAcc.classList.add('reveal');

document.querySelectorAll('.epk-section').forEach((sec, i) => {
  sec.classList.add('reveal-right');
  sec.style.setProperty('--reveal-delay', `${i * 60}ms`);
});
const epkSide = document.querySelector('.epk-side');
if (epkSide) epkSide.classList.add('reveal-left');

const contactInfo = document.querySelector('.contact-info');
const contactForm = document.querySelector('.contact-form');
if (contactInfo) contactInfo.classList.add('reveal-left');
if (contactForm) contactForm.classList.add('reveal-right');

const watchFrame = document.querySelector('.watch-frame');
if (watchFrame) watchFrame.classList.add('reveal-scale');
const watchThumbsWrap = document.querySelector('.watch-thumbs');
if (watchThumbsWrap) watchThumbsWrap.classList.add('reveal');

if (!prefersReducedMotion) {
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObs.observe(el);
  });
} else {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    el.classList.add('is-in');
  });
}

// ── Tour accordion ────────────────────────────────────────────
let openAccIdx = 0;
const accItems = document.querySelectorAll('.tour-acc-item');

function setAccordion(idx) {
  accItems.forEach((item, i) => {
    const open = i === idx;
    item.classList.toggle('is-open', open);
    const btn = item.querySelector('.tour-acc-head');
    if (btn) btn.setAttribute('aria-expanded', String(open));
  });
  openAccIdx = idx;
}

accItems.forEach((item, i) => {
  item.querySelector('.tour-acc-head')?.addEventListener('click', () => {
    setAccordion(openAccIdx === i ? -1 : i);
  });
});

// ── Show-details modal (formerly ticket modal) ────────────────
const ticketOverlay   = document.getElementById('js-ticket-overlay');
const ticketCloseBtn  = document.getElementById('js-ticket-close');
const ticketCloseBtn2 = document.getElementById('js-ticket-close2');

function openTicket(data) {
  if (!ticketOverlay) return;
  ['date','venue','loc','time','age','note'].forEach(k => {
    const el = document.getElementById(`js-ticket-${k}`);
    if (el) el.textContent = data[k] || '—';
  });
  // Hide the note row if there's no note
  const noteRow = document.getElementById('js-ticket-note-row');
  if (noteRow) noteRow.style.display = data.note ? '' : 'none';

  const mapLink = document.getElementById('js-ticket-map');
  if (mapLink) {
    if (data.map) { mapLink.href = data.map; mapLink.style.display = ''; }
    else { mapLink.style.display = 'none'; }
  }
  ticketOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeTicket() {
  ticketOverlay?.classList.remove('is-open');
  document.body.style.overflow = '';
}

ticketCloseBtn?.addEventListener('click', closeTicket);
ticketCloseBtn2?.addEventListener('click', closeTicket);
ticketOverlay?.addEventListener('click', (e) => { if (e.target === ticketOverlay) closeTicket(); });

document.querySelectorAll('.js-ticket-open').forEach(btn => {
  btn.addEventListener('click', () => openTicket({
    date:  btn.dataset.date,
    venue: btn.dataset.venue,
    loc:   btn.dataset.loc,
    time:  btn.dataset.time,
    age:   btn.dataset.age,
    note:  btn.dataset.note,
    map:   btn.dataset.map,
  }));
});

// ── Watch section: YouTube facade ─────────────────────────────
// Click main player or any thumbnail to swap to that video.
// Clicking the main player when it shows a thumbnail loads the iframe
// with autoplay. Clicking another thumb swaps back to a fresh facade.
const watchThumbs = document.querySelectorAll('.watch-thumb');
const watchImg    = document.getElementById('js-watch-img');
const watchTitle  = document.getElementById('js-watch-title');
const watchStamp  = document.getElementById('js-watch-stamp');
const watchFrameEl= document.getElementById('js-watch-frame');
const watchPlay   = document.getElementById('js-watch-play');

function setWatchVideo(videoId, thumb, title, stamp, autoplay = false) {
  if (!watchFrameEl) return;
  watchFrameEl.dataset.videoId = videoId;

  if (autoplay) {
    watchFrameEl.innerHTML = `
      <iframe
        src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
        title="${title}"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
    return;
  }

  // Restore facade with new video
  watchFrameEl.innerHTML = `
    <img id="js-watch-img" src="${thumb}" alt="${title}" loading="lazy"/>
    <button class="watch-play" id="js-watch-play" type="button" aria-label="Play video">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
    </button>
    <div class="watch-meta">
      <div class="watch-title" id="js-watch-title">${title}</div>
      <div class="watch-stamp" id="js-watch-stamp">${stamp}</div>
    </div>`;
  // Re-bind click on the new play button
  document.getElementById('js-watch-play')?.addEventListener('click', () => {
    setWatchVideo(videoId, thumb, title, stamp, true);
  });
}

// Initial play button: loads iframe in place
watchPlay?.addEventListener('click', () => {
  const id = watchFrameEl.dataset.videoId;
  const title = watchTitle?.textContent || '';
  const stamp = watchStamp?.textContent || '';
  const thumb = watchImg?.src || '';
  setWatchVideo(id, thumb, title, stamp, true);
});

// Thumb clicks: swap facade
watchThumbs.forEach(btn => {
  btn.addEventListener('click', () => {
    watchThumbs.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    setWatchVideo(
      btn.dataset.videoId,
      btn.dataset.thumb,
      btn.dataset.title,
      btn.dataset.stamp,
      false
    );
  });
});
