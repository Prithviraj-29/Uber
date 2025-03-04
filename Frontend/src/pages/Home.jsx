import React, { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import debounce from "lodash/debounce";
import mapimg from '../images/uber-map.png';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { Link } from 'react-router-dom';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare,setFare] =useState({})

  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  // Debounced API Fetch
  const fetchSuggestions = async (input, setSuggestions) => {
    if (!input.trim()) {
      setSuggestions([]); // Clear suggestions if input is empty
      return;
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Debounce API calls for performance
  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 500), []);

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);
    debouncedFetchSuggestions(value, setPickupSuggestions);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    debouncedFetchSuggestions(value, setDestinationSuggestions);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  // GSAP Animations
  useGSAP(() => {
    gsap.to(panelRef.current, { height: panelOpen ? '70%' : '0%' });
    gsap.to(panelCloseRef.current, { opacity: panelOpen ? 1 : 0 });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, { transform: vehiclePanelOpen ? 'translateY(0)' : 'translateY(100%)' });
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, { transform: confirmRidePanel ? 'translateY(0)' : 'translateY(100%)' });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, { transform: vehicleFound ? 'translateY(0)' : 'translateY(100%)' });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, { transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)' });
  }, [waitingForDriver]);

  async function findTrip() {
    try {
      setPanelOpen(false);
      setVehiclePanelOpen(true);
  
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Authentication token is missing");
        return;
      }
  
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/get-fare`, {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        console.log(response.data);
        setFare(response.data);
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error fetching fare:", error.response ? error.response.data : error.message);
  
      // Show an alert or message to the user if needed
      alert("Failed to fetch fare. Please try again.");
    }
  }
  

  return (
    <div className='h-screen relative'>
      <img className='w-20 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />

      <div className='h-screen w-screen'>
        <img className='h-full object-cover w-full' src={mapimg} alt="Map" />
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full rounded-t-xl'>
        <div className='bg-white p-6 h-[35%] relative'>
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute opacity-0 top-7 right-6 text-2xl'>
            <i className="ri-arrow-down-wide-fill"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form onSubmit={submitHandler}>
            <div className='line absolute h-15 w-1 top-[40%] bg-black rounded-full left-11'></div>

            <input
              onClick={() => { setPanelOpen(true); setActiveField('pickup'); }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type="text"
              placeholder='Enter pick-up location'
            />


            <input
              onClick={() => { setPanelOpen(true); setActiveField('destination'); }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'
              type="text"
              placeholder='Where to?'
            />
            <button  className='bg-black text-white px-3 text-sm py-2 rounded-lg mt-3 w-full'
              onClick={findTrip}>
              Find a Trip
            </button>

          </form>


        </div>

        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />

        </div>
      </div>

      <div ref={vehiclePanelRef} className='fixed z-10 bottom-0 translate-y-full p-3 bg-white w-full py-10 px-3 pt-14'>
        <VehiclePanel fare ={fare} setVehiclePanelOpen={setVehiclePanelOpen} setConfirmRidePanel={setConfirmRidePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed z-10 bottom-0 translate-y-full p-3 bg-white w-full py-10 px-3 pt-14'>
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={vehicleFoundRef} className='fixed z-10 bottom-0 translate-y-full p-3 bg-white w-full py-10 px-3 pt-14'>
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className='fixed z-10 bottom-0 p-3 bg-white w-full py-10 px-3 pt-14'>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
