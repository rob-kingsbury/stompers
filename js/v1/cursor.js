import gsap from 'gsap';

let cursorEl = null;
let isEnabled = false;

export function initCustomCursor() {
  cursorEl = document.getElementById('cursor');

  if (!cursorEl || !window.matchMedia('(hover: hover)').matches) {
    return;
  }

  isEnabled = true;

  document.addEventListener('mousemove', handleMouseMove);

  document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
    el.addEventListener('mouseenter', handleHoverEnter);
    el.addEventListener('mouseleave', handleHoverLeave);
  });

  document.querySelectorAll('[data-cursor-text]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      const text = el.dataset.cursorText;
      cursorEl.classList.add('cursor--text');
      cursorEl.innerHTML = `<span>${text}</span>`;
    });
    el.addEventListener('mouseleave', () => {
      cursorEl.classList.remove('cursor--text');
      cursorEl.innerHTML = '';
    });
  });
}

function handleMouseMove(e) {
  if (!cursorEl) return;

  gsap.to(cursorEl, {
    x: e.clientX - 10,
    y: e.clientY - 10,
    duration: 0.15,
    ease: 'power2.out',
  });
}

function handleHoverEnter() {
  if (cursorEl) cursorEl.classList.add('cursor--hover');
}

function handleHoverLeave() {
  if (cursorEl) cursorEl.classList.remove('cursor--hover');
}

export function hideCursor() {
  if (cursorEl) cursorEl.style.opacity = '0';
}

export function showCursor() {
  if (cursorEl) cursorEl.style.opacity = '1';
}
