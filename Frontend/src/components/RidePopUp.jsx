import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
            <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={() => {
                props.setRidePopUpPanel(false)
            }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>

            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className='h-10 w-10 object-cover rounded-full' src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="" />
                    <h2 className='text-lg font-medium'>Taniya Sharama</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 Km</h5>
            </div>

            <div className='flex flex-col justify-between items-center gap-2 '>
                <div className='w-full mt-2'>
                    <div className='flex items-center gap-5 p-2 border-b-2 border-gray-200'>
                        <i className="text-lg ri-map-pin-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-gray-600 text-sm -mt-1'>kankariya Talab, Hyderabad</p>
                        </div>
                    </div>
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
                <div className='flex justify-between items-center w-full px-8 mt-5 '>
                    <button onClick={() => {
                        props.setConfirmRidePopUpPanel(true)
                    }} className= ' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg '>Accept</button>
                    <button onClick={() => {
                        props.setRidePopUpPanel(false)
                    }} className=' bg-gray-300 text-black font-semibold p-3 px-10 rounded-lg '>Ignore</button>
                </div>
            </div>
        </div>
    )
}

export default RidePopUp