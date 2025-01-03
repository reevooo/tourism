import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use react-router-dom for navigation
import { Helmet } from 'react-helmet'; // For setting the page's metadata

export default function NotFoundPage() {
  const navigate = useNavigate(); // Replaces useRouter

  return (
    <div style={styles.container}>
      <Helmet>
        <title>Not Found Page</title>
        <meta name="description" content="NotFound page" />
      </Helmet>
      <h1 style={styles.header}>404 - Page Not Found</h1>
      <p style={styles.text}>It looks like you're lost in the bank's system.</p>
      <p style={styles.text}>
        Don't worry, let's get you back to safety.
      </p>
      <button 
        style={styles.button}
        onClick={() => navigate('/')} // Use navigate to go to the home page
      >
        Back to Home
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    textAlign: 'center',
  },
  header: {
    fontSize: '36px',
    color: '#dc3545',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    color: '#6c757d',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
