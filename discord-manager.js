
// commands: floor, dragon, sweep, paper, mu/cow, carrot, money, pop/candy, party, kobe, pistol/gun, pimp, cream, zombie, bunny
const osManager = require('./os-manager')

async function handleMessage(msg) {
    try {
        switch (msg.content.toLowerCase()) {
            case '!floor':
                await msg.reply('🦎 floor is ' + osManager.getNewFloor() + 'Ξ 🚀');
              //  await msg.reply('🚧 will be back soon with traits floor 🚧');
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

module.exports = {
    handleMessage: handleMessage
};