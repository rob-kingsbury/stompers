/**
 * IMMERSIVE MASTER - Main JavaScript
 * MetaMask-style progress, dramatic reveals, 3D flips, explosions
 */

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let lenis;

// ============================================================
// INITIALIZATION
// ============================================================

function init() {
  initSmoothScroll();
  initProgressNav();
  initHeroAnimations();
  initAboutAnimations();
  initBandCardStack();
  initTourSection();
  initQuoteExplosion();
  initContactParallax();
}

// ============================================================
// SMOOTH SCROLL (Lenis)
// ============================================================

function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.8,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        lenis.scrollTo(target, { offset: 0, duration: 1.5 });
      }
    });
  });
}

// ============================================================
// PROGRESS NAV (MetaMask Style - Progress Bars Between Dots)
// ============================================================

function initProgressNav() {
  const nav = document.querySelector('.progress-nav');
  const dots = document.querySelectorAll('.progress-dot');

  if (!nav || dots.length === 0) return;

  // Show nav after initial load
  setTimeout(() => {
    nav.classList.add('is-visible');
  }, 1500);

  // Update progress based on scroll position
  function updateProgress() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // Build array of section boundaries matching dot order
    const sectionBounds = [];
    dots.forEach((dot) => {
      const sectionId = dot.dataset.section;
      const section = document.querySelector(`#${sectionId}`);
      if (section) {
        const rect = section.getBoundingClientRect();
        const top = scrollY + rect.top;
        const height = rect.height;
        sectionBounds.push({
          top,
          bottom: top + height,
          height,
        });
      }
    });

    // Calculate which section we're in and how far through it
    let currentSectionIndex = 0;
    let progressInSection = 0;

    for (let i = 0; i < sectionBounds.length; i++) {
      const bounds = sectionBounds[i];
      const nextBounds = sectionBounds[i + 1];

      // Section is "current" if we've scrolled past its top
      if (scrollY >= bounds.top) {
        currentSectionIndex = i;

        // Calculate progress: 0 at section top, 1 when next section top reaches viewport top
        // If this is the last section, use its own height
        const endPoint = nextBounds ? nextBounds.top : bounds.bottom;
        const scrollRange = endPoint - bounds.top - windowHeight;

        if (scrollRange <= 0) {
          // Section + gap is shorter than viewport
          progressInSection = 1;
        } else {
          progressInSection = Math.min(1, Math.max(0, (scrollY - bounds.top) / scrollRange));
        }
      }
    }

    // Update dot states
    dots.forEach((dot, index) => {
      const bar = dot.querySelector('.dot-bar');

      if (index < currentSectionIndex) {
        // Past sections: dot is gold, bar is full
        dot.classList.add('is-past');
        dot.classList.remove('is-active');
        if (bar) bar.style.setProperty('--progress', '100%');
      } else if (index === currentSectionIndex) {
        // Current section: dot is active, bar fills based on scroll
        dot.classList.add('is-active');
        dot.classList.remove('is-past');
        if (bar) bar.style.setProperty('--progress', `${Math.round(progressInSection * 100)}%`);
      } else {
        // Future sections: dot is inactive, bar is empty
        dot.classList.remove('is-active', 'is-past');
        if (bar) bar.style.setProperty('--progress', '0%');
      }
    });
  }

  // Use scroll event with throttle
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }

  // Listen to Lenis scroll
  lenis.on('scroll', onScroll);

  // Initial update
  updateProgress();

  // Click to scroll to section
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const sectionId = dot.dataset.section;
      const target = document.querySelector(`#${sectionId}`);
      if (target) {
        lenis.scrollTo(target, { duration: 1.5 });
      }
    });
  });
}

// ============================================================
// HERO ANIMATIONS - Video GROWS on Scroll
// ============================================================

function initHeroAnimations() {
  const hero = document.querySelector('.section--hero');
  if (!hero) return;

  const video = hero.querySelector('.hero-video');
  const meta = hero.querySelector('.hero-meta');
  const titleLines = hero.querySelectorAll('.title-line');
  const tagline = hero.querySelector('.hero-tagline');
  const stats = hero.querySelector('.hero-stats');
  const scrollCue = hero.querySelector('.hero-scroll-cue');

  // Staggered entrance animation
  const tl = gsap.timeline({ delay: 0.3 });

  // Meta
  if (meta) {
    tl.add(() => meta.classList.add('is-visible'), 0);
  }

  // Title lines with stagger
  titleLines.forEach((line, i) => {
    tl.add(() => line.classList.add('is-visible'), 0.2 + i * 0.15);
  });

  // Tagline
  if (tagline) {
    tl.add(() => tagline.classList.add('is-visible'), 0.7);
  }

  // Stats with number animation
  if (stats) {
    tl.add(() => {
      stats.classList.add('is-visible');
      animateStats();
    }, 0.9);
  }

  // Scroll cue
  if (scrollCue) {
    tl.add(() => scrollCue.classList.add('is-visible'), 1.3);
  }

  // Video GROWS on scroll (scale from 1 to 1.3)
  if (video) {
    gsap.to(video, {
      scale: 1.3,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Fade out content on scroll
  gsap.to('.hero-content', {
    opacity: 0,
    y: -80,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: '30% top',
      end: '80% top',
      scrub: true,
    },
  });

  // Fade out scroll cue
  gsap.to('.hero-scroll-cue', {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: '10% top',
      end: '30% top',
      scrub: true,
    },
  });
}

function animateStats() {
  const statValues = document.querySelectorAll('.stat-value');
  statValues.forEach((stat) => {
    const target = parseInt(stat.dataset.count, 10);
    if (!target) return;

    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current);
      }
    }, 30);
  });
}

// ============================================================
// ABOUT ANIMATIONS - Story Chapters with Parallax
// ============================================================

function initAboutAnimations() {
  const cards = document.querySelectorAll('.about-card');

  if (cards.length === 0) return;

  // Animate each card's content as it comes into view
  cards.forEach((card) => {
    const content = card.querySelector('.about-card-content');
    const image = card.querySelector('.about-card-image img');

    if (content) {
      // Animate content children (number, title, text)
      gsap.from(content.children, {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }

    if (image) {
      // Parallax effect on images
      gsap.to(image, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  });
}

// ============================================================
// BAND MEMBERS - Concom.tv Style Stacking Cards Animation
// ============================================================

function initBandCardStack() {
  const section = document.querySelector('.section--band');
  const stackCards = document.querySelectorAll('.stack-card');

  if (!section || stackCards.length === 0) return;

  // Each card scales down as the next card scrolls over it
  // This creates the "stacking" visual effect
  stackCards.forEach((card, index) => {
    // Skip the last card - it doesn't need to scale down
    if (index === stackCards.length - 1) return;

    // Create ScrollTrigger that scales the card down as the NEXT card comes in
    ScrollTrigger.create({
      trigger: card,
      start: 'top top',
      end: '+=200%', // Scale down over the duration of scrolling through this card
      scrub: true,
      onUpdate: (self) => {
        // Scale from 1 down to 0.9 based on scroll progress
        const scale = 1 - self.progress * 0.1;
        card.style.transform = `scale(${scale})`;
      },
    });
  });
}

// ============================================================
// TOUR SECTION - Full-Page Cards THEN List Accordion
// ============================================================

function initTourSection() {
  const section = document.querySelector('.section--tour');
  const fullpageCards = document.querySelectorAll('.tour-fullpage-card');
  const listSection = document.querySelector('.tour-list-section');
  const accordionItems = document.querySelectorAll('.tour-accordion-item');

  if (!section || fullpageCards.length === 0) return;

  // Activate fullpage cards as they come into view
  fullpageCards.forEach((card, index) => {
    ScrollTrigger.create({
      trigger: card,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => card.classList.add('is-active'),
      onLeave: () => card.classList.remove('is-active'),
      onEnterBack: () => card.classList.add('is-active'),
      onLeaveBack: () => card.classList.remove('is-active'),
    });
  });

  // Reveal list section after all fullpage cards
  if (listSection) {
    ScrollTrigger.create({
      trigger: listSection,
      start: 'top 80%',
      onEnter: () => listSection.classList.add('is-revealed'),
    });
  }

  // Accordion functionality
  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other items
      accordionItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
        }
      });

      // Toggle current item
      item.classList.toggle('is-open', !isOpen);
    });
  });

  // Pagination functionality
  const ITEMS_PER_PAGE = 8;
  const totalItems = accordionItems.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  let currentPage = 1;

  const prevBtn = document.querySelector('.pagination-prev');
  const nextBtn = document.querySelector('.pagination-next');
  const currentPageEl = document.querySelector('.pagination-current');
  const totalPagesEl = document.querySelector('.pagination-total');

  function showPage(page) {
    currentPage = page;
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    // Close any open accordions
    accordionItems.forEach((item) => item.classList.remove('is-open'));

    // Show/hide items based on page
    accordionItems.forEach((item, index) => {
      if (index >= start && index < end) {
        item.classList.add('is-visible');
      } else {
        item.classList.remove('is-visible');
      }
    });

    // Update pagination UI
    if (currentPageEl) currentPageEl.textContent = page;
    if (totalPagesEl) totalPagesEl.textContent = totalPages;
    if (prevBtn) prevBtn.disabled = page === 1;
    if (nextBtn) nextBtn.disabled = page === totalPages;
  }

  // Initialize pagination
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) showPage(currentPage - 1);
    });

    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) showPage(currentPage + 1);
    });
  }

  // Show first page on init
  showPage(1);
}

// ============================================================
// QUOTE EXPLOSION - Letters Explode Toward Viewer
// ============================================================

function initQuoteExplosion() {
  const section = document.querySelector('.section--quote');
  const pinWrapper = document.querySelector('.quote-pin-wrapper');
  const quoteContent = document.querySelector('.quote-content');
  const quoteLines = document.querySelectorAll('.quote-line');
  const attribution = document.querySelector('.quote-attribution');

  if (!section || !pinWrapper || quoteLines.length === 0) return;

  // 1. Split all text into individual character spans on load
  const allChars = [];

  quoteLines.forEach((line) => {
    const text = line.textContent;
    line.textContent = '';

    [...text].forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      line.appendChild(span);
      allChars.push(span);
    });
  });

  if (attribution) {
    const text = attribution.textContent;
    attribution.textContent = '';

    [...text].forEach((char) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      attribution.appendChild(span);
      allChars.push(span);
    });
  }

  // 2. Pre-calculate explosion trajectories for each character
  let charData = [];

  function calculateExplosionVectors() {
    // Get center of the quote block
    const rect = quoteContent.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    charData = allChars.map((span) => {
      const r = span.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;

      // Vector pointing outward from center
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      // Explosion distance: farther from center = flies farther
      const baseDist = 400 + Math.random() * 600;

      return {
        el: span,
        // Target position (relative to starting point)
        tx: (dx / dist) * baseDist + (Math.random() - 0.5) * 150,
        ty: (dy / dist) * baseDist + (Math.random() - 0.5) * 150,
        tr: (Math.random() - 0.5) * 90, // rotation
        ts: 2 + Math.random() * 3, // scale (toward viewer)
      };
    });
  }

  // Calculate once DOM is ready
  requestAnimationFrame(() => {
    calculateExplosionVectors();
  });

  // 3. Fade-in when section enters (no pin - simpler approach)
  let hasFadedIn = false;

  // Start with chars hidden
  allChars.forEach((el) => {
    el.style.transform = 'translateY(-40px)';
    el.style.opacity = '0';
  });

  ScrollTrigger.create({
    trigger: section,
    start: 'top 60%',
    onEnter: () => {
      if (hasFadedIn) return;
      hasFadedIn = true;

      // Animate each character fading in and moving down
      allChars.forEach((el, i) => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2 + i * 0.008,
          ease: 'power2.out',
        });
      });
    },
    onLeaveBack: () => {
      // Reset when scrolling back up past section
      hasFadedIn = false;
      allChars.forEach((el) => {
        gsap.set(el, {
          y: -40,
          opacity: 0,
        });
      });
    },
  });

  // 4. Concom.tv style: Section shrinks as it scrolls up, revealing black bg
  // Use gsap.to with scrub for smooth scaling
  gsap.to(section, {
    scale: 0.9,
    borderRadius: '24px',
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

// ============================================================
// CONTACT SECTION - Simple animations
// ============================================================

function initContactParallax() {
  const section = document.querySelector('.section--contact');
  const blocks = document.querySelectorAll('.contact-block');
  const footer = document.querySelector('.site-footer');

  if (!section) return;

  // Animate contact blocks when section is in view
  ScrollTrigger.create({
    trigger: section,
    start: 'top 60%',
    onEnter: () => {
      blocks.forEach((block) => {
        block.classList.add('is-visible');
      });
      if (footer) {
        setTimeout(() => {
          footer.classList.add('is-visible');
        }, 300);
      }
    },
  });
}

// ============================================================
// BOOT
// ============================================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
