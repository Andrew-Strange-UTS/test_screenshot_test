const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const os = require('os');

async function takeScreenshot(driver, imageName) {
  fs.mkdirSync('screenshots', { recursive: true });
  const image = await driver.takeScreenshot();
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
    await driver.get('https://cb2lockersci.uts.edu.au');
    
    await driver.sleep(10000);
    //await driver.wait(until.elementIsVisible(driver.findElement(By.id('loginButton'))),10000);
    await takeScreenshot(driver, 'lockerslogin.png');
  } finally {
    await driver.quit();
  }
})();
