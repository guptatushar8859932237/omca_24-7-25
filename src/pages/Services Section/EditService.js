


// // import { useDispatch, useSelector } from 'react-redux';
// // import Swal from "sweetalert2";
// // import { Formik, Field, ErrorMessage, Form } from "formik";
// // import * as Yup from "yup";
// // import { AddMulServices } from '../../reducer/ServiceSlice';
// // import { NavLink, useLocation, useNavigate } from "react-router-dom";
// // import { useState } from 'react';
// // export default function EditService() {
// //     const location = useLocation()
// //     const dispatch = useDispatch()
// // const [data,setData]=useState([])
// //    const { Service, loading, error } = useSelector((state) => state.Service);
// //     console.log(location.state.serviceId)
// //     const navigate = useNavigate();
// //     const basicSchema = Yup.object().shape({
// //         serviceName: Yup.string()
// //             .required('Service Name is required'),

// //         description: Yup.string()
// //             .required('Description is required'),
// //         price: Yup.string()
// //             .required('Price  is required'),
// //         duration: Yup.string().required("Duration is required"),
// //     });

// //      useEffect(() => {
// //         if (location.state?.serviceId && Service.length > 0) {
// //           const selectedUser = Service.find(
// //             (item) => item.serviceId === location.state.serviceId
// //           );
// //           setData(selectedUser || {});
// //         }
// //       }, [location.state?.serviceId, Service]);
// //     // const handelSubmit = async (e) => {
// //     //   e.preventDefault();


// //     //   try {
// //     //     // Use unwrap to handle success or error directly
// //     //     const result = await dispatch(AddAllStaffuser(formData)).unwrap();

// //     //     Swal.fire({
// //     //       title: "Staff added successfully!",
// //     //       text: "You clicked the button!",
// //     //       icon: "success",
// //     //     });
// //     //     navigate("/Admin/Staff");
// //     //   } catch (err) {
// //     //     Swal.fire({
// //     //       title: "Error!",
// //     //       text: err?.message || "An error occurred",
// //     //       icon: "error",
// //     //     });
// //     //   }
// //     // };
// //     return (
// //         <>
// //             <div className="page-wrapper">
// //                 <div className="content">
// //                     <div className="row">
// //                         <div className="col-md-12">
// //                             <h4 className="page-title"><span><i class="fi fi-sr-angle-double-small-left"></i></span>Edit Services</h4>
// //                         </div>
// //                     </div>
// //                     <div className="main_content">
// //                         <Formik
// //                             initialValues={{
// //                                 serviceName: "",
// //                                 description: "",
// //                                 price: "",
// //                                 duration: "",

// //                             }}
// //                             validationSchema={basicSchema}
// //                             onSubmit={async (values, { setSubmitting }) => {
// //                                 try {
// //                                     const result = await dispatch(AddMulServices(values)).unwrap();
// //                                     Swal.fire("Services added successfully!", "", "success");
// //                                     navigate("/Admin/Services");
// //                                 } catch (err) {
// //                                     console.log(err)
// //                                     Swal.fire("Error!", err?.message || "An error occurred", "error");
// //                                 }
// //                                 setSubmitting(false);
// //                             }}
// //                         >
// //                             {({ isSubmitting, setFieldValue }) => (
// //                                 <Form>
// //                                     <div className="row">
// //                                         {/* Name */}
// //                                         <div className="col-sm-6">
// //                                             <div className="field-set">
// //                                                 <label>Service Name <span className="text-danger">*</span></label>
// //                                                 <Field className="form-control" type="text" name="serviceName" />
// //                                                 <ErrorMessage name="serviceName" component="p" style={{ color: "red" }} />
// //                                             </div>
// //                                         </div>
// //                                         <div className="col-sm-6">
// //                                             <div className="field-set">
// //                                                 <label>Description<span className="text-danger">*</span></label>
// //                                                 <Field className="form-control" type="text" name="description" />
// //                                                 <ErrorMessage name="description" component="p" style={{ color: "red" }} />
// //                                             </div>
// //                                         </div>
// //                                         <div className="col-sm-6">
// //                                             <div className="field-set">
// //                                                 <label>Duration <span className="text-danger">*</span></label>
// //                                                 <Field as="select" className="form-control" name="duration">
// //                                                     <option value="">Select duration</option>
// //                                                     <option value="One-Time">One-Time</option>
// //                                                     <option value="Day">Day</option>
// //                                                     <option value="Month">Month</option>
// //                                                 </Field>
// //                                                 <ErrorMessage name="duration" component="p" style={{ color: "red" }} />
// //                                             </div>
// //                                         </div>

// //                                         <div className="col-sm-6">
// //                                             <div className="field-set">
// //                                                 <label>Price <span className="text-danger">*</span></label>
// //                                                 <Field className="form-control" type="text" name="price" />
// //                                                 <ErrorMessage name="price" component="div" style={{ color: "red" }} />
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                     <div className="">
// //                                         <button
// //                                             className="submit-btn"
// //                                             type="submit"
// //                                             disabled={isSubmitting || loading}
// //                                         >
// //                                             {loading ? "Submitting..." : "Create Service"}
// //                                         </button>
// //                                     </div>
// //                                 </Form>
// //                             )}
// //                         </Formik>
// //                     </div>
// //                 </div>
// //             </div>
// //         </>
// //     )
// // }

// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";
// import axios from "axios";

// export default function EditService() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const serviceId = location?.state?.serviceId;

//     const [formData, setFormData] = useState({
//         serviceName: "",
//         description: "",
//         price: "",
//         duration: ""
//     });

//     const [loading, setLoading] = useState(false);

//     // Fetch existing service data
//     useEffect(() => {
//         if (serviceId) {
//             axios.get(`/api/services/${serviceId}`)
//                 .then((res) => {
//                     setFormData(res.data); // Assuming res.data has keys: serviceName, description, price, duration
//                 })
//                 .catch((err) => {
//                     console.error(err);
//                     Swal.fire("Error!", "Failed to fetch service data", "error");
//                 });
//         }
//     }, [serviceId]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             await axios.put(`/api/services/${serviceId}`, formData);
//             Swal.fire("Success", "Service updated successfully", "success");
//             navigate("/Admin/Services");
//         } catch (err) {
//             console.error(err);
//             Swal.fire("Error", err.response?.data?.message || "Update failed", "error");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="page-wrapper">
//             <div className="content">
//                 <div className="row">
//                     <div className="col-md-12">
//                         <h4 className="page-title"><span><i className="fi fi-sr-angle-double-small-left"></i></span> Edit Services</h4>
//                     </div>
//                 </div>
//                 <div className="main_content">
//                     <form onSubmit={handleSubmit}>
//                         <div className="row">
//                             <div className="col-sm-6">
//                                 <div className="field-set">
//                                     <label>Service Name <span className="text-danger">*</span></label>
//                                     <input
//                                         className="form-control"
//                                         type="text"
//                                         name="serviceName"
//                                         value={formData.serviceName}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                             <div className="col-sm-6">
//                                 <div className="field-set">
//                                     <label>Description <span className="text-danger">*</span></label>
//                                     <input
//                                         className="form-control"
//                                         type="text"
//                                         name="description"
//                                         value={formData.description}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                             <div className="col-sm-6">
//                                 <div className="field-set">
//                                     <label>Duration <span className="text-danger">*</span></label>
//                                     <select
//                                         className="form-control"
//                                         name="duration"
//                                         value={formData.duration}
//                                         onChange={handleChange}
//                                         required
//                                     >
//                                         <option value="">Select duration</option>
//                                         <option value="One-Time">One-Time</option>
//                                         <option value="Day">Day</option>
//                                         <option value="Month">Month</option>
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="col-sm-6">
//                                 <div className="field-set">
//                                     <label>Price <span className="text-danger">*</span></label>
//                                     <input
//                                         className="form-control"
//                                         type="number"
//                                         name="price"
//                                         value={formData.price}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="mt-3">
//                             <button className="submit-btn" type="submit" disabled={loading}>
//                                 {loading ? "Updating..." : "Update Service"}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }
// import statements same rakhne hai
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios"; // Axios added
import { baseurl } from '../../Basurl/Baseurl';

export default function EditService() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const { Service, loading, error } = useSelector((state) => state.Service);
    const navigate = useNavigate();

    const basicSchema = Yup.object().shape({
        serviceName: Yup.string().required('Service Name is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.string().required('Price is required'),
        duration: Yup.string().required("Duration is required"),
    });

    useEffect(() => {
        if (location.state?.serviceId && Service.length > 0) {
            const selectedUser = Service.find(
                (item) => item.serviceId === location.state.serviceId
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
                                <span><i className="fi fi-sr-angle-double-small-left" style={{cursor:"pointer"}} onClick={()=>{
                                    window.history.back()
                                }}></i></span>
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
                                    await axios.post(`${baseurl}update_service/${location.state.serviceId}`, values,{
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",

        },
      }); // 🔁 Change endpoint as needed
                                    Swal.fire("Service added successfully!", "", "success");
                                    navigate("/Admin/Services");
                                } catch (err) {
                                    console.error(err);
                                    Swal.fire("Error!", err?.response?.data?.message || "An error occurred", "error");
                                }
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="field-set">
                                                <label>Service Name <span className="text-danger">*</span></label>
                                                <Field className="form-control" type="text" name="serviceName" />
                                                <ErrorMessage name="serviceName" component="p" style={{ color: "red" }} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="field-set">
                                                <label>Description<span className="text-danger">*</span></label>
                                                <Field className="form-control" type="text" name="description" />
                                                <ErrorMessage name="description" component="p" style={{ color: "red" }} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="field-set">
                                                <label>Duration <span className="text-danger">*</span></label>
                                                <Field as="select" className="form-control" name="duration">
                                                    <option value="">Select duration</option>
                                                    <option value="One-Time">One-Time</option>
                                                    <option value="Day">Day</option>
                                                    <option value="Month">Month</option>
                                                </Field>
                                                <ErrorMessage name="duration" component="p" style={{ color: "red" }} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="field-set">
                                                <label>Price <span className="text-danger">*</span></label>
                                                <Field className="form-control" type="text" name="price" />
                                                <ErrorMessage name="price" component="div" style={{ color: "red" }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <button
                                            className="submit-btn"
                                            type="submit"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Submitting..." : "Create Service"}
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
