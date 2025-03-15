const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mongoose = require("mongoose");
const mapService = require('../services/maps.service')

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    const userId = req.user._id;  
    console.log("User ID:", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ errors: [{ msg: "Invalid user id format" }] });
    }

    try {
        const ride = await rideService.createRide({ user: userId, pickup, destination, vehicleType });
        

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup,destination)
        console.log("pickup coordinates",pickupCoordinates)

        const captainsInRadius = await mapService.getCaptainInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,2)
        console.log("Captains in Radius",captainsInRadius)

        return res.status(201).json({ success: true, ride, captainsInRadius });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


module.exports.getFare = async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {pickup,destination} = req.query;
    try{
        const fare = await rideService.getFare(pickup,destination);
        return res.status(200).json(fare);
    }catch (err){
        return res.status(500).json({message:err.message})
    }
}