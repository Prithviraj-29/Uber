import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import mapimg from '../images/uber-map.png'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import FinishRide from '../components/FinishRide'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(true);
    const finishRidePanelRef = useRef(null)



    //animate ride panel
    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }[finishRidePanel])


        return (
            <div className='h-screen'>

                <div className='fixed top-0 flex p-3 justify-center items-center w-screen'>
                    <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
                    <Link to='/home' className='fixed right-2 top-2 h-10 w-10 flex justify-center items-center bg-white rounded-full'>
                        <i class="font-medium text-lg ri-logout-box-r-line"></i>
                    </Link>
                </div>

                <div className='h-4/5'>
                    <img className='h-full object-cover w-full' src={mapimg} alt="" />
                </div>

                <div className='h-1/5 p-6 bg-yellow-400 flex justify-between items-center relative' onClick={()=>{
                    setFinishRidePanel(true)
                }}>
                    <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {
                    }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-fill"></i></h5>

                    <h4 className='text-xl font-semibold'>4 Km away</h4>
                    <button className='bg-green-600 text-white rounded-lg px-10 p-3 font-semibold'>Complete Ride</button>

                </div>
                <div ref={finishRidePanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                    <FinishRide/>
                </div>

            </div>
        )
    }

export default CaptainRiding 