import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // اضافة ملف CSS خارجي
import { Helmet } from 'react-helmet';

export default function Profile() {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',

  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true); // حالة تحميل البيانات
  const [isUpdating, setIsUpdating] = useState(false); // حالة تحميل زرار التحديث
  const [isDeleting, setIsDeleting] = useState(false); // حالة تحميل زرار الحذف
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const customerId = decoded.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`https://explore-ksa-backend.vercel.app/apis/user/userdata/${customerId}`);
       console.log(response.data);
        setCustomerData(response.data.user);
      } catch (error) {
        console.error('Error fetching customer details:', error);
      } finally {
        setIsLoadingData(false); // إيقاف التحميل بعد إحضار البيانات
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    if (window.confirm('Do you want to update your data?')) {
      setIsUpdating(true); // تعيين حالة التحميل لزرار التحديث فقط
      try {
        await axios.put(`https://explore-ksa-backend.vercel.app/apis/user/update/${customerId}`, customerData);
        setModalMessage('Your data has been updated successfully.');
      } catch (error) {
        setModalMessage('Failed to update your data. Please try again.');
      } finally {
        setIsUpdating(false); // إيقاف حالة التحميل لزرار التحديث
        setShowModal(true);
        setIsEditing(false); // إلغاء وضع التعديل بعد التحديث
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Do you want to delete your account?')) {
      setIsDeleting(true); // تعيين حالة التحميل لزرار الحذف فقط
      try {
        await axios.delete(`https://explore-ksa-backend.vercel.app/apis/user/userdelete/${customerId}`);
        localStorage.removeItem('token');
        navigate('/');
      } catch (error) {
        setModalMessage('Failed to delete your account. Please try again.');
        setShowModal(true);
      } finally {
        setIsDeleting(false); // إيقاف حالة التحميل لزرار الحذف
      }
    }
  };

  return (
    <div className="container profile-container mt-5">
       <Helmet>
                <title>Profile</title>
                <meta name="description" content="Manage your profile page." />
            </Helmet>
      {isLoadingData ? ( // عرض التحميل في حالة تحميل البيانات
        <div className="d-flex justify-content-center align-items-center" style={{ height: '75vh' }}>
          <i className="fas fa-spin fa-spinner fa-3x"></i>
        </div>
      ) : (
        <form className="profile-form">
          <div className="row mb-3">
            <div className="col-6 flex-container my-3 w-75">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={customerData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{ borderRadius: '50px' }}
              />
            </div>
            <div className="col-6 flex-container w-75">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={customerData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                style={{ borderRadius: '50px' }}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            {!isEditing ? (
              <button type="button" className="btn btn-primary" onClick={handleEditToggle} style={{ borderRadius: '50px' }}>
                update account?
              </button>
            ) : (
              <button type="button" className="btn btn-success" onClick={handleUpdate} disabled={isUpdating} style={{ borderRadius: '50px' }}>
                {isUpdating ? (
                  <>
                    <Spinner animation="border" size="sm" /> Updating...
                  </>
                ) : (
                  'Update Data'
                )}
              </button>
            )}
            <button type="button" className="btn btn-danger" onClick={handleDelete} disabled={isDeleting} style={{ borderRadius: '50px' }}>
              {isDeleting ? (
                <>
                  <Spinner animation="border" size="sm" /> Deleting...
                </>
              ) : (
                'Delete Account'
              )}
            </button>
          </div>
        </form>
      )}

      {/* Modal for success or error messages */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
