// src/components/PasswordForm.js

import React, { useState } from 'react';

const PasswordForm = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPasswordSubmit(password);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Enter Password to Access Admin:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        required
      />
      <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default PasswordForm;
