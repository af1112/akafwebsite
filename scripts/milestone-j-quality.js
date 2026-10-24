const fs = require('fs');
const puppeteer = require('puppeteer-core');

(async () => {
  const { default: lighthouse } = await import('lighthouse');
  const { default: desktopConfig } = await import('lighthouse/core/config/desktop-config.js');
  const out = process.env.QUALITY_OUT || 'shots/milestone-j';
  fs.mkdirSync(out, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const results = [];
  const accessibility = [];
  try {
    for (const route of (process.env.SKIP_LIGHTHOUSE === 'true' ? [] : (process.env.QUALITY_ROUTES || '/en,/en/products/weighbridge,/en/products/digital-menu,/en/industrial').split(','))) {
      for (const formFactor of ['desktop', 'mobile']) {
        const url = `${process.env.AUDIT_BASE_URL || 'http://localhost:3010'}${route}`;
        const run = await lighthouse(url, { port: Number(new URL(browser.wsEndpoint()).port), output: 'json', onlyCategories: ['performance', 'accessibility', 'seo'], formFactor, screenEmulation: formFactor === 'desktop' ? { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1, disabled: false } : { mobile: true, width: 390, height: 844, deviceScaleFactor: 1, disabled: false } }, formFactor === 'desktop' ? desktopConfig : undefined);
        const lhr = run.lhr;
        const name = `${route.slice(1).replace(/\//g, '-')}-${formFactor}`;
        fs.writeFileSync(`${out}/lighthouse-${name}.json`, run.report);
        results.push({ route, formFactor, fetchTime: lhr.fetchTime, config: lhr.configSettings, performance: lhr.categories.performance.score, accessibility: lhr.categories.accessibility.score, seo: lhr.categories.seo.score, lcp: lhr.audits['largest-contentful-paint'].numericValue, cls: lhr.audits['cumulative-layout-shift'].numericValue, tbt: lhr.audits['total-blocking-time'].numericValue, inp: 'NOT TESTED: lab navigation is not field INP', warnings: lhr.runWarnings });
        console.log(name, JSON.stringify(results.at(-1)));
      }
    }
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const locale of ['en', 'fa', 'ar']) {
      for (const suffix of ['', '/digital', '/contact', '/products/weighbridge']) {
        const route = `/${locale}${suffix}`;
        try {
          await page.goto(`${process.env.AUDIT_BASE_URL || 'http://localhost:3010'}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
          await page.waitForSelector('main');
          const axePath = require('module').createRequire(require.resolve('@axe-core/puppeteer')).resolve('axe-core/axe.min.js');
          await page.addScriptTag({ path: axePath });
          const axe = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
          fs.writeFileSync(`${out}/axe-${route.slice(1).replace(/\//g, '-')}.json`, JSON.stringify(axe, null, 2));
          accessibility.push({ route, viewport: page.viewport(), status: 'VERIFIED automated scan', violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })), incomplete: axe.incomplete.length });
          console.log('axe', route, axe.violations.length);
        } catch (error) {
          accessibility.push({ route, status: 'NOT TESTED', error: error.message });
          console.log('axe failed', route, error.message);
        }
      }
    }
  } finally {
    fs.writeFileSync(`${out}/performance-summary.json`, JSON.stringify(results, null, 2));
    fs.writeFileSync(`${out}/accessibility-summary.json`, JSON.stringify(accessibility, null, 2));
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
