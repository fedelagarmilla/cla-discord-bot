//const osManager = require('./os-manager')
const { MessageEmbed } = require('discord.js');
const _ = require("lodash");
const { ethers } = require('ethers');

var salesChannel = ""

async function handleMessage(msg) {
    try {
        switch (msg.content.toLowerCase()) {
           case '!ribbit':
                await msg.reply('ribbit');
                break
        }
    } catch (err) {
        console.error('failed response message : ' + err.message);
    }
}

function setSalesChannel(channel) {
    console.log("sales channel: " + channel)
    salesChannel = channel
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

module.exports = {
    handleMessage: handleMessage,
    setSalesChannel: setSalesChannel,
    postSale: postSale,
};