import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useMemo } from 'react';

const containerStyle = {
  width: '100%',
  height: '400px',
};

interface LocationVehicle {
  id: string;
  plate: string;
  fleet: string;
  lat: number;
  lng: number;
  ignition: string;
  createdAt: string;
  name: string;
  equipmentId?: string;
}

interface MapComponentProps {
  apiKey: string;
  vehicles: LocationVehicle[];
  onMarkerClick?: (vehicle: LocationVehicle) => void;
}

const iconList = [
  '/black.png', '/blue.png', '/blue2.png', '/blue3.png', '/brown.png',
  '/green.png', '/orange.png', '/pink.png', '/purple.png', '/red.png',
  '/red2.png', '/white.png', '/yellow.png',
];

const getIconByPlate = (plate: string): string => {
  const index = Math.abs(plate.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % iconList.length;
  return iconList[index];
};

const MapComponent: React.FC<MapComponentProps> = ({ apiKey, vehicles, onMarkerClick }) => {
  const center = useMemo(() => {
    const firstValid = vehicles.find(v => !isNaN(Number(v.lat)) && !isNaN(Number(v.lng)));
    return firstValid
      ? { lat: Number(firstValid.lat), lng: Number(firstValid.lng) }
      : { lat: -14.235, lng: -51.9253 }; // fallback centro do Brasil
  }, [vehicles]);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        {vehicles.map((v, index) => {
          const lat = Number(v.lat);
          const lng = Number(v.lng);
          if (isNaN(lat) || isNaN(lng)) return null;

          const iconUrl = getIconByPlate(v.plate);
          return (
            <Marker
              key={`${v.id}-${v.plate}-${v.equipmentId}-${index}`}
              position={{ lat, lng }}
              icon={{
                url: iconUrl,
                scaledSize: new window.google.maps.Size(36, 36),
              }}
              title={`Placa: ${v.plate} - Frota: ${v.fleet || 'N/A'}`}
              onClick={() => onMarkerClick?.(v)}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
