import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { AddHospitalData } from '../../reducer/HospitalSlice'
import { useNavigate } from "react-router-dom";
import hospital from '../../img/hospital 3.jpg'
export default function AddHospitals() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState(null);
  const { hospital, loading, error } = useSelector((state => state.staff))
  const basicSchema = Yup.object().shape({
    hospitalName: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters'),
    location: Yup.string()
      .required("Location is Required"),
    hospitalCode: Yup.string()
      // .matches(passwordRules, { message: "Please create a stronger password" })
      .required("Hospital code is  Required"),
    contact: Yup.string()
      .matches(/^[0-9]{10,11}$/, 'Phone number must be 10-11 digits')
      .required('Phone number is required'),
    hospitalImage: Yup.mixed()
      .required('Image is required')
      .test('fileSize', 'File size is too large (Max: 2MB)', (value) =>
        value ? value.size <= 2 * 1024 * 1024 : true
      )
      .test('fileType', 'Unsupported file format', (value) =>
        value ? ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type) : true
      ),
  });
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title"><span><i class="fi fi-sr-angle-double-small-left" onClick={()=>{
                                    window.history.back()
                                }} style={{cursor:"pointer"}}></i></span>New Hospital</h4>
            </div>
          </div>
          <div className="main_content">
            <Formik
              initialValues={{
                hospitalName: "",
                location: "",
                hospitalCode: "",
                contact: "",
                hospitalImage: null,
              }}
              validationSchema={basicSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const result = await dispatch(AddHospitalData(values)).unwrap();
                  Swal.fire("Hospital added successfully!", "", "success");
                  navigate("/Admin/Hospitals");
                } catch (err) {
                  console.log(err)
                  Swal.fire("Error!", err?.message || "An error occurred", "error");
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>Hospital Name<span className="text-danger">*</span></label>
                        <Field className="form-control" type="text" name="hospitalName" />
                        <ErrorMessage name="hospitalName" component="div" style={{ color: "red" }} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>Location<span className="text-danger">*</span></label>
                        <Field className="form-control" type="text" name="location" />
                        <ErrorMessage name="location" component="div" style={{ color: "red" }} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>Hospital Code<span className="text-danger">*</span></label>
                        <Field className="form-control" type="text" name="hospitalCode" />
                        <ErrorMessage name="hospitalCode" component="div" style={{ color: "red" }} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>Contact<span className="text-danger">*</span> </label>
                        <Field className="form-control" type="text" name="contact" />
                        <ErrorMessage name="contact" component="div" style={{ color: "red" }} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>Hospital Image<span className="text-danger">*</span></label>
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
                                src="https://thumbs.dreamstime.com/b/hospital-ambulances-took-injured-to-70641786.jpg?w=992"
                                // style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                onError={(e) => {
                                  e.target.src = "https://via.placeholder.com/150";
                                }}
                              />
                            )}
                          </div>
                          <div className="upload-input">
                            <input
                              type="file"
                              className="form-control"
                              onChange={(event) => {
                                setFieldValue("hospitalImage", event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                              }}
                            />
                            <ErrorMessage name="hospitalImage" component="div" style={{ color: "red" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <button className="submit-btn">Submit</button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}