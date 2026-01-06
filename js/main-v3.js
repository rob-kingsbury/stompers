import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

let lenis;

function init() {
  initSmoothScroll();
  initHeroAnimations();
  initStoryChapters();
  initBandGallery();
  initLiveShows();
  initFloatNav();
  initConnectAnimations();
}

function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.6,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.7,
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
        lenis.scrollTo(target, { offset: 0, duration: 2 });
      }
    });
  });
}

function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.5 });

  tl.from('.hero-intro-line', {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 1,
    ease: 'power3.out',
  })
    .from(
      '.char',
      {
        y: '100%',
        stagger: 0.03,
        duration: 0.8,
        ease: 'power4.out',
      },
      '-=0.5'
    )
    .from(
      '.hero-tagline span',
      {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.3'
    )
    .from(
      '.scene-footer',
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.2'
    );

  // Parallax on hero video
  gsap.to('.scene--hero .scene-video', {
    scale: 1.2,
    ease: 'none',
    scrollTrigger: {
      trigger: '.scene--hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // Fade out hero content
  gsap.to('.scene--hero .scene-content', {
    opacity: 0,
    y: -100,
    ease: 'none',
    scrollTrigger: {
      trigger: '.scene--hero',
      start: 'center center',
      end: 'bottom top',
      scrub: true,
    },
  });
}

function initStoryChapters() {
  const chapters = document.querySelectorAll('.story-chapter');
  const section = document.querySelector('.scene--story');

  if (!section || chapters.length === 0) return;

  // Parallax background
  gsap.to('.parallax-bg img', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.scene--story',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  // Chapter reveals
  const sectionHeight = section.offsetHeight;
  const chapterHeight = sectionHeight / chapters.length;

  chapters.forEach((chapter, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: () => `top+=${i * chapterHeight} center`,
      end: () => `top+=${(i + 1) * chapterHeight} center`,
      onEnter: () => activateChapter(i),
      onEnterBack: () => activateChapter(i),
    });
  });

  function activateChapter(index) {
    chapters.forEach((ch, i) => {
      if (i === index) {
        ch.classList.add('is-active');
        gsap.to(ch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      } else {
        ch.classList.remove('is-active');
        gsap.to(ch, {
          opacity: 0,
          y: i < index ? -40 : 40,
          duration: 0.5,
          ease: 'power3.in',
        });
      }
    });
  }

  // Initialize first chapter
  activateChapter(0);
}

function initBandGallery() {
  const intro = document.querySelector('.band-intro');
  if (intro) {
    gsap.from(intro.children, {
      opacity: 0,
      y: 60,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: intro,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  const members = document.querySelectorAll('.band-member');
  members.forEach((member, i) => {
    gsap.from(member, {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: member,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      delay: i * 0.1,
    });
  });
}

function initLiveShows() {
  const shows = document.querySelectorAll('.live-show');
  const mapIframe = document.getElementById('tour-map');

  if (!mapIframe || shows.length === 0) return;

  shows.forEach((show) => {
    show.addEventListener('mouseenter', () => {
      shows.forEach((s) => s.classList.remove('is-active'));
      show.classList.add('is-active');
      updateMap(show);
    });
  });

  function updateMap(show) {
    const venue = show.dataset.venue || '';
    const location = show.dataset.location || '';
    const query = venue ? `${venue} ${location}` : location;
    const url = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

    gsap.to(mapIframe, {
      opacity: 0.3,
      duration: 0.2,
      onComplete: () => {
        mapIframe.src = url;
        gsap.to(mapIframe, { opacity: 1, duration: 0.4, delay: 0.2 });
      },
    });
  }

  // Animate shows list
  gsap.from('.live-header', {
    opacity: 0,
    x: -40,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.scene--live',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from(shows, {
    opacity: 0,
    x: -30,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.live-list',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });
}

function initFloatNav() {
  const navItems = document.querySelectorAll('.float-nav-item');
  const scenes = document.querySelectorAll('.scene');

  scenes.forEach((scene) => {
    const id = scene.id;
    ScrollTrigger.create({
      trigger: scene,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveNav(id),
      onEnterBack: () => setActiveNav(id),
    });
  });

  function setActiveNav(id) {
    navItems.forEach((item) => {
      item.classList.toggle('is-active', item.getAttribute('href') === `#${id}`);
    });
  }

  // Hide nav near bottom
  gsap.to('.float-nav', {
    opacity: 0,
    pointerEvents: 'none',
    scrollTrigger: {
      trigger: '.scene--connect',
      start: 'center center',
      end: 'bottom center',
      scrub: true,
    },
  });
}

function initConnectAnimations() {
  gsap.from('.connect-cta', {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.connect-content',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.social-btn', {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.connect-social',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
