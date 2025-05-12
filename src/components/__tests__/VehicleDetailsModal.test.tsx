import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import VehicleDetailsModal from '../VehicleDetailsModal';
import { Vehicle } from '@/types/vehicle';

const mockVehicle: Vehicle = {
  id: '1',
  plate: 'XYZ-5678',
  fleet: 'FROTA02',
  type: 'Carreta',
  model: 'Randon Select',
  nameOwner: 'Carlos Silva',
  status: 'Disponível',
  createdAt: '',
  ultimaPosicao: {
    lat: -23.60,
    lng: -46.68,
    dataHora: '2024-05-09T10:00:00Z',
  },
  nomeMotorista: 'Carlos Silva',
};

const mockOnClose = jest.fn();

describe("VehicleDetailsModal", () => {
  describe("when vehicle is provided", () => {
    beforeEach(() => {
      mockOnClose.mockClear();
      render(<VehicleDetailsModal vehicle={mockVehicle} onClose={mockOnClose} />);
    });

    it('renders vehicle details correctly', () => {
      expect(screen.getByText('Detalhes do Veículo')).toBeInTheDocument();
      expect(screen.getByText('XYZ-5678')).toBeInTheDocument();
      expect(screen.getByText('FROTA02')).toBeInTheDocument();
      expect(screen.getByText('Carreta')).toBeInTheDocument();
      expect(screen.getByText('Randon Select')).toBeInTheDocument();
      expect(screen.getByText('Disponível')).toBeInTheDocument();
      expect(screen.getByText('Carlos Silva')).toBeInTheDocument();
      expect(screen.getByText(/Lat: -23.6, Lng: -46.68/)).toBeInTheDocument();
      expect(screen.getByText(new Date('2024-05-09T10:00:00Z').toLocaleString())).toBeInTheDocument();

      expect(screen.getByText('Ver no Google Maps')).toHaveAttribute(
        'href',
        'https://www.google.com/maps?q=-23.6,-46.68'
      );
    });

    it('calls onClose when the close button (X) is clicked', () => {
      fireEvent.click(screen.getByText('×'));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when the Fechar button is clicked', () => {
      fireEvent.click(screen.getByText('Fechar'));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('renders nothing when vehicle is null', () => {
    const { container } = render(<VehicleDetailsModal vehicle={null} onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });
});
