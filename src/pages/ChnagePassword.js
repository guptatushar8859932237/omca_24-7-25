import React from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { baseurl } from "../Basurl/Baseurl";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function ChangePassword(props) {
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .required("New Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .test("passwords-match", "Passwords must match", function (value) {
        const { newPassword } = this.parent;
        // only run match test if newPassword is filled
        if (!newPassword) return true;
        return value === newPassword;
      }),
  });
  const [hide, setHide] = useState(false);
  const toggle = () => {
    setHide((prev) => !prev);
  };
  const [newType, setNewType] = useState(false);
  const toggleNew = () => {
    setNewType((prev) => !prev);
  };
  const [confirm, setConfirm] = useState(false);
  const toggleConfirm = () => {
    setConfirm((prev) => !prev);
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">Change Password</h4>
          </div>
        </div>
        <div className="main_content">
          <div className="row">
            <div className="col-lg-6 col-md-10">
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    const response = await axios.post(
                      `${baseurl}change_user_password/${localStorage.getItem("_id")}`,
                      values,
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("token")}`,
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    if (response.status === 200) {
                      Swal.fire("Success", "Password updated successfully!", "success");
                      resetForm();
                    }
                  } catch (error) {
                    Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
                  }
                  setSubmitting(false);
                }}
              >
                {() => (
                  // <Form className="">
                  //   <div className="field-set">
                  //     <label>Old Password <span className="text-danger">*</span></label>
                  //     <Field className="form-control" type={!hide ? "password" : "text"}
                  //       {...props} name="oldPassword" />
                  //     <ErrorMessage name="oldPassword" component="div" className="text-danger" />
                  //   </div>
                  //   <span
                  //     className="icon"
                  //     onClick={toggle}
                  //     style={{
                  //       position: "absolute",
                  //       top: "50px",
                  //       right: "20px",
                  //       transform: "translateY(-50%)",
                  //       cursor: "pointer",
                  //       color: "#rgb(23 14 14)",
                  //     }}
                  //   >
                  //     {hide ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  //   </span>

                  //   <div className="field-set">
                  //     <label>New Password <span className="text-danger">*</span></label>
                  //     <Field className="form-control" type={!newType ? "password" : "text"}
                  //       {...props} name="newPassword" />
                  //     <ErrorMessage name="newPassword" component="div" className="text-danger" />
                  //   </div>
                  //   <span
                  //     className="icon"
                  //     onClick={toggleNew}
                  //     style={{
                  //       position: "absolute",
                  //       top: "140px",
                  //       right: "20px",
                  //       transform: "translateY(-50%)",
                  //       cursor: "pointer",
                  //       color: "#rgb(23 14 14)",
                  //     }}
                  //   >
                  //     {newType ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  //   </span>

                  //   <div className="field-set">
                  //     <label>Confirm Password <span className="text-danger">*</span></label>
                  //     <Field className="form-control" type={!confirm ? "password" : "text"}
                  //       {...props} name="confirmPassword" />
                  //     <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                  //   </div>
                  //   <span
                  //     className="icon"
                  //     onClick={toggleConfirm}
                  //     style={{
                  //       position: "absolute",
                  //       top: "228px",
                  //       right: "20px",
                  //       transform: "translateY(-50%)",
                  //       cursor: "pointer",
                  //       color: "#rgb(23 14 14)",
                  //     }}
                  //   >
                  //     {newType ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  //   </span>
                  //   <div className="">
                  //     <button type="submit" className="submit-btn">Submit</button>
                  //   </div>
                  // </Form>
               <Form className="">
  {/* Old Password */}
  <div className="field-set" style={{ position: "relative" }}>
    <label>
      Old Password <span className="text-danger">*</span>
    </label>
    <Field
      className="form-control"
      type={!hide ? "password" : "text"}
      name="oldPassword"
    />
    <ErrorMessage name="oldPassword" component="div" className="text-danger" />
    <span
      className="icon"
      onClick={toggle}
      style={{
        position: "absolute",
        top: "38px",
        right: "15px",
        cursor: "pointer",
      }}
    >
      {hide ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </span>
  </div>

  {/* New Password */}
  <div className="field-set" style={{ position: "relative" }}>
    <label>
      New Password <span className="text-danger">*</span>
    </label>
    <Field
      className="form-control"
      type={!newType ? "password" : "text"}
      name="newPassword"
    />
    <ErrorMessage name="newPassword" component="div" className="text-danger" />
    <span
      className="icon"
      onClick={toggleNew}
      style={{
        position: "absolute",
        top: "38px",
        right: "15px",
        cursor: "pointer",
      }}
    >
      {newType ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </span>
  </div>

  {/* Confirm Password */}
  <div className="field-set" style={{ position: "relative" }}>
    <label>
      Confirm Password <span className="text-danger">*</span>
    </label>
    <Field
      className="form-control"
      type={!confirm ? "password" : "text"}
      name="confirmPassword"
    />
    <ErrorMessage
      name="confirmPassword"
      component="div"
      className="text-danger"
    />
    <span
      className="icon"
      onClick={toggleConfirm}
      style={{
        position: "absolute",
        top: "38px",
        right: "15px",
        cursor: "pointer",
      }}
    >
      {confirm ? <VisibilityIcon /> : <VisibilityOffIcon />}
    </span>
  </div>

  <div className="">
    <button type="submit" className="submit-btn">
      Submit
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
  );
}
