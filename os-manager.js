const axios = require('axios');

var floorValue = '(getting from open sea)'

async function getFloorV2() {
    console.log("old floor: " + floorValue);
    try {

        axios.get('https://api.opensea.io/api/v1/collection/crazy-lizard-army').then((response) => {
            console.log(response.data.collection.stats);
            const stats = response.data.collection.stats
            const newFloor = stats.floor_price
            console.log('new floor: ' + newFloor);

        })
    } catch (err) {
        console.error('failed opensea response : ' + err.message);
        floorValue = ' (error from os) '
    }
}
// refresh every 5 min
setInterval(getFloorV2, 300000)

module.exports = { getFloorV2, floorValue: floorValue };