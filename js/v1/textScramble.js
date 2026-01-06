const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';

export class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = chars;
    this.frameRequest = null;
    this.frame = 0;
    this.queue = [];
    this.resolve = null;
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="scramble-char">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(() => this.update());
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

export function initScrambleOnScroll(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const scrambler = new TextScramble(el);
    const originalText = el.innerText;
    let hasAnimated = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            el.style.visibility = 'visible';
            scrambler.setText(originalText);
          }
        });
      },
      { threshold: 0.5 }
    );

    el.style.visibility = 'hidden';
    observer.observe(el);
  });
}

export function scrambleOnHover(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el) => {
    const scrambler = new TextScramble(el);
    const originalText = el.innerText;

    el.addEventListener('mouseenter', () => {
      scrambler.setText(originalText);
    });
  });
}
