// renders the /cv route to a print-clean PDF in public/.
// usage: build + serve the site, then `node scripts/generate-pdf.mjs`
// (respects the @media print rules in main.css: nav, footer and .no-print are hidden)
import { chromium } from 'playwright';

const CV_URL = process.env.CV_URL || 'http://localhost:4321/cv';
const OUT = new URL('../public/gregory-mitchell-cv.pdf', import.meta.url).pathname;

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(CV_URL, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.pdf({
	path: OUT,
	format: 'A4',
	printBackground: false,
	margin: { top: '0.6in', bottom: '0.6in', left: '0.7in', right: '0.7in' }
});
await browser.close();
console.log('wrote', OUT);
