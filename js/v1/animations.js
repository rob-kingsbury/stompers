import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initProgressBar() {
  gsap.to('#progress-bar', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  });
}

export function initHeroAnimations() {
  const heroTl = gsap.timeline({ delay: 0.5 });

  heroTl
    .to('.hero-title .line-inner', {
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
    })
    .to(
      '.hero-eyebrow',
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.8'
    )
    .to(
      '.hero-subtitle',
      {
        opacity: 0.7,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.5'
    )
    .to(
      '.hero-scroll-indicator',
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
      '-=0.3'
    );

  return heroTl;
}

export function initRevealAnimations(containerSelector) {
  gsap.utils.toArray(`${containerSelector} .reveal`).forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      delay: i * 0.1,
    });
  });
}

export function initParallaxImage(selector, containerSelector) {
  gsap.to(selector, {
    scale: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: containerSelector,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

export function initHorizontalScroll() {
  const horizontalWrapper = document.getElementById('horizontal-wrapper');
  if (!horizontalWrapper) return;

  const panels = gsap.utils.toArray('.horizontal-panel');
  if (panels.length === 0) return;

  gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.horizontal-section',
      pin: true,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      end: () => '+=' + horizontalWrapper.offsetWidth,
    },
  });
}

export function initParallaxText() {
  const backText = document.getElementById('parallax-back');
  const frontText = document.getElementById('parallax-front');

  if (backText) {
    gsap.to(backText, {
      x: '-30%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-text-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  if (frontText) {
    gsap.to(frontText, {
      x: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: '.parallax-text-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}
