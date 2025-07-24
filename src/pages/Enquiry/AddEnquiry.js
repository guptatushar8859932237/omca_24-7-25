import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";

import { AddEnquirys } from "../../reducer/EnquirySlice";
import { GetAllCountries2 } from "../../reducer/Countries";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function AddEnquiry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAttendant, setShowAttendant] = useState(false);
  const { loading } = useSelector((state) => state.Enquiry);
  const { Countries } = useSelector((state) => state.Countries);
  console.log();
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
    patient_emergency_contact_no: Yup.string()
      .matches(/^[0-9]{10,11}$/, "Emergency Contact must be 10-11 digits")
      .required("Emergency contact is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Others"])
      .required("Gender is required"),
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
                  disease_name: "",
                  patient_relation_name: "",
                  patient_relation: "",
                  town: "",
                  relation_id: null,
                  patient_id_proof: null,
                }}
                validationSchema={basicSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  const formData = new FormData();
                  for (const key in values) {
                    formData.append(key, values[key]);
                  }

                  try {
                    const result = await dispatch(
                      AddEnquirys(formData)
                    ).unwrap();
                    Swal.fire(result.message, "", "success");
                    navigate("/Admin/Inquiry");
                  } catch (err) {
                    Swal.fire(
                      "Error!",
                      err?.message || "Something went wrong",
                      "error"
                    );
                  }
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    {/* --- Patient Details --- */}
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="field-set">
                          <label>
                            Name<span className="text-danger">*</span>
                          </label>
                          <Field className="form-control" name="name" />
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
                          <label>
                            Emergency Contact No
                            <span className="text-danger">*</span>
                          </label>
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
                            Disease Name<span className="text-danger">*</span>
                          </label>
                          <Field className="form-control" name="disease_name" />
                          <ErrorMessage
                            name="disease_name"
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
                                    displayEmpty
                                    sx={{ height: 40 }}
                                    className="select-country form-control"
                                    MenuProps={{
                                      PaperProps: {
                                        style: { maxHeight: 200 },
                                      },
                                    }}
                                  >
                                    <MenuItem value="">
                                      <em>Select Country</em>
                                    </MenuItem>
                                    {Countries && Countries.length > 0 ? (
                                      Countries.map((con, idx) => (
                                        <MenuItem key={idx} value={con.name}>
                                          {con.name}
                                        </MenuItem>
                                      ))
                                    ) : (
                                      <MenuItem disabled>
                                        No countries available
                                      </MenuItem>
                                    )}
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
                            onChange={(e) =>
                              setFieldValue(
                                "patient_id_proof",
                                e.currentTarget.files[0]
                              )
                            }
                          />
                          <ErrorMessage
                            name="patient_id_proof"
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
                        {/* --- Attendant Details --- */}
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
                                name="relation_id"
                                onChange={(e) =>
                                  setFieldValue(
                                    "relation_id",
                                    e.currentTarget.files[0]
                                  )
                                }
                              />
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
                    {/* Submit Button */}
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
