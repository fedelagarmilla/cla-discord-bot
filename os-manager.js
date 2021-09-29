const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const tweet = require('./tweet');
const discordManager = require('./discord-manager');

var floorValue = '(updating)'

function getFloorV2() {
      console.log("old floor: " + floorValue);
        const res = axios.get('https://api.opensea.io/api/v1/collection/' + process.env.OPENSEA_COLLECTION_SLUG
        ).then((response) => {
            try {
                const stats = response.data.collection.stats
                updateFloor(stats.floor_price)
            } catch (err) {
                console.error('failed opensea response : ' + err.message);
                updateFloor('(updating)')
            }
        }).catch((error) => {
            console.error(error);
        });
}

function updateFloor(newFloor) {
    const formatterFloor = newFloor.toFixed(2);
    console.log('new floor: ' + formatterFloor);
    floorValue = formatterFloor;
}

function getNewFloor() {
    return floorValue
}

// Poll OpenSea every minute & retrieve all sales for a given collection in the last minute
// Then pass those events over to the formatter before tweeting
function getOSSales() {
    const lastMinute = moment().startOf('minute').subtract(299, "seconds").unix();

    axios.get('https://api.opensea.io/api/v1/events', {
        params: {
            collection_slug: process.env.OPENSEA_COLLECTION_SLUG,
            event_type: 'successful',
            occurred_after: lastMinute,
            only_opensea: 'false'
        }
    }).then((response) => {
        const events = _.get(response, ['data', 'asset_events']);

        console.log(`${events.length} sales in the last 5 minutes...`);

        _.each(events, (event) => {
            tweet.formatAndSendTweet(event).then((response) => {
                discordManager.postSale(event);
            }).catch((error) => {
                console.error(error);
            });
            return;
        });
    }).catch((error) => {
        console.error(error);
    });
}

function startSalesBot() {
    getOSSales()
    console.log('starting sales bot');
    setInterval(getOSSales, 300000);
}

// refresh every 5 min
function startFloorBot() {
    getFloorV2()
    console.log('starting floor bot');
    setInterval(getFloorV2, 300000);
}

module.exports = { startSalesBot, getNewFloor, startFloorBot, floorValue: floorValue };