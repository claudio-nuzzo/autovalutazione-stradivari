const { chromium } = require('playwright');
const fs = require('node:fs');

function launchBrowser() {
  const configured = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const executablePath = configured || (process.platform === 'darwin' && fs.existsSync(macChrome) ? macChrome : undefined);
  return chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
}

module.exports = { launchBrowser };
