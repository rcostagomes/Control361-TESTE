import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FetchVehiclesParams, PaginatedVehiclesResponse, Vehicle, LocationVehicle } from '@/types/vehicle';

const API_BASE_URL = 'https://develop-back-rota.rota361.com.br';
const token = process.env.NEXT_PUBLIC_API_TOKEN;

const fetchVehicles = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: [string, { type: string; filter?: string; perPage: number }];
}): Promise<PaginatedVehiclesResponse> => {
  const [, params] = queryKey;
  const { type, filter, perPage } = params;

  const queryParams = new URLSearchParams();
  queryParams.append('type', type);
  queryParams.append('page', pageParam.toString());
  queryParams.append('perPage', perPage.toString());
  if (filter) queryParams.append('filter', filter);

  const response = await axios.get(`${API_BASE_URL}/recruitment/vehicles/list-with-paginate?${queryParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const content = response.data.content;

  return {
    data: content.vehicles as Vehicle[],
    locationVehicles: content.locationVehicles as LocationVehicle[],
    pagina: content.page,
    porPagina: Number(content.perPage),
    totalPaginas: content.totalPages,
  };
};

export const useInfiniteVehicles = (
  params: Omit<FetchVehiclesParams, 'page'> & { perPage?: number }
) => {
  return useInfiniteQuery<PaginatedVehiclesResponse, Error>(
    ['vehicles', { ...params, perPage: params.perPage || 20 }],
    ({ pageParam = 1, queryKey }) => fetchVehicles({ pageParam, queryKey }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.pagina < lastPage.totalPaginas ? lastPage.pagina + 1 : undefined,
      keepPreviousData: true,
    }
  );
};
