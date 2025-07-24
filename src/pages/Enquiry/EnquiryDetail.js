import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseurl, image } from "../../Basurl/Baseurl";

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
          console.log(response);
          setRows(response.data.detail);
          // setJobTitles(response.data.details.map(job => job.jobTitle));
          // setLocation(countries);
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
                  <div class="col-md-6">
                    <div className="field-set">
                      <label>Enquiry Id<span className="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.enquiryId}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Patient Name<span className="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.name}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Enq status<span className="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.enq_status}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Contact Number<span className="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.emergency_contact_no}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Email<span className="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.email}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Disease Name<span className="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.disease_name}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Emergency Contact Number<span className="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.patient_emergency_contact_no}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Country<span className="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="email"
                        value={row.country}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Gender<span className="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.gender}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Patient ID<span className="text-danger">*</span></label>
                      <div className="imgid-main">
                        <img
                          src={`${image}${row.patient_relation_id}`}
                          alt="No Document"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="treat-hd">
               {
row.patient_relation ?
                 <h6>Attendant Details</h6>
:""               } 
                  <span className="line"></span>
                </div>
                {
                  row.patient_relation ?
                   <div className="row">
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Attendant Relation<span className="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.patient_relation}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Attendant Relation Name<span className="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.patient_relation_name}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field-set">
                      <label>Attendant Id<span className="text-danger">*</span></label>
                      <div className="imgid-main">
                        <img
                          src={`${image}${row.patient_id_proof}`}
                          alt="No Document" />
                      </div>
                    </div>
                  </div>
                </div> :""
                }
               
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
                                        {/* <span className="time">treatment due payment-{info.treatment_due_payment}</span> */}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
