const exec = require('child_process').exec;
const pptr = require('puppeteer-core');

const q = require('./chrome.json');
console.log(JSON.stringify(q, null, 2));

exec(`"${q.executablePath}" --version`, async function(error, stdout, stderr) {
  console.log(error);
  console.log(stdout);
  console.log('--------');
  const browser = await pptr.launch(q);
  console.log(await browser.version());
  await browser.close();
});



