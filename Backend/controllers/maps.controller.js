const mapService = require('../services/maps.service');
const {validationResult} = require('express-validator');

module.exports.getCoordinates = async (req,res,next)=>{

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()})
    }

    const {address} = req.query

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    }catch(error){
        res.status(404).json({message:'Internal server error'})
    }
}