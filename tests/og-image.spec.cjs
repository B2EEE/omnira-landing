const assert = require('assert');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const imagePath = path.join(projectRoot, 'uploads', 'omnira-og-image.png');

assert.ok(fs.existsSync(imagePath), "L'image Open Graph référencée doit exister dans uploads/.");
const png = fs.readFileSync(imagePath);
assert.strictEqual(png.toString('ascii', 1, 4), 'PNG', 'Le visuel Open Graph doit être un PNG.');
assert.strictEqual(png.readUInt32BE(16), 1200, 'La largeur Open Graph doit être de 1200 px.');
assert.strictEqual(png.readUInt32BE(20), 630, 'La hauteur Open Graph doit être de 630 px.');

for (const relative of ['index.html', 'receptionniste-ia-garage/index.html']) {
  const html = fs.readFileSync(path.join(projectRoot, relative), 'utf8');
  assert.match(html, /<meta property="og:image" content="https:\/\/omniragency\.com\/uploads\/omnira-og-image\.png"\s*\/?>/);
  assert.match(html, /<meta name="twitter:image" content="https:\/\/omniragency\.com\/uploads\/omnira-og-image\.png"\s*\/?>/);
}

console.log('PASS og-image');
