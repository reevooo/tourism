import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';  // Import the Navbar component

const Protected = ({ children }) => {
  const token = localStorage.getItem('token');

  // If the token is not found, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the token exists, render the Navbar and children components
  return (
    <>
      <Navbar /> 
      {children}
    </>
  );
};

export default Protected;
