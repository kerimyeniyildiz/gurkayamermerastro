import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const siteUrl = ((process.env.PUBLIC_SITE_URL || 'https://gurkayamermer.com').replace(/\/$/, ''));
const strategy = process.argv.includes('--desktop') ? 'desktop' : 'mobile';

const catalogSlugs = [
  'belenco',
  'belenco-seta',
  'silestone-polished',
  'silestone-sv',
  'coante',
  'cimstone',
  'granit',
  'laminam',
  'neolith',
  'dekton',
  'sapienstone',
  'infinity',
  'level',
  'materia',
  'mytop',
  't-one',
  'florim',
  'fiandre',
  'lamar',
  'anatolia',
  'ng-stone',
  'inalco',
  'versace-ceramics',
];

const routes = ['/', '/kurumsal', '/iletisim', '/blog', ...catalogSlugs.map((slug) => `/katalog/${slug}`)];
const urls = routes.map((route) => `${siteUrl}${route === '/' ? '' : route}`);

const outputDir = path.resolve(process.cwd(), 'reports', `lighthouse-${strategy}`);
fs.mkdirSync(outputDir, { recursive: true });

const runLighthouse = (url, outFile) => {
  const presetArg = strategy === 'desktop' ? ' --preset=desktop' : '';
  const cmd = `npx -y lighthouse@12.2.0 ${url} --quiet --chrome-flags=\"--headless=new --no-sandbox\" --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=\"${outFile}\"${presetArg}`;
  execSync(cmd, { stdio: 'pipe' });
};

const getScore = (val) => (typeof val === 'number' ? Math.round(val * 100) : null);

const summary = [];

for (let i = 0; i < urls.length; i += 1) {
  const url = urls[i];
  const slug = routes[i] === '/' ? 'home' : routes[i].replace(/\//g, '_').replace(/^_+/, '');
  const outFile = path.join(outputDir, `${slug}.json`);

  console.log(`[${i + 1}/${urls.length}] Audit: ${url}`);
  runLighthouse(url, outFile);

  const data = JSON.parse(fs.readFileSync(outFile, 'utf8'));
  const cats = data.categories || {};
  const audits = data.audits || {};

  summary.push({
    route: routes[i],
    url,
    performance: getScore(cats.performance?.score),
    accessibility: getScore(cats.accessibility?.score),
    bestPractices: getScore(cats['best-practices']?.score),
    seo: getScore(cats.seo?.score),
    fcp: audits['first-contentful-paint']?.displayValue || null,
    lcp: audits['largest-contentful-paint']?.displayValue || null,
    cls: audits['cumulative-layout-shift']?.displayValue || null,
    tbt: audits['total-blocking-time']?.displayValue || null,
  });
}

const summaryPath = path.join(outputDir, 'summary.json');
fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2), 'utf8');

const avg = (key) => Math.round(summary.reduce((acc, row) => acc + (row[key] || 0), 0) / summary.length);
const markdown = [
  `# Lighthouse ${strategy.toUpperCase()} Özeti`,
  '',
  `Toplam URL: ${summary.length}`,
  `Ortalama Performance: ${avg('performance')}`,
  `Ortalama Accessibility: ${avg('accessibility')}`,
  `Ortalama Best Practices: ${avg('bestPractices')}`,
  `Ortalama SEO: ${avg('seo')}`,
  '',
  '| Route | Perf | Acc | BP | SEO | LCP | CLS | TBT |',
  '|---|---:|---:|---:|---:|---|---|---|',
  ...summary.map((row) => `| ${row.route} | ${row.performance} | ${row.accessibility} | ${row.bestPractices} | ${row.seo} | ${row.lcp || '-'} | ${row.cls || '-'} | ${row.tbt || '-'} |`),
  '',
].join('\n');

const markdownPath = path.join(outputDir, 'summary.md');
fs.writeFileSync(markdownPath, markdown, 'utf8');

console.log(`Tamamlandı: ${summaryPath}`);
console.log(`Tamamlandı: ${markdownPath}`);
