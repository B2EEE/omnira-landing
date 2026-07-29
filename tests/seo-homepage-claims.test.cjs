const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const html = read('index.html');

const componentPaths = [...html.matchAll(/<script[^>]+src="\/?(components\/[^"?]+\.jsx)"/g)]
  .map((match) => match[1]);
assert.ok(componentPaths.length >= 10, `Composants de la home incomplets: ${componentPaths.length}`);
for (const required of [
  'components/nav-hero.jsx',
  'components/demo-features.jsx',
  'components/scenarios-process.jsx',
  'components/roi-social.jsx',
  'components/pricing-bottom.jsx',
  'components/app.jsx',
]) {
  assert.ok(componentPaths.includes(required), `Composant non audité: ${required}`);
}

const componentSources = componentPaths.map((relative) => read(relative));
const homepageSources = [html, ...componentSources].join('\n');
const sourceByPath = Object.fromEntries(componentPaths.map((relative, index) => [relative, componentSources[index]]));
const navHero = sourceByPath['components/nav-hero.jsx'];
const demos = sourceByPath['components/demo-features.jsx'];
const dashboard = sourceByPath['components/scenarios-process.jsx'];

const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
const description = html.match(/<meta name="description" content="([^"]+)"\/>/)?.[1];
assert.equal(title, 'Agent vocal IA pour PME : appels entrants | Omnira');
assert.ok(title.length >= 40 && title.length <= 60, `Title: ${title.length} caractères`);
assert.ok(description);
assert.ok(description.length >= 140 && description.length <= 165, `Description: ${description.length} caractères`);
assert.match(html, /<link rel="canonical" href="https:\/\/omniragency\.com\/"\/>/);
for (const attribute of ['property="og:title"', 'name="twitter:title"']) {
  assert.ok(html.includes(`<meta ${attribute} content="${title}"/>`));
}
const socialDescription = 'Qualifiez les appels entrants, préparez la suite et transmettez un résumé à votre équipe selon vos règles métier.';
for (const attribute of ['property="og:description"', 'name="twitter:description"']) {
  assert.ok(html.includes(`<meta ${attribute} content="${socialDescription}"/>`));
}

const fallback = html.match(/<div id="root">([\s\S]*?)<!-- Components loaded/)?.[1];
assert.ok(fallback, 'Fallback statique absent');
assert.equal((fallback.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1, 'Le fallback doit contenir un H1');
assert.match(fallback, /<h1>Agent vocal IA pour PME : qualifiez vos appels avant de solliciter votre équipe<\/h1>/);
assert.equal(
  componentSources.reduce((count, source) => count + (source.match(/<h1(?:\s[^>]*)?>/g) || []).length, 0),
  1,
  'Les composants montés doivent contenir un seul H1',
);

const jsonLdRaw = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)?.[1];
assert.ok(jsonLdRaw, 'JSON-LD absent');
const jsonLd = JSON.parse(jsonLdRaw);
assert.equal(jsonLd['@type'], 'ProfessionalService');
assert.equal(jsonLd.url, 'https://omniragency.com');
assert.equal(jsonLd.offers?.['@type'], 'Offer');

assert.ok(navHero.includes('Agent Omnira · Exemple illustratif'));
assert.ok(navHero.includes('Horaires définis par la PME'));
assert.ok(demos.includes('Ces démonstrations montrent le comportement attendu dans un cadre défini.'));
assert.ok(demos.includes('Elles ne présentent pas des appels ou résultats clients.'));
assert.ok(demos.includes("En cas d'urgence médicale, n'attendez pas un transfert"));
assert.ok(demos.includes('vérification humaine requise'));

const dashboardNotice = dashboard.indexOf('Exemple fictif — aucun résultat client');
const dashboardFirstMetric = dashboard.indexOf("{v:'186'");
assert.ok(dashboardNotice >= 0 && dashboardFirstMetric > dashboardNotice);
assert.ok(dashboardFirstMetric - dashboardNotice < 1200, 'Le libellé fictif doit rester proche des chiffres');
assert.ok(dashboard.includes('Tableau de bord illustratif'));
assert.ok(dashboard.includes('Données fictives'));
assert.ok(dashboard.includes("Il ne modélise ni la mise en place d'Omnira, ni un taux de récupération réel, ni un résultat commercial."));

for (const unsupported of [
  /en moins de [0-9]+ (?:minute|seconde)s?/i,
  /réponse en (?:&lt;|<)?\s*[0-9.,]+\s*(?:s|seconde)/i,
  /zéro appel (?:manqué|perdu)/i,
  /répond à tous vos appels/i,
  /agent actif 24\/7/i,
  /ne ratez plus/i,
  /ne manquez plus/i,
  /transforme (?:vos|les) appels/i,
  /chaque appel devient/i,
  /prospects? manqués? ne rappellent jamais/i,
  /en situation réelle/i,
  /résumés automatiques/i,
  /action exécutée/i,
  /réponse sous 24h/i,
  /sans engagement/i,
  /pas de prérequis technique/i,
  /CA potentiel récupérable/i,
  /temps économisé/i,
  /transfert effectué/i,
  /gère tout le parcours/i,
]) {
  assert.ok(!unsupported.test(homepageSources), `Promesse non qualifiée détectée: ${unsupported}`);
}

console.log('SEO homepage claims: OK');
