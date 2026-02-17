import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseurl, image, imageUrl } from "../../Basurl/Baseurl";
import avtar from "../../img/avtarImg.jpg"
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
  return (
    <>
      <div>
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
                  View Enquiry
                </h4>
              </div>
            </div>
            <div class="main_content">
              <form>
                <div class="row">
                  <div class="col-md-4">
                    <div className="field-set">
                      <label>Enquiry Id<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.enquiryId}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div className="field-set">
                      <label>Passport Number<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.passport_num}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Phone No / WhatsApp With Country Code
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
                          value={row.emergency_contact_no}
                          readonly=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Emergency Contact Number<span className="text-danger"></span></label>
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
                          value={row.patient_emergency_contact_no}
                          readonly=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Patient Name<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.name}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Gender<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.gender}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Age<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.age}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Enq status<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.enq_status}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
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
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Country<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="email"
                        value={row.country}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Town<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.town}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Address<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.address}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Patient ID proof<span className="text-danger"></span></label>
                     <div className="engpatimg">
  {Array.isArray(row.patient_id_proof) && row.patient_id_proof.length > 0 ? (
    row.patient_id_proof.map((file, index) => (
      <div key={index} className="doc-box">
        <FilePreview file={file} />
      </div>
    ))
  ) : (
    <img src={avtar} alt="No Document" />
  )}
</div>

                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Patient Profile<span className="text-danger"></span></label>
                      <div className="engpatimg">
                        <img
                          src={row.patient_Profile ? `${imageUrl}${row.patient_Profile}` : `${avtar}`}
                          alt="No Document"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${avtar}`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Referral Name<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.Referral_Name}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Treatment Name<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.disease_name}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Treating In Country<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.treatingIn}
                        readonly=""
                      />
                    </div>
                  </div>
                </div>
                <div className="treat-hd">
                  {
                    row.patient_relation ?
                      <h6>Attendant Details</h6>
                      : ""}
                  <span className="line"></span>
                </div>
                {
                  row.patient_relation ?
                    <div className="row">
                      <div className="col-md-4">
                        <div className="field-set">
                          <label>Attendant Full Name<span className="text-danger"></span></label>
                          <input
                            class="form-control"
                            type="text"
                            value={row.patient_relation_name}
                            readonly=""
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="field-set">
                          <label>Relationship with Patient<span className="text-danger"></span></label>
                          <input
                            class="form-control"
                            type="text"
                            value={row.patient_relation}
                            readonly=""
                          />
                        </div>
                      </div>
                            <div className="col-md-4">
                    <div className="field-set">
                      <label>Attendant Contact Number
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
                          value={row.patient_relation_no}
                          readonly=""
                        />
                      </div>
                    </div>
                  </div>
                      {/* <div className="col-md-4">
                        <div className="field-set">
                          <label>Attendant Contact Number<span className="text-danger"></span></label>
                          {/* <input
                            class="form-control"
                            type="text"
                            value={row.patient_relation_no}
                            readonly=""
                          /> */}
                          
                        {/* </div> */}
                      {/* // </div>  */}
                      <div className="col-md-4">
                        <div className="field-set">
                          <label>Attendant ID Proof<span className="text-danger"></span></label>
                       <div className="engpatimg">
  {Array.isArray(row.patient_relation_id) && row.patient_relation_id.length > 0 ? (
    row.patient_relation_id.map((file, index) => (
      <div key={index} className="doc-box">
        <FilePreview file={file} />
      </div>
    ))
  ) : (
    <img src={avtar} alt="No Document" />
  )}
</div>

                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="field-set">
                          <label>Attendant Address<span className="text-danger"></span></label>
                          <input
                            class="form-control"
                            type="text"
                            value={row.patient_relation_address}
                            readonly=""
                          />
                        </div>
                      </div>
                    </div> : ""
                }
                {
                  row.discussionNotes?.length === 0 ? ("") : (
                    <>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="treat-hd">
                            <h6>Discussion Notes</h6>
                            <span className="line"></span>
                          </div>
                          <div className="tab-pane" id="bottom-tab3">
                            {row.discussionNotes?.length === 0 ? (
                              "No notes for patient"
                            ) : (
                              <>
                                {row.discussionNotes?.map((info, index) => (
                                  <div className="card-box">
                                    <div className="note-view">
                                      <h3 className="card-title">Note-{index + 1}</h3>
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
                                              <div>date-{new Date(info.date).toLocaleDateString("en-GB")}</div>
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
                      </div>
                    </>
                  )
                }

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}