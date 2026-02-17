import React, { useEffect } from "react";
import { useState } from "react";
import { AddAllStaffuser } from "../../reducer/StaffSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { GetAllCountries, GetAllCountries2 } from "../../reducer/Countries";
import axios from "axios";
import { baseurl } from "../../Basurl/Baseurl";
export default function AddStaff() {
  // const { Countries } = useSelector((state) => state.Countries);

  const statusOptions = [
    "Foundation",
    "Private",
    "Insurance",
    "Insurance + Private",
   
  ];
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const { Countries } = useSelector((state) => state.Countries);
  // const [Countries,setCountries]=useState([])
  const { staff, loading, error } = useSelector((state) => state.staff);
  console.log(error);
  const navigate = useNavigate();
  const basicSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),

  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  role: Yup.string()
    .required("Role is required"),

  gender: Yup.string()
    .oneOf(["Male", "Female", "Others"], "Invalid gender")
    .required("Gender is required"),

  country: Yup.string()
    .required("Country is required"),

  dial_code: Yup.string()
    .required("Dial code is required"),

  phone_no: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(6, "Phone number must be at least 6 digits")
    .max(15, "Phone number must not exceed 15 digits")
    .required("Phone number is required"),

  roleStatuses: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one permission")
    .required("Permission is required"),

  accessCountries: Yup.array()
    .of(Yup.string())
    .min(1, "Select at least one country for data access")
    .required("Data access country is required"),

  profileImage: Yup.mixed()
    .required("Profile image is required")
    .test(
      "fileSize",
      "File size must be less than 2MB",
      (value) => value && value.size <= 2 * 1024 * 1024
    )
    .test(
      "fileType",
      "Only JPG, PNG or PDF files are allowed",
      (value) =>
        value &&
        ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
    ),
});

//   const basicSchema = Yup.object().shape({
//     name: Yup.string()
//       .required("Name is required")
//       .min(2, "Name must be at least 2 characters")
//       .max(50, "Name cannot exceed 50 characters"),
//     country: Yup.string().required("Country is Required"),
//     role: Yup.string()
//       .required("Role is required")
//       .min(2, "Role must be at least 2 characters")
//       .max(50, "Role cannot exceed 50 characters"),
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     password: Yup.string().required("Password is Required"),
//   dial_code: Yup.string().required(),
// phone_no: Yup.string()
//   .required("Phone number is required")
//   .matches(/^[0-9]+$/, "Phone number must contain only digits")
//   .min(6, "Phone number must be at least 6 digits")
//   .max(15, "Phone number must not exceed 15 digits"),
//     gender: Yup.string()
//       .oneOf(["Male", "Female", "Others"], "Invalid gender selection")
//       .required("Gender is required"),
//     roleStatuses: Yup.array()
//       .min(1, "Please select at least one status")
//       .required("Status is required"),
//       accessCountries: Yup.array()
//   .min(1, "Please select at least one country for data access")
//   .required("Data access country is required"),
//     profileImage: Yup.mixed()
//       .required("Profile Image is required")
//       .test("fileSize", "File size is too large (Max: 2MB)", (value) =>
//         value ? value.size <= 2 * 1024 * 1024 : true
//       )
//       .test("fileType", "Unsupported file format", (value) =>
//         value
//           ? ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
//           : true
//       ),
//   });
  useEffect(() => {
    dispatch(GetAllCountries2());
  }, [dispatch]);
    // const { Countries } = useSelector((state) => state.Countries);
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">
                <span>
                  <i
                    class="fi fi-sr-angle-double-small-left"
                    onClick={() => {
                      window.history.back();
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                  ></i>
                </span>
                New Staff
              </h4>
            </div>
          </div>
          <div className="main_content">
            <Formik
              initialValues={{
                email: "",
                password: "",
                role: "",
                gender: "",
                phone_no: "",
                name: "",
                dial_code: "",
                country: "",
                profileImage: null,
                roleStatuses: [],
                 accessCountries: [],
              }}
              validationSchema={basicSchema}
              onSubmit={async (values, { setSubmitting }) => {
                console.log(values);
                try {
                  const result = await dispatch(
                    AddAllStaffuser(values)
                  ).unwrap();
                  Swal.fire("Staff added successfully!", "", "success");
                  navigate("/Admin/Staff");
                } catch (err) {
                  console.log(err);
                  Swal.fire(
                    "Error!",
                    err?.message || "An error occurred",
                    "error"
                  );
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Name<span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name="name"
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
                          type="email"
                          name="email"
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
                          Password <span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="password"
                          name="password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          style={{ color: "red" }}
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
    className="select-country form-control"
    onChange={(e) => {
      const selectedCountry = Countries.find(
        (c) => c.name === e.target.value
      );
      form.setFieldValue("country", e.target.value);
     form.setFieldValue(
  "dial_code",
  selectedCountry?.dial_code || ""
);
    }}
    displayEmpty
    sx={{ height: 40 }}
  >
    <MenuItem value="">
      <em>Select Country</em>
    </MenuItem>

    {Countries?.map((con, idx) => (
      <MenuItem key={idx} value={con.name}>
        {con.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>
</>)}
</Field>
<ErrorMessage
  name="country"
  component="div"
  style={{ color: "red" }}
/>
</div>
</div>
                    {/* <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Dial Code<span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          disabled
                          name="dial_code"
                        />
                      </div>
                    </div> */}
                    {/* <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Phone No <span className="text-danger">*</span>
                        </label>
                        <Field
                          className="form-control"
                          type="text"
                          name="phone_no"
                        />
                        <ErrorMessage
                          name="phone_no"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div> */}
                 <div className="col-sm-6">
  <div className="field-set">
    <label>
      Phone No <span className="text-danger">*</span>
    </label>

    <div className="phone-wrapper">
      {/* Dial Code (20%) */}
      <input
        type="text"
        className="phone-code"
        value={values.dial_code}
        disabled
      />

      {/* Phone Number (80%) */}
      <input
        type="text"
        className="phone-number"
        value={values.phone_no}
        name="phone_no"
        onChange={(e) =>
          setFieldValue("phone_no", e.target.value)
        }
        placeholder="Enter phone number"
      />
    </div>

    <ErrorMessage
      name="phone_no"
      component="div"
      style={{ color: "red" }}
    />
  </div>
</div>

                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Role<span className="text-danger">*</span>
                        </label>
                        <Field as="select" className="form-control" name="role">
                          <option value="">Select Role</option>
                          <option value="Manager">Manager</option>
                          <option value="Receptionist">Receptionist</option>
                          {/* <option value="Doctor">Doctor</option> */}
                          <option value="Finance">Finance</option>
                          <option value="Coordinator">Coordinator</option>
                        </Field>
                        <ErrorMessage
                          name="role"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
<div className="col-sm-6 dropdownCustom">
  <label>
    Data Access Country <span className="text-danger">*</span>
  </label>

  <FormControl fullWidth size="small">
    <Select
      multiple
      value={values.accessCountries}
      onChange={(event) => {
        const value = event.target.value;

        if (value.includes("All")) {
          if (values.accessCountries.length === Countries.length) {
            setFieldValue("accessCountries", []);
          } else {
            setFieldValue(
              "accessCountries",
              Countries.map((c) => c.name)
            );
          }
        } else {
          setFieldValue("accessCountries", value);
        }
      }}
      renderValue={(selected) => selected.join(", ")}
      className="form-control"
    >
      {/* Select All */}
      <MenuItem value="All">
        <Checkbox
          checked={values.accessCountries.length === Countries.length}
          indeterminate={
            values.accessCountries.length > 0 &&
            values.accessCountries.length < Countries.length
          }
        />
        <ListItemText primary="Select All" />
      </MenuItem>

      {/* Country List */}
      {Countries?.map((country) => (
        <MenuItem key={country.name} value={country.name}>
          <Checkbox
            checked={values.accessCountries.indexOf(country.name) > -1}
          />
          <ListItemText primary={country.name} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <ErrorMessage
    name="accessCountries"
    component="div"
    style={{ color: "red" }}
  />
</div>

                    <div className="col-sm-6">
                      <div className="field-set gender-select">
                        <label className="gen-label">
                          Gender <span className="text-danger">*</span>
                        </label>
                        <div className="form-check-inline">
                          <label className="form-check-label">
                            <Field
                              type="radio"
                              name="gender"
                              value="Male"
                              className="form-check-input"
                            />
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
                            />
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
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="field-set">
                        <label>
                          Profile Image<span className="text-danger">*</span>
                        </label>
                        <div className="profile-upload">
                          <div className="upload-img">
                            {selectedImage ? (
                              <img
                                alt="preview"
                                src={URL.createObjectURL(selectedImage)}
                              // style={{ width: "100px", height: "100px", objectFit: "cover" }}
                              />
                            ) : (
                              <img
                                alt="default avatar"
                                src="https://www.shutterstock.com/image-vector/profile-default-avatar-icon-user-600nw-2463844171.jpg"
                              />
                            )}
                          </div>
                          <div className="upload-input">
                            <input
                              type="file"
                              className="form-control"
                              onChange={(event) => {
                                setFieldValue(
                                  "profileImage",
                                  event.target.files[0]
                                );
                                setSelectedImage(event.target.files[0]);
                              }}
                            />
                          </div>
                        </div>
                        <ErrorMessage
                          name="profileImage"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 dropdownCustom">
                      <label>
                        Give Permission<span className="text-danger"></span>
                      </label>
                      <FormControl fullWidth>
                        <Select
                          multiple
                          value={values.roleStatuses}
                          name="roleStatuses"
                          onChange={(event) => {
                            const value = event.target.value;
                            if (value.includes("All")) {
                              if (values.roleStatuses.length === statusOptions.length) {
                                setFieldValue("roleStatuses", []);
                              } else {
                                setFieldValue("roleStatuses", statusOptions);
                              }
                            } else {
                              setFieldValue("roleStatuses", value);
                            }
                          }}
                          className="form-control"
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={{
                            PaperProps: {
                              style: {
                                maxHeight: 337,
                                height: 337,
                              },
                            },
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            },
                            transformOrigin: {
                              vertical: "top",
                              horizontal: "left",
                            },
                            getContentAnchorEl: null,
                          }}
                        >
                          <MenuItem value="All">
                            <Checkbox
                              checked={values.roleStatuses.length === statusOptions.length}
                              indeterminate={
                                values.roleStatuses.length > 0 &&
                                values.roleStatuses.length < statusOptions.length
                              }
                            />
                            <ListItemText primary="Select All" />
                          </MenuItem>

                          {/* Normal Status Items */}
                          {statusOptions.map((roleStatuses) => (
                            <MenuItem key={roleStatuses} value={roleStatuses}>
                              <Checkbox
                                checked={values.roleStatuses.indexOf(roleStatuses) > -1}
                              />
                              <ListItemText primary={roleStatuses} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                    </div>
                  </div>
                  <div className="">
                    <button
                      className="submit-btn my-2"
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
    </>
  );
}
