const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pagePath = path.join(__dirname, '..', 'agent-vocal-ia-immobilier.html');
const html = fs.readFileSync(pagePath, 'utf8');
const fallback = html.match(/<div id="root">([\s\S]*?)<script type="text\/babel" src=/)?.[1];
const jsx = html.slice(html.indexOf('<script type="text/babel">'));
assert.ok(fallback, 'Pré-rendu statique introuvable');
assert.ok(jsx, 'Rendu React introuvable');

const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
assert.equal(title, 'Agent vocal IA immobilier pour agences | Omnira');
assert.ok(title.length >= 40 && title.length <= 60, 'Le title doit rester entre 40 et 60 caractères');

const description = html.match(/<meta name="description" content="([^"]+)"\/>/)?.[1];
assert.ok(description, 'Meta description manquante');
assert.ok(description.length >= 140 && description.length <= 165, 'La meta description doit rester entre 140 et 165 caractères');

assert.match(html, /<link rel="canonical" href="https:\/\/omniragency\.com\/agent-vocal-ia-immobilier"\/>/);
assert.equal((fallback.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1, 'Le pré-rendu doit contenir un seul H1');
assert.match(fallback, /<h1>Agent vocal IA pour agence immobilière<\/h1>/);
assert.equal((jsx.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1, 'Le rendu React doit contenir un seul H1');
assert.match(jsx, /Agent vocal IA pour<br\/>[\s\S]*agences immobilières/);

const jsonLdRaw = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)?.[1];
assert.ok(jsonLdRaw, 'JSON-LD manquant');
const jsonLd = JSON.parse(jsonLdRaw);
assert.ok(Array.isArray(jsonLd['@graph']), 'Le graphe JSON-LD doit être un tableau');
const graphTypes = new Set(jsonLd['@graph'].map(node => node['@type']));
for (const type of ['Organization', 'Service', 'BreadcrumbList', 'FAQPage']) {
  assert.ok(graphTypes.has(type), `Type JSON-LD manquant : ${type}`);
}
assert.equal(jsonLd['@graph'].filter(node => node['@type'] === 'Organization').length, 1);
const service = jsonLd['@graph'].find(node => node['@type'] === 'Service');
assert.equal(service.url, 'https://omniragency.com/agent-vocal-ia-immobilier');
assert.equal(service.provider?.['@id'], 'https://omniragency.com/#organization');

const faq = jsonLd['@graph'].find(node => node['@type'] === 'FAQPage');
assert.equal(faq.mainEntity.length, 7, 'Les sept FAQ visibles et structurées doivent rester alignées');
const fallbackFaq = fallback.match(/<section>\s*<h2>Questions fréquentes sur l'agent vocal IA immobilier<\/h2>[\s\S]*?<\/section>/)?.[0];
const fallbackScenarios = fallback.match(/<section>\s*<h2>Trois scénarios immobiliers à cadrer avant la mise en service<\/h2>[\s\S]*?<\/section>/)?.[0];
assert.ok(fallbackFaq, 'La section FAQ doit être visible sans JavaScript');
assert.equal((fallbackFaq.match(/<h3>/g) || []).length, 7, 'Les sept FAQ doivent être visibles sans JavaScript');
assert.ok(fallbackScenarios, 'La section scénarios doit être visible sans JavaScript');
assert.equal((fallbackScenarios.match(/<h3>/g) || []).length, 3, 'Les trois scénarios doivent être visibles sans JavaScript');
for (const item of faq.mainEntity) {
  assert.equal(item['@type'], 'Question');
  assert.equal(item.acceptedAnswer?.['@type'], 'Answer');
  assert.ok(fallbackFaq.includes(item.name), `La question FAQ doit être présente dans la section pré-rendue : ${item.name}`);
  assert.ok(fallbackFaq.includes(item.acceptedAnswer.text), `La réponse FAQ doit être présente dans la section pré-rendue : ${item.name}`);
  assert.ok(jsx.includes(item.name), `La question FAQ doit être présente dans le rendu React : ${item.name}`);
  assert.ok(jsx.includes(item.acceptedAnswer.text), `La réponse FAQ doit être présente dans le rendu React : ${item.name}`);
}

for (const href of ['/devis', '/demo', '/prendre-rendez-vous', '/agent-vocal-ia-courtier', '/agent-vocal-ia-assurance', '/confidentialite']) {
  assert.ok(fallback.includes(`href="${href}"`), `Lien interne manquant dans le pré-rendu : ${href}`);
  assert.ok(jsx.includes(`href="${href}"`), `Lien interne manquant dans le rendu React : ${href}`);
}
assert.ok(fallback.includes("Comment fonctionne l'agent vocal pour une agence immobilière ?"));
assert.ok(jsx.includes("Comment fonctionne l'agent vocal pour une agence immobilière ?"));
assert.match(fallback, /aria-label="Fil d’Ariane"/);
assert.match(jsx, /aria-label="Fil d’Ariane"/);
assert.match(fallback, /Trois scénarios immobiliers à cadrer avant la mise en service/);
assert.match(jsx, /Trois scénarios à cadrer avant la mise en service/);
assert.match(fallback, /Limiter les questions aux informations nécessaires au motif traité/);
assert.match(jsx, /Limiter les questions aux informations nécessaires au motif traité/);

const breadcrumb = jsonLd['@graph'].find(node => node['@type'] === 'BreadcrumbList');
assert.ok(breadcrumb, 'Le fil d’Ariane structuré doit exister');
assert.ok(Array.isArray(breadcrumb.itemListElement), 'Les éléments du fil d’Ariane doivent former une liste');
assert.equal(breadcrumb.itemListElement.length, 2);
assert.deepEqual(breadcrumb.itemListElement.map(item => [item['@type'], item.position]), [['ListItem', 1], ['ListItem', 2]]);
assert.equal(breadcrumb.itemListElement[1].item, 'https://omniragency.com/agent-vocal-ia-immobilier');

for (const unsupported of [
  /en moins de [0-9]+ (?:minute|seconde)s?/i,
  /zéro appel perdu/i,
  /répond à tous vos appels/i,
  /chaque appel aboutit/i,
  /vrais prospects/i,
  /tout est structuré/i,
  /la fiche est prête/i,
]) {
  assert.ok(!unsupported.test(html), `Promesse non sourcée détectée : ${unsupported}`);
}

console.log('SEO immobilier: OK');
