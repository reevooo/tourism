import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // استيراد CSS الخاص بالصفحة الترحيبية
import { Helmet } from 'react-helmet';

export default function WelcomePage() {
  return (
    <div className="welcome-container d-flex justify-content-center align-items-center">
      <Helmet>
        <title>Tourist Guide of Saudi Arabia</title>
        <meta name="description" content="Explore the beauty and culture of Saudi Arabia" />
      </Helmet>
      <div className="text-center">
        <h1 className="mb-4">Welcome To explore  KSA Tourism</h1>
        <p className="lead mb-5">Discover the hidden gems and wonders of the Kingdom. Your journey begins here!</p>
        <div className="buttons d-flex justify-content-center">
          <Link to="/login" className="btn btn-primary custom-btn me-3">Login</Link>
          <Link to="/signup" className="btn btn-primary custom-btn">Signup</Link>
        </div>
      </div>
    </div>
  )
}
