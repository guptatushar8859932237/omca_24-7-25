  import React, { useState } from 'react'
import Image from "../../img/logo-dark.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../Basurl/Baseurl";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import styles
export const Forgot = () => {
  const navigate = useNavigate();
  const [forgotErr, setForgotErr] = useState(false);
  const [email, setEmail] = useState("")
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const handlsubmint = (e) => {
    e.preventDefault();
    if (email == "") {
      setForgotErr(true);
    } else {
      setForgotErr(false);
      axios.post(`${baseurl}staff_forget_pass_otp`, {
        email: email
      }).then((response) => {

        console.log(response)
        if (response.status === 200) {
          // Swal.fire(
            toast.success(error?.response?.data?.message);
          //   `${response.data.message}`,
          //   "You clicked the button!",
          //   "success"
          // );
          console.log(response.data.data)
          navigate("/opt", { state: { email: response.data.data} });
        }
      }).catch((error) => {
        toast.error(error?.response?.data?.message);
        // Swal.fire(
        //   "Error",
        //   `${error?.response?.data?.message}`,
        //   "error"
        // );

      })
    }

  }
  const submitdata = (e) => {
    e.preventDefault();
  };
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
                          <div>
                            <img src={Image} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <form className="form-signin">
                          <h3>Forgot Password</h3>
                          <div className="form-group">
                            <label>Enter Your Email</label>
                            <div className="custom-form-control">
                              <input
                                className="input input-alt"
                                autofocus=""
                                placeholder=""
                                required=""
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type="email"
                              />
                              <span style={{ color: "red" }}>
                                {error.isError
                                  ? error.errors?.response?.data?.message
                                  : " "}
                              </span>
                              {/* <span className="input-border input-border-alt" /> */}
                            </div>
                          </div>
                          <div className="form-group text-center">
                            <button
                              className="btn btn-primary account-btn"
                              type="submit"
                              onClick={handlsubmint}
                            >
                               Submit
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
      </div>
          <ToastContainer />
    </>
  );
};
