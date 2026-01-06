import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

let lenis;

function init() {
  initSmoothScroll();
  initScrollProgress();
  initOpenerParallax();
  initTextReveal();
  initBandHorizontalScroll();
  initShowsWheel();
  initQuoteAnimation();
  initContactAnimations();
}

function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.5,
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

function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return;

  gsap.to(progressBar, {
    width: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
    },
  });
}

function initOpenerParallax() {
  const words = document.querySelectorAll('.opener-word');

  words.forEach((word) => {
    const speed = parseFloat(word.dataset.speed) || 0.5;

    gsap.to(word, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: '.scroll-section--opener',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Fade out tagline
  gsap.to('.opener-tagline', {
    opacity: 0,
    scrollTrigger: {
      trigger: '.scroll-section--opener',
      start: 'top top',
      end: '30% top',
      scrub: true,
    },
  });

  // Initial animation
  gsap.from('.opener-word', {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1.2,
    ease: 'power4.out',
    delay: 0.3,
  });

  gsap.from('.opener-tagline span', {
    y: 20,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out',
    delay: 1,
  });
}

function initTextReveal() {
  const lines = document.querySelectorAll('.text-reveal-line');
  const container = document.querySelector('.text-reveal-container');

  if (!container || lines.length === 0) return;

  lines.forEach((line, i) => {
    ScrollTrigger.create({
      trigger: '.scroll-section--text-reveal',
      start: () => `${10 + i * 15}% center`,
      end: () => `${25 + i * 15}% center`,
      onEnter: () => line.classList.add('is-visible'),
      onLeaveBack: () => line.classList.remove('is-visible'),
    });
  });
}

function initBandHorizontalScroll() {
  const wrapper = document.querySelector('.band-scroll-wrapper');
  const cards = document.querySelectorAll('.band-scroll-card');

  if (!wrapper || cards.length === 0) return;

  const totalWidth = wrapper.scrollWidth - window.innerWidth;

  gsap.to(wrapper, {
    x: -totalWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: '.scroll-section--band',
      start: 'top top',
      end: () => `+=${totalWidth}`,
      pin: true,
      scrub: 1,
    },
  });

  // Animate cards as they come in
  cards.forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.scroll-section--band',
        start: `${i * 20}% center`,
        toggleActions: 'play none none reverse',
      },
    });
  });
}

function initShowsWheel() {
  const items = document.querySelectorAll('.shows-wheel-item');
  const venueEl = document.querySelector('.shows-selected-venue');
  const locationEl = document.querySelector('.shows-selected-location');
  const detailsEl = document.querySelector('.shows-selected-details');

  if (items.length === 0 || !venueEl) return;

  items.forEach((item) => {
    item.addEventListener('click', () => {
      // Update active state
      items.forEach((i) => i.classList.remove('is-active'));
      item.classList.add('is-active');

      // Update info
      const venue = item.dataset.venue;
      const location = item.dataset.location;
      const date = item.dataset.date;
      const time = item.dataset.time;
      const age = item.dataset.age;

      gsap.to([venueEl, locationEl, detailsEl], {
        opacity: 0,
        y: -10,
        duration: 0.2,
        stagger: 0.05,
        onComplete: () => {
          venueEl.textContent = venue;
          locationEl.textContent = location;
          detailsEl.innerHTML = `<span>${date}</span><span>${time}</span><span>${age}</span>`;

          gsap.to([venueEl, locationEl, detailsEl], {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
          });
        },
      });
    });
  });

  // Animate on scroll
  gsap.from('.shows-title', {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.scroll-section--shows',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.shows-wheel-item', {
    opacity: 0,
    x: 40,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.shows-wheel',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });
}

function initQuoteAnimation() {
  gsap.from('.big-quote p', {
    opacity: 0,
    y: 80,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.scroll-section--quote',
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.big-quote cite', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.big-quote cite',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

function initContactAnimations() {
  gsap.from('.contact-headline', {
    opacity: 0,
    y: 100,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.scroll-section--contact',
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.contact-col', {
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-cols',
      start: 'top 75%',
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
