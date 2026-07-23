const assert = require('assert');
const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('/opt/hermes/node_modules/playwright');

const projectRoot = path.resolve(__dirname, '..');
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/plain; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  const file = path.resolve(projectRoot, relative);
  if (!file.startsWith(projectRoot + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404).end('Not found');
    return;
  }
  res.setHeader('Content-Type', contentTypes[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  let browser;

  try {
    browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/google-chrome' });
    // Simulate the interval after HTML parsing but before external React/Babel code is ready.
    const bootContext = await browser.newContext();
    const bootPage = await bootContext.newPage();
    await bootPage.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.hostname === '127.0.0.1' && !url.pathname.startsWith('/components/')) return route.continue();
      return route.abort();
    });
    await bootPage.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });

    assert.strictEqual(
      await bootPage.locator('#root h1').isVisible(),
      false,
      'Le contenu SEO brut ne doit pas être visible pendant le démarrage JavaScript.'
    );
    assert.strictEqual(
      await bootPage.locator('#app-loading-indicator').isVisible(),
      true,
      "Un écran d'attente Omnira doit remplacer le contenu SEO brut pendant le démarrage."
    );
    await bootContext.close();

    // Once React has mounted, the loader disappears and the real interface is visible.
    const appContext = await browser.newContext();
    const appPage = await appContext.newPage();
    const pageErrors = [];
    appPage.on('pageerror', error => pageErrors.push(error.message));
    await appPage.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
    await appPage.waitForFunction(() => !document.documentElement.classList.contains('js-loading'), null, { timeout: 15000 });
    assert.strictEqual(await appPage.locator('#app-loading-indicator').isVisible(), false);
    assert.strictEqual(await appPage.locator('#root > div').isVisible(), true);
    assert.deepStrictEqual(pageErrors, [], `Erreurs JavaScript: ${pageErrors.join(' | ')}`);
    await appContext.close();

    // Progressive enhancement: without JavaScript, the crawlable fallback remains available.
    const noJsContext = await browser.newContext({ javaScriptEnabled: false });
    const noJsPage = await noJsContext.newPage();
    await noJsPage.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' });
    assert.strictEqual(
      await noJsPage.locator('#root h1').isVisible(),
      true,
      'Le contenu statique doit rester visible lorsque JavaScript est désactivé.'
    );
    await noJsContext.close();

    console.log('PASS loading-fallback');
  } finally {
    if (browser) await browser.close();
    server.close();
  }
})().catch(error => {
  console.error(error.stack || error);
  process.exitCode = 1;
});
