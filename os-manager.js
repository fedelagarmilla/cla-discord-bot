const axios = require('axios');

var floorValue = '(getting from open sea)'

async function getFloorV2() {
    console.log("old floor: " + floorValue);


        axios.get('https://api.opensea.io/api/v1/collection/crazy-lizard-army'
        ).then((response) => {
            try {
                const stats = response.data.collection.stats
                this.floorValue = stats.floor_price
                console.log('new floor: ' + this.floorValue);
            } catch (err) {
                console.error('failed opensea response : ' + err.message);
                this.floorValue = ' (error from os) '
            }
        }).catch((error) => {
            console.error(error);
        });
}
// refresh every 5 min
setInterval(getFloorV2, 300000)

module.exports = { getFloorV2, floorValue: floorValue };