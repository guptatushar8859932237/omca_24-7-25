import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseurl } from '../../Basurl/Baseurl';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
export default function EditCountries() {
  const [inpdataa, setInpdataa] = useState({
    countryName: '',
    countryCode: '',
    phoneCode:''
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
        phoneCode: inpdataa.dial_code
      };
      const response = await axios.put(
        `${baseurl}editCountry/${inpdataa._id}`,
        data,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Country updated successfully");
        toast.success("Country updated successfully");
        navigate('/Admin/Countries');
      } else {
        console.error("Error updating country:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating country:", error);
    }
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h4 className="page-title"><span><i class="fi fi-sr-angle-double-small-left" style={{cursor:"pointer"}} onClick={()=>{
              window.history.back()
            }}></i></span>Edit Countries</h4>
          </div>
        </div>
        <div className="main_content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-sm-6">
                <div className="field-set">
                  <label>Country Name<span className="text-danger">*</span></label>
                  <input
                    className="form-control"
                    name="name"
                    type="text"
                    onChange={handlechange}
                    value={inpdataa.name || ''}
                    required
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="field-set">
                  <label>Code<span className="text-danger">*</span></label>
                  <input
                    className="form-control"
                    name="code"
                    type="text"
                    onChange={handlechange}
                    value={inpdataa.code || ''}
                    required
                  />
                </div>
              </div>
              {/* <div className="col-sm-6">
                <div className="field-set">
                  <label>Capital<span className="text-danger">*</span></label>
                  <input
                    className="form-control"
                    name="countryCapital"
                    type="text"
                    onChange={handlechange}
                    value={inpdataa.countryCapital || ''}
                    required
                  />
                </div>
              </div> */}
              {/* <div className="col-sm-6">
                <div className="field-set">
                  <label>Currency<span className="text-danger">*</span></label>
                  <input
                    className="form-control"
                    name="countryCurrency"
                    type="text"
                    onChange={handlechange}
                    value={inpdataa.countryCurrency || ''}
                    required
                  />
                </div>
              </div> */}
              <div className="col-sm-6">
                <div className="field-set">
                  <label>Phone Code<span className="text-danger">*</span></label>
                  <input
                    className="form-control"
                    name="dial_code"
                    type="text"
                    onChange={handlechange}
                    value={inpdataa.dial_code || ''}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="">
              <button type="submit" className="submit-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}