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

function postMint(sale) {
    try {
        console.log('posting mint');
        console.log('url ' + sale.asset.permalink);
            console.log('sending message!');
            var buyAddress = sale?.to_account?.address
            var blackHole = sale?.from_account?.address
           // var img = sale.asset.image_url
            const message = new MessageEmbed()
                .setColor('#ff6700')
                .setTitle('Pumpkin #' + sale.asset.token_id + ' minted!')
                .setURL(sale.asset.permalink)
                .setThumbnail(sale.asset.image_url)
                .addFields(
                    {name: 'Owner', value: `[${buyAddress}](https://opensea.io/${buyAddress})`}
                )
                .setTimestamp(Date.parse(`${sale?.created_date}Z`));
                console.log('blackHole: ' + blackHole);
            if (blackHole == '0x0000000000000000000000000000000000000000') {
                salesChannel.send({embeds: [message]});
            }
    } catch (err) {
        console.error('failed sending to discord: ' + err.message);
    }
}

function isNewMint(saleUrl) {
    console.log('readig channel')
    let sales = salesChannel.messages.fetch({ limit: 1 });
    let lastMessageId = salesChannel.messages.lastMessageId;
    console.log('last id: ' + lastMessageId)
    let lastMessage = salesChannel.fetch_message(lastMessageId);

    console.log(lastMessage)
        if (lastMessage !== 'undefined') {
        console.log('last message: ' + lastMessage.url);   
        console.log('sale url: ' + saleUrl); 
        console.log('repeated message: ' + lastMessage.url !==  saleUrl);    

        return (lastMessage.url !==  saleUrl)
            
        if (!lastMessage.author.bot) {
          // The author of the last message wasn't a bot
        }
    } else {
        return true;
    }
}

module.exports = {
    handleMessage: handleMessage,
    setSalesChannel: setSalesChannel,
    postSale: postSale,
    postMint: postMint
};