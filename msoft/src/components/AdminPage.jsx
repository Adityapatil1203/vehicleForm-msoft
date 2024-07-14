import React, { useState, useEffect } from 'react';
import UserDetailModal from './UserDetailModal';
import { baseUrl } from '../const';
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/api/users`)
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

  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users');

    // Add headers
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Blood Group', key: 'bloodGroup', width: 15 },
      { header: 'Mobile', key: 'mobile', width: 15 },
      { header: 'From Station', key: 'fromStation', width: 20 },
      { header: 'To Station', key: 'toStation', width: 20 },
      { header: 'License No', key: 'licenseNo', width: 15 },
      { header: 'Vehicle No', key: 'vehicleNo', width: 15 },
      { header: 'Address', key: 'address', width: 25 },
      { header: 'Vehicle Model', key: 'vehicleModel', width: 20 },
      { header: 'Photo', key: 'photo', width: 15 }
    ];

    // Add rows
    for (const user of users) {
      const photoPath = `${baseUrl}/uploads/${user.photo}`;
      const row = worksheet.addRow({
        name: user.name,
        bloodGroup: user.bloodGroup,
        mobile: user.mobile,
        fromStation: user.fromStation,
        toStation: user.toStation,
        licenseNo: user.licenseNo,
        vehicleNo: user.vehicleNo,
        address: user.address,
        vehicleModel: user.vehicleModel,
      });

      // Add photo
      try {
        const response = await fetch(photoPath);
        const buffer = await response.arrayBuffer();
        const imageId = workbook.addImage({
          buffer: Buffer.from(buffer),
          extension: 'png',
        });

        worksheet.addImage(imageId, {
          tl: { col: 9, row: row.number - 1 },
          ext: { width: 80, height: 80 },
        });
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }

    // Write the workbook to a file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, 'Users.xlsx');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Page</h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleExport}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              {['Name', 'Blood Group', 'Mobile', 'From Station', 'To Station', 'License No', 'Vehicle No', 'Address', 'Vehicle Model'].map((header, index) => (
                <th key={index} className="py-3 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="cursor-pointer hover:bg-gray-100" onClick={() => handleUserClick(user)}>
                {['name', 'bloodGroup', 'mobile', 'fromStation', 'toStation', 'licenseNo', 'vehicleNo', 'address', 'vehicleModel'].map((field, index) => (
                  <td key={index} className="py-3 px-4 text-sm text-gray-700">
                    {user[field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <UserDetailModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AdminPage;
