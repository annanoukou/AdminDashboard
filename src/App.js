import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompanyList from './components/CompanyList';
import ShipmentList from './components/ShipmentList';
import ShipmentDetails from './components/ShipmentDetails';

function App() {
  const [companies, setCompanies] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [shipmentDetails, setShipmentDetails] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const companiesResponse = await fetch('/data/companies.json');
      const shipmentsResponse = await fetch('/data/shipments.json');
      const details1Response = await fetch('/data/shipments_details_1.json');
      const details2Response = await fetch('/data/shipments_details_2.json');

      const companiesData = await companiesResponse.json();
      const shipmentsData = await shipmentsResponse.json();
      const details1Data = await details1Response.json();
      const details2Data = await details2Response.json();

      setCompanies(companiesData);
      setShipments(shipmentsData);

      const allDetails = [...details1Data, ...details2Data];
      setShipmentDetails(allDetails);
    };

    loadData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompanyList companies={companies} />} />
        <Route path="/shipments/:companyId" element={<ShipmentList shipments={shipments} />} />
        <Route
          path="/shipment/:shipmentId"
          element={<ShipmentDetails shipments={shipments} shipmentDetails={shipmentDetails} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
