import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { baseu11, baseurl, image, imageUrl } from "../../Basurl/Baseurl";
import avtar from "../../img/avtarImg.jpg"
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
  const [row, setRows] = useState("");
  console.log(location.state);
  const fetchJobTitles =async () => {
    const payload ={
       id:location.state.id,
type:"AirAmbulance"
    }
   await axios
      .post(`https://yellowcabsanfrancisco.com/omca/api/crm/other_enquiry_details`,payload)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setRows(response.data.data)
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
            <div className="row?">
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
                        value={row?.enquiryId}
                        readonly=""
                      />
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
                      <label>Phone Number
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
  <br></br>

                    <h4 className="page-title font-bold">Travel Details </h4>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>From<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.from}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label> To<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.to}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Travel Date<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.select_date}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Arrival Time<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.arrival_time}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Number of Traveller<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.travellers_count}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Services<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.services}
                        readonly=""
                      />
                    </div>
                  </div>
                  <br></br>

                  
                <h4 className="page-title font-bold">Emergency Assessment</h4>

                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Consciousness Status<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.consciousness_status}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Breathing Difficulty<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.breathing_difficulty}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Level of Urgency<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.level_of_urgency}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Bleeding or Trauma Details<span className="text-danger">*</span></label>
                      <input
                        class="form-control"
                        type="email"
                        value={row.bleeding_or_trauma_details}
                        readonly=""
                      />
                    </div>
                  </div>
                
                 <br></br>
                    <h4 className="page-title font-bold">Destination Details</h4>
                
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Destination Address<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.destination_address}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Hospital Name<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.hospital_name}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Department or Ward<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.department_or_ward}
                        readonly=""
                      />
                    </div>
                  </div>
                 <br></br>
                    <h4 className="page-title font-bold">Medical Information</h4>
                
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Reason For Ambulance Request / Chief Complaint<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.reason_for_ambulance_request}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Patient Condition<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.patient_condition}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Ambulance Type<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.ambulance_type}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Special Needs<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.special_needs}
                        readonly=""
                      />
                    </div>
                  </div>
                  <br></br>
                    <h4 className="page-title font-bold">Attendant / Contact Person</h4>
                
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Name of Caller / Attendant<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.reason_for_ambulance_request}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Relation to Patient<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.relationship_to_patient}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Alternate Contact Number <span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.alternate_contact_number}
                        readonly=""
                      />
                    </div>
                  </div>
                  <br></br>
                    <h4 className="page-title font-bold">Payment & Authorization </h4>
                
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Payment Method<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.payment_method}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Insurance Details<span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.insurance_details}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>Approval / Reference Number <span className="text-danger"></span></label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.reference_number}
                        readonly=""
                      />
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