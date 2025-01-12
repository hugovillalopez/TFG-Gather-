import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({direccion}) => {
  const [location, setLocation] = useState({ lat: -34.397, lng: 150.644 });
  const [address, setAddress] = useState('');
  const [Mapa, setMapa] = useState(false);
  
  const geocodeAddress = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        setLocation({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  const getDirectionsUrl = () => { 
    const encodedAddress = encodeURIComponent(address); 
    return `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`; 
    };

    useEffect(() =>{
      if (direccion) {
        setAddress(direccion)
      }
     

    },[direccion])

  return (
    <div>
      {/*<input
        type="text" name="lugar" className={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none focus:border-2 border-2 ring-orange-100 placeholder-red-500`}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Introduce la dirección"
      />*/}
      <div className='flex items-center justify-center'>
        <button onClick={() =>{if(direccion){ geocodeAddress(); setMapa(true)}}} className="flex items-center h-8 m-2 p-5 text-md font-bold text-gray-800 bg-orange-400 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100">Buscar</button>
        {address && Mapa &&  
        <a href={getDirectionsUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-8 w-40 m-4 py-5 text-md font-bold text-gray-800 bg-orange-400 border border-orange-600 rounded-xl hover:bg-orange-100 hover:text-orange-400 hover:border-orange-100"> Como Llegar </a> 
        
        }
      </div>
      
      {Mapa && 
        <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%' }}
          center={location}
          zoom={8}
        >
          <Marker position={location} />
        </GoogleMap>
      }
      
    </div>
  );
};

export default MapComponent;
