const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const pagePath = path.join(__dirname, '..', 'agent-vocal-ia-garage.html');
const html = fs.readFileSync(pagePath, 'utf8');
const fallback = html.match(/<div id="root">([\s\S]*?)<script type="text\/babel" src=/)?.[1];
const jsxStart = html.indexOf('<script type="text/babel">');
assert.ok(fallback, 'Pré-rendu statique introuvable');
assert.notEqual(jsxStart, -1, 'Rendu React introuvable');
assert.match(html, /<\/main>\s*<\/div>\s*<script type="text\/babel" src="components\/brand\.jsx"><\/script>/, 'Le conteneur React doit être fermé avant les scripts');
const jsx = html.slice(jsxStart);

const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
assert.equal(title, 'Agent vocal IA pour garage et centre auto | Omnira');
assert.ok(title.length >= 40 && title.length <= 60);
const description = html.match(/<meta name="description" content="([^"]+)"\/>/)?.[1];
assert.ok(description && description.length >= 140 && description.length <= 165);
assert.match(html, /<link rel="canonical" href="https:\/\/omniragency\.com\/agent-vocal-ia-garage"\/>/);
assert.equal((fallback.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1);
assert.match(fallback, /<h1>Agent vocal IA pour garage et centre auto<\/h1>/);
assert.equal((jsx.match(/<h1(?:\s[^>]*)?>/g) || []).length, 1);
assert.match(jsx, /Agent vocal IA pour<br\/>[\s\S]*garage et centre auto/);

const jsonLdRaw = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)?.[1];
assert.ok(jsonLdRaw, 'JSON-LD introuvable');
const jsonLd = JSON.parse(jsonLdRaw);
assert.ok(Array.isArray(jsonLd['@graph']));
const graphTypes = new Set(jsonLd['@graph'].map(node => node['@type']));
for (const type of ['Organization', 'Service', 'BreadcrumbList', 'FAQPage']) assert.ok(graphTypes.has(type), `Type JSON-LD manquant : ${type}`);
const service = jsonLd['@graph'].find(node => node['@type'] === 'Service');
assert.equal(service.url, 'https://omniragency.com/agent-vocal-ia-garage');
assert.equal(service.provider?.['@id'], 'https://omniragency.com/#organization');
const faq = jsonLd['@graph'].find(node => node['@type'] === 'FAQPage');
assert.equal(faq.mainEntity.length, 7);
const fallbackFaq = fallback.match(/<section>\s*<h2>Questions fréquentes sur l'agent vocal IA pour garage<\/h2>[\s\S]*?<\/section>/)?.[0];
const fallbackScenarios = fallback.match(/<section>\s*<h2>Trois scénarios à cadrer avec l'atelier<\/h2>[\s\S]*?<\/section>/)?.[0];
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

for (const href of ['/devis', '/demo', '/prendre-rendez-vous', '/agent-vocal-ia-immobilier', '/agent-vocal-ia-assurance', '/confidentialite']) {
  assert.ok(fallback.includes(`href="${href}"`), `Lien fallback manquant : ${href}`);
  assert.ok(jsx.includes(`href="${href}"`), `Lien JSX manquant : ${href}`);
}
assert.match(fallback, /aria-label="Fil d’Ariane"/);
assert.match(jsx, /aria-label="Fil d’Ariane"/);
for (const marker of [
  /s'identifie comme un système d'intelligence artificielle/,
  /immatriculation/,
  /rubrique E/,
  /bruit/,
  /véhicule de courtoisie/,
  /112/,
  /ne pose pas de diagnostic mécanique/,
  /transfert humain/,
  /Limiter la collecte aux informations nécessaires/,
]) {
  assert.match(fallback, marker);
  assert.match(jsx, marker);
}
const breadcrumb = jsonLd['@graph'].find(node => node['@type'] === 'BreadcrumbList');
assert.equal(breadcrumb.itemListElement.length, 2);
assert.equal(breadcrumb.itemListElement[1].item, 'https://omniragency.com/agent-vocal-ia-garage');

for (const unsupported of [
  /24h\/24/,
  /sans temps d'attente/i,
  /aucun appel ne tombe/i,
  /répond instantanément/i,
  /dossier complet/i,
  /diagnostic fiable/i,
  /disponibilité garantie/i,
  /conforme (?:aux|au) (?:obligations )?(?:RGPD|AI Act)/i,
  /sécurité garantie/i,
]) assert.ok(!unsupported.test(html), `Promesse non soutenue : ${unsupported}`);

const css = html.match(/<style>([\s\S]*?)<\/style>/)?.[1] || '';
assert.match(css, /\.nav-hamburger\{display:none\}/, 'Le menu mobile doit être masqué sur desktop');
assert.match(css, /@media\(max-width:820px\)[\s\S]*?\.nav-hamburger\{display:block;/, 'Le menu mobile doit apparaître au breakpoint mobile');
assert.match(css, /nav \.nav-links button\{background:#0b1726!important;border-color:#2fc7d6!important\}/, 'Le CTA de navigation doit garder un fond sombre lisible');
assert.match(css, /footer p\{color:#bac7d4!important;font-size:13px!important\}/, 'Le texte du pied de page doit conserver un contraste et une taille lisibles');
assert.match(css, /footer a\{color:#c9d4df!important;font-size:13px!important\}/, 'Les liens du pied de page doivent conserver un contraste et une taille lisibles');
assert.match(css, /#root>nav a\[href="\/"\]::after\{content:"OMNIRA";/, 'Le nom de marque doit rester lisible dans la navigation');
assert.match(css, /#root>nav a\[href="\/"\] img\{display:none!important\}/, 'Le visuel de marque illisible doit être remplacé uniquement dans la navigation principale');
assert.match(css, /footer \.footer-grid>div:first-child::before\{content:"OMNIRA";/, 'Le nom de marque doit rester lisible dans le pied de page');
assert.match(jsx, /querySelector\('#root>nav a\[href="\/"\]'\)\?\.setAttribute\('aria-label','Omnira — accueil'\)/, 'Le lien d’accueil doit conserver un nom accessible indépendant de la CSS');

console.log('SEO garage: OK');
