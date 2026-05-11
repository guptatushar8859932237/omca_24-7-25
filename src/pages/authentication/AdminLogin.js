import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../reducer/LoginSlice";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import logoDark from "../../img/logo-dark.png";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles
export function AdminLogin(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const [hide, setHide] = useState(false);
  const toggle = () => {
    setHide((prev) => !prev);
  };
  const passwordRules =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  const basicSchema = Yup.object().shape({
    email: Yup.string()
      .matches(passwordRules, "Please enter a valid email")
      .required("Required"),
    password: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null])
      .max(20, "Passwords should not exceed 20 characters."),
  });
  const enquiryPermissions = [
  "/General_Enquiries",
  "/Medical_Visa",
  "/Guest_House_Stay",
  "/Forex_Service",
  "/Flight_Service",
  "/Pickup_and_Drop",
  "/Home_Care",
  "/Test_Form",
  "/Contact_Us",
];
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
      console.log(typeof user.permissions[0]);
      if (user?.permissions?.length > 0) {
        const firstPermission = user.permissions[0];
        console.log(firstPermission);
        if (enquiryPermissions.includes(firstPermission)) {
  navigate("/Admin/General_Enquiries");
} else if (firstPermission === "/Dashboard") {
          navigate("/Dashboard");
        }
         else if (firstPermission === "/Enquiries") {
          navigate("/Admin/inquiry");
        } 
         else if (firstPermission === "/Air_Medical_Escort") {
          navigate("/Admin/inquiry");
        } 
         else if (firstPermission === "/Ambulance_Service") {
          navigate("/Admin/inquiry");
        } 
         else if (firstPermission === "/Treatment_Estimate") {
          navigate("/Admin/inquiry");
        } 
        else if (firstPermission === "/Manage_Patients") {
          navigate("/Admin/patients");
        } else if (firstPermission === "/Manage_Appointments") {
          navigate("/Admin/appointments");
        } else if (firstPermission === "/Manage_Services") {
          navigate("/Admin/Services");
        } else if (firstPermission === "/Manage_Staffs") {
          navigate("/Admin/Staff");
        } else if (firstPermission === "/Manage_Permissions") {
          navigate("/Admin/New-Permission");
        } else if (firstPermission === "/Reports") {
          navigate("/Admin/Reports");
        } else if (firstPermission === "/Manage_Countries") {
          navigate("/Admin/Countries");
        } else if (firstPermission === "/Payments") {
          navigate("/Admin/Earnings");
        } else if (firstPermission === "/Manage_Roles") {
          navigate("/Admin/roles");
        } else {
          navigate("/Admin/no-permission");
        }
      } else {
        navigate("/Admin/no-permission");
      }
    }
  }, [user, navigate]);
  console.log(localStorage.getItem("permissionArray"));
  return (
    <div
      className="main-wrapper account-wrapper"
      style={{ minHeight: "100vh" }}>
      <div className="account-page">
        <div className="account-center">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10">
                <div className="account-box">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="account-logo">
                        <a>
                          <img src={logoDark} alt="" />
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={basicSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                          try {
                            const result = await dispatch(
                              loginUser(values),
                            ).unwrap();
                          } catch (err) {
                            console.log(err);
                            toast.error(err?.message);
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
                                <ErrorMessage
                                  name="email"
                                  component="div"
                                  style={{ color: "red" }}
                                />
                              </div>
                            </div>
                            <div
                              className="form-group"
                              style={{ position: "relative" }}
                            >
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
                                <ErrorMessage
                                  name="password"
                                  component="div"
                                  style={{ color: "red" }}
                                />
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
                                {hide ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </span>
                            </div>
                            <div className="form-group text-right">
                              <NavLink to="Forgot">
                                Forgot your password?
                              </NavLink>
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
