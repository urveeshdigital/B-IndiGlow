import React, { useState } from "react";
import "./Users.css";
import MyImage from "../assets/images/form.jpg";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import url from "../Config"

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ✅ Step 1

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) errors.name = "Required";

      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) errors.password = "Required";

      if (!values.cpassword) {
        errors.cpassword = "Required";
      } else if (values.cpassword !== values.password) {
        errors.cpassword = "Passwords must match";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        setLoading(true); // ✅ Step 2
        const response = await axios.post(`${url}/register`, values);
        
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate("/emailverify");
        }, 2000);
      } catch (err) {
        toast.error(err.response?.data?.message || "Registration failed", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error("Error occurred:", err.message);
      } finally {
        setLoading(false); // ✅ Step 3
      }
    }
  });

  return (
    <>
      <ToastContainer />
      <div className="main">
        <div className="left">
          <img src={MyImage} alt="form" />
        </div>
        <div className="right">
          <div className="reg-form">

            <form onSubmit={formik.handleSubmit}>
              <h1>Register</h1>

              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && <div className="error">{formik.errors.name}</div>}

              <label>Email</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && <div className="error">{formik.errors.email}</div>}

              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && <div className="error">{formik.errors.password}</div>}

              <label>Confirm Password</label>
              <input
                type="password"
                name="cpassword"
                onChange={formik.handleChange}
                value={formik.values.cpassword}
              />
              {formik.errors.cpassword && <div className="error">{formik.errors.cpassword}</div>}

              <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"} {/* ✅ Step 4 */}
              </button>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
