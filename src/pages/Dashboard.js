import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import dashboard from "../img/dashboard-doc.png";
import { baseurl } from "../Basurl/Baseurl";
import { image } from "../Basurl/Baseurl";
import { GetUserData } from "../reducer/userSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
export default function Dashboard() {
  const [arraycount, setArraycount] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { getuser, loading, error } = useSelector((state) => state.getuser);
  useEffect(() => {
    dispatch(GetUserData());
    console.log(error, getuser);
  }, [dispatch]);
  const [count, setCount] = useState("");

  const GetDashboard = () => {
    axios
      .get(`${baseurl}Dashboard_count`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setCount(response.data);
          setArraycount(response.data.courseAssignmentCounts);
        } else {
          console.error("Failed to fetch job titles:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };
  useEffect(() => {
    GetDashboard();
  }, []);
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="overview">
                <div className="row align-items-center">
                  <div className="col-md-4 d-flex justify-content-center">
                    <img src={dashboard} alt="" />
                  </div>
                  <div className="col-md-8">
                    <div className="main-heading">
                      <h3>Welcome {getuser.name}</h3>
                      <p className="mb-0">Have a nice day at work</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{cursor:"pointer"}} onClick={() => navigate("/Admin/staff")}>
              <div className="dash-widget">
                <div className="dash-widget-bg">
                  <i className="fa fa-users" aria-hidden="true"></i>
                </div>
                <div className="dash-widget-info">
                  <h3>{count.totalStaff}</h3>
                  <span className="widget-title">Total Staff</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{cursor:"pointer"}} onClick={() => navigate("/Admin/Inquiry")}>
              <div className="dash-widget">
                <div className="dash-widget-bg">
                  <i className="fa fa-user-md"></i>
                </div>
                <div className="dash-widget-info">
                  <h3>{count.all_Enquiry}</h3>
                  <span className="widget-title">Enquiries</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{cursor:"pointer"}} onClick={() => navigate("/Admin/Appointments")}>
              <div className="dash-widget">
                <div className="dash-widget-bg">
                  <i className="fa fa-calendar-check-o" aria-hidden="true"></i>
                </div>
                <div className="dash-widget-info">
                  <h3>{count.totalAppointment}</h3>
                  <span className="widget-title">Total Appointments</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{cursor:"pointer"}} onClick={() => navigate("/Admin/patients")}>
              <div className="dash-widget">
                <div className="dash-widget-bg">
                  <i class="fas fa-user-injured"></i>
                </div>
                <div className="dash-widget-info">
                  <h3>{count.Patients}</h3>
                  <span className="widget-title">Total Patients</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{cursor:"pointer"}} onClick={() => navigate("/Admin/Earnings")}>
              <div className="dash-widget">
                <div className="dash-widget-bg">
                  <i className="fa fa-clipboard" aria-hidden="true"></i>
                </div>
                <div className="dash-widget-info">
                  <h3>{count.OMCA_total_Earning}</h3>
                  <span className="widget-title">Fees Paid Patients</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{cursor:"pointer"}} onClick={() => navigate("/Admin/Hospitals")}>
              <div className="dash-widget">
                <div className="dash-widget-bg">
                  <i class="fa-solid fa-hospital"></i>
                </div>
                <div className="dash-widget-info">
                  <h3>{count.totalHospital}</h3>
                  <span className="widget-title">Hospitals</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{cursor:"pointer"}} onClick={() => navigate("/Admin/Earnings")}>
              <div className="dash-widget">
                <div className="dash-widget-bg">
                  <i
                    className="fa-solid fa-cash-register"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="dash-widget-info">
                  <h3>{count.duePaymentAll}</h3>
                  <span className="widget-title">Due Payments</span>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-widget-bg"><i class="fa-solid fa-x-ray"></i></div>
                <div className="dash-widget-info">
                  <h3>618</h3>
                  <span className="widget-title">Total X-Ray Patients</span>
                </div>
              </div>
            </div> */}
            {/* <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-widget-bg"><i class="fa-solid fa-cash-register"></i></div>
                <div className="dash-widget-info">
                  <h3>618</h3>
                  <span className="widget-title">due payments</span>
                </div>
              </div>
            </div> */}
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3" style={{cursor:"pointer"}} onClick={() => navigate("/Admin/Services")}>
              <div className="dash-widget">
                <div className="dash-widget-bg">
                  <i class="fa-solid fa-server"></i>
                </div>
                <div className="dash-widget-info">
                  <h3>{count.services}</h3>
                  <span className="widget-title">Services</span>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="treat-hd">
                <h6>Treatment Cases</h6>
                <span className="line"></span>
              </div>
            </div>
          </div>
          <div className="row">
            {arraycount &&
              arraycount.length > 0 &&
              arraycount.map((item, index) => (
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3" key={index} style={{cursor:"pointer"}} onClick={() => navigate("/Admin/patients")}>
                  <div className="dash-widget">
                    <div className="dash-bg">
                      <i ><img className="dash-imge" src={`${image}${item.image}`} /></i>
                    </div>
                    <div className="dash-widget-info">
                      <h3>{item.count}</h3>
                      <span className="widget-title">{item.course_name}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

    </>
  );
}
