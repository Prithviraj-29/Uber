const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({
    firstname, lastname, email, password,
    color, plate, capacity, vehicleType
})=>{

    

    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All fileds are required');
    }
    const captain = await captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
}
// {
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk4M2RiMmJlOGQ4NWQ5ZDIyNGI2MGMiLCJpYXQiOjE3MzgwMzA1MTQsImV4cCI6MTczODExNjkxNH0.PjDzcSvLfWbprkmfcPrfTBh-L9zFwE8oRzfe4WgM8kk",
//     "captain": {
//         "fullname": {
//             "firstname": "test_captain_firstname",
//             "lastname": "test_captain_lastname"
//         },
//         "email": "test_captain@gmail.com",
//         "password": "$2b$10$XyGRD2DLznn9i75fkOBKJ..q4NiQ.Gnr/jvdY9PlyjQsnt/zm9UMu",
//         "status": "inactive",
//         "vehicle": {
//             "color": "red",
//             "plate": "MP 04 XY 6234",
//             "capacity": 3,
//             "vehicleType": "auto"
//         },
//         "_id": "67983db2be8d85d9d224b60c",
//         "__v": 0
//     }
// }