import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

let lenis;
let currentTimestamp = { hours: 0, mins: 0, secs: 0 };

function init() {
  initSmoothScroll();
  initTimecodeDisplay();
  initTitleAnimation();
  initChapterAnimations();
  initFootageEffects();
  initInterviewAnimations();
  initArchiveAnimations();
  initProfileAnimations();
  initStatsCounter();
  initTourAnimations();
  initClosingAnimations();
  initCreditsRoll();
}

function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.6,
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
}

function initTimecodeDisplay() {
  const hoursEl = document.querySelector('.timecode-hours');
  const minsEl = document.querySelector('.timecode-mins');
  const secsEl = document.querySelector('.timecode-secs');

  if (!hoursEl) return;

  const sections = document.querySelectorAll('[data-timestamp]');
  const timestamps = [];

  sections.forEach((section) => {
    const ts = section.dataset.timestamp;
    const parts = ts.split(':');
    timestamps.push({
      element: section,
      hours: parseInt(parts[0]),
      mins: parseInt(parts[1]),
      secs: parseInt(parts[2]),
    });
  });

  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      // Find current section based on scroll progress
      const totalSections = timestamps.length;
      const currentIndex = Math.min(
        Math.floor(self.progress * totalSections),
        totalSections - 1
      );

      if (timestamps[currentIndex]) {
        const target = timestamps[currentIndex];
        const next = timestamps[currentIndex + 1] || target;

        // Calculate interpolation within section
        const sectionProgress =
          (self.progress * totalSections) % 1 || (currentIndex === totalSections - 1 ? 1 : 0);

        // Interpolate time
        const totalTargetSecs =
          target.hours * 3600 + target.mins * 60 + target.secs;
        const totalNextSecs = next.hours * 3600 + next.mins * 60 + next.secs;
        const currentTotalSecs = Math.floor(
          totalTargetSecs + (totalNextSecs - totalTargetSecs) * sectionProgress
        );

        const hours = Math.floor(currentTotalSecs / 3600);
        const mins = Math.floor((currentTotalSecs % 3600) / 60);
        const secs = currentTotalSecs % 60;

        hoursEl.textContent = String(hours).padStart(2, '0');
        minsEl.textContent = String(mins).padStart(2, '0');
        secsEl.textContent = String(secs).padStart(2, '0');
      }
    },
  });
}

function initTitleAnimation() {
  const titleSpans = document.querySelectorAll('.title-main span');
  if (titleSpans.length === 0) return;

  const tl = gsap.timeline({ delay: 0.5 });

  tl.to(titleSpans, {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 1.2,
    ease: 'power4.out',
  })
    .from(
      '.title-meta span',
      {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.8'
    )
    .from(
      '.title-sub',
      {
        opacity: 0,
        letterSpacing: '1em',
        duration: 1,
        ease: 'power3.out',
      },
      '-=0.5'
    )
    .from(
      '.title-runtime',
      {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    )
    .from(
      '.scroll-indicator',
      {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.2'
    );
}

function initChapterAnimations() {
  const chapters = document.querySelectorAll('.doc-section--chapter');

  chapters.forEach((chapter) => {
    const label = chapter.querySelector('.chapter-label');
    const title = chapter.querySelector('.chapter-title');
    const date = chapter.querySelector('.chapter-date');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: chapter,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    if (label) {
      tl.from(label, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      });
    }

    if (title) {
      tl.from(
        title,
        {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }

    if (date) {
      tl.from(
        date,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.5'
      );
    }
  });
}

function initFootageEffects() {
  const footageContainers = document.querySelectorAll('.footage-container');

  footageContainers.forEach((container) => {
    gsap.from(container, {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    // Slight zoom on scroll
    gsap.to(container.querySelector('video'), {
      scale: 1.1,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

function initInterviewAnimations() {
  const interviews = document.querySelectorAll('.doc-section--interview');

  interviews.forEach((interview) => {
    const subject = interview.querySelector('.interview-subject');
    const quote = interview.querySelector('.interview-quote');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: interview,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    if (subject) {
      tl.from(subject, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power3.out',
      });
    }

    if (quote) {
      tl.from(
        quote,
        {
          opacity: 0,
          x: 30,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.5'
      );
    }
  });
}

function initArchiveAnimations() {
  const archiveItems = document.querySelectorAll('.archive-item');

  archiveItems.forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      y: 40,
      rotation: index % 2 === 0 ? -3 : 3,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

function initProfileAnimations() {
  const profiles = document.querySelectorAll('.profile-card');

  profiles.forEach((profile, index) => {
    ScrollTrigger.create({
      trigger: profile,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(profile, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          onStart: () => profile.classList.add('is-visible'),
        });
      },
      onLeaveBack: () => {
        profile.classList.remove('is-visible');
        gsap.set(profile, { opacity: 0, y: 30 });
      },
    });
  });
}

function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach((stat) => {
    const target = parseInt(stat.dataset.count) || 0;

    ScrollTrigger.create({
      trigger: stat,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(stat, {
          innerText: target,
          duration: 2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          onUpdate: function () {
            stat.textContent = Math.round(this.targets()[0].innerText) + '+';
          },
        });
      },
      once: true,
    });
  });
}

function initTourAnimations() {
  const tourItems = document.querySelectorAll('.tour-item');

  tourItems.forEach((item, index) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(item, {
          opacity: 1,
          x: 0,
          duration: 0.6,
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

  gsap.from('.tour-heading', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.tour-schedule',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });
}

function initClosingAnimations() {
  const closing = document.querySelector('.doc-section--closing');
  if (!closing) return;

  gsap.from('.closing-quote p', {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: closing,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.closing-quote cite', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: closing,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });
}

function initCreditsRoll() {
  const credits = document.querySelector('.doc-section--credits');
  if (!credits) return;

  const sections = credits.querySelectorAll('.credits-section');

  sections.forEach((section, index) => {
    gsap.from(section, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      delay: index * 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: credits,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  gsap.from('.credits-logo', {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    delay: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: credits,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  gsap.from('.credits-footer', {
    opacity: 0,
    duration: 0.8,
    delay: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: credits,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
