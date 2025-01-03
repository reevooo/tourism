import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './ForgetPassword.css';
import { Helmet } from 'react-helmet';

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      currentPassword: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string().required('New password is required').min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.put('https://explore-ksa-backend.vercel.app/apis/user/change-password', values);
        
        toast.success('Password changed successfully!', {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        });

        setTimeout(() => {
          navigate('/login'); 
        }, 2000);
      } catch (error) {
        toast.error(`${error.response?.data?.message || error.message}`, {
          style: {
            backgroundColor: 'red',
            color: 'white',
          },
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg">
      <Helmet>
        <title>Change Password</title>
        <meta name="description" content="Change your password" />
      </Helmet>
      <div className="change-password-background">
        <div className="container d-flex justify-content-left align-items-center" style={{ minHeight: '100vh' }}>
          <div className="card p-4 shadow-lg" style={{ width: '600px', backgroundColor: 'white', borderRadius: '10px' }}>
            <form onSubmit={formik.handleSubmit}>
              <h3 className='text-success text-center'>Change Password</h3>
              
              <div className="form-group">
                <label htmlFor="email" className="text-dark py-2">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-control w-100 ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email ? <div className="invalid-feedback">{formik.errors.email}</div> : null}
              </div>

              <div className="form-group">
                <label htmlFor="currentPassword" className="text-dark py-2">Current Password</label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  className={`form-control w-100 ${formik.touched.currentPassword && formik.errors.currentPassword ? 'is-invalid' : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.currentPassword}
                  placeholder="Enter your current password"
                />
                {formik.touched.currentPassword && formik.errors.currentPassword ? <div className="invalid-feedback">{formik.errors.currentPassword}</div> : null}
              </div>

              <div className="form-group">
                <label htmlFor="newPassword" className="text-dark py-2">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  className={`form-control w-100 ${formik.touched.newPassword && formik.errors.newPassword ? 'is-invalid' : ''}`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  placeholder="Enter your new password"
                />
                {formik.touched.newPassword && formik.errors.newPassword ? <div className="invalid-feedback">{formik.errors.newPassword}</div> : null}
              </div>

              <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: "50px" }} disabled={loading}>
                {loading ? 'Loading...' : 'Change Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
