// renders a branded 1200x630 Open Graph card to public/og.png
import { chromium } from 'playwright';

const OUT = new URL('../public/og.png', import.meta.url).pathname;
const AVATAR =
	'https://gravatar.com/avatar/0a21a5244a8953b2afe451dbf2978755b27aab8b84a80400e551775dd456327b?s=320&d=identicon';

const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@600&display=swap" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#0a1400;color:#fff;font-family:'Space Grotesk',sans-serif;overflow:hidden;position:relative}
  .blob{position:absolute;border-radius:9999px;filter:blur(90px);opacity:.55}
  .b1{width:620px;height:620px;background:radial-gradient(circle,#a2f213,transparent 65%);top:-180px;left:-120px}
  .b2{width:540px;height:540px;background:radial-gradient(circle,#497800,transparent 65%);bottom:-200px;right:-120px}
  .wrap{position:relative;height:100%;padding:76px 84px;display:flex;flex-direction:column;justify-content:center}
  .top{display:flex;align-items:center;gap:20px;margin-bottom:26px}
  .av{width:96px;height:96px;border-radius:9999px;border:3px solid #a2f213;box-shadow:0 0 40px #497800}
  .handle{font-family:'JetBrains Mono',monospace;font-size:26px;color:#bcff43;font-weight:600}
  h1{font-size:88px;font-weight:700;line-height:1;letter-spacing:-2px;background:linear-gradient(100deg,#bcff43,#83d000);-webkit-background-clip:text;background-clip:text;color:transparent}
  .tag{font-size:30px;color:#cbd5c0;margin-top:22px;font-weight:500}
  .mission{font-size:24px;color:#a2f213;margin-top:14px}
  .stats{display:flex;gap:34px;margin-top:40px;font-family:'JetBrains Mono',monospace;font-size:24px;color:#e6ffcf}
  .stats b{color:#bcff43}
  .url{position:absolute;bottom:44px;right:84px;font-family:'JetBrains Mono',monospace;font-size:22px;color:#83d000}
</style></head>
<body>
  <div class="blob b1"></div><div class="blob b2"></div>
  <div class="wrap">
    <div class="top"><img class="av" src="${AVATAR}"><span class="handle">gmitch215</span></div>
    <h1>Gregory Mitchell</h1>
    <div class="tag">Fullstack Software Engineer, Game Developer</div>
    <div class="mission">Building software so people feel a little less alone.</div>
    <div class="stats"><span><b>11,491</b> commits</span><span><b>88</b>&#9733; top library</span><span><b>10+</b> languages</span></div>
  </div>
  <div class="url">gmitch215.dev</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({
	viewport: { width: 1200, height: 630 },
	deviceScaleFactor: 1
});
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);
await page.screenshot({ path: OUT });
await browser.close();
console.log('wrote', OUT);
