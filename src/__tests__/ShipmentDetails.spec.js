import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ShipmentDetails from './ShipmentDetails';

const mockShipments = [
  {
    shipmentId: '1',
    referenceName: 'B09_01',
    status: 'IN PROGRESS',
    departureName: 'Beta EV',
    destinationName: 'Nav SA',
    plannedDeparture: '2024-01-09T22:00:00.000Z',
    plannedDestination: '2024-01-10T22:00:00.000Z',
  },
];

const mockShipmentDetails = [
  {
    shipmentId: '1',
    lat: 41.552745,
    lng: 2.182736,
    temperature: [
      { t: 1680153027900, v: 10.92 },
      { t: 1680154247000, v: 10.84 },
    ],
    humidity: [
      { t: 1680153027900, v: 68 },
      { t: 1680154247000, v: 69 },
    ],
  },
];

describe('ShipmentDetails', () => {
  test('renders shipment details and charts when shipment is IN PROGRESS', () => {
    render(
      <Router>
        <ShipmentDetails shipments={mockShipments} shipmentDetails={mockShipmentDetails} />
      </Router>
    );

    expect(screen.getByText('Reference: B09_01')).toBeInTheDocument();
    expect(screen.getByText('Status: IN PROGRESS')).toBeInTheDocument();

    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
  });

  test('shows "Shipment details are only available for "IN PROGRESS" shipments" when status is DRAFT', () => {
    mockShipments[0].status = 'DRAFT';

    render(
      <Router>
        <ShipmentDetails shipments={mockShipments} shipmentDetails={mockShipmentDetails} />
      </Router>
    );

    expect(screen.getByText('Shipment details are only available for "IN PROGRESS" shipments.')).toBeInTheDocument();
  });
});
