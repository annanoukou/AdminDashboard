import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext'; 
import Chart from './Chart';

const ShipmentDetails = () => {
  const { shipments, shipmentDetails } = useData();
  const { shipmentId } = useParams();
  const navigate = useNavigate();

  const shipment = shipments.find((s) => s.shipmentId === shipmentId);
  const shipmentDetail = shipmentDetails.find((detail) => detail.shipmentId === shipmentId);

  if (!shipment) return <p>Shipment not found.</p>;

  return (
    <div className="flex bg-gray-100 md:ml-64">
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex-1 p-8 transition-all">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold mt-6 mb-4">
              Shipment Details
            </h2>
            <button
              onClick={() => navigate(-1)}
              className="bg-indigo-600 text-white text-sm py-2 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition ease-in-out duration-200"
            >
              Back to Shipments
            </button>
          </div>

          {/* Shipment Information Card */}
          {shipment.status === 'IN PROGRESS' && shipmentDetail ? (
            <div className="bg-white p-8 rounded-lg shadow-xl mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Overview</h2>
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
          {shipment.status === 'IN PROGRESS' && shipmentDetail && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-xl">
                <Chart data={shipmentDetail.temperature} title="Temperature" />
              </div>
              <div className="bg-white p-8 rounded-lg shadow-xl">
                <Chart data={shipmentDetail.humidity} title="Humidity" />
              </div>
            </div>
          )}

          {/* For DRAFT Status */}
          {shipment.status === 'DRAFT' && (
            <div className="bg-white p-8 rounded-lg shadow-xl mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
              <p className="text-gray-600">Shipment details are only available for "IN PROGRESS" shipments.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetails;
