# Admin Dashboard

This is a **Admin Dashboard** project built with **React**, **Tailwind CSS**, and **Chart.js**. It is designed to manage and track shipments, displaying details like the shipment status, geolocation, and charts for temperature and humidity when the shipment is in progress.

## Features

- **Company List**: Displays a list of companies, with the ability to navigate to a shipment list for each company.
- **Shipment List**: Displays shipments associated with a company, with details such as reference, status, departure, and destination.
- **Shipment Details**: Provides detailed information about a shipment, including temperature and humidity charts when the shipment is "In Progress", and a message when the status is "Draft".
- **Navigation**: Intuitive navigation between components like Company List, Shipment List, and Shipment Details.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Chart.js**: A popular charting library for visualizing data, used here for temperature and humidity data.
- **React Router**: For managing routing and navigation between different views.
- **Jest** and **React Testing Library**: For writing and running unit and integration tests.

## Setup and Installation

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/shipment-dashboard.git
cd shipment-dashboard```

### 2. Install Dependencies

Run the following command to install the project dependencies:

```bash
npm install```

### 3. Start the Development Server

To run the application locally, use the following command:

```bash
npm start```
This will start the development server, and you can access the application in your browser at http://localhost:3000.

### 4. Run Tests

To run the test suite, use the following command:

```bash
npm test```



## Key Features to Highlight

- **Responsive Design**: The dashboard is designed to be responsive, ensuring a good user experience on both mobile and desktop devices.
- **Tailwind CSS**: A utility-first CSS framework is used to rapidly build custom designs.
- **Chart.js**: Visual representation of shipment data using interactive charts for temperature and humidity.
- **Routing**: The project uses React Router to navigate between different views, including Company List, Shipment List, and Shipment Details.
- **Error Handling**: Proper error handling for missing shipment data, including appropriate fallback messages.
- **Unit Testing**: The project includes tests for the components using Jest and React Testing Library to ensure proper functionality.

## Known Issues

- **Data Handling**: Some shipment data, like geolocation, might not always be available.
- **Chart Data**: In some cases, chart data might not render properly if the data points are missing or null.

## Future Improvements

- **User Authentication**: Implement user login and authentication to provide role-based access to the dashboard.
- **Pagination**: Add pagination to the shipment lists for better performance when dealing with a large number of entries.
- **Data Fetching**: Instead of using hardcoded data, implement API calls to fetch real shipment data.
