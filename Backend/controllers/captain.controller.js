const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

//register captain
module.exports.registerCaptain = async(res,requestAnimationFrame,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erros: errors.array()});
    }

    const {fullname, email, password, vechicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist){
        return res.status(400).json({message:'captain already exist'})
    }

    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstname : fullname.firstname,
        lastname : fullname.lastname,
        email,
        password:hashedPassword,
        color: vechicle.color,
        plate: vechicle.plate,
        capacity:vechicle.capacity,
        vehicleType:vechicle.vehicleType
    })

    const token =captain.generateAuthToken();
    res.status(201).json({token,captain})
}