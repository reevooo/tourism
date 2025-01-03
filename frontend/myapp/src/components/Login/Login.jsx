import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom'; // استيراد Link من react-router-dom
import axios from 'axios';
import './Login.css'; // استيراد CSS الخاص بالصفحة
import { Helmet } from 'react-helmet';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Formik لتسجيل الدخول
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        // إرسال البيانات إلى API
        const response = await axios.post('https://explore-ksa-backend.vercel.app/apis/user/login', values);
        
        const { token } = response.data;

        // تخزين التوكن وتوجيه المستخدم
        localStorage.setItem('token', token);

        // Custom success toast
        toast.success('Login successful!', {
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
          <title>Login</title>
          <meta name="description" content="Login to access the system" />
       </Helmet>
      <div className="login-background">
        <div className="container d-flex justify-content-left align-items-center" style={{ minHeight: '100vh' }}>
          <div className="card p-4 shadow-lg" style={{ width: '600px', backgroundColor: 'white', borderRadius: '10px' }}>
            <form onSubmit={formik.handleSubmit}>
              {/* حقل Email */}
              <div className="mb-3">
                <h3 className='text-success text-center'>Login</h3>
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

              {/* رابط "هل لديك حساب بالفعل؟" و "نسيت كلمة المرور؟" */}
              
              <div className="mb-3 text-center fs-5">
                <Link to="/forgot-password" className="text-success" style={{textDecoration:"none"}}>Forget Password ?</Link> {/* رابط لـ نسيت كلمة المرور */}
              </div>

              {/* زر تسجيل الدخول */}
              <button type="submit" className="btn btn-primary w-100" style={{ borderRadius: "50px" }} disabled={loading}>
                {loading ? 'Loading...' : 'Login'}
              </button>
              <div className="my-3 text-center fs-5">
                <span className="text-dark">Have an Account ?</span> 
                <Link to="/signup" className="text-success mx-2" style={{textDecoration:"none"}}>Sign up</Link> {/* رابط لـ signup */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" />
    </div>
  );
}
