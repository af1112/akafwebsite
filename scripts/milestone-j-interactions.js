const fs = require('fs');
const puppeteer = require('puppeteer-core');

(async () => {
  const out = 'shots/milestone-j';
  fs.mkdirSync(out, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const results = [];
  const manifest = [];
  try {
    const page = await browser.newPage();
    const snap = options => {
      manifest.push({ route: new URL(page.url()).pathname, viewport: page.viewport(), file: options.path, fullPage: !!options.fullPage });
      return page.screenshot(options);
    };
    const measure = () => page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, mainWidth: document.querySelector('main').getBoundingClientRect().width, menuExpanded: document.querySelector('.hamburger-menu').getAttribute('aria-expanded'), panel: [...document.querySelectorAll('.nav-dropdown-panel.open, .mobile-nav-panel.open')].map(el => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; }) }));
    for (const locale of ['en', 'fa', 'ar']) {
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await page.goto(`${process.env.AUDIT_BASE_URL || 'http://localhost:3010'}/${locale}/digital`, { waitUntil: 'networkidle2', timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      const section = await page.$('main .akaf-section');
      if (section) {
        const file = `${out}/${locale}-digital-products-section.png`;
        await section.screenshot({ path: file });
        manifest.push({ route: `/${locale}/digital`, viewport: page.viewport(), file, context: 'products section element capture' });
      }
      for (let i = 0; i < 3; i++) {
        await page.evaluate(() => window.scrollTo(0, 0));
        const triggers = await page.$$('.nav-dropdown-trigger');
        await triggers[i].click();
        await new Promise(r => setTimeout(r, 300));
        const metrics = await measure();
        await snap({ path: `${out}/${locale}-desktop-dropdown-${i}.png` });
        await page.keyboard.press('Escape');
        results.push({ locale, state: `desktop-dropdown-${i}`, metrics, escapeClosed: !(await page.$('.nav-dropdown-panel.open')) });
      }
      await page.click('.language-btn');
      await snap({ path: `${out}/${locale}-language-selector.png` });
      results.push({ locale, state: 'language-selector', links: await page.$$eval('.language-item', els => els.map(el => ({ href: el.getAttribute('href'), text: el.textContent.trim() }))) });
      await page.click('.language-btn');
      for (const width of [320, 390, 440]) {
        await page.setViewport({ width, height: 844, deviceScaleFactor: 1 });
        await page.reload({ waitUntil: 'networkidle2' });
        await page.evaluate(() => window.scrollTo(0, 0));
        const before = await measure();
        await snap({ path: `${out}/${locale}-mobile-${width}-closed.png` });
        await page.click('.hamburger-menu');
        await new Promise(r => setTimeout(r, 300));
        const after = await measure();
        await snap({ path: `${out}/${locale}-mobile-${width}-open.png` });
        for (let i = 0; i < 2; i++) {
          const buttons = await page.$$('.mobile-nav-group-btn');
          await buttons[i].click();
          await new Promise(r => setTimeout(r, 150));
          await snap({ path: `${out}/${locale}-mobile-${width}-accordion-${i}.png` });
        }
        await page.keyboard.press('Escape');
        results.push({ locale, state: `mobile-${width}`, before, after, pageNotSqueezed: before.mainWidth === after.mainWidth, escapeClosed: (await measure()).menuExpanded === 'false' });
      }
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
      for (const route of ['', '/digital', '/industrial', '/products/weighbridge', '/products/digital-menu']) {
        await page.goto(`${process.env.AUDIT_BASE_URL || 'http://localhost:3010'}/${locale}${route}`, { waitUntil: 'networkidle2', timeout: 60000 });
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
          await Promise.all([...document.images].map(image => image.decode().catch(() => null)));
        });
        await snap({ path: `${out}/${locale}-${route.slice(1).replace(/\//g, '-') || 'home'}-390-full.png`, fullPage: true });
        results.push({ locale, route, images: await page.evaluate(() => [...document.images].map(el => ({ src: el.getAttribute('src'), loaded: el.complete && el.naturalWidth > 0 }))) });
      }
    }
  } finally {
    fs.writeFileSync(`${out}/interaction-image-results.json`, JSON.stringify(results, null, 2));
    fs.writeFileSync(`${out}/interaction-manifest.json`, JSON.stringify(manifest, null, 2));
    await browser.close();
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
