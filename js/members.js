import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMemberCards() {
  const cards = document.querySelectorAll('.member-card');

  if (cards.length === 0) return;

  cards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 80,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      delay: index * 0.1,
    });

    const image = card.querySelector('.member-image');
    if (image) {
      gsap.from(image, {
        scale: 1.3,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  });

  initMemberHeader();
}

function initMemberHeader() {
  const eyebrow = document.querySelector('.members-eyebrow');
  const title = document.querySelector('.members-title');

  if (eyebrow) {
    gsap.from(eyebrow, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.members-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }

  if (title) {
    gsap.from(title, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.members-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      delay: 0.1,
    });
  }
}
