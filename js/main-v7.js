import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

let lenis;

function init() {
  initSmoothScroll();
  initChapterIndicator();
  initPrologueAnimations();
  initChapterTransitions();
  initTextAnimations();
  initQuoteAnimation();
  initMemberAnimations();
  initShowsAnimation();
  initEpilogueAnimations();
}

function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.8,
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
}

function initChapterIndicator() {
  const indicator = document.querySelector('.chapter-indicator');
  const progressBar = document.querySelector('.chapter-indicator-progress');
  const currentLabel = document.querySelector('.chapter-current');
  const chapters = document.querySelectorAll('[data-chapter]');

  if (!indicator || !progressBar) return;

  // Show indicator after scrolling past prologue
  ScrollTrigger.create({
    trigger: '.chapter--prologue',
    start: 'bottom top',
    onEnter: () => indicator.classList.add('is-visible'),
    onLeaveBack: () => indicator.classList.remove('is-visible'),
  });

  // Update progress
  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      progressBar.style.setProperty('--progress', `${self.progress * 100}%`);
    },
  });

  // Update chapter label
  chapters.forEach((chapter) => {
    ScrollTrigger.create({
      trigger: chapter,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        if (currentLabel) {
          currentLabel.textContent = chapter.dataset.chapter;
        }
      },
      onEnterBack: () => {
        if (currentLabel) {
          currentLabel.textContent = chapter.dataset.chapter;
        }
      },
    });
  });
}

function initPrologueAnimations() {
  const prologue = document.querySelector('.chapter--prologue');
  if (!prologue) return;

  // Initial entrance
  const tl = gsap.timeline({ delay: 0.3 });

  tl.from('.chapter-intro-text', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
  })
    .from(
      '.chapter-title',
      {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
      },
      '-=0.5'
    )
    .from(
      '.chapter-scroll-hint',
      {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.3'
    );

  // Parallax on scroll
  gsap.to('.chapter--prologue .chapter-bg video', {
    scale: 1.2,
    ease: 'none',
    scrollTrigger: {
      trigger: '.chapter--prologue',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // Fade out content
  gsap.to('.chapter--prologue .chapter-content', {
    opacity: 0,
    y: -100,
    ease: 'none',
    scrollTrigger: {
      trigger: '.chapter--prologue',
      start: '30% top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

function initChapterTransitions() {
  const chapterHeaders = document.querySelectorAll(
    '.chapter--beginning, .chapter--sound, .chapter--band, .chapter--road'
  );

  chapterHeaders.forEach((chapter) => {
    const marker = chapter.querySelector('.chapter-marker');
    const heading = chapter.querySelector('.chapter-heading');
    const year = chapter.querySelector('.chapter-year');
    const bgImage = chapter.querySelector('.chapter-bg--image');

    // Mark chapter as active
    ScrollTrigger.create({
      trigger: chapter,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => chapter.classList.add('is-active'),
      onLeave: () => chapter.classList.remove('is-active'),
      onEnterBack: () => chapter.classList.add('is-active'),
      onLeaveBack: () => chapter.classList.remove('is-active'),
    });

    // Animate content
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: chapter,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    if (marker) {
      tl.from(marker, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      });
    }

    if (heading) {
      tl.from(
        heading,
        {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }

    if (year) {
      tl.from(
        year,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.5'
      );
    }

    // Parallax background
    if (bgImage) {
      gsap.to(bgImage.querySelector('img'), {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: chapter,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  });
}

function initTextAnimations() {
  // Large text reveals
  const textLarge = document.querySelectorAll('.text-large');

  textLarge.forEach((text, index) => {
    ScrollTrigger.create({
      trigger: text,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(text, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          onStart: () => text.classList.add('is-visible'),
        });
      },
      onLeaveBack: () => {
        text.classList.remove('is-visible');
        gsap.set(text, { opacity: 0, y: 30 });
      },
    });
  });

  // List items
  const listItems = document.querySelectorAll('.text-list li');

  listItems.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power3.out',
          onStart: () => item.classList.add('is-visible'),
        });
      },
      onLeaveBack: () => {
        item.classList.remove('is-visible');
        gsap.set(item, { opacity: 0, x: -20 });
      },
    });
  });
}

function initQuoteAnimation() {
  const quotes = document.querySelectorAll('.story-quote');

  quotes.forEach((quote) => {
    ScrollTrigger.create({
      trigger: quote,
      start: 'top 60%',
      onEnter: () => quote.classList.add('is-visible'),
      onLeaveBack: () => quote.classList.remove('is-visible'),
    });
  });
}

function initMemberAnimations() {
  const members = document.querySelectorAll('.chapter--member');

  members.forEach((member) => {
    const portrait = member.querySelector('.member-portrait');
    const story = member.querySelector('.member-story');
    const number = member.querySelector('.member-number');
    const name = member.querySelector('.member-name');
    const role = member.querySelector('.member-role');
    const bio = member.querySelector('.member-bio');

    // Activate on scroll
    ScrollTrigger.create({
      trigger: member,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => member.classList.add('is-active'),
      onLeave: () => member.classList.remove('is-active'),
      onEnterBack: () => member.classList.add('is-active'),
      onLeaveBack: () => member.classList.remove('is-active'),
    });

    // Animate story content
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: member,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    if (number) {
      tl.from(number, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power3.out',
      });
    }

    if (name) {
      tl.from(
        name,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      );
    }

    if (role) {
      tl.from(
        role,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      );
    }

    if (bio) {
      tl.from(
        bio,
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }

    // Parallax portrait
    if (portrait) {
      gsap.to(portrait.querySelector('img'), {
        y: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: member,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  });
}

function initShowsAnimation() {
  const showItems = document.querySelectorAll('.show-item');

  showItems.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.6,
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

  // Intro animation
  gsap.from('.shows-intro', {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.chapter--shows',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });
}

function initEpilogueAnimations() {
  const epilogue = document.querySelector('.chapter--epilogue');
  if (!epilogue) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: epilogue,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  tl.from('.epilogue-text', {
    opacity: 0,
    y: 40,
    stagger: 0.2,
    duration: 1,
    ease: 'power3.out',
  })
    .from(
      '.cta-btn',
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.4'
    )
    .from(
      '.social-links a',
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
      '.story-footer',
      {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.2'
    );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
