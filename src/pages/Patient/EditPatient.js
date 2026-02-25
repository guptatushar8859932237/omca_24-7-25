import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { EditPatientType } from "../../reducer/PatientsSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetAllPatients } from "../../reducer/PatientsSlice";
import { GetAllCountries } from "../../reducer/Countries";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import { baseurl, image } from "../../Basurl/Baseurl";
export default function EditPatient() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const { patient, loading, error } = useSelector((state) => state.patient);
  const [ispatient, setIspatient] = useState(null);
  const { Countries } = useSelector((state) => state.Countries);
  useEffect(() => {
    dispatch(GetAllCountries());
    // console.log(error, Countries);
  }, [dispatch]);
  useEffect(() => {
    dispatch(GetAllPatients());
    console.log(error, patient);
  }, [dispatch]);
  useEffect(() => {
    console.log("Patient data:", patient);
    if (location.state?.patientId) {
      const selectedUser = patient.find(
        (item) => item.patientId === location.state.patientId,
      );
      console.log(selectedUser);
      setIspatient(selectedUser || null);
    }
  }, [location.state?.patientId, patient]);
  const basicSchema = Yup.object().shape({
    patient_name: Yup.string().required("Patient name is required"),
    age: Yup.number()
      .required("Age is required")
      .min(0, "Age cannot be less than 0")
      .max(120, "Age cannot exceed 120"),
    gender: Yup.string().required("Gender is required"),
    patientNumber: Yup.string().required("Patient ID is required"),
    created_at: Yup.string().required("Date is required"),
    patientDisease: Yup.string().required("Disease is required"),
    passport_num: Yup.string().required("Passport number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    emergency_contact_no: Yup.string()
      .matches(
        /^[0-9]{8,15}$/,
        "Emergency Contact Number be Digit and between 8-15 digits",
      )
      .required("Contact number is required"),
    patient_relation_no: Yup.string().matches(
      /^[0-9]{8,15}$/,
      "Patient Relation Number be Digit and between 8-15 digits",
    ),
    country: Yup.string().required("Country is required"),
  });
  if (!ispatient) return <div>Loading...</div>;
  return (
    <>
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
                Edit Patients
              </h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row">
              <div className="col-lg-12">
                <Formik
                  enableReinitialize
                  initialValues={{
                    patient_name: ispatient?.patient_name || "",
                    age: ispatient?.age || "",
                    gender: ispatient?.gender || "",
                    email: ispatient?.email || "",
                    treatingIn: ispatient?.treatingIn || "",
                    patient_emergency_contact_no:
                      ispatient?.patient_emergency_contact_no || "",
                    passport_num: ispatient?.passport_num || "",
                    // patient_Profile: ispatient?.patient_Profile || "",
                    town: ispatient?.town || "",
                    // dial_code: ispatient?.dial_code || "",
                    dial_code: ispatient?.phoneCode || "",
                    address: ispatient?.address || "",
                    patientDisease:
                      ispatient?.patient_disease?.[0]?.disease_name || "",
                    created_at: ispatient?.createdAt
                      ? ispatient.createdAt.split("T")[0]
                      : "",
                    emergency_contact_no: ispatient?.emergency_contact || "",
                    country: ispatient?.country || "",
                    // patient_relation: ispatient?.patient_relation || "",
                    // patient_relation_no:
                    //   ispatient?.patient_relation_no || "",
                    patientNumber: ispatient?.patientNumber || "",
                    Referral_Name: ispatient?.Referral_Name || "",
                    // patient_relation_name: ispatient?.patient_relation_name || "",
                    has_relation: !!ispatient?.patient_relation_name,

                    patient_relation_name:
                      ispatient?.patient_relation_name || "",
                    patient_relation: ispatient?.patient_relation || "",
                    patient_relation_no: ispatient?.patient_relation_no || "",
                  }}
                  validationSchema={basicSchema}
                  // onSubmit={async (values, { setSubmitting }) => {
                  //   console.log("Submitting values:", values);
                  //   try {
                  //     const result = await dispatch(
                  //       EditPatientType({ id: ispatient.patientId, ...values }),
                  //     ).unwrap();
                  //     Swal.fire(
                  //       "Success!",
                  //       "Patient details updated successfully.",
                  //       "success",
                  //     );
                  //     navigate("/Admin/patients");
                  //   } catch (err) {
                  //     Swal.fire(
                  //       "Error!",
                  //       err?.message || "An error occurred",
                  //       "error",
                  //     );
                  //   }
                  //   setSubmitting(false);
                  // }}
                  //                 onSubmit={async (values, { setSubmitting }) => {
                  //   try {
                  //     const formData = new FormData();

                  //     // Append all fields
                  //     Object.keys(values).forEach((key) => {
                  //       // Image ko alag handle karenge
                  //       if (key !== "patient_Profile") {
                  //         formData.append(key, values[key]);
                  //       }
                  //     });

                  //     // ✅ Only append image if user selected new file
                  //     if (values.patient_Profile instanceof File) {
                  //       formData.append("patient_Profile", values.patient_Profile);
                  //     }

                  //     const result = await dispatch(
                  //       EditPatientType({
                  //         id: ispatient.patientId,
                  //         data: formData, // ✅ IMPORTANT
                  //       })
                  //     ).unwrap();

                  //     Swal.fire("Success!", "Patient updated successfully", "success");
                  //     navigate("/Admin/patients");

                  //   } catch (err) {
                  //     Swal.fire("Error!", err?.message || "Error occurred", "error");
                  //   }

                  //   setSubmitting(false);
                  // }}
                  // onSubmit={async (values, { setSubmitting }) => {
                  //   try {
                  //     const formData = new FormData();

                  //     Object.keys(values).forEach((key) => {
                  //       if (key !== "patient_Profile") {
                  //         formData.append(key, values[key]);
                  //       }
                  //     });

                  //     if (values.patient_Profile instanceof File) {
                  //       formData.append("patient_Profile", values.patient_Profile);
                  //     }

                  //     await dispatch(
                  //       EditPatientType({
                  //         id: ispatient.patientId,   // ✅ id
                  //         data: formData             // ✅ data
                  //       })
                  //     ).unwrap();

                  //     Swal.fire("Success!", "Patient updated successfully", "success");
                  //     navigate("/Admin/patients");

                  //   } catch (err) {
                  //     Swal.fire("Error!", err?.message || "Error occurred", "error");
                  //   }

                  //   setSubmitting(false);
                  // }}
                  // onSubmit={async (values, { setSubmitting }) => {
                  //   try {
                  //     console.log("onSubmit triggered");
                  //     console.log("Values:", values);
                  //     console.log("Patient ID:", ispatient?.patientId);

                  //     const formData = new FormData();

                  //     Object.keys(values).forEach((key) => {
                  //       if (key !== "patient_Profile") {
                  //         formData.append(key, values[key]);
                  //       }
                  //     });

                  //     if (values.patient_Profile instanceof File) {
                  //       formData.append("patient_Profile", values.patient_Profile);
                  //     }

                  //     for (let pair of formData.entries()) {
                  //       console.log("FormData:", pair[0], pair[1]);
                  //     }

                  //     const payload = {
                  //       id: ispatient?.patientId,
                  //       data: formData
                  //     };

                  //     console.log("Dispatching:", payload);

                  //     await dispatch(EditPatientType(payload)).unwrap();

                  //     Swal.fire("Success!", "Patient updated successfully", "success");
                  //     navigate("/Admin/patients");

                  //   } catch (err) {
                  //     console.error("Error:", err);
                  //     Swal.fire("Error!", err?.message || "Error occurred", "error");
                  //   }

                  //   setSubmitting(false);
                  // }}

                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      if (!ispatient?.patientId) {
                        Swal.fire("Error!", "Patient ID missing", "error");
                        return;
                      }

                      const formData = new FormData();

                      Object.keys(values).forEach((key) => {
                        if (key !== "patient_Profile") {
                          formData.append(key, values[key] ?? "");
                        }
                      });

                      if (values.patient_Profile instanceof File) {
                        formData.append(
                          "patient_Profile",
                          values.patient_Profile,
                        );
                      }

                      await dispatch(
                        EditPatientType({
                          id: ispatient.patientId,
                          data: formData,
                        }),
                      ).unwrap();

                      Swal.fire(
                        "Success!",
                        "Patient updated successfully",
                        "success",
                      );
                      navigate("/Admin/patients");
                    } catch (err) {
                      console.error(err);
                      Swal.fire(
                        "Error!",
                        err?.message || "Update failed",
                        "error",
                      );
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ isSubmitting, values, setFieldValue }) => (
                    <Form>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="field-set">
                            <label>
                              NIC/passport<span className="text-danger">*</span>
                            </label>
                            <Field
                              className="form-control"
                              type="text"
                              name="passport_num"
                            />
                            <ErrorMessage
                              name="passport_num"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="field-set">
                            <label>
                              Patient Name<span className="text-danger">*</span>
                            </label>
                            <Field
                              className="form-control"
                              type="text"
                              name="patient_name"
                            />
                            <ErrorMessage
                              name="patient_name"
                              component="div"
                              className="text-danger"
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
                              type="number"
                              name="age"
                            />
                            <ErrorMessage
                              name="age"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="field-set">
                            <label>
                              Treatment Name
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              className="form-control"
                              type="text"
                              name="patientDisease"
                            />
                            <ErrorMessage
                              name="patientDisease"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="field-set">
                            <label>
                              Date<span className="text-danger">*</span>
                            </label>
                            <Field
                              className="form-control"
                              type="date"
                              name="created_at"
                            />
                            <ErrorMessage
                              name="created_at"
                              component="div"
                              className="text-danger"
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
                              type="email"
                              name="email"
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        {/* <div className="col-sm-6">
                          <div className="field-set">
                            <label>
                              Contact Number{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              className="form-control"
                              type="text"
                              name="emergency_contact_no"
                            />
                            <ErrorMessage
                              name="emergency_contact_no"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div> */}
                        <div className="col-md-6">
                          <div className="field-set">
                            <label>Phone / WhatsApp Number</label>
                            <div className="country-code">
                              <Field
                                className="form-control code-dial"
                                name="dial_code"
                                disabled
                              />
                              <Field
                                className="form-control code-in"
                                name="emergency_contact_no"
                              />
                            </div>
                            <ErrorMessage
                              name="emergency_contact_no"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="field-set">
                            <label>
                              Country<span className="text-danger">*</span>
                            </label>
                            <Field name="country">
                              {({ field, form }) => (
                                <>
                                  <FormControl fullWidth size="small">
                                    <Select
                                      value={field.value || ""}
                                      onChange={(e) => {
                                        const selectedCountry = Countries.find(
                                          (con) => con.name === e.target.value,
                                        );

                                        form.setFieldValue(
                                          "country",
                                          selectedCountry?.name || "",
                                        );
                                        form.setFieldValue(
                                          "dial_code",
                                          selectedCountry?.dial_code || "",
                                        );
                                      }}
                                      input={<OutlinedInput />}
                                      displayEmpty
                                    >
                                      <MenuItem value="">
                                        <em>Select Country</em>
                                      </MenuItem>

                                      {Countries?.map((con) => (
                                        <MenuItem
                                          key={con._id}
                                          value={con.name}
                                        >
                                          {con.name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>

                                  <ErrorMessage
                                    name="country"
                                    component="div"
                                    className="text-danger"
                                  />
                                </>
                              )}
                            </Field>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="field-set">
                            <label>
                              Treating In<span className="text-danger">*</span>
                            </label>
                            <Field name="treatingIn">
                              {({ field, form }) => (
                                <>
                                  <FormControl fullWidth size="small">
                                    <Select
                                      value={field.value}
                                      onChange={(e) =>
                                        form.setFieldValue(
                                          "treatingIn",
                                          e.target.value,
                                        )
                                      }
                                      input={
                                        <OutlinedInput placeholder="Select Country" />
                                      }
                                      className="select-country form-control"
                                      displayEmpty
                                      sx={{ height: 40 }}
                                      MenuProps={{
                                        PaperProps: {
                                          style: {
                                            maxHeight: 260, // Limit dropdown height
                                          },
                                        },
                                      }}
                                    >
                                      <MenuItem value="">
                                        <em>Select Country</em>
                                      </MenuItem>
                                      {Countries.map((con, index) => (
                                        <MenuItem key={index} value={con.name}>
                                          {con.name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <ErrorMessage
                                    name="treatingIn"
                                    component="div"
                                    style={{ color: "red" }}
                                  />
                                </>
                              )}
                            </Field>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="field-set">
                            <label>
                              Referral Name{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              className="form-control"
                              type="text"
                              name="Referral_Name"
                            />
                            <ErrorMessage
                              name="Referral_Name"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="field-set">
                            <label>
                              Town <span className="text-danger">*</span>
                            </label>
                            <Field
                              className="form-control"
                              type="text"
                              name="town"
                            />
                            <ErrorMessage
                              name="town"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="field-set">
                            <label>
                              Address <span className="text-danger">*</span>
                            </label>
                            <Field
                              className="form-control"
                              type="text"
                              name="address"
                            />
                            <ErrorMessage
                              name="address"
                              component="div"
                              className="text-danger"
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
                                Others
                              </label>
                            </div>
                            <ErrorMessage
                              name="gender"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="field-set">
                            <label>Emergency Contact Number</label>
                            <div className="country-code">
                              <Field
                                className="form-control code-dial"
                                name="dial_code"
                                disabled
                              />
                              <Field
                                className="form-control code-in"
                                name="patient_emergency_contact_no"
                              />
                            </div>
                            <ErrorMessage
                              name="patient_emergency_contact_no"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <label className="gen-label fw-normal">
                            Patient Id<span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control "
                            type="text"
                            name="patientNumber"
                          />
                          <ErrorMessage
                            name="patientNumber"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-sm-6">
                          <div className="field-set">
                            <label>Patient Profile Image</label>

                            <input
                              type="file"
                              accept="image/*"
                              className="form-control"
                              onChange={(event) => {
                                const file = event.currentTarget.files[0];
                                if (file) {
                                  setPreviewImage(URL.createObjectURL(file)); // show new preview
                                  setFieldValue("patient_Profile", file); // store file in formik
                                }
                              }}
                            />

                            {/* Image Preview */}
                            <div style={{ marginTop: "10px" }}>
                              {previewImage ? (
                                <img
                                  src={previewImage}
                                  alt="Preview"
                                  width="120"
                                  height="120"
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                  }}
                                />
                              ) : ispatient?.patient_Profile ? (
                                <img
                                  src={`${image}/${ispatient.patient_Profile}`}
                                  alt="Old Profile"
                                  width="80"
                                  height="80"
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                  }}
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="">
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
        </div>
      </div>
    </>
  );
}
