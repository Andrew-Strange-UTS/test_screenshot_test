const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function takeScreenshot(driver, imageName) {
  // Ensure screenshots directory exists
  fs.mkdirSync('screenshots', { recursive: true });
  // Take screenshot
  const image = await driver.takeScreenshot();
  // Write file
  const outfile = path.join('screenshots', imageName);
  fs.writeFileSync(outfile, image, 'base64');
  console.log(`Screenshot saved: ${outfile}`);
}

(async function run() {
  const options = new chrome.Options()
    .addArguments(
      '--headless=new',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-user-data-'))}`
    );
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get('https://www.uts.edu.au');
    await takeScreenshot(driver, 'uts1.png');
  } finally {
    await driver.quit();
  }
})();
