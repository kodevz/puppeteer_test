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

var port = process.env.PORT || 8080;


app.get('/preview', async (req, res) => {

    const browser = await puppeteer.launch({ headless: true }, {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    });
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com', {
        waitUntil: 'networkidle2',
    });
    await page.screenshot({ path: 'public/screenshot.png' });
    browser.close();

    res.render('content.html', { screenShot: 'screenshot.png' });

    // res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});


// Making Express listen on port 7000
app.listen(port, function () {
    console.log('Running on port 3000.', port);
});
