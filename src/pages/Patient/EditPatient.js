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
import { AdminBaseUrl, AdminBaseUrl1, baseurl, image } from "../../Basurl/Baseurl";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import { GetAllTreatment } from "../../reducer/TreatmentSlice";
export default function EditPatient() {
  const navigate = useNavigate();
  const location = useLocation();
const { Treatment } = useSelector((state) => state.Treatment);
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(null);
  const { patient, loading, error } = useSelector((state) => state.patient);
  const [ispatient, setIspatient] = useState(null);
  //  const [previewImage, setPreviewImage] = useState(null);
  const [previewDocs, setPreviewDocs] = useState([]);
  const { Countries } = useSelector((state) => state.Countries);
  useEffect(() => {
    dispatch(GetAllCountries());
    // console.log(error, Countries);
  }, [dispatch]);
  useEffect(() => {
  dispatch(GetAllTreatment());
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
  .typeError("Age must be a number")
  .required("Age is required")
  .integer("Age must be a whole number") // ❌ no decimal
  .moreThan(0, "Age must be greater than 0") // 🔥 blocks 0 & negative
  .max(120, "Age cannot exceed 120"),
    gender: Yup.string().required("Gender is required"),
    patientNumber: Yup.string().required("Patient ID is required"),
    created_at: Yup.string().required("Date is required"),
    // patientDisease: Yup.string().required("Disease is required"),
    passport_num: Yup.string().required("Passport number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    emergency_contact_no: Yup.string()
      .matches(
        /^[0-9]{8,15}$/,
        "Emergency Contact Number be Digit and between 8-15 digits",
      )
      ,
    patient_relation_no: Yup.string().matches(
      /^[0-9]{8,15}$/,
      "Patient Relation Number be Digit and between 8-15 digits",
    ),
    country: Yup.string().required("Country is required"),
  });
  if (!ispatient) return <div>Loading...</div>;

  const handleDeleteDoc = async (docName) => {
    try {
      await axios.delete(
        `${baseurl}delete_id_proof/${ispatient.patientNumber}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
        ,
        {
          data: { file: docName }, // 👈 important (backend usually needs file name)
        }
      );

      Swal.fire("Deleted!", "Document removed successfully", "success");

      // update UI instantly
      const updatedDocs =
        ispatient?.patient_kyc?.[0]?.id_proof?.filter(
          (doc) => doc !== docName
        );

      setIspatient((prev) => ({
        ...prev,
        patient_kyc: [
          {
            ...prev.patient_kyc[0],
            id_proof: updatedDocs,
          },
        ],
      }));
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to delete document", "error");
    }
  };
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
                    dial_code: ispatient?.dial_code || "",
                    // dial_code: ispatient?.phoneCode || "",
                    address: ispatient?.address || "",
                    patientDisease:
                      ispatient?.patient_disease?.[0]?.disease_name || "",
                    disease_id:
                      ispatient?.patient_disease?.[0]?.id || "",
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
                    id_proof: [],
                    patient_relation: ispatient?.patient_relation || "",
                    patient_relation_no: ispatient?.patient_relation_no || "",
                    user_id: ispatient?.user_id || "",
                      notificationEnabled: ispatient?.notificationEnabled ,
                  }}
                  validationSchema={basicSchema}
                  //             onSubmit={async (values, { setSubmitting }) => {
                  //   try {
                  //     if (!ispatient?.patientId) {
                  //       Swal.fire("Error!", "Patient ID missing", "error");
                  //       return;
                  //     }

                  //     const formData = new FormData();

                  //     Object.keys(values).forEach((key) => {
                  //       if (key !== "patient_Profile") {
                  //         formData.append(key, values[key] ?? "");
                  //       }
                  //     });

                  //     if (values.patient_Profile instanceof File) {
                  //       formData.append(
                  //         "patient_Profile",
                  //         values.patient_Profile,
                  //       );
                  //     }

                  //     await dispatch(
                  //       EditPatientType({
                  //         id: ispatient.patientId,
                  //         data: formData,
                  //       }),
                  //     ).unwrap();

                  //     Swal.fire(
                  //       "Success!",
                  //       "Patient updated successfully",
                  //       "success",
                  //     );
                  //     navigate("/Admin/patients");
                  //   } catch (err) {
                  //     console.error(err);
                  //     Swal.fire(
                  //       "Error!",
                  //       err?.message || "Update failed",
                  //       "error",
                  //     );
                  //   } finally {
                  //     setSubmitting(false);
                  //   }
                  // }}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      if (!ispatient?.patientId) {
                        Swal.fire("Error!", "Patient ID missing", "error");
                        return;
                      }

                      const formData = new FormData();

                      Object.keys(values).forEach((key) => {
                        if (key !== "patient_Profile" && key !== "id_proof") {
                          formData.append(key, values[key] ?? "");
                        }
                      });

                      // patient profile
                      if (values.patient_Profile instanceof File) {
                        formData.append(
                          "patient_Profile",
                          values.patient_Profile,
                        );
                      }

                      // multiple id proofs
                      if (values.id_proof && values.id_proof.length > 0) {
                        values.id_proof.forEach((file) => {
                          formData.append("id_proof", file);
                        });
                      }

                      await dispatch(
                        EditPatientType({
                          id: ispatient.patientId,
                          data: formData,
                        }),
                      ).unwrap();
                      formData.append("from", "crm");
                      const response = await axios.post(`${AdminBaseUrl1}user_update_profile`,formData)
                        console.log(response)
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
                  {({ isSubmitting, values, setFieldValue,errors, touched  }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-4">
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
                        <div className="col-md-4">
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
                        <div className="col-md-4">
                          <div className="field-set">
                            <label>
                              Phone / WhatsApp Number
                              <span className="text-danger">*</span>
                            </label>
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
                        <div className="col-md-4">
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
                        <div className="col-md-4">
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
                        <div className="col-md-4">
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
                        <div className="col-md-4">
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
                        <div className="col-md-4">
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
                        <div className="col-md-4">
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
                        <div className="col-md-4">
                          <div className="field-set">
                            <label>
                              Emergency Contact Number
                              <span className="text-danger"></span>
                            </label>
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
                        <div className="col-md-4">
                          <div className="field-set">
                            <label>
                              Patient Id <span className="text-danger">*</span>
                            </label>
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
                        <div className="col-md-4">
                          <div className="field-set">
                            <label>
                              Patient ID Proof{" "}
                              <span className="text-danger"></span>
                            </label>

                            <input
                              type="file"
                              multiple
                              className="form-control"
                              accept="image/*,.pdf"
                              onChange={(event) => {
                                const files = event.target.files;

                                if (files && files.length > 0) {
                                  const fileArray = Array.from(files);

                                  setPreviewDocs(
                                    fileArray.map((file) =>
                                      URL.createObjectURL(file),
                                    ),
                                  );

                                  setFieldValue("id_proof", fileArray);
                                }
                              }}
                            />

                            <div className="engpatimg">

                              {/* New Uploaded Files */}
                              {previewDocs.length > 0 &&
                                previewDocs.map((doc, index) => (
                                  <div className="file-preview" key={index}>
                                    <span className="delete-icon"
                                      onClick={() => {
                                        const updated = previewDocs.filter((_, i) => i !== index);
                                        setPreviewDocs(updated);
                                        setFieldValue("id_proof", updated);
                                      }}>
                                      <i className="fa-solid fa-xmark"></i>
                                    </span>
                                    <button
                                      type="button"
                                      className="viewbtn"
                                      onClick={() => window.open(doc, "_blank")}
                                    >
                                      View
                                    </button>

                                  </div>
                                ))}

                              {/* Existing Docs from API */}

                              {previewDocs.length === 0 &&
                                ispatient?.patient_kyc?.[0]?.id_proof?.map((doc, index) => (
                                  <div className="file-preview" key={index}>
                                    <span className="delete-icon" onClick={() => handleDeleteDoc(doc)}>
                                      <i className="fa-solid fa-xmark"></i>
                                    </span>
                                    <button
                                      type="button"
                                      className="viewbtn"
                                      onClick={() => window.open(`${image}/${doc}`, "_blank")}
                                    >
                                      View
                                    </button>
                                  </div>
                                ))}

                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="field-set">
                            <label>
                              Patient Profile
                              <span className="text-danger"></span>
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              className="form-control"
                              onChange={(event) => {
                                const file = event.currentTarget.files[0];
                                if (file) {
                                  setPreviewImage(URL.createObjectURL(file));
                                  setFieldValue("patient_Profile", file); // store file in formik
                                }
                              }}
                            />
                            <div className="engpatimg">
                              {previewImage ? (
                                <button
                                  type="button"
                                  className="viewbtn"
                                  onClick={() =>
                                    window.open(previewImage, "_blank")
                                  }
                                >
                                  View
                                </button>
                              ) : ispatient?.patient_Profile ? (
                                <button
                                  type="button"
                                  className="viewbtn"
                                  onClick={() =>
                                    window.open(
                                      `${image}/${ispatient.patient_Profile}`,
                                      "_blank",
                                    )
                                  }
                                >
                                  View
                                </button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="field-set">
                            <label>
                              Referral Name{" "}
                              <span className="text-danger"></span>
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
                        {/* <div className="col-md-4">
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
                        </div> */}
                        {/* <div className="col-md-4">
  <div className="field-set">
    <label>
      Treatment Name
      <span className="text-danger"></span>
    </label>

    <Autocomplete
      options={Treatment || []}
      getOptionLabel={(option) => option.name || ""}
      value={
        Treatment?.find(
          (item) => item.name === values.patientDisease
        ) || null
      }
      onChange={(e, value) => {
        setFieldValue("patientDisease", value?.name || "");
        setFieldValue("disease_id", value?.id || "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select Treatment"
          error={Boolean(
            values.patientDisease === "" &&
            basicSchema?.fields?.patientDisease
          )}
        />
      )}
      sx={{
        "& .MuiOutlinedInput-root": {
          padding: "0px",
        },
      }}
    />

    <ErrorMessage
      name="patientDisease"
      component="div"
      className="text-danger"
    />
  </div>
</div> */}
 <div className="col-md-4">
   <div className="field-set">
   <label>
                              Treatment Name<span className="text-danger"></span>
                            </label>
<Autocomplete
  options={Treatment || []}
  getOptionLabel={(option) => option.name || ""}
  value={
    Treatment?.find(
      (item) => item.name === values.patientDisease
    ) || null
  }
  onChange={(e, value) => {
    setFieldValue("patientDisease", value?.name || "");
    setFieldValue("disease_id", value?.id || "");
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Select Treatment"
      error={Boolean(touched.patientDisease && errors.patientDisease)}
      helperText={touched.patientDisease && errors.patientDisease}
    />
  )}
  sx={{
    "& .MuiOutlinedInput-root": {
      padding: "0px",
    },
  }}
/>
</div>
</div>
                        <div className="col-md-4">
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
                        <div className="col-md-4">
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
                        <div className="col-md-4">
  <div className="field-set">
    <label>
      Enable Notification
    </label>

    <div className="form-check mt-2">
      <Field
        type="checkbox"
        name="notificationEnabled"
        className="form-check-input"
      />

      <label className="form-check-label ms-2">
        Notification Enabled
      </label>
    </div>
  </div>
</div>
                        <div className="col-md-12">
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
