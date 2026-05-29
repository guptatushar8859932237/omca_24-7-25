import React, { useState, useEffect } from "react";
import Image from "../../img/logo-dark.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { baseurl } from "../../Basurl/Baseurl";
import { ToastContainer, toast } from "react-toastify";

export const AuthOpt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state.email);
  const [maskedEmail, setMaskedEmail] = useState(email);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState({
    error: {},
    isarray: false,
  });

  // Mask the email using useEffect
  useEffect(() => {
    const emailParts = email.split("@");
    if (emailParts.length === 2) {
      const localPart = emailParts[0];
      const domainPart = emailParts[1];

      const maskedLocalPart =
        localPart.length > 4
          ? "*".repeat(localPart.length - 4) + localPart.slice(-4)
          : localPart;

      setMaskedEmail(`${maskedLocalPart}@${domainPart}`);
    }
  }, [email]);

  const handleOnsubmit = (e) => {
    e.preventDefault();
    // Numeric validation
    const numericRegex = /^[0-9]+$/;
    if (!numericRegex.test(otp)) {
      toast.error("OTP should contain numbers only.");
      return;
    }
    axios
      .post(`${baseurl}staff_verify_otp`, {
        otp: otp,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success(response?.data?.message);
          //   Swal.fire(
          //     `${response.data.message}`,
          //     "You clicked the button!",
          //     "success"
          //   );
          console.log(response.data);
          navigate("/Reset", { state: { clienID: response.data.userId } });
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        // Swal.fire(
        //   "Error",
        //   `${error?.response?.data?.message}`,
        //   "error"
        // );
        console.log(error);
      });
  };
  const handlekeypress = (e) => {
    const isNumber = /^[0-9]$/;
    if (!isNumber.test(e.key)) {
      e.preventDefault();
    }
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
                          <a href="index.html">
                            <img src={Image} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <form className="form-signin">
                          <h3>Forgot Password</h3>
                          <div className="form-group">
                            <h5
                              className="text-center"
                              style={{ color: "#22c7b8" }}
                            >
                              An OTP has been sent to {maskedEmail}
                            </h5>
                            <div
                              className="custom-form-control my-3"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <div className="container text-center">
                                <div
                                  id="inputs"
                                  className="inputs4"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={4}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => (
                                      <input
                                        {...props}
                                        onKeyDown={(e) => {
                                          const key = e.key;
                                          if (
                                            !/^[0-9]$/.test(key) &&
                                            key !== "Backspace" &&
                                            key !== "ArrowLeft" &&
                                            key !== "ArrowRight" &&
                                            key !== "Tab"
                                          ) {
                                            e.preventDefault();
                                          }
                                        }}
                                        style={{
                                          width: "3rem",
                                          height: "3rem",
                                          fontSize: "1rem",
                                          borderRadius: 4,
                                          border: "2px solid rgba(0,0,0,0.3)",
                                          textAlign: "center",
                                        }}
                                      />
                                    )}
                                  />
                                  {error.isarray && (
                                    <div className="text-danger">
                                      {error.error.response.data.message}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <span className="input-border input-border-alt" />
                            </div>
                          </div>

                          <div className="form-group text-center my-2">
                            <button
                              className="btn btn-primary account-btn"
                              type="submit"
                              onClick={handleOnsubmit}
                            >
                              Verify
                            </button>
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
