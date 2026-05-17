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

if (!fs.existsSync('dist')) fs.mkdirSync('dist');

['index.html', 'robots.txt', 'sitemap.xml'].forEach(f => {
  if (fs.existsSync(f)) fs.copyFileSync(f, path.join('dist', f));
});

['components', 'uploads'].forEach(dir => {
  if (fs.existsSync(dir)) copyDir(dir, path.join('dist', dir));
});

console.log('Build OK — static files copied to dist/');
