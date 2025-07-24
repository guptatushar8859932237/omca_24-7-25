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
export default function EditPatient() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { patient, loading, error } = useSelector((state) => state.patient);
  const [ispatient, setIspatient] = useState(null);
  const { Countries } = useSelector((state) => state.Countries);
  useEffect(() => {
    dispatch(GetAllCountries());
    console.log(error, Countries);
  }, [dispatch]);
  useEffect(() => {
    dispatch(GetAllPatients());
    console.log(error, patient);
  }, [dispatch]);
  useEffect(() => {
    console.log("Patient data:", patient);
    if (location.state?.patientId) {
      const selectedUser = patient.find(
        (item) => item.patientId === location.state.patientId
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
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    emergency_contact_no: Yup.string().required("Contact number is required"),
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
                    patientDisease:
                      ispatient?.patient_disease?.[0]?.disease_name || "",
                    created_at: ispatient?.createdAt
                      ? ispatient.createdAt.split("T")[0]
                      : "",
                    emergency_contact_no: ispatient?.emergency_contact || "",
                    country: ispatient?.country || "",
                    patient_relation: ispatient?.patient_relation || "",
                    patient_relation_name:
                      ispatient?.patient_relation_name || "",
                    patientNumber: ispatient?.patientNumber || "",
                  }}
                  validationSchema={basicSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    console.log("Submitting values:", values);
                    try {
                      const result = await dispatch(
                        EditPatientType({ id: ispatient.patientId, ...values })
                      ).unwrap();
                      Swal.fire(
                        "Success!",
                        "Patient details updated successfully.",
                        "success"
                      );
                      navigate("/Admin/patients");
                    } catch (err) {
                      Swal.fire(
                        "Error!",
                        err?.message || "An error occurred",
                        "error"
                      );
                    }
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="row">
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
                              Disease<span className="text-danger">*</span>
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
                        <div className="col-sm-6">
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
                                      value={field.value}
                                      onChange={(e) =>
                                        form.setFieldValue(
                                          "country",
                                          e.target.value
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
                                            maxHeight: 200, // Limit dropdown height
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
                          <div className="col-sm-6">
                            <Field
                              className="form-control"
                              type="text"
                              name="patientNumber"
                            />
                            <ErrorMessage
                              name="patientNumber"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>

                        <div className="treat-hd">
                          <h6>Attendant Details</h6>
                          <span className="line"></span>
                        </div>

                        <div className="col-sm-6">
                          <div className="field-set">
                            <label>
                              Patient Relation Name{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              className="form-control"
                              type="text"
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
                              Patient Relation{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <Field
                              className="form-control"
                              type="text"
                              name="patient_relation"
                            />
                            <ErrorMessage
                              name="patient_relation"
                              component="div"
                              className="text-danger"
                            />
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
