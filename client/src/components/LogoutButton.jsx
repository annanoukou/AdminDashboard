import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies
      });

      if (response.ok) {
        onLogout(); // Notify parent component
        navigate('/login'); // Redirect to login screen
      } else {
        console.error('Failed to logout');
      }
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
