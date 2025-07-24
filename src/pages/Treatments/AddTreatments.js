// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Formik, Field, ErrorMessage, Form } from 'formik';
// import * as Yup from 'yup';
// import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router-dom';
// import { AddTeatment } from '../../reducer/TreatmentSlice';

// export default function AddTreatments() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [categories, setCategories] = useState([]);

//   // Validation Schema
//   const basicSchema = Yup.object().shape({
//     course_name: Yup.string()
//       .required('Course name is required')
//       .min(2, 'Course name must be at least 2 characters')
//       .max(50, 'Course name cannot exceed 50 characters'),
//     course_price: Yup.number()
//       .typeError("Price must be a number") // Ensures only numbers
//       .required("Course price is required")
//       .min(0, "Cannot be a negative number")
//       .max(100000000, "Too big"),


//     categories: Yup.array()
//       .of(
//         Yup.object().shape({
//           category_name: Yup.string().required("Category name is required"),
//         })
//       )
//       .min(1, "At least one category is required"), // Ensures at least one category is added
//   });

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="row">
//           <div className="col-md-12">
//             <h4 className="page-title"><span><i class="fi fi-sr-angle-double-small-left" onClick={()=>{
//                                     window.history.back()
//                                 }} style={{cursor:"pointer"}}></i></span>New Treatments</h4>
//           </div>
//         </div>
//         <div className="main_content">
//           <Formik
//             initialValues={{
//               course_name: "",
//               course_price: "",
//               categories: [], // Initialize categories as an empty array
//             }}
//             validationSchema={basicSchema}
//             onSubmit={async (values, { setSubmitting }) => {
//               try {
//                 // Log categories before submitting
//                 console.log("Categories:", values.categories);

//                 // Format the categories before dispatch
//                 const formattedData = {
//                   ...values, // Spread other values
//                   categories: values.categories.map((category) => category.category_name), // Extract category names
//                 };
//                 console.log("Formatted Data:", formattedData); // Log the formatted data

//                 // Dispatch the action
//                 const result = await dispatch(AddTeatment(formattedData)).unwrap();
//                 Swal.fire("Treatments added successfully!", "", "success");
//                 navigate("/Admin/Treatments");
//               } catch (err) {
//                 console.log(err);

//                 Swal.fire("Error!", err?.message || "An error occurred", "error");
//               }
//               setSubmitting(false);
//             }}
//           >
//             {({ values, isSubmitting, setFieldValue }) => (
//               <Form>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <div className="field-set">
//                       <label>Treatment Course Name<span className="text-danger">*</span></label>
//                       <Field className="form-control" type="text" name="course_name" />
//                       <ErrorMessage name="course_name" component="div" style={{ color: 'red' }} />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="field-set">
//                       <label>Treatments Course Price<span className="text-danger">*</span></label>
//                       <Field
//                         className="form-control"
//                         type="number"  // Ensures only numeric input
//                         name="course_price"
//                         onKeyDown={(e) => {
//                           if (e.key === "e" || e.key === "E" || e.key === "+" || e.key === "-") {
//                             e.preventDefault(); // Prevents invalid characters like 'e', '+', '-'
//                           }
//                         }}
//                       />
//                       <ErrorMessage name="course_price" component="div" style={{ color: 'red' }} />
//                     </div>
//                   </div>
//                   <div className="col-sm-12">
//                     <div className="field-set1">
//                       <label>Categories<span className="text-danger">*</span></label>
//                       {values.categories.map((category, index) => (
//                         <div key={index} style={{ display: 'flex', marginBottom: '15px', alignItems: 'center' }}>
//                           <Field
//                             type="text"
//                             className="form-control"
//                             name={`categories.${index}.category_name`} // Dot notation for nested fields
//                             placeholder="Enter Category Name"
//                           />
//                           <ErrorMessage
//                             name={`categories.${index}.category_name`}
//                             component="div"
//                             style={{ color: 'red', marginLeft: '10px' }}
//                           />
//                           <button
//                             type="button"
//                             onClick={() => {
//                               const updatedCategories = values.categories.filter((_, i) => i !== index);
//                               setFieldValue('categories', updatedCategories);
//                             }}
//                             className='submit-btn ml-4'
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                       <div className='d-flex'>
//                         <div className='mr-4'>
//                           <button
//                             type="button"
//                             onClick={() =>
//                               setFieldValue('categories', [
//                                 ...values.categories,
//                                 { category_name: '' },
//                               ])
//                             }
//                             className="submit-btn"
//                           >
//                             Add Category
//                           </button>
//                         </div>
//                         <div className="">
//                           <button type="submit" className="submit-btn" disabled={isSubmitting}>
//                             Submit
//                           </button>
//                         </div>
//                       </div>
//                       {/* Custom ErrorMessage for categories */}
//                       {/* <ErrorMessage name="categories">
//                             {(msg) => {
//                               const errorText = Array.isArray(msg)
//                                 ? msg.join(', ')
//                                 : typeof msg === 'object'
//                                   ? JSON.stringify(msg)
//                                   : msg;
//                               return <div style={{ color: 'red', marginTop: '10px' }}>{errorText}</div>;
//                             }}
//                           </ErrorMessage> */}
//                     </div>
//                   </div>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AddTeatment } from '../../reducer/TreatmentSlice';

export default function AddTreatments() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validation Schema
  const basicSchema = Yup.object().shape({
    course_name: Yup.string()
      .required('Course name is required')
      .min(2, 'Course name must be at least 2 characters')
      .max(50, 'Course name cannot exceed 50 characters'),

    course_price: Yup.number()
      .typeError('Price must be a number')
      .required('Course price is required')
      .min(0, 'Cannot be a negative number')
      .max(100000000, 'Too big'),

    icon_image: Yup.mixed()
      .required('Image is required')
      .test(
        'fileType',
        'Unsupported file format',
        (value) =>
          value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
      ),
  });

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">
              <span>
                <i
                  className="fi fi-sr-angle-double-small-left"
                  onClick={() => window.history.back()}
                  style={{ cursor: 'pointer' }}
                ></i>
              </span>
              New Treatments
            </h4>
          </div>
        </div>

        <div className="main_content">
          <Formik
            initialValues={{
              course_name: '',
              course_price: '',
              icon_image: null,
             
            }}
            validationSchema={basicSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const formData = new FormData();
                formData.append('course_name', values.course_name);
                formData.append('course_price', values.course_price);
                formData.append('icon_image', values.icon_image);

                const result = await dispatch(AddTeatment(formData)).unwrap();
                Swal.fire('Treatments added successfully!', '', 'success');
                navigate('/Admin/Treatments');
              } catch (err) {
                console.error(err);
                Swal.fire('Error!', err?.message || 'An error occurred', 'error');
              }
              setSubmitting(false);
            }}
          >
            {({ values, isSubmitting, setFieldValue }) => (
              <Form>
                <div className="row">
                  {/* Course Name */}
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>
                        Treatment Course Name<span className="text-danger">*</span>
                      </label>
                      <Field
                        className="form-control"
                        type="text"
                        name="course_name"
                      />
                      <ErrorMessage
                        name="course_name"
                        component="div"
                        style={{ color: 'red' }}
                      />
                    </div>
                  </div>

                  {/* Course Price */}
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>
                        Treatments Course Price<span className="text-danger">*</span>
                      </label>
                      <Field
                        className="form-control"
                        type="number"
                        name="course_price"
                        onKeyDown={(e) => {
                          if (
                            e.key === 'e' ||
                            e.key === 'E' ||
                            e.key === '+' ||
                            e.key === '-'
                          ) {
                            e.preventDefault();
                          }
                        }}
                      />
                      <ErrorMessage
                        name="course_price"
                        component="div"
                        style={{ color: 'red' }}
                      />
                    </div>
                  </div>

                  {/* Icon Image */}
                  <div className="col-sm-12">
                    <div className="field-set">
                      <label>
                        Icon Image<span className="text-danger">*</span>
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(event) =>
                          setFieldValue('icon_image', event.currentTarget.files[0])
                        }
                      />
                      <ErrorMessage
                        name="icon_image"
                        component="div"
                        style={{ color: 'red' }}
                      />
                    </div>
                  </div>

                  {/* Categories */}
                     <div>
                          <button
                            type="submit"
                            className="submit-btn"
                            disabled={isSubmitting}
                          >
                            Submit
                          </button>
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
