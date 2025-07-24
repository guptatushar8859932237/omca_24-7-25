// import React from "react";
// import { useState, useEffect } from "react";
// import { AddAllStaffuser } from "../../reducer/StaffSlice";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { Formik, Field, ErrorMessage, Form } from "formik";
// import * as Yup from "yup";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import { alpha, styled } from "@mui/material/styles";
// import { AddTretmentForPatient } from "../../reducer/PatientTreatmentSlice";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { baseurl } from "../../Basurl/Baseurl";
// import axios from "axios";
// import { GetAllTreatment } from "../../reducer/TreatmentSlice";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };
// export default function AddPatientTreatment() {
//   const location = useLocation();
//   console.log(location?.state?.patient);
//   const [treatmentCours, setTretmentCours] = useState([]);
//   const dispatch = useDispatch();
//   const [selectedImage, setSelectedImage] = useState(null);

//   const { Treatment, loading, error } = useSelector((state) => state.Treatment);
//   // const { Service } = useSelector((state) => state.Service)
//   const [Service, setService] = useState([]);

//   const [personName, setPersonName] = React.useState([]);

//   // const handleChange = (event) => {
//   //   const { target: { value } } = event;
//   //   setPersonName(typeof value === 'string' ? value.split(',') : value);
//   //   setFieldValue("services", value.map(name => Service.find(service => service.serviceName === name)?.serviceId));
//   // };

//   useEffect(() => {
//     dispatch(GetAllTreatment());
//   }, [dispatch]);

//   const navigate = useNavigate();

//   const GetActiveService = () => {
//     axios
//       .get(`${baseurl}get_activeServices`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         console.log(response.data.services);
//         if (response.status === 200) {
//           setService(response.data.services);
//         } else {
//           console.error("Failed to fetch job titles:", response.data.message);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching job titles:", error);
//       });
//   };

//   useEffect(() => {
//     GetActiveService();
//   }, []);
//   const basicSchema = Yup.object().shape({
//     patientId: Yup.string().required("patientId is required"),
//     treatment_course_id: Yup.string().required(
//       "treatment_course_id is required"
//     ),
//     // services: Yup.array()
//     //   .of(Yup.string().required("Service ID is required"))
//     //   .min(1, "Select at least one service"),
//     totalCharge: Yup.string().required("totalCharge is required"),
//     amount_paid: Yup.string().required("amount_paid is required"),
//     paymentMethod: Yup.string().required("paymentMethod is required"),
//   });

//   // const handelSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     // Use unwrap to handle success or error directly
//   //     const result = await dispatch(AddAllStaffuser(formData)).unwrap();

//   //     Swal.fire({
//   //       title: "Staff added successfully!",
//   //       text: "You clicked the button!",
//   //       icon: "success",
//   //     });
//   //     navigate("/Admin/Staff");
//   //   } catch (err) {
//   //     Swal.fire({
//   //       title: "Error!",
//   //       text: err?.message || "An error occurred",
//   //       icon: "error",
//   //     });
//   //   }
//   // };

//   console.log(personName);
//   return (
//     <>
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="row">
//             <div className="col-md-12">
//               <h4 className="page-title">Add Treatment</h4>
//             </div>
//           </div>
//           <div className="main_content">
//             <div className="row">
//               <div className="col-lg-12">
//                 <Formik
//                   initialValues={{
//                     patientId: location?.state?.patient || "",
//                     treatment_course_id: "",
//                     totalCharge: "",
//                     amount_paid: "",
//                     paymentMethod: "",
//                   }}
//                   validationSchema={basicSchema}
//                   onSubmit={async (values, { setSubmitting }) => {
//                     console.log("Submitted Values:", values);
//                     try {
//                       const result = await dispatch(
//                         AddTretmentForPatient(values)
//                       ).unwrap();

//                       Swal.fire("Treatment added successfully!", "", "success");
//                       navigate("/Admin/patients");
//                     } catch (err) {
//                       console.error("Submission Error:", err);
//                       Swal.fire(
//                         "Error!",
//                         err?.message || "An error occurred",
//                         "error"
//                       );
//                     }
//                     setSubmitting(false);
//                   }}
//                 >
//                   {({ isSubmitting, setFieldValue }) => (
//                     <Form>
//                       <div className="row">
//                         {/* Name */}
//                         <div className="col-sm-6">
//                           <div className="form-group m-0">
//                             <label>
//                               Patient ID <span className="text-danger">*</span>
//                             </label>
//                             <Field
//                               className="form-control"
//                               type="text"
//                               name="patientId"
//                             />
//                           </div>
//                         </div>

//                         {/* Email */}
//                         {/* Email */}
//                         <div className="col-sm-6">
//                           <div className="form-group">
//                             <label>
//                               Treatment course
//                               <span className="text-danger">*</span>
//                             </label>
//                             <Autocomplete
//                               disablePortal
//                               options={
//                                 Treatment?.map((job) => job.course_name) || []
//                               }
//                               onChange={async (e, value) => {
//                                 const selectedCourse = Treatment?.find(
//                                   (job) => job.course_name === value
//                                 );
//                                 const courseId = selectedCourse
//                                   ? selectedCourse.course_id
//                                   : null;
//                                 setFieldValue("treatment_course_id", courseId);

//                                 if (courseId) {
//                                   try {
//                                     const response = await axios.get(`${baseurl}get_treatment_course_by_id/${courseId}`,
//                                       {
//                                         headers: {
//                                           Authorization: `Bearer ${localStorage.getItem(
//                                             "token"
//                                           )}`,
//                                           "Content-Type": "application/json",
//                                         },
//                                       }
//                                     );

//                                     const charge =
//                                       response?.data.treatment_course.course_price
//                                         console.log(charge)
//                                     setFieldValue("totalCharge", charge);
//                                   } catch (error) {
//                                     console.error(
//                                       "Error fetching treatment details:",
//                                       error
//                                     );
//                                   }
//                                 }
//                               }}
//                               renderInput={(params) => (
//                                 <TextField {...params} />
//                               )}
//                               sx={{
//                                 width: 620,
//                                 "& .MuiOutlinedInput-root": {
//                                   padding: "0px",
//                                   "&:hover fieldset": {
//                                     borderColor: "#ced4da",
//                                   },
//                                 },
//                               }}
//                             />
//                             <ErrorMessage
//                               name="treatment_course_id"
//                               component="div"
//                               style={{ color: "red" }}
//                             />
//                           </div>
//                         </div>

//                         {/* Password */}
//                         <div className="col-sm-6">
//                           <div className="form-group">
//                             <label>TotalCharge </label>
//                             <Field
//                               className="form-control"
//                               type="type"

//                               name="totalCharge"
//                             />
//                             <ErrorMessage
//                               name="totalCharge"
//                               component="div"
//                               style={{ color: "red" }}
//                             />
//                           </div>
//                         </div>

//                         {/* Phone Number */}
//                         {/* <div className="col-sm-6">
//                           <div className="form-group">
//                             <label>Services</label>
//                             <Autocomplete
//                               multiple
//                               options={Service.map(
//                                 (service) => service.serviceName
//                               )} // Display service names in dropdown
//                               onChange={(event, value) => {
//                                 // Map selected names to IDs
//                                 const selectedIds = value.map(
//                                   (name) =>
//                                     Service.find(
//                                       (service) => service.serviceName === name
//                                     )?.serviceId
//                                 );
//                                 setPersonName(value); // Update the displayed names
//                                 setFieldValue("services", selectedIds); // Set the selected IDs
//                               }}
//                               renderInput={(params) => (
//                                 <TextField
//                                   {...params}
//                                   label="Select Services"
//                                 />
//                               )}
//                               value={personName} // Display the selected names
//                               size="small"
//                               sx={{
//                                 "& .MuiOutlinedInput-root": {
//                                   padding: "0px",
//                                   "&:hover fieldset": {
//                                     borderColor: "#ced4da",
//                                   },
//                                 },
//                               }}
//                             />
//                             <ErrorMessage
//                               name="services"
//                               component="div"
//                               style={{ color: "red" }}
//                             />

//                             {/* <Autocomplete
//                               disablePortal
//                               options={Service?.map(ser => ser.serviceName) || []}
//                               onChange={(e, value) => {
//                                 const selectedService = Service?.find(ser => ser.serviceName === value);
//                                 const serviceId = selectedService ? selectedService.serviceId : null;
//                                 setFieldValue("services", serviceId);
//                               }}
//                               renderInput={(params) => <TextField {...params} />}
//                               sx={{
//                                 width: 620,
//                                 '& .MuiOutlinedInput-root': {
//                                   padding: '0px',
//                                   '&:hover fieldset': {
//                                     borderColor: '#ced4da',
//                                   },
//                                 },
//                               }}
//                             /> */}

//                             {/* <ErrorMessage
//                               name="services"
//                               component="div"
//                               style={{ color: "red" }}
//                             />
//                           </div>
//                         </div> */}

//                         {/* Role */}
//                         <div className="col-sm-6">
//                           <div className="form-group">
//                             <label>Amount Paid </label>
//                             <Field
//                               className="form-control"
//                               type="text"
//                               name="amount_paid"
//                             />
//                             <ErrorMessage
//                               name="amount_paid"
//                               component="div"
//                               style={{ color: "red" }}
//                             />
//                           </div>
//                         </div>

//                         <div className="col-sm-6">
//                           <div className="form-group m-0">
//                             <label>
//                               Payment Method{" "}
//                               <span className="text-danger">*</span>
//                             </label>
//                             <Field
//                               className="form-control"
//                               type="text"
//                               name="paymentMethod"
//                             />
//                             <ErrorMessage
//                               name="paymentMethod"
//                               component="div"
//                               style={{ color: "red" }}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       {/* Submit Button */}
//                       <div className="m-t-20 text-center">
//                         <button
//                           className="btn btn-primary submit-btn"
//                           type="submit"
//                           disabled={isSubmitting || loading} // Ensure these states are correct
//                         >
//                           {loading ? "Submitting..." : "Create Treatment"}
//                         </button>
//                       </div>
//                     </Form>
//                   )}
//                 </Formik>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React from "react";
import { useState, useEffect } from "react";
import { AddAllStaffuser } from "../../reducer/StaffSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { alpha, styled } from "@mui/material/styles";
import { AddTretmentForPatient } from "../../reducer/PatientTreatmentSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { baseurl } from "../../Basurl/Baseurl";
import axios from "axios";
import { GetAllTreatment } from "../../reducer/TreatmentSlice";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

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
  const [treatmentCours, setTretmentCours] = useState([]);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  const { Treatment, loading, error } = useSelector((state) => state.Treatment);
  // const { Service } = useSelector((state) => state.Service)
  const [Service, setService] = useState([]);

  const [personName, setPersonName] = React.useState([]);

  // const handleChange = (event) => {
  //   const { target: { value } } = event;
  //   setPersonName(typeof value === 'string' ? value.split(',') : value);
  //   setFieldValue("services", value.map(name => Service.find(service => service.serviceName === name)?.serviceId));
  // };

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

  console.log(personName);
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">
                <span>
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
                          )} // Display service names in dropdown
                          onChange={(event, value) => {
                            // Map selected names to IDs
                            const selectedIds = value.map(
                              (name) =>
                                Service.find(
                                  (service) => service.serviceName === name
                                )?.serviceId
                            );
                            setPersonName(value); // Update the displayed names
                            setFieldValue("services", selectedIds); // Set the selected IDs
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
