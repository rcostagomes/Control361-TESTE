import React from 'react';
import { Vehicle } from '@/types/vehicle';

interface ExtendedVehicle extends Vehicle {
  nomeMotorista?: string;
  ultimaPosicao?: {
    lat: number;
    lng: number;
    dataHora?: string;
  };
}

interface VehicleDetailsModalProps {
  vehicle: ExtendedVehicle | null;
  onClose: () => void;
}

const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  const googleMapsUrl = vehicle.ultimaPosicao
    ? `https://www.google.com/maps?q=${vehicle.ultimaPosicao.lat},${vehicle.ultimaPosicao.lng}`
    : '#';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Detalhes do Veículo</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        <div>
          <p className="mb-2"><strong className="font-semibold text-gray-300">Placa:</strong> {vehicle.plate}</p>
          <p className="mb-2"><strong className="font-semibold text-gray-300">Frota:</strong> {vehicle.fleet ?? 'Não informada'}</p>
          <p className="mb-2"><strong className="font-semibold text-gray-300">Tipo:</strong> {vehicle.type}</p>
          <p className="mb-2"><strong className="font-semibold text-gray-300">Modelo:</strong> {vehicle.model}</p>
          <p className="mb-2"><strong className="font-semibold text-gray-300">Status:</strong> {vehicle.status}</p>
          {vehicle.nomeMotorista && (
            <p className="mb-2"><strong className="font-semibold text-gray-300">Motorista:</strong> {vehicle.nomeMotorista}</p>
          )}
          {vehicle.ultimaPosicao && (
            <>
              <p className="mb-2">
                <strong className="font-semibold text-gray-300">Última Posição:</strong> Lat: {vehicle.ultimaPosicao.lat}, Lng: {vehicle.ultimaPosicao.lng}
              </p>
              {vehicle.ultimaPosicao.dataHora && (
                <p className="mb-4">
                  <strong className="font-semibold text-gray-300">Data/Hora Posição:</strong> {new Date(vehicle.ultimaPosicao.dataHora).toLocaleString()}
                </p>
              )}
              <a 
                href={googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out"
              >
                Ver no Google Maps
              </a>
            </>
          )}
        </div>
        <button 
          onClick={onClose} 
          className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded transition duration-150 ease-in-out"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;
