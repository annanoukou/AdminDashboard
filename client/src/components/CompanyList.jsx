import React from 'react';
import { useData } from '../context/DataContext'; 
import { useNavigate } from 'react-router-dom';
import CompanyCard from './CompanyCard'; 

const CompanyList = () => {
  const { companies } = useData();
  const navigate = useNavigate();

  // Navigate to shipments page when a company is clicked
  const handleCompanyClick = (companyId) => {
    navigate(`/shipments/${companyId}`);
  };

  return (
    <div className="flex bg-gray-100 md:ml-64">
      {/* Main content */}
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex-1 p-8 transition-all">
        <h2 className="text-xl font-semibold mt-6 mb-4">
          Companies
        </h2>

        {/* Grid of companies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <CompanyCard 
              key={company.companyId} 
              company={company} 
              onClick={() => handleCompanyClick(company.companyId)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
