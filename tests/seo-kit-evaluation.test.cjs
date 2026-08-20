const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const route = '/ressources/kit-evaluation-agent-vocal-ia/';
const dir = path.join(root, 'ressources', 'kit-evaluation-agent-vocal-ia');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

test('la page du kit expose des métadonnées et une structure SEO cohérentes', () => {
  assert.match(html, /<html lang="fr">/);
  assert.match(html, /<title>Kit d’évaluation d’un agent vocal IA \| Omnira<\/title>/);
  assert.match(html, new RegExp(`<link rel="canonical" href="https://omniragency\\.com${route}">`));
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /<h1>Kit d’évaluation d’un agent vocal IA<\/h1>/);
  assert.doesNotMatch(html, /<meta[^>]+noindex/i);
});

test('le JSON-LD visible est parseable et concorde avec la page', () => {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(blocks.length, 1);
  const data = JSON.parse(blocks[0][1]);
  const page = data['@graph'].find(node => node['@type'] === 'WebPage');
  const breadcrumb = data['@graph'].find(node => node['@type'] === 'BreadcrumbList');
  assert.equal(page.url, `https://omniragency.com${route}`);
  assert.equal(page.name, 'Kit d’évaluation d’un agent vocal IA');
  assert.equal(page.dateModified, '2026-08-20');
  assert.match(html, /mise à jour le 20 août 2026/);
  assert.equal(breadcrumb.itemListElement.at(-1).item, page.url);
});

test('les trois téléchargements existent et sont reliés depuis la page', () => {
  for (const file of [
    'grille-evaluation-agent-vocal-ia.csv',
    'scenarios-tests-agent-vocal-ia.csv',
    'diagramme-parcours-agent-vocal-ia.svg',
  ]) {
    assert.ok(fs.statSync(path.join(dir, file)).size > 100, `${file} est vide ou absent`);
    assert.match(html, new RegExp(`href="${file}"`));
  }
  const scenarios = fs.readFileSync(path.join(dir, 'scenarios-tests-agent-vocal-ia.csv'), 'utf8').trim().split('\n');
  assert.equal(scenarios.length - 1, 12);
});

test('la route est découvrable dans le sitemap et le footer commun', () => {
  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const footer = fs.readFileSync(path.join(root, 'components', 'pricing-bottom.jsx'), 'utf8');
  assert.match(sitemap, new RegExp(`<loc>https://omniragency\\.com${route}<\/loc>`));
  assert.match(sitemap, new RegExp(`<loc>https://omniragency\\.com${route}<\/loc><lastmod>2026-08-20<\/lastmod>`));
  assert.ok(footer.includes(`["Kit d'évaluation",'${route}']`));
});

test('la ressource évite les promesses de performance et documente ses limites', () => {
  assert.match(html, /ne prouvent aucune performance/);
  assert.match(html, /Aucune mesure comparative/);
  assert.match(html, /Indexation effective inconnue/);
  const visibleText = html.replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<script[\s\S]*?<\/script>/g, '');
  assert.doesNotMatch(visibleText, /résultat garanti|multipliez votre|ROI garanti/i);
});