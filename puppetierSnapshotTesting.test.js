const puppeteer = require('puppeteer');
  const { toMatchImageSnapshot } = require('jest-image-snapshot');
  expect.extend({ toMatchImageSnapshot });

  jest.setTimeout(30000);



describe('jest-image-snapshot usage with an image received from puppeteer', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it('works', async () => {
    const page = await browser.newPage();
    await page.goto('http://ahmed-badawy.com/cv/');
    await new Promise(resolve=>setTimeout(resolve,5000));

    const image = await page.screenshot();

    const customConfig = { threshold: .1 };
    expect(image).toMatchImageSnapshot({
      customDiffConfig: customConfig,
      customSnapshotIdentifier: 'customSnapshotName',
      noColors: true
    });

  });

  afterAll(async () => {
    await browser.close();
  });
});