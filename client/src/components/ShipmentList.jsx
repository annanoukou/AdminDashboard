import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext'; 
import ShipmentCard from './ShipmentCard'; 

const ShipmentList = () => {
  const { shipments } = useData(); 
  const { companyId } = useParams();
  const navigate = useNavigate();

  // Filter shipments by company ID
  const companyShipments = shipments.filter(
    (shipment) => shipment.partnerCompanyId === companyId
  );

  return (
    <div className="flex bg-gray-100 md:ml-64">
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex-1 p-8 transition-all">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold mt-6 mb-4">
              Shipments
            </h2>
            <button
              onClick={() => navigate('/companies')}
              className="bg-indigo-600 text-white py-2 text-sm px-6 rounded-lg shadow-lg hover:bg-indigo-700 transition ease-in-out duration-200"
            >
              Back to Companies
            </button>
          </div>

          {/* List of shipments */}
          <div className="space-y-6">
            {companyShipments.length === 0 ? (
              <p>No shipments available for this company.</p>
            ) : (
              companyShipments.map((shipment) => (
                <ShipmentCard 
                  key={shipment.shipmentId} 
                  shipment={shipment} 
                  onViewShipment={() => navigate(`/shipment/${shipment.shipmentId}`)} 
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentList;
