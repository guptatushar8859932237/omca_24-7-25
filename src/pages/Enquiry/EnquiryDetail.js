import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseu11, baseurl, image, imageUrl } from "../../Basurl/Baseurl";
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
      View 
    </button>
  );
};

export default function EnquiryDetail() {
  const location = useLocation();
  const [row, setRows] = useState("");
  console.log(location.state.enquiryId);
  const fetchJobTitles = () => {
    axios
      .get(`${baseurl}get_Enq/${location.state.enquiryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.detail);
          setRows(response.data.detail);
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


  const renderComments = () => {
    const comments = row?.doctorReview?.comments || [];

    if (comments.length === 0) {
      return <p className="text-muted">No comments available</p>;
    }

    return comments.map((comment, index) => (
      <div className="col-md-12" key={comment._id || index}>
        <div className="card customstylecard">
          <div className="card-body">
            <div className="note-view">
              <h6>{comment.user_type} Note</h6>
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
                        Date -{" "}
                        {comment.Date
                          ? new Date(comment.Date).toLocaleDateString("en-GB")
                          : new Date(comment.createdAt).toLocaleDateString(
                            "en-GB",
                          )}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row gx-3 gy-3">
            <div className="col-md-12">
              <div className="topmainhd">
                <h6><i class="fa-solid fa-arrow-left-long me-2" onClick={handleclick}></i>View Enquiry</h6>
              </div>
            </div>
            <div className="col-md-12 gy-0">
              <div className="main_content">
                <div className="row gx-3 gy-3">
                  <div className="col-md-4">
                    <div className="">
                      <h6>Enquiry Id</h6>
                      <p>{row.enquiryId}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>NIC / Passport</h6>
                      <p>{row.passport_num}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Phone No. / WhatsApp</h6>
                      <p>{row.phoneCode}{row.emergency_contact_no}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Emergency Contact Number</h6>
                      <p>{row.phoneCode}{row.patient_emergency_contact_no}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Patient Name</h6>
                      <p>{row.name}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Gender</h6>
                      <p>{row.gender}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Age</h6>
                      <p>{row.age}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Enq status</h6>
                      <p>{row.enq_status}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Email</h6>
                      <p>{row.email}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Country</h6>
                      <p>{row.country}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Town</h6>
                      <p>{row.town}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Address</h6>
                      <p>{row.address}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Patient ID proof</h6>
                      <div className="engpatimg mt-0">
                        {Array.isArray(row?.patient_id_proof) &&
                          row.patient_id_proof.length > 0 &&
                          row.patient_id_proof.map((file, index) => (
                            <div key={index} className="file-preview">
                              <a href={`${image}${file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="viewbtn"
                              >
                                View
                              </a>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <h6>Patient Profile</h6>
                      <div className="engpatimg mt-0">
                        {row.patient_Profile && (
                          <div className="viewbtn">
                            <a href={`${imageUrl}${row.patient_Profile}`}>
                              View
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Referral Name</h6>
                      <p>{row.Referral_Name}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Treatment Name</h6>
                      <p>{row.disease_name}</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="">
                      <h6>Treating In Country</h6>
                      <p>{row.treatingIn}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                {row.discussionNotes?.length === 0 ? (
                  ""
                ) : (
                  <>
                    <div className="row gx-3">
                      <div className="col-md-12">
                        <div className="comnthis">
                          <h6>Notes</h6>
                        </div>
                        {row.discussionNotes?.length === 0 ? (
                          "No notes for patient"
                        ) : (
                          <>
                            {row.discussionNotes?.map((info, index) => (
                              <div className="">
                                <div className="note-view">
                                  <h6>Note-{index + 1}</h6>
                                </div>
                                <div className="experience-box">
                                  <ul className="experience-list">
                                    <li>
                                      <div className="experience-user">
                                        <div className="before-circle"></div>
                                      </div>
                                      <div className="experience-content">
                                        <div className="timeline-content">
                                          <a href="#/" className="name">
                                            {info.note}
                                          </a>
                                          <div>
                                            Date-
                                            {new Date(
                                              info.date,
                                            ).toLocaleDateString("en-GB")}
                                          </div>
                                          {/* {/ <span className="time">treatment due payment-{info.treatment_due_payment}</span>  */}
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                {row?.doctorReview?.review_notes ?
                  <div className="row gx-3">
                    <div className="col-md-12">
                      <div className="comnthis">
                        <h6>Doctor Review</h6>
                      </div>
                      <div className="row gx-3 gy-3">
                        <div className="col-md-4">
                          <div className="">
                            <h6>Review Notes</h6>
                            <p>{row?.doctorReview?.review_notes || ""}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="">
                            <h6>Recommendations</h6>
                            <p>{row?.doctorReview?.Recommendations || ""}</p>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="">
                            <h6>Documents</h6>
                            {row?.doctorReview?.images?.length > 0 ? (
                              row.doctorReview.images.map((img, index) => {
                                const fullUrl = img.startsWith("http")
                                  ? img
                                  : imageUrl + img;

                                return (
                                  <div key={index}>
                                    <button
                                      type="button"
                                      className="viewbtn"
                                      onClick={() =>
                                        window.open(fullUrl, "_blank")
                                      }
                                    >
                                      View
                                    </button>
                                  </div>
                                );
                              })
                            ) : (
                              <p>No Documents</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="comnthis">
                        <h6>Comments</h6>
                      </div>
                      <div className="row gy-3">{renderComments()}</div>
                    </div>
                  </div>
                  : ""}
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <div className="comnthis">
                  {row.patient_relation ? <h6>Attendant Details</h6> : ""}
                </div>
                {row.patient_relation ? (
                  <div className="row gx-3 gy-3">
                    <div className="col-md-4">
                      <div className="">
                        <h6>Attendant Full Name</h6>
                        <p>{row.patient_relation_name}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="">
                        <h6>Relationship with Patient</h6>
                        <p>{row.patient_relation}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="">
                        <h6>Attendant Contact Number</h6>
                        <p>{row.phoneCode}{row.patient_relation_no}</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="">
                        <h6>Attendant ID Proof</h6>
                        <div className="engpatimg">
                          {Array.isArray(row.patient_relation_id) &&
                            row.patient_relation_id.length > 0 ? (
                            row.patient_relation_id.map((file, index) => (
                              <div key={index} className="doc-box viewbtn">
                                <a href={`${image}${file}`}>View</a>
                              </div>
                            ))
                          ) : (
                            <img src={avtar} alt="No Document" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="">
                        <h6>Attendant Address</h6>
                        <p>{row.patient_relation_address}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
