import React from 'react'

const ConfirmRide = (props) => {
    return (
        <div>
            <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={() => {
                props.setConfirmRidePanel(false)
            }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>
            <div className='flex flex-col justify-between items-center gap-2 '>
                <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className='w-full mt-2'>
                    <div className='flex items-center gap-5 p-2 border-b-2 border-gray-200'>
                        <i className="text-lg ri-map-pin-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>{props.pickup.split(" ").slice(0,3).join(" ")}</h3>
                            <p className='text-gray-600 text-sm -mt-1'>{props.pickup.split(" ").slice(3).join(" ")}</p>
                        </div>
                    </div>
                    <div  className='flex items-center gap-5 p-2 border-b-2 border-gray-200'>
                    <i className="text-lg ri-map-pin-range-line"></i>
                        <div><h3 className='text-lg font-medium'>{props.destination.split(" ").slice(0,3).join(" ")}</h3>
                            
                            <p className='text-gray-600 text-sm -mt-1'>{props.destination.split(" ").slice(3).join(" ")}</p>
                        </div>
                    </div>
                    <div  className='flex items-center gap-5 p-2 border-gray-400'>
                    <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹ {props.fare[props.vehicleType]}</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Pay at destination</p>
                        </div></div>
                </div>
                <button onClick={()=>{
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                    props.createRide(props.pickup, props.destination, props.vehicleType)
                }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg '>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide