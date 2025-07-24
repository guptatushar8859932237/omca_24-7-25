import React, { useState, useEffect } from "react";
import Image from "../../img/logo-dark.png";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../Basurl/Baseurl";
import Swal from "sweetalert2";
export const ResetPassword = () => {
  
 
      const navigate = useNavigate();
  let location = useLocation()
  let data = location.state?.clienID
  const [clienID, setClientID] = useState(data)
  const [password, setpassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const handleResetpassword = (e) => {
    e.preventDefault();
 
    axios.post(`${baseurl}staff_reset_password/${clienID}`, {
      password: password,
      confirmPassword: confirmPassword

    }).then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: `${response.data.message}`,
            icon: "success",
            // You can optionally add other configurations here, like buttons
          });
              //  toast.success(response?.data?.message);
            navigate("/");
        }
    }).catch((error) => {
       toast.error(error?.response?.data?.message);
        // Swal.fire(
        //     "Error",
        //     `${error?.response?.data?.message}`,
        //     "error"
        // );

    });
}
  return (
    <>
      <div
        className="main-wrapper account-wrapper"
        style={{ minHeight: "100vh" }}
      >
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
                            <img src={Image} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <form className="form-signin">
                          <h3>Reset Password</h3>
                          <div className="form-group">
                            <label>Password</label>
                            <div className="custom-form-control">
                              <input
                                className="input input-alt"
                                autofocus=""
                                placeholder=""
                                required=""
                                type="text"
                                onChange={(e) => setpassword(e.target.value)}
                                value={password}
                                name="password"
                              />
                              <span className="input-border input-border-alt" />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Confirm Password</label>
                            <div className="custom-form-control">
                              <input
                                className="input input-alt"
                                autofocus=""
                                placeholder=""
                                required=""
                                type="text"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                name="confirmPassword"
                              />
                              <span className="input-border input-border-alt" />
                            </div>
                          </div>
                          <div className="form-group text-center">
                            <button
                              className="btn btn-primary account-btn"
                              type="submit"
                              onClick={handleResetpassword}
                            >
                              Reset Password
                            </button>
                          </div>
                          <div className="text-center register-link">
                            <NavLink to="/">Back to Login</NavLink>
                          </div>
                        </form>
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
    </>
  );
};
