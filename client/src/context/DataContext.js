import React, { createContext, useState, useEffect, useContext } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [shipmentDetails, setShipmentDetails] = useState([]);
  const [subscribers, setSubscribers] = useState([]);

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

  useEffect(() => {
    // Fetch the subscribers from the backend API
    const fetchSubscribers = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/subscribers');
        if (response.ok) {
          const data = await response.json();
          setSubscribers(data);
        }
      } catch (error) {
        console.error('Error fetching subscribers', error);
      }
    };

    fetchSubscribers();
  }, []);

  return (
    <DataContext.Provider
      value={{
        companies,
        shipments,
        shipmentDetails,
        subscribers,
        setSubscribers,
        setCompanies,
        setShipments,
        setShipmentDetails,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
