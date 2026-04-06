const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, 'app');
const langDir = path.join(appDir, '[lang]');

if (!fs.existsSync(langDir)) {
  fs.mkdirSync(langDir);
}

const excludes = ['api', 'favicon.ico', 'global-error.js', 'globals.css', '[lang]'];

const items = fs.readdirSync(appDir);
for (const item of items) {
  if (!excludes.includes(item)) {
    const src = path.join(appDir, item);
    const dest = path.join(langDir, item);
    fs.renameSync(src, dest);
    console.log(`Moved ${item} to [lang]/`);
  }
}
console.log('Done moving files.');
