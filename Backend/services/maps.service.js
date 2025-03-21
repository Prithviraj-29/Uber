const axios = require('axios');
const captainModel = require('../models/captain.model')


module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.LOCATIONIQ_API_KEY;
    const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`;
    try {
        const response = await axios.get(url);

        if (response.data && response.data.length > 0) {
            const location = response.data[0];

            return {
                ltd: location.lat,
                lng: location.lon,
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.LOCATIONIQ_API_KEY;

    try {
        const originCoords = await module.exports.getAddressCoordinate(origin);
        const destinationCoords = await module.exports.getAddressCoordinate(destination);

        console.log("Origin Coords:", originCoords);
        console.log("Destination Coords:", destinationCoords);

        if (!originCoords.ltd || !originCoords.lng || !destinationCoords.ltd || !destinationCoords.lng) {
            throw new Error('Invalid coordinates received');
        }

        const url = `https://us1.locationiq.com/v1/directions/driving/${originCoords.ltd},${originCoords.lng};${destinationCoords.ltd},${destinationCoords.lng}?key=${apiKey}&overview=false`;

        const response = await axios.get(url);

        if (response.data && response.data.routes && response.data.routes.length > 0) {
            const route = response.data.routes[0]
            console.log("route value:", route)
            return {
                // duration: `${Math.round(route.duration / 60)}minutes`,
                // distance: `${(route.distance / 1000).toFixed(2)} km`,
                duration: route.duration,
                distance:route.distance,
                
            };
        } else {
            throw new Error("no valid routes found.")
        }


    } catch (err) {
        console.error("Error in getDistanceTime:", err);
        throw err;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }
    const apiKey = process.env.LOCATIONIQ_API_KEY;
    const url = `https://api.locationiq.com/v1/autocomplete.php?key=${apiKey}&q=${encodeURIComponent(input)}&limit=5`

    try {
        const response = await axios.get(url)
        if (response.data && response.data.length > 0) {
            return response.data
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err)
        throw err;

    }
}


module.exports.getCaptainInTheRadius = async(ltd,lng,radius)=>{

    const captains =await captainModel.find({

        location:{
            $geoWithin:{
                $centerSphere:[[ltd,lng],radius/6371]
            }
        }
    })
    return captains

}