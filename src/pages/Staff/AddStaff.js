import React from "react";
import { useState } from "react";
import { AddAllStaffuser } from "../../reducer/StaffSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

import { NavLink, useNavigate } from "react-router-dom";
export default function AddStaff() {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const { staff, loading, error } = useSelector((state) => state.staff);
  console.log(error);
  const navigate = useNavigate();
  const basicSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters"),
    role: Yup.string()
      .required("Role is required")
      .min(2, "Role must be at least 2 characters")
      .max(50, "Role cannot exceed 50 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is Required"),
    phone_no: Yup.string()
      .matches(/^[0-9]{10,11}$/, "Phone number must be 10-11 digits")
      .required("Phone number is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Others"], "Invalid gender selection") // Predefined valid values
      .required("Gender is required"), // Make it mandatory
    profileImage: Yup.mixed()
      .required("Profile Image is required")
      .test("fileSize", "File size is too large (Max: 2MB)", (value) =>
        value ? value.size <= 2 * 1024 * 1024 : true
      )
      .test("fileType", "Unsupported file format", (value) =>
        value
          ? ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
          : true
      ),
  });
  // const handelSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Use unwrap to handle success or error directly
  //     const result = await dispatch(AddAllStaffuser(formData)).unwrap();
  //     Swal.fire({
  //       title: "Staff added successfully!",
  //       text: "You clicked the button!",
  //       icon: "success",
  //     });
  //     navigate("/Admin/Staff");
  //   } catch (err) {
  //     Swal.fire({
  //       title: "Error!",
  //       text: err?.message || "An error occurred",
  //       icon: "error",
  //     });
  //   }
  // };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">
                <span>
                  <i
                    class="fi fi-sr-angle-double-small-left"
                    onClick={() => {
                      window.history.back();
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  ></i>
                </span>
                New Staff
              </h4>
            </div>
          </div>
          <div className="main_content">
            <Formik
              initialValues={{
                email: "",
                password: "",
                role: "",
                gender: "",
                phone_no: "",
                name: "",
                profileImage: null,
              }}
              validationSchema={basicSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const result = await dispatch(
                    AddAllStaffuser(values)
                  ).unwrap();
                  Swal.fire("Staff added successfully!", "", "success");
                  navigate("/Admin/Staff");
                } catch (err) {
                  console.log(err);
                  Swal.fire(
                    "Error!",
                    err?.message || "An error occurred",
                    "error"
                  );
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Name<span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name="name"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Email<span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="email"
                          name="email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Password <span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="password"
                          name="password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Phone No <span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name="phone_no"
                        />
                        <ErrorMessage
                          name="phone_no"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Role<span className="text-danger">*</span>
                        </label>
                        <Field as="select" className="form-control" name="role">
                          <option value="">Select Role</option>
                          <option value="Manager">Manager</option>
                          <option value="Receptionist">Receptionist</option>
                          <option value="Finance">Finance</option>
                          <option value="Coordinator">Coordinator</option>

                        </Field>
                        <ErrorMessage
                          name="role"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set gender-select">
                        <label className="gen-label">
                          Gender <span className="text-danger">*</span>
                        </label>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <Field
                              type="radio"
                              name="gender"
                              value="Male"
                              className="form-check-input"
                            />
                            Male
                          </label>
                        </div>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <Field
                              type="radio"
                              name="gender"
                              value="Female"
                              className="form-check-input"
                            />
                            Female
                          </label>
                        </div>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <Field
                              type="radio"
                              name="gender"
                              value="Others"
                              className="form-check-input"
                            />
                            Others
                          </label>
                        </div>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Profile Image<span className="text-danger">*</span>
                        </label>
                        <div className="profile-upload">
                          <div className="upload-img">
                            {selectedImage ? (
                              <img
                                alt="preview"
                                src={URL.createObjectURL(selectedImage)}
                                // style={{ width: "100px", height: "100px", objectFit: "cover" }}
                              />
                            ) : (
                              <img
                                alt="default avatar"
                                src="https://www.shutterstock.com/image-vector/profile-default-avatar-icon-user-600nw-2463844171.jpg"
                                // style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                // onError={(e) => {
                                //   e.target.src = "add-staffhttps://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1742210714~exp=1742214314~hmac=066462b7fb477ed29b4b2cc29bc6344db58dafc79f8ade48041d2670b04a90d3&w=740";
                                // }}
                              />
                            )}
                          </div>
                          <div className="upload-input">
                            <input
                              type="file"
                              className="form-control"
                              onChange={(event) => {
                                setFieldValue(
                                  "profileImage",
                                  event.target.files[0]
                                );
                                setSelectedImage(event.target.files[0]);
                              }}
                            />
                          </div>
                        </div>
                        <ErrorMessage
                          name="profileImage"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <button
                      className="submit-btn"
                      type="submit"
                      disabled={isSubmitting || loading}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
