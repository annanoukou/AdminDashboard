import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import SubscriberItem from './SubscriberItem';
import Message from './Message'; 

const SubscribersList = () => {
  const { subscribers, setSubscribers } = useData(); // Get subscribers from context
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Handle removing a subscriber
  const handleRemoveSubscriber = async (email) => {
    try {
      const response = await fetch('http://localhost:4000/api/subscribers/delete', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Subscriber removed successfully');
        setMessageType('success');
        // Update subscribers list without refreshing
        setSubscribers((prevSubscribers) =>
          prevSubscribers.filter((subscriber) => subscriber.email_address !== email)
        );
      } else {
        setMessage('Failed to remove subscriber');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred while removing the subscriber');
      setMessageType('error');
    } finally {
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 3000);
    }
  };

  return (
    <div className="flex bg-gray-100 md:ml-64">
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex-1 p-8 transition-all">

        <h2 className="text-xl font-semibold mt-6 mb-4">
          Subscribers Waiting to List Their Companies
        </h2>

        {/* Message component for feedback */}
        {message && <Message message={message} messageType={messageType} />}

        <div className="space-y-4">
          {/* Display a message if no subscribers are available */}
          {subscribers.length === 0 ? (
            <p>No subscribers found.</p>
          ) : (
            subscribers
              .filter((subscriber) => subscriber.status === 'subscribed')
              .map((subscriber, i) => (
                <SubscriberItem
                  key={i}
                  subscriber={subscriber}
                  onRemove={() => handleRemoveSubscriber(subscriber.email_address)}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscribersList;
