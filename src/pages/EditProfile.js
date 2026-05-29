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
          <div className="row">
            <div className="col-sm-12">
              <h4 className="page-title">Edit Profile</h4>
            </div>
          </div>
          <div className="card-box">
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
                        <label className="focus-label">Name</label>
                        <Field type="text" className="form-control floating" name="name" />
                      </div>
                      <ErrorMessage name="name" component="div" style={{ color: "red" }} />
                    </div>
                    <div className="col-md-6">
                      <div className="field-set">
                        <label className="focus-label">Email</label>
                        <Field type="email" className="form-control floating" name="email" />
                        <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="field-set">
                        <label className="focus-label">Phone No</label>
                        <Field type="number" className="form-control floating" name="phone_no" />
                        <ErrorMessage name="phone_no" component="div" style={{ color: "red" }} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="field-set">
                        <label className="focus-label">Gender</label>
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
    </>
  )
}

{/* <div className="card-box">
              <h3 className="card-title">Contact Informations</h3>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group form-focus">
                    <label className="focus-label">Address</label>
                    <input type="text" className="form-control floating" value="4487 Snowbird Lane" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">State</label>
                    <input type="text" className="form-control floating" value="New York" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Country</label>
                    <input type="text" className="form-control floating" value="United States" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Pin Code</label>
                    <input type="text" className="form-control floating" value="10523" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Phone Number</label>
                    <input type="text" className="form-control floating" value="631-889-3206" />
                  </div>
                </div>
              </div>
            </div> */}
{/* <div className="card-box">
              <h3 className="card-title">Education Informations</h3>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Institution</label>
                    <input type="text" className="form-control floating" value="Oxford University" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Subject</label>
                    <input type="text" className="form-control floating" value="Computer Science" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Starting Date</label>
                    <div className="cal-icon">
                      <input type="text" className="form-control floating datetimepicker"
                        value="01/06/2002" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Complete Date</label>
                    <div className="cal-icon">
                      <input type="text" className="form-control floating datetimepicker"
                        value="31/05/2006" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Degree</label>
                    <input type="text" className="form-control floating" value="BE Computer Science" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Grade</label>
                    <input type="text" className="form-control floating" value="Grade A" />
                  </div>
                </div>
              </div>
              <div className="add-more">
                <a href="#" className="btn btn-primary"><i className="fa fa-plus"></i> Add More Institute</a>
              </div>
            </div> */}
{/* <div className="card-box">
              <h3 className="card-title">Experience Informations</h3>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Company Name</label>
                    <input type="text" className="form-control floating" value="Digital Devlopment Inc" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Location</label>
                    <input type="text" className="form-control floating" value="United States" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Job Position</label>
                    <input type="text" className="form-control floating" value="Web Developer" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Period From</label>
                    <div className="cal-icon">
                      <input type="text" className="form-control floating datetimepicker"
                        value="01/07/2007" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group form-focus">
                    <label className="focus-label">Period To</label>
                    <div className="cal-icon">
                      <input type="text" className="form-control floating datetimepicker"
                        value="08/06/2018" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-more">
                <a href="#" className="btn btn-primary"><i className="fa fa-plus"></i> Add More Experience</a>
              </div>
            </div> */}


