import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export const LocationCard = () => {
  const position = [4.545118, -75.680350]; 

  const styleMap = {
    height: '14rem',
    width: '14rem',
    border: 'solid 1px #000000',
    borderRadius: '20px',
    zIndex: 1
  }

  return (
    <MapContainer center={position} zoom={13} style={styleMap}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>Nuestra Ubicacion.</Popup>
      </Marker>
    </MapContainer>
  );
};
