// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserForm from './components/UserForm';
import AdminPage from './components/AdminPage';
import PasswordForm from './components/PasswordForm';
import { adminpassword } from './const';
import { baseUrl } from './const';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handlePasswordSubmit = (password, navigate) => {
    // Replace with your authentication logic
    if (password === adminpassword) {
      setAuthenticated(true);
      navigate('/admin'); // Navigate to admin page if password is correct
    } else {
      alert('Incorrect password. Please try again.');
      setAuthenticated(false);
    }
  };

  const handleFormSubmit = async (formData) => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
  console.log("form ",formData);
    const response = await fetch(`${baseUrl}/api/users`, {
      method: 'POST',
      body: data,
    });

    if (response.ok) {
      alert('User added successfully!');
    } else {
      alert('Failed to add user.');
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Show UserForm by default on root path */}
          <Route path="/" element={<UserForm onSubmit={handleFormSubmit} />} />

          {/* Route to handle password submission and navigation */}
          <Route
            path="/admin"
            element={!authenticated ? <PasswordForm onPasswordSubmit={handlePasswordSubmit} /> : <AdminPage />}
          />

          {/* Redirect to home if route not found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
