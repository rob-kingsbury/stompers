import { initSmoothScroll, scrollTo, getLenis } from './smoothScroll.js';
import {
  initProgressBar,
  initHeroAnimations,
  initRevealAnimations,
  initParallaxImage,
  initHorizontalScroll,
  initParallaxText,
} from './animations.js';
import { initScrambleOnScroll, scrambleOnHover } from './textScramble.js';
import { initCustomCursor } from './cursor.js';
import { initTourMap } from './tourMap.js';
import { initMemberCards } from './members.js';

import 'lenis/dist/lenis.css';

function init() {
  initSmoothScroll();

  initProgressBar();
  initHeroAnimations();

  initRevealAnimations('.about-content');
  initRevealAnimations('.contact-section');
  initRevealAnimations('.tour-section');

  initParallaxImage('.about-image img', '.about-section');

  initHorizontalScroll();

  initParallaxText();

  initScrambleOnScroll('.scramble-reveal');
  scrambleOnHover('.nav-link');

  initCustomCursor();

  initTourMap();

  initMemberCards();

  initMobileMenu();

  initAnchorLinks();
}

function initAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        closeMobileMenu();
        scrollTo(target);
      }
    });
  });
}

function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  const lenis = getLenis();

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');

    if (isOpen) {
      closeMobileMenu();
    } else {
      menu.classList.add('is-open');
      toggle.classList.add('is-active');
      if (lenis) lenis.stop();
    }
  });
}

function closeMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  const lenis = getLenis();

  if (menu) menu.classList.remove('is-open');
  if (toggle) toggle.classList.remove('is-active');
  if (lenis) lenis.start();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
