const fs = require('fs');
const puppeteer = require('puppeteer-core');
const BASE = process.env.AUDIT_BASE_URL || 'http://localhost:3020';
const out = 'shots/milestone-k';
fs.mkdirSync(out, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage();
  const results = [];

  // Mobile overflow + nav states, 3 locales × 4 widths
  for (const loc of ['en', 'fa', 'ar']) {
    for (const w of [320, 375, 390, 440]) {
      await page.setViewport({ width: w, height: 844 });
      await page.goto(`${BASE}/${loc}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await new Promise(r => setTimeout(r, 600));
      const closed = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
      await page.click('.hamburger-menu').catch(() => {});
      await new Promise(r => setTimeout(r, 400));
      const open = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, mw: document.querySelector('main').getBoundingClientRect().width }));
      if (loc === 'en' && w === 390) {
        await page.screenshot({ path: `${out}/en-390-nav-open.png` });
        await page.click('.hamburger-menu'); await new Promise(r => setTimeout(r, 300));
        await page.screenshot({ path: `${out}/en-390-nav-closed.png` });
      }
      await page.keyboard.press('Escape').catch(() => {});
      results.push({ check: 'mobile-overflow', loc, w, closed_sw: closed.sw, open_sw: open.sw, main_w: open.mw, pass: closed.sw <= closed.iw && open.sw <= closed.iw });
    }
  }

  // Route status + forgot-password
  for (const loc of ['en', 'fa', 'ar']) {
    for (const p of ['', '/digital', '/industrial', '/smart-industry', '/projects', '/about', '/partnerships', '/contact', '/pricing', '/signup', '/login', '/forgot-password', '/products/weighbridge', '/products/digital-menu', '/services', '/features']) {
      const r = await fetch(`${BASE}/${loc}${p}`, { redirect: 'manual' });
      const html = await r.text();
      results.push({ check: 'route', url: `/${loc}${p}`, status: r.status, pass: r.status === 200 && html.length > 1000 });
    }
  }
  // SEO spot checks
  for (const p of ['/', '/digital', '/products/weighbridge', '/contact']) {
    const html = await (await fetch(`${BASE}/en${p}`)).text();
    results.push({ check: 'seo', url: `/en${p}`,
      canonical: (html.match(/rel="canonical" href="([^"]+)"/) || [])[1] || 'MISSING',
      hreflangCount: (html.match(/rel="alternate" hreflang/g) || []).length,
      pass: (html.match(/rel="canonical" href="([^"]+)"/) || [])[1] === `https://akafco.com/en${p}` && (html.match(/rel="alternate" hreflang/g) || []).length >= 4 });
  }
  const robots = await fetch(`${BASE}/robots.txt`); const rt = await robots.text();
  results.push({ check: 'robots', pass: robots.status === 200 && rt.includes('Sitemap:') && !rt.includes('/_next/') });
  const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
  results.push({ check: 'sitemap', pass: sm.includes('akafco.com/en') && !sm.includes('/login') });
  const red = await fetch(`${BASE}/en/ai-software`, { redirect: 'manual' });
  results.push({ check: 'legacy-redirect', status: red.status, location: red.headers.get('location'), pass: red.status === 308 });

  fs.writeFileSync(`${out}/results.json`, JSON.stringify(results, null, 2));
  const fails = results.filter(r => r.pass === false);
  console.log(`PASS: ${results.length - fails.length}/${results.length}, FAIL: ${fails.length}`);
  fails.forEach(f => console.log('FAIL', JSON.stringify(f)));
  await browser.close();
  process.exitCode = fails.length ? 1 : 0;
})().catch(e => { console.error(e); process.exitCode = 1; });
