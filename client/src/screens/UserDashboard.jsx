import React, { useState } from 'react';
import LogoutButton from '../components/LogoutButton';
import Message from '../components/Message';

const UserDashboard = ({ onLogout }) => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email_address: email,
      merge_fields: { COMPANY: companyName },
      status: 'subscribed',
    };

    try {
      const response = await fetch('http://localhost:4000/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage('Thank you! We will get in touch with you soon.');
        setMessageType('success');
        setCompanyName('');
        setEmail('');
      } else {
        setMessage('Subscription failed. Please try again later.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-100">
      {/* Logout Button at Top Right */}
      <div className="absolute top-4 right-4">
        <LogoutButton onLogout={onLogout} />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard!</h1>
        <p className="text-gray-700 mb-6">
          Subscribe your company and we will get in touch with you via email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="company">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your company name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Subscribe
          </button>
        </form>

        {/* Message Component */}
        <Message message={message} messageType={messageType} />
      </div>
    </div>
  );
};

export default UserDashboard;
