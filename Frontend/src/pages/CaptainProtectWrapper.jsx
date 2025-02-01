import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Redirect to login if no token is found
        if (!token) {
            navigate('/captain-login')
            return
        }

        // Fetch captain profile only if token exists
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
                    headers: {  // Fix header key
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    setCaptain(response.data.captain)
                }
            } catch (error) {
                console.error("Auth error:", error)
                localStorage.removeItem('token')
                navigate('/captain-login')
            } finally {
                setIsLoading(false)
            }
        }

        fetchProfile()
    }, [token, navigate, setCaptain]) // Fix dependencies

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}

export default CaptainProtectWrapper
