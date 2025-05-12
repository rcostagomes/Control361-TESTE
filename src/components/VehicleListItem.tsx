import React from 'react';
import { Vehicle } from '@/types/vehicle';

interface VehicleListItemProps {
  vehicle: Vehicle;
  onVehicleSelect: (vehicle: Vehicle) => void; 
}

const VehicleListItem: React.FC<VehicleListItemProps> = ({ vehicle, onVehicleSelect }) => {
  return (
    <tr 
      className="transition-all duration-200 cursor-pointer hover:bg-white/5 hover:backdrop-blur-sm rounded-xl"
      onClick={() => onVehicleSelect(vehicle)} 
    >
      <td className="px-4 py-3 whitespace-nowrap rounded-l-xl bg-white/5 text-white">{vehicle.plate}</td>
      <td className="px-4 py-3 whitespace-nowrap bg-white/5 text-white">{vehicle.fleet}</td>
      <td className="px-4 py-3 whitespace-nowrap bg-white/5 text-white">{vehicle.type}</td>
      <td className="px-4 py-3 whitespace-nowrap bg-white/5 text-white">{vehicle.model}</td>
      <td className="px-4 py-3 whitespace-nowrap rounded-r-xl bg-white/5 text-white">{vehicle.status}</td>
    </tr>
  );
};

export default VehicleListItem;
