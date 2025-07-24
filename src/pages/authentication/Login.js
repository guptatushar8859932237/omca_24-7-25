import React, { useState } from "react";
import image from "../assets/img/logo-dark.png";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const error = { ...formError };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    switch (name) {
      case "email":
        if (!value) {
          error.email = "Please enter the email";
        } else if (!emailRegex.test(value)) {
          error.email = "Please enter a valid email address";
        } else {
          error.email = "";
        }
        break;

      case "password":
        if (!value) {
          error.password = "Please enter the password";
        } else {
          error.password = "";
        }
        break;

      default:
        break;
    }

    setFormError(error);
  };

  const validate = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const error = { ...formError };
    if (!form.email) {
      isValid = false;
      error.email = "Please enter the email";
    } else if (!emailRegex.test(form.email)) {
      error.email = "Please enter a valid email address";
      isValid = false;
    } else {
      error.email = "";
    }
    if (!form.password) {
      isValid = false;
      error.password = "Please enter the password";
    } else {
      error.password = "";
    }

    setFormError(error);

    return isValid;
  };
  const submitdata = (e) => {
    e.preventDefault();

    if (validate()) {
    }
  };
  return (
    <>
      <div className="main-wrapper account-wrapper">
        <div className="account-page">
          <div className="account-center">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-10">
                  <div className="account-box">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="account-logo">
                          <a href="index.html">
                            <img src={image} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <form action="#" className="form-signin">
                          <h3>Admin</h3>
                          <div className="form-group">
                            <label>Username or Email</label>
                            <div className="custom-form-control">
                              <input
                                className="input input-alt"
                                autoFocus=""
                                placeholder=""
                                required=""
                                type="text"
                                autoComplete="username"
                                value={form.email}
                                onChange={handleChange}
                                name="email"
                              />
                              <span className="input-border input-border-alt" />
                              <span className="formerrors">
                                {formError.email}
                              </span>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Password</label>
                            <div className="custom-form-control">
                              <input
                                className="input input-alt"
                                placeholder=""
                                required=""
                                type="password"
                                autoComplete="current-password"
                                value={form.password}
                                onChange={handleChange}
                                name="password"
                              />
                              <span className="input-border input-border-alt" />
                              <span className="formerrors">
                                {formError.password}
                              </span>
                            </div>
                          </div>
                          <div
                            className="form-group text-right"
                            style={{ textAlign: "right" }}
                          >
                            <NavLink to="Forgot">Forgot your password?</NavLink>
                          </div>
                          <div className="form-group text-center">
                            <button
                              type="submit"
                              className="btn btn-primary account-btn"
                              onClick={submitdata}
                            >
                              Login
                            </button>
                          </div>
                          {/* <div class="text-center register-link">
                                          Don't have an account? <a href="register.html">Register Now</a>
                                      </div> */}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
