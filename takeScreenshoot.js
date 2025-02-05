const puppeteer = require('puppeteer');

(async () => {
  // const browser = await puppeteer.launch();
	const browser = await puppeteer.launch({headless: false}); // default is true
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'docs/screenshot-example.png'});
  
  await browser.close();
})();