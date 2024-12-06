import React from 'react';

const InputField = ({ id, label, value, onChange, type, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
