import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import dashboard from "../img/dashboard-doc.png";
import { baseurl } from "../Basurl/Baseurl";
import { GetUserData } from "../reducer/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { GetAllTreatment } from "../reducer/TreatmentSlice";
// import { GetAllCountries, GetAllCountries2 } from "../../reducer/Countries";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { GetAllHositalData } from "../reducer/HospitalSlice";
import ReactApexChart from "react-apexcharts";
import { GetAllCountries } from "../reducer/Countries";
import { Field } from "formik";
import { FormControl, MenuItem, Select } from "@mui/material";
export default function Dashboard() {
  const permissions = localStorage.getItem("permissionArray") || [];
  const [arraycount, setArraycount] = useState([]);
  const [travelled, setTravelled] = useState({});
  const [typeCounts, setTypeCounts] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasPermission = (route) => {
    return permissions.includes(route);
  };
  const [revenueData, setRevenueData] = useState({
    all: { series: [], categories: [] },
    Daily: { series: [], categories: [] },
    Weekly: { series: [], categories: [] },
    Monthly: { series: [], categories: [] },
    quarterly: { series: [], categories: [] },
    yearly: { series: [], categories: [] },
  });
  const [treatmentData, setTreatmentData] = useState({
    all: { series: [], categories: [] },
    Daily: { series: [], categories: [] },
    Weekly: { series: [], categories: [] },
    Monthly: { series: [], categories: [] },
    quarterly: { series: [], categories: [] },
    yearly: { series: [], categories: [] },
  });

  const [hospitalPerformanceData, setHospitalPerformanceData] = useState({
    all: { series: [], categories: [] },
    Daily: { series: [], categories: [] },
    Weekly: { series: [], categories: [] },
    Monthly: { series: [], categories: [] },
    quarterly: { series: [], categories: [] },
    yearly: { series: [], categories: [] },
  });
  const { Countries } = useSelector((state) => state.Countries);
  const [country, setCountry] = useState("");
  const [countryTreating, setCountryTreating] = useState("");
  const [holisticChartData, setHolisticChartData] = useState({
    all: { series: [], categories: [] },
    Daily: { series: [], categories: [] },
    Weekly: { series: [], categories: [] },
    Monthly: { series: [], categories: [] },
    quarterly: { series: [], categories: [] },
    yearly: { series: [], categories: [] },
  });
  const [treatmentDistributionData, setTreatmentDistributionData] = useState({
    all: { series: [], options: {} },
    Daily: { series: [], options: {} },
    Weekly: { series: [], options: {} },
    Monthly: { series: [], options: {} },
    quarterly: { series: [], categories: [] },
    yearly: { series: [], categories: [] },
  });
  const [responseDataChart, setResponseDataChart] = useState({
    series: [],
    categories: [],
  });
  const [chartView, setChartView] = useState("all");
  const usrFount = localStorage.getItem("Role");
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
  const [count, setCount] = useState("");
  useEffect(() => {
    dispatch(GetUserData());
    dispatch(GetAllCountries());
    dispatch(GetAllHositalData());
    dispatch(GetAllTreatment());
    fetchAllPatientStatusCounts();
    getAllPatientTypeCounts();
  }, [dispatch]);
  const formatConversionFunnel = (data) => {
    return {
      series: [
        {
          name: "Patients Flow",
          data: [
            data.enquiries || 0,
            data.patients || 0,
            data.appointments || 0,
            data.treatments || 0,
            data.completed || 0,
          ],
        },
      ],
      categories: [
        "Enquiries",
        "Patients",
        "Appointments",
        "Treatments",
        "Completed",
      ],
    };
  };

  const formatHospitalPerformance = (data) => {
    const categories = data.map((item) => item.hospitalName);

    const series = [
      {
        name: "Patients",
        data: data.map((item) => item.totalPatients),
      },
    ];

    return {
      series,
      categories,
    };
  };
  const GetDashboard = (a, country,countryTreating) => {
    axios
      .get(`${baseurl}Dashboard_count`, {
        params: {
          period: a,
          country: country,
          treatingIn:countryTreating
 
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          console.log(response.data);
          const appointmentChart = response.data?.charts?.appointmentChart;
          const formattedData = formatAppointmentChart(appointmentChart);
          setResponseDataChart(formattedData);
          const treatmentChart = response.data?.charts?.treatmentChart;
          const formattedTreatment = formatTreatmentChart(treatmentChart);
          setTreatmentData({
            all: formattedTreatment,
            Daily: formattedTreatment,
            Weekly: formattedTreatment,
            Monthly: formattedTreatment,
            quarterly: formattedTreatment,
            yearly: formattedTreatment,
          });
          const distribution = response.data?.charts?.treatmentDistribution;
          const formattedDistribution =
            formatTreatmentDistribution(distribution);
          setTreatmentDistributionData({
            all: formattedDistribution,
            Daily: formattedDistribution,
            Weekly: formattedDistribution,
            Monthly: formattedDistribution,
            quarterly: formattedDistribution,
            yearly: formattedDistribution,
          });
          const revenueChart = response.data?.charts?.revenueChart;
          const formattedRevenue = formatRevenueChart(revenueChart);
          setRevenueData({
            all: formattedRevenue,
            Daily: formattedRevenue,
            Weekly: formattedRevenue,
            Monthly: formattedRevenue,
            quarterly: formattedRevenue,
            yearly: formattedRevenue,
          });
          const funnel = response.data?.charts?.conversionFunnel;
          const formattedFunnel = formatConversionFunnel(funnel);
          setHolisticChartData({
            Daily: formattedFunnel,
            Weekly: formattedFunnel,
            Monthly: formattedFunnel,
          });
          // const formattedHospital = formatHospitalPerformance(
          //   response.data?.charts?.topHospitals,
          // );
          const formattedHospital = formatHospitalPerformance(
            response.data?.charts?.topHospitals,
          );

          setHospitalPerformanceData({
            all: formattedHospital,
            Daily: formattedHospital,
            Weekly: formattedHospital,
            Monthly: formattedHospital,
            quarterly: formattedHospital,
            yearly: formattedHospital,
          });

          setHolisticChartData({
            all: formattedFunnel,
            Daily: formattedFunnel,
            Weekly: formattedFunnel,
            Monthly: formattedFunnel,
            quarterly: formattedFunnel,
            yearly: formattedFunnel,
          });
          setTypeCounts(response.data.patientTypeCounts);
          setTravelled(response.data.patientStatusCounts);
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
  const formatTreatmentChart = (data) => {
    const categories = [];
    const statusMap = {};

    data.forEach((item) => {
      const { year, month, day } = item._id.period;
      const status = item._id.status;
      const count = item.count;

      const label = `${day}-${month}`;

      if (!categories.includes(label)) {
        categories.push(label);

        // har status ke array ko sync rakhna
        Object.keys(statusMap).forEach((key) => {
          statusMap[key].push(0);
        });
      }

      const index = categories.indexOf(label);

      if (!statusMap[status]) {
        statusMap[status] = new Array(categories.length).fill(0);
      }

      statusMap[status][index] = count;
    });

    const series = Object.keys(statusMap).map((status) => ({
      name: status,
      data: statusMap[status],
    }));

    return {
      series,
      categories,
    };
  };
  const formatAppointmentChart = (data) => {
    const categories = [];
    const schedule = [];
    const cancelled = [];

    data.forEach((item) => {
      const { year, month, day } = item._id.period;
      const status = item._id.status;
      const count = item.count;

      const label = `${day}-${month}`;

      if (!categories.includes(label)) {
        categories.push(label);
        schedule.push(0);
        cancelled.push(0);
      }

      const index = categories.indexOf(label);

      if (status === "Schedule") {
        schedule[index] = count;
      }

      if (status === "Cancelled") {
        cancelled[index] = count;
      }
    });

    return {
      series: [
        { name: "Schedule", data: schedule },
        { name: "Cancelled", data: cancelled },
      ],
      categories,
    };
  };
  useEffect(() => {
    const period = getPeriod(chartView);

    GetDashboard(period, country,countryTreating);
  }, [chartView, country, countryTreating]);
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
      console.log(response.data);
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
    console.log(status);
    if (usrFount === "Admin") {
      navigate(`/Admin/patients?status=${encodeURIComponent(status)}`);
    }
  };
  const handleTypeClick = (type) => {
    usrFount === "Admin" &&
      navigate(`/Admin/patients?type=${encodeURIComponent(type)}`);
  };
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
    await Promise.all(
      statuses.map(async (status) => {
        const count = await getPatientStatusCount(status);
        counts[status] = count;
      }),
    );
    setPatientStatusCounts(counts);
  };
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

  const formatTreatmentDistribution = (data) => {
    const labels = data.map((item) => item.name);
    const series = data.map((item) => item.count);

    return {
      series,
      options: {
        labels,
        legend: {
          position: "bottom",
        },
        dataLabels: {
          enabled: true,
        },
      },
    };
  };
  const formatRevenueChart = (data) => {
    const categories = [];
    const feesData = [];
    const dueData = [];
    data.forEach((item) => {
      const { year, month, day } = item._id;
      const label = `${day}-${month}`;
      categories.push(label);
      feesData.push(item.feesCollected);
      dueData.push(item.dueAmount);
    });
    return {
      series: [
        {
          name: "Fees Collected",
          type: "column",
          data: feesData,
        },
        {
          name: "Due Amount",
          type: "line",
          data: dueData,
        },
      ],
      categories,
    };
  };

  const getPeriod = (view) => {
    if (view === "all") return "all";
    if (view === "Daily") return "daily";
    if (view === "Weekly") return "weekly";
    if (view === "Monthly") return "monthly";
    if (view === "quarterly") return "quarterly";
    if (view === "yearly") return "yearly";
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
          {usrFount === "Insurance Partner" ? (
            ""
          ) : (
            <>
              <div className="row">
                <div className="col-md-4">
                  <div className="treat-hd">
                    <h6>Holistic Data</h6>
                    <span className="line"></span>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="treat-hd">
                    <div className="dropdown">
                      <button
                        className="submit-btn dropdown-toggle w-100"
                        type="button"
                        id="chartDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                       {chartView === "all" ? "All" : chartView}
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="chartDropdown"
                      >
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
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setChartView("quarterly")}
                          >
                            Quarterly
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => setChartView("yearly")}
                          >
                            Yearly
                          </button>
                        </li>
                      </ul>
                    </div>
                    {/* <select className="w-100 bg-white p-2 rounded">
                      <option >Select Filter</option>
                      <option  onClick={() => setChartView("Daily")}>Daily</option>
                      <option   onClick={() => setChartView("Weekly")}>Weekly</option>
                      <option  onClick={() => setChartView("Monthly")}>Monthly</option>
                      <option onClick={() => setChartView("quarterly")}>Quarterly</option>
                      <option  onClick={() => setChartView("yearly")}>Yearly</option>
                    </select> */}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="treat-hd">
                    <FormControl fullWidth size="small">
                      <Select
                        value={countryTreating}
                        displayEmpty
                        onChange={(e) => setCountryTreating(e.target.value)}
                        MenuProps={{
                          PaperProps: {
                            style: { maxHeight: 250 },
                          },
                        }}
                      >
                        <MenuItem value="">
                          <em>Select TreatingIn Country</em>
                        </MenuItem>

                        {Countries?.map((c, i) => (
                          <MenuItem key={i} value={c.name}>
                            {c.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="treat-hd">
                    <FormControl fullWidth size="small">
                      <Select
                        value={country}
                        displayEmpty
                        onChange={(e) => setCountry(e.target.value)}
                        MenuProps={{
                          PaperProps: {
                            style: { maxHeight: 250 },
                          },
                        }}
                      >
                        <MenuItem value="">
                          <em>Select Country</em>
                        </MenuItem>

                        {Countries?.map((c, i) => (
                          <MenuItem key={i} value={c.name}>
                            {c.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="row">
                {hasPermission("/Enquiries") && (
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleHolisticClick("enquiry")}
                  >
                    <div className="dash-widget1">
                      <div className="dash-widget-bg">
                        <i className="fa fa-user-md"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={count?.all_Enquiry || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Total Enquiries</span>
                      </div>
                    </div>
                  </div>)}
                {hasPermission("/Manage_Appointments") && (
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleHolisticClick("appointment")}
                  >
                    <div className="dash-widget1">
                      <div className="dash-widget-bg">
                        <i
                          className="fa fa-calendar-check-o"
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={count?.totalAppointment || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Total Appointments</span>
                      </div>
                    </div>
                  </div>)}
                {hasPermission("/Manage_Patients") && (
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleHolisticClick("patient")}
                  >
                    <div className="dash-widget1">
                      <div className="dash-widget-bg">
                        <i className="fas fa-user-injured"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={count?.Patients || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Total Patients</span>
                      </div>
                    </div>
                  </div>)}
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleHolisticClick("selectedTreatingInCount")}
                  >
                    <div className="dash-widget1">
                      <div className="dash-widget-bg">
                        <i className="fas fa-user-injured"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={count?.selectedTreatingInCount || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Total Treating In Country</span>
                      </div>
                    </div>
                  </div>
                    <div className="col-md-12">
                  <div className="treat-hd">
                    <h6>Registered Data</h6>
                    <span className="line"></span>
                  </div>
                </div>
                  <div className="row">
                  <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                  <div className="dash-widget1">
                    <div className="dash-widget-bg">
                      <i className="fa-solid fa-hospital"></i>
                    </div>
                    <div className="dash-widget-info1">
                      <h3>
                        <CountUp
                          start={0}
                          end={count?.totalHospital || 0}
                          duration={2}
                        />
                      </h3>
                      <span className="widget-title">Hospitals</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
                  <div className="dash-widget1">
                    <div className="dash-widget-bg">
                      <i className="fa-solid fa-stethoscope"></i>
                    </div>
                    <div className="dash-widget-info1">
                      <h3>
                        <CountUp
                          start={0}
                          end={count?.totalTreatmentCourses || 0}
                          duration={2}
                        />
                      </h3>
                      <span className="widget-title">Treatment</span>
                    </div>
                  </div>
                </div>
                {usrFount === "Admin" ? (
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleHolisticClick("staff")}
                  >
                    <div className="dash-widget1">
                      <div className="dash-widget-bg">
                        <i className="fa fa-users" aria-hidden="true"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={count?.totalStaff || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Total Staff</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                  </div>
              
                <div className="row">
                  <div className="col-md-12">
                    <div className="treat-hd">
                      <h6>Patient Status</h6>
                      <span className="line"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStatusClick("Travelled")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#28a745" }}
                      >
                        <i className="fa fa-plane"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={travelled.Travelled || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Travelled</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStatusClick("Confirmed")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#17a2b8" }}
                      >
                        <i className="fa fa-check-circle"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={travelled.Confirmed || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Confirmed</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStatusClick("Pending")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#ffc107" }}
                      >
                        <i className="fa fa-clock-o"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={travelled.Pending || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Pending</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStatusClick("On Hold")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#fd7e14" }}
                      >
                        <i className="fa fa-pause-circle"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={travelled?.["On Hold"] || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">On Hold</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStatusClick("Treatment Completed")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#0066cc" }}
                      >
                        <i className="fa fa-medkit"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={travelled?.["Treatment Completed"] || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">
                          Treatment Completed
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStatusClick("Cancelled")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#dc3545" }}
                      >
                        <i className="fa fa-times-circle"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={travelled?.["Cancelled"] || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Cancelled</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStatusClick("Local Case")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#6f42c1" }}
                      >
                        <i className="fa fa-home"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={travelled?.["Local Case"] || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Local Case</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStatusClick("Follow Up")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#20c997" }}
                      >
                        <i className="fa fa-phone"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={travelled?.["Follow Up"] || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Follow Up</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStatusClick("Passed Away")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#343a40" }}
                      >
                        <i className="fa fa-heart-o"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={travelled?.["Passed Away"] || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Passed Away</span>
                      </div>
                    </div>
                  </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStatusClick("Arrival")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#343a40" }}
                      >
                        <i className="fa fa-heart-o"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={travelled?.["Arrival"] || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Arrival</span>
                      </div>
                    </div>
                  </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStatusClick("Departing")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#343a40" }}
                      >
                        <i className="fa fa-heart-o"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={travelled?.["Departing"] || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Departing</span>
                      </div>
                    </div>
                  </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                </div>
                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="treat-hd">
                      <h6>Patient Type</h6>
                      <span className="line"></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTypeClick("Private")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#007bff" }}
                      >
                        <i className="fa fa-user"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={typeCounts?.["Private"] || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Private</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTypeClick("Foundation")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#6610f2" }}
                      >
                        <i className="fa fa-building"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={typeCounts?.["Foundation"] || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Foundation</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTypeClick("Insurance")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#00b4d8" }}
                      >
                        <i className="fa fa-shield"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={typeCounts?.["Insurance"] || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">Insurance</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-6 col-sm-6 col-lg-6 col-xl-3"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleTypeClick("Insurance + Private")}
                  >
                    <div className="dash-widget1">
                      <div
                        className="dash-widget-bg"
                        style={{ backgroundColor: "#0096c7" }}
                      >
                        <i className="fa fa-user-shield"></i>
                      </div>
                      <div className="dash-widget-info1">
                        <h3>
                          <CountUp
                            start={0}
                            end={typeCounts?.["Insurance + Private"] || 0}
                            duration={2}
                          />
                        </h3>
                        <span className="widget-title">
                          Insurance + Private
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3"></div>
              </div>
              <div className="row gy-4">
                <div className="col-md-6">
                  <div className="card apointment-card">
                    <div className="card-header">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Appointments per {chartView === "all" ? "All" : chartView}</h5>
                        <div className="dropdown">
                          <button
                            className="submit-btn dropdown-toggle"
                            type="button"
                            id="chartDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                           {chartView === "all" ? "All" : chartView}
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="chartDropdown"
                          >
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
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setChartView("quarterly")}
                              >
                                Quarterly
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setChartView("yearly")}
                              >
                                Yearly
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <ReactApexChart
                      type="bar"
                      height={350}
                      series={responseDataChart.series}
                      options={{
                        chart: { toolbar: { show: false } },
                        plotOptions: { bar: { columnWidth: "55%" } },
                        dataLabels: { enabled: false },
                        xaxis: { categories: responseDataChart.categories },
                        legend: { position: "top" },
                        colors: ["#0ba6df", "#ff0000"],
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
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
                           {chartView === "all" ? "All" : chartView}
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="chartDropdown"
                          >
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
                                onClick={() => {
                                  GetDashboard();
                                  setChartView("Weekly");
                                }}
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
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setChartView("quarterly")}
                              >
                                Quarterly
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setChartView("yearly")}
                              >
                                Yearly
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
                        series={holisticChartData[chartView]?.series || []}
                        options={{
                          chart: {
                            toolbar: { show: false },
                            zoom: { enabled: false },
                          },
                          stroke: { curve: "smooth", width: 3 },
                          markers: {
                            size: 5,
                            strokeWidth: 2,
                            hover: { size: 7 },
                          },
                          dataLabels: { enabled: false },
                          xaxis: {
                            categories:
                              holisticChartData[chartView]?.categories || [],
                          },
                          yaxis: { title: { text: "Total Count" } },
                          legend: { position: "top" },
                          grid: {
                            strokeDashArray: 4,
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card treatment-status-card">
                    <div className="card-header">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Treatments per{chartView === "all" ? "All" : chartView}</h5>
                        <div className="dropdown">
                          <button
                            className="submit-btn dropdown-toggle"
                            type="button"
                            id="chartDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                           {chartView === "all" ? "All" : chartView}
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="chartDropdown"
                          >
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
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setChartView("quarterly")}
                              >
                                Quarterly
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setChartView("yearly")}
                              >
                                Yearly
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
                        series={treatmentData[chartView]?.series}
                        options={{
                          chart: { stacked: true, toolbar: { show: false } },
                          plotOptions: { bar: { columnWidth: "60%" } },
                          dataLabels: { enabled: false },
                          xaxis: {
                            categories: treatmentData[chartView]?.categories,
                          },
                          legend: { position: "top" },
                          colors: [
                            "#0066cc",
                            "#0ba6df",
                            "#069494",
                            "#fda25e",
                            "#002f54",
                          ],
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card treatment-distribution-card">
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
                          {chartView === "all" ? "All" : chartView}
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="chartDropdown"
                          >
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
                                onClick={() => setChartView("monthly")}
                              >
                                Monthly
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setChartView("quarterly")}
                              >
                                Quarterly
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setChartView("yearly")}
                              >
                                Yearly
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <ReactApexChart
                        options={treatmentDistributionData[chartView]?.options}
                        series={treatmentDistributionData[chartView]?.series}
                        type="donut"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card revenue-payment-card">
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
                           {chartView === "all" ? "All" : chartView}
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="chartDropdown"
                          >
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
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setChartView("quarterly")}
                              >
                                Quarterly
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setChartView("yearly")}
                              >
                                Yearly
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
                        series={revenueData[chartView]?.series}
                        options={{
                          chart: { toolbar: { show: false } },
                          stroke: { width: [0, 3], curve: "smooth" },
                          plotOptions: { bar: { columnWidth: "45%" } },
                          markers: { size: 5 },
                          dataLabels: { enabled: false },
                          xaxis: {
                            categories: revenueData[chartView]?.categories,
                          },
                          yaxis: [
                            { title: { text: "Fees Collected (₹)" } },
                            {
                              opposite: true,
                              title: { text: "Due Amount (₹)" },
                            },
                          ],
                          colors: ["#0ba6df", "#fda25e"],
                          legend: { position: "top" },
                          tooltip: {
                            shared: true,
                            y: {
                              formatter: (val) => `₹ ${val.toLocaleString()}`,
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card hospital-performance-card">
                    <div className="card-header">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Top Hospitals by Patients</h5>
                        <div className="dropdown">
                          <button
                            className="submit-btn dropdown-toggle"
                            type="button"
                            id="chartDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                           {chartView === "all" ? "All" : chartView}
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="chartDropdown"
                          >
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
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setChartView("quarterly")}
                              >
                                Quarterly
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => setChartView("yearly")}
                              >
                                Yearly
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      {/* <ReactApexChart
                        type="bar"
                        height={350}
                        series={hospitalPerformanceData[chartView]?.series}
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
                            categories:
                              hospitalPerformanceData[chartView]?.categories,
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
                                if (val === undefined || val === null)
                                  return "";
                                return val.toLocaleString();
                              },
                            },
                          },
                          colors: ["#0ba6df"],
                        }}
                      /> */}
                      <ReactApexChart
                        type="bar"
                        height={350}
                        series={hospitalPerformanceData[chartView]?.series || []}
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
                            categories:
                              hospitalPerformanceData[chartView]?.categories || [],
                            labels: {
                              rotate: -30,
                              rotateAlways: true,
                              trim: true,
                              style: {
                                fontSize: "12px"
                              },
                              // formatter: function (val) {
                              //   return val.length > 20 ? val.substring(0, 20) + "..." : val;
                              // }
                            },
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
                                if (val === undefined || val === null)
                                  return "";
                                return val.toLocaleString();
                              },
                            },
                          },
                          colors: ["#0ba6df"],
                        }}
                      />
                    </div>
                  </div>
                </div>

              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
