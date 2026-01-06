import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

let lenis;

function init() {
  initSmoothScroll();
  initHeroAnimations();
  initStackingCards();
  initMemberAnimations();
  initShowsTimeline();
  initTourMap();
  initSideNav();
  initRevealAnimations();
}

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

function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.3 });

  tl.from('.hero-badge', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
  })
    .from(
      '.hero-title-line',
      {
        opacity: 0,
        y: 100,
        rotateX: -45,
        stagger: 0.15,
        duration: 1,
        ease: 'power4.out',
      },
      '-=0.4'
    )
    .from(
      '.hero-location',
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.5'
    )
    .from(
      '.hero-scroll',
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.3'
    )
    .from(
      '.hero-stat',
      {
        opacity: 0,
        x: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.4'
    );

  gsap.to('.hero-video', {
    scale: 1.1,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  gsap.to('.hero-content', {
    y: -100,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'center center',
      end: 'bottom top',
      scrub: true,
    },
  });
}

function initStackingCards() {
  const cards = document.querySelectorAll('.stack-card');

  cards.forEach((card, i) => {
    const content = card.querySelector('.stack-card-content');
    const image = card.querySelector('.stack-card-image img');

    gsap.from(content.children, {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    if (image) {
      gsap.from(image, {
        scale: 1.3,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  });
}

function initMemberAnimations() {
  const header = document.querySelector('.members-header');
  if (header) {
    gsap.from(header.children, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  const features = document.querySelectorAll('.member-feature');
  features.forEach((feature, i) => {
    const image = feature.querySelector('.member-feature-image');
    const info = feature.querySelector('.member-feature-info');
    const isReverse = feature.classList.contains('member-feature--reverse');

    gsap.from(image, {
      opacity: 0,
      x: isReverse ? 80 : -80,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: feature,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from(info.children, {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: feature,
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

function initShowsTimeline() {
  const header = document.querySelector('.shows-header');
  if (header) {
    gsap.from(header.children, {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  const entries = document.querySelectorAll('.show-entry');
  entries.forEach((entry, i) => {
    gsap.from(entry, {
      opacity: 0,
      x: -40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: entry,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      delay: i * 0.05,
    });
  });

  gsap.from('.timeline-line', {
    scaleY: 0,
    transformOrigin: 'top',
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.shows-timeline',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });
}

function initTourMap() {
  const mapIframe = document.getElementById('tour-map');
  const showEntries = document.querySelectorAll('.show-entry');

  if (!mapIframe || showEntries.length === 0) return;

  showEntries.forEach((entry) => {
    entry.addEventListener('mouseenter', () => updateMap(entry));
    entry.addEventListener('click', () => updateMap(entry));
  });

  function updateMap(entry) {
    const venue = entry.dataset.venue || '';
    const location = entry.dataset.location || '';
    const query = venue ? `${venue} ${location}` : location;
    const url = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

    gsap.to(mapIframe, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        mapIframe.src = url;
        gsap.to(mapIframe, { opacity: 1, duration: 0.3, delay: 0.2 });
      },
    });
  }
}

function initSideNav() {
  const dots = document.querySelectorAll('.side-nav-dot');
  const sections = document.querySelectorAll('[data-section]');

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveDot(section.dataset.section),
      onEnterBack: () => setActiveDot(section.dataset.section),
    });
  });

  function setActiveDot(sectionId) {
    dots.forEach((dot) => {
      dot.classList.toggle('is-active', dot.dataset.section === sectionId);
    });
  }
}

function initRevealAnimations() {
  const contactInfo = document.querySelector('.contact-info');
  if (contactInfo) {
    gsap.from(contactInfo.children, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: contactInfo,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  const formGroups = document.querySelectorAll('.form-group');
  gsap.from(formGroups, {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-form',
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.form-submit', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.form-submit',
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
