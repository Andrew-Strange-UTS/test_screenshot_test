const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const os = require('os');

(async function run() {
  fs.mkdirSync('screenshots', { recursive: true });

  const options = new chrome.Options()
    .addArguments(
      '--headless=new',  // new headless for modern chrome
      '--no-sandbox',
      '--disable-dev-shm-usage',
      `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-user-data-'))}`
    );

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  try {
    await driver.get('https://www.uts.edu.au');
    const image = await driver.takeScreenshot();
    const outfile = path.join('screenshots', 'uts.png');
    fs.writeFileSync(outfile, image, 'base64');
    console.log(`Screenshot saved: ${outfile}`);
  } finally {
    await driver.quit();
  }
})();
