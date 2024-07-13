// src/components/AdminPage.js

import React, { useState, useEffect } from 'react';
import UserDetailModal from './UserDetailModal';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl mb-4">Admin Page</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {['Name', 'Blood Group', 'Mobile', 'Station', 'License No', 'Vehicle No', 'Vehicle Name', 'Vehicle Model'].map((header) => (
              <th key={header} className="py-2 px-4 border-b border-gray-200 bg-gray-100">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="cursor-pointer" onClick={() => handleUserClick(user)}>
              {['name', 'bloodGroup', 'mobile', 'station', 'licenseNo', 'vehicleNo', 'vehicleName', 'vehicleModel'].map((field) => (
                <td key={field} className="py-2 px-4 border-b border-gray-200">
                  {user[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AdminPage;
