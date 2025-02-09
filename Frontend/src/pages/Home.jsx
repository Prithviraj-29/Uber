import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import mapimg from '../images/uber-map.png'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'


const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const submitHandler = () => {
    e.preventDefault()

  }
  useGSAP(function () {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        opacity :1
      })
      gsap.to(panelCloseRef.current,{
        opacity :1
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        opacity :0
      })
      gsap.to(panelCloseRef.current,{
        opacity :0

      })
    }
  }, [panelOpen])

  return (
    <div>
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
            <div className='line absolute h-15 w-1 top-[45%] bg-gray-800 rounded-full left-10'></div>

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
        <div ref={panelRef} className=' bg-red-500 opacity-0'>
          <LocationSearchPanel/>
        </div>
      </div>
    </div>

  )
}

export default Home 