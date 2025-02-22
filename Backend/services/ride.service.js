const rideModel = require('../models/ride.model')
const mapService = require('./maps.service');

async function getFare(pickup, destination){
    if(!pickup || !destination){
        throw new Error('Pickup and destination is required')
    }

    const distanceTime = await mapService.getDistanceTime(pickup,destination);
    console.log(distanceTime)

    const baseFare ={
        auto:30,
        car:50,
        motorcycle:20
    };
    const perKmRate ={
        auto:10,
        car:15,
        motorcycle:8
    }
    const perMinuteRate ={
        auto:2,
        car:3,
        motorcycle:1.5
    }

    const fare = {
        auto: baseFare.auto + (distanceTime.distance * perKmRate.auto) + (distanceTime.duration * perMinuteRate.auto),
        car: baseFare.car + (distanceTime.distance * perKmRate.car) + (distanceTime.duration * perMinuteRate.car),
        motorcycle: baseFare.motorcycle + (distanceTime.distance * perKmRate.motorcycle) + (distanceTime.duration * perMinuteRate.motorcycle)
    };
    
    return fare;
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) =>{
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error("All fields are required");
    }

    const fare = await getFare(pickup , destination);
    console.log("prices :",fare);

    const ride =await rideModel.create({
        user,
        pickup,
        destination,
        fare:fare[vehicleType]
    })
    return ride;
}

