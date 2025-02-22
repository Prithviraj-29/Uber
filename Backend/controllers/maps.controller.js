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

module.exports.getDistanceTime = async (req, res, next) => {
    try {
        console.log("Received request:", req.query);  // ✅ Check incoming data

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error("Validation errors:", errors.array());  // ✅ Log validation errors
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;
        console.log("Origin:", origin, "Destination:", destination);  // ✅ Debugging

        const distanceTime = await mapService.getDistanceTime(origin, destination);
        
        return res.status(200).json(distanceTime);
    } catch (err) {
        console.error("Error in getDistanceTime:", err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getAutoCompleteSuggestions = async (req,res,next) =>{
    
    try {
        const errors =validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const {input} = req.query;
        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    }catch(err){
        console.error(err)
        res.status(500).json({message:'Internal server error'})
    }
}
