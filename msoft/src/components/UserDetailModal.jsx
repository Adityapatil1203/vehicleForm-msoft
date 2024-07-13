// src/components/UserDetailModal.js

import React from 'react';

const UserDetailModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        <img src={`/uploads/${user.photo}`} alt="User Photo" className="mb-4 w-32 h-32 object-cover" />
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
        <p><strong>Mobile Number:</strong> {user.mobile}</p>
        <p><strong>Station Name:</strong> {user.station}</p>
        <p><strong>License Number:</strong> {user.licenseNo}</p>
        <p><strong>Vehicle Number:</strong> {user.vehicleNo}</p>
        <p><strong>Vehicle Name:</strong> {user.vehicleName}</p>
        <p><strong>Vehicle Model:</strong> {user.vehicleModel}</p>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white p-2 rounded-md">Close</button>
      </div>
    </div>
  );
};

export default UserDetailModal;
