import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  FetchVehiclesParams,
  Vehicle,
  LocationVehicle,
} from '@/types/vehicle';

const API_BASE_URL = 'https://develop-back-rota.rota361.com.br';
const token = process.env.NEXT_PUBLIC_API_TOKEN;

interface APIResponse {
  content: {
    vehicles: Vehicle[];
    locationVehicles: LocationVehicle[];
    page: number;
    perPage: number | string;
    totalPages: number;
  };
}

interface ExtendedPaginatedVehiclesResponse {
  data: Vehicle[];
  locationVehicles: LocationVehicle[];
  pagina: number;
  porPagina: number;
  totalPaginas: number;
}

const fetchVehicles = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: [string, { type: string; filter?: string; perPage: number }];
}): Promise<ExtendedPaginatedVehiclesResponse> => {
  const [, params] = queryKey;
  const { type, filter, perPage } = params;

  const queryParams = new URLSearchParams();
  queryParams.append('type', type);
  queryParams.append('page', pageParam.toString());
  queryParams.append('perPage', perPage.toString());
  if (filter) queryParams.append('filter', filter);

  const response = await axios.get<APIResponse>(
    `${API_BASE_URL}/recruitment/vehicles/list-with-paginate?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const { vehicles, locationVehicles, page, perPage: perPageResp, totalPages } = response.data.content;

  return {
    data: vehicles,
    locationVehicles,
    pagina: page,
    porPagina: Number(perPageResp),
    totalPaginas: totalPages,
  };
};

export const useInfiniteVehicles = (
  params: Omit<FetchVehiclesParams, 'page'> & { perPage?: number }
) => {
  const perPage = params.perPage || 20;

  return useInfiniteQuery<ExtendedPaginatedVehiclesResponse, Error>(
    ['vehicles', { ...params, perPage }],
    ({ pageParam = 1, queryKey }) => fetchVehicles({ pageParam, queryKey }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.pagina < lastPage.totalPaginas ? lastPage.pagina + 1 : undefined,
      keepPreviousData: true,
    }
  );
};
