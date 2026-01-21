import React, { useState, useEffect } from "react";
import { EditEnquiryType, GetAllEnquiry } from "../../reducer/EnquirySlice";
import { GetAllCountries, GetAllCountries2 } from "../../reducer/Countries";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { FormControl, MenuItem, OutlinedInput, Select } from "@mui/material";
import { image, imageUrl } from "../../Basurl/Baseurl";
import { Autocomplete, TextField } from "@mui/material";
import avtar from "../../img/avtarImg.jpg";
export default function EditEnquiry() {
  const dispatch = useDispatch();
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const location = useLocation();
  const navigate = useNavigate();
  const { Enquiry, loading } = useSelector((state) => state.Enquiry);
  const { Treatment, error } = useSelector((state) => state.Treatment);
  const { Countries } = useSelector((state) => state.Countries);
  const [editenquiry, setEnquiry] = useState("");
  useEffect(() => {
    dispatch(GetAllCountries2());
    dispatch(GetAllEnquiry());
  }, [dispatch]);
  useEffect(() => {
    if (location.state?.enquiryId && Enquiry.length > 0) {
      const selectedUser = Enquiry.find(
        (item) => item.enquiryId === location.state.enquiryId,
      );
      console.log(selectedUser);
      setEnquiry(selectedUser || {});
    }
  }, [location.state?.enquiryId, Enquiry]);
  const basicSchema = Yup.object().shape({
    name: Yup.string().required("Name is required").min(2).max(50),
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    age: Yup.string().required("Age is required"),
    town: Yup.string().required("Town is required"),
    address: Yup.string().required("Address is required"),
    emergency_contact_no: Yup.string().matches(
      /^[0-9]{8,15}$/,
      "Phone number must be Digit and between 8-15 digits",
    ),
    // .matches(/^[0-9]{10,11}$/, "Phone number must be 10-11 digits")
    // .required("Phone number is required"),
    passport_num: Yup.string().required("Passport number is required"),
    patient_emergency_contact_no: Yup.string().matches(
      /^[0-9]{8,15}$/,
      "Emergency Contact must be Digit and between 8-15 digits",
    ),
    patient_relation_no: Yup.string().matches(
      /^[0-9]{8,15}$/,
      "Patient Relation Number must be Digit and between 8-15 digits",
    ),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Others"], "Invalid gender selection")
      .required("Gender is required"),
    disease_name: Yup.string().required("Disease Name is required"),
    country: Yup.string().required("Country is required"),
     patient_id_proof: Yup.array().test(
    "fileSize",
    "Each file must be less than 2 MB",
    (files) => {
      if (!files || files.length === 0) return true;
      return files.every((file) => file.size <= MAX_FILE_SIZE);
    }
  ),
  patient_Profile: Yup.mixed().test(
    "fileSize",
    "File size must be less than 2 MB",
    (file) => {
      if (!file) return true;
      return file.size <= MAX_FILE_SIZE;
    }
  ),
    relation_id: Yup.mixed().test(
    "fileSize",
    "File size must be less than 2 MB",
    (file) => {
      if (!file) return true;
      return file.size <= MAX_FILE_SIZE;
    }
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
                  style={{ cursor: "pointer" }}
                  onClick={() => window.history.back()}
                ></i>
              </span>
              Edit Enquiry
            </h4>
          </div>
        </div>
        <div className="main_content">
          <div className="row">
            <div className="col-lg-12">
              <Formik
                enableReinitialize
                initialValues={{
                  name: editenquiry?.name || "",
                  age: editenquiry?.age || "",
                  town: editenquiry?.town || "",
                  email: editenquiry?.email || "",
                  gender: editenquiry?.gender || "",
                  dial_code: editenquiry?.phoneCode || "",
                  has_relation: !!(
                    editenquiry?.patient_relation_name ||
                    editenquiry?.patient_relation ||
                    editenquiry?.patient_relation_no
                  ),
                  emergency_contact_no: editenquiry?.emergency_contact || "",
                  patient_relation_name:
                    editenquiry?.patient_relation_name || "",
                  country: editenquiry?.country || "",
                  disease_name: editenquiry?.disease_name || "",
                  address: editenquiry?.address || "",
                  patient_emergency_contact_no:
                    editenquiry?.patient_emergency_contact_no || "",
                  patient_relation: editenquiry?.patient_relation || "",
                  Referral_Name: editenquiry?.Referral_Name || "",
                  address: editenquiry?.address || "",
                  passport_num: editenquiry?.passport_num || "",
                  patient_relation_no: editenquiry?.patient_relation_no || "",
                  patient_relation_address:
                    editenquiry?.patient_relation_address || "",
                  relation_id: null,
                  patient_id_proof: [],
                  patient_Profile: null,
                }}
                validationSchema={basicSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  const formData = new FormData();
                  for (const key in values) {
                    if (
                      key !== "patient_id_proof" &&
                      key !== "patient_Profile" &&
                      key !== "relation_id"
                    ) {
                      formData.append(key, values[key]);
                    }
                  }
                  if (
                    values.patient_id_proof &&
                    values.patient_id_proof.length > 0
                  ) {
                    values.patient_id_proof.forEach((file) => {
                      formData.append("patient_id_proof", file);
                    });
                  }
                  if (values.patient_Profile) {
                    formData.append("patient_Profile", values.patient_Profile);
                  }
                  if (values.relation_id) {
                    formData.append("relation_id", values.relation_id);
                  }
                  try {
                    await dispatch(
                      EditEnquiryType({
                        id: editenquiry.enquiryId,
                        formData,
                      }),
                    ).unwrap();

                    Swal.fire("Enquiry updated successfully!", "", "success");
                    navigate("/Admin/Inquiry");
                  } catch (err) {
                    Swal.fire("Error!", err?.message || "An error occurred");
                  }
                  setSubmitting(false);
                }}
              >
                {({ values, isSubmitting, setFieldValue }) => (
                  <Form encType="multipart/form-data">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Passport Number
                            <span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control"
                            name="passport_num"
                            type="text"
                          />
                          <ErrorMessage
                            name="passport_num"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Name<span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control"
                            name="name"
                            type="text"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Email<span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control"
                            name="email"
                            type="email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Age<span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control"
                            name="age"
                            type="number"
                          />
                          <ErrorMessage
                            name="age"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 d-flex">
                        <div className="field-set col-3">
                          <label>
                            Dial Code<span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control"
                            disabled
                            name="dial_code"
                          />
                          <ErrorMessage
                            name="dial_code"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                        <div className="field-set col-9">
                          <label>
                            Phone No (WhatsApp)
                            <span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control"
                            name="emergency_contact_no"
                          />
                          <ErrorMessage
                            name="emergency_contact_no"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6 d-flex">
                        <div className="field-set col-3">
                          <label>
                            Dial Code<span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control"
                            disabled
                            name="dial_code"
                          />
                          <ErrorMessage
                            name="dial_code"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                        <div className="field-set col-9">
                          <label>Emergency Contact No</label>
                          <Field
                            className="form-control"
                            name="patient_emergency_contact_no"
                          />
                          <ErrorMessage
                            name="patient_emergency_contact_no"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Address<span className="text-danger">*</span>
                          </label>
                          <Field className="form-control" name="address" />
                          <ErrorMessage
                            name="address"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Treatment name<span className="text-danger">*</span>
                          </label>
                          <Autocomplete
                            options={Treatment || []}
                            getOptionLabel={(option) =>
                              option.course_name || ""
                            }
                            value={
                              Treatment?.find(
                                (item) =>
                                  item.course_name === values.disease_name,
                              ) || null
                            }
                            onChange={(e, value) => {
                              setFieldValue(
                                "disease_name",
                                value?.course_name || "",
                              );
                              setFieldValue(
                                "treatment_course_id",
                                value?.course_id || null,
                              );
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select Treatment"
                                error={Boolean(
                                  values.disease_name === "" &&
                                  basicSchema?.fields?.disease_name,
                                )}
                              />
                            )}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                padding: "0px",
                                "&:hover fieldset": {
                                  borderColor: "#ced4da",
                                },
                              },
                            }}
                          />
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
                                <Select
                                  value={field.value}
                                  onChange={(e) => {
                                    const selected = Countries.find(
                                      (c) => c.name === e.target.value,
                                    );

                                    setFieldValue("country", e.target.value);
                                    setFieldValue(
                                      "dial_code",
                                      selected?.dial_code || "",
                                    );
                                  }}
                                  input={
                                    <OutlinedInput label="Select Country" />
                                  }
                                  displayEmpty
                                  sx={{ height: 40 }}
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
                      <div className="col-sm-6"></div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Town<span className="text-danger">*</span>
                          </label>
                          <Field className="form-control" name="town" />
                          <ErrorMessage
                            name="town"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set gender-select">
                          <label className="gen-label">
                            Gender<span className="text-danger">*</span>
                          </label>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <Field
                                type="radio"
                                name="gender"
                                value="Male"
                                className="form-check-input"
                              />{" "}
                              Male
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <Field
                                type="radio"
                                name="gender"
                                value="Female"
                                className="form-check-input"
                              />{" "}
                              Female
                            </label>
                          </div>
                          <div className="form-check-inline">
                            <label className="form-check-label">
                              <Field
                                type="radio"
                                name="gender"
                                value="Others"
                                className="form-check-input"
                              />
                              {" "}
                              Others
                            </label>
                          </div>
                        </div>
                        <ErrorMessage
                          name="gender"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Patient Id Proof accept only{" "}
                            (.jpeg,.jpg,.png,.jfif,.pdf)
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="patient_id_proof"
                            accept="image/*,application/pdf"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.currentTarget.files);
                              setFieldValue("patient_id_proof", files);
                            }}
                          />
                          {/* <ErrorMessage name="patient_id_proof" /> */}
                          <div className="imgid-main mt-1 d-flex gap-2 flex-wrap">
                            {Array.isArray(editenquiry.patient_id_proof) &&
                            editenquiry.patient_id_proof.length > 0 ? (
                              editenquiry.patient_id_proof.map((img, index) => (
                                <img
                                  key={index}
                                  src={`${imageUrl}${img}`}
                                  alt={`patient-id-${index}`}
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    border: "1px solid #ddd",
                                  }}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = avtar;
                                  }}
                                />
                              ))
                            ) : (
                              <img src={avtar} alt="default" />
                            )}
                          </div>

                          <ErrorMessage
                            name="patient_id_proof"
                            component="div"
                            className="text-danger"
                          />
                          {/* saddam is a good boy */}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Patient Profile accept only{" "}
                            (.jpeg,.jpg,.png,.jfif,.pdf)
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="patient_Profile"
                            accept="image/*,application/pdf"
                            multiple
                            // onChange={(e) => {
                            //   const files = Array.from(e.currentTarget.files);
                            //   setFieldValue("patient_Profile", files);
                            // }}
                            onChange={(e) =>
                              setFieldValue(
                                "patient_Profile",
                                e.currentTarget.files[0],
                              )
                            }
                          />
                          <div className="imgid-main mt-1">
                            <img
                              src={
                                editenquiry.patient_Profile
                                  ? `${imageUrl}${editenquiry.patient_Profile}`
                                  : `${avtar}`
                              }
                              alt=".."
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `${avtar}`;
                              }}
                            />
                          {/* <ErrorMessage name="patient_Profile" /> */}
                          </div>
                          <ErrorMessage
                            name="patient_Profile"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>Referral Name</label>
                          <Field
                            className="form-control"
                            name="Referral_Name"
                          />
                          <ErrorMessage
                            name="Referral_Name"
                            component="div"
                            style={{ color: "red" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-check mb-3">
                        <Field
                          type="checkbox"
                          name="has_relation"
                          className="form-check-input"
                          id="hasRelation"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="hasRelation"
                        >
                          Add Attendant / Patient Relation Details
                        </label>
                      </div>
                    </div>
                    {values.has_relation && (
                      <>
                        <div className="treat-hd">
                          <h6>Attendant Detail's</h6>
                          <span className="line"></span>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="field-set">
                              <label>
                                Attendant Full Name
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                className="form-control"
                                name="patient_relation_name"
                              />
                              <ErrorMessage
                                name="patient_relation_name"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="field-set">
                              <label>
                                Relationship with Patient
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                className="form-control"
                                name="patient_relation"
                              />
                              <ErrorMessage
                                name="patient_relation"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="field-set">
                              <label>
                                Attendant Address
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                className="form-control"
                                name="patient_relation_address"
                              />
                              <ErrorMessage
                                name="patient_relation_address"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="field-set">
                              <label>
                                Attendant Contact Number
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                className="form-control"
                                name="patient_relation_no"
                              />
                              <ErrorMessage
                                name="patient_relation_no"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="field-set">
                              <label>
                                Attendant ID Proof (.jpeg,.jpg,.png,.jfif,.pdf)
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                name="relation_id"
                                accept="image/*,application/pdf"
                                onChange={(e) =>
                                  setFieldValue(
                                    "relation_id",
                                    e.currentTarget.files[0],
                                  )
                                }
                              />
                              <div className="w-25 h-25 my-2">
                                <img
                                  style={{ width: "25px", height: "25px" }}
                                  src={`${imageUrl}${editenquiry.patient_relation_id}`}
                                  alt=".."
                                />
                              </div>
                              {/* <ErrorMessage name="relation_id" /> */}
                              <ErrorMessage
                                name="relation_id"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="">
                      <button
                        type="submit"
                        className="submit-btn"
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
      </div>
    </div>
  );
}
