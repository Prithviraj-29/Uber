import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
      const [email,setEmail] = useState('');
      const [password,setPassword] = useState('');
      const [captainData,setCaptainData] = useState({});
  
      const submitHandler = (e) =>{
          e.preventDefault();
          setCaptainData({email,password})
          console.log({email,password})
          setEmail('')
          setPassword('')
          
      }
  
  
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className="w-20 mb-2" src="https://www.svgrepo.com/show/505031/uber-driver.svg" />
                <form onSubmit={(e)=>{
                    submitHandler(e)
                }}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
                        value={email} onChange={(e)=>{
                            setEmail(e.target.value);
                            
                        }}
                        required type='email' placeholder='email@example.com' />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base '
                        value={password} onChange={(e)=>{
                            setPassword(e.target.value);
                            
                        }}
                        required type='password' placeholder='password' />
                    <button className='bg-black text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base '>Login</button>

                </form>
                <p className='text-center'>Join a fleet? <Link to='/captain-signup'
                className='text-blue-600'>Register as a Captain</Link></p>
            </div>
            <div>
                <Link to="/login" className='bg-[#d5622dd4] flex items-center justify-center text-white font-medium mb-5 rounded px-4 py-2 w-full text-sm placeholder:text-base '>Sign in as User</Link>
            </div>
        </div>
  )
}

export default CaptainLogin