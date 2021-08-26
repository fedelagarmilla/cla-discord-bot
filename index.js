require("dotenv").config();
//const Discord = require("discord.js");

const {Client, Intents, TextChannel} = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const discordManager = require('./discord-manager');
const osManager = require('./os-manager')

var live = true
console.log(process.version)

client.once('ready', () => {
    console.log('Ready!');
    console.log(`Logged in as ${client.user.tag}!`)
    // setup sales channel
    client.channels.fetch(process.env.DISCORD_SALES_CHANNEL_ID)
        .then(channel => discordManager.setSalesChannel(channel))
        .catch(console.error);
    osManager.startSalesBot()
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
        discordManager.handleMessage(msg)
    }
})

client.login(process.env.DISCORD_BOT_TOKEN).catch(function(e) {
    console.log(e);
});

osManager.startFloorBot();

