import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React from 'react';
const containerStyle = {
  width: '100%',
  height: '400px'
};
const defaultCenter = {
  lat: -23.55052,
  lng: -46.633308
};
interface MapProps {
  apiKey: string;
  vehicles: any[]; 
}
const MapComponent: React.FC<MapProps> = ({ apiKey, vehicles }) => {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
      >
        {vehicles.map((vehicle, index) => (
          <Marker
            key={index}
            position={{ lat: vehicle.latitude, lng: vehicle.longitude }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
export default MapComponent;