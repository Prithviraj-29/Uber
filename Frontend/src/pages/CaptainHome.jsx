import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import mapimg from '../images/uber-map.png'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { socketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import { useEffect } from 'react'

const CaptainHome = () => {

  const [ridePopUpPanel , setRidePopUpPanel]= useState(true);
  const [confirmRidePopUpPanel , setConfirmRidePopUpPanel]= useState(false);
  
  const {socket} =useContext(socketContext)
  const {captain} = useContext(CaptainDataContext)

  useEffect(()=>{
    socket.emit('join',{
      userId:captain._id,
      userType:'captain'
    })

    const updateLocation= ()=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{

          console.log( {userId:captain._id,
            location:{
              ltd:position.coords.latitude,
              lng:position.coords.longitude
            }})

          socket.emit('update-location-captain',{
            userId:captain._id,
            location:{
              ltd:position.coords.latitude,
              lng:position.coords.longitude
            }
          })
        })
      }
    }
    const locationIntervel = setInterval(updateLocation,10000)
    updateLocation()

  },[captain])

  socket.on('new-ride',(data)=>{
    console.log(data)
  })

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);

  //animate ride panel
  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [ridePopUpPanel])
  //animate confirm ride panel
  useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }

  }, [confirmRidePopUpPanel])
    

  return (
    <div className='h-screen'>
      <div className='fixed top-0 flex p-3 justify-center items-center w-screen'>
        <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 flex justify-center items-center bg-white rounded-full'>
          <i class="font-medium text-lg ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-3/5'>
        <img className='h-full object-cover w-full' src={mapimg} alt="" />
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails/>
      </div>
      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
      </div>
      <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
      </div>
    </div>
  )
}

export default CaptainHome