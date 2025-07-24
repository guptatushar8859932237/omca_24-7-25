import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from '../../reducer/LoginSlice';
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import logoDark from '../../img/logo-dark.png'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles

export function AdminLogin(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [hide, setHide] = useState(false);
  const toggle = () => {
    setHide((prev) => !prev);
  };
  // Key Fixes
  // Formik Wrapping:

  // The Formik component now correctly wraps the form using its children function.
  // The form JSX is placed inside {({ isSubmitting }) => (...)}.
  // Formik Props:

  // Correctly pass initialValues, validationSchema, and onSubmit as props to Formik.
  // Submit Button:

  // Disabled the button while isSubmitting or loading to prevent multiple submissions.
  // Error Handling:

  // Added ErrorMessage components to display validation errors.
  const passwordRules = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/  
;
  const basicSchema = Yup.object().shape({
    email: Yup.string().matches(passwordRules, "Please enter a valid email").required("Required"),
    password: Yup.string().required("Required").oneOf([Yup.ref('password'), null]).max(20, 'Passwords should not exceed 20 characters.'),
  });

  useEffect(() => {
    if (user) {
      Swal.fire({
        title: "Login successful",
        text: `Welcome, ${user.details.role || "Admin"}!`,
        icon: "success",
      });
      localStorage.setItem("email", user.details.email);
      localStorage.setItem("_id", user.details._id);
      localStorage.setItem("token", user.token);
      localStorage.setItem("loginTime", user.loginTime);
      localStorage.setItem("token_expire_time", user.token_expire_time);
      localStorage.setItem("permissionArray", user.permissions);
      localStorage.setItem("Role", user.details.role);
      localStorage.setItem("name", user.details.name);

      navigate("/Dashboard");
    }
  }, [user, navigate]);
console.log(localStorage.getItem("permissionArray"))
  return (
    <div className="main-wrapper account-wrapper" style={{ minHeight: "100vh" }}>
      <div className="account-page">
        <div className="account-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="account-box">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="account-logo">
                        <a >
                          <img src={logoDark} alt="" />
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={basicSchema}
                        // setSubmitting: A function provided by Formik to track the submit state.
                        // onSubmit={(values, { setSubmitting }) => {
                        //   dispatch(loginUser(values));
                        //   setSubmitting(false);
                        // }}
                        onSubmit={async (values, { setSubmitting }) => {
                          try {
                            const result = await dispatch(loginUser(values)).unwrap();
                            
                            
                          } catch (err) {
                            console.log(err)
                            toast.error(err?.message);
                            // Swal.fire("Error!",  `${err?.message}`|| err?.message, "error");
                          }
                          setSubmitting(false);
                        }}
                      >
                        {({ isSubmitting }) => (
                          <Form className="form-signin">
                            <h3> Login</h3>
                            <div className="form-group">
                              <label>Username or Email</label>
                              <div className="custom-form-control">
                                <Field
                                  className="input input-alt"
                                  placeholder="Enter your email"
                                  type="text"
                                  name="email"
                                />
                                <span className="input-border input-border-alt"></span>
                                <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                              </div>
                            </div>
                            <div className="form-group" style={{ position: "relative" }}>
                              <label>Password</label>
                              <div className="custom-form-control">
                                <Field
                                  type={!hide ? "password" : "text"}
                                  {...props}
                                  className="input input-alt"
                                  placeholder="Enter your password"

                                  name="password"
                                />
                                <span className="input-border input-border-alt"></span>
                                <ErrorMessage name="password" component="div" style={{ color: "red" }} />
                              </div>
                              <span
                              className="icon"
                              onClick={toggle}
                              style={{
                                position: "absolute",
                                top: "70%",
                                right: "12px",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                color: "#rgb(23 14 14)",
                              }}
                            >
                              {hide ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </span>
                            </div>
                             
                            <div className="form-group text-right">
                              <NavLink to="Forgot">Forgot your password?</NavLink>
                            </div>
                            <div className="form-group text-center">
                              <button
                                type="submit"
                                className="btn btn-primary account-btn"
                                disabled={isSubmitting || loading}
                              >
                                {loading ? "Logging in..." : "Login"}
                              </button>
                            </div>
                            {/* {error && <p>Error: {error ? "invalid credentials" : null}</p>} */}
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
