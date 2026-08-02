const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pagePath = path.join(__dirname, '..', 'agent-vocal-ia-assurance.html');
const html = fs.readFileSync(pagePath, 'utf8');
const fallback = html.match(/<div id="root">([\s\S]*?)<script type="text\/babel" src=/)?.[1];
const jsxStart = html.indexOf('<script type="text/babel">');
assert.ok(fallback, 'Pré-rendu statique introuvable');
assert.notEqual(jsxStart, -1, 'Rendu React introuvable');
const jsx = html.slice(jsxStart);

const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
assert.equal(title, 'Agent vocal IA pour assurance et mutuelle | Omnira');
assert.ok(title.length >= 40 && title.length <= 60);
const description = html.match(/<meta name="description" content="([^"]+)"\/>/)?.[1];
assert.ok(description && description.length >= 140 && description.length <= 165);
assert.match(html, /<link rel="canonical" href="https:\/\/omniragency\.com\/agent-vocal-ia-assurance"\/>/);
assert.equal((fallback.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1);
assert.match(fallback, /<h1>Agent vocal IA pour assurance et mutuelle<\/h1>/);
assert.equal((jsx.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1);
assert.match(jsx, /Agent vocal IA pour<br\/>[\s\S]*assurance et mutuelle/);

const jsonLdRaw = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)?.[1];
assert.ok(jsonLdRaw);
const jsonLd = JSON.parse(jsonLdRaw);
assert.ok(Array.isArray(jsonLd['@graph']));
const graphTypes = new Set(jsonLd['@graph'].map(node => node['@type']));
for (const type of ['Organization', 'Service', 'BreadcrumbList', 'FAQPage']) assert.ok(graphTypes.has(type), `Type JSON-LD manquant : ${type}`);
const service = jsonLd['@graph'].find(node => node['@type'] === 'Service');
assert.equal(service.url, 'https://omniragency.com/agent-vocal-ia-assurance');
assert.equal(service.provider?.['@id'], 'https://omniragency.com/#organization');
const faq = jsonLd['@graph'].find(node => node['@type'] === 'FAQPage');
assert.equal(faq.mainEntity.length, 7);
const fallbackFaq = fallback.match(/<section>\s*<h2>Questions fréquentes sur l'agent vocal IA en assurance<\/h2>[\s\S]*?<\/section>/)?.[0];
const fallbackScenarios = fallback.match(/<section>\s*<h2>Trois scénarios d'assurance à cadrer avant la mise en service<\/h2>[\s\S]*?<\/section>/)?.[0];
assert.ok(fallbackFaq);
assert.equal((fallbackFaq.match(/<h3>/g) || []).length, 7);
assert.ok(fallbackScenarios);
assert.equal((fallbackScenarios.match(/<h3>/g) || []).length, 3);
for (const item of faq.mainEntity) {
  assert.ok(fallbackFaq.includes(item.name));
  assert.ok(fallbackFaq.includes(item.acceptedAnswer.text));
  assert.ok(jsx.includes(item.name));
  assert.ok(jsx.includes(item.acceptedAnswer.text));
}

for (const href of ['/devis', '/demo', '/prendre-rendez-vous', '/agent-vocal-ia-courtier', '/agent-vocal-ia-immobilier', '/confidentialite']) {
  assert.ok(fallback.includes(`href="${href}"`), `Lien fallback manquant : ${href}`);
  assert.ok(jsx.includes(`href="${href}"`), `Lien JSX manquant : ${href}`);
}
assert.match(fallback, /aria-label="Fil d’Ariane"/);
assert.match(jsx, /aria-label="Fil d’Ariane"/);
for (const marker of [
  /s'identifie comme un système d'intelligence artificielle/,
  /Limiter la collecte aux informations nécessaires/,
  /données de santé/,
  /exprime un mécontentement/,
  /ne décide pas seul de l'assurabilité/,
  /transfert humain/,
]) {
  assert.match(fallback, marker);
  assert.match(jsx, marker);
}
const breadcrumb = jsonLd['@graph'].find(node => node['@type'] === 'BreadcrumbList');
assert.equal(breadcrumb.itemListElement.length, 2);
assert.equal(breadcrumb.itemListElement[1].item, 'https://omniragency.com/agent-vocal-ia-assurance');

for (const unsupported of [
  /24h\/24/,
  /sans temps d'attente/i,
  /moins de [0-9]+ secondes?/i,
  /temps d'attente réduit à zéro/i,
  /répond instantanément/i,
  /dossier complet/i,
  /toutes les informations/i,
  /10 jours ouvrés/i,
  /5 jours ouvrés/i,
  /2 jours ouvrés/i,
  /conforme (?:aux|au) (?:obligations )?(?:ACPR|RGPD)/i,
  /hébergées en Europe/i,
  /DPA est signé/i,
]) assert.ok(!unsupported.test(html), `Promesse ou règle non soutenue : ${unsupported}`);

console.log('SEO assurance: OK');
