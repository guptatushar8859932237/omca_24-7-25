import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { Checkbox, ListItemText } from "@mui/material";
import axios from "axios";
import { image, baseurl } from "../../Basurl/Baseurl";
import { GetAllStaffUser } from "../../reducer/StaffSlice";
import { GetAllCountries2 } from "../../reducer/Countries";
import { Autocomplete, TextField } from "@mui/material";

import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
export default function EditStaff() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { staff } = useSelector((state) => state.staff);
  const { Countries } = useSelector((state) => state.Countries);
  const [editStaff, setEditStaff] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const statusOptions = [
    "Foundation",
    "Private",
    "Insurance",
    "Insurance + Private",
  ];
  useEffect(() => {
    dispatch(GetAllStaffUser());
    dispatch(GetAllCountries2());
  }, [dispatch]);
  useEffect(() => {
    if (location.state?.staffID && staff.length > 0) {
      const selected = staff.find(
        (item) => item._id === location.state.staffID,
      );
      console.log(selected);
      setEditStaff(selected);
    }
  }, [location.state?.staffID, staff]);
  if (!editStaff) return <div>Loading...</div>;
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    role: Yup.string()
      .oneOf(
        ["Manager", "Staff", "Finance", "Coordinator", "Receptionist"],
        "Invalid role",
      )
      .required("Role is required"),
    phone_no: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(6, "Phone number must be at least 6 digits")
      .max(15, "Phone number must not exceed 15 digits"),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Other"])
      .required("Gender is required"),
    profileImage: Yup.mixed().required("Profile image is required"),
    country: Yup.string().required("Country is required"),
    accessCountries: Yup.array().min(
      1,
      "At least one country must be selected",
    ),
    dial_code: Yup.string().required("Dial code is required"),
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone_no", values.phone_no);
      formData.append("role", values.role);
      formData.append("gender", values.gender);
      formData.append("country", values.country);
      formData.append("dial_code", values.dial_code);
      formData.append("roleStatuses", values.roleStatuses);
      formData.append(
        "accessCountries",
        JSON.stringify(values.accessCountries),
      );
      if (values.profileImage instanceof File) {
        formData.append("profileImage", values.profileImage);
      }
      await axios.put(`${baseurl}update_details/${editStaff._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire("Success!", "Staff updated successfully", "success");
      navigate("/Admin/staff");
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <h4 className="page-title">
          <i
            className="fi fi-sr-angle-double-small-left"
            style={{ cursor: "pointer" }}
            onClick={() => window.history.back()}
          ></i>{" "}
          Edit Staff
        </h4>
        <div className="main_content">
          <Formik
            enableReinitialize
            initialValues={{
              email: editStaff.email || "",
              role: editStaff.role || "",
              gender: editStaff.gender || "",
              phone_no: editStaff.phone_no || "",
              name: editStaff.name || "",
              country: editStaff.country || "",
              dial_code: editStaff.dial_code || "",
              profileImage: editStaff.profileImage || null,
              roleStatuses: editStaff.roleStatuses || null,
              accessCountries: editStaff.accessCountries || [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, isSubmitting }) => (
              <Form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>Name *</label>
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
                      <label>Email *</label>
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
                      <label>Country *</label>
                      <Field name="country">
                        {({ field, form }) => (
                          <>
                            <FormControl fullWidth size="small">
                              <Select
                                value={field.value}
                                onChange={(e) => {
                                  const selectedCountry = Countries.find(
                                    (item) => item.name === e.target.value,
                                  );
                                  form.setFieldValue(
                                    "country",
                                    selectedCountry.name,
                                  );
                                  form.setFieldValue(
                                    "dial_code",
                                    selectedCountry.dial_code,
                                  );
                                }}
                                input={
                                  <OutlinedInput placeholder="Select Country" />
                                }
                                displayEmpty
                                sx={{ height: 40 }}
                                MenuProps={{
                                  PaperProps: { style: { maxHeight: 200 } },
                                }}
                              >
                                <MenuItem value="">
                                  <em>Select Country</em>
                                </MenuItem>
                                {Countries?.map((con) => (
                                  <MenuItem key={con._id} value={con.name}>
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
                  {/* <div className="col-sm-6">
                    <div className="field-set">
                      <label>Dial Code *</label>
                      <Field
                        className="form-control"
                        name="dial_code"
                        disabled
                      />
                      <ErrorMessage
                        name="dial_code"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>Phone No *</label>
                      <Field className="form-control" name="phone_no" />
                      <ErrorMessage
                        name="phone_no"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div> */}
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>
                        Phone No <span className="text-danger">*</span>
                      </label>

                      <div className="d-flex">
                        {/* Dial Code – 30% */}
                        <input
                          type="text"
                          className="form-control"
                          style={{ width: "10%" }}
                          value={values.dial_code}
                          disabled
                        />

                        {/* Phone Number – 70% */}
                        <input
                          type="text"
                          className="form-control"
                          style={{ width: "90%" }}
                          name="phone_no"
                          value={values.phone_no}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "");
                            setFieldValue("phone_no", val);
                          }}
                          placeholder="Enter phone number"
                        />
                      </div>

                      <ErrorMessage
                        name="phone_no"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label>
                      Access Countries <span className="text-danger">*</span>
                    </label>

                    <FormControl fullWidth>
                      <Select
                        multiple
                        name="accessCountries"
                        value={values.accessCountries}
                        onChange={(event) => {
                          const value = event.target.value;

                          // Select All logic
                          if (value.includes("All")) {
                            if (
                              values.accessCountries.length === Countries.length
                            ) {
                              setFieldValue("accessCountries", []);
                            } else {
                              setFieldValue(
                                "accessCountries",
                                Countries.map((c) => c.name),
                              );
                            }
                          } else {
                            setFieldValue("accessCountries", value);
                          }
                        }}
                        renderValue={(selected) => selected.join(", ")}
                        className="form-control"
                        MenuProps={{
                          PaperProps: { style: { maxHeight: 300 } },
                        }}
                      >
                        {/* Select All */}
                        <MenuItem value="All">
                          <Checkbox
                            checked={
                              values.accessCountries.length === Countries.length
                            }
                            indeterminate={
                              values.accessCountries.length > 0 &&
                              values.accessCountries.length < Countries.length
                            }
                          />
                          <ListItemText primary="Select All" />
                        </MenuItem>

                        {/* Country list */}
                        {Countries?.map((con) => (
                          <MenuItem key={con._id} value={con.name}>
                            <Checkbox
                              checked={values.accessCountries.includes(
                                con.name,
                              )}
                            />
                            <ListItemText primary={con.name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <ErrorMessage
                      name="accessCountries"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>Role *</label>
                      <Field as="select" name="role" className="form-control">
                        <option value="">Select Role</option>
                        {/* <option value="Admin">Admin</option> */}
                        <option value="Manager">Manager</option>
                        <option value="Receptionist">Receptionist</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Physiotherapist">Physiotherapist</option>
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

                  <div className="col-sm-6">
                    <div className="field-set gender-select">
                      <label>Gender *</label>
                      <br />
                      <div className="form-check-inline">
                        <Field type="radio" name="gender" value="Male" /> Male
                      </div>
                      <div className="form-check-inline">
                        <Field type="radio" name="gender" value="Female" />{" "}
                        Female
                      </div>
                      <div className="form-check-inline">
                        <Field type="radio" name="gender" value="Other" />{" "}
                        Others
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
                      <label>Profile Image *</label>
                      <div className="profile-upload">
                        <div className="upload-img">
                          {selectedImage ? (
                            <img
                              src={URL.createObjectURL(selectedImage)}
                              alt="preview"
                            />
                          ) : editStaff?.profileImage ? (
                            <img
                              src={`${image}${editStaff.profileImage}`}
                              alt="current"
                            />
                          ) : (
                            <img src="assets/img/user.jpg" alt="default" />
                          )}
                        </div>
                        <div className="upload-input">
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => {
                              setFieldValue("profileImage", e.target.files[0]);
                              setSelectedImage(e.target.files[0]);
                            }}
                          />
                        </div>
                      </div>
                      <ErrorMessage
                        name="profileImage"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label>
                      Give Permission<span className="text-danger">*</span>
                    </label>
                    <FormControl fullWidth>
                      <Select
                        multiple
                        value={values.roleStatuses}
                        name="roleStatuses"
                        onChange={(event) => {
                          const value = event.target.value;
                          if (value.includes("All")) {
                            if (
                              values.roleStatuses.length ===
                              statusOptions.length
                            ) {
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
                            style: { maxHeight: 337 },
                          },
                          disableAutoFocusItem: true,
                        }}
                      >
                        <MenuItem value="All">
                          <Checkbox
                            checked={
                              values.roleStatuses.length ===
                              statusOptions.length
                            }
                            indeterminate={
                              values.roleStatuses.length > 0 &&
                              values.roleStatuses.length < statusOptions.length
                            }
                          />
                          <ListItemText primary="Select All" />
                        </MenuItem>
                        {statusOptions.map((roleStatuses) => (
                          <MenuItem key={roleStatuses} value={roleStatuses}>
                            <Checkbox
                              checked={
                                values.roleStatuses.indexOf(roleStatuses) > -1
                              }
                            />
                            <ListItemText primary={roleStatuses} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <button
                  type="submit"
                  className="submit-btn my-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
