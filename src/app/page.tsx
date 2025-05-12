"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import VehicleList from '@/components/VehicleList';
const queryClient = new QueryClient();
export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-gray-900 text-white">
        {}
        <header className="p-4 bg-gray-800 shadow-md">
          <h1 className="text-xl font-semibold">Rodrigo Gomes Costa</h1>
        </header>
        <VehicleList />
      </main>
    </QueryClientProvider>
  );
}