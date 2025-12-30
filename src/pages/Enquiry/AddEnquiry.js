import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { AddEnquirys } from "../../reducer/EnquirySlice";
import { GetAllCountries2 } from "../../reducer/Countries";
import FormControl from "@mui/material/FormControl";
import { Autocomplete, TextField } from "@mui/material";
import { GetAllTreatment } from "../../reducer/TreatmentSlice";
export default function AddEnquiry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAttendant, setShowAttendant] = useState(false);
  const { Treatment, error } = useSelector((state) => state.Treatment);
  const { loading } = useSelector((state) => state.Enquiry);
  const { Countries } = useSelector((state) => state.Countries);
  useEffect(() => {
    dispatch(GetAllCountries2());
  }, [dispatch]);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const basicSchema = Yup.object().shape({
    name: Yup.string().min(2).max(50).required("Name is required"),
    disease_name: Yup.string().required("Disease name is required"),
    country: Yup.string().required("Country is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().matches(emailRegex, "Invalid email").required(),
    age: Yup.string().required("Age is required"),
    town: Yup.string().required("Town is required"),
    emergency_contact_no: Yup.string()
      .matches(/^[0-9]{10,11}$/, "Phone number must be 10-11 digits")
      .required("Phone number is required"),
    passport_num: Yup.string().required("Passport is required"),
    patient_emergency_contact_no: Yup.string().matches(
      /^[0-9]{10,11}$/,
      "Emergency Contact must be 10-11 digits"
    ),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Others"])
      .required("Gender is required"),
  });
  useEffect(() => {
    dispatch(GetAllTreatment());
  }, [dispatch]);
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
              New Enquiry
            </h4>
          </div>
        </div>
        <div className="main_content">
          <div className="row">
            <div className="col-lg-12">
              <Formik
                initialValues={{
                  name: "",
                  age: "",
                  email: "",
                  gender: "",
                  emergency_contact_no: "",
                  patient_emergency_contact_no: "",
                  country: "",
                  address: "",
                  Referral_Name: "",
                  disease_name: "",
                  patient_relation_name: "",
                  patient_relation: "",
                  town: "",
                  passport_num: "",
                  patient_relation_no: "",
                  patient_relation_address: "",
                  patient_relation_id: null,
                  patient_id_proof: null,
                  patient_Profile: null,
                  dial_code: "",
                }}
                validationSchema={basicSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  const formData = new FormData();
                  for (const key in values) {
                    if (
                      key !== "patient_id_proof" &&
                      key !== "patient_Profile"
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
                  console.log(formData);
                  try {
                    const result = await dispatch(
                      AddEnquirys(formData)
                    ).unwrap();
                    Swal.fire(result.message, "", "success");
                    navigate("/Admin/Inquiry");
                  } catch (err) {
                    Swal.fire(err?.message || "Something went wrong", "error");
                  }
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Passport<span className="text-danger">*</span>
                          </label>
                          <Field className="form-control" name="passport_num" />
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
                            Name<span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control"
                            name="name"
                            type="name"
                          />
                          <ErrorMessage
                            name="name"
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
                            name="email"
                            type="email"
                          />
                          <ErrorMessage
                            name="email"
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
                            name="age"
                            type="number"
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
                            Address<span className="text-danger">*</span>
                          </label>
                          <Field className="form-control" name="address" />
                          <ErrorMessage
                            name="address"
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
                                  <Autocomplete
                                    options={Countries || []} // your countries array
                                    getOptionLabel={(option) => option.name} // display the country name
                                    onChange={(event, newValue) => {
                                      form.setFieldValue(
                                        "country",
                                        newValue?.name || ""
                                      );
                                      form.setFieldValue(
                                        "dial_code",
                                        newValue?.dial_code || ""
                                      );
                                      console.log("Selected:", newValue);
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Select Country"
                                        variant="outlined"
                                        size="small"
                                      />
                                    )}
                                    isOptionEqualToValue={(option, value) =>
                                      option.name === value.name
                                    }
                                  />
                                </FormControl>
                                <ErrorMessage
                                  name="country"
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
                            Treatment Name{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Field name="disease_name">
                            {({ form, meta }) => (
                              <>
                                <Autocomplete
                                  options={Treatment || []}
                                  getOptionLabel={(option) =>
                                    option.course_name || ""
                                  }
                                  value={
                                    Treatment?.find(
                                      (item) =>
                                        item.course_name ===
                                        form.values.disease_name
                                    ) || null
                                  }
                                  onChange={(e, newValue) => {
                                    form.setFieldValue(
                                      "disease_name",
                                      newValue ? newValue.course_name : ""
                                    );
                                    form.setFieldValue(
                                      "treatment_course_id",
                                      newValue ? newValue.course_id : null
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      size="small"
                                      placeholder="Select Disease"
                                      error={
                                        meta.touched && Boolean(meta.error)
                                      }
                                    />
                                  )}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      padding: "0px",
                                    },
                                  }}
                                />
                                {meta.touched && meta.error && (
                                  <div className="text-danger">
                                    {meta.error}
                                  </div>
                                )}
                              </>
                            )}
                          </Field>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>Dial Code</label>
                          <Field
                            className="form-control"
                            name="dial_code"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            {" "}
                            Phone No / WhatsApp
                            <span className="text-danger">*</span>
                          </label>
                          <Field
                            className="form-control"
                            name="emergency_contact_no"
                          />
                          <ErrorMessage
                            name="emergency_contact_no"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>Emergency Contact No</label>
                          <Field
                            className="form-control"
                            name="patient_emergency_contact_no"
                          />
                          <ErrorMessage
                            name="patient_emergency_contact_no"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Town<span className="text-danger">*</span>
                          </label>
                          <Field className="form-control" name="town" />
                          <ErrorMessage
                            name="town"
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
                              />{" "}
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
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Patient I’d Proof{" "}
                            <span className="text-danger"> </span>
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="patient_id_proof"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.currentTarget.files);
                              const validFiles = [];
                              for (const file of files) {
                                if (!file.type.startsWith("image/")) {
                                  Swal.fire(
                                    "Only image files are allowed!",
                                    "",
                                    "warning"
                                  );
                                  e.target.value = "";
                                  return;
                                }
                                if (file.size > 2 * 1024 * 1024) {
                                  Swal.fire(
                                    "Each image must be less than 2 MB!",
                                    "",
                                    "warning"
                                  );
                                  e.target.value = "";
                                  return;
                                }
                                validFiles.push(file);
                              }
                              if (validFiles.length > 0) {
                                setFieldValue("patient_id_proof", validFiles);
                              }
                            }}
                          />
                          <ErrorMessage
                            name="patient_id_proof"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Patient Profile{" "}
                            <span className="text-danger"> </span>
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            multiple
                            name="patient_Profile"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.currentTarget.files[0];
                              if (file) {
                                if (!file.type.startsWith("image/")) {
                                  Swal.fire(
                                    "Only image files are allowed!",
                                    "",
                                    "warning"
                                  );
                                  e.target.value = "";
                                  return;
                                }
                                if (file.size > 2 * 1024 * 1024) {
                                  Swal.fire(
                                    "Image must be less than 2 MB!",
                                    "",
                                    "warning"
                                  );
                                  e.target.value = "";
                                  return;
                                }
                                setFieldValue("patient_Profile", file);
                              }
                            }}
                          />
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
                            className="text-danger"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="treat-hd">
                      <h6>Attendant Details</h6>
                      <span className="line"></span>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="field-set">
                          <div className="form-check mb-3">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="addAttendant"
                              checked={showAttendant}
                              onChange={(e) =>
                                setShowAttendant(e.target.checked)
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor="addAttendant"
                            >
                              Add Attendant
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {showAttendant && (
                      <>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="field-set">
                              <label>
                                Attendant Name
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                className="form-control"
                                name="patient_relation_name"
                              />
                              <ErrorMessage
                                name="patient_relation_name"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="field-set">
                              <label>
                                Attendant Relation
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                className="form-control"
                                name="patient_relation"
                              />
                              <ErrorMessage
                                name="patient_relation"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="field-set">
                              <label>
                                Attendant Id{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                name="patient_relation_id"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.currentTarget.files[0];
                                  if (file) {
                                    if (!file.type.startsWith("image/")) {
                                      Swal.fire(
                                        "Only image files are allowed!",
                                        "",
                                        "warning"
                                      );
                                      e.target.value = "";
                                      return;
                                    }
                                    if (file.size > 2 * 1024 * 1024) {
                                      Swal.fire(
                                        "Image must be less than 2 MB!",
                                        "",
                                        "warning"
                                      );
                                      e.target.value = "";
                                      return;
                                    }
                                    setFieldValue("patient_relation_id", file);
                                  }
                                }}
                              />
                              <ErrorMessage
                                name="patient_relation_id"
                                component="div"
                                className="text-danger"
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
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="field-set">
                              <label>
                                {" "}
                                Attendant Contact
                                <span className="text-danger">*</span>
                              </label>
                              <Field
                                className="form-control"
                                name="patient_relation_no"
                              />
                              <ErrorMessage
                                name="patient_relation_no"
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
                        className="submit-btn"
                        type="submit"
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
