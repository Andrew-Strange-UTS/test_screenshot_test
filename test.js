const {Builder} = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

(async function run() {
  // Create the screenshots directory if it doesn't exist
  fs.mkdirSync('screenshots', { recursive: true });

  // Build the browser
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navigate to the site
    await driver.get('https://www.uts.edu.au');

    // Take screenshot
    const image = await driver.takeScreenshot();
    const outfile = path.join('screenshots', 'uts.png');
    fs.writeFileSync(outfile, image, 'base64');
    console.log(`Screenshot saved: ${outfile}`);

  } finally {
    await driver.quit();
  }
})();
