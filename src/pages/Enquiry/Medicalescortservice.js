import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AdminBaseUrl, baseu11, baseurl, image, imageUrl } from "../../Basurl/Baseurl";
import avtar from "../../img/avtarImg.jpg";
import { Box, Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import Swal from "sweetalert2";
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
      View
    </button>
  );
};

export default function Medicalescortservice() {
  const location = useLocation();
  const [row, setRows] = useState("");
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentImages, setCommentImages] = useState([]);
  console.log(location.state);
  const fetchJobTitles = async () => {
    const payload = {
      id: location.state.id,
      type: "PatientQuery",
    };
    await axios
      .post(
        `https://omcacrm.com/omca/api/crm/other_enquiry_details`,
        payload,
      )
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
        formData
      );

      if (res?.data?.success) {
        Swal.fire("Success", "Comment added", "success");
        closeCommentModal();
        fetchJobTitles(); // refresh data
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error"
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
                  <i class="fa-solid fa-arrow-left-long me-2"
                    onClick={handleclick}></i>
                  View Treatment Estimate
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
                      <h6>Treatment</h6>
                      <p>{row?.treatment}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Country</h6>
                      <p>{row.country}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Name</h6>
                      <p>{row.name}</p>
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
                      <h6>Phone Number</h6>
                      <p>{row.phoneCode}{row.phone}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>WhatsApp Number</h6>
                      <p>{row.phoneCode}{row?.whatsapp}</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Description</h6>
                      <p>{row.message}</p>
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
            {
              row?.doctor_review?.review_notes ?

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
                          <h6>Reports</h6>
                          <p>
                            {Array.isArray(row?.doctor_review?.images) && row.doctor_review.images.length > 0 ? (
                              row.doctor_review.images.map((img, i) => (
                                <button
                                  key={i}
                                  className="viewbtn"
                                  onClick={() => window.open(img, "_blank")}
                                >
                                  View
                                </button>
                              ))
                            ) : row?.doctor_review.images ? (
                              <button
                                className="viewbtn"
                                onClick={() => window.open(row.doctor_review.images, "_blank")}
                              >
                                View
                              </button>
                            ) : null}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-12 gy-0">
                        <div className="docre-hd">
                          <div className="comnthis">
                            <h6 className="mb-0">Comments</h6>
                          </div>
                          <button className="add-button" type="button" onClick={addcomment}>
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
                                              {Array.isArray(item?.images) ? (
                                                item.images.map((img, i) => (
                                                  <button
                                                    key={i}
                                                    className="viewbtn"
                                                    onClick={() => window.open(img, "_blank")}
                                                  >
                                                    View
                                                  </button>
                                                ))
                                              ) : item?.images ? (
                                                <button
                                                  className="viewbtn"
                                                  onClick={() => window.open(item.images, "_blank")}
                                                >
                                                  View
                                                </button>
                                              ) : null}
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
                </div> : ""
            }
            <div className="col-md-12">
              <div className="main_content">
                <div className="row gx-3 gy-3">
                  <div className="col-md-12">
                    <div className="comnthis">
                      <h6>Reports</h6>
                    </div>
                  </div>
                  <div className="col-md-4">
                    {Array.isArray(row?.reports) && row.reports.length > 0 ? (
                      row.reports.map((rep, index) =>
                        rep?.report ? (
                          <button
                            key={index}
                            type="button"
                            className="viewbtn"
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
        <Dialog
          fullWidth
          maxWidth="sm"
          open={openCommentModal}
          onClose={closeCommentModal}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Add Comment</h6>
            </div>
            <div className="cross-icon" onClick={closeCommentModal}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <DialogContent className="main-box">
            <Box component="form">
              <div className="row gx-3">
                <div className="col-md-12">
                  <div className="field-set">
                    <label>Comment<span className="text-danger">*</span></label>
                    <textarea
                      className="form-control"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="field-set">
                    <label>Upload Images<span className="text-danger">*</span></label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
              <DialogActions className="submit-main">
                <Button variant="contained" onClick={handleSubmitComment}>
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
