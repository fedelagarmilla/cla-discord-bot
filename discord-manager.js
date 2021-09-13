
// commands: floor, dragon, sweep, paper, mu/cow, carrot, money, pop/candy, party, kobe, pistol/gun, pimp, cream, zombie, bunny
const { MessageEmbed } = require('discord.js');
const _ = require("lodash");
const { ethers } = require('ethers');

var salesChannel = ""

async function handleMessage(msg) {
    try {
        switch (msg.content.toLowerCase()) {
            case '!floor':
              //  await msg.reply('🦎 floor is ' + osManager.getNewFloor() + 'Ξ 🚀');
             //   await msg.reply('🚧 will be back soon with traits floor 🚧');
                break
            case '!release the cow dragon bot':
                await msg.reply('🔥🔥🐄🐉🐉🥕🔥🔥');
                break
            case '!buy':
            case '!link':
                await msg.reply('https://opensea.io/collection/crazy-lizard-army?search[sortAscending]=true&search[sortBy]=PRICE&search[toggles][0]=BUY_NOW');
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
            case '!pimp':
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
            case '!box':
            case '!boxing':
                await msg.reply('🔥🥊 KO GANG 🥊‍🔥');
                break
        }
    } catch (err) {
        console.error('failed response message : ' + err.message);
    }
}

function setSalesChannel(channel) {
    console.log("sales channel: " + channel)
    salesChannel = channel
    salesChannel.send('🦎🚀🌒')
}

function postSale(sale) {
    try {
        const formattedTokenPrice = ethers.utils.formatEther(sale.total_price.toString());
        const formattedEthPrice = (formattedTokenPrice * 1).toFixed(3);
        var priceText = `${formattedEthPrice}${ethers.constants.EtherSymbol}`;
        var buyAddress = sale?.winner_account?.address
        const message = new MessageEmbed()
            .setColor('#00b816')
            .setTitle(sale.asset.name + ' sold!')
            .setURL(sale.asset.permalink)
            .setThumbnail(sale.asset.image_url)
            .addFields(
                {name: 'Amount', value: `${priceText}`},
                {name: 'Buyer', value: `[${buyAddress}](https://opensea.io/${buyAddress})`}
            )
            .setTimestamp(Date.parse(`${sale?.created_date}Z`))
        salesChannel.send({embeds: [message]});
    } catch (err) {
        console.error('failed sending to discord: ' + err.message);
    }
}

function postMint(sale) {
    try {
        var buyAddress = sale?.to_account?.address
        var blackHole = sale?.from_account?.address
       // var img = sale.asset.image_url
        const message = new MessageEmbed()
            .setColor('#ff6700')
            .setTitle('Crazy Dragon Corps #' + sale.asset.token_id + ' minted!')
            .setURL(sale.asset.permalink)
            .setThumbnail(sale.asset.image_url)
            .addFields(
                {name: 'Owner', value: `[${buyAddress}](https://opensea.io/${buyAddress})`}
            )
            .setTimestamp(Date.parse(`${sale?.created_date}Z`))
        if (blackHole == '0x0000000000000000000000000000000000000000') {
            salesChannel.send({embeds: [message]});
        }
    } catch (err) {
        console.error('failed sending to discord: ' + err.message);
    }
}

const buildMessage = (sale) => (
    new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(sale.asset.name + ' sold!')
        .setURL(sale.asset.permalink)
        .setAuthor('Crazy Lizard Army Sales', 'https://files.readme.io/566c72b-opensea-logomark-full-colored.png')
        .setThumbnail(sale.asset.collection.image_url)
        .addFields(
            { name: 'Name', value: sale.asset.name },
            { name: 'Amount', value: `${ethers.utils.formatEther(sale.total_price || '0')}${ethers.constants.EtherSymbol}`},
            { name: 'Buyer', value: sale?.winner_account?.address, },
            { name: 'Seller', value: sale?.seller?.address,  },
        )
        .setTimestamp(Date.parse(`${sale?.created_date}Z`))
        .setFooter('Sold on OpenSea', 'https://files.readme.io/566c72b-opensea-logomark-full-colored.png')
)

module.exports = {
    handleMessage: handleMessage,
    setSalesChannel: setSalesChannel,
    postSale: postSale,
    postMint: postMint
};