import React, { useState, useEffect } from "react";
import { EditEnquiryType, GetAllEnquiry, AddDoctorReview, clearReviewState } from "../../reducer/EnquirySlice";
import { GetAllCountries, GetAllCountries2 } from "../../reducer/Countries";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { FormControl, MenuItem, OutlinedInput, Select, Modal, Box, Typography, Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { baseu11, baseurl, image, imageUrl } from "../../Basurl/Baseurl";
import { Autocomplete, TextField } from "@mui/material";
import avtar from "../../img/avtarImg.jpg";
import axios from "axios";
import { GetAllTreatment } from "../../reducer/TreatmentSlice";
const getFileType = (file) => {
  const ext = file.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  if (["doc", "docx"].includes(ext)) return "word";
  if (["xls", "xlsx"].includes(ext)) return "excel";
  return "other";
};
// Modal style
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
export default function EditEnquiry() {
  const dispatch = useDispatch();
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const location = useLocation();
  const navigate = useNavigate();
  const { Enquiry, loading, doctorReviewData, doctorComments, reviewLoading, reviewError, reviewSuccessMessage } = useSelector((state) => state.Enquiry);
  const [previewImage, setPreviewImage] = useState(null);
  const { Treatment, error } = useSelector((state) => state.Treatment);
  const { Countries } = useSelector((state) => state.Countries);
  const [editenquiry, setEnquiry] = useState("");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  // Modal states
  const [openModal, setOpenModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState("");
  const [reviewImages, setReviewImages] = useState([]);
  useEffect(() => {
    dispatch(GetAllCountries2());
    dispatch(GetAllEnquiry());
    dispatch(GetAllTreatment());
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
    passport_num: Yup.string()
      .trim()
      .uppercase()
      .matches(
        /^[A-Z0-9]{7,15}$/,
        "Passport number must be 7–15 characters (letters & digits only)",
      )
      .required("Passport number is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Others"])
      .required("Gender is required"),
    country: Yup.string().required("Country is required"),
    emergency_contact_no: Yup.string()
      .matches(/^[0-9]+$/, "Only digits are allowed")
      .matches(/^[0-9]{8,15}$/, "Number must be 8 to 15 digits"),
    patient_emergency_contact_no: Yup.string()
      .matches(/^[0-9]+$/, "Only digits are allowed")
      .matches(/^[0-9]{8,15}$/, "Number must be 8 to 15 digits"),
    patient_relation_no: Yup.string().when(
      "has_relation",
      (hasRelation, schema) => {
        if (hasRelation) {
          return schema
            .transform((value) => (value ? value.trim() : ""))
            .test(
              "valid-number",
              "Please enter a valid numeric contact number",
              function (value) {
                if (!value) return true; // empty allowed
                return /^[0-9]{8,15}$/.test(value);
              },
            );
        }
        return schema.notRequired();
      },
    ),
    patient_relation: Yup.string().when("has_relation", {
      is: true,
      then: (schema) => schema.required("Attendant Relationship is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    patient_relation_name: Yup.string().when("has_relation", {
      is: true,
      then: (schema) => schema.required("Attendant Name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    patient_relation_id: Yup.array().when("has_relation", {
      is: true,
      then: (schema) =>
        schema
          .min(1, "At least one Attendant ID Proof is required")
          .test("fileSize", "Each file must be less than 2 MB", (files) => {
            if (!Array.isArray(files)) return false;
            return files.every((file) => {
              if (typeof file === "string") return true;
              if (file instanceof File) {
                return file.size <= MAX_FILE_SIZE;
              }
              return false;
            });
          }),
      otherwise: (schema) => schema.notRequired(),
    }),
    patient_id_proof: Yup.array().test(
      "fileSize",
      "Each file must be less than 2 MB",
      (files) => {
        if (!files || files.length === 0) return true;
        return files.every((file) => {
          if (typeof file === "string") return true;
          return file.size <= MAX_FILE_SIZE;
        });
      },
    ),
    patient_Profile: Yup.mixed().test(
      "fileSize",
      "File size must be less than 2 MB",
      (value) => {
        if (!value) return true;
        if (typeof value === "string") return true;
        return value.size <= MAX_FILE_SIZE;
      },
    ),
  });
  useEffect(() => {
    const initTooltips = () => {
      if (!window.bootstrap) return;
      const tooltipTriggerList = document.querySelectorAll(
        '[data-bs-toggle="tooltip"]',
      );
      tooltipTriggerList.forEach((el) => {
        if (!el._tooltip) {
          el._tooltip = new window.bootstrap.Tooltip(el, {
            placement: el.getAttribute("data-bs-placement") || "top",
            trigger: "hover focus",
          });
        }
      });
    };
    setTimeout(initTooltips, 300);
  });
  // Handle Add Doctor Review Submit
  const handleAddDoctorReview = async () => {
    if (!reviewNotes.trim()) {
      Swal.fire("Error!", "Review notes are required", "error");
      return;
    }
    const formData = new FormData();
    formData.append("enquiryId", editenquiry.enquiryId);
    formData.append("review_notes", reviewNotes);
    formData.append("user_type", "doctor");

    if (reviewImages && reviewImages.length > 0) {
      reviewImages.forEach((file) => {
        // formData.append("images[]", file);
        formData.append("images", file);
      });
    }
    dispatch(AddDoctorReview(formData));
  };
  useEffect(() => {
    if (reviewSuccessMessage) {
      Swal.fire("Success!", reviewSuccessMessage, "success");
      setReviewNotes("");
      setReviewImages([]);
      setOpenModal(false);
      dispatch(clearReviewState());
      // Refresh enquiry data if needed, though the slice now has the latest data
      dispatch(GetAllEnquiry());
    }
    if (reviewError) {
      Swal.fire("Error!", reviewError.message || "Failed to add review", "error");
      dispatch(clearReviewState());
    }
  }, [reviewSuccessMessage, reviewError, dispatch]);

  const openmodalFunction = () => {
    setOpenModal(true);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
    setReviewNotes("");
    setReviewImages([]);
  };
  const handleDeletePatientIdProof = (index) => {
    Swal.fire({
      title: "Delete this image?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await axios.delete(`${baseurl}deletePatientIdProofByIndex`, {
            data: {
              enquiryId: editenquiry.enquiryId,
              index,
            },
          });
          setEnquiry((prev) => ({
            ...prev,
            patient_id_proof: prev.patient_id_proof.filter(
              (_, i) => i !== index,
            ),
          }));
          Swal.fire("Deleted!", "Image removed successfully.", "success");
        } catch (err) {
          Swal.fire("Error", "Unable to delete image", "error");
        }
      }
    });
  };
  const handleDeleteAttendantIdProof = async (index) => {
    Swal.fire({
      title: "Delete this image?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await axios.delete(`${baseurl}deletePatientRelationImageByIndex`, {
            data: {
              enquiryId: editenquiry.enquiryId,
              index,
            },
          });
          setEnquiry((prev) => ({
            ...prev,
            patient_relation_id: prev.patient_relation_id.filter(
              (_, i) => i !== index,
            ),
          }));
          Swal.fire("Deleted!", "Image removed successfully.", "success");
        } catch (err) {
          Swal.fire("Error", "Unable to delete image", "error");
        }
      }
    });
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row gx-3">
          <div className="col-md-12">
            <div className="topmainhd">
              <h6><i class="fa-solid fa-arrow-left-long me-2" onClick={() => window.history.back()}></i>Edit Enquiry</h6>
            </div>
          </div>
          <div className="col-md-12">
            <Formik
              enableReinitialize
              initialValues={{
                name: editenquiry?.name || "",
                age: editenquiry?.age || "",
                town: editenquiry?.town || "",
                email: editenquiry?.email || "",
                gender: editenquiry?.gender || "",
                dial_code: editenquiry?.phoneCode || "",
                discussion_notes: editenquiry?.discussion_notes || [],
                has_relation: !!(
                  editenquiry?.patient_relation_name ||
                  editenquiry?.patient_relation ||
                  editenquiry?.patient_relation_no
                ),
                emergency_contact_no: editenquiry?.emergency_contact || "",
                patient_relation_name:
                  editenquiry?.patient_relation_name || "",
                country: editenquiry?.country || "",
                treatingIn: editenquiry?.treatingIn || "",
                disease_name: editenquiry?.disease_name || "",
                address: editenquiry?.address || "",
                patient_emergency_contact_no:
                  editenquiry?.patient_emergency_contact_no || "",
                patient_relation: editenquiry?.patient_relation || "",
                Referral_Name: editenquiry?.Referral_Name || "",
                address: editenquiry?.address || "",
                passport_num: editenquiry?.passport_num || "",
                patient_relation_no: editenquiry?.patient_relation_no || "",
                disease_id: editenquiry?.disease_id || "",
                patient_relation_address:
                  editenquiry?.patient_relation_address || "",
                patient_relation_id: editenquiry?.patient_relation_id || [],
                patient_id_proof: editenquiry?.patient_id_proof || [],
                patient_Profile: editenquiry?.patient_Profile || "",
                doctorReviewNotes:
                  editenquiry?.doctorReview?.review_notes || "",
                doctorReviewRecommendations:
                  editenquiry?.doctorReview?.Recommendations || "",
              }}
              validationSchema={basicSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const formData = new FormData();
                for (const key in values) {
                  if (
                    key !== "patient_id_proof" &&
                    key !== "patient_Profile" &&
                    key !== "patient_relation_id" &&
                    key !== "discussion_notes"
                  ) {
                    formData.append(key, values[key]);
                  }
                }
                formData.append(
                  "discussionNotes",
                  JSON.stringify(values.discussion_notes),
                );
                formData.append(
                  "doctor_review_notes",
                  values.doctorReviewNotes,
                );
                formData.append(
                  "doctor_recommendations",
                  values.doctorReviewRecommendations,
                );
                if (
                  values.patient_id_proof &&
                  values.patient_id_proof.length > 0
                ) {
                  values.patient_id_proof.forEach((file) => {
                    formData.append("patient_id_proof", file);
                  });
                }
                if (values.doctor_images && values.doctor_images.length > 0) {
                  values.doctor_images.forEach((file) => {
                    if (typeof file !== "string") {
                      formData.append("doctor_review_images", file);
                    }
                  });
                }
                if (values.patient_Profile instanceof File) {
                  formData.append("patient_Profile", values.patient_Profile);
                }
                if (
                  values.patient_relation_id &&
                  values.patient_relation_id.length > 0
                ) {
                  values.patient_relation_id.forEach((file) => {
                    if (typeof file !== "string") {
                      formData.append("patient_relation_id", file);
                    }
                  });
                }
                try {
                  console.log(formData);
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
                  <div className="row gx-3 gy-3">
                    <div className="col-md-12">
                      <div className="main_content">
                        <div className="row gx-3 gy-3">
                          <div className="col-md-4">
                            <div className="set-field">
                              <label>
                                NIC / Passport
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
                          <div className="col-md-4">
                            <div className="set-field">
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
                                      MenuProps={{
                                        PaperProps: {
                                          style: {
                                            maxHeight: 250,
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
                          <div className="col-md-4">
                            <div className="set-field">
                              <label>
                                {" "}
                                Phone No. / WhatsApp
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
                                style={{ color: "red" }}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="set-field">
                              <label>Patient's Name<span className="text-danger">*</span></label>
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
                          <div className="col-md-4">
                            <div className="set-field gender-select">
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
                            </div>
                            <ErrorMessage
                              name="gender"
                              component="div"
                              style={{ color: "red" }}
                            />
                          </div>
                          <div className="col-md-4">
                            <div className="set-field">
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
                          <div className="col-md-4">
                            <div className="set-field">
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
                          <div className="col-md-4">
                            <div className="set-field">
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
                          <div className="col-md-4">
                            <div className="set-field">
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
                          <div className="col-md-4">
                            <div className="set-field">
                              <label>Emergency Contact No<span className="text-danger">*</span></label>
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
                                style={{ color: "red" }}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="set-field">
                              <label>
                                Patient Id Proof
                                <span className="text-danger"></span>{" "}
                                <span
                                  className="text-danger"
                                  data-bs-placement="right"
                                  data-bs-toggle="tooltip"
                                  title="Accept only (.jpeg, .jpg, .png, .jfif, .pdf) Max size: 2 MB per file"
                                >
                                  (i)
                                </span>
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
                              <div className="engpatimg">
                                {Array.isArray(editenquiry?.patient_id_proof) &&
                                  editenquiry.patient_id_proof.length > 0 &&
                                  editenquiry.patient_id_proof.map(
                                    (file, index) => {
                                      const type = getFileType(file);
                                      const fileUrl = `${imageUrl}${file}`;

                                      return (
                                        <div className="file-preview" key={index}>
                                          <span
                                            className="delete-icon"
                                            onClick={() =>
                                              handleDeletePatientIdProof(index)
                                            }
                                          >
                                            <i className="fa-solid fa-xmark"></i>
                                          </span>
                                          <button
                                            type="button"
                                            className="viewbtn"
                                            onClick={() =>
                                              window.open(fileUrl, "_blank")
                                            }
                                          >
                                            {type === "image" && "View"}
                                            {type === "pdf" && "View"}
                                            {type === "word" && "View"}
                                            {type === "excel" && "View"}
                                            {![
                                              "image",
                                              "pdf",
                                              "word",
                                              "excel",
                                            ].includes(type) && "View"}
                                          </button>
                                        </div>
                                      );
                                    },
                                  )}
                              </div>
                              <ErrorMessage
                                name="patient_id_proof"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="set-field">
                              <label>
                                Patient Profile<span className="text-danger"></span>{" "}
                                <span
                                  className="text-danger"
                                  data-bs-placement="right"
                                  data-bs-toggle="tooltip"
                                  title="Accept only (.jpeg, .jpg, .png, .jfif ) Max size: 2 MB per file"
                                >
                                  (i)
                                </span>
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                name="patient_Profile"
                                accept="image/*,application/pdf"
                                onChange={(e) => {
                                  const file = e.currentTarget.files[0];

                                  if (file) {
                                    setPreviewImage(URL.createObjectURL(file));
                                    setFieldValue("patient_Profile", file);
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
                                ) : editenquiry?.patient_Profile ? (
                                  <button
                                    type="button"
                                    className="viewbtn"
                                    onClick={() =>
                                      window.open(
                                        `${imageUrl}${editenquiry.patient_Profile}`,
                                        "_blank",
                                      )
                                    }
                                  >
                                    View
                                  </button>
                                ) : null}
                              </div>
                              <ErrorMessage
                                name="patient_Profile"
                                component="div"
                                className="text-danger"
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="set-field">
                              <label>
                                Referral Name<span className="text-danger">*</span>
                              </label>
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
                          <div className="col-md-4">
                            <div className="set-field">
                              <label>
                                Treatment name
                                <span className="text-danger">*</span>
                              </label>
                              <Autocomplete
                                options={Treatment || []}
                                getOptionLabel={(option) => option.name || ""}
                                value={
                                  Treatment?.find(
                                    (item) => item.name === values.disease_name,
                                  ) || null
                                }
                                onChange={(e, value) => {
                                  setFieldValue("disease_name", value?.name || "");
                                  setFieldValue(
                                    "treatment_course_id",
                                    value?.course_id || null,
                                  );
                                  setFieldValue("disease_id", value?.id || null);
                                }}
                                ListboxProps={{
                                  style: {
                                    maxHeight: 250,
                                    overflow: "auto"
                                  }
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
                          <div className="col-md-4">
                            <div className="set-field">
                              <label>Treating In Country<span className="text-danger">*</span></label>
                              <Field name="treatingIn">
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
                                        setFieldValue("treatingIn", e.target.value);
                                      }}
                                      MenuProps={{
                                        PaperProps: {
                                          style: {
                                            maxHeight: 250,
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
                                  </FormControl>
                                )}
                              </Field>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="main_content">
                        <div className="comnthis">
                          <h6>Notes</h6>
                        </div>
                        {values.discussion_notes?.map((note, index) => (
                          <div className="set-field" key={index}>
                            <div className="noteadv">
                              <label>Note-{index + 1}</label>
                              <h6>Date - {new Date(note.date).toLocaleDateString("en-GB")}</h6>
                            </div>
                            <Field
                              as="textarea"
                              name={`discussion_notes.${index}.note`}
                              className="form-control"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="main_content">
                        <div className="row gx-3 gy-3">
                          <div className="col-md-12">
                            <div className="comnthis">
                              <h6>Doctor Review</h6>
                            </div>
                            <div className="row gx-3 gy-3">
                              {(doctorReviewData || editenquiry?.doctorReview) && (
                                <>
                                  <div className="col-md-4">
                                    <div className="set-field">
                                      <label>Review Notes</label>
                                      <textarea className="form-control">
                                        {doctorReviewData?.review_notes || editenquiry?.doctorReview?.review_notes || "N/A"}
                                      </textarea>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="set-field">
                                      <label>Recommendations</label>
                                      <textarea className="form-control">
                                        {doctorReviewData?.Recommendations || editenquiry?.doctorReview?.Recommendations || "N/A"}
                                      </textarea>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="set-field">
                                      <label>Images</label>
                                      <div className="engpatimg">
                                        {(doctorReviewData?.images || editenquiry?.doctorReview?.images || []).map((img, index) => (
                                          <button
                                            key={index}
                                            type="button"
                                            className="viewbtn"
                                            onClick={() => window.open(`${imageUrl}${img}`, "_blank")}
                                          >
                                            View {index + 1}
                                          </button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          {((doctorComments && doctorComments.length > 0) || (editenquiry?.doctorReview?.comments && editenquiry.doctorReview.comments.length > 0)) && (
                            <div className="col-md-12">
                              <div className="docre-hd">
                                <div className="comnthis">
                                  <h6 className="mb-0">Comments</h6>
                                </div>
                                <button className="add-button" type="button" onClick={openmodalFunction}>Add Comment</button>
                              </div>
                              <div className="row gx-3 gy-3">
                                {(doctorComments.length > 0 ? doctorComments : (editenquiry?.doctorReview?.comments || [])).map((comment, index) => (
                                  <div className="col-md-12" key={comment._id || index}>
                                    <div className="card customstylecard">
                                      <div className="card-body">
                                        <div className="note-view">
                                          <h3 className="card-title">{comment.user_type} Note</h3>
                                        </div>
                                        <div className="experience-box">
                                          <ul className="experience-list">
                                            <li className="mb-0">
                                              <div className="experience-user">
                                                <div className="before-circle"></div>
                                              </div>
                                              <div className="experience-content">
                                                <div className="timeline-content">
                                                  <a href="#/" className="name">
                                                    {comment.Notes}
                                                  </a>
                                                  {/* Show images if present */}
                                                  {comment.images && comment.images.length > 0 && (
                                                    <div className="">
                                                      {comment.images.map((img, imgIndex) => {
                                                        const fullUrl = img.startsWith("http")
                                                          ? img
                                                          : imageUrl + img;
                                                        return (
                                                          <button
                                                            key={imgIndex}
                                                            type="button"
                                                            className="viewbtn me-2"
                                                            onClick={() => window.open(fullUrl, "_blank")}
                                                          >
                                                            View {imgIndex + 1}
                                                          </button>
                                                        );
                                                      })}
                                                    </div>
                                                  )}

                                                  <div>
                                                    {" "}
                                                    {comment.Date
                                                      ? new Date(comment.Date).toLocaleDateString("en-GB")
                                                      : new Date(comment.createdAt).toLocaleDateString("en-GB")}
                                                  </div>
                                                </div>
                                              </div>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="main_content">
                        <div className="row gx-3 gy-3">
                          <div className="col-md-12">
                            <div className="comnthis">
                              <h6>Attendant Details</h6>
                            </div>
                            <div className="form-check">
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
                                Add Attendant
                              </label>
                            </div>
                          </div>
                          <div className="col-md-12">
                            {values.has_relation && (
                              <>
                                <div className="row gx-3 gy-3">
                                  <div className="col-md-4">
                                    <div className="set-field">
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
                                  <div className="col-md-4">
                                    <div className="set-field">
                                      <label>
                                        Attendant Relationship With Patient
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
                                  <div className="col-md-4">
                                    <div className="set-field">
                                      <label>
                                        Attendant Contact Number
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
                                          name="patient_relation_no"
                                        />
                                      </div>
                                      <ErrorMessage
                                        name="patient_relation_no"
                                        component="div"
                                        className="text-danger"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="set-field">
                                      <label>
                                        Attendant ID Proof
                                        <span
                                          className="text-danger"
                                          data-bs-toggle="tooltip"
                                          title="Accept only (.jpeg, .jpg, .png, .jfif, .pdf)
                                            Max size: 2 MB per file"
                                          data-bs-placement="right"
                                        > (i)</span>
                                      </label>
                                      <input
                                        className="form-control"
                                        type="file"
                                        name="patient_relation_id"
                                        accept="image/*,application/pdf"
                                        multiple
                                        onChange={(e) => {
                                          const files = Array.from(
                                            e.currentTarget.files,
                                          );
                                          setFieldValue("patient_relation_id", files);
                                        }}
                                      />
                                      <div className="engpatimg">
                                        {
                                          Array.isArray(
                                            editenquiry.patient_relation_id,
                                          ) &&
                                            editenquiry.patient_relation_id.length > 0
                                            ? editenquiry.patient_relation_id.map(
                                              (file, index) => {
                                                const fileUrl = `${imageUrl}${file}`;
                                                return (
                                                  <div className="">
                                                    <div
                                                      className="file-preview"
                                                      key={index}
                                                    >
                                                      <span
                                                        className="delete-icon"
                                                        onClick={() =>
                                                          handleDeleteAttendantIdProof(
                                                            index,
                                                          )
                                                        }
                                                      >
                                                        <i class="fa-solid fa-xmark"></i>
                                                      </span>
                                                      <button
                                                        type="button"
                                                        className="viewbtn"
                                                        onClick={() =>
                                                          window.open(
                                                            fileUrl,
                                                            "_blank",
                                                          )
                                                        }
                                                      >
                                                        View
                                                      </button>
                                                    </div>
                                                  </div>
                                                );
                                              },
                                            )
                                            : ""
                                        }
                                      </div>
                                      <ErrorMessage
                                        name="patient_relation_id"
                                        component="div"
                                        className="text-danger"
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="set-field">
                                      <label>
                                        Attendant Address
                                        <span className="text-danger">*</span>
                                      </label>
                                      <Field
                                        className="form-control"
                                        name="patient_relation_address"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="submit-btn"
                        disabled={isSubmitting || loading}
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      {/* add doctor review modal */}
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={openModal}
          onClose={handleCloseModal}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Add Doctor Review</h6>
            </div>
            <div className="cross-icon" onClick={handleCloseModal}>
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <DialogContent className="main-box">
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
              }}
              className="contact-form"
            >
              <div className="row gx-3 gy-3">
                <div className="col-md-12">
                  <div className="set-field">
                    <label>Review Notes <span className="text-danger">*</span></label>
                    <textarea className="form-control" rows="2"
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Enter review notes..." />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="set-field">
                    <label>Upload Images <span className="text-danger">*</span> </label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        setReviewImages(files);
                      }}
                    />
                    {reviewImages.length > 0 && (
                      <small className="text-muted mt-1 d-block">
                        {reviewImages.length} file(s) selected
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <DialogActions className="submit-main mt-3">
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleAddDoctorReview}
                  disabled={reviewLoading}
                >
                  {reviewLoading ? "Submitting..." : "Submit"}
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </div>
  );
}