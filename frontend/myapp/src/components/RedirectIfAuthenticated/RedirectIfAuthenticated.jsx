// RedirectIfAuthenticated.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }) => {
  const token = localStorage.getItem('token');

  // If the token exists, redirect to the home page
  if (token) {
    return <Navigate to="/HomePage" replace />;
  }

  // If there is no token, render the children (i.e., login or signup)
  return children;
};

export default RedirectIfAuthenticated;
