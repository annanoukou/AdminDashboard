import React from 'react';

const ShipmentCard = ({ shipment, onViewShipment }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800">{shipment.referenceName}</h2>
      <p className="text-gray-600"><strong>Status:</strong> {shipment.status}</p>
      <p className="text-gray-600"><strong>Destination:</strong> {shipment.destinationName}</p>
      <button
        onClick={onViewShipment}
        className="mt-4 bg-blue-500 text-white text-sm py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        View Shipment
      </button>
    </div>
  );
};

export default ShipmentCard;
