/**
 * Site Animation Analysis Script
 * Captures screenshots and analyzes scroll animations on reference sites
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = './analysis-screenshots';

async function analyzeSite(url, name, analysisSteps) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`\n=== Analyzing: ${name} (${url}) ===\n`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000); // Wait for animations to settle

    // Take initial screenshot
    await page.screenshot({
      path: path.join(OUTPUT_DIR, `${name}-01-initial.png`),
      fullPage: false
    });
    console.log(`Captured: ${name}-01-initial.png`);

    // Get page info
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    console.log(`Page height: ${pageHeight}px, Viewport: ${viewportHeight}px`);

    // Analyze CSS for specific elements
    const cssAnalysis = await page.evaluate((selector) => {
      const elements = document.querySelectorAll(selector);
      const results = [];
      elements.forEach((el, i) => {
        const styles = window.getComputedStyle(el);
        results.push({
          index: i,
          tag: el.tagName,
          className: el.className,
          transform: styles.transform,
          transition: styles.transition,
          perspective: styles.perspective,
          transformStyle: styles.transformStyle,
          position: styles.position,
          zIndex: styles.zIndex,
        });
      });
      return results;
    }, analysisSteps.targetSelector || 'section');

    console.log(`\nCSS Analysis for "${analysisSteps.targetSelector || 'section'}":`);
    console.log(JSON.stringify(cssAnalysis.slice(0, 5), null, 2));

    // Scroll through page and capture at intervals
    const scrollSteps = analysisSteps.scrollSteps || [0.25, 0.5, 0.75, 1];

    for (let i = 0; i < scrollSteps.length; i++) {
      const scrollPos = Math.floor((pageHeight - viewportHeight) * scrollSteps[i]);
      await page.evaluate((pos) => window.scrollTo({ top: pos, behavior: 'instant' }), scrollPos);
      await page.waitForTimeout(500); // Wait for scroll animations

      await page.screenshot({
        path: path.join(OUTPUT_DIR, `${name}-0${i + 2}-scroll-${Math.round(scrollSteps[i] * 100)}pct.png`),
        fullPage: false
      });
      console.log(`Captured: ${name}-0${i + 2}-scroll-${Math.round(scrollSteps[i] * 100)}pct.png`);

      // Check for any elements with animation classes or transforms at this scroll position
      if (analysisSteps.targetSelector) {
        const animState = await page.evaluate((selector) => {
          const elements = document.querySelectorAll(selector);
          const states = [];
          elements.forEach((el, idx) => {
            const styles = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            states.push({
              index: idx,
              inView: rect.top < window.innerHeight && rect.bottom > 0,
              transform: styles.transform,
              opacity: styles.opacity,
              classList: Array.from(el.classList),
            });
          });
          return states;
        }, analysisSteps.targetSelector);

        console.log(`Animation state at ${Math.round(scrollSteps[i] * 100)}%:`,
          JSON.stringify(animState.filter(s => s.inView).slice(0, 3), null, 2));
      }
    }

    // Look for specific animation-related code
    const animationCode = await page.evaluate(() => {
      // Check for GSAP
      const hasGSAP = typeof gsap !== 'undefined';
      const hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
      const hasLenis = typeof Lenis !== 'undefined';

      // Get all stylesheets and look for keyframes
      const keyframes = [];
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.type === CSSRule.KEYFRAMES_RULE) {
              keyframes.push(rule.name);
            }
          }
        } catch (e) {
          // Cross-origin stylesheet
        }
      }

      return {
        hasGSAP,
        hasScrollTrigger,
        hasLenis,
        keyframeAnimations: keyframes,
      };
    });

    console.log(`\nAnimation Libraries Detected:`, animationCode);

  } catch (error) {
    console.error(`Error analyzing ${name}:`, error.message);
  }

  await browser.close();
}

async function main() {
  // Analyze MetaMask for progress indicator
  await analyzeSite('https://metamask.io/en-GB/', 'metamask', {
    targetSelector: '[class*="progress"], [class*="indicator"], [class*="nav"], [class*="dot"]',
    scrollSteps: [0.1, 0.3, 0.5, 0.7, 0.9]
  });

  // Analyze ConCom for services cards
  await analyzeSite('https://concom.tv/', 'concom', {
    targetSelector: '[class*="service"], [class*="card"], [class*="flip"]',
    scrollSteps: [0.2, 0.35, 0.5, 0.65, 0.8]
  });

  // Analyze Mantis for services list
  await analyzeSite('https://www.mantis.works/', 'mantis', {
    targetSelector: '[class*="service"], [class*="list"], section',
    scrollSteps: [0.25, 0.5, 0.75]
  });

  // Analyze Shopify Supply for product scroll
  await analyzeSite('https://shopify.supply/', 'shopify-supply', {
    targetSelector: '[class*="product"], [class*="card"], [class*="item"]',
    scrollSteps: [0.2, 0.4, 0.6, 0.8]
  });

  // Analyze Slap Apps for card pop-in
  await analyzeSite('https://slap-apps.de/en', 'slap-apps', {
    targetSelector: '[class*="card"], [class*="project"], [class*="work"]',
    scrollSteps: [0.3, 0.5, 0.7]
  });

  console.log(`\n=== Analysis Complete ===`);
  console.log(`Screenshots saved to: ${OUTPUT_DIR}/`);
}

main().catch(console.error);
