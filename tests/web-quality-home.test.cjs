const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('la home expose les repères clavier et le mouvement réduit', () => {
  const html = read('index.html');
  const app = read('components/app.jsx');

  assert.match(html, /class="skip-link" href="#contenu"/);
  assert.match(html, /prefers-reduced-motion:\s*reduce/);
  assert.match(html, /:focus-visible/);
  assert.match(app, /<main id="contenu">/);
});

test('les hypothèses de simulation ont des labels associés', () => {
  const component = read('components/scenarios-process.jsx');

  assert.match(component, /<label htmlFor=\{inputId\}/);
  assert.match(component, /<input id=\{inputId\} name=\{inputId\} type="range"/);
});

test('la home charge les distributions React de production avec SRI', () => {
  const html = read('index.html');

  assert.match(html, /react@18\.3\.1\/umd\/react\.production\.min\.js" integrity="sha384-[^"]+"/);
  assert.match(html, /react-dom@18\.3\.1\/umd\/react-dom\.production\.min\.js" integrity="sha384-[^"]+"/);
  assert.doesNotMatch(html, /react(?:-dom)?\.development\.js/);
});
