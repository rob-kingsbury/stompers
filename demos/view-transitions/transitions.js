// ========== TRANSITION STYLE SWITCHER ==========
const styleBtns = document.querySelectorAll('.style-btn');
const currentStyle = localStorage.getItem('transitionStyle') || 'slide';

// Apply saved style
document.documentElement.dataset.transition = currentStyle;
styleBtns.forEach(btn => {
  if (btn.dataset.style === currentStyle) {
    btn.classList.add('active');
  }
});

// Handle style switching
styleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const style = btn.dataset.style;

    // Update active state
    styleBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Save and apply
    localStorage.setItem('transitionStyle', style);
    document.documentElement.dataset.transition = style;
  });
});

// ========== MOBILE MENU ==========
const menuToggle = document.getElementById('menuToggle');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');

if (menuToggle && menuOverlay) {
  menuToggle.addEventListener('click', () => {
    menuOverlay.classList.add('active');
  });

  menuClose.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menuOverlay.classList.remove('active');
    }
  });
}

// ========== VIEW TRANSITIONS POLYFILL CHECK ==========
if (!document.startViewTransition) {
  console.log('View Transitions API not supported - falling back to instant navigation');

  // Add notice for unsupported browsers
  const notice = document.createElement('div');
  notice.style.cssText = `
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    background: #c9a227;
    color: #0a0a0a;
    padding: 0.75rem 1.5rem;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 0.85rem;
    z-index: 9999;
    border-radius: 4px;
  `;
  notice.textContent = 'View Transitions not supported in this browser (try Chrome or Safari 18+)';
  document.body.appendChild(notice);

  setTimeout(() => notice.remove(), 5000);
}
