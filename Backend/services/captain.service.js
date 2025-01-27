const captianModel = require('../models/captain.model');


module.exports.createCaptain = async ({
    firstname, lastname, email, password,
    color, plate, capacity, vehicleType
})=>{
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All fileds are required');
    }
    const captain = captianModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capatcity,
            vehicleType
        }
    })
    return captain;
}