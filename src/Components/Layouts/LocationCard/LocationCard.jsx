import React from 'react';
import './LocationCard.css';
import MapaArmenia from '../../../assets/imagenes/MapaArmenia.png'

export const LocationCard = () => {

  const location = {
    lat: 4.545118,
    lon:   -75.680350, 
  };

  return (
    <div className="location-card">
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lon}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className='location-image'>
        <img
          src={MapaArmenia}
          alt="Ubicación en el mapa"
          className="location-image"
        />
        </div>
      </a>
    </div>
  );
};
