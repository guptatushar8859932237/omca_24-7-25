import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { AddHospitalData } from '../../reducer/HospitalSlice'
import { image } from '../../Basurl/Baseurl'
import { EditHospital } from '../../reducer/HospitalSlice'
import { useNavigate } from "react-router-dom";
import { GetAllHositalData } from '../../reducer/HospitalSlice'
import { GetAllCountries2 } from "../../reducer/Countries";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
export default function EditHospitals() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state.hospitalId)
  const dispatch = useDispatch()
  const [selectedImage, setSelectedImage] = useState(null);
  const { hospital, loading, error } = useSelector((state => state.hospital))
  console.log(hospital)
  const [editHospitals, setEditHospitals] = useState('')
const {Countries} = useSelector((state)=>state.Countries)
  useEffect(()=>{
    dispatch(GetAllCountries2())
  },[])

  useEffect(() => {
    dispatch(GetAllHositalData())
    console.log(error, hospital)
  }, [dispatch])
  useEffect(() => {
    if (hospital.length > 0 && location.state.hospitalId) {
      const selectedUser = hospital.filter((item) => item.hospitalId === location.state.hospitalId);
      setEditHospitals(selectedUser[0]);
    }
  }, [hospital, location.state.hospitalId]);
  console.log(editHospitals)
  const basicSchema = Yup.object().shape({
    hospitalName: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters'),
    location: Yup.string()
      .required("location is Required"),
    hospitalCode: Yup.string()
      .required("hospital code is  Required"),
    contact: Yup.string()
      .matches(/^[0-9]{10,11}$/, 'Phone number must be 10-11 digits')
      .required('Phone number is required'),
    hospitalImage: Yup.mixed()
      .required('A ProfileImage is required'),
    country: Yup.mixed()
      .required('Country is required')
  });
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title"><span><i class="fi fi-sr-angle-double-small-left" onClick={()=>{
                                    window.history.back()
                                }} style={{cursor:"pointer"}}></i></span>Edit Hospital</h4>
            </div>
          </div>
          <div className="main_content">
            <Formik
              enableReinitialize // Allows reinitialization of the form when props change
              initialValues={{
                hospitalName: editHospitals?.hospitalName || "",
                location: editHospitals?.location || "",
                hospitalCode: editHospitals?.hospitalCode || "",
                contact: editHospitals?.contact || "",
                country: editHospitals?.country || "",
                hospitalImage: editHospitals?.hospitalImage || null,
              }}
              validationSchema={basicSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {

                  const result = await dispatch(
                    EditHospital({ id: editHospitals.hospitalId, ...values })
                  ).unwrap();

                  Swal.fire("Success!", "Hospital details updated successfully.", "success");
                  navigate('/Admin/Hospitals')
                } catch (err) {
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
                        <Field className="form-control" type="text" name="hospitalCode" disabled />
                        <ErrorMessage name="hospitalCode" component="div" style={{ color: "red" }} />
                      </div>
                    </div>
                     <div className="col-sm-6">
                                            <div className="field-set">
                                              <label>
                                                Country<span className="text-danger">*</span>
                                              </label>
                                              <Field name="country">
                                                {({ field, form: { setFieldValue }, meta }) => (
                                                  <FormControl
                                                    fullWidth
                                                    size="small"
                                                    error={!!meta.touched && !!meta.error}
                                                  >
                                                    <InputLabel>Select Country</InputLabel>
                                                    <Select
                                                      value={field.value}
                                                      onChange={(e) =>
                                                        setFieldValue("country", e.target.value)
                                                      }
                                                      input={
                                                        <OutlinedInput label="Select Country" />
                                                      }
                                                      displayEmpty
                                                      sx={{ height: 40 }}
                                                      MenuProps={{
                                                        PaperProps: {
                                                          style: {
                                                            maxHeight: 200,
                                                          },
                                                        },
                                                      }}
                                                    >
                                                      <MenuItem value="">
                                                        <em>Select Country</em>
                                                      </MenuItem>
                                                      {Countries.map((country, i) => (
                                                        <MenuItem key={i} value={country.name}>
                                                          {country.name}
                                                        </MenuItem>
                                                      ))}
                                                    </Select>
                                                    <ErrorMessage
                                                      name="country"
                                                      component="div"
                                                      style={{ color: "red" }}
                                                    />
                                                  </FormControl>
                                                )}
                                              </Field>
                                            </div>
                                          </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>Contact<span className="text-danger">*</span></label>
                        <Field className="form-control" type="text" name="contact" />
                        <ErrorMessage name="contact" component="div" style={{ color: "red" }} />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>Hospital Image</label>
                        <div className="profile-upload">
                          <div className="upload-img">
                            {selectedImage ? (
                              <img alt="preview" src={URL.createObjectURL(selectedImage)}/>
                            ) : editHospitals?.hospitalImage ? (
                              <img alt="current avatar" src={`${image}${editHospitals?.hospitalImage}`}/>
                            ) : (
                              <img alt="default avatar" src="assets/img/user.jpg"/>
                            )}
                          </div>
                          <div className="upload-input">
                            <input
                              type="file"
                              className="form-control"
                              onChange={(event) => {
                                setFieldValue("profileImage", event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                              }}
                            />
                          </div>
                          <ErrorMessage name="hospitalImage" component="div" style={{ color: "red" }} />
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
