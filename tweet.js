const axios = require('axios');
const twit = require('twit');
const moment = require('moment');
const _ = require('lodash');
const { ethers } = require('ethers');

require("dotenv").config();

const twitterConfig = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
};

const twitterClient = new twit(twitterConfig);

function formatAndSendTweet(event) {
    const tokenName = _.get(event, ['asset', 'name']);
    const image = _.get(event, ['asset', 'image_url']);
    const openseaLink = _.get(event, ['asset', 'permalink']);
    const totalPrice = _.get(event, 'total_price');
    const usdValue = _.get(event, ['payment_token', 'usd_price']);
    const tokenSymbol = _.get(event, ['payment_token', 'symbol']);
    const tokenId = _.get(event, ['payment_token', 'id']);

    // seems the only 3 options that work on "order_by" param are "total_price", "sale_date" and "token_id"
    // y
    // If you ctrl+f for the bundle name, you'll be able to find total_price, which will be the sale price expressed in wei.
    const formattedTokenPrice = ethers.utils.formatEther(totalPrice.toString());
    const formattedUsdPrice = (formattedTokenPrice * usdValue).toFixed(2);
    const formattedEthPrice = (formattedTokenPrice * 1).toFixed(3);

    const formattedPriceSymbol = (
        (tokenSymbol === 'WETH' || tokenSymbol === 'ETH')
            ? 'Ξ'
            : ` ${tokenSymbol}`
    );
    // seems the only 3 options that work on "order_by" param are "total_price", "sale_date" and "token_id"
    // y
    // If you ctrl+f for the bundle name, you'll be able to find total_price, which will be the sale price expressed in wei.

    console.log(tokenSymbol + ' : ' + totalPrice)
    var tweetText = `${tokenName} bought for ${formattedEthPrice}${formattedPriceSymbol} ($${formattedUsdPrice}) ${openseaLink}`;
    if (tokenSymbol === 'USDC') {
        console.log('token id: ' + tokenId)
        tweetText = `${tokenName} bought ${openseaLink}`;
    }
    console.log(tweetText);
    return handleDupesAndTweet(tokenName, tweetText, image);
}

async function handleDupesAndTweet(tokenName, tweetText, imageUrl) {
    // Search our twitter account's recent tweets for anything exactly matching our new tweet's text
    twitterClient.get('search/tweets', { q: tokenName, count: 1, result_type: 'recent' }, (error, data, response) => {
        if (!error) {
            const statuses = _.get(data, 'statuses');

            // No duplicate statuses found
            if (_.isEmpty(data) || _.isEmpty(statuses)) {
                console.log('No duplicate statuses found, continuing to tweet...');
                tweet(tweetText, imageUrl);
                return true;
            }

            const mostRecentMatchingTweetCreatedAt = _.get(statuses[0], 'created_at');
            console.log('mostRecentMatchingTweetCreatedAt: ' + mostRecentMatchingTweetCreatedAt);
            let newDate  = new Date(mostRecentMatchingTweetCreatedAt)
            const statusOlderThan10Mins = moment(newDate).isBefore(moment().subtract(10, 'minutes'));

            // Status found is older than 10 minutes, not a cached transaction, just sold at same price
            if (statusOlderThan10Mins) {
                console.log('Previous status is older than 10 minutes, continuing to tweet...');
                tweet(tweetText, imageUrl);
                return true;
            }
            console.error('Tweet is a duplicate; possible delayed transaction retrieved from OpenSea');
            return false;
        } else {
            console.error(error);
            return false;
        }
    });
}

async function tweet(tweetText, imageUrl) {
    // Format our image to base64
    const processedImage = await getBase64(imageUrl);
    console.log('tweeting');

    // Upload the item's image from OpenSea to Twitter & retrieve a reference to it
    twitterClient.post('media/upload', { media_data: processedImage }, (error, media, response) => {
        if (!error) {
            const tweet = {
                status: tweetText,
                media_ids: [media.media_id_string]
            };

            twitterClient.post('statuses/update', tweet, (error, tweet, response) => {
                if (!error) {
                    console.log(`Successfully tweeted: ${tweetText}`);
                } else {
                    console.error(error);
                }
            });
        } else {
            console.error(error);
        }
    });
}

// Format a provided URL into it's base64 representation
function getBase64(url) {
    return axios.get(url, { responseType: 'arraybuffer'}).then(response => Buffer.from(response.data, 'binary').toString('base64'))
}

module.exports = {
    handleDupesAndTweet: handleDupesAndTweet, formatAndSendTweet: formatAndSendTweet
};