//const Discord = require("discord.js");
const { Client, Intents } = require('discord.js');
const puppeteer = require('puppeteer');
require("dotenv").config();

var floorValue = 'lava'

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.once('ready', () => {
    console.log('Ready!');
    getFloor()
});

client.on('interactionCreate', interaction => {
    console.log(interaction);
});

client.login('ODczMjczODU4MDU1MDk0Mjgy.YQ2BqA.EjPoWg5EukZh_Xx1x4N28wGCwik').catch();
//client.login(process.env.DISCORD_BOT_TOKEN);

/*const discordBot = new Discord.Client()
discordBot.on("ready", () => {
    console.log(`Logged in as ${discordBot.user.tag}!`)
    // const channel = discordBot.channels.fetch(process.env.DISCORD_CHANNEL_ID)
})
discordBot.on("message", msg => {
    if (msg.content === "floor") {
        var response = "floor is " + floorValue
        msg.reply(response);
    }
})
discordBot.login(process.env.DISCORD_BOT_TOKEN);
*/
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

setInterval(getFloor, 300000)