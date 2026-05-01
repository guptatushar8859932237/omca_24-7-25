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
      <div class="page-wrapper">
        <div class="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">
                <span>
                  <i
                    class="fi fi-sr-angle-double-small-left"
                    onClick={handleclick}
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
                View Treatment Estimate
              </h4>
            </div>
          </div>
          <div class="main_content">
           
              <div className="row">
                <div className="col-md-3">
                  <div className="field-set">
                    <label>Enquiry Id<span className="text-danger"></span></label>
                    <input
                      class="form-control"
                      type="text"
                      value={row?.enquiryId}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>Treatment<span className="text-danger"></span></label>
                    <input
                      class="form-control"
                      type="text"
                      value={row?.treatment}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>Country<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.country}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>Name<span className="text-danger"></span></label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.name}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>Email<span className="text-danger"></span></label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.email}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Phone Number
                      <span className="text-danger"></span>
                    </label>
                    <div className="country-code">
                      <input
                        class="form-control code-dial"
                        type="text"
                        value={row.phoneCode}
                        readonly=""
                      />
                      <input
                        class="form-control code-in"
                        type="text"
                        value={row.phone}
                        readonly=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>WhatsApp Number
                      <span className="text-danger"></span>
                    </label>
                    <div className="country-code">
                      <input
                        class="form-control code-dial"
                        type="text"
                        value={row.phoneCode}
                        readonly=""
                      />
                      <input
                        class="form-control code-in"
                        type="text"
                        value={row?.whatsapp}
                        readonly=""
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>Description<span className="text-danger"></span></label>
                    <input
                      class="form-control"
                      type="email"
                      value={row.message}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>Passport Number<span className="text-danger"></span></label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.passport_number}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>Treating In Country<span className="text-danger"></span></label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.treating_in_country}
                      readonly=""
                    />
                  </div>
                </div>
              </div>
              <div className="treat-hd">
  <h6>Doctor Review</h6>
  <span className="line"></span>
</div>

<div className="row">
  <div className="col-md-3">
    <label>Review Notes</label>
    <input
      className="form-control"
      value={row?.doctor_review?.review_notes || "-"}
      readOnly
    />
  </div>

  <div className="col-md-3">
    <label>Recommendations</label>
    <input
      className="form-control"
      value={row?.doctor_review?.recommendations || "-"}
      readOnly
    />
  </div>
</div><div className="treat-hd d-flex justify-content-between">
  <div>
    <h6>Comments</h6>
    <span className="line"></span>
  </div>

  <button className="add-button" onClick={addcomment}>
    Add Comment
  </button>
</div>

<div className="row">
  {row?.doctor_review?.comments?.length > 0 ? (
    row.doctor_review.comments.map((item, index) => (
      <div key={index} className="col-12 mb-3 p-3"
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          background: "#f9f9f9",
        }}
      >
        <p>{item.comment}</p>

        <div style={{ display: "flex", gap: "10px" }}>
          {item?.images?.map((img, i) => (
            <button
              key={i}
              className="viewbtn"
              onClick={() => window.open(img, "_blank")}
            >
              View
            </button>
          ))}
        </div>
      </div>
    ))
  ) : (
    <p>No comments available</p>
  )}
</div>
              <div className="treat-hd">
                <h6>Reports</h6>
                <span className="line"></span>
              </div>
              <div className="d-flex gap-2">
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
    <Box component="form">
      <div className="field-set">
        <label>Comment *</label>
        <textarea
          className="form-control"
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

      <DialogActions>
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
