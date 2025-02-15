import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import mapimg from '../images/uber-map.png'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'


const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('')

  const [panelOpen, setPanelOpen] = useState(false)

  const vehiclePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef =useRef(null)

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmRidePanal,setConfirmRidePanel] = useState(false)
  const [vehicleFound,setVehicleFound] = useState(false)

  const submitHandler = () => {
    e.preventDefault()

  }
  //source and destination
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        paddingRight: 24,
        paddingLeft: 24
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        paddingRight: 24,
        paddingLeft: 24

      })
      gsap.to(panelCloseRef.current, {
        opacity: 0

      })
    }
  }, [panelOpen])
//vehicle panel
  useGSAP(function () {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [vehiclePanelOpen])
//confirm ride panel
  useGSAP(function () {
    if (confirmRidePanal) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [confirmRidePanal])
//looking for driver panel
  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [vehicleFound])

  return (
    <div className='h-screen over'  >
      <img className='w-20 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />

      <div className='h-screen w-screen'>
        {/* sample img */}
        <img className='h-full object-cover w-full' src={mapimg} alt="" />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full rounded-t-xl'>
        <div className='bg-white p-6 h-[30%] relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className='absolute opacity-0 top-7 right-6 text-2xl'><i className="ri-arrow-down-wide-fill"></i></h5>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
            <div className='line absolute h-15 w-1 top-[46%] bg-black rounded-full left-11'></div>

            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' type="text" placeholder='Enter pick-up location' />

            <input
              onClick={() => {
                setPanelOpen(true)
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
              }}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3' type="text" placeholder='Where to?' />
          </form>
        </div>
        <div ref={panelRef} className=' bg-white h-0 '>
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 translate-y-full p-3 bg-white w-full py-10 px-3 pt-14'>
        <VehiclePanel setVehiclePanelOpen={setVehiclePanelOpen} setConfirmRidePanel={setConfirmRidePanel}/>
      </div>

      <div ref={confirmRidePanelRef} className='fixed z-10 bottom-0 translate-y-full p-3 bg-white w-full py-10 px-3 pt-14'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 translate-y-full p-3 bg-white w-full py-10 px-3 pt-14'>
        <LookingForDriver/>
      </div>
      
    </div>

  )
}

export default Home 