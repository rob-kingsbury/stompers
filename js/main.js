/**
 * IMMERSIVE MASTER - Main JavaScript
 * MetaMask-style progress, dramatic reveals, 3D flips, explosions
 *
 * Mobile-first: Responsive breakpoints, touch handling, reduced motion support
 */

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import barba from '@barba/core';

import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

let lenis;

// Track listeners for cleanup on page transitions
let cleanupFns = [];

// ============================================================
// RESPONSIVE & ACCESSIBILITY UTILITIES
// ============================================================

// Breakpoints matching CSS
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
};

// Device detection
const isMobile = () => window.innerWidth <= BREAKPOINTS.mobile;
const isTablet = () => window.innerWidth > BREAKPOINTS.mobile && window.innerWidth <= BREAKPOINTS.tablet;
const isDesktop = () => window.innerWidth > BREAKPOINTS.tablet;
const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Reduced motion preference
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Get responsive scroll trigger values
function getScrollTriggerConfig(section) {
  const mobile = isMobile();

  // Default configs adjusted for mobile viewports
  const configs = {
    hero: {
      contentFade: {
        start: mobile ? '20% top' : '30% top',
        end: mobile ? '60% top' : '80% top',
      },
      scrollCue: {
        start: mobile ? '5% top' : '10% top',
        end: mobile ? '20% top' : '30% top',
      },
    },
    about: {
      cardReveal: {
        start: mobile ? 'top 80%' : 'top 70%',
      },
    },
    quote: {
      fadeIn: {
        start: mobile ? 'top 70%' : 'top 60%',
      },
    },
    contact: {
      reveal: {
        start: mobile ? 'top 70%' : 'top 60%',
      },
    },
    tour: {
      cardActive: {
        start: mobile ? 'top 90%' : 'top 80%',
        end: mobile ? 'bottom 10%' : 'bottom 20%',
      },
    },
  };

  return configs[section] || {};
}

// Remove no-js class when JS loads
document.documentElement.classList.remove('no-js');

// ============================================================
// INITIALIZATION
// ============================================================

function init() {
  initSmoothScroll();
  initSiteNav();
  initPageTransitions();

  // Page-specific initialization based on data-page attribute
  const page = document.body.dataset.page;

  if (page === 'tour') {
    initTourPage();
  } else {
    // Index page (master) animations
    initProgressNav();
    initHeroAnimations();
    initAboutAnimations();
    initBandCardStack();
    initTourSection();
    initQuoteExplosion();
    initContactParallax();
  }

}

// Run all registered cleanup functions and clear the list
function runCleanup() {
  cleanupFns.forEach((fn) => fn());
  cleanupFns = [];
}

// ============================================================
// PAGE TRANSITIONS (Barba.js + GSAP Lift Effect)
// ============================================================

function initPageTransitions() {
  // Create transition overlay
  const overlay = document.createElement('div');
  overlay.className = 'transition-overlay';
  document.body.appendChild(overlay);

  barba.init({
    transitions: [
      {
        name: 'lift',
        leave(data) {
          const done = this.async();
          const content = data.current.container;

          // Clean up all event listeners registered during this page
          runCleanup();

          // Kill all ScrollTrigger instances to prevent memory leaks
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

          // Destroy Lenis instance
          if (lenis) {
            lenis.destroy();
            lenis = null;
          }

          // Lift out animation
          gsap.to(content, {
            opacity: 0,
            y: -30,
            scale: 0.98,
            duration: 0.35,
            ease: 'power2.in',
            onComplete: done,
          });
        },
        enter(data) {
          const content = data.next.container;

          // Set initial state
          gsap.set(content, {
            opacity: 0,
            y: 30,
            scale: 0.98,
          });

          // Lift in animation
          gsap.to(content, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: 'power2.out',
          });

          // Scroll to top
          window.scrollTo(0, 0);
          if (lenis) {
            lenis.scrollTo(0, { immediate: true });
          }
        },
        afterEnter(data) {
          // Reinitialize smooth scroll first (other inits depend on lenis)
          initSmoothScroll();

          // Reset menu state before reinitializing
          resetStompMenu();
          initSiteNav();

          // Page-specific initialization based on namespace
          const namespace = data.next.namespace;

          if (namespace === 'tour') {
            initTourPage();
          } else {
            initProgressNav();
            initHeroAnimations();
            initAboutAnimations();
            initBandCardStack();
            initTourSection();
            initQuoteExplosion();
            initContactParallax();
          }

          // Refresh after all triggers created
          ScrollTrigger.refresh();
        },
      },
    ],
  });
}

// ============================================================
// SITE NAVIGATION - STOMP MENU (Seismic Impact Effect)
// ============================================================

let menuTimeline = null;
let menuIsOpen = false;
let menuIsAnimating = false;

// Reset menu state (called before page transitions)
function resetStompMenu() {
  menuIsOpen = false;
  menuIsAnimating = false;

  const hamburger = document.querySelector('.hamburger');
  const menuOverlay = document.querySelector('.menu-overlay');
  const menuBg = document.querySelector('.menu-bg');
  const menuLinks = document.querySelectorAll('.menu-nav-link');
  const menuFooter = document.querySelector('.menu-footer');

  // Reset classes
  hamburger?.classList.remove('is-active');
  menuOverlay?.classList.remove('is-open');

  // Reset GSAP transforms
  if (hamburger?.children) {
    gsap.set(hamburger.children[0], { y: 0, rotate: 0 });
    gsap.set(hamburger.children[1], { opacity: 1, scaleX: 1 });
    gsap.set(hamburger.children[2], { y: 0, rotate: 0 });
  }

  if (menuBg) {
    gsap.set(menuBg, { right: '-100%' });
  }

  if (menuLinks.length) {
    gsap.set(menuLinks, { opacity: 0, y: 60 });
  }

  if (menuFooter) {
    gsap.set(menuFooter, { opacity: 0 });
  }

  // Clear any leftover transforms from body
  gsap.set(document.body, { clearProps: 'transform' });
  document.body.style.overflow = '';

  // Kill old timeline
  if (menuTimeline) {
    menuTimeline.kill();
    menuTimeline = null;
  }
}

function initSiteNav() {
  const hamburger = document.querySelector('.hamburger');
  const menuOverlay = document.querySelector('.menu-overlay');

  if (!hamburger || !menuOverlay) return;

  // Create menu elements if they don't exist
  if (!document.querySelector('.menu-bg')) {
    const menuBg = document.createElement('div');
    menuBg.className = 'menu-bg';
    document.body.appendChild(menuBg);
  }

  if (!document.querySelector('.dust-container')) {
    const dustContainer = document.createElement('div');
    dustContainer.className = 'dust-container';
    document.body.appendChild(dustContainer);
  }

  const menuBg = document.querySelector('.menu-bg');
  const dustContainer = document.querySelector('.dust-container');
  const menuLinks = menuOverlay.querySelectorAll('.menu-nav-link');

  // Set active state on menu links based on current page
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  menuLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === currentPath);
  });
  const menuFooter = menuOverlay.querySelector('.menu-footer');
  const pageContent = document.querySelector('.immersive') || document.querySelector('.page-main');

  // Set initial states for menu content (GSAP controls these)
  gsap.set(menuLinks, { opacity: 0, y: 60 });
  gsap.set(menuFooter, { opacity: 0 });

  // Build the GSAP timeline for Stomp effect (matching demo)
  menuTimeline = gsap.timeline({ paused: true });

  // Reduce shake intensity on mobile
  const mobile = isMobile();
  const reducedMotion = prefersReducedMotion();
  const shakeIntensity = reducedMotion ? 0 : (mobile ? 4 : 8);
  const shakeRepeats = reducedMotion ? 0 : (mobile ? 3 : 6);

  menuTimeline
    // Hamburger to X animation
    .to(hamburger.children[0], { y: 10, rotate: 45, duration: 0.2 }, 0)
    .to(hamburger.children[1], { scaleX: 0, duration: 0.2 }, 0)
    .to(hamburger.children[2], { y: -10, rotate: -45, duration: 0.2 }, 0)

    // Screen shake effect on page content (reduced on mobile)
    .to(pageContent, {
      x: () => Math.random() * shakeIntensity - shakeIntensity / 2,
      y: () => Math.random() * shakeIntensity - shakeIntensity / 2,
      duration: 0.05,
      repeat: shakeRepeats,
      yoyo: true,
      ease: 'none',
    }, 0.1)
    .set(pageContent, { x: 0, y: 0 })

    // Menu background crashes in from right
    .to(menuBg, {
      right: 0,
      duration: 0.5,
      ease: 'power4.out',
    }, 0.15)

    // Spawn dust particles on impact
    .add(() => {
      spawnDustParticles(dustContainer, 15);
    }, 0.2)

    // Menu links bounce in with elastic easing
    .to(menuLinks, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'elastic.out(1, 0.5)',
    }, 0.3)

    // Footer fades in
    .to(menuFooter, {
      opacity: 1,
      duration: 0.4,
    }, 0.6);

  // Click handler - prevent clicks during animation
  const onHamburgerClick = () => {
    if (menuIsAnimating) return;
    if (menuIsOpen) {
      closeStompMenu();
    } else {
      openStompMenu();
    }
  };
  hamburger.addEventListener('click', onHamburgerClick);

  // Close on escape
  const onEscapeKey = (e) => {
    if (e.key === 'Escape' && menuIsOpen) {
      closeStompMenu();
    }
  };
  document.addEventListener('keydown', onEscapeKey);

  // Close when clicking a menu link (event delegation)
  const onMenuLinkClick = (e) => {
    if (e.target.closest('.menu-nav-link')) {
      closeStompMenu();
    }
  };
  menuOverlay.addEventListener('click', onMenuLinkClick);

  // Register cleanup for page transitions
  cleanupFns.push(() => {
    hamburger.removeEventListener('click', onHamburgerClick);
    document.removeEventListener('keydown', onEscapeKey);
    menuOverlay.removeEventListener('click', onMenuLinkClick);
  });

  function openStompMenu() {
    menuIsOpen = true;
    menuIsAnimating = true;
    menuOverlay.classList.add('is-open');
    hamburger.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
    menuTimeline.play();

    // Allow clicks after animation completes
    setTimeout(() => {
      menuIsAnimating = false;
    }, 800);
  }

  function closeStompMenu() {
    menuIsOpen = false;
    menuIsAnimating = true;
    hamburger.classList.remove('is-active');
    document.body.style.overflow = '';
    if (lenis) lenis.start();

    // Custom close: text and footer fade out immediately, then bg slides away
    const closeTl = gsap.timeline({
      onComplete: () => {
        menuOverlay.classList.remove('is-open');
        menuIsAnimating = false;
        menuTimeline.pause(0); // Reset open timeline to start
      },
    });

    closeTl
      .to(hamburger.children[0], { y: 0, rotate: 0, duration: 0.2 }, 0)
      .to(hamburger.children[1], { scaleX: 1, duration: 0.2 }, 0)
      .to(hamburger.children[2], { y: 0, rotate: 0, duration: 0.2 }, 0)
      .to(menuLinks, { opacity: 0, y: -20, duration: 0.2, stagger: 0.02, ease: 'power2.in' }, 0)
      .to(menuFooter, { opacity: 0, duration: 0.15 }, 0)
      // Dust particles on bg slide-out impact
      .add(() => {
        spawnDustParticles(dustContainer, 15);
      }, 0.25)
      .to(menuBg, { right: '-100%', duration: 0.5, ease: 'power4.out' }, 0.25);
  }
}

// Spawn dust particles for stomp effect
function spawnDustParticles(container, count) {
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const dust = document.createElement('div');
    dust.className = 'dust';

    // Random position along bottom
    const startX = Math.random() * 100;
    dust.style.left = `${startX}%`;

    // Random size
    const size = 4 + Math.random() * 8;
    dust.style.width = `${size}px`;
    dust.style.height = `${size}px`;

    container.appendChild(dust);

    // Animate particle
    gsap.fromTo(
      dust,
      {
        y: 0,
        opacity: 1,
        scale: 1,
      },
      {
        y: -180 - Math.random() * 150,
        x: (Math.random() - 0.5) * 150,
        opacity: 0,
        scale: 0.3 + Math.random() * 0.5,
        rotation: Math.random() * 360,
        duration: 1 + Math.random() * 0.8,
        ease: 'power2.out',
        onComplete: () => dust.remove(),
      }
    );
  }
}

// ============================================================
// SMOOTH SCROLL (Lenis)
// ============================================================

function initSmoothScroll() {
  const mobile = isMobile();
  const touch = isTouchDevice();
  const reducedMotion = prefersReducedMotion();

  // Configure Lenis based on device capabilities
  lenis = new Lenis({
    duration: reducedMotion ? 0.01 : (mobile ? 1.0 : 1.4),
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: !reducedMotion,
    wheelMultiplier: mobile ? 1.0 : 0.8,
    // Touch-specific settings
    touchMultiplier: mobile ? 1.5 : 2.0,
    infinite: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Smooth scroll for anchor links (event delegation)
  const onAnchorClick = (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor || !lenis) return;

    const href = anchor.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const duration = reducedMotion ? 0.1 : (mobile ? 1.0 : 1.5);
      lenis.scrollTo(target, { offset: 0, duration });
    }
  };
  document.addEventListener('click', onAnchorClick);

  // Handle resize - refresh ScrollTrigger if device type changes
  let wasDesktop = isDesktop();
  const onResize = () => {
    const nowDesktop = isDesktop();
    if (wasDesktop !== nowDesktop) {
      wasDesktop = nowDesktop;
      ScrollTrigger.refresh();
    }
  };
  window.addEventListener('resize', onResize);

  // Register cleanup for page transitions
  cleanupFns.push(() => {
    document.removeEventListener('click', onAnchorClick);
    window.removeEventListener('resize', onResize);
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
// HERO ANIMATIONS - Logo Intro Sequence
// ============================================================

function initHeroAnimations() {
  const hero = document.querySelector('.section--hero');
  if (!hero) return;

  const logoReveal = hero.querySelector('.hero-logo-reveal');
  const logoImg = hero.querySelector('.hero-logo-img');
  const stamp = hero.querySelector('.hero-stamp');
  const meta = hero.querySelector('.hero-meta');
  const tagline = hero.querySelector('.hero-tagline');
  const scrollCue = hero.querySelector('.hero-scroll-cue');

  const reducedMotion = prefersReducedMotion();
  const config = getScrollTriggerConfig('hero');
  const mobile = isMobile();

  // If reduced motion, show everything immediately
  if (reducedMotion) {
    gsap.set(logoReveal, { opacity: 1 });
    gsap.set(stamp, { opacity: 1, scale: 1, rotation: -12 });
    meta?.classList.add('is-visible');
    tagline?.classList.add('is-visible');
    scrollCue?.classList.add('is-visible');
    return;
  }

  const tl = gsap.timeline({ delay: 0.3 });

  // Logo fades in
  tl.to(logoReveal, { opacity: 1, duration: 1, ease: 'power2.out' });
  tl.from(logoImg, { scale: 1.15, duration: 1, ease: 'power2.out' }, '<');

  // Meta + tagline
  tl.add(() => meta?.classList.add('is-visible'), '+=0.2');
  tl.add(() => tagline?.classList.add('is-visible'), '+=0.1');

  // Stamp BAM
  tl.to(stamp, {
    opacity: 1, scale: 1, rotation: -12,
    duration: 0.15, ease: 'power4.out',
  }, '+=0.3');
  tl.to(hero, {
    x: 4, yoyo: true, repeat: 5, duration: 0.03, ease: 'none',
    onComplete: () => gsap.set(hero, { x: 0 }),
  });

  tl.add(() => scrollCue?.classList.add('is-visible'), '+=0.4');

  // Fade out logo + content on scroll
  gsap.to('.hero-logo-reveal', {
    opacity: 0,
    y: mobile ? -40 : -80,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: '60% top',
      scrub: true,
    },
  });

  // Fade out scroll cue
  gsap.fromTo('.hero-scroll-cue', { opacity: 1 }, {
    opacity: 0,
    ease: 'none',
    immediateRender: false,
    scrollTrigger: {
      trigger: hero,
      start: config.scrollCue.start,
      end: config.scrollCue.end,
      scrub: true,
    },
  });

  // Ambient sparks
  initHeroSparks(hero);
}

// Floating ambient sparks over the hero background
function initHeroSparks(hero) {
  const container = hero.querySelector('.hero-sparks');
  if (!container || prefersReducedMotion()) return;

  const heroHeight = hero.offsetHeight;

  function spawnSpark(immediate) {
    const spark = document.createElement('div');
    spark.className = 'hero-spark';

    // Random horizontal position, always start at bottom
    spark.style.left = `${Math.random() * 100}%`;
    spark.style.bottom = '0';

    // Random small size (2-4px)
    const size = 2 + Math.random() * 2;
    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;

    container.appendChild(spark);

    // Travel full viewport height, bottom to top
    const travel = heroHeight * (0.7 + Math.random() * 0.3);
    const duration = 7 + Math.random() * 6;

    // If immediate, start partway through the journey
    const startProgress = immediate ? Math.random() * 0.8 : 0;

    gsap.fromTo(spark,
      {
        y: 0,
        opacity: 0,
      },
      {
        y: -travel,
        x: (Math.random() - 0.5) * 100,
        opacity: 0.4 + Math.random() * 0.3,
        duration: duration * (1 - startProgress),
        ease: 'none',
        onStart: () => {
          if (startProgress > 0) {
            gsap.set(spark, { y: -travel * startProgress });
          }
        },
        onComplete: () => spark.remove(),
      }
    );
  }

  // Spawn sparks at intervals — more frequent for denser field
  const interval = setInterval(() => spawnSpark(false), 200);

  // Immediate batch — scattered across the viewport on load
  for (let i = 0; i < 20; i++) {
    spawnSpark(true);
  }

  // Cleanup on page transition
  cleanupFns.push(() => clearInterval(interval));
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
      // immediateRender: false prevents hiding content before trigger fires
      gsap.from(content.children, {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
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
  // IMPORTANT: We scale the INNER element, not the card itself,
  // because transforms break sticky positioning
  stackCards.forEach((card, index) => {
    const inner = card.querySelector('.stack-card-inner');

    // Skip the last card - it doesn't need to scale down
    if (index === stackCards.length - 1) return;
    if (!inner) return;

    // Create ScrollTrigger that scales the inner content as the NEXT card comes in
    ScrollTrigger.create({
      trigger: card,
      start: 'top top',
      end: '+=200%',
      scrub: true,
      onUpdate: (self) => {
        // Scale from 1 down to 0.9 based on scroll progress
        const scale = 1 - self.progress * 0.1;
        inner.style.transform = `scale(${scale})`;
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

  const config = getScrollTriggerConfig('tour');
  const reducedMotion = prefersReducedMotion();

  // If reduced motion, show all cards immediately
  if (reducedMotion) {
    fullpageCards.forEach((card) => card.classList.add('is-active'));
    listSection?.classList.add('is-revealed');
    accordionItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  // Activate fullpage cards as they come into view (responsive start/end)
  fullpageCards.forEach((card, index) => {
    ScrollTrigger.create({
      trigger: card,
      start: config.cardActive?.start || 'top 80%',
      end: config.cardActive?.end || 'bottom 20%',
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

  const reducedMotion = prefersReducedMotion();
  const mobile = isMobile();
  const config = getScrollTriggerConfig('quote');

  // For reduced motion or mobile: simple fade-in, no character splitting
  if (reducedMotion) {
    // Just show the quote immediately
    return;
  }

  // On mobile: simplified animation (fade in lines, not individual characters)
  if (mobile) {
    initQuoteSimplified(section, quoteLines, attribution, config);
    return;
  }

  // Desktop: Full character animation
  initQuoteFull(section, quoteContent, quoteLines, attribution, config);
}

// Simplified quote animation for mobile - fade in lines instead of characters
function initQuoteSimplified(section, quoteLines, attribution, config) {
  // Set initial state
  quoteLines.forEach((line) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(20px)';
  });

  if (attribution) {
    attribution.style.opacity = '0';
    attribution.style.transform = 'translateY(20px)';
  }

  ScrollTrigger.create({
    trigger: section,
    start: config.fadeIn?.start || 'top 70%',
    onEnter: () => {
      // Animate lines with stagger
      gsap.to(quoteLines, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      });

      if (attribution) {
        gsap.to(attribution, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: quoteLines.length * 0.15,
          ease: 'power2.out',
        });
      }
    },
    onLeaveBack: () => {
      gsap.set(quoteLines, { opacity: 0, y: 20 });
      if (attribution) gsap.set(attribution, { opacity: 0, y: 20 });
    },
  });

  // Section shrink effect (reduced on mobile)
  gsap.to(section, {
    scale: 0.95,
    borderRadius: '16px',
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

// Full character animation for desktop
function initQuoteFull(section, quoteContent, quoteLines, attribution, config) {
  // Split all text into individual character spans
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

  // Pre-calculate explosion trajectories for each character
  let charData = [];

  function calculateExplosionVectors() {
    const rect = quoteContent.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    charData = allChars.map((span) => {
      const r = span.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;

      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      const baseDist = 400 + Math.random() * 600;

      return {
        el: span,
        tx: (dx / dist) * baseDist + (Math.random() - 0.5) * 150,
        ty: (dy / dist) * baseDist + (Math.random() - 0.5) * 150,
        tr: (Math.random() - 0.5) * 90,
        ts: 2 + Math.random() * 3,
      };
    });
  }

  requestAnimationFrame(() => {
    calculateExplosionVectors();
  });

  // Fade-in when section enters
  let hasFadedIn = false;

  // Start with chars hidden
  allChars.forEach((el) => {
    el.style.transform = 'translateY(-40px)';
    el.style.opacity = '0';
  });

  ScrollTrigger.create({
    trigger: section,
    start: config.fadeIn?.start || 'top 60%',
    onEnter: () => {
      if (hasFadedIn) return;
      hasFadedIn = true;

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
      hasFadedIn = false;
      allChars.forEach((el) => {
        gsap.set(el, { y: -40, opacity: 0 });
      });
    },
  });

  // Section shrinks as it scrolls up
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

  const reducedMotion = prefersReducedMotion();
  const config = getScrollTriggerConfig('contact');

  // If reduced motion, show immediately
  if (reducedMotion) {
    blocks.forEach((block) => block.classList.add('is-visible'));
    footer?.classList.add('is-visible');
    return;
  }

  // Animate contact blocks when section is in view
  ScrollTrigger.create({
    trigger: section,
    start: config.reveal?.start || 'top 60%',
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
// TOUR PAGE - Horizontal Scroll Carousel
// ============================================================

function initTourPage() {
  initTourHeroAnimations();
  initTourHorizontalScroll();
  initTourPastShows();
  initTourCTA();
}

function initTourHeroAnimations() {
  const hero = document.querySelector('.page-hero--tour');
  if (!hero) return;

  const meta = hero.querySelector('.section-number');
  const title = hero.querySelector('.page-title');
  const subtitle = hero.querySelector('.page-subtitle');
  const bg = hero.querySelector('.page-hero-bg img');

  // Staggered entrance animation
  const tl = gsap.timeline({ delay: 0.3 });

  if (meta) {
    gsap.set(meta, { opacity: 0, y: 20 });
    tl.to(meta, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
  }

  if (title) {
    gsap.set(title, { opacity: 0, y: 40 });
    tl.to(title, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5');
  }

  // Parallax on hero background
  if (bg) {
    gsap.to(bg, {
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Fade out hero content on scroll
  const heroContent = hero.querySelector('.page-hero-content');
  if (heroContent) {
    gsap.to(heroContent, {
      opacity: 0,
      y: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: '30% top',
        end: '80% top',
        scrub: true,
      },
    });
  }
}

function initTourHorizontalScroll() {
  const section = document.querySelector('.tour-horizontal');
  const wrapper = document.querySelector('.tour-cards-wrapper');
  const cards = document.querySelectorAll('.tour-card-horizontal');
  const progressBar = document.querySelector('.tour-horizontal-progress-bar');

  if (!section || !wrapper || cards.length === 0) return;

  // Calculate total scroll distance
  const getScrollDistance = () => wrapper.scrollWidth - window.innerWidth;

  // Pin the section and animate horizontal scroll
  const horizontalScroll = gsap.to(wrapper, {
    x: () => -getScrollDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${getScrollDistance()}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
      onEnter: () => section.classList.add('is-active'),
      onLeave: () => section.classList.remove('is-active'),
      onEnterBack: () => section.classList.add('is-active'),
      onLeaveBack: () => section.classList.remove('is-active'),
      onUpdate: (self) => {
        // Update progress bar
        if (progressBar) {
          progressBar.style.height = `${self.progress * 100}%`;
        }
      },
    },
  });

  // Animate card content as they come into view
  cards.forEach((card, index) => {
    const content = card.querySelector('.tour-card-horizontal-content');
    const date = card.querySelector('.tour-card-horizontal-date');
    const info = card.querySelector('.tour-card-horizontal-info');
    const btn = card.querySelector('.btn');
    const number = card.querySelector('.tour-card-horizontal-number');

    if (content) {
      // Calculate when this card enters view (based on horizontal position)
      const cardStart = index / cards.length;
      const cardEnd = (index + 1) / cards.length;

      // Create timeline for card entrance
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
        },
      });

      // Fade in elements as card enters center of viewport
      if (date) {
        gsap.set(date, { opacity: 0, y: 30 });
        cardTl.to(date, { opacity: 1, y: 0, duration: 0.1 }, cardStart);
      }

      if (info) {
        gsap.set(info, { opacity: 0, y: 20 });
        cardTl.to(info, { opacity: 1, y: 0, duration: 0.1 }, cardStart + 0.02);
      }

      if (btn) {
        gsap.set(btn, { opacity: 0, y: 20 });
        cardTl.to(btn, { opacity: 1, y: 0, duration: 0.1 }, cardStart + 0.04);
      }

      if (number) {
        gsap.set(number, { opacity: 0 });
        cardTl.to(number, { opacity: 0.05, duration: 0.1 }, cardStart + 0.02);
      }
    }
  });
}

function initTourPastShows() {
  const items = document.querySelectorAll('.tour-past-item');

  if (items.length === 0) return;

  items.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power3.out',
          onStart: () => item.classList.add('is-visible'),
        });
      },
      onLeaveBack: () => {
        item.classList.remove('is-visible');
        gsap.set(item, { opacity: 0, y: 20 });
      },
    });
  });
}

function initTourCTA() {
  const cta = document.querySelector('.tour-cta');
  if (!cta) return;

  const content = cta.querySelector('.cta-content');

  if (content) {
    gsap.from(content.children, {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: cta,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });
  }
}

// ============================================================
// BOOT
// ============================================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Refresh ScrollTrigger after all images load for accurate position calculations
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
