const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const sitemap = read('sitemap.xml');
const footer = read('components/pricing-bottom.jsx');

const routes = [...sitemap.matchAll(/<loc>https:\/\/omniragency\.com(\/[^<]*)?<\/loc>/g)]
  .map(match => match[1] || '/');

test('toutes les URL du sitemap ont un lien entrant HTML dans la navigation commune ou la home', () => {
  const home = read('index.html') + read('components/for-who.jsx');
  for (const route of routes) {
    if (route === '/') continue;
    assert.ok(
      footer.includes(`'${route}'`) || home.includes(`href="${route}"`),
      `URL sans lien entrant vérifié : ${route}`,
    );
  }
});

test('le footer commun expose les cinq pages métier avec des ancres descriptives', () => {
  const expected = new Map([
    ['/agent-vocal-ia-immobilier', 'Agences immobilières'],
    ['/agent-vocal-ia-courtier', 'Courtiers en assurance'],
    ['/agent-vocal-ia-assurance', 'Assurances & mutuelles'],
    ['/agent-vocal-ia-garage', 'Garages & centres auto'],
    ['/agent-vocal-ia-restaurant', 'Restaurants'],
  ]);
  for (const [route, label] of expected) {
    assert.ok(footer.includes(`['${label}','${route}']`), `Lien métier manquant : ${route}`);
  }
});

test('les pages de conversion et de démonstration ont un fil d’Ariane visible et cohérent en JSON-LD', () => {
  const pages = new Map([
    ['demo.html', ['Démonstrations', 'https://omniragency.com/demo']],
    ['devis.html', ['Demander un devis', 'https://omniragency.com/devis']],
    ['prendre-rendez-vous.html', ['Prendre rendez-vous', 'https://omniragency.com/prendre-rendez-vous']],
  ]);
  for (const [file, [label, canonical]] of pages) {
    const html = read(file);
    assert.match(html, /<nav aria-label="Fil d’Ariane"/);
    assert.ok(html.includes(`aria-current="page">${label}</span>`), `${file}: page courante absente`);
    const raw = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)?.[1];
    const data = JSON.parse(raw);
    assert.equal(data['@type'], 'BreadcrumbList');
    assert.equal(data.itemListElement.length, 2);
    assert.equal(data.itemListElement[1].name, label);
    assert.equal(data.itemListElement[1].item, canonical);
  }
});
