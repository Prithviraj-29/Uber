import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {

  const [email, setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName ,setLastName] = useState('')
  const [userData, setUserData] = useState({});


  const navigate = useNavigate()
  const {user, setUser} = React.useContext(UserDataContext)

  const submitHandler = async(e)=>{
    e.preventDefault();
    const newUser = {
      fullname:{
        firstname:firstName,
        lastname: lastName
      },
      email:email,
      password:password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)

    if(response.status === 201){
      const data = response.data;
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }


    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }

  useEffect(()=>{
    console.log(userData);
  },[userData])

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className="w-16 mb-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-base font-medium mb-1 '>What's your name</h3>
          <div className='flex gap-6 mb-3' >
            <input className='bg-[#eeeeee]  w-full rounded px-4 py-2  text-base placeholder:text-sm' type='text' placeholder='First name' 
              value={firstName} onChange={(e)=>{
                setFirstName(e.target.value)
              }}/>
            <input className='bg-[#eeeeee]  w-full rounded px-4 py-2  text-base placeholder:text-sm' type='text' placeholder='Last name' 
            value={lastName} onChange={(e)=>{
              setLastName(e.target.value)
            }}/>
          </div>

          <h3 className='text-base font-medium mb-2'>What's your email</h3>
          <input className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-sm' required type='email' placeholder='rakesh@gmail.com' 
          value={email} onChange={(e)=>{
            setEmail(e.target.value)
          }}/>

          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input className='bg-[#eeeeee] mb-6 rounded px-4 py-2 w-full text-base placeholder:text-sm ' required type='password' placeholder='password' 
          value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
          <button className='bg-black text-white font-semibold mb-7 rounded px-4 py-2 w-full text-base placeholder:text-sm '>Create Account</button>

        </form>
        <p className='text-center'>Already have account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <p className='text-[12px] leading-tight text-[#0000006a]'>This site is protected by reCAPTCHA and the <span className='underline'>Google privacy policy</span> and <span className='underline'>Terms of Service apply.</span></p>
      </div>
    </div>
  )
}

export default UserSignup