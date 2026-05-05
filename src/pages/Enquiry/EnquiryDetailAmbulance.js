import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import {
  AdminBaseUrl,
  baseu11,
  baseurl,
  image,
  imageUrl,
} from "../../Basurl/Baseurl";
import avtar from "../../img/avtarImg.jpg";
// 🔹 file type check
const getFileType = (file) => {
  const ext = file.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "image";
  return "other";
};

// 🔹 reusable preview component
const FilePreview = ({ file }) => {
  const fileUrl = `${imageUrl}${file}`;
  const type = getFileType(file);

  if (type === "image") {
    return (
      <img
        src={fileUrl}
        alt="Document"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = avtar;
        }}
      />
    );
  }

  return (
    <button
      type="button"
      className="btn btn-outline-primary btn-sm"
      onClick={() => window.open(fileUrl, "_blank")}
    >
      View Document
    </button>
  );
};

export default function EnquiryDetailAmbulance() {
  const location = useLocation();
  const [row, setRows] = useState("");
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentImages, setCommentImages] = useState([]);
  console.log(location.state);
  const fetchJobTitles = async () => {
    const payload = {
      id: location.state.id,
      type: "AmbulanceRequest",
    };
    await axios
      .post(`https://omcacrm.com/omca/api/crm/other_enquiry_details`, payload)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setRows(response.data.data);
        } else {
          console.error("Failed to fetch job titles:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };
  useEffect(() => {
    fetchJobTitles();
  }, []);
  const handleclick = () => {
    window.history.back();
  };

  const addcomment = () => {
    setOpenCommentModal(true);
  };
  const closeCommentModal = () => {
    setOpenCommentModal(false);
    setCommentText("");
    setCommentImages([]);
  };
  const handleImageChange = (e) => {
    setCommentImages([...e.target.files]);
  };
  const userType = localStorage.getItem("Role");
  const handleSubmitComment = async () => {
    if (!commentText) {
      return Swal.fire("Error", "Comment is required", "warning");
    }
    try {
      const formData = new FormData();
      formData.append("review_id", row?.doctor_review?.id);
      formData.append("comment", commentText);
      formData.append("user_type", userType);
      commentImages.forEach((file) => {
        formData.append("images[]", file);
      });
      const res = await axios.post(
        `${AdminBaseUrl}review/comment/add`,
        formData,
      );
      if (res?.data?.success) {
        Swal.fire("Success", "Comment added", "success");
        closeCommentModal();
        fetchJobTitles(); // refresh
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row gx-3 gy-3">
            <div className="col-md-12">
              <div className="topmainhd">
                <h6>
                  <i
                    class="fa-solid fa-arrow-left-long me-2"
                    onClick={handleclick}
                  ></i>
                  View Ambulance Service Enquiry
                </h6>
              </div>
            </div>
            <div className="col-md-12 gy-0">
              <div className="main_content">
                <div className="row gx-3 gy-3">
                  <div className="col-md-4">
                    <div className="">
                      <h6>Enquiry Id</h6>
                      <p>{row?.enquiryId}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Patient Name</h6>
                      <p>{row.name}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Phone Number</h6>
                      <p>
                        {row.phoneCode}
                        {row.phone}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Email</h6>
                      <p>{row.email}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Passport Number</h6>
                      <p>{row.passport_number}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Treating In Country</h6>
                      <p>{row.treating_in_country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <div className="row gx-3 gy-3">
                  <div className="col-md-12">
                    <div className="comnthis">
                      <h6>Emergency Assessment</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Consciousness Status</h6>
                      <p>{row.consciousness_status}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Breathing Difficulty</h6>
                      <p>{row.breathing_difficulty}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Level of Urgency</h6>
                      <p>{row.level_of_urgency}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Bleeding or Trauma Details</h6>
                      <p>{row.bleeding_or_trauma_details}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <div className="row gx-3 gy-3">
                  <div className="col-md-12">
                    <div className="comnthis">
                      <h6>Pickup Details</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Pickup Address</h6>
                      <p>{row.pickup_address}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Pickup Location Type</h6>
                      <p>{row.pickup_location_type}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Pickup Date</h6>
                      <p>{row.pickup_date}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Pickup Time</h6>
                      <p>{row.pickup_time}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>GPS / Location Pin</h6>
                      <p>{row.location_pin}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <div className="row gx-3 gy-3">
                  <div className="col-md-12">
                    <div className="comnthis">
                      <h6>Destination Details</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Destination Address</h6>
                      <p>{row.destination_address}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Hospital Name</h6>
                      <p>{row.hospital_name}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Department or Ward</h6>
                      <p>{row.department_or_ward}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <div className="row gx-3 gy-3">
                  <div className="col-md-12">
                    <div className="comnthis">
                      <h6>Medical Information</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Reason For Ambulance Request / Chief Complaint</h6>
                      <p>{row.reason_for_ambulance_request}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Patient Condition</h6>
                      <p>{row.patient_condition}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Ambulance Type</h6>
                      <p>{row.ambulance_type}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Special Needs</h6>
                      <p>{row.special_needs}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <div className="row gx-3 gy-3">
                  <div className="col-md-12">
                    <div className="comnthis">
                      <h6>Attendant / Contact Person</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Name of Caller / Attendant</h6>
                      <p>{row.reason_for_ambulance_request}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Relation to Patient</h6>
                      <p>{row.relationship_to_patient}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Alternate Contact Number</h6>
                      <p>{row.alternate_contact_number}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <div className="row gx-3 gy-3">
                  <div className="col-md-12">
                    <div className="comnthis">
                      <h6>Payment & Authorization</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Payment Method</h6>
                      <p>{row.payment_method}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Insurance Details</h6>
                      <p>{row.insurance_details}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Approval / Reference Number</h6>
                      <p>{row.reference_number}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <div className="row gx-3 gy-3">
                  <div className="col-md-12">
                    <div className="comnthis">
                      <h6>Additional Notes</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Special Instructions</h6>
                      <p>{row.special_instructions}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Language Preference</h6>
                      <p>{row.language_preference}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Doctor Reference</h6>
                      <p>{row.doctor_reference}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <div className="row gx-3 gy-3">
                  <div className="col-md-12">
                    <div className="comnthis">
                      <h6>Doctor Review</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Review Notes</h6>
                      <p>{row?.doctor_review?.review_notes || "-"}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Recommendations</h6>
                      <p>{row?.doctor_review?.recommendations || "-"}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Images</h6>
                      <p>
                        {row?.doctor_review?.images?.length > 0
                          ? row?.doctor_review?.images?.map((img, i) => (
                            <button
                              key={i}
                              className="viewbtn"
                              onClick={() => window.open(img, "_blank")}
                            >
                              View
                            </button>
                          ))
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="docre-hd">
                      <div className="comnthis">
                        <h6 className="mb-0">Comments</h6>
                      </div>
                      <button
                        className="add-button"
                        type="button"
                        onClick={addcomment}
                      >
                        Add Comment
                      </button>
                    </div>
                    <div className="row gx-3 gy-3">
                      {row?.doctor_review?.comments?.length > 0 ? (
                        row.doctor_review.comments.map((item, index) => (
                          <div key={index} className="col-md-12">
                            <div className="card customstylecard">
                              <div className="card-body">
                                <div className="experience-box">
                                  <ul className="experience-list">
                                    <li className="mb-0">
                                      <div className="experience-user">
                                        <div className="before-circle"></div>
                                      </div>
                                      <div className="experience-content">
                                        <div className="timeline-content">
                                          <a href="#/" className="name">
                                            {item.comment}
                                          </a>
                                          {Array.isArray(item?.images) && item.images.length > 0 ? (
                                            item.images.map((img, i) => (
                                              <button
                                                key={i}
                                                type="button"
                                                className="viewbtn"
                                                onClick={() => window.open(img, "_blank")}
                                              >
                                                View
                                              </button>
                                            ))
                                          ) : item?.images ? (
                                            <button
                                              type="button"
                                              className="viewbtn"
                                              onClick={() =>
                                                window.open(item.images, "_blank")
                                              }
                                            >
                                              View
                                            </button>
                                          ) : null
                                          }
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No comments available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <div className="row gx-3 gy-0">
                  <div className="col-md-12">
                    <div className="comnthis">
                      <h6>Reports</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      {row?.reports?.length > 0 ? (
                        row.reports.map((rep, index) =>
                          rep?.report ? (
                            <button
                              key={index}
                              type="button"
                              className=" viewbtn"
                              onClick={() => window.open(rep.report, "_blank")}
                            >
                              View
                            </button>
                          ) : null
                        )
                      ) : (
                        "-"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openCommentModal}
          onClose={closeCommentModal}
        >
          <div className="main-card-header">
            <h6>Add Comment</h6>
            <div className="cross-icon" onClick={closeCommentModal}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <DialogContent className="main-box">
            <Box
              noValidate
              component="form"
              className="contact-form"
            >
              <div className="field-set">
                <label>
                  Comment<span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  placeholder="Enter comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </div>
              <div className="field-set">
                <label>Upload Images</label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={handleImageChange}
                />
              </div> 
              <DialogActions className="submit-main">
                <Button
                  variant="contained"
                  onClick={handleSubmitComment}
                >
                  Submit
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}