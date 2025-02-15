import React from "react";

const LocationSearchPanel = (props) => {
    console.log(props)

  const locations = [
    "Shri Laxmi Bhalaji Men's PG, Hitech City",
    "24B Near Kapoor's Cafe, Joint Mandi",
    "Near Apam Tiffin Zone, IT Park",
    "12X Near Tazeem's Bar, Vidhi Solution Tech",
  ];

  return (
    <div className="w-full max-w-md mx-auto">

      {locations.map((elem, index) => (
        <div
          key={index}
          onClick={()=>{
            props.setVehiclePanelOpen(true)
            props.setPanelOpen(false)
          }}
          className="flex items-center border p-3 rounded-lg my-2 gap-3 
            hover:bg-gray-100 cursor-pointer transition-all active:border-black">
          <div className="bg-gray-200 h-10 w-10 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-fill text-lg text-gray-700"></i>
          </div>
          <h4 className="text-gray-700 text-sm font-medium">{elem}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;
