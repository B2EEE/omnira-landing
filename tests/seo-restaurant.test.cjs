const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const pagePath = path.join(root, 'agent-vocal-ia-restaurant.html');
const html = fs.readFileSync(pagePath, 'utf8');

const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
assert.equal(title, 'Agent vocal IA pour restaurant et réservations | Omnira');
assert.ok(title.length >= 40 && title.length <= 60, `Title: ${title.length} caractères`);
const description = html.match(/<meta name="description" content="([^"]+)"\/>/)?.[1];
assert.ok(description && description.length >= 140 && description.length <= 165, `Description: ${description?.length} caractères`);
assert.match(html, /<link rel="canonical" href="https:\/\/omniragency\.com\/agent-vocal-ia-restaurant"\/>/);
assert.equal((html.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1, 'La page doit contenir un H1 unique');
assert.match(html, /<h1>Agent vocal IA pour <span class="accent">restaurant<\/span><\/h1>/);
assert.match(html, /<html lang="fr">/);
assert.match(html, /<a class="skip-link" href="#contenu">/);
assert.match(html, /<main id="contenu">/);

const jsonLdRaw = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)?.[1];
assert.ok(jsonLdRaw, 'JSON-LD introuvable');
const jsonLd = JSON.parse(jsonLdRaw);
assert.ok(Array.isArray(jsonLd['@graph']));
const graphTypes = new Set(jsonLd['@graph'].map(node => node['@type']));
for (const type of ['Organization', 'Service', 'BreadcrumbList', 'FAQPage']) {
  assert.ok(graphTypes.has(type), `Type JSON-LD manquant : ${type}`);
}
const service = jsonLd['@graph'].find(node => node['@type'] === 'Service');
assert.equal(service.url, 'https://omniragency.com/agent-vocal-ia-restaurant');
assert.equal(service.provider?.['@id'], 'https://omniragency.com/#organization');
const breadcrumb = jsonLd['@graph'].find(node => node['@type'] === 'BreadcrumbList');
assert.equal(breadcrumb.itemListElement.length, 2);
assert.equal(breadcrumb.itemListElement[1].item, service.url);
const faq = jsonLd['@graph'].find(node => node['@type'] === 'FAQPage');
assert.equal(faq.mainEntity.length, 7);
for (const item of faq.mainEntity) {
  assert.ok(html.includes(`<h3>${item.name}</h3>`), `Question visible absente : ${item.name}`);
  assert.ok(html.includes(`<p>${item.acceptedAnswer.text}</p>`), `Réponse visible absente : ${item.name}`);
}

for (const marker of [
  /s’identifie comme un système d’intelligence artificielle/,
  /réservation ordinaire/i,
  /groupe ou demande particulière/i,
  /allergène ou risque signalé/i,
  /retards/i,
  /annulations et modifications/i,
  /environnement bruyant/i,
  /transfert humain/i,
  /Uniquement les données utiles à la demande/,
]) assert.match(html, marker);

for (const href of ['/devis', '/demo', '/prendre-rendez-vous', '/agent-vocal-ia-garage', '/agent-vocal-ia-immobilier', '/agent-vocal-ia-assurance', '/confidentialite']) {
  assert.ok(html.includes(`href="${href}"`), `Lien interne manquant : ${href}`);
}

for (const unsupported of [
  /24h\/24/,
  /sans temps d'attente/i,
  /aucun appel ne tombe/i,
  /répond instantanément/i,
  /réservation garantie/i,
  /table garantie/i,
  /zéro allergène/i,
  /conforme (?:aux|au) (?:obligations )?(?:RGPD|AI Act)/i,
  /résultat garanti/i,
]) assert.ok(!unsupported.test(html), `Promesse non soutenue : ${unsupported}`);

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
assert.ok(sitemap.includes('<loc>https://omniragency.com/agent-vocal-ia-restaurant</loc>'));
const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const forWho = fs.readFileSync(path.join(root, 'components', 'for-who.jsx'), 'utf8');
const footer = fs.readFileSync(path.join(root, 'components', 'pricing-bottom.jsx'), 'utf8');
for (const source of [homepage, forWho, footer]) {
  assert.ok(source.includes('/agent-vocal-ia-restaurant'), 'Lien entrant restaurant manquant');
}
const build = fs.readFileSync(path.join(root, 'build.cjs'), 'utf8');
assert.ok(build.includes("'agent-vocal-ia-restaurant.html'"), 'Page absente du build');

console.log('SEO restaurant: OK');
