import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VehicleListItem from '../VehicleListItem';
import { Vehicle } from '@/types/vehicle';

const mockVehicle: Vehicle = {
  id: '1',
  plate: 'ABC-1234',
  fleet: 'FROTA01',
  type: 'Motor',
  model: 'F-MAX Select',
  status: 'Em viagem',
  createdAt: '',
  ultimaPosicao: { lat: -23.55, lng: -46.63 },
};

const mockOnVehicleSelect = jest.fn();

describe('VehicleListItem', () => {
  beforeEach(() => {
    render(<VehicleListItem vehicle={mockVehicle} onVehicleSelect={mockOnVehicleSelect} />);
  });

  it('renders vehicle data correctly', () => {
    expect(screen.getByText('ABC-1234')).toBeInTheDocument();
    expect(screen.getByText('FROTA01')).toBeInTheDocument();
    expect(screen.getByText('Motor')).toBeInTheDocument();
    expect(screen.getByText('F-MAX Select')).toBeInTheDocument();
    expect(screen.getByText('Em viagem')).toBeInTheDocument();
  });

  it('calls onVehicleSelect when clicked', () => {
    fireEvent.click(screen.getByText('ABC-1234').closest('tr')!);
    expect(mockOnVehicleSelect).toHaveBeenCalledWith(mockVehicle);
  });
});
