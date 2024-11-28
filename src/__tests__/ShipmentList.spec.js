import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShipmentList from './ShipmentList';

const mockShipments = [
  {
    shipmentId: '1',
    referenceName: 'B09_01',
    status: 'IN PROGRESS',
    partnerCompanyId: '1',
    destinationName: 'Nav SA',
  },
  {
    shipmentId: '2',
    referenceName: 'B09_02',
    status: 'DRAFT',
    partnerCompanyId: '1',
    destinationName: 'Beta EV',
  },
];

describe('ShipmentList', () => {
  test('renders shipments for a specific company and navigates to shipment details page', () => {
    render(
      <Router>
        <ShipmentList shipments={mockShipments} />
      </Router>
    );

    expect(screen.getByText('B09_01')).toBeInTheDocument();
    expect(screen.getByText('B09_02')).toBeInTheDocument();

    fireEvent.click(screen.getByText('B09_01'));

    expect(window.location.pathname).toBe('/shipment/1');
  });
});
