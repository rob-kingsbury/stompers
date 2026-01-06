import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

let lenis;

function init() {
  initSmoothScroll();
  initPageIndicator();
  initCoverAnimations();
  initManifestoAnimations();
  initLineupAnimations();
  initPosterAnimations();
  initClippingsAnimations();
  initBackCoverAnimations();
  initRandomRotations();
}

function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.4,
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
}

function initPageIndicator() {
  const currentPage = document.querySelector('.page-current');
  const pages = document.querySelectorAll('[data-page]');

  if (!currentPage || pages.length === 0) return;

  pages.forEach((page) => {
    ScrollTrigger.create({
      trigger: page,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        currentPage.textContent = page.dataset.page;
      },
      onEnterBack: () => {
        currentPage.textContent = page.dataset.page;
      },
    });
  });
}

function initCoverAnimations() {
  const cover = document.querySelector('.zine-page--cover');
  if (!cover) return;

  const titleLines = document.querySelectorAll('.title-line');
  const stickers = document.querySelectorAll('.collage-piece--sticker');
  const scrawl = document.querySelector('.collage-piece--scrawl');
  const photo = document.querySelector('.collage-piece--photo');
  const arrow = document.querySelector('.collage-piece--arrow');

  const tl = gsap.timeline({ delay: 0.3 });

  // Title animation
  tl.to(titleLines, {
    opacity: 1,
    x: 0,
    stagger: 0.15,
    duration: 1,
    ease: 'power4.out',
  });

  // Stickers pop in
  tl.from(
    stickers,
    {
      scale: 0,
      rotation: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: 'back.out(1.7)',
    },
    '-=0.5'
  );

  // Scrawl
  if (scrawl) {
    tl.from(
      scrawl,
      {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.3'
    );
  }

  // Photo
  if (photo) {
    tl.from(
      photo,
      {
        opacity: 0,
        y: 50,
        rotation: 15,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.4'
    );
  }

  // Arrow
  if (arrow) {
    tl.from(
      arrow,
      {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.2'
    );
  }

  // Parallax on scroll
  gsap.to('.collage-piece--main video', {
    y: '30%',
    ease: 'none',
    scrollTrigger: {
      trigger: cover,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

function initManifestoAnimations() {
  const manifesto = document.querySelector('.zine-page--manifesto');
  if (!manifesto) return;

  const texts = manifesto.querySelectorAll('.manifesto-text');
  const stamp = manifesto.querySelector('.manifesto-stamp');
  const sidebar = manifesto.querySelector('.manifesto-sidebar');

  gsap.from(texts, {
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: manifesto,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  if (stamp) {
    gsap.from(stamp, {
      scale: 0,
      rotation: -180,
      duration: 0.8,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: stamp,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  if (sidebar) {
    gsap.from(sidebar.children, {
      opacity: 0,
      x: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sidebar,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });
  }
}

function initLineupAnimations() {
  const cards = document.querySelectorAll('.member-card');

  cards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 60,
      rotation: index % 2 === 0 ? -10 : 10,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Sticker pop
    const sticker = card.querySelector('.member-sticker');
    if (sticker) {
      gsap.from(sticker, {
        scale: 0,
        duration: 0.4,
        delay: 0.3,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  });
}

function initPosterAnimations() {
  const poster = document.querySelector('.zine-page--tour');
  if (!poster) return;

  const header = poster.querySelector('.poster-header');
  const dates = poster.querySelectorAll('.show-poster');
  const decorations = poster.querySelectorAll('.star, .lightning');

  if (header) {
    gsap.from(header.children, {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: poster,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  dates.forEach((date, index) => {
    gsap.from(date, {
      opacity: 0,
      x: index % 2 === 0 ? -30 : 30,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: date,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // Decorations
  decorations.forEach((deco) => {
    gsap.from(deco, {
      scale: 0,
      rotation: 180,
      duration: 0.5,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: poster,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    // Floating animation
    gsap.to(deco, {
      y: 'random(-10, 10)',
      rotation: 'random(-15, 15)',
      duration: 'random(2, 3)',
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  });
}

function initClippingsAnimations() {
  const clippings = document.querySelectorAll('.clipping');

  clippings.forEach((clipping, index) => {
    const rotation = (index % 2 === 0 ? 1 : -1) * (Math.random() * 5 + 2);

    gsap.from(clipping, {
      opacity: 0,
      y: 50,
      rotation: rotation,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: clipping,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

function initBackCoverAnimations() {
  const back = document.querySelector('.zine-page--back');
  if (!back) return;

  const elements = back.querySelectorAll(
    '.back-logo, .back-contact, .back-social, .back-footer, .back-decorations'
  );

  gsap.from(elements, {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: back,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });
}

function initRandomRotations() {
  // Add subtle random movements to certain elements
  const floatingElements = document.querySelectorAll(
    '.collage-piece--sticker, .member-sticker, .clipping--sticker, .ticket'
  );

  floatingElements.forEach((el) => {
    gsap.to(el, {
      rotation: `+=${Math.random() * 6 - 3}`,
      duration: 3 + Math.random() * 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
