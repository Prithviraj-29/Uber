import React from 'react'
import mapimg from '../images/uber-map.png'
import { Link } from 'react-router-dom'


const Riding = () => {
    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 flex justify-center items-center bg-white rounded-full'>
            <i class="font-medium text-lg ri-home-4-line"></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full object-cover w-full' src={mapimg} alt="" />
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium'>Prithvi</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>MP 04 1234</h4>
                        <p className='text-sm text-gray-600'>Maruthi Suzuki Alto</p>
                    </div>
                </div>

                <div className='flex flex-col justify-between items-center gap-2 '>
                    <div className='w-full mt-2'>
                        <div className='flex items-center gap-5 p-2 border-b-2 border-gray-200'>
                            <i className="text-lg ri-map-pin-range-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>102-4/A</h3>
                                <p className='text-gray-600 text-sm -mt-1'>Road no.5 Jubliee hills, Hyderabad</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-2 border-gray-400'>
                            <i className="text-lg ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹ 74.45</h3>
                                <p className='text-gray-600 text-sm -mt-1'>Pay at destination</p>
                            </div></div>
                    </div>
                    <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg '>Make a Payment</button>
                </div>
            </div>
        </div>


    )
}

export default Riding