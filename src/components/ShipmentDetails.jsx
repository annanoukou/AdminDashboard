import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Chart from './Chart';

const ShipmentDetails = ({ shipments, shipmentDetails }) => {
  const { shipmentId } = useParams();
  const navigate = useNavigate();

  const shipment = shipments.find((s) => s.shipmentId === shipmentId);
  const shipmentDetail = shipmentDetails.find((detail) => detail.shipmentId === shipmentId);

  if (!shipment) return <p>Shipment not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Shipment Details</h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition ease-in-out duration-200"
          >
            Back to Shipments
          </button>
        </div>

        {/* Shipment Information Card */}
        {shipment.status === 'IN PROGRESS' && shipmentDetail ? (
          <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-gray-600"><strong>Reference:</strong> {shipment.referenceName}</p>
                <p className="text-gray-600"><strong>Status:</strong> {shipment.status}</p>
                <p className="text-gray-600"><strong>Departure:</strong> {shipment.departureName}</p>
                <p className="text-gray-600"><strong>Destination:</strong> {shipment.destinationName}</p>
                <p className="text-gray-600"><strong>Planned Departure:</strong> {new Date(shipment.plannedDeparture).toLocaleString()}</p>
                <p className="text-gray-600"><strong>Planned Destination:</strong> {new Date(shipment.plannedDestination).toLocaleString()}</p>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600"><strong>Location:</strong> {shipmentDetail ? `Lat: ${shipmentDetail.lat}, Lng: ${shipmentDetail.lng}` : 'Not Available'}</p>
                <p className="text-gray-600"><strong>Verified On:</strong> {new Date(shipment.verifiedDate).toLocaleString()}</p>
                <p className="text-gray-600"><strong>Created On:</strong> {new Date(shipment.createdAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Temperature and Humidity Charts */}
        {shipment.status === 'IN PROGRESS' && shipmentDetail ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <Chart data={shipmentDetail.temperature} title="Temperature" />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <Chart data={shipmentDetail.humidity} title="Humidity" />
            </div>
          </div>
        ) : null}

        {/* For DRAFT Status */}
        {shipment.status === 'DRAFT' && (
          <div className="bg-white p-8 rounded-lg shadow-xl mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
            <p className="text-gray-600">Shipment details are only available for "IN PROGRESS" shipments.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentDetails;
