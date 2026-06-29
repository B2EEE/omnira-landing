const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach(entry => {
    const s = path.join(src, entry);
    const d = path.join(dest, entry);
    fs.statSync(s).isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  });
}

if (!fs.existsSync('public_html')) fs.mkdirSync('public_html');

['index.html', 'devis.html', 'demo.html', 'prendre-rendez-vous.html',
 'agent-vocal-ia-garage.html', 'mentions-legales.html', 'confidentialite.html', 'cgu.html',
 'robots.txt', 'sitemap.xml', '.htaccess', 'favicon.svg'].forEach(f => {
  if (fs.existsSync(f)) fs.copyFileSync(f, path.join('public_html', f));
});

['components', 'uploads', 'receptionniste-ia-garage'].forEach(dir => {
  if (fs.existsSync(dir)) copyDir(dir, path.join('public_html', dir));
});

console.log('Build OK — static files copied to public_html/');
