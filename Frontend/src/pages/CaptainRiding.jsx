import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import mapimg from '../images/uber-map.png';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FinishRide from '../components/FinishRide';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);

    // Animate ride panel
    useGSAP(() => {
        gsap.to(finishRidePanelRef.current, {
            transform: finishRidePanel ? 'translateY(0)' : 'translateY(100%)',
            duration: 0.5,
            ease: 'power2.inOut'
        });
    }, [finishRidePanel]);

    return (
        <div className='h-screen'>
            {/* Header */}
            <div className='fixed top-0 flex p-3 justify-center items-center w-screen'>
                <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
                <Link to='/home' className='fixed right-2 top-2 h-10 w-10 flex justify-center items-center bg-white rounded-full'>
                    <i className="font-medium text-lg ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* Map Image */}
            <div className='h-4/5'>
                <img className='h-full object-cover w-full' src={mapimg} alt="Map" />
            </div>

            {/* Ride Info Panel */}
            <div
                className='h-1/5 p-6 bg-yellow-400 flex justify-between items-center relative'
                onClick={() => setFinishRidePanel(true)}>
                <h5 className='p-1 text-center w-[90%] absolute top-0'>
                    <i className="text-3xl text-gray-800 ri-arrow-up-wide-fill"></i>
                </h5>

                <h4 className='text-xl font-semibold'>4 Km away</h4>
                <button
                    className='bg-green-600 text-white rounded-lg px-10 p-3 font-semibold'
                    onClick={() => setFinishRidePanel(true)}>
                    Complete Ride
                </button>
            </div>

            {/* Ride Completion Panel */}
            <div
                ref={finishRidePanelRef}
                className='fixed w-full h-screen z-10 bottom-0 bg-white px-3 py-10 pt-12'>
                <FinishRide setFinishRidePanel={setFinishRidePanel}/>
            </div>
        </div>
    );
};

export default CaptainRiding;
