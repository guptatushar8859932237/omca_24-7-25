// import React from 'react'
// import { Formik, Field, ErrorMessage, Form } from 'formik';
// import * as Yup from 'yup';
// import { useState, useEffect } from 'react'
// import Swal from "sweetalert2";
// import { useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { EditTreatmentssection } from '../../reducer/TreatmentSlice'
// import { useNavigate } from "react-router-dom";
// import { GetAllTreatment } from '../../reducer/TreatmentSlice'
// export default function EditTreatments() {
//   // Validation Schema
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { Treatment, loading, error } = useSelector((state) => state.Treatment);
//   const [editTreatment, setEditTreatment] = useState('')
//   useEffect(() => {
//     dispatch(GetAllTreatment())
//   }, [dispatch])
//   useEffect(() => {
//     if (location.state.course_id) {
//       const selectedUser = Treatment.filter((item) => item.course_id === location.state.course_id);
//       setEditTreatment(selectedUser[0])
//     }
//   })
//   console.log(editTreatment)
//   const basicSchema = Yup.object().shape({
//     course_name: Yup.string()
//       .required('Course name is required')
//       .min(2, 'Course name must be at least 2 characters')
//       .max(50, 'Course name cannot exceed 50 characters'),
//     course_price: Yup.string()
//       .required('Course price is required')
//       .min(2, 'Course price must be at least 2 characters')
//       .max(50, 'Course price cannot exceed 50 characters'),
//     // categories: Yup.array()

//     //   .required("At least one category is required"),

//   });
//   return (
//     <>
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="row">
//             <div className="col-md-12">
//               <h4 className="page-title"><span><i class="fi fi-sr-angle-double-small-left"></i></span>Edit Treatments</h4>
//             </div>
//           </div>
//           <div className="main_content">
//             <Formik
//               enableReinitialize // Add this prop to reinitialize initialValues on changes
//               initialValues={{
//                 course_name: editTreatment?.course_name || '', // Use optional chaining and fallback
//                 course_price: editTreatment?.course_price || '',
//               }}
//               validationSchema={basicSchema}
//               onSubmit={async (values, { setSubmitting }) => {
//                 try {
//                   const result = await dispatch(
//                     EditTreatmentssection({ id: editTreatment.course_id, ...values })
//                   ).unwrap();

//                   Swal.fire("Success!", "Treatment details updated successfully.", "success");
//                   navigate('/Admin/Treatments');
//                 } catch (err) {
//                   Swal.fire("Error!", err?.message || "An error occurred", "error");
//                 }
//                 setSubmitting(false);
//               }}
//             >
//               {({ isSubmitting }) => (
//                 <Form>
//                   <div className="row">
//                     <div className="col-sm-6">
//                       <div className="field-set">
//                         <label>Treatment Course Name<span className="text-danger">*</span></label>
//                         <Field className="form-control" type="text" name="course_name" />
//                         <ErrorMessage name="course_name" component="div" style={{ color: 'red' }} />
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="field-set">
//                         <label>Treatments Course Price<span className="text-danger">*</span></label>
//                         <Field className="form-control" type="text" name="course_price" />
//                         <ErrorMessage name="course_price" component="div" style={{ color: 'red' }} />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="">
//                     <button type="submit" className="submit-btn" disabled={isSubmitting}>Submit</button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }


// import React, { useState, useEffect } from 'react';
// import { Formik, Field, ErrorMessage, Form, FieldArray } from 'formik';
// import * as Yup from 'yup';
// import Swal from "sweetalert2";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
// import { EditTreatmentssection, GetAllTreatment } from '../../reducer/TreatmentSlice';

// export default function EditTreatments() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { Treatment } = useSelector((state) => state.Treatment);
//   const [editTreatment, setEditTreatment] = useState('');

//   useEffect(() => {
//     dispatch(GetAllTreatment());
//   }, [dispatch]);

//   useEffect(() => {
//     if (location.state?.course_id && Treatment.length > 0) {
//       const selectedUser = Treatment.find((item) => item.course_id === location.state.course_id);
//       if (selectedUser) {
//         setEditTreatment(selectedUser);
//       }
//     }
//   }, [location.state, Treatment]);

//   const basicSchema = Yup.object().shape({
//     course_name: Yup.string()
//       .required('Course name is required')
//       .min(2, 'Course name must be at least 2 characters')
//       .max(50, 'Course name cannot exceed 50 characters'),
//     course_price: Yup.string()
//       .required('Course price is required')
//       .min(1, 'Course price must be at least 1 character')
//       .max(50, 'Course price cannot exceed 50 characters'),
//     categories: Yup.array().of(
//       Yup.object().shape({
//         category_name: Yup.string().required('Category name is required'),
//       })
//     ),
//   });

//   return (
//     <>
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="row">
//             <div className="col-md-12">
//               <h4 className="page-title">
//                 <span><i className="fi fi-sr-angle-double-small-left" onClick={() => {
//                   window.history.back()
//                 }} style={{ cursor: "pointer" }}></i></span> Edit Treatments
//               </h4>
//             </div>
//           </div>
//           <div className="main_content">
//             <Formik
//               enableReinitialize
//               initialValues={{
//                 course_name: editTreatment?.course_name || '',
//                 course_price: editTreatment?.course_price?.toString() || '',
//                 categories: editTreatment?.categories || [{ category_name: '', category_id: '' }],
//               }}
//               validationSchema={basicSchema}
//               onSubmit={async (values, { setSubmitting }) => {
//                 try {
//                   const result = await dispatch(
//                     EditTreatmentssection({ id: editTreatment.course_id, ...values })
//                   ).unwrap();

//                   Swal.fire("Success!", "Treatment details updated successfully.", "success");
//                   navigate('/Admin/Treatments');
//                 } catch (err) {
//                   Swal.fire("Error!", err?.message || "An error occurred", "error");
//                 }
//                 setSubmitting(false);
//               }}
//             >
//               {({ isSubmitting, values }) => (
//                 <Form>
//                   <div className="row">
//                     <div className="col-sm-6">
//                       <div className="field-set">
//                         <label>Treatment Course Name <span className="text-danger">*</span></label>
//                         <Field className="form-control" type="text" name="course_name" />
//                         <ErrorMessage name="course_name" component="div" style={{ color: 'red' }} />
//                       </div>
//                     </div>
//                     <div className="col-sm-6">
//                       <div className="field-set">
//                         <label>Treatment Course Price <span className="text-danger">*</span></label>
//                         <Field className="form-control" type="text" name="course_price" />
//                         <ErrorMessage name="course_price" component="div" style={{ color: 'red' }} />
//                       </div>
//                     </div>
//                     <div className="col-sm-12">
//                       <div className="field-set1">
//                         <label>Categories <span className="text-danger">*</span></label>
//                         <FieldArray name="categories">
//                           {({ remove, push }) => (
//                             <>
//                               {values.categories.map((category, index) => (
//                                 <div key={index} style={{ display: 'flex', marginBottom: '15px', alignItems: 'center' }} >
//                                   <Field
//                                     className="form-control"
//                                     name={`categories[${index}].category_name`}
//                                     placeholder="Enter category name"
//                                   />
//                                   <ErrorMessage
//                                     name={`categories[${index}].category_name`}
//                                     component="div"
//                                     style={{ color: 'red' }}
//                                   />
//                                   {values.categories.length > 1 && (
//                                     <button
//                                       type="button"
//                                       className="submit-btn ml-4"
//                                       onClick={() => remove(index)}
//                                     >
//                                       Remove
//                                     </button>
//                                   )}
//                                   <Field
//                                     type="hidden"
//                                     name={`categories[${index}].category_id`}
//                                   />
//                                 </div>
//                               ))}
//                               <div className="d-flex">
//                                 <div className="mr-4">
//                                   <button
//                                     type="button"
//                                     onClick={() => push({ category_name: '', category_id: '' })}
//                                     className="submit-btn"
//                                   >
//                                     Add Category
//                                   </button>
//                                 </div>
//                                 <div>
//                                   <button type="submit" className="submit-btn" disabled={isSubmitting}>
//                                     Submit
//                                   </button>
//                                 </div>
//                               </div>
//                             </>
//                           )}
//                         </FieldArray>
//                       </div>
//                     </div>
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

import React, { useState, useEffect } from 'react';
import { Formik, Field, ErrorMessage, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { EditTreatmentssection, GetAllTreatment } from '../../reducer/TreatmentSlice';

export default function EditTreatments() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { Treatment } = useSelector((state) => state.Treatment);
  const [editTreatment, setEditTreatment] = useState('');

  useEffect(() => {
    dispatch(GetAllTreatment());
  }, [dispatch]);

  useEffect(() => {
    if (location.state?.course_id && Treatment.length > 0) {
      const selectedUser = Treatment.find((item) => item.course_id === location.state.course_id);
      if (selectedUser) {
        setEditTreatment(selectedUser);
      }
    }
  }, [location.state, Treatment]);

  const basicSchema = Yup.object().shape({
    course_name: Yup.string().required('Course name is required'),
    course_price: Yup.string().required('Course price is required'),
   
    icon_image: Yup.string().required('Image is required'), // Optional image
  });

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">
              <span>
                <i className="fi fi-sr-angle-double-small-left" onClick={() => window.history.back()} style={{ cursor: "pointer" }}></i>
              </span> Edit Treatments
            </h4>
          </div>
        </div>
        <div className="main_content">
          <Formik
            enableReinitialize
            initialValues={{
              course_name: editTreatment?.course_name || '',
              course_price: editTreatment?.course_price?.toString() || '',
              icon_image: null,
            }}
            validationSchema={basicSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const formData = new FormData();
                formData.append("course_name", values.course_name);
                formData.append("course_price", values.course_price);
                if (values.icon_image) {
                  formData.append("icon_image", values.icon_image);
                }

                await dispatch(EditTreatmentssection({ id: editTreatment.course_id, data: formData })).unwrap();
                Swal.fire("Success!", "Treatment updated successfully.", "success");
                navigate('/Admin/Treatments');
              } catch (err) {
                Swal.fire("Error!", err?.message || "An error occurred", "error");
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>Course Name <span className="text-danger">*</span></label>
                      <Field className="form-control" name="course_name" type="text" />
                      <ErrorMessage name="course_name" component="div" style={{ color: 'red' }} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>Course Price <span className="text-danger">*</span></label>
                      <Field className="form-control" name="course_price" type="text" />
                      <ErrorMessage name="course_price" component="div" style={{ color: 'red' }} />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    {/* <div className="field-set">
                      <label>Categories<span className="text-danger">*</span></label>
                      <FieldArray name="categories">
                        {({ remove, push }) => (
                          <>
                            {values.categories.map((category, index) => (
                              <div key={index} style={{ display: 'flex', marginBottom: '15px', alignItems: 'center' }}>
                                <Field
                                  name={`categories[${index}].category_name`}
                                  placeholder="Enter category name"
                                  className="form-control"
                                />
                                <Field
                                  type="hidden"
                                  name={`categories[${index}].category_id`}
                                />
                                <ErrorMessage
                                  name={`categories[${index}].category_name`}
                                  component="div"
                                  style={{ color: 'red' }}
                                />
                                {values.categories.length > 1 && (
                                  <button
                                    type="button"
                                    className="submit-btn ml-4"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            ))}
                            <div className="d-flex">
                              <div className="mr-4">
                               
                              </div>
                            </div>
                          </>
                        )}
                      </FieldArray>
                    </div> */}
                  </div>
                  <div className="col-sm-12">
                    <div className="field-set">
                      <label>Upload Image<span className="text-danger">*</span></label>
                      <input
                        type="file"
                        name="icon_image"
                        className="form-control"
                        onChange={(event) =>
                          setFieldValue("icon_image", event.currentTarget.files[0])
                        }
                      />
                      <ErrorMessage name="icon_image" component="div" style={{ color: 'red' }} />
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <button type="submit" className="submit-btn" disabled={isSubmitting}>Submit</button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
