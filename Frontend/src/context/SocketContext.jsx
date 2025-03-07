import React, {createContext , useEffect} from 'react';
import {io} from 'socket.io-client';

export const socketContext = createContext()

const socket = io(`${import.meta.env.VITE_BASE_URL}`)

const socketProvider = ({children}) =>{
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log('connected to server')
        })
        socket.on('disconnect',()=>{
            console.log('Disconnected from server')
        })
    },[])

    return (
        <socketContext.Provider value={{socket}}>
            {children}
        </socketContext.Provider>
    )
}
export default socketProvider