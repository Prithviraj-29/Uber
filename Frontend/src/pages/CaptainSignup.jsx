import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios';

const CaptainSignup = () => {

  const navigate=useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const [userData, setUserData] = useState({});

  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData ={
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle:{
        color:vehicleColor,
        plate:vehiclePlate,
        capacity:vehicleCapacity,
        vehicleType:vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)

    if(response.status===201){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  }

  useEffect(() => {
    console.log(userData);
  }, [userData])



  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className="w-20 " src="https://www.svgrepo.com/show/505031/uber-driver.svg" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-base font-medium mb-1 '>What's our Captain's name</h3>
          <div className='flex gap-6 mb-3' >
            <input className='bg-[#eeeeee]  w-full rounded px-4 py-2  text-base placeholder:text-sm' type='text' placeholder='First name'
              value={firstName} onChange={(e) => {
                setFirstName(e.target.value)
              }} />
            <input className='bg-[#eeeeee]  w-full rounded px-4 py-2  text-base placeholder:text-sm' type='text' placeholder='Last name'
              value={lastName} onChange={(e) => {
                setLastName(e.target.value)
              }} />
          </div>

          <h3 className='text-base font-medium mb-1'>What's our Captain's email</h3>
          <input className='bg-[#eeeeee] mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm' required type='email' placeholder='rakesh@gmail.com'
            value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} />

          <h3 className='text-base font-medium mb-1'>Enter Password</h3>
          <input className='bg-[#eeeeee] mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm ' required type='password' placeholder='password'
            value={password} onChange={(e) => {
              setPassword(e.target.value)
            }} />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-3'>
            <input className='bg-[#eeeeee]  rounded px-4 py-2 w-full text-base placeholder:text-sm ' required type='text' placeholder='Vechicle Color'
              value={vehicleColor} onChange={(e) => {
                setVehicleColor(e.target.value)
              }} />
            <input className='bg-[#eeeeee]  rounded px-4 py-2 w-full text-base placeholder:text-sm ' required type='text' placeholder='Vechicle Plate'
              value={vehiclePlate} onChange={(e) => {
                setVehiclePlate(e.target.value)
              }} />
          </div>
          <div required className='flex gap-4 mb-5'>
            <input className='bg-[#eeeeee]  rounded px-4 py-2 w-full text-base placeholder:text-sm ' required type='number' placeholder='Vechicle Capacity'
              value={vehicleCapacity} onChange={(e) => {
                setVehicleCapacity(Number(e.target.value))
              }} />
            <select className='bg-[#eeeeee]  rounded px-4 py-2 w-full text-base placeholder:text-sm ' required  placeholder='Vechicle Plate'
              value={vehicleType} onChange={(e) => {
                setVehicleType(e.target.value)
              }} >
                <option value ="" disabled> Select Vehicle type</option>
                <option value ="car" > car </option>
                <option value ="auto"> auto </option>
                <option value ="moto"> moto </option>
                
              </select>
          </div>

          <button className='bg-black text-white font-semibold mb-7 rounded px-4 py-2 w-full text-base placeholder:text-sm '>Create Account</button>

        </form>
        <p className='text-center'>Already have account? <Link to='/Captain-login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <p className='text-[12px] leading-tight text-[#0000006a]'>This site is protected by reCAPTCHA and the <span className='underline'>Google privacy policy</span> and <span className='underline'>Terms of Service apply.</span></p>
      </div>
    </div>
  )
}

export default CaptainSignup