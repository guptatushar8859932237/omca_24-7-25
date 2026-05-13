// import React from "react";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { Formik, Field, ErrorMessage, Form } from "formik";
// import * as Yup from "yup";
// import TextField from "@mui/material/TextField";
// import Autocomplete from "@mui/material/Autocomplete";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { baseurl, AdminBaseUrl, baseu11 } from "../../Basurl/Baseurl";
// import axios from "axios";
// import { GetAllTreatment } from "../../reducer/TreatmentSlice";
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// export default function EditPatientTreatment() {
//   const location = useLocation();
//   const [initialData, setInitialData] = useState(null);
//   console.log(location?.state?.data);
//   const dispatch = useDispatch();
//   const { Treatment, loading, error } = useSelector((state) => state.Treatment);
//   const [Service, setService] = useState([]);
//   const [personName, setPersonName] = React.useState([]);
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
//     dispatch(GetAllTreatment());
//   }, [dispatch]);
//   useEffect(() => {
//     GetActiveService();
//   }, []);
//   // const basicSchema = Yup.object().shape({
//   //   patientId: Yup.string().required("patientId is required"),
//   //   treatment_course_id: Yup.string().required("Treatment course is required"),
//   //   services: Yup.array().min(1, "Select at least one service"),
//   //   total_charge: Yup.number()
//   //     .typeError("Total Charge must be a number")
//   //     .required("Total Charge is required")
//   //     .min(1, "Total Charge must be greater than 0"),
//   //   amount_paid: Yup.number()
//   //     .typeError("Amount Paid must be a number")

//   //     .min(1, "Amount Paid must be greater than 0")
//   //     .max(
//   //       Yup.ref("total_charge"),
//   //       "Amount Paid cannot be greater than Total Charge",
//   //     ),
//   // });
//  const basicSchema = Yup.object().shape({
//   patientId: Yup.string().required("patientId is required"),

//   treatment_course_id: Yup.string().required(
//     "Treatment course is required"
//   ),

//   services: Yup.array().min(1, "Select at least one service"),

//   total_charge: Yup.number()
//     .typeError("Total Charge must be a number")
//     .required("Total Charge is required")
//     .moreThan(0, "Total Charge must be greater than 0"),

//   amount_paid: Yup.number()
//   .transform((value, originalValue) =>
//     originalValue === "" ? undefined : Number(originalValue)
//   )
//   .typeError("Amount Paid must be a number")
//   .positive("Amount Paid must be greater than 0")
//   .max(
//     Yup.ref("total_charge"),
//     "Amount Paid cannot be greater than Total Charge"
//   ),
// });
//   console.log(personName);
//   const handleback = () => {
//     window.history.back();
//   };
//   useEffect(() => {
//     if (location?.state?.data) {
//       getData();
//     }
//   }, [location?.state?.data]);
//   const getData = async () => {
//     try {
//       const response = await axios.get(
//         `${baseurl}get_treatment_by_id/${location?.state?.data.treatment_id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         },
//       );
//       if (response.data.success) {
//         const data = response.data.data;
//         setInitialData({
//           patientId: data.patientId,
//           treatment_course_id: data.treatment_course_id,
//           treatment_course_name: data.treatment_course_name,
//           total_charge: data.treatment_course_fee || "",
//           services: data.services?.map((item) => item.serviceId) || [],
//           amount_paid: data.payment_details?.[0]?.paid_amount || "",
//           paymentMethod: data.payment_details?.[0]?.paymentMethod || "",
//           Currency: "USD",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <>
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="row">
//             <div className="col-md-12">
//               <h4 className="page-title">
//                 <span
//                   style={{ cursor: "pointer" }}
//                   onClick={() => {
//                     handleback();
//                   }}
//                 >
//                   <i class="fi fi-sr-angle-double-small-left"></i>
//                 </span>
//                 Edit Treatment
//               </h4>
//             </div>
//           </div>
//           <div className="main_content">
//             <Formik
//               initialValues={
//                 initialData || {
//                   patientId: location?.state?.patientid || "",
//                   treatment_course_id: "",
//                   treatment_course_name: "",
//                   total_charge: "",
//                   services: [],
//                   amount_paid: "",
//                   paymentMethod: "",
//                   Currency: "USD",
//                 }
//               }
//               validationSchema={basicSchema}
//               enableReinitialize
//               onSubmit={async (values, { setSubmitting }) => {
//                 try {
//                   const payload = {
//                     treatment_id: location?.state?.data?.treatment_id,
//                     patientId: values.patientId,
//                     treatment_course_id: values.treatment_course_id,
//                     treatment_course_name: values.treatment_course_name,
//                     total_charge: values.total_charge,
//                     services: values.services,
//                     amount_paid: values.amount_paid,
//                     paymentMethod: values.paymentMethod,
//                     Currency: values.Currency,
//                   };
//                   const response = await axios.put(
//                     `${baseurl}edit_treatment/${location?.state?.data?.treatment_id}`, // ⚠️ confirm your endpoint
//                     payload,
//                     {
//                       headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                         "Content-Type": "application/json",
//                       },
//                     },
//                   );
//                   if (response.data.success) {
//                     Swal.fire({
//                       icon: "success",
//                       title: "Treatment Updated Successfully",
//                       timer: 1500,
//                       showConfirmButton: false,
//                     });

//                     setTimeout(() => {
//                       navigate(-1);
//                     }, 1500);
//                   } else {
//                     Swal.fire("Error", response.data.message, "error");
//                   }
//                 } catch (error) {
//                   console.log(error);
//                   Swal.fire("Error", "Something went wrong", "error");
//                 } finally {
//                   setSubmitting(false);
//                 }
//               }}
//             >
//               {({ values, isSubmitting, setFieldValue }) => (
//                 <Form>
//                   <div className="row">
//                     <div className="col-sm-6">
//                       <div className="field-set">
//                         <label>
//                           Patient ID<span className="text-danger">*</span>
//                         </label>
//                         <Field
//                           className="form-control"
//                           type="text"
//                           disabled
//                           name="patientId"
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="field-set">
//                         <label>
//                           Treatment course<span className="text-danger">*</span>
//                         </label>
//                         <Autocomplete
//                           disablePortal
//                           disabled
//                           options={Treatment || []}
//                           getOptionLabel={(option) => option.name || ""}
//                           value={
//                             Treatment.find(
//                               (t) =>
//                                 String(t.id) ===
//                                 String(initialData?.treatment_course_id),
//                             ) || null
//                           }
//                           isOptionEqualToValue={(option, value) =>
//                             String(option.id) === String(value.id)
//                           }
//                           onChange={(e, value) => {
//                             setFieldValue(
//                               "treatment_course_id",
//                               value ? value.id : "",
//                             );
//                             setFieldValue(
//                               "treatment_course_name",
//                               value ? value.name : "",
//                             );
//                           }}
//                           renderInput={(params) => (
//                             <TextField
//                               {...params}
//                               placeholder="Select Treatment Course"
//                               error={!!error}
//                             />
//                           )}
//                         />
//                         <ErrorMessage
//                           name="treatment_course_id"
//                           component="div"
//                           style={{ color: "red" }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="field-set">
//                         <label>
//                           Total Charge<span className="text-danger">*</span>
//                         </label>
//                           <div className="fixpricee">
//                     <p className="code-dial">USD($)</p>
//                         <Field
//                           className="form-control"
//                           type="number"
//                           name="total_charge"
//                         />
//                         </div>
//                         <ErrorMessage
//                           name="total_charge"
//                           component="div"
//                           style={{ color: "red" }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="field-set">
//                         <label>
//                           Services<span className="text-danger">*</span>
//                         </label>
//                         <Autocomplete
//                           multiple
//                           options={Service || []}
//                           getOptionLabel={(option) => option.serviceName || ""}
//                           value={Service.filter((service) =>
//                             values.services
//                               .map(String)
//                               .includes(String(service.serviceId)),
//                           )}
//                           isOptionEqualToValue={(option, value) =>
//                             option.serviceId === value.serviceId
//                           }
//                           onChange={(event, value) => {
//                             const selectedIds = value.map(
//                               (item) => item.serviceId,
//                             );
//                             setFieldValue("services", selectedIds);
//                           }}
//                           renderInput={(params) => (
//                             <TextField {...params} label="Select Services" />
//                           )}
//                         />
//                         <ErrorMessage
//                           name="services"
//                           component="div"
//                           style={{ color: "red" }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="">
//                     <button
//                       className="submit-btn"
//                       type="submit"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? "Submitting..." : "Submit"}
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../Basurl/Baseurl";
import { GetAllTreatment } from "../../reducer/TreatmentSlice";
export default function EditPatientTreatment() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState(null);
  const [Service, setService] = useState([]);
  const { Treatment } = useSelector(
    (state) => state.Treatment
  );
  // ================= VALIDATION =================
  const basicSchema = Yup.object().shape({
    patientId: Yup.string().required(
      "Patient ID is required"
    ),
    treatment_course_id: Yup.string().required(
      "Treatment course is required"
    ),
    services: Yup.array().min(
      1,
      "Select at least one service"
    ),
    total_charge: Yup.number()
      .transform((value, originalValue) =>
        originalValue === ""
          ? undefined
          : Number(originalValue)
      )
      .typeError(
        "Total Charge must be a number"
      )
      .required("Total Charge is required")
      .positive(
        "Total Charge must be greater than 0"
      ),
    amount_paid: Yup.number()
      .transform((value, originalValue) =>
        originalValue === ""
          ? undefined
          : Number(originalValue)
      )
      .typeError(
        "Amount Paid must be a number"
      )
      .positive(
        "Amount Paid must be greater than 0"
      )
      .max(
        Yup.ref("total_charge"),
        "Amount Paid cannot be greater than Total Charge"
      ),
  });
  // ================= FETCH TREATMENTS =================
  useEffect(() => {
    dispatch(GetAllTreatment());
  }, [dispatch]);
  // ================= FETCH SERVICES =================
  const GetActiveService = async () => {
    try {
      const response = await axios.get(
        `${baseurl}get_activeServices`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
            "Content-Type":
              "application/json",
          },
        }
      );
      if (response.status === 200) {
        setService(response.data.services);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetActiveService();
  }, []);
  // ================= FETCH SINGLE TREATMENT =================
  const getData = async () => {
    try {
      const response = await axios.get(
        `${baseurl}get_treatment_by_id/${location?.state?.data?.treatment_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );
      if (response.data.success) {
        const data = response.data.data;
        setInitialData({
          patientId: data.patientId || "",
          treatment_course_id:
            data.treatment_course_id || "",
          treatment_course_name:
            data.treatment_course_name || "",
          total_charge:
            data.treatment_course_fee || "",
          services:
            data.services?.map(
              (item) => item.serviceId
            ) || [],
          amount_paid:
            data.payment_details?.[0]
              ?.paid_amount || "",
          paymentMethod:
            data.payment_details?.[0]
              ?.paymentMethod || "",
          Currency: "USD",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (location?.state?.data) {
      getData();
    }
  }, [location?.state?.data]);
  // ================= BACK =================
  const handleback = () => {
    navigate(-1);
  };
  // ================= LOADING =================
  if (!initialData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">
              <span
                style={{ cursor: "pointer" }}
                onClick={handleback}
              >
                <i className="fi fi-sr-angle-double-small-left"></i>
              </span>
              Edit Treatment
            </h4>
          </div>
        </div>
        <div className="main_content">
          <Formik
            initialValues={initialData}
            validationSchema={basicSchema}
            enableReinitialize
            onSubmit={async (
              values,
              { setSubmitting }
            ) => {
              try {
                const payload = {
                  treatment_id:
                    location?.state?.data
                      ?.treatment_id,
                  patientId:
                    values.patientId,
                  treatment_course_id:
                    values.treatment_course_id,
                  treatment_course_name:
                    values.treatment_course_name,
                  total_charge:
                    Number(values.total_charge),
                  services: values.services,
                  amount_paid:
                    Number(values.amount_paid),
                  paymentMethod:
                    values.paymentMethod,
                  Currency:
                    values.Currency,
                };
                const response =
                  await axios.put(
                    `${baseurl}edit_treatment/${location?.state?.data?.treatment_id}`,
                    payload,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                        "Content-Type":
                          "application/json",
                      },
                    }
                  );
                if (response.data.success) {
                  Swal.fire({
                    icon: "success",
                    title:
                      "Treatment Updated Successfully",
                    timer: 1500,
                    showConfirmButton: false,
                  });
                  setTimeout(() => {
                    navigate(-1);
                  }, 1500);
                } else {
                  Swal.fire(
                    "Error",
                    response.data.message,
                    "error"
                  );
                }
              } catch (error) {
                console.log(error);
                Swal.fire(
                  "Error",
                  error?.response?.data
                    ?.message ||
                    "Something went wrong",
                  "error"
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form>
                <div className="row">
                  {/* PATIENT ID */}
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>
                        Patient ID
                        <span className="text-danger">
                          *
                        </span>
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        disabled
                        name="patientId"
                      />
                    </div>
                  </div>
                  {/* TREATMENT */}
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>
                        Treatment Course
                        <span className="text-danger">
                          *
                        </span>
                      </label>
                      <Autocomplete
                        disablePortal
                        disabled
                        options={Treatment || []}
                        getOptionLabel={(
                          option
                        ) => option.name || ""}
                        value={
                          Treatment.find(
                            (t) =>
                              String(t.id) ===
                              String(
                                values.treatment_course_id
                              )
                          ) || null
                        }
                        isOptionEqualToValue={(
                          option,
                          value
                        ) =>
                          String(option.id) ===
                          String(value.id)
                        }
                        onChange={(
                          e,
                          value
                        ) => {
                          setFieldValue(
                            "treatment_course_id",
                            value
                              ? value.id
                              : ""
                          );
                          setFieldValue(
                            "treatment_course_name",
                            value
                              ? value.name
                              : ""
                          );
                        }}
                        renderInput={(
                          params
                        ) => (
                          <TextField
                            {...params}
                            placeholder="Select Treatment"
                          />
                        )}
                      />
                      <ErrorMessage
                        name="treatment_course_id"
                        component="div"
                        style={{
                          color: "red",
                        }}
                      />
                    </div>
                  </div>
                  {/* TOTAL CHARGE */}
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>
                        Total Charge
                        <span className="text-danger">
                          *
                        </span>
                      </label>
                      <div className="fixpricee">
                        <p className="code-dial">
                          USD($)
                        </p>
                        <Field
                          className="form-control"
                          type="number"
                          name="total_charge"
                          min="1"
                        />
                      </div>
                      <ErrorMessage
                        name="total_charge"
                        component="div"
                        style={{
                          color: "red",
                        }}
                      />
                    </div>
                  </div>
                  {/* AMOUNT PAID */}
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>
                        Amount Paid
                        <span className="text-danger">
                          *
                        </span>
                      </label>
                      <div className="fixpricee">
                        <p className="code-dial">
                          USD($)
                        </p>
                        <Field
                          className="form-control"
                          type="number"
                          name="amount_paid"
                          min="1"
                        />
                      </div>
                      <ErrorMessage
                        name="amount_paid"
                        component="div"
                        style={{
                          color: "red",
                        }}
                      />
                    </div>
                  </div>
                  {/* SERVICES */}
                  <div className="col-sm-12">
                    <div className="field-set">
                      <label>
                        Services
                        <span className="text-danger">
                          *
                        </span>
                      </label>
                      <Autocomplete
                        multiple
                        options={Service || []}
                        getOptionLabel={(
                          option
                        ) =>
                          option.serviceName ||
                          ""
                        }
                        value={Service.filter(
                          (service) =>
                            values.services
                              ?.map(String)
                              .includes(
                                String(
                                  service.serviceId
                                )
                              )
                        )}
                        isOptionEqualToValue={(
                          option,
                          value
                        ) =>
                          String(
                            option.serviceId
                          ) ===
                          String(
                            value.serviceId
                          )
                        }
                        onChange={(
                          event,
                          value
                        ) => {
                          const selectedIds =
                            value.map(
                              (item) =>
                                item.serviceId
                            );

                          setFieldValue(
                            "services",
                            selectedIds
                          );
                        }}
                        renderInput={(
                          params
                        ) => (
                          <TextField
                            {...params}
                            label="Select Services"
                          />
                        )}
                      />
                      <ErrorMessage
                        name="services"
                        component="div"
                        style={{
                          color: "red",
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* BUTTON */}
                <div className="mt-3">
                  <button
                    className="submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}