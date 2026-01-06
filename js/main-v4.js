import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

let lenis;

function init() {
  initSmoothScroll();
  initIntroAnimations();
  initManifestoAnimations();
  initBandRoster();
  initTourCards();
  initPageCounter();
  initContactAnimations();
}

function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        lenis.scrollTo(target, { offset: 0, duration: 1.5 });
      }
    });
  });
}

function initIntroAnimations() {
  const tl = gsap.timeline({ delay: 0.3 });

  tl.from('.intro-headline-small', {
    opacity: 0,
    x: -30,
    duration: 0.8,
    ease: 'power3.out',
  })
    .from(
      '.intro-headline-big',
      {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power4.out',
      },
      '-=0.5'
    )
    .from(
      '.intro-desc',
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.5'
    )
    .from(
      '.intro-badge',
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'back.out(1.7)',
      },
      '-=0.3'
    )
    .from(
      '.intro-scroll',
      {
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.2'
    );

  // Parallax on video
  gsap.to('.intro-video', {
    scale: 1.1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.block--intro',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

function initManifestoAnimations() {
  const quote = document.querySelector('.manifesto-quote');
  if (!quote) return;

  gsap.from('.manifesto-number', {
    scale: 0.5,
    opacity: 0,
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.block--manifesto',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.manifesto-quote p', {
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.block--manifesto',
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.manifesto-cite', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.manifesto-cite',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
}

function initBandRoster() {
  gsap.from('.band-header', {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.block--band',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  const items = document.querySelectorAll('.roster-item');
  items.forEach((item, i) => {
    gsap.from(item, {
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      delay: i * 0.05,
    });
  });
}

function initTourCards() {
  const cards = document.querySelectorAll('.tour-card');

  cards.forEach((card) => {
    const front = card.querySelector('.tour-card-front');

    front.addEventListener('click', () => {
      const isExpanded = card.dataset.expanded === 'true';

      // Close all cards first
      cards.forEach((c) => {
        c.dataset.expanded = 'false';
      });

      // Toggle clicked card
      if (!isExpanded) {
        card.dataset.expanded = 'true';
      }
    });
  });

  // Animate cards on scroll
  gsap.from('.tour-header', {
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.block--tour',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  cards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      delay: i * 0.1,
    });
  });
}

function initPageCounter() {
  const currentEl = document.querySelector('.page-counter-current');
  const blocks = document.querySelectorAll('.block[data-page]');

  if (!currentEl || blocks.length === 0) return;

  blocks.forEach((block) => {
    ScrollTrigger.create({
      trigger: block,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => updateCounter(block.dataset.page),
      onEnterBack: () => updateCounter(block.dataset.page),
    });
  });

  function updateCounter(page) {
    gsap.to(currentEl, {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        currentEl.textContent = page;
        gsap.to(currentEl, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      },
    });
  }
}

function initContactAnimations() {
  gsap.from('.contact-header', {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.block--contact',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.contact-info-item', {
    opacity: 0,
    x: -30,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-info',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.contact-social', {
    opacity: 0,
    x: 30,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-social',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.contact-footer', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-footer',
      start: 'top 90%',
      toggleActions: 'play none none reverse',
    },
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
