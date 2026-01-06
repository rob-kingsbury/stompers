/**
 * Focused analysis of MetaMask progress indicator
 */

import { chromium } from 'playwright';

async function analyzeMetaMaskProgress() {
  const browser = await chromium.launch({ headless: false }); // visible browser
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  console.log('Loading MetaMask...');
  await page.goto('https://metamask.io/en-GB/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Find the progress indicator (the vertical dots on the right)
  const progressAnalysis = await page.evaluate(() => {
    // Look for fixed positioned elements on the right side
    const allElements = document.querySelectorAll('*');
    const fixedElements = [];

    allElements.forEach(el => {
      const styles = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();

      // Looking for fixed elements on the right side of the screen
      if (styles.position === 'fixed' && rect.right > window.innerWidth - 100) {
        fixedElements.push({
          tag: el.tagName,
          className: el.className,
          id: el.id,
          rect: { top: rect.top, right: rect.right, width: rect.width, height: rect.height },
          innerHTML: el.innerHTML.substring(0, 200),
          styles: {
            position: styles.position,
            right: styles.right,
            top: styles.top,
            background: styles.background,
            borderRadius: styles.borderRadius,
            display: styles.display,
            flexDirection: styles.flexDirection,
            gap: styles.gap,
          }
        });
      }
    });

    return fixedElements;
  });

  console.log('\n=== Fixed Elements on Right Side ===');
  progressAnalysis.forEach((el, i) => {
    console.log(`\n[${i}] ${el.tag} .${el.className}`);
    console.log('    Rect:', el.rect);
    console.log('    Styles:', el.styles);
  });

  // Look specifically for elements that look like dots/indicators
  const dotElements = await page.evaluate(() => {
    const results = [];
    // Common patterns for progress dots
    const selectors = [
      '[class*="dot"]',
      '[class*="indicator"]',
      '[class*="progress"]',
      '[class*="nav"] [class*="item"]',
      '[class*="scroll"]',
      'nav[class*="side"]',
      '[class*="vertical"]',
    ];

    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        const styles = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          results.push({
            selector,
            tag: el.tagName,
            className: el.className,
            rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
            borderRadius: styles.borderRadius,
            background: styles.backgroundColor,
          });
        }
      });
    });

    return results.slice(0, 20);
  });

  console.log('\n=== Potential Dot/Indicator Elements ===');
  dotElements.forEach((el, i) => {
    console.log(`[${i}] ${el.selector} -> ${el.tag}.${el.className.substring(0,50)}`);
    console.log('    Rect:', el.rect, 'BorderRadius:', el.borderRadius);
  });

  // Take a closer screenshot of the right side
  await page.screenshot({
    path: './analysis-screenshots/metamask-progress-detail.png',
    clip: { x: 1820, y: 300, width: 100, height: 400 }
  });

  // Scroll and observe changes
  console.log('\n=== Scrolling to observe changes ===');

  for (let scroll of [500, 2000, 5000, 8000]) {
    await page.evaluate((pos) => window.scrollTo({ top: pos, behavior: 'instant' }), scroll);
    await page.waitForTimeout(300);

    const state = await page.evaluate(() => {
      // Find any elements with "active" or highlighted state
      const indicators = document.querySelectorAll('[class*="dot"], [class*="indicator"], [class*="active"]');
      return Array.from(indicators).slice(0, 10).map(el => ({
        className: el.className,
        hasActive: el.className.includes('active'),
        opacity: window.getComputedStyle(el).opacity,
        background: window.getComputedStyle(el).backgroundColor,
      }));
    });

    console.log(`At scroll ${scroll}:`, state.filter(s => s.hasActive || s.opacity !== '1'));
  }

  await page.waitForTimeout(2000);
  await browser.close();
}

analyzeMetaMaskProgress().catch(console.error);
