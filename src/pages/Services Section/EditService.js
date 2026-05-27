import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"; // Axios added
import { baseurl } from "../../Basurl/Baseurl";
export default function EditService() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { Service, loading, error } = useSelector((state) => state.Service);
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
  useEffect(() => {
    if (location.state?.serviceId && Service.length > 0) {
      const selectedUser = Service.find(
        (item) => item.serviceId === location.state.serviceId,
      );
      setData(selectedUser || {});
    }
  }, [location.state?.serviceId, Service]);

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
                  Edit Services
                </h6>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <Formik
                  enableReinitialize
                  initialValues={{
                    serviceName: data.serviceName || "",
                    description: data.description || "",
                    price: data.price || "",
                    duration: data.duration || "",
                  }}
                  validationSchema={basicSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      await axios.post(
                        `${baseurl}update_service/${location.state.serviceId}`,
                        values,
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                          },
                        },
                      );
                      Swal.fire("Service Update successfully!", "", "success");
                      navigate("/Admin/Services");
                    } catch (err) {
                      console.error(err);
                      Swal.fire(
                        "Error!",
                        err?.response?.data?.message || "An error occurred",
                        "error",
                      );
                    }
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
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
                              Duration<span className="text-danger">*</span>
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
                                type="text"
                                name="price"
                                onKeyPress={(e) => {
                                  if (!/^[0-9]$/.test(e.key)) {
                                    e.preventDefault(); // blocks everything except digits
                                  }
                                }}
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
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Submit"}
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
