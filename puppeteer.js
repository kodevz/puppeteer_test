const puppeteer = require('puppeteer');


async function run () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/hisense-50a7300ftuk-50-smart-4k-ultra-hd-hdr-led-tv-10207138-pdt.html');
    await page.screenshot({path: 'screenshot.png'});
    browser.close();
}
run();