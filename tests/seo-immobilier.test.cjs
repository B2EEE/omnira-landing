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
assert.ok(faq.mainEntity.length >= 4, 'Au moins quatre FAQ structurées sont attendues');
assert.ok((fallback.match(/<h3>/g) || []).length >= 4, 'Au moins quatre FAQ doivent être visibles sans JavaScript');
for (const item of faq.mainEntity) {
  assert.equal(item['@type'], 'Question');
  assert.equal(item.acceptedAnswer?.['@type'], 'Answer');
  assert.ok(jsx.includes(item.acceptedAnswer.text), `La réponse FAQ doit être présente dans le rendu React : ${item.name}`);
}

for (const href of ['/devis', '/demo', '/prendre-rendez-vous', '/agent-vocal-ia-courtier', '/agent-vocal-ia-assurance']) {
  assert.ok(fallback.includes(`href="${href}"`), `Lien interne manquant dans le pré-rendu : ${href}`);
  assert.ok(jsx.includes(`href="${href}"`), `Lien interne manquant dans le rendu React : ${href}`);
}
assert.ok(fallback.includes("Comment fonctionne l'agent vocal pour une agence immobilière ?"));
assert.ok(jsx.includes("Comment fonctionne l'agent vocal pour une agence immobilière ?"));

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
