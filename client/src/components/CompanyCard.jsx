import React from 'react';

const CompanyCard = ({ company, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white cursor-pointer rounded-md p-6 shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{company.name}</h2>

      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium text-gray-800">Registration Number:</span> {company.registrationNumber}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium text-gray-800">Country of Incorporation:</span> {company.countryOfIncorporation.toUpperCase()}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium text-gray-800">Business Type:</span> {company.businessType.replace('_', ' ')}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium text-gray-800">Address:</span> {`${company.addressStreet} ${company.addressStreetNumber}, ${company.addressCity} ${company.addressZipCode}, ${company.addressCountry.toUpperCase()}`}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-medium text-gray-800">Verified Date:</span> {new Date(company.verifiedDate).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium text-gray-800">Created At:</span> {new Date(company.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default CompanyCard;
