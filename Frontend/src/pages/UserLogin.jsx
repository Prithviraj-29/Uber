import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('')



    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className="w-16 mb-5" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
                <form>
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
                <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Accout</Link></p>
            </div>
            <div>
                <button className='bg-[#10b461] text-white font-medium mb-7 rounded px-4 py-2 w-full text-sm placeholder:text-base '>Sign in as Captain</button>
            </div>
        </div>
    )
}

export default UserLogin