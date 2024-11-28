import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ShipmentList = ({ shipments }) => {
  const { companyId } = useParams();
  const navigate = useNavigate();

  const companyShipments = shipments.filter(
    (shipment) => shipment.partnerCompanyId === companyId
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Shipments</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition ease-in-out duration-200"
          >
            Back to Homepage
          </button>
        </div>

        <div className="space-y-6">
          {companyShipments.map((shipment) => (
            <div key={shipment.shipmentId} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800">{shipment.referenceName}</h2>
              <p className="text-gray-600"><strong>Status:</strong> {shipment.status}</p>
              <p className="text-gray-600"><strong>Destination:</strong> {shipment.destinationName}</p>
              <button
                onClick={() => navigate(`/shipment/${shipment.shipmentId}`)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                View Shipment
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShipmentList;
