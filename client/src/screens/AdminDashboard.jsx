import React from 'react';
import { useData } from '../context/DataContext';

const AdminDashboard = () => {
  const { companies, shipments, subscribers } = useData();

  const totalCompanies = companies.length;
  const totalShipments = shipments.length;
  const pendingSubscribers = subscribers.filter((subscriber) => subscriber.status === 'subscribed').length;

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <div className="flex-1 p-4 md:ml-64">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Companies</h3>
            <p className="text-3xl">{totalCompanies}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Total Shipments</h3>
            <p className="text-3xl">{totalShipments}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Pending Subscribers</h3>
            <p className="text-3xl">{pendingSubscribers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
