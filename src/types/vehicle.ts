export interface Vehicle {
  id: string;
  plate: string;
  fleet: string | null;
  type: string;
  model: string;
  nameOwner: string;
  status: string;
  createdAt: string;
}

export interface LocationVehicle {
  id: string;
  plate: string;
  fleet: string;
  equipmentId: string;
  name: string;
  ignition: string;
  lat: number;
  lng: number;
  createdAt: string;
}

export interface FetchVehiclesParams {
  type: string;
  filter?: string;
  page?: number;
  perPage?: number;
}

export interface PaginatedVehiclesResponse {
  data: Vehicle[];
  locationVehicles: LocationVehicle[];
  pagina: number;
  porPagina: number;
  totalPaginas: number;
}
