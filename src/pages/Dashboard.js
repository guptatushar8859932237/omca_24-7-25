import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import dashboard from "../img/dashboard-doc.png";
import { baseurl } from "../Basurl/Baseurl";
import { image } from "../Basurl/Baseurl";
import { GetUserData } from "../reducer/userSlice";
import { useSelector, useDispatch } from "react-redux";
// import ReactApexChart from "react-apexcharts";
import { GetAllTreatment } from "../reducer/TreatmentSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GetAllHositalData } from "../reducer/HospitalSlice";
import ReactApexChart from "react-apexcharts";

export default function Dashboard() {
  const [arraycount, setArraycount] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [patientStatusCounts, setPatientStatusCounts] = useState({
    Travelled: 0,
    Confirmed: 0,
    Pending: 0,
    "On Hold": 0,
    "Treatment Completed": 0,
    Cancelled: 0,
    "Local Case": 0,
    "Follow Up": 0,
    "Passed Away": 0,
  });

  const [patientTypeCounts, setPatientTypeCounts] = useState({
    Private: 0,
    Foundation: 0,
    Insurance: 0,
    "Insurance + Private": 0,
  });

  const { getuser, loading, error } = useSelector((state) => state.getuser);

  const { Treatment } = useSelector((state) => state.Treatment);

  // Hospital selector
  const { hospital } = useSelector((state) => state.hospital);

  const [count, setCount] = useState("");

  useEffect(() => {
    dispatch(GetUserData());
    dispatch(GetAllHositalData());
    dispatch(GetAllTreatment());
    fetchAllPatientStatusCounts();
    getAllPatientTypeCounts();
  }, [dispatch]);

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

  const handleclicknavi = (coursename) => {
    console.log(coursename);
    navigate("/Admin/filterdtata");
  };

  // graph start here
  const [chartView, setChartView] = useState("Daily"); // shared for all charts
  // Appointments chart
  const appointmentsData = {
    Daily: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        { name: "Scheduled", data: [10, 15, 8, 20, 18, 12, 9] },
        { name: "Completed", data: [8, 12, 6, 15, 14, 9, 7] },
        { name: "Cancelled", data: [2, 3, 2, 5, 4, 3, 2] },
      ]
    },
    Weekly: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [
        { name: "Scheduled", data: [60, 70, 55, 80] },
        { name: "Completed", data: [50, 60, 45, 70] },
        { name: "Cancelled", data: [10, 10, 10, 10] },
      ]
    },
    Monthly: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      series: [
        { name: "Scheduled", data: [220, 240, 200, 260, 280, 300, 310, 290, 270, 260, 250, 240] },
        { name: "Completed", data: [200, 210, 180, 230, 250, 270, 290, 260, 240, 230, 220, 210] },
        { name: "Cancelled", data: [20, 30, 20, 30, 30, 30, 20, 30, 30, 30, 30, 30] },
      ]
    }
  };
  // Treatment chart
  const treatmentData = {
    Daily: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        { name: "Admitted", data: [5, 7, 6, 8, 9, 4, 3] },
        { name: "Under Review", data: [3, 4, 5, 6, 5, 3, 2] },
        { name: "Operated", data: [2, 3, 2, 4, 3, 2, 1] },
        { name: "Under Recovery", data: [4, 5, 6, 5, 6, 4, 3] },
        { name: "Discharged", data: [3, 4, 3, 5, 4, 3, 2] },
      ]
    },
    Weekly: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [
        { name: "Admitted", data: [30, 35, 32, 40] },
        { name: "Under Review", data: [20, 22, 25, 28] },
        { name: "Operated", data: [15, 18, 16, 20] },
        { name: "Under Recovery", data: [25, 28, 30, 32] },
        { name: "Discharged", data: [22, 24, 23, 26] },
      ]
    },
    Monthly: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      series: [
        { name: "Admitted", data: [120, 130, 125, 140, 150, 160, 155, 148, 142, 138, 130, 125] },
        { name: "Under Review", data: [90, 95, 92, 100, 105, 110, 108, 102, 98, 96, 94, 92] },
        { name: "Operated", data: [70, 75, 72, 80, 85, 90, 88, 84, 82, 78, 75, 72] },
        { name: "Under Recovery", data: [85, 90, 88, 95, 100, 105, 103, 98, 96, 94, 92, 90] },
        { name: "Discharged", data: [80, 85, 82, 90, 95, 100, 98, 94, 92, 90, 88, 85] },
      ]
    }
  };
  // Revenue chart
  const revenueData = {
    Daily: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        {
          name: "Fees Collected",
          type: "column",   // 👈 BAR
          data: [20000, 25000, 22000, 24000, 26000, 20000, 18000],
        },
        {
          name: "Due Amount",
          type: "line",     // 👈 LINE
          data: [5000, 4000, 6000, 3000, 7000, 4000, 3000],
        },
      ],
    },

    Weekly: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [
        {
          name: "Fees Collected",
          type: "column",
          data: [120000, 150000, 130000, 160000],
        },
        {
          name: "Due Amount",
          type: "line",
          data: [30000, 25000, 40000, 35000],
        },
      ],
    },

    Monthly: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      series: [
        {
          name: "Fees Collected",
          type: "column",
          data: [120000, 150000, 130000, 160000, 170000, 180000, 175000, 160000, 155000, 150000, 145000, 140000],
        },
        {
          name: "Due Amount",
          type: "line",
          data: [30000, 25000, 40000, 35000, 30000, 25000, 20000, 30000, 35000, 40000, 45000, 50000],
        },
      ],
    },
  };

  // treatment cases distribution
  const treatmentDistributionData = {
    Daily: {
      series: [10, 8, 6, 4, 2],
      options: {
        chart: { type: "donut" },
        labels: ["Oncology", "Cardiology", "Neuro Spine", "Orthopedic", "Others"],
        colors: ["#0066cc", "#0ba6df", "#002f54", "#22c7b8", "#fda25e"],
        legend: { position: "bottom" },
        tooltip: {
          y: {
            formatter: function (val) {
              return `${val} Patients`;
            },
          },
        },
      },
    },

    Weekly: {
      series: [70, 50, 40, 35, 20],
      options: {
        chart: { type: "donut" },
        labels: ["Oncology", "Cardiology", "Neuro Spine", "Orthopedic", "Others"],
        colors: ["#0066cc", "#0ba6df", "#002f54", "#22c7b8", "#fda25e"],
        legend: { position: "bottom" },
        tooltip: {
          y: {
            formatter: function (val) {
              return `${val} Patients`;
            },
          },
        },
      },
    },

    Monthly: {
      series: [300, 250, 200, 150, 100],
      options: {
        chart: { type: "donut" },
        labels: ["Oncology", "Cardiology", "Neuro Spine", "Orthopedic", "Others"],
        colors: ["#0066cc", "#0ba6df", "#002f54", "#22c7b8", "#fda25e"],
        legend: { position: "bottom" },
        tooltip: {
          y: {
            formatter: function (val) {
              return `${val} Patients`;
            },
          },
        },
      },
    },
  };
  // hospital
  const hospitalPerformanceData = {
    Daily: {
      categories: [
        "Apollo Hospital",
        "Fortis",
        "Max Healthcare",
        "Medanta",
        "AIIMS",
        "Narayana Health",
        "Manipal Hospital",
        "Kokilaben Hospital",
        "Artemis Hospital",
        "BLK Max",
        "Columbia Asia",
        "Ruby Hall",
        "Jaslok Hospital",
        "Hinduja Hospital",
        "Care Hospitals",
        "Aster Medcity",
        "Yashoda Hospital",
        "Global Hospitals",
        "SevenHills Hospital",
        "Lilavati Hospital",
      ],
      series: [
        {
          name: "Patients",
          data: [
            45, 38, 42, 50, 60,
            34, 29, 40, 36, 41,
            33, 28, 26, 35, 39,
            31, 37, 30, 27, 44,
          ],
        },
      ],
    },

    Weekly: {
      categories: [
        "Apollo Hospital",
        "Fortis",
        "Max Healthcare",
        "Medanta",
        "AIIMS",
        "Narayana Health",
        "Manipal Hospital",
        "Kokilaben Hospital",
        "Artemis Hospital",
        "BLK Max",
        "Columbia Asia",
        "Ruby Hall",
        "Jaslok Hospital",
        "Hinduja Hospital",
        "Care Hospitals",
        "Aster Medcity",
        "Yashoda Hospital",
        "Global Hospitals",
        "SevenHills Hospital",
        "Lilavati Hospital",
      ],
      series: [
        {
          name: "Patients",
          data: [
            320, 280, 300, 350, 400,
            260, 240, 310, 270, 295,
            250, 230, 220, 265, 285,
            255, 290, 245, 225, 315,
          ],
        },
      ],
    },

    Monthly: {
      categories: [
        "Apollo Hospital",
        "Fortis",
        "Max Healthcare",
        "Medanta",
        "AIIMS",
        "Narayana Health",
        "Manipal Hospital",
        "Kokilaben Hospital",
        "Artemis Hospital",
        "BLK Max",
        "Columbia Asia",
        "Ruby Hall",
        "Jaslok Hospital",
        "Hinduja Hospital",
        "Care Hospitals",
        "Aster Medcity",
        "Yashoda Hospital",
        "Global Hospitals",
        "SevenHills Hospital",
        "Lilavati Hospital",
      ],
      series: [
        {
          name: "Patients",
          data: [
            1250, 1180, 1220, 1350, 1500,
            1100, 1050, 1280, 1150, 1210,
            1080, 1020, 980, 1120, 1190,
            1095, 1230, 1070, 995, 1300,
          ],
        },
      ],
    },
  };
  const holisticChartData = {
    Daily: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        { name: "Enquiries", data: [120, 130, 125, 140, 135, 110, 100] },
        { name: "Patients", data: [95, 100, 98, 105, 102, 90, 85] },
        { name: "Appointments", data: [80, 85, 82, 88, 86, 75, 70] },
        { name: "Treatments", data: [70, 75, 72, 78, 76, 65, 60] },
        { name: "Completed", data: [60, 65, 63, 68, 66, 55, 50] },
      ],
    },

    Weekly: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [
        { name: "Enquiries", data: [780, 820, 800, 850] },
        { name: "Patients", data: [640, 670, 660, 700] },
        { name: "Appointments", data: [580, 600, 590, 620] },
        { name: "Treatments", data: [520, 540, 530, 560] },
        { name: "Completed", data: [480, 500, 490, 520] },
      ],
    },

    Monthly: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      series: [
        { name: "Enquiries", data: [3200, 3400, 3300, 3500, 3600, 3700, 2800, 2950, 2900, 3000, 3100, 3200] },
        { name: "Patients", data: [2800, 2950, 2900, 3000, 3100, 3200, 2600, 2700, 2680, 2800, 2900, 3000] },
        { name: "Appointments", data: [2600, 2700, 2680, 2800, 2900, 3000, 2400, 2500, 2480, 2600, 2700, 2800] },
        { name: "Treatments", data: [2400, 2500, 2480, 2600, 2700, 2800, 2200, 2300, 2280, 2400, 2500, 2600] },
        { name: "Completed", data: [2200, 2300, 2280, 2400, 2500, 2600, 3200, 3400, 3300, 3500, 3600, 3700,] },
      ],
    },
  };

  // Patient status counts fetch karne ka function
  const getPatientStatusCount = async (status) => {
    try {
      const response = await axios.get(
        `${baseurl}get_patients_by_status?p_status=${encodeURIComponent(status)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data?.success && response.data?.data) {
        return response.data.data.length; // Array ki length return karo
      }
      return 0;
    } catch (error) {
      console.error(`Error fetching ${status} count:`, error);
      return 0;
    }
  };

  const handleStatusClick = (status) => {
  navigate(`/Admin/patients?status=${encodeURIComponent(status)}`);
};
  
  const handleTypeClick = (type) => {
  navigate(`/Admin/patients?type=${encodeURIComponent(type)}`);
};
  // Holistic Data Cards redirect
  const handleHolisticClick = (type) => {
    switch (type) {
      case "enquiry":
        navigate("/Admin/inquiry");
        break;
      case "appointment":
        navigate("/Admin/appointments");
        break;
      case "patient":
        navigate("/Admin/patients");
        break;
      case "hospital":
        navigate("/Admin/hospitals");
        break;
      case "treatment":
        navigate("/Admin/treatments");
        break;
      case "staff":
        navigate("/Admin/staff");
        break;
      default:
        break;
    }
  };

  const fetchAllPatientStatusCounts = async () => {
    const statuses = [
      "Travelled",
      "Confirmed",
      "Pending",
      "On Hold",
      "Treatment Completed",
      "Cancelled",
      "Local Case",
      "Follow Up",
      "Passed Away",
    ];

    const counts = {};

    // Promise.all for fetch status
    await Promise.all(
      statuses.map(async (status) => {
        const count = await getPatientStatusCount(status);
        counts[status] = count;
      }),
    );

    setPatientStatusCounts(counts);
  };

  // patient type fetch
  const getAllPatientTypeCounts = async () => {
    const types = ["Private", "Foundation", "Insurance", "Insurance + Private"];

    const newCounts = { ...patientTypeCounts };

    await Promise.all(
      types.map(async (type) => {
        const count = await fetchPatientTypeCount(type);
        newCounts[type] = count;
      }),
    );

    setPatientTypeCounts(newCounts);
  };

  // Patient Type count function
  const fetchPatientTypeCount = async (type) => {
    try {
      const encodedType = encodeURIComponent(type);
      const response = await axios.get(
        `${baseurl}get_patient_type_new?patient_type_new=${encodedType}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );
      // API response
      const count = response.data?.data?.length || 0;
      return count;
    } catch (error) {
      console.error(`Error fetching ${type} patients:`, error);
      return 0;
    }
  };

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
                      <h3>Welcome {getuser?.name}</h3>
                      <p className="mb-0">Have a nice day at work</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Holistic Data Heading */}
          <div className="row">
            <div className="col-md-12">
              <div className="treat-hd">
                <h6>Holistic Data</h6>
                <span className="line"></span>
              </div>
            </div>
          </div>

          <div className="row">
            <div
              className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              //  style={{ cursor: "pointer"
              // }} onClick={() => navigate("/Admin/Inquiry")}
              style={{ cursor: "pointer" }}
              onClick={() => handleHolisticClick("enquiry")}
            >
              <div className="dash-widget1">
                <div className="dash-widget-bg">
                  <i className="fa fa-user-md"></i>
                </div>
                <div className="dash-widget-info1">
                  <h3>{count?.all_Enquiry || 0}</h3>
                  <span className="widget-title">Total Enquiries</span>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              // style={{ cursor: "pointer" }} onClick={
              // () => navigate("/Admin/Appointments")}
              style={{ cursor: "pointer" }}
              onClick={() => handleHolisticClick("appointment")}
            >
              <div className="dash-widget1">
                <div className="dash-widget-bg">
                  <i className="fa fa-calendar-check-o" aria-hidden="true"></i>
                </div>
                <div className="dash-widget-info1">
                  <h3>{count?.totalAppointment || 0}</h3>
                  <span className="widget-title">Total Appointments</span>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              //  style={{ cursor: "pointer" }} onClick={() => navigate("/Admin/patients")}
              style={{ cursor: "pointer" }}
              onClick={() => handleHolisticClick("patient")}
            >
              <div className="dash-widget1">
                <div className="dash-widget-bg">
                  <i className="fas fa-user-injured"></i>
                </div>
                <div className="dash-widget-info1">
                  <h3>{count?.Patients || 0}</h3>
                  <span className="widget-title">Total Patients</span>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              //  style={{ cursor: "pointer" }} onClick={() => navigate("/Admin/staff")}
            >
              <div className="dash-widget1">
                <div className="dash-widget-bg">
                  <i className="fa-solid fa-hospital"></i>
                </div>
                <div className="dash-widget-info1">
                  <h3>{hospital?.length || 0}</h3>
                  <span className="widget-title">Hospitals</span>
                </div>
              </div>
            </div>

            {/* <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3" 
            // style={{ cursor: "pointer" }} onClick={() => navigate("/Admin/Earnings")}
              >
                    <div className="dash-widget1">
                <div className="dash-widget-bg">
                  <i className="fa-solid fa-server"></i>
                </div>
                <div className="dash-widget-info1">
                  <h3>{count.services}</h3>
                  <span className="widget-title">Services</span>
                </div>
              </div>
              
            </div> */}

            {/* FIXED: Treatment count card with actual Treatment data */}
            <div
              className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              // style={{ cursor: "pointer" }} onClick={() => navigate("/Admin/Earnings")}
            >
              <div className="dash-widget1">
                <div className="dash-widget-bg">
                  <i className="fa-solid fa-stethoscope"></i>
                </div>
                <div className="dash-widget-info1">
                  <h3>{Treatment?.length || 0}</h3>
                  <span className="widget-title">Treatment</span>
                </div>
              </div>
            </div>
            <div
              className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              // style={{ cursor: "pointer" }} onClick={() => navigate("/Admin/Hospitals")}
              style={{ cursor: "pointer" }}
              onClick={() => handleHolisticClick("staff")}
            >
              <div className="dash-widget1">
                <div className="dash-widget-bg">
                  <i className="fa fa-users" aria-hidden="true"></i>
                </div>
                <div className="dash-widget-info1">
                  <h3>{count?.totalStaff || 0}</h3>
                  <span className="widget-title">Total Staff</span>
                </div>
              </div>
            </div>

            {/* Patient Status Heading */}
            <div className="row">
              <div className="col-md-12">
                <div className="treat-hd">
                  <h6>Patient Status</h6>
                  <span className="line"></span>
                </div>
              </div>
            </div>

            {/* Patient Status Cards */}
            <div className="row">
              {/* Travelled */}
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
               style={{ cursor: "pointer" }} 
             onClick={() => handleStatusClick('Travelled')}>
              
                <div className="dash-widget1">
                  <div
                    className="dash-widget-bg"
                    style={{ backgroundColor: "#28a745" }}
                  >
                    <i className="fa fa-plane"></i>
                  </div>
                  <div className="dash-widget-info1">
                    <h3>{patientStatusCounts["Travelled"] || 0}</h3>
                    <span className="widget-title">Travelled</span>
                  </div>
                </div>
              </div>

              {/* Confirmed */}
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              style={{ cursor: "pointer" }} 
             onClick={() => handleStatusClick('Confirmed')}
              >
                <div className="dash-widget1">
                  <div
                    className="dash-widget-bg"
                    style={{ backgroundColor: "#17a2b8" }}
                  >
                    <i className="fa fa-check-circle"></i>
                  </div>
                  <div className="dash-widget-info1">
                    <h3>{patientStatusCounts["Confirmed"] || 0}</h3>
                    <span className="widget-title">Confirmed</span>
                  </div>
                </div>
              </div>

              {/* Pending */}
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              style={{ cursor: "pointer" }} 
             onClick={() => handleStatusClick('Pending')}
              >
                <div className="dash-widget1">
                  <div
                    className="dash-widget-bg"
                    style={{ backgroundColor: "#ffc107" }}
                  >
                    <i className="fa fa-clock-o"></i>
                  </div>
                  <div className="dash-widget-info1">
                    <h3>{patientStatusCounts["Pending"] || 0}</h3>
                    <span className="widget-title">Pending</span>
                  </div>
                </div>
              </div>

              {/* On Hold */}
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              style={{ cursor: "pointer" }} 
             onClick={() => handleStatusClick('On Hold')}
              >
                <div className="dash-widget1">
                  <div
                    className="dash-widget-bg"
                    style={{ backgroundColor: "#fd7e14" }}
                  >
                    <i className="fa fa-pause-circle"></i>
                  </div>
                  <div className="dash-widget-info1">
                    <h3>{patientStatusCounts["On Hold"] || 0}</h3>
                    <span className="widget-title">On Hold</span>
                  </div>
                </div>
              </div>

              {/* Treatment Completed */}
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              style={{ cursor: "pointer" }} 
             onClick={() => handleStatusClick('Treatment Completed')}
              >
                <div className="dash-widget1">
                  <div
                    className="dash-widget-bg"
                    style={{ backgroundColor: "#0066cc" }}
                  >
                    <i className="fa fa-medkit"></i>
                  </div>
                  <div className="dash-widget-info1">
                    <h3>{patientStatusCounts["Treatment Completed"] || 0}</h3>
                    <span className="widget-title">Treatment Completed</span>
                  </div>
                </div>
              </div>

              {/* Cancelled */}
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              style={{ cursor: "pointer" }} 
             onClick={() => handleStatusClick('Cancelled')}
              >
                <div className="dash-widget1">
                  <div
                    className="dash-widget-bg"
                    style={{ backgroundColor: "#dc3545" }}
                  >
                    <i className="fa fa-times-circle"></i>
                  </div>
                  <div className="dash-widget-info1">
                    <h3>{patientStatusCounts["Cancelled"] || 0}</h3>
                    <span className="widget-title">Cancelled</span>
                  </div>
                </div>
              </div>
              {/* Local Case */}
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              style={{ cursor: "pointer" }} 
             onClick={() => handleStatusClick('Local Case')}
              >
                <div className="dash-widget1">
                  <div
                    className="dash-widget-bg"
                    style={{ backgroundColor: "#6f42c1" }}
                  >
                    <i className="fa fa-home"></i>
                  </div>
                  <div className="dash-widget-info1">
                    <h3>{patientStatusCounts["Local Case"] || 0}</h3>
                    <span className="widget-title">Local Case</span>
                  </div>
                </div>
              </div>

              {/* Follow Up */}
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              style={{ cursor: "pointer" }} 
             onClick={() => handleStatusClick('Follow Up')}
              >
                <div className="dash-widget1">
                  <div
                    className="dash-widget-bg"
                    style={{ backgroundColor: "#20c997" }}
                  >
                    <i className="fa fa-phone"></i>
                  </div>
                  <div className="dash-widget-info1">
                    <h3>{patientStatusCounts["Follow Up"] || 0}</h3>
                    <span className="widget-title">Follow Up</span>
                  </div>
                </div>
              </div>

              {/* Passed Away */}
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              style={{ cursor: "pointer" }} 
             onClick={() => handleStatusClick('Passed Away')}
              >
                <div className="dash-widget1">
                  <div
                    className="dash-widget-bg"
                    style={{ backgroundColor: "#343a40" }}
                  >
                    <i className="fa fa-heart-o"></i>
                  </div>
                  <div className="dash-widget-info1">
                    <h3>{count?.patientStatusCounts?.["Passed Away"]}</h3>
                    <span className="widget-title">Passed Away</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Patient Type Heading */}
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="treat-hd">
                  <h6>Patient Type</h6>
                  <span className="line"></span>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Private */}
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              style={{ cursor: "pointer" }} 
             onClick={() => handleTypeClick('Private')}
              >
                <div className="dash-widget1">
                  <div
                    className="dash-widget-bg"
                    style={{ backgroundColor: "#007bff" }}
                  >
                    <i className="fa fa-user"></i>
                  </div>
                  <div className="dash-widget-info1">
                    <h3>{patientTypeCounts["Private"] || 0}</h3>
                    <span className="widget-title">Private</span>
                  </div>
                </div>
              </div>

              {/* Foundation */}
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                       style={{ cursor: "pointer" }} 
             onClick={() => handleTypeClick('Foundation')}
              >
                <div className="dash-widget1">
                  <div
                    className="dash-widget-bg"
                    style={{ backgroundColor: "#6610f2" }}
                  >
                    <i className="fa fa-building"></i>
                  </div>
                  <div className="dash-widget-info1">
                    <h3>{patientTypeCounts["Foundation"] || 0}</h3>
                    <span className="widget-title">Foundation</span>
                  </div>
                </div>
              </div>

              {/* Insurance */}
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                       style={{ cursor: "pointer" }} 
             onClick={() => handleTypeClick('Insurance')}
              >
                <div className="dash-widget1">
                  <div
                    className="dash-widget-bg"
                    style={{ backgroundColor: "#00b4d8" }}
                  >
                    <i className="fa fa-shield"></i>
                  </div>
                  <div className="dash-widget-info1">
                    <h3>{patientTypeCounts["Insurance"] || 0}</h3>
                    <span className="widget-title">Insurance</span>
                  </div>
                </div>
              </div>

              {/* Insurance + Private */}
              <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                       style={{ cursor: "pointer" }} 
             onClick={() => handleTypeClick('Insurance + Private')}
              >
                <div className="dash-widget1">
                  <div
                    className="dash-widget-bg"
                    style={{ backgroundColor: "#0096c7" }}
                  >
                    <i className="fa fa-user-shield"></i>
                  </div>
                  <div className="dash-widget-info1">
                    <h3>{patientTypeCounts["Insurance + Private"] || 0}</h3>
                    <span className="widget-title">Insurance + Private</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
              // style={{ cursor: "pointer" }} onClick={() => navigate("/Admin/Services")}
            >
              {/* <div className="dash-widget1">
                <div className="dash-widget-bg">
                  <i className="fa fa-clipboard" aria-hidden="true"></i>
                </div>
                <div className="dash-widget-info1">
                  <h3>0</h3>
                  <span className="widget-title">Country</span>
                </div>
              </div> */}
            </div>
          </div>
          {/* <div className="row">
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
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3" key={index} 
                style={{ cursor: "pointer" }} onClick={() => handleclicknavi(item.course_name)}>
                  <div className="dash-widget">
                    <div className="">
                      <span className="widget-title">{item.course_name}</span>
                    </div>
                    <div className="dash-box">
                      <div className="dash-widget-info">
                        <h3>{item.count}</h3>
                      </div>
                      <div className="dash-bg">
                        <img className="dash-imge" src={`${image}${item.image}`} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div> */}
          <div className="row gy-4">
          {/* appointment-graph */}
          {/* <div className="col-md-6">
              <div className="card apointment-card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Appointments per {chartView}</h5>
                    <div className="dropdown">
                      <button className="submit-btn dropdown-toggle" type="button" id="chartDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        {chartView}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="chartDropdown">
                        <li>
                          <button className="dropdown-item" onClick={() => setChartView("Daily")}>Daily</button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => setChartView("Weekly")}>Weekly</button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => setChartView("Monthly")}>Monthly</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <ReactApexChart
                    type="bar"
                    height={350}
                    series={appointmentsData[chartView].series}
                    options={{
                      chart: { toolbar: { show: false } },
                      plotOptions: { bar: { columnWidth: "55%" } },
                      dataLabels: { enabled: false },
                      xaxis: { categories: appointmentsData[chartView].categories },
                      legend: { position: "top" },
                      colors: ["#0ba6df", "#22c7b8", "#ff0000"],
                    }}
                  />
                </div>
               </div>
            </div> */}
          {/* treatment-graph */}
           {/* <div className="col-md-6">
              <div className="card treatment-status-card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Treatments per {chartView}</h5>
                    <div className="dropdown">
                      <button
                        className="submit-btn dropdown-toggle"
                        type="button"
                        id="chartDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {chartView} 
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="chartDropdown">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setChartView("Daily")}
                          >
                            Daily
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setChartView("Weekly")}
                          >
                            Weekly
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setChartView("Monthly")}
                          >
                            Monthly
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <ReactApexChart
                    type="bar"
                    height={350}
                    series={treatmentData[chartView].series}
                    options={{
                      chart: {
                        stacked: true,
                        toolbar: { show: false },
                      },

                      plotOptions: {
                        bar: {
                          columnWidth: "60%",
                          borderRadius: 0,
                        },
                      },

                      dataLabels: { enabled: false },

                      xaxis: {
                        categories: treatmentData[chartView].categories,
                      },

                      legend: {
                        position: "top",
                      },

                      colors: ["#0066cc", "#0ba6df", "#069494", "#fda25e", "#002f54"],
                    }}
                  />

                </div> 
              </div> 
            </div>  */}
          {/* cases-distribution-graph */}
           <div className="col-md-6">
              {/* <div className="card treatment-distribution-card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Treatment Cases Distribution</h5>
                    <div className="dropdown">
                      <button
                        className="submit-btn dropdown-toggle"
                        type="button"
                        id="chartDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {chartView} 
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="chartDropdown">
                        <li>
                          <button className="dropdown-item" onClick={() => setChartView("Daily")}>
                            Daily
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setChartView("Weekly")}
                          >
                            Weekly
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setChartView("Monthly")}
                          >
                            Monthly
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <ReactApexChart
                    options={treatmentDistributionData[chartView].options}
                    series={treatmentDistributionData[chartView].series}
                    type="donut"
                    height={350}
                  />
                </div>
              </div> */}
            </div> 
           {/* revenue-payment-graph */}
          <div className="col-md-6">
              {/* <div className="card revenue-payment-card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Revenue vs Due Payments</h5>
                    <div className="dropdown">
                      <button
                        className="submit-btn dropdown-toggle"
                        type="button"
                        id="chartDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {chartView} 
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="chartDropdown">
                        <li>
                          <button className="dropdown-item" onClick={() => setChartView("Daily")}>
                            Daily
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setChartView("Weekly")}
                          >
                            Weekly
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setChartView("Monthly")}
                          >
                            Monthly
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  {revenueData?.[chartView] && (
                    <ReactApexChart
                      type="line"
                      height={350}
                      series={revenueData[chartView].series}
                      options={{
                        chart: {
                          toolbar: { show: false },
                        },

                        stroke: {
                          width: [0, 3],
                          curve: "smooth",
                        },

                        plotOptions: {
                          bar: {
                            columnWidth: "45%",
                          },
                        },

                        markers: {
                          size: 5,
                        },

                        dataLabels: {
                          enabled: false,
                        },

                        xaxis: {
                          categories: revenueData[chartView].categories,
                        },

                        yaxis: [
                          {
                            title: {
                              text: "Fees Collected (₹)",
                            },
                          },
                          {
                            opposite: true,
                            title: {
                              text: "Due Amount (₹)",
                            },
                          },
                        ],

                        colors: ["#0ba6df", "#fda25e"],

                        legend: {
                          position: "top",
                        },

                        tooltip: {
                          shared: true,
                          y: {
                            formatter: (val) => `₹ ${val.toLocaleString()}`,
                          },
                        },
                      }}
                    />
                  )}

                </div>
              </div> */}
            </div>
          {/* hospital-performance-graph */}
          <div className="col-md-6">
              {/* <div className="card hospital-performance-card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Top Hospitals by Patients</h5>
                    <div className="dropdown">
                      <button className="submit-btn dropdown-toggle" type="button" id="chartDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                        {chartView}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="chartDropdown">
                        <li>
                          <button className="dropdown-item" onClick={() => setChartView("Daily")}>Daily</button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => setChartView("Weekly")}>Weekly</button>
                        </li>
                        <li>
                          <button className="dropdown-item" onClick={() => setChartView("Monthly")}>Monthly</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <ReactApexChart
                    type="bar"
                    height={350}
                    series={hospitalPerformanceData[chartView].series}
                    options={{
                      chart: {
                        toolbar: { show: false },
                      },

                      plotOptions: {
                        bar: {
                          horizontal: false,
                          columnWidth: "50%",
                          borderRadius: 0,
                        },
                      },

                      dataLabels: {
                        enabled: false,
                      },

                      xaxis: {
                        categories: hospitalPerformanceData[chartView].categories,
                        title: {
                          text: "Hospitals",
                          style: {
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#002f54",
                          },
                        },
                      },

                      yaxis: {
                        title: {
                          text: "Total Patients",
                          style: {
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#002f54",
                          },
                        },
                      },
                      tooltip: {
                        shared: true,
                        intersect: false,
                        y: {
                          formatter: function (val) {
                            if (val === undefined || val === null) return "";
                            return val.toLocaleString();
                          },
                        },
                      },
                      colors: ["#0ba6df"],
                    }}
                  />
                </div>
              </div> */}
            </div> 
          {/* holistical-data-graph */}
          {/* <div className="col-md-6">
              <div className="card holistic-flow-card">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Patient Conversion Funnel (Enquiry → Completion)</h5>
                    <div className="dropdown">
                      <button
                        className="submit-btn dropdown-toggle"
                        type="button"
                        id="chartDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {chartView}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="chartDropdown">
                        <li>
                          <button className="dropdown-item" onClick={() => setChartView("Daily")}>
                            Daily
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setChartView("Weekly")}
                          >
                            Weekly
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setChartView("Monthly")}
                          >
                            Monthly
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <ReactApexChart
                    type="line"
                    height={350}
                    series={holisticChartData[chartView].series}
                    options={{
                      chart: {
                        toolbar: { show: false },
                        zoom: { enabled: false },
                      },

                      stroke: {
                        curve: "smooth",
                        width: 3,
                      },

                      markers: {
                        size: 5,
                        strokeWidth: 2,
                        hover: { size: 7 },
                      },

                      dataLabels: { enabled: false },

                      xaxis: {
                        categories: holisticChartData[chartView].categories,
                      },

                      yaxis: {
                        title: {
                          text: "Total Count",
                        },
                      },

                      legend: {
                        position: "top",
                      },

                      colors: [
                        "#0ba6df", // Enquiries
                        "#069494", // Patients
                        "#6326d0", // Appointments
                        "#fda25e", // Treatments
                        "#008000", // Completed
                      ],

                      tooltip: {
                        theme: "dark",
                      },

                      grid: {
                        strokeDashArray: 4,
                      },
                    }}
                  />

                </div>
              </div>
            </div>  */}
          </div>
        </div>
      </div>
    </>
  );
}
