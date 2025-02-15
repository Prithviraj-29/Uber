import React from 'react'

const LookingForDriver = () => {
  return (
    <div>
            <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={() => {
                props.setVehiclePanelOpen(false)
            }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Looking for driver </h3>
            <div className='flex flex-col justify-between items-center gap-2 '>
                <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className='w-full mt-2'>
                    <div className='flex items-center gap-5 p-2 border-b-2 border-gray-200'>
                        <i className="text-lg ri-map-pin-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-gray-600 text-sm -mt-1'>kankariya Talab, Hyderabad</p>
                        </div>
                    </div>
                    <div  className='flex items-center gap-5 p-2 border-b-2 border-gray-200'>
                    <i className="text-lg ri-map-pin-range-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>102-4/A</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Road no.5 Jubliee hills, Hyderabad</p>
                        </div>
                    </div>
                    <div  className='flex items-center gap-5 p-2 border-gray-400'>
                    <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹ 74.45</h3>
                            <p className='text-gray-600 text-sm -mt-1'>Pay at destination</p>
                        </div></div>
                </div>
            </div>
        </div>
  )
}

export default LookingForDriver