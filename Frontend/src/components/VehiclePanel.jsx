import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={()=>{
          props.setVehiclePanelOpen(false)
        }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i></h5>
        <h3 className='text-xl font-semibold mb-5'>Choose a Vehicle</h3>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className='flex items-center justify-between p-3 w-full mb-2 border-2 border-white active:border-black bg-gray-100 rounded-xl'>
          <img className='h-13 w-22' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
          <div className=' w-1/2'>
            <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className='font-medium text-xs'>3 min away</h5>
            <p className='font-normal text-xs'>Affortable, motorcycle rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fare.moto}</h2>
        </div>

        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className='flex items-center justify-between p-3 w-full mb-2 border-2 border-white active:border-black bg-gray-100 rounded-xl'>
          <img className='h-13 w-22' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
          <div className=' w-1/2'>
            <h4 className='font-medium text-base'>uberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className='font-medium text-xs'>2 min away</h5>
            <p className='font-normal text-xs'>Affortable, auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fare.auto}</h2>
        </div>

        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className='flex items-center justify-between p-3 w-full mb-2 border-2 border-white active:border-black bg-gray-100 rounded-xl'>
          <img className='h-13 w-22' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className=' w-1/2'>
            <h4 className='font-medium text-base'>uberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className='font-medium text-xs'>2 min away</h5>
            <p className='font-normal text-xs'>Affortable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'>₹{props.fare.car}</h2>
        </div>
    </div>
  )
}

export default VehiclePanel