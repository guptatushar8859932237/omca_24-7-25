// import React, { useEffect, useState } from "react";
// import { Formik, Field, ErrorMessage, Form } from "formik";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import * as Yup from "yup";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { image, baseurl } from "../../Basurl/Baseurl";
// import { GetAllStaffUser } from "../../reducer/StaffSlice";

// export default function EditStaff() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const { staff } = useSelector((state) => state.staff);

//   const [editStaff, setEditStaff] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   // Get all staff
//   useEffect(() => {
//     dispatch(GetAllStaffUser());
//   }, [dispatch]);

//   // Set current staff
//   useEffect(() => {
//     if (location.state?.staffID && staff.length > 0) {
//       const selected = staff.find((item) => item._id === location.state.staffID);
//       setEditStaff(selected);
//     }
//   }, [location.state?.staffID, staff]);

//   const validationSchema = Yup.object().shape({
//     name: Yup.string().required("Name is required"),
//     role: Yup.string().required("Role is required"),
//     phone_no: Yup.string().matches(/^[0-9]{10,11}$/, "Invalid phone number").required(),
//     gender: Yup.string().oneOf(["Male", "Female", "Others"]).required("Gender is required"),
//     profileImage: Yup.mixed().required("Profile image is required"),
//   });

//   if (!editStaff) return <div>Loading...</div>;

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("email", values.email);
//       formData.append("phone_no", values.phone_no);
//       formData.append("role", values.role);
//       formData.append("gender", values.gender);

//       if (values.profileImage instanceof File) {
//         formData.append("profileImage", values.profileImage);
//       }

//       const response = await axios.put(`${baseurl}update_details/${editStaff._id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       Swal.fire("Success!", "Staff updated successfully", "success");
//       navigate("/Admin/staff");
//     } catch (error) {
//       Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="row">
//           <div className="col-md-12">
//             <h4 className="page-title"><span><i class="fi fi-sr-angle-double-small-left"></i></span>Edit Staff</h4>
//           </div>
//         </div>
//         <div className="main_content">
//           <Formik
//             enableReinitialize
//             initialValues={{
//               email: editStaff.email || "",
//               role: editStaff.role || "",
//               gender: editStaff.gender || "",
//               phone_no: editStaff.phone_no || "",
//               name: editStaff.name || "",
//               profileImage: editStaff.profileImage || null,
//             }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ setFieldValue, isSubmitting, values }) => (
//               <Form>
//                 <div className="row">
//                   <div className="col-sm-6">
//                     <div className="field-set">
//                       <label>Name<span className="text-danger">*</span></label>
//                       <Field className="form-control" type="text" name="name" />
//                       <ErrorMessage name="name" component="div" style={{ color: "red" }} />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="field-set">
//                       <label>Email<span className="text-danger">*</span></label>
//                       <Field className="form-control" type="email" name="email" />
//                       <ErrorMessage name="email" component="div" style={{ color: "red" }} />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="field-set">
//                       <label>Phone No<span className="text-danger">*</span></label>
//                       <Field className="form-control" type="text" name="phone_no" />
//                       <ErrorMessage name="phone_no" component="div" style={{ color: "red" }} />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="field-set">
//                       <label>Role<span className="text-danger">*</span></label>
//                       <Field className="form-control" type="text" name="role" disabled />
//                       <ErrorMessage name="role" component="div" style={{ color: "red" }} />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="field-set gender-select">
//                       <label className="gen-label">Gender<span className="text-danger">*</span></label>
//                       <div className="form-check-inline">
//                         <label className="form-check-label">
//                           <Field type="radio" name="gender" value="Male" className="form-check-input" />
//                           Male
//                         </label>
//                       </div>
//                       <div className="form-check-inline">
//                         <label className="form-check-label">
//                           <Field
//                             type="radio"
//                             name="gender"
//                             value="Female"
//                             className="form-check-input"
//                           />
//                           Female
//                         </label>
//                       </div>
//                       <div className="form-check-inline">
//                         <label className="form-check-label">
//                           <Field
//                             type="radio"
//                             name="gender"
//                             value="Others"
//                             className="form-check-input"
//                           />
//                           Others
//                         </label>
//                       </div>
//                       <ErrorMessage
//                         name="gender"
//                         component="div"
//                         style={{ color: "red" }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-sm-6">
//                     <div className="field-set">
//                       <label>Profile Image<span className="text-danger">*</span></label>
//                       <div className="profile-upload">
//                         <div className="upload-img">
//                           {selectedImage ? (
//                             <img
//                               alt="preview"
//                               src={URL.createObjectURL(selectedImage)}
//                             // style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                             />
//                           ) : editStaff?.profileImage ? (
//                             <img
//                               alt="current avatar"
//                               src={`${image}${editStaff?.profileImage}`}
//                             // style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                             />
//                           ) : (
//                             <img
//                               alt="default avatar"
//                               src="assets/img/user.jpg"
//                             // style={{ width: "100px", height: "100px", objectFit: "cover" }}
//                             />
//                           )}
//                         </div>
//                         <div className="upload-input">
//                           <input
//                             type="file"
//                             className="form-control"
//                             onChange={(event) => {
//                               setFieldValue("profileImage", event.target.files[0]);
//                               setSelectedImage(event.target.files[0]);
//                             }}
//                           />
//                         </div>
//                       </div>
//                       <ErrorMessage
//                         name="profileImage"
//                         component="div"
//                         style={{ color: "red" }}
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="">
//                   <button type="submit" className="submit-btn" disabled={isSubmitting}>
//                     {isSubmitting ? "Updating..." : "Submit"}
//                   </button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import { image, baseurl } from "../../Basurl/Baseurl";
import { GetAllStaffUser } from "../../reducer/StaffSlice";

export default function EditStaff() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { staff } = useSelector((state) => state.staff);
  const [editStaff, setEditStaff] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    dispatch(GetAllStaffUser());
  }, [dispatch]);
  useEffect(() => {
    if (location.state?.staffID && staff.length > 0) {
      const selected = staff.find((item) => item._id === location.state.staffID);
      setEditStaff(selected);
    }
  }, [location.state?.staffID, staff]);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    role: Yup.string()
      .oneOf(["Admin", "Manager", "Staff","Finance","Coordinator", "Receptionist"], "Invalid role")
      .required("Role is required"),
    phone_no: Yup.string()
      .matches(/^[0-9]{10,11}$/, "Invalid phone number")
      .required(),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Others"])
      .required("Gender is required"),
    profileImage: Yup.mixed().required("Profile image is required"),
  });
  if (!editStaff) return <div>Loading...</div>;
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone_no", values.phone_no);
      formData.append("role", values.role);
      formData.append("gender", values.gender);
      if (values.profileImage instanceof File) {
        formData.append("profileImage", values.profileImage);
      }
      const response = await axios.put(`${baseurl}update_details/${editStaff._id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      Swal.fire("Success!", "Staff updated successfully", "success");
      navigate("/Admin/staff");
    } catch (error) {
      Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">
              <span><i className="fi fi-sr-angle-double-small-left"></i></span>Edit Staff
            </h4>
          </div>
        </div>
        <div className="main_content">
          <Formik
            enableReinitialize
            initialValues={{
              email: editStaff.email || "",
              role: editStaff.role || "",
              gender: editStaff.gender || "",
              phone_no: editStaff.phone_no || "",
              name: editStaff.name || "",
              profileImage: editStaff.profileImage || null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ setFieldValue, isSubmitting, values }) => (
              <Form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>Name<span className="text-danger">*</span></label>
                      <Field className="form-control" type="text" name="name" />
                      <ErrorMessage name="name" component="div" style={{ color: "red" }} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>Email<span className="text-danger">*</span></label>
                      <Field className="form-control" type="email" name="email" />
                      <ErrorMessage name="email" component="div" style={{ color: "red" }} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>Phone No<span className="text-danger">*</span></label>
                      <Field className="form-control" type="text" name="phone_no" />
                      <ErrorMessage name="phone_no" component="div" style={{ color: "red" }} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>Role<span className="text-danger">*</span></label>
                      <Field as="select" name="role" className="form-control">
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                          <option value="Receptionist">Receptionist</option>
                          <option value="Finance">Finance</option>
                          <option value="Coordinator">Coordinator</option>
                      </Field>
                      <ErrorMessage name="role" component="div" style={{ color: "red" }} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="field-set gender-select">
                      <label className="gen-label">Gender<span className="text-danger">*</span></label>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <Field type="radio" name="gender" value="Male" className="form-check-input" />
                          Male
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <Field type="radio" name="gender" value="Female" className="form-check-input" />
                          Female
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <Field type="radio" name="gender" value="Others" className="form-check-input" />
                          Others
                        </label>
                      </div>
                      <ErrorMessage name="gender" component="div" style={{ color: "red" }} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="field-set">
                      <label>Profile Image<span className="text-danger">*</span></label>
                      <div className="profile-upload">
                        <div className="upload-img">
                          {selectedImage ? (
                            <img alt="preview" src={URL.createObjectURL(selectedImage)} />
                          ) : editStaff?.profileImage ? (
                            <img alt="current avatar" src={`${image}${editStaff?.profileImage}`} />
                          ) : (
                            <img alt="default avatar" src="assets/img/user.jpg" />
                          )}
                        </div>
                        <div className="upload-input">
                          <input
                            type="file"
                            className="form-control"
                            onChange={(event) => {
                              setFieldValue("profileImage", event.target.files[0]);
                              setSelectedImage(event.target.files[0]);
                            }}
                          />
                        </div>
                      </div>
                      <ErrorMessage name="profileImage" component="div" style={{ color: "red" }} />
                    </div>
                  </div>
                </div>
                <div className="">
                  <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
