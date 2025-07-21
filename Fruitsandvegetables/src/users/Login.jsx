import React from 'react';
import "./Users.css";
import MyImage from "../assets/images/form.jpg";
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';  // <-- import cookies

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: ''
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Name is required";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://192.168.29.136:8000/login", values);

        if (response.status === 200 && response.data.status === true) {
          toast.success("Login Successful!");

          // Store token in cookie (expires in 7 days)
          Cookies.set('token', response.data.token, { expires: 7 });

          // Redirect based on admin flag
          setTimeout(() => {
            if (response.data.admin === true) {
              navigate("/dashboard");
            } else {
              navigate("/user");
            }
          }, 2000);

        } else {
          toast.error(response.data.message || "Unknown error");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }
  });

  return (
    <>
      <ToastContainer />
      <div className='main'>
        <div className='left'>
          <img src={MyImage} alt="" />
        </div>
        <div className='right'>
          <div className="reg-form">

            <form onSubmit={formik.handleSubmit}>
              <h1>Login</h1>

              <label>Name</label>
              <input
                type='text'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && <div className="error">{formik.errors.name}</div>}

              <label>Password</label>
              <input
                type='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && <div className="error">{formik.errors.password}</div>}

              <button type='submit'>Login</button>

              <p
                onClick={() => navigate('/forgot')}
                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
              >
                Forgot Password
              </p>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
