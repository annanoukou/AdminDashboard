import React from 'react';

const SubscriberItem = ({ subscriber, onRemove }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
    <p className="text-gray-700 overflow-hidden truncate w-64 max-w-full">{subscriber.email_address}</p>
    <button
      onClick={onRemove}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Remove
    </button>
  </div>
);

export default SubscriberItem;
