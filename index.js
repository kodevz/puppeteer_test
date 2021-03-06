const express = require('express'); // Adding Express
const app = express(); // Initializing Express
const puppeteer = require('puppeteer'); // Adding Puppeteer
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');
app.use(express.static("public"));



app.get('/', async (req, res) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.currys.co.uk/gbuk/tv-and-home-entertainment/televisions/televisions/hisense-50a7300ftuk-50-smart-4k-ultra-hd-hdr-led-tv-10207138-pdt.html');
    await page.screenshot({path: 'public/screenshot.png'});
    browser.close();

    res.render('content.html', { screenShot: 'screenshot.png' });

    // res.sendFile(path.join(__dirname + '/index.html'));
});


// Making Express listen on port 7000
app.listen(3000, function () {
    console.log('Running on port 3000.');
});
