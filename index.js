//const Discord = require("discord.js");
const { Client, Intents, Interaction} = require('discord.js');
const puppeteer = require('puppeteer');
require("dotenv").config();

var floorValue = 'lava'
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
    handleMessage(msg)
})

async function handleMessage(msg) {
    if (msg.content === 'test') {
        await msg.reply('success');
    } else if (msg.content === '!floor') {
        await msg.reply('🦎 FLOOR is ' + floorValue);
    } else if (msg.content === '!mu') {
        await msg.reply('🔥🐄 COW GANG! 🐄🔥');
    } else if (msg.content === '!carrot') {
        await msg.reply('🔥🥕🥕🥕🔥');
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