import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { AddEnquirys } from "../../reducer/EnquirySlice";
import { GetAllCountries2 } from "../../reducer/Countries";
import { Autocomplete, TextField } from "@mui/material";
import { GetAllTreatment } from "../../reducer/TreatmentSlice";
import uploadImage from "../../img/image (6).png";
const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export default function AddEnquiry() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAttendant, setShowAttendant] = useState(false);
  const { Treatment, error } = useSelector((state) => state.Treatment);
  const { loading } = useSelector((state) => state.Enquiry);
  const { Countries } = useSelector((state) => state.Countries);
  const [passportValue, setPassportValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  useEffect(() => {
    dispatch(GetAllCountries2());
  }, [dispatch]);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const basicSchema = Yup.object().shape({
    name: Yup.string().min(2).max(50).required("Name is required"),
   disease_name: Yup.object()
  .nullable()
  .required("Disease name is required"),
    country: Yup.string().required("Country is required"),
    treatingIn: Yup.string().required("Treating In is required"),
    address: Yup.string().required("Address is required"),
    patient_relation_name: Yup.string().when("showAttendant", {
      is: true,
      then: (schema) => schema.required("Attendant name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    patient_relation_id: Yup.array().when("showAttendant", {
      is: true,
      then: (schema) => schema.min(1, "Attendant ID Proof is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    patient_relation: Yup.string().when("showAttendant", {
      is: true,
      then: (schema) => schema.required("Attendant Relationship is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
      disease_name: Yup.string()
    .required("Treatment name is required"),
    //   patient_relation_address: Yup.string().when("showAttendant", {
    //   is: true,
    //   then: (schema) => schema.required("Attendant address is required"),
    //   otherwise: (schema) => schema.notRequired(),
    // }),
    email: Yup.string().matches(emailRegex, "Invalid email").required(),
    age: Yup.string().required("Age is required"),
    town: Yup.string().required("Town is required"),
    // passport_num: Yup.string().required("Passport is required"),
    passport_num: Yup.string()
      .matches(
        /^[A-Za-z0-9]{7,15}$/,
        "Passport number must be 7–15 characters (letters & digits only)",
      )
      .required("Passport Number is required"),
    showAttendant: Yup.boolean(),
    emergency_contact_no: Yup.string()
      .matches(
        /^[0-9]{8,15}$/,
        "Phone number must be Digit and between 8-15 digits",
      )
      .required("Phone number is required"),
    patient_relation_no: Yup.string().when("showAttendant", {
      is: true,
      then: (schema) => schema.matches(/^[0-9]{8,15}$/, "Invalid phone number"),
      otherwise: (schema) => schema.notRequired(),
    }),
    patient_emergency_contact_no: Yup.string().matches(
      /^[0-9]{8,15}$/,
      "Emergency Contact must be Digit and between 8-15  digits",
    ),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Others"])
      .required("Gender is required"),
  });
  useEffect(() => {
    dispatch(GetAllTreatment());
  }, [dispatch]);
  useEffect(() => {
    const initTooltips = () => {
      if (!window.bootstrap) return;

      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]',
      );

      tooltipTriggerList.forEach((el) => {
        if (!el._tooltip) {
          el._tooltip = new window.bootstrap.Tooltip(el, {
            placement: el.getAttribute("data-bs-placement") || "top", // fallback
            trigger: "hover focus",
          });
        }
      });
    };

    setTimeout(initTooltips, 300);
  }, [showAttendant, Countries, Treatment]);
  const fetchPatientByPhoneOrPassport = async (params) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(
      `https://sisccltd.com/omca_crm/api/searchLatestPatientByMobileOrPassport?${query}`,
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || null;
  };
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
  disease_id: "", 
                  patient_relation_name: "",
                  patient_relation: "",
                  town: "",
                  passport_num: "",
                  patient_relation_no: "",
                  patient_relation_address: "",
                  treatingIn: "",
                  patient_relation_id: [],
                  patient_id_proof: null,
                  platform: "1",
                  patient_Profile: null,
                  dial_code: "",
                  showAttendant: false,
                }}
                validationSchema={basicSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  const formData = new FormData();
//                   formData.append("disease_name", values.disease_name);
// formData.append("disease_id", values.disease_id);
                  for (const key in values) {
                    if (
                      key !== "patient_id_proof" &&
                      key !== "patient_Profile" &&
                      key !== "patient_relation_id"
                    ) {
                      formData.append(key, values[key]);
                    }
                  }

                  // Patient ID Proof (multiple)
                  if (values.patient_id_proof?.length > 0) {
                    values.patient_id_proof.forEach((file) => {
                      formData.append("patient_id_proof", file);
                    });
                  }

                  // ✅ Attendant ID Proof (multiple)
                  if (values.patient_relation_id?.length > 0) {
                    values.patient_relation_id.forEach((file) => {
                      formData.append("patient_relation_id", file);
                    });
                  }

                  // Patient profile
                  if (values.patient_Profile) {
                    formData.append("patient_Profile", values.patient_Profile);
                  }
                  console.log(formData);
                  try {
                    const result = await dispatch(
                      AddEnquirys(formData),
                    ).unwrap();
                    Swal.fire(result.message, "", "success");
                    navigate("/Admin/Inquiry");
                  } catch (err) {
                    Swal.fire(err?.message || "Something went wrong", "error");
                  }
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting, setFieldValue, setValues }) => (
                  <Form>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="field-set">
                          <label>
                            NIC/Passport<span className="text-danger">*</span>
                          </label>
                          <div style={{ position: "relative" }}>
                            <Field
                              className="form-control"
                              name="passport_num"
                              onChange={(e) => {
                                const value = e.target.value;
                                setFieldValue("passport_num", value);
                                setPassportValue(value);
                              }}
                            />
                            <img
                              src={uploadImage}
                              alt="autofill"
                              onClick={async () => {
                                const value =
                                  passportValue ||
                                  document.querySelector(
                                    '[name="passport_num"]',
                                  )?.value;
                                if (!value || value.length < 7) {
                                  Swal.fire(
                                    "Please enter at least 7 characters",
                                    "",
                                    "warning",
                                  );
                                  return;
                                }
                                const data =
                                  await fetchPatientByPhoneOrPassport({
                                    passport_num: value,
                                  });
                                if (data) {
                                  const selectedCountry = Countries?.find(
                                    (c) => c.name === data.country,
                                  );
                                  setValues((prev) => ({
                                    ...prev,
                                    ...data,
                                    country: selectedCountry?.name || "",
                                    dial_code: selectedCountry?.dial_code || "",
                                    passport_num: value,
                                  }));

                                  Swal.fire(
                                    "Patient Found",
                                    "Auto-filled",
                                    "success",
                                  );
                                } else {
                                  Swal.fire(
                                    "Patient Not Found",
                                    "No patient found with this passport number",
                                    "info",
                                  );
                                }
                              }}
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "30px",
                                height: "30px",
                                cursor: "pointer",
                                padding: "5px",
                              }}
                            />
                          </div>
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
                            {({ form }) => {
                              const selectedCountry =
                                Countries?.find(
                                  (c) => c.name === form.values.country,
                                ) || null;

                              return (
                                <Autocomplete
                                  options={Countries || []}
                                  value={selectedCountry} // ✅ OBJECT
                                  getOptionLabel={(option) =>
                                    option?.name || ""
                                  }
                                  isOptionEqualToValue={(option, value) =>
                                    option.name === value?.name
                                  }
                                  onChange={(e, newValue) => {
                                    form.setFieldValue(
                                      "country",
                                      newValue?.name || "",
                                    );
                                    form.setFieldValue(
                                      "dial_code",
                                      newValue?.dial_code || "",
                                    );
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      placeholder="Select Country"
                                      size="small"
                                    />
                                  )}
                                />
                              );
                            }}
                          </Field>
                          <ErrorMessage
                            name="country"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="field-set">
                          <label>
                            {" "}
                            Phone No / WhatsApp With Country Code
                            <span className="text-danger">*</span>
                          </label>
                          <div
                            className="country-code"
                            style={{ position: "relative" }}
                          >
                            <Field
                              className="form-control code-dial"
                              name="dial_code"
                              disabled
                            />
                            <Field
                              className="form-control code-in"
                              name="emergency_contact_no"
                              onChange={(e) => {
                                const value = e.target.value;
                                setFieldValue("emergency_contact_no", value);
                                setPhoneValue(value);
                              }}
                            />
                            <img
                              src={uploadImage}
                              alt="autofill"
                              onClick={async () => {
                                const value =
                                  phoneValue ||
                                  document.querySelector(
                                    '[name="emergency_contact_no"]',
                                  )?.value;
                                if (!value || value.length < 8) {
                                  Swal.fire(
                                    "Please enter at least 8 digits",
                                    "",
                                    "warning",
                                  );
                                  return;
                                }
                                const data =
                                  await fetchPatientByPhoneOrPassport({
                                    emergency_contact_no: value,
                                  });
                                if (data) {
                                  const selectedCountry = Countries?.find(
                                    (c) => c.name === data.country,
                                  );
                                  setValues((prev) => ({
                                    ...prev,
                                    ...data,
                                    country: selectedCountry?.name || "",
                                    dial_code: selectedCountry?.dial_code || "",
                                    emergency_contact_no: value,
                                  }));
                                  Swal.fire(
                                    "Patient Found",
                                    "Auto-filled",
                                    "success",
                                  );
                                } else {
                                  Swal.fire(
                                    "Patient Not Found",
                                    "No patient found with this phone number",
                                    "info",
                                  );
                                }
                              }}
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "30px",
                                height: "30px",
                                cursor: "pointer",
                                padding: "5px",
                              }}
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
                      <div className="col-md-4">
                        <div className="field-set">
                          <label>
                            Patient's Name{" "}
                            <span className="text-danger">*</span>
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
                      <div className="col-md-4">
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
                      <div className="col-md-4">
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
                      <div className="col-md-4">
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
                      <div className="col-md-4">
                        <div className="field-set">
                          <label>Emergency Contact No With Country Code</label>
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
                            Patient I’d Proof{" "}
                            <span
                              className="text-danger"
                              data-bs-placement="right"
                              data-bs-toggle="tooltip"
                              title="Accept only (.jpeg, .jpg, .png, .jfif, .pdf pdf) Max size: 2 MB per file"
                            >
                              (i)
                            </span>
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="patient_id_proof"
                            multiple
                            accept={allowedTypes.join(",")}
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              const validFiles = [];

                              for (const file of files) {
                                if (!allowedTypes.includes(file.type)) {
                                  Swal.fire(
                                    "Invalid file type!",
                                    "Only image, PDF, Word & Excel files are allowed",
                                    "warning",
                                  );
                                  e.target.value = "";
                                  return;
                                }

                                if (file.size > 2 * 1024 * 1024) {
                                  Swal.fire(
                                    "File too large!",
                                    "Each file must be less than 2 MB",
                                    "warning",
                                  );
                                  e.target.value = "";
                                  return;
                                }

                                validFiles.push(file);
                              }

                              setFieldValue("patient_id_proof", validFiles);
                            }}
                          />

                          <ErrorMessage
                            name="patient_id_proof"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="field-set">
                          <label>
                            Patient Profile{" "}
                            <span
                              className="text-danger"
                              data-bs-placement="right"
                              data-bs-toggle="tooltip"
                              title="Accept only (.jpeg, .jpg, .png, .jfif, .pdf)
                             Max size: 2 MB per file"
                            >
                              (i)
                            </span>
                          </label>
                          <input
                            className="form-control"
                            type="file"
                            name="patient_Profile"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.currentTarget.files[0];
                              if (file) {
                                if (!file.type.startsWith("image/")) {
                                  Swal.fire(
                                    "Only image files are allowed!",
                                    "",
                                    "warning",
                                  );
                                  e.target.value = "";
                                  return;
                                }
                                if (file.size > 2 * 1024 * 1024) {
                                  Swal.fire(
                                    "Image must be less than 2 MB!",
                                    "",
                                    "warning",
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
                      <div className="col-md-4">
                        <div className="field-set">
                          <label>
                            Referral Name<span className="text-danger"></span>
                          </label>
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
                    <hr />
                    <div className="d-flex">
                      <div className="col-md-4">
                        <div className="field-set">
                          <label>
                            Treatment Name{" "}
                            <span className="text-danger">*</span>
                          </label>
{/* <Field name="disease_name">
  {({ form, meta }) => (
    <>
      <Autocomplete
        options={Treatment || []}
        getOptionLabel={(option) => option?.name || ""}

        value={
          Treatment.find(
            (item) =>
              item._id === form.values.treatment_course_id
          ) || null
        }

        isOptionEqualToValue={(option, value) =>
          option._id === value?._id
        }

        onChange={(e, newValue) => {
          form.setFieldValue(
            "disease_name",
            newValue ? newValue.name : ""
          );
          form.setFieldValue(
            "disease_id",
            newValue ? newValue.id : ""
          );
        }}

        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            placeholder="Select Treatment Plan"
            error={meta.touched && Boolean(meta.error)}
          />
        )}

        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "0px",
          },
        }}
      />

      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </>
  )}
</Field> */}
<Field name="disease_name">
  {({ form, meta }) => (
    <>
      <Autocomplete
        options={Treatment || []}
        getOptionLabel={(option) => option?.name || ""}

        value={form.values.disease || null}

        isOptionEqualToValue={(option, value) =>
          option.id === value?.id
        }

        onChange={(e, newValue) => {
          form.setFieldValue("disease", newValue);
          form.setFieldValue("disease_name", newValue?.name || "");
          form.setFieldValue("disease_id", newValue?.id || "");
        }}

        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            placeholder="Select Treatment Plan"
            error={meta.touched && Boolean(meta.error)}
          />
        )}

        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "0px",
          },
        }}
      />

    {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </>
  )}
</Field>



                          {/* <Field name="disease_name">
  {({ form, meta }) => (
    <>
      <Autocomplete
        options={Treatment || []}
        getOptionLabel={(option) => option?.name || ""}
        value={form.values.disease_name} // ✅ FULL OBJECT
        isOptionEqualToValue={(option, value) =>
          option.id === value?.course_id
        }
        onChange={(e, newValue) => {
          form.setFieldValue("disease_name", newValue); // ✅ OBJECT SET
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            placeholder="Select Treatment"
            error={meta.touched && Boolean(meta.error)}
          />
        )}
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "0px",
          },
        }}
      />

      {meta.touched && meta.error && (
        <div className="text-danger">{meta.error}</div>
      )}
    </>
  )}
</Field> */}
{/* <Autocomplete
  options={Treatment || []}
  getOptionLabel={(option) => option.course_name || ""}
  value={
    Treatment?.find(
      (item) => item._id === values.disease_name?._id
    ) || null
  }
  onChange={(e, newValue) => {
    setFieldValue("disease_name", newValue); // ✅ FULL OBJECT
  }}
  renderInput={(params) => (
    <TextField {...params} label="Disease Name" size="small" />
  )}
/> */}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="field-set">
                          <div className="field-set">
                            <label>
                              Treating In Country
                              <span className="text-danger">*</span>
                            </label>
                            <Field name="treatingIn">
                              {({ form }) => {
                                const selectedCountry =
                                  Countries?.find(
                                    (c) => c.name === form.values.treatingIn,
                                  ) || null;
                                return (
                                  <Autocomplete
                                    options={Countries || []}
                                    value={selectedCountry} // ✅ OBJECT
                                    getOptionLabel={(option) =>
                                      option?.name || ""
                                    }
                                    isOptionEqualToValue={(option, value) =>
                                      option.name === value?.name
                                    }
                                    onChange={(e, newValue) => {
                                      form.setFieldValue(
                                        "treatingIn",
                                        newValue?.name || "",
                                      );
                                    }}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        placeholder="Select Country"
                                        size="small"
                                      />
                                    )}
                                  />
                                );
                              }}
                            </Field>
                            <ErrorMessage
                              name="treatingIn"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="field-set">
                          <div className="form-check mb-3">
                            {/* <input
                              type="checkbox"
                              className="form-check-input"
                              id="addAttendant"
                              checked={showAttendant}
                              onChange={(e) =>
                                setShowAttendant(e.target.checked)
                              }
                            /> */}
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="addAttendant"
                              checked={showAttendant}
                              onChange={(e) => {
                                setShowAttendant(e.target.checked);
                                setFieldValue(
                                  "showAttendant",
                                  e.target.checked,
                                );
                              }}
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
                        <div className="treat-hd">
                          <h6>Attendant Details</h6>
                          <span className="line"></span>
                        </div>
                        <div className="row">
                          <div className="col-md-4">
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
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="field-set">
                              <label>
                                Attendant Relationship with Patient
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
                          <div className="col-md-4">
                            <div className="field-set">
                              <label>
                                {" "}
                                Attendant Contact Number
                                <span className="text-danger"></span>
                              </label>
                              <div
                                className="country-code"
                                style={{ position: "relative" }}
                              >
                                <Field
                                  className="form-control code-dial"
                                  name="dial_code"
                                  disabled
                                />
                                <Field
                                  className="form-control code-in"
                                  name="patient_relation_no"
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    setFieldValue("patient_relation_no", value);
                                    setPhoneValue(value);
                                  }}
                                />
                                {/* <img
                              src={uploadImage}
                              alt="autofill"
                              onClick={async () => {
                                const value =
                                  phoneValue ||
                                  document.querySelector(
                                    '[name="patient_relation_no"]',
                                  )?.value;
                                if (!value || value.length < 8) {
                                  Swal.fire(
                                    "Please enter at least 8 digits",
                                    "",
                                    "warning",
                                  );
                                  return;
                                }
                                const data =
                                  await fetchPatientByPhoneOrPassport({
                                    patient_relation_no: value,
                                  });
                                if (data) {
                                  const selectedCountry = Countries?.find(
                                    (c) => c.name === data.country,
                                  );
                                  setValues((prev) => ({
                                    ...prev,
                                    ...data,
                                    country: selectedCountry?.name || "",
                                    dial_code: selectedCountry?.dial_code || "",
                                    patient_relation_no: value,
                                  }));
                                  Swal.fire(
                                    "Patient Found",
                                    "Auto-filled",
                                    "success",
                                  );
                                } else {
                                  Swal.fire(
                                    "Patient Not Found",
                                    "No patient found with this phone number",
                                    "info",
                                  );
                                }
                              }}
                              style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "30px",
                                height: "30px",
                                cursor: "pointer",
                                padding: "5px",
                              }}
                            /> */}
                              </div>
                              {/* <Field
                                className="form-control"
                                name="patient_relation_no"
                              /> */}
                              {/* <ErrorMessage
                                name="patient_relation_no"
                                component="div"
                                className="text-danger"
                              /> */}
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="field-set">
                              <label>
                                Attendant ID Proof{" "}
                                <span
                                  className="text-danger"
                                  data-bs-toggle="tooltip"
                                  title="Accept only (.jpeg, .jpg, .png, .jfif, .pdf)
                                  Max size: 2 MB per file"
                                  data-bs-placement="right"
                                >
                                  * (i)
                                </span>
                              </label>
                              {/* <input
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
                                        "warning",
                                      );
                                      e.target.value = "";
                                      return;
                                    }
                                    if (file.size > 2 * 1024 * 1024) {
                                      Swal.fire(
                                        "Image must be less than 2 MB!",
                                        "",
                                        "warning",
                                      );
                                      e.target.value = "";
                                      return;
                                    }
                                    setFieldValue("patient_relation_id", file);
                                  }
                                }}
                              /> */}
                              {/* <input
                                className="form-control"
                                type="file"
                                name="patient_relation_id"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                  const files = Array.from(
                                    e.currentTarget.files,
                                  );
                                  const validFiles = [];

                                  for (const file of files) {
                                    if (!file.type.startsWith("image/")) {
                                      Swal.fire(
                                        "Only image files allowed",
                                        "",
                                        "warning",
                                      );
                                      e.target.value = "";
                                      return;
                                    }
                                    if (file.size > 2 * 1024 * 1024) {
                                      Swal.fire(
                                        "Each image must be < 2MB",
                                        "",
                                        "warning",
                                      );
                                      e.target.value = "";
                                      return;
                                    }
                                    validFiles.push(file);
                                  }

                                  setFieldValue(
                                    "patient_relation_id",
                                    validFiles,
                                  );
                                }}
                              /> */}
                              <input
                            className="form-control"
                            type="file"
                            name="patient_relation_id"
                            multiple
                            accept={allowedTypes.join(",")}
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              const validFiles = [];

                              for (const file of files) {
                                if (!allowedTypes.includes(file.type)) {
                                  Swal.fire(
                                    "Invalid file type!",
                                    "Only image, PDF, Word & Excel files are allowed",
                                    "warning",
                                  );
                                  e.target.value = "";
                                  return;
                                }

                                if (file.size > 2 * 1024 * 1024) {
                                  Swal.fire(
                                    "File too large!",
                                    "Each file must be less than 2 MB",
                                    "warning",
                                  );
                                  e.target.value = "";
                                  return;
                                }

                                validFiles.push(file);
                              }

                              setFieldValue("patient_relation_id", validFiles);
                            }}
                          />
                              <ErrorMessage
                                name="patient_relation_id"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="field-set">
                              <label>
                                Attendant Address
                                <span className="text-danger"></span>
                              </label>
                              <Field
                                className="form-control"
                                name="patient_relation_address"
                              />
                              {/* <ErrorMessage
                                name="patient_relation_address"
                                component="div"
                                className="text-danger"
                              /> */}
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
