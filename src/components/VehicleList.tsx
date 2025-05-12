import React, { useState, useEffect } from "react";
import { useInfiniteVehicles } from "@/hooks/useInfiniteVehicles";
import VehicleListItem from "./VehicleListItem";
import { Vehicle } from "@/types/vehicle"; 
import MapComponent from "./MapComponent";
import VehicleDetailsModal from "./VehicleDetailsModal"; 
import { useInView } from "react-intersection-observer";

const GOOGLE_MAPS_API_KEY = "AIzaSyD1j0HFT57vXWso34ZBaqC7_Uct1nR0Y3c";

interface LocationVehicle {
  id: string;
  plate: string;
  fleet: string;
  lat: number;
  lng: number;
  ignition: string;
  createdAt: string;
  name: string;
}

const VehicleList: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("tracked");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const { ref, inView } = useInView();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteVehicles({
    type: vehicleType,
    filter: filter.trim() === "" ? undefined : filter.trim(),
    perPage: 20,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);
 

  
  const allVehicles: Vehicle[] = data?.pages.flatMap(page => page?.data ?? []) || [];
  const allLocations: LocationVehicle[] = data?.pages.flatMap(page => page?.locationVehicles ?? []) || [];
  console.log ('AQUI', allLocations)

  const handleVehicleSelect = (vehicle: Vehicle) => setSelectedVehicle(vehicle);
  const handleCloseModal = () => setSelectedVehicle(null);

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <span className="text-lg font-semibold">Lista</span>
          <div className="flex items-center">
            <input
              type="radio"
              id="tracked"
              name="vehicleType"
              value="tracked"
              checked={vehicleType === "tracked"}
              onChange={() => setVehicleType("tracked")}
              className="mr-2"
            />
            <label htmlFor="tracked" className="mr-4 cursor-pointer">Rastreados</label>
            <input
              type="radio"
              id="others"
              name="vehicleType"
              value="others"
              checked={vehicleType === "others"}
              onChange={() => setVehicleType("others")}
              className="mr-2"
            />
            <label htmlFor="others" className="cursor-pointer">Outros</label>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar por placa ou frota"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
          />
          <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded text-white">Buscar</button>
          <button className="p-2 bg-green-600 hover:bg-green-700 rounded text-white">Novo</button>
        </div>
      </div>

      <div className="mb-6">
        <MapComponent 
          apiKey={GOOGLE_MAPS_API_KEY} 
          vehicles={allLocations} 
          onMarkerClick={(loc) => {
            const match = allVehicles.find(v => v.plate === loc.plate && v.id === loc.id);
            if (match) {
              setSelectedVehicle(match);
            } else {
              setSelectedVehicle({
                id: loc.id,
                plate: loc.plate,
                fleet: loc.fleet,
                model: 'Desconhecido',
                status: 'Desconhecido',
                nameOwner: loc.name,
                type: 'vehicle',
                createdAt: loc.createdAt,
              });
            }
          }
        }
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Placa</th>
              <th className="px-4 py-3 text-left font-semibold">Frota</th>
              <th className="px-4 py-3 text-left font-semibold">Tipo</th>
              <th className="px-4 py-3 text-left font-semibold">Modelo</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="text-center py-4">Carregando veículos...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-red-500">Erro ao carregar veículos: {error.message}</td>
              </tr>
            )}
            {!isLoading && !error && allVehicles.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4">Nenhum veículo encontrado.</td>
              </tr>
            )}
            {!isLoading && !error && allVehicles.map((vehicle: Vehicle) => (
              <VehicleListItem 
                key={vehicle.id || vehicle.plate} 
                vehicle={vehicle} 
                onVehicleSelect={handleVehicleSelect} 
              />
            ))}
          </tbody>
        </table>
      </div>

      {hasNextPage && (
        <div ref={ref} className="text-center py-4">
          {isFetchingNextPage ? "Carregando mais..." : ""}
        </div>
      )}
      {!hasNextPage && !isLoading && allVehicles.length > 0 && (
        <div className="text-center py-4">Não há mais veículos para carregar.</div>
      )}

      <VehicleDetailsModal vehicle={selectedVehicle} onClose={handleCloseModal} />
    </div>
  );
};

export default VehicleList;
