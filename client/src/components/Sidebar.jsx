import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Sidebar = ({ onLogout, isSidebarOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-6 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0 z-50' : '-translate-x-full'
      }`} // Increased z-index when open
    >
      {/* Header and Navigation Links */}
      <div>
        <h2 className="text-xl font-bold mb-6">
          <Link to="/">Admin Dashboard</Link>
        </h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/companies" className="text-lg hover:text-gray-300">
                View Companies
              </Link>
            </li>
            <li className="mb-4">
              <Link to="/subscribers" className="text-lg hover:text-gray-300">
                View Subscribers
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Full-Width Logout Button */}
      <div>
        <LogoutButton onLogout={onLogout} />
      </div>

      {/* Close Button for Mobile */}
      <button
        className="absolute top-4 right-4 text-white md:hidden"
        onClick={onClose}
      >
        ✖
      </button>
    </div>
  );
};

export default Sidebar;
