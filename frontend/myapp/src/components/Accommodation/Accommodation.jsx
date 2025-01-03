import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { DataContext } from '../../context/context.js';
import axios from 'axios';
import { Button, Spinner, Alert, Modal, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import {jwtDecode} from 'jwt-decode';

// Validation Schema using Yup
const AccommodationSchema = Yup.object().shape({
  touristName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone: Yup.string().required('Required'),
  accommodationPlace: Yup.string().required('Required'),
  accommodationType: Yup.string().required('Required'),
});

export default function Accommodation() {
  const {
    accommodationPlaces,
    accommodationTypes,
    fetchAccommodationData,
    selectedAccommodation,
    loading,
  } = useContext(DataContext);

  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingg, setLoadingg] = useState(false);

  const handleClose = () => setShowModal(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          setLoadingg(true);
          const decodedToken = jwtDecode(token);
          const userId = decodedToken?.id;

          const response = await axios.get(`https://explore-ksa-backend.vercel.app/apis/user/userdata/${userId}`);
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user data", error);
          setUser(null);
        } finally {
          setLoadingg(false);
        }
      } else {
        setUser(null);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <div className="container mt-4">
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Explore KSA HomePage" />
      </Helmet>
      <h2 className="my-3 text-center">Book Your Accommodation</h2>

      <Formik
        enableReinitialize
        initialValues={{
          touristName: user?.name || (loadingg ? 'loading...' : ''),
          email: user?.email || (loadingg ? 'loading...' : ''),
          phone: '',
          accommodationPlace: '',
          accommodationType: '',
        }}
        validationSchema={AccommodationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await axios.post('https://explore-ksa-backend.vercel.app/api/tourist-accommodation', values);
            setSubmitted(true);
            setShowModal(true);
            resetForm();
          } catch (error) {
            console.error("Error submitting form", error);
            setError("Failed to submit the form. Please try again later.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="touristName">Tourist Name</label>
                  <Field name="touristName" className="form-control" disabled />
                  <ErrorMessage name="touristName" component="div" className="text-danger" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="email" className="form-control" disabled />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <Field name="phone" className="form-control" />
                  <ErrorMessage name="phone" component="div" className="text-danger" />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="accommodationPlace">Accommodation Place</label>
                  <Field as="select" name="accommodationPlace" className="form-control" onChange={(e) => {
                    setFieldValue("accommodationPlace", e.target.value);
                    setError(null);
                    if (values.accommodationType) {
                      fetchAccommodationData(e.target.value, values.accommodationType).catch(err => {
                        setError("Failed to fetch accommodation details. Please check your selection.");
                      });
                    }
                  }}>
                    <option value="">Select a place</option>
                    {accommodationPlaces.map((place) => (
                      <option key={place} value={place}>
                        {place}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="accommodationPlace" component="div" className="text-danger" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="accommodationType">Accommodation Type</label>
                  <Field as="select" name="accommodationType" className="form-control" onChange={(e) => {
                    setFieldValue("accommodationType", e.target.value);
                    setError(null);
                    if (values.accommodationPlace) {
                      fetchAccommodationData(values.accommodationPlace, e.target.value).catch(err => {
                        setError("Failed to fetch accommodation details. Please check your selection.");
                      });
                    }
                  }}>
                    <option value="">Select a type</option>
                    {accommodationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="accommodationType" component="div" className="text-danger" />
                </div>
              </div>
            </div>

            {/* Carousel for images */}
            {selectedAccommodation?.images && selectedAccommodation.images.length > 0 && (
              <Carousel className="my-3">
                {selectedAccommodation.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image.url}
                      alt={`Slide ${index + 1}`}
                      style={{ maxHeight: '500px', objectFit: 'cover' }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}

            {/* Show loading spinner or selected accommodation details */}
            {loading ? (
              <Spinner animation="border" className="my-3" />
            ) : selectedAccommodation && (
              <div className="my-3">
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <iframe
                      src={selectedAccommodation.map.iframeUrl}
                      width={selectedAccommodation.map.width}
                      height={selectedAccommodation.map.height}
                      style={{
                        border: selectedAccommodation.map.style.border,
                      }}
                      allowFullScreen={selectedAccommodation.map.allowfullscreen}
                      loading={selectedAccommodation.map.loading}
                      referrerPolicy={selectedAccommodation.map.referrerpolicy}
                    ></iframe>
                  </div>
                  <div className="col-md-6 col-sm-12 mt-5">
                    <div className="text-center">
                      <h4>Accommodation Details</h4>
                      <p className="text-dark"><strong>Price Per Night:</strong> {selectedAccommodation.pricePerNight} SAR</p>
                      <p className="text-dark"><strong>Availability:</strong> {selectedAccommodation.availability ? 'Available' : 'Not Available'}</p>
                      <p className="text-dark"><strong>Contact Number:</strong> {selectedAccommodation.contactInfo}</p>
                      <p className="text-dark"><strong>Ratings:</strong> {selectedAccommodation.ratings} <FontAwesomeIcon icon={faStar} style={{ color: '#ffc107' }} /> </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error and submit button */}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            <Button type="submit" className="mt-3 d-block mx-auto w-100" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            {/* Success Modal */}
            <Modal show={showModal} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
              </Modal.Header>
              <Modal.Body>Form submitted successfully!</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
}
