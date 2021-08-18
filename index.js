//const Discord = require("discord.js");
require("dotenv").config();
const { Client, Intents, Interaction} = require('discord.js');
const puppeteer1 = require('puppeteer');
const puppeteer = require('puppeteer-extra');
const pluginStealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(pluginStealth());


var floorValue = '(getting from open sea)'
var live = true
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
    if (msg.content === '!release the cow dragon bot')  {
        live = true
    }
    if (live === true) {
        handleMessage(msg)
    }
})

// commands: floor, dragon, sweep, paper, mu/cow, carrot, money, pop/candy, party, kobe, pistol/gun, pimp, cream, zombie, bunny
async function handleMessage(msg) {
    try {
        switch (msg.content.toLowerCase()) {
            case '!floor':
                await msg.reply('🦎 floor is ' + floorValue + ' 🚀' + '( not real time, opensea cannot keep up with our sales)');
                break
            case '!release the cow dragon bot':
                await msg.reply('🔥🔥🐄🐉🐉🥕🔥🔥');
                break
            case '!good morning':
            case '!goodmorning':
                await msg.reply('please delist');
                break
            case '!good night':
            case '!goodnight':
                await msg.reply('dont get swept by the wales while you sleep');
                break
            case '!dragon':
            case '!when dragon':
            case '!wen dragon':
            case '!when dragons':
                await msg.reply('SOON 🦎🔥🧪🐉 we got this!');
                break
            case '!sweep':
                await msg.reply('🧹🧹🦎🦎🧹🧹🦎🦎');
                break
            case '!paper':
            case '!paperhands':
                await msg.reply('😕 NGMI 😕');
                break
            case '!delist':
            case '!hodl':
                await msg.reply('🦎💎 HODL 💎🦎');
                break
            case '!roof':
            case '!ceiling':
                await msg.reply('🦎🚀🌒 MARS 🚀🌒🐉');
                break
            case '!general':
                await msg.reply('🪖 everyone stand up 🪖');
                break
            case '!mu':
            case '!cow':
                await msg.reply('🔥🐄 COW GANG 🐄🔥');
                break
            case '!carrot':
                await msg.reply('🔥🥕 CARROT GANG 🥕🔥');
                break
            case '!money':
                await msg.reply('🔥🤑 MONEY GANG 🤑🔥');
                break
            case '!pop':
            case '!candy':
                await msg.reply('🔥🍭 POP GANG 🍭🔥');
                break
            case '!party':
            case '!micdrop':
                await msg.reply('🔥🎧🎤 PARTY GANG 🎤🎧🔥');
                break
            case '!kobe':
                await msg.reply('🔥🏀 KOBEEEEE 🏀🔥');
                break
            case '!pistol':
            case '!blaster':
            case '!gun':
                await msg.reply('🔥🔫 PUNISHER GANG 🔫🔥');
                break
            case '!pimp':
                await msg.reply('🔥💎 PIMP GANG 💎🔥');
                break
            case '!cream':
                await msg.reply('🔥🍦 ICE GANG 🍦🔥');
                break
            case '!zombie':
                await msg.reply('🔥🧟‍ ZOMBIE GANG 🧟‍🔥');
                break
            case '!bunny':
                await msg.reply('🔥🐰‍ BUNNY GANG 🐰‍🔥');
                break
            case '!suit':
                await msg.reply('🔥🕴️🕺🕴️🔥');
                break
            case '!spacesuit':
            case '!space':
                await msg.reply('🔥👨‍🚀‍ SPACE GANG 👨‍🚀‍🔥');
                break       
            case '!halo':
            case '!holy':
                await msg.reply('🔥‍🙏😇 HOLY GANG ‍😇🙏‍🔥');
                break
            case '!halo':
            case '!holy':
                await msg.reply('🔥‍🙏😇 HOLY GANG ‍😇🙏‍🔥');
                break
        }
    } catch (err) {
        console.error('failed response message : ' + err.message);
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
