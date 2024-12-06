import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext'; 
import Sidebar from './components/Sidebar'; 
import Login from './screens/Login';
import Register from './screens/Register'; 
import AdminDashboard from './screens/AdminDashboard'; 
import UserDashboard from './screens/UserDashboard';
import CompanyList from './components/CompanyList';
import ShipmentList from './components/ShipmentList'; 
import ShipmentDetails from './components/ShipmentDetails'; 
import SubscribersList from './components/SubscribersList'; 
import HamburgerButton from './components/HamburgerButton'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle login and store user token and role
  const handleLogin = (role, token) => {
    setIsAuthenticated(true);
    setRole(role);
    localStorage.setItem('authToken', token);
  };

  // Handle logout and remove token from storage
  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('authToken'); 
    document.cookie = 'authToken=; Max-Age=0; path=/'; // Clear cookie
  };

  // Check authentication status when the app loads
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      
      if (!storedToken) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/api/check-auth', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setRole(data.role); 
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <DataProvider>
        <div className="flex h-screen">
          {/* Show Sidebar for admin role and authenticated users */}
          {isAuthenticated && role === 'admin' && (
            <>
              <HamburgerButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}/>

              {/* Sidebar */}
              <Sidebar 
                onLogout={handleLogout} 
                isSidebarOpen={isSidebarOpen} 
                onClose={() => setIsSidebarOpen(false)} 
              />
            </>
          )}

          {/* Main content */}
          <div className="flex-1">
            <Routes>
              {!isAuthenticated ? (
                <>
                  <Route path="/login" element={<Login onLogin={handleLogin} />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                </>
              ) : role === 'admin' ? (
                <>
                  {/* Admin-specific routes */}
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/companies" element={<CompanyList />} />
                  <Route path="/subscribers" element={<SubscribersList />} />
                  <Route path="/shipments/:companyId" element={<ShipmentList />} />
                  <Route path="/shipment/:shipmentId" element={<ShipmentDetails />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  {/* User-specific routes */}
                  <Route path="/" element={<UserDashboard onLogout={handleLogout} />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              )}
            </Routes>
          </div>
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;
