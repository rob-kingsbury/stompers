import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

let lenis;

function init() {
  initSmoothScroll();
  initEntranceAnimations();
  initStageAnimations();
  initBarAnimations();
  initBandAnimations();
  initMarqueeAnimations();
  initBackstageAnimations();
  initAmbientEffects();
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
}

function initEntranceAnimations() {
  const entrance = document.querySelector('.venue-section--entrance');
  if (!entrance) return;

  const neonLines = document.querySelectorAll('.neon-line');
  const details = document.querySelector('.entrance-details');
  const arrow = document.querySelector('.entrance-arrow');

  const tl = gsap.timeline({ delay: 0.5 });

  // Neon sign flicker in
  neonLines.forEach((line, index) => {
    tl.from(
      line,
      {
        opacity: 0,
        duration: 0.1,
        ease: 'none',
        repeat: 3,
        yoyo: true,
      },
      index * 0.2
    );

    tl.to(
      line,
      {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      },
      `>-0.05`
    );
  });

  if (details) {
    tl.from(
      details,
      {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.3'
    );
  }

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

  // Parallax smoke
  gsap.to('.smoke-effect', {
    y: '-30%',
    ease: 'none',
    scrollTrigger: {
      trigger: entrance,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

function initStageAnimations() {
  const stage = document.querySelector('.venue-section--stage');
  if (!stage) return;

  // Video zoom on scroll
  gsap.to('.stage-video', {
    scale: 1.2,
    ease: 'none',
    scrollTrigger: {
      trigger: stage,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  // Content reveal
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stage,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  tl.from('.intro-label', {
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    ease: 'back.out(1.7)',
  })
    .from(
      '.stage-title span',
      {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.3'
    )
    .from(
      '.stage-quote',
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.4'
    );
}

function initBarAnimations() {
  const bar = document.querySelector('.venue-section--bar');
  if (!bar) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: bar,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  tl.from('.bar-header', {
    opacity: 0,
    x: -30,
    duration: 0.8,
    ease: 'power3.out',
  })
    .from(
      '.bar-text .text-large',
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.4'
    )
    .from(
      '.bar-text p:not(.text-large)',
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.3'
    )
    .from(
      '.stat',
      {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.2'
    );

  // Animate stat values
  const statValues = bar.querySelectorAll('.stat-value');
  statValues.forEach((stat) => {
    const text = stat.textContent;
    const num = parseInt(text);

    if (!isNaN(num)) {
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => {
          gsap.from(stat, {
            innerText: 0,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate: function () {
              const suffix = text.includes('+') ? '+' : '';
              stat.textContent = Math.round(this.targets()[0].innerText) + suffix;
            },
          });
        },
        once: true,
      });
    }
  });
}

function initBandAnimations() {
  const members = document.querySelectorAll('.band-member');

  members.forEach((member, index) => {
    ScrollTrigger.create({
      trigger: member,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(member, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          onStart: () => member.classList.add('is-visible'),
        });
      },
      onLeaveBack: () => {
        member.classList.remove('is-visible');
        gsap.set(member, { opacity: 0, y: 30 });
      },
    });
  });

  // Header animation
  gsap.from('.greenroom-header', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.venue-section--greenroom',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });
}

function initMarqueeAnimations() {
  const marquee = document.querySelector('.venue-section--marquee');
  if (!marquee) return;

  // Header
  gsap.from('.marquee-header', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: marquee,
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  });

  // Tour marquee
  gsap.from('.tour-marquee', {
    opacity: 0,
    scaleX: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.tour-marquee',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  });

  // Show listings
  const listings = document.querySelectorAll('.show-listing');
  listings.forEach((listing, index) => {
    ScrollTrigger.create({
      trigger: listing,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(listing, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power3.out',
          onStart: () => listing.classList.add('is-visible'),
        });
      },
      onLeaveBack: () => {
        listing.classList.remove('is-visible');
        gsap.set(listing, { opacity: 0, x: -20 });
      },
    });
  });

  // Bulb stagger animation
  gsap.from('.marquee-bulb', {
    opacity: 0,
    stagger: {
      each: 0.1,
      repeat: -1,
      yoyo: true,
    },
    duration: 0.3,
    scrollTrigger: {
      trigger: marquee,
      start: 'top 80%',
      toggleActions: 'play pause resume pause',
    },
  });
}

function initBackstageAnimations() {
  const backstage = document.querySelector('.venue-section--backstage');
  if (!backstage) return;

  gsap.from('.backstage-pass', {
    opacity: 0,
    y: 60,
    rotateX: 20,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: backstage,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  // Stagger internal elements
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: backstage,
      start: 'top 60%',
      toggleActions: 'play none none reverse',
    },
  });

  tl.from(
    '.pass-header',
    {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power3.out',
    },
    0.3
  )
    .from(
      '.pass-content',
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.3'
    )
    .from(
      '.pass-social',
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      },
      '-=0.3'
    )
    .from(
      '.pass-footer',
      {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out',
      },
      '-=0.2'
    );
}

function initAmbientEffects() {
  // Subtle random movement for light beams based on scroll
  const beams = document.querySelectorAll('.light-beam');

  ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      const progress = self.progress;
      beams.forEach((beam, i) => {
        const offset = Math.sin(progress * Math.PI * 2 + i) * 10;
        gsap.to(beam, {
          x: offset,
          duration: 0.5,
          ease: 'none',
        });
      });
    },
  });

  // Spotlights follow scroll subtly
  gsap.to('.spotlight--1', {
    y: '100vh',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });

  gsap.to('.spotlight--2', {
    y: '-100vh',
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
