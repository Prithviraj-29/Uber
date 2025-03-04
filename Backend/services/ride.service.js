const rideModel = require('../models/ride.model')
const mapService = require('./maps.service');


async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination is required')
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    console.log(distanceTime)

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };
    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    }
    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    }

    const fare = {
        auto: Math.round(baseFare.auto + (distanceTime.distance / 1000 * perKmRate.auto) + ((distanceTime.duration / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + (distanceTime.distance / 1000 * perKmRate.car) + ((distanceTime.duration / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + (distanceTime.distance / 1000 * perKmRate.motor) + ((distanceTime.duration / 60) * perMinuteRate.moto))
    };

    return fare;
}
module.exports.getFare =getFare

function getOtp() {

    const otp = Math.floor((Math.random()*1000)+1000).toString();
    console.log("otp:", otp);
    return otp
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error("All fields are required");
    }

    const fare = await getFare(pickup, destination);
    console.log("prices :", fare);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(),
        fare: fare[vehicleType]
    })
    return ride;
}

