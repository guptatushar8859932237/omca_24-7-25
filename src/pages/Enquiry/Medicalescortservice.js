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
      View Document
    </button>
  );
};

export default function Medicalescortservice() {
  const location = useLocation();
  const [row, setRows] = useState("");
  console.log(location.state);
  const fetchJobTitles = async () => {
    const payload = {
      id: location.state.id,
      type: "PatientQuery",
    };
    await axios
      .post(
        `https://yellowcabsanfrancisco.com/omca/api/crm/other_enquiry_details`,
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
                  <div class="col-md-4">
                    <div className="field-set">
                      <label>
                        Treatment<span className="text-danger"></span>
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        value={row?.treatment}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>
                        Country<span className="text-danger"></span>
                      </label>
                      <input
                        class="form-control"
                        type="text"
                        value={row.country}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>
                        {" "}
                        Name<span className="text-danger"></span>
                      </label>
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
                  <div className="col-md-4">
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
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>
                        {" "}
                        WhatsApp Number
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
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>
                        Description<span className="text-danger">*</span>
                      </label>
                      <input
                        class="form-control"
                        type="email"
                        value={row.message}
                        readonly=""
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="field-set">
                      <label>
                        Image <span className="text-danger">*</span>
                      </label>
                      <br></br>
                      {row?.image && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => window.open(row.image, "_blank")}
                        >
                          View Image
                        </button>
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
