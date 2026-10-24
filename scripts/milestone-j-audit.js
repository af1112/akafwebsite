const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const base = process.env.AUDIT_BASE_URL || 'http://localhost:3010';
const out = path.join('shots', 'milestone-j');
const locales = ['en', 'fa', 'ar'];
const slugs = ['', 'about', 'ai-software', 'contact', 'digital', 'features', 'industrial', 'login', 'partnerships', 'payment', 'pricing', 'products/digital-menu', 'products/weighbridge', 'projects', 'services', 'signup', 'smart-industry', 'success', 'thank-you'];
const quote = value => `"${String(value ?? '').replace(/"/g, '""')}"`;

(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const rows = [];
  const screenshots = [];
  const systemRows = [];
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    for (const locale of locales) {
      for (const slug of slugs) {
        const route = `/${locale}${slug ? '/' + slug : ''}`;
        const name = `${locale}-${slug.replace(/\//g, '-') || 'home'}`;
        const row = { route, locale, template: slug || 'home' };
        try {
          const response = await fetch(`${base}${route}`, { redirect: 'manual' });
          row.status = response.status;
          row.redirect = response.headers.get('location') || '';
          if (response.status >= 300 && response.status < 400) {
            row.result = 'VERIFIED redirect';
            rows.push(row);
            continue;
          }
          const html = await response.text();
          fs.writeFileSync(path.join(out, `${name}.html`), html);
          await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
          await page.evaluate(() => document.fonts.ready);
          const data = await page.evaluate(() => {
            const meta = name => document.querySelector(`meta[name="${name}"]`)?.content || '';
            const headings = [...document.querySelectorAll('main h1,main h2,main h3,main h4,main h5,main h6')].map(el => ({ level: Number(el.tagName[1]), text: el.textContent.trim() }));
            const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => { try { return JSON.parse(el.textContent); } catch { return { error: 'invalid JSON' }; } });
            return {
              title: document.title,
              description: meta('description'),
              canonicals: [...document.querySelectorAll('link[rel="canonical"]')].map(el => el.href),
              hreflang: [...document.querySelectorAll('link[hreflang]')].map(el => ({ language: el.hreflang, href: el.href })),
              robots: meta('robots'),
              lang: document.documentElement.lang,
              dir: document.documentElement.dir,
              h1: headings.filter(h => h.level === 1).map(h => h.text),
              headingSkips: headings.filter((h, i) => i > 0 && h.level > headings[i - 1].level + 1),
              headings,
              missingAlt: [...document.images].filter(el => !el.hasAttribute('alt')).map(el => el.src),
              links: [...new Set([...document.querySelectorAll('a[href]')].map(el => el.getAttribute('href')))],
              schemas,
              openGraph: [...document.querySelectorAll('meta[property^="og:"]')].map(el => ({ name: el.getAttribute('property'), content: el.content })),
              mainTextLength: document.querySelector('main')?.textContent.trim().length || 0,
              mainText: document.querySelector('main')?.textContent.replace(/\s+/g, ' ').trim() || ''
            };
          });
          fs.writeFileSync(path.join(out, `${name}.json`), JSON.stringify(data, null, 2));
          row.title = data.title;
          row.description = data.description;
          row.canonicalCount = data.canonicals.length;
          row.canonical = data.canonicals.join(' | ');
          row.hreflang = data.hreflang.map(h => h.language).join(' ');
          row.lang = data.lang;
          row.dir = data.dir;
          row.h1Count = data.h1.length;
          row.headingSkips = data.headingSkips.length;
          row.missingAlt = data.missingAlt.length;
          row.robots = data.robots;
          row.ssrH1 = /<h1[\s>]/i.test(html);
          row.result = 'VERIFIED output; manual content review required';
          row.evidence = `${out}/${name}.html`;
          for (const width of [1440, 390]) {
            await page.setViewport({ width, height: width === 390 ? 844 : 900, deviceScaleFactor: 1 });
            await page.evaluate(() => window.scrollTo(0, 0));
            await new Promise(resolve => setTimeout(resolve, 300));
            const file = `${out}/${name}-${width}.png`;
            await page.screenshot({ path: file });
            screenshots.push({ route, renderedUrl: page.url(), width, height: width === 390 ? 844 : 900, file });
          }
        } catch (error) {
          row.result = `NOT TESTED: ${error.message}`;
        }
        rows.push(row);
        console.log(route, row.status, row.result);
      }
    }
    const links = new Set();
    for (const file of fs.readdirSync(out).filter(file => /^(en|fa|ar)-.*\.json$/.test(file))) {
      for (const link of JSON.parse(fs.readFileSync(path.join(out, file))).links || []) {
        if (link.startsWith('/') && !link.startsWith('//') && !link.startsWith('/api/') && !link.startsWith('/pc_software')) links.add(link.split('#')[0]);
      }
    }
    const linkResults = [];
    for (const link of links) {
      try { const r = await fetch(`${base}${link}`, { redirect: 'manual' }); linkResults.push({ link, status: r.status, location: r.headers.get('location') }); }
      catch (e) { linkResults.push({ link, error: e.message }); }
    }
    fs.writeFileSync(path.join(out, 'internal-links.json'), JSON.stringify(linkResults, null, 2));
    for (const route of ['/', '/robots.txt', '/sitemap.xml', '/en/not-a-real-akaf-page', '/fa/not-a-real-akaf-page', '/ar/not-a-real-akaf-page']) {
      const r = await fetch(`${base}${route}`, { redirect: 'manual' });
      console.log('special', route, r.status);
      systemRows.push({ route, template: 'system or 404 probe', status: r.status, redirect: r.headers.get('location') || '', result: 'VERIFIED HTTP output', evidence: `${out}/${route.replace(/\//g, '_')}.txt` });
      fs.writeFileSync(path.join(out, route.replace(/\//g, '_') + '.txt'), `Status: ${r.status}\n${await r.text()}`);
    }
  } finally {
    await browser.close();
    fs.writeFileSync(path.join(out, 'route-results.json'), JSON.stringify(rows, null, 2));
    fs.writeFileSync(path.join(out, 'manifest.json'), JSON.stringify(screenshots, null, 2));
    const columns = ['route', 'locale', 'template', 'status', 'redirect', 'title', 'description', 'canonicalCount', 'canonical', 'hreflang', 'lang', 'dir', 'h1Count', 'headingSkips', 'missingAlt', 'robots', 'ssrH1', 'result', 'evidence'];
    fs.writeFileSync('SEO-ROUTE-MATRIX.csv', [columns.join(','), ...[...rows, ...systemRows, ...['/api/auth/check-existing', '/api/contact', '/api/notifications/payment', '/api/payments/thawani', '/api/test-env', '/pc_software/:path*'].map(route => ({ route, template: route.startsWith('/api/') ? 'API endpoint' : 'external application rewrite', result: 'NOT TESTED: outside public HTML scope; requires approved sandbox or external app access' }))].map(row => columns.map(key => quote(row[key])).join(','))].join('\n'));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
