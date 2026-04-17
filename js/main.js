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

// Reload when restored from bfcache. Barba/GSAP/Lenis state is stale after
// a back/forward navigation that hits the bfcache, leaving layout broken.
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});

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

// no-js class removed in <head> inline script (head.php) to prevent FOUC

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
  } else if (page === 'epk') {
    initEPK();
  } else {
    // Index page (master) animations
    initProgressNav();
    initHeroAnimations();
    initAboutAnimations();
    initBandCardStack();
    initTourSection();
    initWatchSection();
  }

  // New footer: reveal zones + map parallax (all pages)
  initNewFooter();

  // Handle initial hash scroll (e.g. landing directly on index.php#band)
  if (window.location.hash && lenis) {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    const hash = window.location.hash;
    requestAnimationFrame(() => {
      const hashTarget = document.querySelector(hash);
      if (!hashTarget) return;
      const targetY = hashTarget.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, targetY);
      lenis.scrollTo(targetY, { immediate: true, force: true, lock: true });
      ScrollTrigger.refresh();
      requestAnimationFrame(() => {
        window.scrollTo(0, targetY);
        lenis.scrollTo(targetY, { immediate: true, force: true });
      });
    });
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
          const done = this.async();
          const content = data.next.container;

          // Scroll to top before animation starts — skip if navigating to a hash target
          const enterHash = window.location.hash || (data.next.url && data.next.url.hash ? '#' + data.next.url.hash : '');
          if (!enterHash) {
            window.scrollTo(0, 0);
          }

          // Set initial state
          gsap.set(content, {
            opacity: 0,
            y: 30,
            scale: 0.98,
          });

          // Lift in animation — wait for completion before afterEnter
          gsap.to(content, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: done,
          });
        },
        afterEnter(data) {
          // Resolve incoming hash BEFORE anything else touches scroll.
          // Prefer Barba's parsed URL (reliable) over window.location.hash.
          const rawHash = (data.next.url && data.next.url.hash) ? data.next.url.hash : '';
          const incomingHash = rawHash
            ? (rawHash.startsWith('#') ? rawHash : '#' + rawHash)
            : (window.location.hash || '');

          // Disable native scroll restoration so the browser doesn't fight us
          if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
          }

          // Reinitialize smooth scroll first (other inits depend on lenis)
          initSmoothScroll();

          // Reset menu state before reinitializing
          resetStompMenu();
          initSiteNav();

          // Page-specific initialization based on namespace
          const namespace = data.next.namespace;

          if (namespace === 'tour') {
            initTourPage();
          } else if (namespace === 'epk') {
            initEPK();
          } else {
            initProgressNav();
            initHeroAnimations();
            initAboutAnimations();
            initBandCardStack();
            initTourSection();
            initWatchSection();
          }

          // Footer is inside Barba container — must reinit after every transition
          initNewFooter();

          // Position scroll BEFORE ScrollTrigger.refresh so triggers evaluate
          // at the correct position. Without this, fromTo scrubs with
          // immediateRender:false snap to their start state (scroll = 0).
          if (incomingHash) {
            // Wait one frame for Barba's new container to be in the DOM flow
            // so offsetTop/getBoundingClientRect return real values.
            requestAnimationFrame(() => {
              const hashTarget = document.querySelector(incomingHash);
              if (!hashTarget) {
                ScrollTrigger.refresh();
                return;
              }

              const targetY = hashTarget.getBoundingClientRect().top + window.scrollY;

              // 1. Native scroll first (instant, no Lenis interpolation)
              window.scrollTo(0, targetY);

              // 2. Sync Lenis internal state to match so its next RAF tick
              //    doesn't snap back to 0
              if (lenis) {
                lenis.scrollTo(targetY, { immediate: true, force: true, lock: true });
              }

              // 3. Refresh triggers at the new position
              ScrollTrigger.refresh();

              // 4. Re-assert after refresh + layout settle. The hero intro
              //    timeline (delay 0.3s) can cause subtle layout shifts, and
              //    ScrollTrigger.refresh can nudge scroll on pinned sections.
              requestAnimationFrame(() => {
                window.scrollTo(0, targetY);
                if (lenis) {
                  lenis.scrollTo(targetY, { immediate: true, force: true });
                }
              });
            });
          } else {
            // No hash — scroll to top and refresh
            window.scrollTo(0, 0);
            if (lenis) {
              lenis.scrollTo(0, { immediate: true, force: true });
            }
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                ScrollTrigger.refresh();
              });
            });
          }
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
    gsap.set(menuBg, { right: '-100%', visibility: 'hidden' });
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
    // Inline styles prevent flash before CSS loads
    menuBg.style.visibility = 'hidden';
    menuBg.style.right = '-100%';
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
  // Handles both clean URLs (/tour) and .php URLs (tour.php)
  const pathSegment = window.location.pathname.split('/').filter(Boolean).pop() || '';
  const currentPage = pathSegment.replace('.php', '') || 'home';
  menuLinks.forEach((link) => {
    const linkPage = link.getAttribute('href').replace('./', '').replace('.php', '') || 'home';
    link.classList.toggle('is-active', linkPage === currentPage);
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
    .set(menuBg, { visibility: 'visible' }, 0.15)
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
    menuBg.classList.add('is-open');
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
        menuBg.classList.remove('is-open');
        gsap.set(menuBg, { visibility: 'hidden' });
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

  // Store reference so we can remove it during cleanup
  const rafCallback = (time) => {
    if (lenis) lenis.raf(time * 1000);
  };
  gsap.ticker.add(rafCallback);

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
    gsap.ticker.remove(rafCallback);
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

  // Show nav — immediate if already visible (Barba return), delayed on first load
  const alreadyVisible = nav.classList.contains('is-visible');
  const visibleTimer = alreadyVisible ? null : setTimeout(() => {
    nav.classList.add('is-visible');
  }, 800);

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

        if (nextBounds) {
          // Progress = how far from this section's top to the next section's top
          const scrollRange = nextBounds.top - bounds.top;
          progressInSection = scrollRange > 0
            ? Math.min(1, Math.max(0, (scrollY - bounds.top) / scrollRange))
            : 0;
        } else {
          // Last section: progress based on its own scrollable height
          const scrollRange = bounds.bottom - bounds.top - windowHeight;
          progressInSection = scrollRange > 0
            ? Math.min(1, Math.max(0, (scrollY - bounds.top) / scrollRange))
            : 0;
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
  const dotClickHandlers = [];
  dots.forEach((dot) => {
    const handler = () => {
      const sectionId = dot.dataset.section;
      const target = document.querySelector(`#${sectionId}`);
      if (target && lenis) {
        lenis.scrollTo(target, { duration: 1.5 });
      }
    };
    dot.addEventListener('click', handler);
    dotClickHandlers.push({ dot, handler });
  });

  // Register cleanup
  cleanupFns.push(() => {
    clearTimeout(visibleTimer);
    dotClickHandlers.forEach(({ dot, handler }) => {
      dot.removeEventListener('click', handler);
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
  // Must use fromTo + immediateRender:false because the entry timeline
  // hasn't set opacity:1 yet when this ScrollTrigger is created
  gsap.fromTo('.hero-logo-reveal',
    { opacity: 1, y: 0 },
    {
      opacity: 0,
      y: mobile ? -40 : -80,
      ease: 'none',
      immediateRender: false,
      scrollTrigger: {
        trigger: hero,
        start: '20% top',
        end: '80% top',
        scrub: true,
      },
    }
  );

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
  const toggleAccordion = (item) => {
    const isOpen = item.classList.contains('is-open');
    accordionItems.forEach((other) => { if (other !== item) other.classList.remove('is-open'); });
    item.classList.toggle('is-open', !isOpen);
  };

  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    // touchend fires immediately on iOS without the 300ms click delay
    header.addEventListener('touchend', (e) => {
      e.preventDefault();
      toggleAccordion(item);
    }, { passive: false });
    header.addEventListener('click', () => toggleAccordion(item));
  });

  // "Show More" lazy loader — reveal 6 hidden items at a time
  const showMoreBtn = document.getElementById('tour-show-more');
  if (showMoreBtn) {
    const BATCH = 6;
    const showMore = () => {
      const hidden = document.querySelectorAll('.tour-accordion-item.is-hidden');
      const batch = Array.from(hidden).slice(0, BATCH);
      batch.forEach((item) => {
        item.classList.remove('is-hidden');
        item.classList.add('is-visible');
      });
      if (hidden.length <= BATCH) showMoreBtn.style.display = 'none';
    };
    showMoreBtn.addEventListener('touchend', (e) => { e.preventDefault(); showMore(); }, { passive: false });
    showMoreBtn.addEventListener('click', showMore);
  }

  // Mark visible items for animation
  accordionItems.forEach((item) => {
    if (!item.classList.contains('is-hidden')) {
      item.classList.add('is-visible');
    }
  });
}

// ============================================================
// WATCH SECTION — YouTube facade embeds with session rotation
// ============================================================

function initWatchSection() {
  const section = document.querySelector('.section--watch');
  const mainPlayer = document.getElementById('watch-main');
  const thumbStrip = document.getElementById('watch-thumbs');
  const playerFrame = document.querySelector('.watch-player-frame');

  if (!section || !mainPlayer) return;

  const videos = [
    { id: '3SXXD0hYfRI', title: 'Stompers @ The Neighbourhood Pub' },
    { id: '5ojuRA6IuWE', title: 'Neighbourhood Pub (Ottawa) Apr 18 2025' },
    { id: 'AOFHYaxoUFg', title: 'Stompers @ Busters Mar 1 2025' },
    { id: 'NmrDp1uzJMc', title: 'Neighbourhood Pub (Ottawa) Apr 18 2025' },
    { id: 'PZC1ZlgIBa8', title: 'Stompers @ Busters Mar 1 2025' },
    { id: 'YJfmNoQI_ZY', title: 'Neighbourhood Pub (Ottawa) Apr 18 2025' },
    { id: 'xIrgX2n32go', title: 'Neighbourhood Pub (Ottawa) Apr 18 2025' },
  ];

  // Session-based rotation: different featured video each visit
  let startIndex = 0;
  try {
    const stored = sessionStorage.getItem('stompers-watch-idx');
    if (stored !== null) {
      startIndex = (parseInt(stored, 10) + 1) % videos.length;
    } else {
      startIndex = Math.floor(Math.random() * videos.length);
    }
    sessionStorage.setItem('stompers-watch-idx', startIndex);
  } catch (e) {
    startIndex = Math.floor(Math.random() * videos.length);
  }

  function getThumbnail(videoId) {
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  }

  function renderFacade(videoId) {
    mainPlayer.innerHTML = `
      <div class="watch-facade" style="background-image: url('${getThumbnail(videoId)}')"></div>
      <div class="watch-play" aria-label="Play video">
        <svg viewBox="0 0 24 24"><polygon points="6,3 20,12 6,21"/></svg>
      </div>
    `;
    mainPlayer.onclick = () => loadIframe(videoId);
  }

  function loadIframe(videoId) {
    mainPlayer.innerHTML = `
      <iframe
        src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        title="Swamp City Stompers live performance"
      ></iframe>
    `;
    mainPlayer.onclick = null;
  }

  function setActive(index) {
    renderFacade(videos[index].id);
    const thumbs = thumbStrip.querySelectorAll('.watch-thumb');
    thumbs.forEach((t, i) => t.classList.toggle('is-active', i === index));
  }

  // Build thumbnail strip
  if (thumbStrip) {
    videos.forEach((video, i) => {
      const thumb = document.createElement('button');
      thumb.className = 'watch-thumb' + (i === startIndex ? ' is-active' : '');
      thumb.setAttribute('aria-label', video.title);
      thumb.innerHTML = `<img src="${getThumbnail(video.id)}" alt="" loading="lazy">`;
      thumb.addEventListener('click', () => setActive(i));
      thumbStrip.appendChild(thumb);
    });
  }

  // Render initial facade
  renderFacade(videos[startIndex].id);

  // Scroll-triggered reveal
  if (playerFrame) {
    const reducedMotion = prefersReducedMotion();
    if (reducedMotion) {
      playerFrame.classList.add('is-visible');
    } else {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 65%',
        onEnter: () => playerFrame.classList.add('is-visible'),
      });
    }
  }
}

// ============================================================
// TOUR PAGE - Horizontal Scroll Carousel
// ============================================================

function initTourPage() {
  const hero = document.querySelector('.page-hero--tour');
  const datesSection = document.querySelector('.tour-page-dates');
  const accordionItems = document.querySelectorAll('.tour-page-dates .tour-accordion-item');
  const cta = document.querySelector('.tour-cta');

  const reducedMotion = prefersReducedMotion();

  // Hero entrance animation
  if (hero) {
    const eyebrow = hero.querySelector('.eyebrow');
    const title = hero.querySelector('.page-title');
    const subtitle = hero.querySelector('.page-subtitle');

    if (!reducedMotion) {
      const tl = gsap.timeline({ delay: 0.3 });
      if (eyebrow) {
        gsap.set(eyebrow, { opacity: 0, y: 20 });
        tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
      }
      if (title) {
        gsap.set(title, { opacity: 0, y: 40 });
        tl.to(title, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5');
      }
      if (subtitle) {
        gsap.set(subtitle, { opacity: 0, y: 20 });
        tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.6');
      }
    }
  }

  // Accordion functionality (same pattern as homepage)
  accordionItems.forEach((item) => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      accordionItems.forEach((other) => {
        if (other !== item) other.classList.remove('is-open');
      });
      item.classList.toggle('is-open', !isOpen);
    });
  });

  // Show more button
  const showMoreBtn = document.getElementById('tour-page-show-more');
  if (showMoreBtn) {
    const BATCH = 6;
    showMoreBtn.addEventListener('click', () => {
      const hidden = document.querySelectorAll('.tour-page-dates .tour-accordion-item.is-hidden');
      const batch = Array.from(hidden).slice(0, BATCH);
      batch.forEach((item) => {
        item.classList.remove('is-hidden');
      });
      if (hidden.length <= BATCH) {
        showMoreBtn.style.display = 'none';
      }
    });
  }

  // CTA section reveal
  if (cta && !reducedMotion) {
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
}

// ============================================================
// EPK PAGE
// ============================================================

function initEPK() {
  const splitLeft = document.querySelector('.epk-split-left');
  const sections = document.querySelectorAll('.epk-split-section');

  if (!splitLeft && !sections.length) return;

  const reducedMotion = prefersReducedMotion();

  // If reduced motion, show everything immediately
  if (reducedMotion) {
    if (splitLeft) {
      gsap.set([splitLeft.querySelector('.epk-split-band'), splitLeft.querySelector('.epk-split-book'), ...splitLeft.querySelectorAll('.epk-dl-link')], { opacity: 1, y: 0 });
    }
    sections.forEach((s) => gsap.set(s, { opacity: 1, y: 0 }));
    return;
  }

  // Animate left sidebar elements on load
  if (splitLeft) {
    const leftTargets = [
      splitLeft.querySelector('.epk-split-band'),
      splitLeft.querySelector('.epk-split-book'),
      ...splitLeft.querySelectorAll('.epk-dl-link'),
    ].filter(Boolean);

    gsap.to(leftTargets, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      delay: 0.3,
    });
  }

  // Animate right-side sections on scroll
  sections.forEach((section, i) => {
    gsap.to(section, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: i * 0.08,
      ease: 'power3.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Ensure triggers fire for elements already in viewport
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

// ============================================================
// NEW FOOTER — Quote reveal, map parallax, utility reveal
// ============================================================

function initNewFooter() {
  const mapZone = document.querySelector('.footer-next-show-zone');
  const mapBg = document.querySelector('.footer-next-show-map');
  const utility = document.querySelector('.footer-utility');
  const backToTop = document.querySelector('.back-to-top');

  const reducedMotion = prefersReducedMotion();

  // Map parallax — desktop only. On mobile the map sits at top:0/height:100%
  // via CSS so there's nothing to parallax and yPercent would misplace it.
  if (mapZone && mapBg && !reducedMotion && !isMobile()) {
    gsap.to(mapBg, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: mapZone,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Reveal utility zone — IntersectionObserver is robust against layout
  // shifts and Barba transitions in a way ScrollTrigger isn't here.
  if (utility) {
    if (reducedMotion) {
      utility.classList.add('is-visible');
    } else {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            utility.classList.add('is-visible');
            observer.disconnect();
          }
        });
      }, { rootMargin: '0px 0px -10% 0px' });
      io.observe(utility);
    }
  }

  // Back to top button
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
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

  // Defer hero video load until after critical resources. The <source> uses
  // data-src so the browser never fetches the 26MB file during page load.
  const heroVideo = document.querySelector('.hero-video-grain');
  if (heroVideo) {
    heroVideo.querySelectorAll('source[data-src]').forEach(s => {
      s.src = s.dataset.src;
    });
    heroVideo.load();
    heroVideo.play().catch(() => {});
  }
});

// Vite HMR: force full reload to prevent double-initialization
if (import.meta.hot) {
  import.meta.hot.decline();
}
