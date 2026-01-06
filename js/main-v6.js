import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);

let lenis;

function init() {
  initSmoothScroll();
  initTileReveals();
  initTourMap();
}

function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
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
        lenis.scrollTo(target, { offset: -80, duration: 1.2 });
      }
    });
  });
}

function initTileReveals() {
  const tiles = document.querySelectorAll('.mosaic-tile');

  tiles.forEach((tile, i) => {
    // Use IntersectionObserver for simple reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger based on position in grid
            const delay = (i % 6) * 0.1;
            setTimeout(() => {
              tile.classList.add('is-visible');
            }, delay * 1000);
            observer.unobserve(tile);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(tile);
  });

  // Also add GSAP-based animations for more complex tiles
  gsap.utils.toArray('.mosaic-tile--title h1 span').forEach((span, i) => {
    gsap.from(span, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.5 + i * 0.1,
    });
  });
}

function initTourMap() {
  const shows = document.querySelectorAll('.mosaic-tile--show');
  const mapIframe = document.getElementById('tour-map');

  if (!mapIframe || shows.length === 0) return;

  shows.forEach((show) => {
    show.addEventListener('mouseenter', () => handleShowHover(show));
    show.addEventListener('click', () => handleShowClick(show));
  });

  function handleShowHover(show) {
    updateMap(show);
  }

  function handleShowClick(show) {
    shows.forEach((s) => s.classList.remove('is-active'));
    show.classList.add('is-active');
    updateMap(show);
  }

  function updateMap(show) {
    const venue = show.dataset.venue || '';
    const location = show.dataset.location || '';
    const query = venue ? `${venue} ${location}` : location;
    const url = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

    if (mapIframe.src !== url) {
      gsap.to(mapIframe, {
        opacity: 0.5,
        duration: 0.2,
        onComplete: () => {
          mapIframe.src = url;
          gsap.to(mapIframe, {
            opacity: 1,
            duration: 0.3,
            delay: 0.2,
          });
        },
      });
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
