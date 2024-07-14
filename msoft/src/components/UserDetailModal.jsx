import React from 'react';

const UserDetailModal = ({ user, onClose }) => {
  // Assuming your backend server is running on http://localhost:5000
  const backendURL = 'http://localhost:5000';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 sm:p-0">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full sm:w-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">User Details</h2>
        <div className="flex justify-center mb-6">
          <img
            src={`${backendURL}/uploads/${user.photo}`}
            alt="User Photo"
            className="w-32 h-32 object-cover rounded-full border-4 border-gray-200 shadow-sm"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
          <p><strong>Mobile Number:</strong> {user.mobile}</p>
          <p><strong>From Station:</strong> {user.fromStation}</p>
          <p><strong>To Station:</strong> {user.toStation}</p>
          <p><strong>License Number:</strong> {user.licenseNo}</p>
          <p><strong>Vehicle Number:</strong> {user.vehicleNo}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p className="sm:col-span-2"><strong>Vehicle Model:</strong> {user.vehicleModel}</p>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-md transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
