import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyList = ({ companies }) => {
    const navigate = useNavigate();

    const handleCompanyClick = (companyId) => {
      navigate(`/shipments/${companyId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
            <h1 className="text-5xl font-bold text-center mb-12 text-gray-800 font-sans">Companies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {companies.map((company) => (
                <div
                    key={company.companyId}
                    onClick={() => handleCompanyClick(company.companyId)}
                    className="bg-white cursor-pointer border-l-4 border-blue-500 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-1"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{company.name}</h2>
                    <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium text-gray-800">Registration Number:</span> {company.registrationNumber}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium text-gray-800">Country of Incorporation:</span> {company.countryOfIncorporation.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium text-gray-800">Business Type:</span> {company.businessType.replace('_', ' ')}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium text-gray-800">Address:</span> {`${company.addressStreet} ${company.addressStreetNumber}, ${company.addressCity} ${company.addressZipCode}, ${company.addressCountry.toUpperCase()}`}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium text-gray-800">Verified Date:</span> {new Date(company.verifiedDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">Created At:</span> {new Date(company.createdAt).toLocaleDateString()}
                    </p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default CompanyList;
