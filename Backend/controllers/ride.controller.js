const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mongoose = require("mongoose");

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    const userId = req.user._id;  // ✅ Extract userId from authenticated user

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ errors: [{ msg: "Invalid user id format" }] });
    }

    try {
        const ride = await rideService.createRide({ user: userId, pickup, destination, vehicleType });
        return res.status(201).json(ride);
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