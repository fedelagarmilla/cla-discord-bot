//const Discord = require("discord.js");
const { Client, Intents, Interaction} = require('discord.js');
const puppeteer = require('puppeteer');
require("dotenv").config();

var floorValue = '🌋'
var live = false
console.log(process.version)


const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.once('ready', () => {
    console.log('Ready!');
    console.log(`Logged in as ${client.user.tag}!`)
    getFloor()
});

client.on('interactionCreate', interaction => {
    console.log(interaction);
    if (!interaction.isCommand()) return;
    const { commandName: command } = interaction;
});

client.on("messageCreate", msg => {
    if (live === false & msg.content === '!release the cow dragon bot')  {
        deployMessage(msg)
    }
    if (live === true) {
        handleMessage(msg)
    }
})

async function deployMessage(msg) {
    live = true
    await msg.reply('🔥🔥🐄🐉🐉🥕🔥🔥');
    await msg.reply('🦎 floor is 🌋');
}

async function handleMessage(msg) {
    switch (msg.content) {
        case '!floor':
            await msg.reply('🦎 floor is ' + floorValue + ' 🚀');
            break
        case '!mu':
        case '!cow':
            await msg.reply('🔥🐄 COW GANG 🐄🔥');
            break
        case '!carrot':
            await msg.reply('🔥🥕 CARROT GANG 🥕🔥');
            break
        case '!when dragon':
            await msg.reply('SOON 🦎🔥🐉');
            break
    }
}

client.login(process.env.DISCORD_BOT_TOKEN).catch(function(e) {
    console.log(e);
});

async function getFloor() {
    console.log("old floor: " + floorValue);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://opensea.io/collection/crazy-lizard-army');
    const [el] = await page.$x('/html/body/div[1]/div[1]/main/div/div/div[1]/div[2]/div[4]/div[3]/a/div/div[1]/h3');
    const textContent = await el.getProperty('textContent')
    const jsonFloor = await textContent.jsonValue()

    console.log("new floor: " + jsonFloor)
    floorValue = jsonFloor
    await browser.close();
}

// refresh every 5 min
setInterval(getFloor, 300000)