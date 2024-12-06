import React from 'react';

const Message = ({ message, messageType }) => (
  <p
    className={`mb-4 mt-4 ${messageType === 'success' ? 'text-green-600' : 'text-red-600'} text-md`}
  >
    {message}
  </p>
);

export default Message;
