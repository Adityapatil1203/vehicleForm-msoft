// src/components/UserForm.js

import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    mobile: '',
    station: '',
    licenseNo: '',
    vehicleNo: '',
    vehicleName: '',
    vehicleModel: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
    <h2 className="text-2xl mb-4">User Form</h2>
    <div className="grid grid-cols-2 gap-4">
      {['name', 'bloodGroup', 'mobile', 'station', 'licenseNo', 'vehicleNo', 'vehicleName', 'vehicleModel'].map((field) => (
        <div key={field} className="mb-4">
          <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
            {field.replace(/([A-Z])/g, ' $1')}
          </label>
          <input
            type="text"
            id={field}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
      ))}
    </div>
    <div className="mb-4">
      <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
        Passport Size Photo
      </label>
      <input
        type="file"
        id="photo"
        name="photo"
        onChange={handleFileChange}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        required
      />
    </div>
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
      Submit
    </button>
  </form>
  
  );
};

export default UserForm;
