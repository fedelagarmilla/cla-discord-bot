const axios = require('axios');

var floorValue = '(updating)'

function getFloorV2() {
    console.log("old floor: " + floorValue);


        const res = axios.get('https://api.opensea.io/api/v1/collection/crazy-lizard-army'
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
    console.log('new floor: ' + newFloor);
    floorValue = newFloor
}

function getNewFloor() {
    return floorValue
}

// refresh every 5 min
setInterval(getFloorV2, 300000)

module.exports = { getFloorV2, getNewFloor, floorValue: floorValue };