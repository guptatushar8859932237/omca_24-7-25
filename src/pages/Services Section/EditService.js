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
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">
                <span>
                  <i
                    className="fi fi-sr-angle-double-small-left"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.history.back();
                    }}
                  ></i>
                </span>
                Edit Services
              </h4>
            </div>
          </div>
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
                  // ✅ Axios POST API call (Redux NAHI use kiya)
                  await axios.post(
                    `${baseurl}update_service/${location.state.serviceId}`,
                    values,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                      },
                    },
                  ); // 🔁 Change endpoint as needed
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
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Service Name <span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name="serviceName"
                        />
                        <ErrorMessage
                          name="serviceName"
                          component="p"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
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
                          component="p"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
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
                          component="p"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Price <span className="text-danger">*</span>
                        </label>
                        <div className="fixpricee">
                          <p className='code-dial'>$</p>
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
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Update Service"}
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
