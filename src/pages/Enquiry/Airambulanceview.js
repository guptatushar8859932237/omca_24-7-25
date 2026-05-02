import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { AdminBaseUrl, baseu11, baseurl, image, imageUrl } from "../../Basurl/Baseurl";
import avtar from "../../img/avtarImg.jpg";
import Swal from "sweetalert2";
import { Box, Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";
const getFileType = (file) => {
  const ext = file.split(".").pop().toLowerCase();
  if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "image";
  return "other";
};
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

export default function Airambulanceview() {
  const location = useLocation();
  const [openCommentModal, setOpenCommentModal] = useState(false);
const [commentText, setCommentText] = useState("");
const [commentImages, setCommentImages] = useState([]);
  const [row, setRows] = useState("");
  console.log(location.state);
  const fetchJobTitles = async () => {
    const payload = {
      id: location.state.id,
      type: "AirAmbulance",
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
  console.log(row)
  if (!commentText) {
    return Swal.fire("Error", "Comment is required", "warning");
  }
  try {
    const formData = new FormData();
    formData.append("review_id", row?.doctor_review?.id);
    formData.append("comment", commentText);
    formData.append("user_type",userType );
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
                View Air Medical Escort Enquiry
              </h4>
            </div>
          </div>
          <div class="main_content">
              <div class="row">
                <div class="col-md-3">
                  <div className="field-set">
                    <label>
                      Enquiry Id<span className="text-danger"></span>
                    </label>
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
                    <label>
                      Patient Name<span className="text-danger"></span>
                    </label>
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
                    <label>
                      Email<span className="text-danger"></span>
                    </label>
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
                      Passport Number<span className="text-danger"></span>
                    </label>
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
                    <label>
                      Treating In Country<span className="text-danger"></span>
                    </label>
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
                <h6>Travel Details</h6>
                <span className="line"></span>
              </div>
              <div class="row">
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      From<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.from}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      To<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.to}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Travel Date<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.select_date}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Arrival Time<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.arrival_time}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Number of Traveller<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.travellers_count}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Services<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.services}
                      readonly=""
                    />
                  </div>
                </div>
              </div>
              <div className="treat-hd">
                <h6>Emergency Assessment</h6>
                <span className="line"></span>
              </div>
              <div class="row">
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Consciousness Status<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.consciousness_status}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Breathing Difficulty<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.breathing_difficulty}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Level of Urgency<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.level_of_urgency}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Bleeding or Trauma Details
                      <span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="email"
                      value={row.bleeding_or_trauma_details}
                      readonly=""
                    />
                  </div>
                </div>
              </div>
              <div className="treat-hd">
                <h6>Destination Details</h6>
                <span className="line"></span>
              </div>
              <div class="row">
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Destination Address<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.destination_address}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Hospital Name<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.hospital_name}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Department or Ward<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.department_or_ward}
                      readonly=""
                    />
                  </div>
                </div>
              </div>
              <div className="treat-hd">
                <h6>Medical Information</h6>
                <span className="line"></span>
              </div>
              <div class="row">
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Reason For Ambulance Request / Chief Complaint
                      <span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.reason_for_ambulance_request}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Patient Condition<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.patient_condition}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Ambulance Type<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.ambulance_type}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Special Needs<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.special_needs}
                      readonly=""
                    />
                  </div>
                </div>
              </div>
              <div className="treat-hd">
                <h6>Attendant / Contact Person</h6>
                <span className="line"></span>
              </div>
              <div class="row">
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Name of Caller / Attendant
                      <span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.reason_for_ambulance_request}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Relation to Patient<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.relationship_to_patient}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Alternate Contact Number{" "}
                      <span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.alternate_contact_number}
                      readonly=""
                    />
                  </div>
                </div>
              </div>
              <div className="treat-hd">
                <h6>Payment & Authorization</h6>
                <span className="line"></span>
              </div>
              <div class="row">
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Payment Method<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.payment_method}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Insurance Details<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.insurance_details}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Approval / Reference Number{" "}
                      <span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row.reference_number}
                      readonly=""
                    />
                  </div>
                </div>
              </div>
              <div className="treat-hd">
                <h6>Doctor Review</h6>
                <span className="line"></span>
              </div>
              <div class="row">
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Review Notes<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row?.doctor_review?.review_notes}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-set">
                    <label>
                      Recommendations<span className="text-danger"></span>
                    </label>
                    <input
                      class="form-control"
                      type="text"
                      value={row?.doctor_review?.recommendations}
                      readonly=""
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div>
                    <label>
                      Images<span className="text-danger"></span>
                    </label>
                    <br />
                    {Array.isArray(row?.doctor_review?.images) &&
                    row?.doctor_review?.images.length > 0
                      ? row.doctor_review.images.map((rep, index) => (
                          <button
                            key={index}
                            type="button"
                            className="viewbtn"
                            onClick={() => window.open(rep, "_blank")}
                          >
                            View
                          </button>
                        ))
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="treat-hd d-flex justify-content-between">
                <div>

                <h6>Comment</h6>
                <span className="line"></span>
                </div>
                <div>
                    <button className="add-button" onClick={addcomment}>Add Comment</button>
                </div>
              </div>
             <div className="row">
  {row?.doctor_review?.comments?.length > 0 ? (
    row?.doctor_review?.comments?.map((item, index) => (
      <div
        key={item.id || index}
        className="col-12 mb-3 p-3"
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          background: "#f9f9f9",
        }}
      >
        {/* User Type */}
        {/* <h6 style={{ marginBottom: "5px", color: "#555" }}>
          {item?.user_type}
        </h6> */}

        {/* Comment */}
        <div className="row d-flex">
         
        <p style={{ marginBottom: "10px" }}>
          {item?.comment}
        </p>

        {/* Images */}
       <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
  {Array.isArray(item?.images) &&
    item.images.map((rep, index) => (
      <button
        key={index}
        type="button"
        className="viewbtn"
        onClick={() => window.open(rep, "_blank")}
      >
        View
      </button>
    ))}
</div>
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
              <div>
                {Array.isArray(row?.reports) && row.reports.length > 0
                  ? row.reports.map((rep, index) =>
                      rep?.report ? (
                        <button
                          key={index}
                          type="button"
                          className="viewbtn"
                          onClick={() => window.open(rep.report, "_blank")}
                        >
                          View
                        </button>
                      ) : null,
                    )
                  : "-"}
              </div>
          </div>
        </div>
       <React.Fragment>
  <Dialog
  fullWidth={true}
  maxWidth="sm"
  open={openCommentModal}   // ✅ FIXED
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

        {/* Image Upload */}
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
</React.Fragment>
      </div>
    </>
  );
}
