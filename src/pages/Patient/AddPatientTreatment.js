import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AddTretmentForPatient } from "../../reducer/PatientTreatmentSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { baseurl,AdminBaseUrl, baseu11 } from "../../Basurl/Baseurl";
import axios from "axios";
import { GetAllTreatment } from "../../reducer/TreatmentSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function AddPatientTreatment() {
  const location = useLocation();
  console.log(location?.state?.patient);
  const dispatch = useDispatch();
  const { Treatment, loading, error } = useSelector((state) => state.Treatment);
  const [Service, setService] = useState([]);
  const [personName, setPersonName] = React.useState([]);
  useEffect(() => {
    dispatch(GetAllTreatment());
  }, [dispatch]);
  const navigate = useNavigate();
  const GetActiveService = () => {
    axios
      .get(`${baseurl}get_activeServices`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.services);
        if (response.status === 200) {
          setService(response.data.services);
        } else {
          console.error("Failed to fetch job titles:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };
  useEffect(() => {
    GetActiveService();
  }, []);
  const basicSchema = Yup.object().shape({
    patientId: Yup.string().required("patientId is required"),
    treatment_course_id: Yup.string().required("Treatment course  is required"),
    services: Yup.array()
      .of(Yup.string().required("Service ID is required"))
      .min(1, "Select at least one service"),
    totalCharge: Yup.string().required("Total Charge is required"),
    amount_paid: Yup.string().required("Amount Paid is required"),
  });

  console.log(personName);
  const handleback =()=>{
    window.history.back()
  }
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">
                <span style={{cursor:"pointer"}} onClick={()=>{handleback()}}>
                  <i class="fi fi-sr-angle-double-small-left"></i>
                </span>
                Add Treatment
              </h4>
            </div>
          </div>
          <div className="main_content">
            <Formik
              initialValues={{
                patientId: location?.state?.patient || "",
                treatment_course_id: "",
                totalCharge: "",
                services: "",
                amount_paid: "",
                paymentMethod: "",
                Currency: "USD",
              }}
              validationSchema={basicSchema}
              onSubmit={async (values, { setSubmitting }) => {
                console.log("Submitted Values:", values);
                try {
                  const result = await dispatch(
                    AddTretmentForPatient(values)
                  ).unwrap();

                  Swal.fire("Treatment added successfully!", "", "success");
                  navigate("/Admin/Patient-Detail", {
                    state: { patientId: location?.state?.patient },
                  });
                } catch (err) {
                  // patientId
                  console.error("Submission Error:", err);
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
                          Patient ID<span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name="patientId"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Treatment course<span className="text-danger">*</span>
                        </label>
                       <Autocomplete
                                                 disablePortal
                                                 options={
                                                   Treatment?.map((job) => job.course_name) || []
                                                 }
                                                 onChange={async (e, value) => {
                                                   const selectedCourse = Treatment?.find(
                                                     (job) => job.course_name === value
                                                   );
                                                   const courseId = selectedCourse
                                                     ? selectedCourse.course_id
                                                     : null;
                                                   setFieldValue("treatment_course_id", courseId);
                                                   if (courseId) {
                                                     try {
                                                       const response = await axios.get(
                                                         `${baseurl}get_treatment_course_by_id/${courseId}`,
                                                         {
                                                           headers: {
                                                             Authorization: `Bearer ${localStorage.getItem(
                                                               "token"
                                                             )}`,
                                                             "Content-Type": "application/json",
                                                           },
                                                         }
                                                       );
                                                       const charge =
                                                         response?.data.treatment_course.course_price;
                                                       console.log(charge);
                                                       setFieldValue("totalCharge", charge);
                                                     } catch (error) {
                                                       console.error(
                                                         "Error fetching treatment details:",
                                                         error
                                                       );
                                                     }
                                                   }
                                                 }}
                                                 renderInput={(params) => <TextField {...params} />}
                                                 sx={{
                                                   "& .MuiOutlinedInput-root": {
                                                     padding: "0px",
                                                     "&:hover fieldset": {
                                                       borderColor: "#ced4da",
                                                     },
                                                   },
                                                 }}
                                               />
                        <ErrorMessage
                          name="treatment_course_id"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Total Charge<span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="type"
                          name="totalCharge"
                        />
                        <ErrorMessage
                          name="totalCharge"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Services<span className="text-danger">*</span>
                        </label>
                        <Autocomplete
                          multiple
                          options={Service.map(
                            (service) => service.serviceName
                          )} 
                          onChange={(event, value) => {
                            const selectedIds = value.map(
                              (name) =>
                                Service.find(
                                  (service) => service.serviceName === name
                                )?.serviceId
                            );
                            setPersonName(value); 
                            setFieldValue("services", selectedIds); 
                          }}
                          renderInput={(params) => (
                            <TextField {...params} label="Select Services" />
                          )}
                          value={personName} // Display the selected names
                          size="small"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              padding: "0px",
                              "&:hover fieldset": {
                                borderColor: "#ced4da",
                              },
                            },
                          }}
                        />
                        <ErrorMessage
                          name="services"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Amount Paid<span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name="amount_paid"
                        />
                        <ErrorMessage
                          name="amount_paid"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Currency<span className="text-danger"></span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name="Currency"
                        />
                        <ErrorMessage
                          name="Currency"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Payment Method <span className="text-danger"></span>
                        </label>
                        <Field
                          as="select"
                          name="paymentMethod"
                          className="form-control"
                        >
                          <option value="">Select a payment method</option>
                          <option value="Cash">Cash</option>
                          <option value="UPI">Online via UPI</option>
                          <option value="Credit/Debit Card">Debit / Credit Card</option>
                        </Field>
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
