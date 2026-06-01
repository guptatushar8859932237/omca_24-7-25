import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { image } from '../Basurl/Baseurl'
import { GetUserData } from '../reducer/userSlice'
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { EdituserData } from '../reducer/userSlice'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function EditProfile() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch()
  const { getuser, loading, error } = useSelector((state) => state.getuser)
  console.log(getuser)
  useEffect(() => {
    dispatch(GetUserData());
  }, [dispatch]);
  useEffect(() => {
    console.log(error, getuser);
  }, [error, getuser]);


  const basicSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    phone_no: Yup.string()
      .matches(/^[0-9]{10,11}$/, 'Phone number must be 10-11 digits')
      .required('Phone number is required'),
    gender: Yup.string()
      .oneOf(['Male', 'Female', 'Others'], 'Invalid gender selection')
      .required('Gender is required'),
    profileImage: Yup.mixed()
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
                  Edit Profile
                </h6>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <Formik
                  enableReinitialize
                  initialValues={{
                    name: getuser?.name || "",
                    email: getuser?.email || "",
                    phone_no: getuser?.phone_no || "",
                    gender: getuser?.gender || "",
                    profileImage: getuser?.profileImage || null,
                  }}
                  validationSchema={basicSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {

                      const result = await dispatch(
                        EdituserData({ id: getuser._id, ...values })
                      ).unwrap();

                      Swal.fire("Success!", "Profile updated successfully.", "success");
                      navigate('/Admin/profile')
                    } catch (err) {
                      alert(err)
                      Swal.fire("Error!", err?.message || "An error occurred", "error");
                    }
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                      <div className="row">
                        <div className='col-md-12'>
                          <div className="profile-img-wrap">
                            {selectedImage ? (
                              <img
                                className="avatar"
                                src={URL.createObjectURL(selectedImage)}
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                              />
                            ) : getuser?.profileImage ? (
                              <img
                                className="avatar"
                                src={`${image}${getuser.profileImage}`}
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                              />
                            ) : (
                              <img
                                className="avatar"
                                src="assets/img/user.jpg"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                              />
                            )}

                            <div className="fileupload btn">
                              <span className="btn-text"><i class="fa fa-camera" aria-hidden="true"></i></span>
                              <input
                                type="file"
                                className="upload"
                                onChange={(event) => {
                                  setFieldValue("profileImage", event.target.files[0]);
                                  setSelectedImage(event.target.files[0]);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="field-set">
                            <label className="focus-label">Name<span className="text-danger">*</span></label>
                            <Field type="text" className="form-control floating" name="name" />
                          </div>
                          <ErrorMessage name="name" component="div" style={{ color: "red" }} />
                        </div>
                        <div className="col-md-6">
                          <div className="field-set">
                            <label className="focus-label">Email<span className="text-danger">*</span></label>
                            <Field type="email" className="form-control floating" name="email" />
                            <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="field-set">
                            <label className="focus-label">Phone No<span className="text-danger">*</span></label>
                            <Field type="number" className="form-control floating" name="phone_no" />
                            <ErrorMessage name="phone_no" component="div" style={{ color: "red" }} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="field-set">
                            <label className="focus-label">Gender<span className="text-danger">*</span></label>
                            <Field as="select" className="form-control floating" name="gender">
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Others">Others</option>
                            </Field>
                            <ErrorMessage name="gender" component="div" style={{ color: "red" }} />
                          </div>
                        </div>
                        <div className="">
                          <button className="submit-btn" type="submit" >Submit</button>
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
  )
}