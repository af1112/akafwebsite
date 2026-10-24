const fs = require('fs');
const assert = require('node:assert/strict');
const out = 'shots/milestone-j';
const rows = JSON.parse(fs.readFileSync(`${out}/route-results.json`));
const results = [];
for (const row of rows) {
  try {
    if (row.template === 'ai-software') {
      assert.equal(row.status, 308);
      assert.ok(row.redirect.endsWith(`/${row.locale}/products/digital-menu`));
    } else {
      assert.equal(row.status, 200);
      assert.ok(!row.result.startsWith('NOT TESTED'));
      assert.equal(row.lang, row.locale);
      assert.equal(row.dir, row.locale === 'en' ? 'ltr' : 'rtl');
      if (['payment', 'success', 'thank-you', 'login', 'signup'].includes(row.template)) {
        assert.ok(row.robots.includes('noindex'));
      } else {
        assert.equal(row.canonicalCount, 1);
        assert.ok(row.canonical.endsWith(row.route));
        assert.ok(!row.canonical.includes('yourdomain.com'));
        assert.ok(row.description.length > 0);
        assert.equal(row.h1Count, 1);
        assert.ok(row.ssrH1);
        for (const lang of ['en', 'fa', 'ar', 'x-default']) assert.ok(row.hreflang.split(' ').includes(lang));
      }
    }
    results.push({ route: row.route, status: 'PASS' });
  } catch (e) { results.push({ route: row.route, status: 'FAIL', reason: e.message }); }
}
for (const row of rows.filter(row => row.status === 200 && !['payment', 'success', 'thank-you', 'login', 'signup'].includes(row.template))) {
  try {
    const name = `${row.locale}-${row.template === 'home' ? 'home' : row.template.replace(/\//g, '-')}`;
    const data = JSON.parse(fs.readFileSync(`${out}/${name}.json`));
    for (const language of ['en', 'fa', 'ar']) {
      const equivalent = rows.find(other => other.template === row.template && other.locale === language);
      assert.ok(equivalent);
      assert.equal(data.hreflang.find(item => item.language === language).href, equivalent.canonical);
    }
    assert.ok(data.schemas.every(schema => schema['@context'] === 'https://schema.org' && !schema.error));
    assert.equal(rows.filter(other => other.locale === row.locale && other.title === row.title).length, 1);
    assert.equal(rows.filter(other => other.locale === row.locale && other.description === row.description).length, 1);
    assert.equal(data.openGraph.find(item => item.name === 'og:url').content, row.canonical);
    assert.equal(data.openGraph.find(item => item.name === 'og:title').content, row.title);
    assert.equal(data.missingAlt.length, 0);
    results.push({ route: `${row.route} reciprocal/schema/title`, status: 'PASS' });
  } catch (e) { results.push({ route: `${row.route} reciprocal/schema/title`, status: 'FAIL', reason: e.message }); }
}
const summary = { passed: results.filter(r => r.status === 'PASS').length, failed: results.filter(r => r.status === 'FAIL').length, results };
const similarity = [];
for (const locale of ['en', 'fa', 'ar']) {
  const pages = rows.filter(row => row.locale === locale && row.status === 200 && row.robots?.startsWith('index'));
  for (let i = 0; i < pages.length; i++) for (let j = i + 1; j < pages.length; j++) {
    const tokens = row => {
      const data = JSON.parse(fs.readFileSync(`${out}/${row.locale}-${row.template.replace(/\//g, '-')}.json`));
      return new Set((data.mainText || '').toLowerCase().split(/\s+/).filter(Boolean));
    };
    const a = tokens(pages[i]);
    const b = tokens(pages[j]);
    const union = new Set([...a, ...b]);
    const score = union.size ? [...a].filter(word => b.has(word)).length / union.size : 0;
    if (score >= 0.8) similarity.push({ first: pages[i].route, second: pages[j].route, jaccard: score, status: 'Manual duplicate-content review required' });
  }
}
fs.writeFileSync(`${out}/content-similarity.json`, JSON.stringify(similarity, null, 2));
fs.writeFileSync(`${out}/verification.json`, JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
if (summary.failed) process.exitCode = 1;
