import React from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { AddMulServices } from "../../reducer/ServiceSlice";
import { NavLink, useNavigate } from "react-router-dom";
export default function AddStaAddServicesff() {
  const dispatch = useDispatch();

  const { Service, loading, error } = useSelector((state) => state.staff);
  console.log(error);
  const navigate = useNavigate();

  const basicSchema = Yup.object().shape({
    serviceName: Yup.string().required("Service Name is required"),

    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than 0")
      .required("Price is required"),
    duration: Yup.string().required("Duration is required"),
  });
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row gx-3">
            <div className="col-md-12">
              <div className="topmainhd">
                <h6>
                  <i
                    class="fa-solid fa-arrow-left-long me-2"
                    onClick={() => window.history.back()}
                  ></i>
                  Add Services
                </h6>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <Formik
                  initialValues={{
                    serviceName: "",
                    description: "",
                    price: "",
                    duration: "",
                  }}
                  validationSchema={basicSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      const result = await dispatch(
                        AddMulServices(values),
                      ).unwrap();
                      Swal.fire("Services added successfully!", "", "success");
                      navigate("/Admin/Services");
                    } catch (err) {
                      console.log(err);
                      Swal.fire(
                        "Error!",
                        err?.message || "An error occurred",
                        "error",
                      );
                    }
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting, setFieldValue }) => (
                    <Form>
                      <div className="row gx-3 gy-3">
                        <div className="col-md-4">
                          <div className="set-field">
                            <label>
                              Service Name<span className="text-danger">*</span>
                            </label>
                            <Field
                              className="form-control"
                              type="text"
                              name="serviceName"
                            />
                            <ErrorMessage
                              name="serviceName"
                              component="span"
                              style={{ color: "red" }}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="set-field">
                            <label>
                              Description<span className="text-danger">*</span>
                            </label>
                            <Field
                              className="form-control"
                              type="text"
                              name="description"
                            />
                            <ErrorMessage
                              name="description"
                              component="span"
                              style={{ color: "red" }}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="set-field">
                            <label>
                              Duration <span className="text-danger">*</span>
                            </label>
                            <Field
                              as="select"
                              className="form-control"
                              name="duration"
                            >
                              <option value="">Select duration</option>
                              <option value="One-Time">One-Time</option>
                              <option value="Day">Day</option>
                              <option value="Month">Month</option>
                            </Field>
                            <ErrorMessage
                              name="duration"
                              component="span"
                              style={{ color: "red" }}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="set-field">
                            <label>
                              Price <span className="text-danger">*</span>
                            </label>
                            <div className="fixpricee">
                              <p className="code-dial">USD($)</p>
                              <Field
                                className="form-control code-in"
                                onKeyPress={(e) => {
                                  if (!/^[0-9]$/.test(e.key)) {
                                    e.preventDefault(); 
                                  }
                                }}
                                type="text"
                                name="price"
                              />
                            </div>
                            <ErrorMessage
                              name="price"
                              component="span"
                              style={{ color: "red" }}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <button
                            className="submit-btn"
                            type="submit"
                            disabled={isSubmitting || loading}
                          >
                            {loading ? "Submitting..." : "Submit"}
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
