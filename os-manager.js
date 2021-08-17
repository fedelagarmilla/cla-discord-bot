
//const puppeteer1 = require('puppeteer');
const puppeteer = require("puppeteer-extra");
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());

var floorValue = '(getting from open sea)'

async function getFloor() {
    console.log("old floor: " + floorValue);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://opensea.io/collection/crazy-lizard-army', {waitUntil: 'networkidle0'});
        await page.waitForXPath('/html/body/div[1]/div[1]/main/div/div/div[1]/div[2]/div[4]/div[3]/div/div[1]/h3');
        const [el] = await page.$x('/html/body/div[1]/div[1]/main/div/div/div[1]/div[2]/div[4]/div[3]/div/div[1]/h3');
        console.log("extracetd value: " + el)
        const textContent = await el.getProperty('textContent')
        const jsonFloor = await textContent.jsonValue()

        console.log("new floor: " + jsonFloor)
        floorValue = jsonFloor
        await browser.close();
    } catch (err) {
        console.error('failed opensea response : ' + err.message);
    } finally {
        await browser.close();
    }
}
// refresh every 5 min
setInterval(getFloor, 300000)

module.exports = { getFloor, floorValue: floorValue };