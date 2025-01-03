import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom'; // استيراد Link من react-router-dom
import axios from 'axios';
import './Signup.css'; // استيراد CSS الخاص بالصفحة
import { Helmet } from 'react-helmet';

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Formik لتسجيل الدخول
  const formik = useFormik({
    initialValues: {
      name : '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // إرسال البيانات إلى API
        const response = await axios.post('https://explore-ksa-backend.vercel.app/apis/user/signup', values);
        
        const { token } = response.data;

        // تخزين التوكن وتوجيه المستخدم
        localStorage.setItem('token', token);
        console.log('====================================');
        console.log('token',localStorage.getItem('token'));
        console.log('====================================');
        // Custom success toast
        toast.success('Sign up successful!', {
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        });

        setTimeout(() => {
          navigate('/HomePage'); // إعادة التوجيه إلى صفحة dashboard
        }, 2000);
      } catch (error) {
        // Custom error toast
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
          <title>Sign up</title>
          <meta name="description" content="Sign up  to access the system" />
       </Helmet>
      <div className="signup-background">
        <div className="container d-flex justify-content-left align-items-center" style={{ minHeight: '100vh' }}>
          <div className="card p-4 shadow-lg" style={{ width: '600px', backgroundColor: 'white', borderRadius: '10px' }}>
            <form onSubmit={formik.handleSubmit}>
              {/* حقل Email */}
              <div className="mb-3">
                <h3 className='text-success text-center'>Sign Up</h3>
                <div className="form-group">
                  <label htmlFor="name" className="text-dark py-2">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="name"
                    className={`form-control w-100 ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="Enter your name"
                  />
                  {formik.touched.name && formik.errors.name ? <div className="invalid-feedback">{formik.errors.name}</div> : null}
                </div>
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
              </div>

              {/* حقل Password */}
              <div className="mb-4">
                <div className="form-group">
                  <label htmlFor="password" className="text-dark py-2">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`form-control w-100 ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Enter your password"
                  />
                  {formik.touched.password && formik.errors.password ? <div className="invalid-feedback">{formik.errors.password}</div> : null}
                </div>
              </div>

              {/* زر تسجيل الدخول */}
              <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: "50px" }} disabled={loading}>
                {loading ? 'Loading...' : 'Sign Up'}
              </button>
              <div className="my-3 text-center fs-5">
                <span className="text-dark">Already have an account ?</span> 
                <Link to="/login" className="text-success mx-2" style={{textDecoration:"none"}}>Login</Link> {/* رابط لـ signup */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
}
