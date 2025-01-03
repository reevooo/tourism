import React, { useContext, useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Modal, Table, Spinner } from 'react-bootstrap';
import { DataContext } from '../../context/context.js'; // Import the context
import axios from 'axios';
import {jwtDecode} from "jwt-decode"; // Import jwt-decode
import { Helmet } from 'react-helmet';

export default function TouristItineraries() {
  const { destinations } = useContext(DataContext); // Get destinations from context
  const [user, setUser] = useState(null); // Local state for user
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message

  const token = localStorage.getItem('token'); // Get the token from localStorage

  // Fetch user data based on token
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          setLoading(true);
          const decodedToken = jwtDecode(token); // Decode the token to get user ID
          const userId = decodedToken?.id;

          // Fetch user data
          const response = await axios.get(`https://explore-ksa-backend.vercel.app/apis/user/userdata/${userId}`);
          setUser(response.data.user); // Set user data in local state
        } catch (error) {
          console.error("Error fetching user data", error);
          setUser(null); // Clear user data on error
        } finally {
          setLoading(false); // Stop loading spinner
        }
      } else {
        setUser(null); // Clear user data if no token
      }
    };

    fetchUserData();
  }, [token]); // Trigger this effect when token changes

  const initialValues = {
    destinations: '',
    startDate: '',
    endDate: '',
    notes: ''
  };

  const validationSchema = Yup.object({
    destinations: Yup.string().required('Destination is required'),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date().required('End Date is required'),
    notes: Yup.string().required('Notes are required')
  });

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true); // Show loading spinner
    try {
      const token = localStorage.getItem('token'); // Get token
      const response = await axios.post(
        'https://explore-ksa-backend.vercel.app/api/itineraries',
        {
          userId: user.data._id, // Use user ID from local state
          destinations: values.destinations,
          startDate: values.startDate,
          endDate: values.endDate,
          notes: values.notes
        }
      );

      if (response.status === 201) {
        setModalMessage('Itinerary created successfully!');
      } else {
        setModalMessage('Failed to create itinerary.');
      }
      setShowModal(true);
      resetForm();
    } catch (error) {
      console.error("Error creating itinerary:", error.response ? error.response.data : error.message);
      setModalMessage(error.response?.data?.message || 'Error creating itinerary.');
      setShowModal(true);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>TouristItineraries</title>
        <meta name="description" content="Explore KSA TouristItineraries" />
      </Helmet>
      <h2 className="text-center text-dark mt-3">Tourist Itineraries</h2>

      {/* Loading Spinner */}
      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {/* Hide form and data when loading */}
      {!loading && (
        <>
          {/* User info (outside Formik to not be included in form submission) */}
          {user ? (
            <Table striped bordered hover className='my-3 text-center'>
              <thead>
                <tr>
                  <th>Tourist Name</th>
                  <th>Tourist Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                </tr>
              </tbody>
            </Table>
          ) : (
            <p className="text-center text-dark">Loading Tourist data....</p>
          )}

          {/* Formik form for itinerary */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <BootstrapForm.Group controlId="destinations" className='my-3'>
                  <BootstrapForm.Label>Destination</BootstrapForm.Label>
                  <Field as="select" name="destinations" className="form-control">
                    <option value="">Select a destination</option>
                    {destinations.map((destination) => (
                      <option key={destination._id} value={destination._id}>
                        {destination.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="destinations" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="startDate" className='my-3'>
                  <BootstrapForm.Label>Start Date</BootstrapForm.Label>
                  <Field type="date" name="startDate" className="form-control" />
                  <ErrorMessage name="startDate" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="endDate" className='my-3'>
                  <BootstrapForm.Label>End Date</BootstrapForm.Label>
                  <Field type="date" name="endDate" className="form-control" />
                  <ErrorMessage name="endDate" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="notes" className='my-3'>
                  <BootstrapForm.Label>Notes</BootstrapForm.Label>
                  <Field as="textarea" name="notes" className="form-control " />
                  <ErrorMessage name="notes" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting} className='d-block mx-auto w-100 my-2'>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </>
      )}

      {/* Modal for success/failure messages */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Itinerary Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} className='w-100'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
