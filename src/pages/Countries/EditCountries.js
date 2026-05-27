import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl } from "../../Basurl/Baseurl";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
export default function EditCountries() {
  const [inpdataa, setInpdataa] = useState({
    countryName: "",
    countryCode: "",
    phoneCode: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { countryId } = location.state || {};
  const { Countries } = useSelector((state) => state.Countries);
  useEffect(() => {
    if (Countries?.length > 0 && countryId) {
      const selectedCountry = Countries.find((item) => item._id === countryId);
      if (selectedCountry) {
        setInpdataa(selectedCountry);
      }
    }
  }, [Countries, countryId]);
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInpdataa((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      const data = {
        countryName: inpdataa.name,
        countryCode: inpdataa.code,
        phoneCode: inpdataa.dial_code,
      };
      const response = await axios.put(
        `${baseurl}editCountry/${inpdataa._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200) {
        console.log("Country updated successfully");
        toast.success("Country updated successfully");
        navigate("/Admin/Countries");
      } else {
        console.error("Error updating country:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating country:", error);
    }
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row gx-3">
            <div className="col-md-12">
              <div className="topmainhd">
                <h6>
                  <i
                    class="fa-solid fa-arrow-left-long me-2"
                    onClick={() => window.history.back()}
                  ></i>
                  Edit Countries
                </h6>
              </div>
            </div>
            <div className="col-md-12">
              <div className="main_content">
                <form onSubmit={handleSubmit}>
                  <div className="row gx-3 gy-3">
                    <div className="col-md-4">
                      <div className="set-field">
                        <label>
                          Country Name<span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          name="name"
                          type="text"
                          onChange={handlechange}
                          value={inpdataa.name || ""}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="set-field">
                        <label>
                          Code<span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          name="code"
                          type="text"
                          onChange={handlechange}
                          value={inpdataa.code || ""}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="set-field">
                        <label>
                          Phone Code<span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          name="dial_code"
                          type="text"
                          onChange={handlechange}
                          value={inpdataa.dial_code || ""}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <button type="submit" className="submit-btn">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
