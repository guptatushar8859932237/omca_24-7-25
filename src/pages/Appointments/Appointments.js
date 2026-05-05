import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AdminBaseUrl, baseu11, baseurl } from "../../Basurl/Baseurl";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Swal from "sweetalert2";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { usePDF } from "react-to-pdf";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import TableSortLabel from "@mui/material/TableSortLabel";
import ClearIcon from "@mui/icons-material/Clear";
import { toast, ToastContainer } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";
import {
  MenuItem,
  Box,
  Pagination,
  Stack,
  Tabs,
  Tab,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
function TabPanel({ children, value, index }) {
  return value === index && <Box sx={{ p: 2 }}>{children}</Box>;
}

export default function Appointments() {
  const role = localStorage.getItem("Role");
  const [tabValue, setTabValue] = useState(0);
  const [openEdit, setOpenEdit] = useState(false);
const [editData, setEditData] = useState({});
const [editImages, setEditImages] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [searchApiData, setSearchApiData] = useState([]);
  const [page, setPage] = useState(0);
  const [orderByCRM, setOrderByCRM] = useState("");
  const [orderDirectionCRM, setOrderDirectionCRM] = useState("asc");
const [hospitalList, setHospitalList] = useState([]);
  const [orderByAPP, setOrderByAPP] = useState("");
  const [orderDirectionAPP, setOrderDirectionAPP] = useState("asc");
  const [pageAPP, setPageAPP] = useState(0);
  const [rowsPerPageAPP] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dataApp, setDataApp] = useState([]);
  const fullWidth = true;
  const maxWidth = "md"; // xs | sm | md | lg | xl
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [pdfRowLimit, setPdfRowLimit] = useState(null);
  const [statuddropdown, setStatuddropdown] = useState("offline");
  const [filterValue, setFilterValue] = useState("");
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [enquiryAppointments, setEnquiryAppointments] = useState([]);
const [pageENQ, setPageENQ] = useState(0);
const [orderByENQ, setOrderByENQ] = useState("");
const [orderDirectionENQ, setOrderDirectionENQ] = useState("asc");
const [rowsPerPageENQ] = useState(10);
  const handleChange = async (e, i) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authorization token is missing");
      }
      const response = await axios.post(
        `${baseurl}update_appointment_status/${i}`,
        { status: parseInt(e.target.value) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200 || response.status === 201) {
        Swal.fire("Success!", "Status updated successfully!", "success");
        try {
          await getAppointments(); // make sure it's awaited if it’s async
        } catch (refreshError) {
          console.error("Error refreshing appointments:", refreshError);
          toast.error("Failed to refresh appointments!");
        }
        return response.data;
      } else {
        throw new Error("Failed to update status. Please try again!");
      }
    } catch (err) {
      console.error("Full Error:", err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else if (err.message) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  const getEnquiryAppointments = async () => {
  try {
    const response = await axios.get(`${baseurl}get_enquiry_appointments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.status === 200) {
      setEnquiryAppointments(response.data.data);
    }
  } catch (error) {
    console.log("Error fetching enquiry appointments:", error);
  }
};
  const getAppointments = () => {
    axios
      .get(`${baseurl}all_appointment`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          setAppointments(response.data.data);
          setSearchApiData(response.data.data);
        } else {
          console.error("Failed to fetch job titles:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };
 useEffect(() => {
  getAppointments();
  getEnquiryAppointments();
  getAppFromApp();
  getHospitalList(); // 👈 ye missing tha
}, []);
  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(event.target.value);
    setPage(0); // ⭐ IMPORTANT

    if (value === "") {
      setAppointments(searchApiData);
      return;
    }

    const filterResult = searchApiData.filter((item) => {
      const enquiryId = item.patientId?.toLowerCase() || "";
      const country = item.patientName?.toLowerCase() || "";
      const Hospital_name = item.Hospital_name?.toLowerCase() || "";
      const appointement_status = item.appointement_status?.toLowerCase() || "";
      const appointmentId = item.appointmentId?.toLowerCase() || "";
      const disease_name = item.disease_name?.toLowerCase() || "";

      return (
        enquiryId.includes(value) ||
        Hospital_name.includes(value) ||
        appointement_status.includes(value) ||
        disease_name.includes(value) ||
        appointmentId.includes(value) ||
        country.includes(value)
      );
    });
    setAppointments(filterResult);
  };
const getHospitalList = async () => {
  try {
    const res = await axios.post(`${AdminBaseUrl}hospital_list`)
    if (res.status === 200) {
      setHospitalList(res.data.data);
    }
  } catch (err) {
    console.log("Hospital list error:", err);
  }
};
  const handleClearFilter = () => {
    setFilterValue("");
    setAppointments(searchApiData);
    setPage(0); // ⭐ IMPORTANT
  };
 const handleTabChange = (_, newVal) => {
  setTabValue(newVal);

  if (newVal === 0) setPage(0);
  else if (newVal === 1) setPageAPP(0);
  else if (newVal === 2) setPageENQ(0); // ✅ NEW
};
const handleDelete = async (item) => {
  try {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this appointment!",
      icon: "warning",
      showCancelButton: true,
       confirmButtonColor: "#d33",
      cancelButtonColor: "#6e7881",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;
    const response = await axios.post(
      `${baseurl}delete_enqAppointment/${item._id}`
    );
    if (response.status === 200 || response.status === 201) {
      Swal.fire("Deleted!", "Appointment deleted successfully.", "success");

      // 🔁 refresh list after delete
      getEnquiryAppointments();
    } else {
      Swal.fire("Error!", "Failed to delete appointment.", "error");
    }
  } catch (error) {
    console.log(error);
    Swal.fire("Error!", "Something went wrong.", "error");
  }
};
const handleEdit = (item) => {
  console.log(item)
  setEditData({
    ...item,
    hospital_id: Number(item.hospital_id), // ✅ ensure number
  });
  setOpenEdit(true);
};

  const handleSampleFile = () => {
    fetch(`${baseurl}export_appointments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = ""; // Let browser use filename from API
        a.click();
        window.URL.revokeObjectURL(url);
      });
  };
  const downloadPdf = async () => {
    const maxRows = appointments.length || 1;
    Swal.fire({
      title: "Enter number of rows for PDF",
      input: "number",
      inputLabel: `Choose between 1 and ${maxRows}`,
      inputAttributes: {
        min: "1",
        max: maxRows.toString(),
        step: "1",
      },
      inputValue: rowsPerPage,
      showCancelButton: true,
      confirmButtonText: "Generate PDF",
    }).then((result) => {
      if (result.isConfirmed) {
        const userInput = parseInt(result.value, 10);
        if (isNaN(userInput) || userInput < 1 || userInput > maxRows) {
          Swal.fire(
            "Invalid entry",
            `Please enter a number between 1 and ${maxRows}`,
            "error",
          );
          return;
        }
        setPdfRowLimit(userInput);
        setTimeout(() => {
          toPDF();
          setPdfRowLimit(null); // reset to normal view
        }, 300);
      }
    });
  };
  const getAppFromApp = async () => {
    try {
      const response = await axios.post(`${AdminBaseUrl}app_appointments`);
      console.log(response.data.data);
      setDataApp(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setPage(0);
  }, [appointments]);

  useEffect(() => {
    setPageAPP(0);
  }, [dataApp]);
  const handleView = (record) => {
    setSelectedRecord(record);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const InfoItem = ({ label, value }) => (
    <div className="">
      <h6>{label}</h6>
      <p>{value || "-"}</p>
    </div>
  );
  const sortData = (data, field, direction) => {
    return [...data].sort((a, b) => {
      let valA = a[field];
      let valB = b[field];
      if (field === "appointment_Date" || field === "apt_on") {
        return direction === "asc"
          ? new Date(valA) - new Date(valB)
          : new Date(valB) - new Date(valA);
      }
      if (field === "paid_amount") {
        return direction === "asc"
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      }
      if (typeof valA === "string") {
        return direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return 0;
    });
  };
  const handleUpdate = async () => {
  try {
    const formData = new FormData();
    formData.append("appointmentId", editData._id);
    formData.append("health_issue", editData.health_issue);
    formData.append("discussionNotes", editData.discussionNotes);
    formData.append("appointment_Date", editData.appointment_Date);
    formData.append("appointment_Time", editData.appointment_Time);
formData.append("hospital_id", editData.hospital_id);
formData.append("hospitalName", editData.hospitalName);
formData.append("treatment_id", editData.treatment_id);
formData.append("treatment_name", editData.treatment_name);
    editImages.forEach((file) => {
      formData.append("reports", file);
    });
    console.log(formData)
    const res = await axios.post(
      `${baseurl}update_enquiry_appointment`,formData);

    if (res.data.success) {
      Swal.fire("Success", "Updated Successfully", "success");
      setOpenEdit(false);
      getEnquiryAppointments(); // refresh
    }
  } catch (err) {
    console.log(err);
    Swal.fire("Error", "Update Failed", "error");
  }
};
  const handleSortCRM = (field) => {
    const isAsc = orderByCRM === field && orderDirectionCRM === "asc";
    const direction = isAsc ? "desc" : "asc";

    setOrderByCRM(field);
    setOrderDirectionCRM(direction);

    const sorted = sortData(appointments, field, direction);
    setAppointments(sorted);
  };
  const handleSortAPP = (field) => {
    const isAsc = orderByAPP === field && orderDirectionAPP === "asc";
    const direction = isAsc ? "desc" : "asc";
    setOrderByAPP(field);
    setOrderDirectionAPP(direction);
    const sorted = sortData(dataApp, field, direction);
    setDataApp(sorted);
  };
  const handleSortENQ = (field) => {
  const isAsc = orderByENQ === field && orderDirectionENQ === "asc";
  const direction = isAsc ? "desc" : "asc";

  setOrderByENQ(field);
  setOrderDirectionENQ(direction);

  const sorted = sortData(enquiryAppointments, field, direction);
  setEnquiryAppointments(sorted);
};

const handleEnqStatusChange = async (e, appointmentId) => {
  try {
    console.log(e.target.value)
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${baseurl}update_enqAppointment_status/${appointmentId}`,
      { status: e.target.value }
    );

    if (res.status === 200 || res.status === 201) {
      Swal.fire("Success!", "Status updated successfully!", "success");

      // refresh data
      getEnquiryAppointments();
    }
  } catch (err) {
    console.log(err);
    toast.error("Failed to update status");
  }
};
  return (
    <>
      <div className="page-wrapper" style={{marginTop:"70px"}}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 2,
            marginTop: "10px",
          }}
        >
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab
              label="Appointments By CRM"
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                fontFamily: "Rubik",
                color: "##666",
              }}
            />

            <Tab
              label="Appointments By APP"
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                fontFamily: "Rubik",
                color: "#666",
              }}
            />
            <Tab label="Enquiry Appointments" sx={{
                fontSize: "12px",
                fontWeight: "bold",
                fontFamily: "Rubik",
                color: "#666",
              }} />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="country-top">
                  <div className="">
                    <h4 className="page-title mb-0">Manage Appointments</h4>
                  </div>
                  <div className="search-btn-main">
                    <div className="">
                      <TextField
                        sx={{ width: "100%" }}
                        className="field-count"
                        label="Search"
                        id="outlined-size-small"
                        size="small"
                        value={filterValue}
                        onChange={(e) => handleFilter(e)}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              className="input-set"
                            >
                              {filterValue && (
                                <IconButton
                                  onClick={handleClearFilter}
                                  edge="end"
                                >
                                  <ClearIcon />
                                </IconButton>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <button
                      onClick={handleSampleFile}
                      className="add-button mx-1"
                    >
                      <span>
                        <i className="fa fa-file"></i>
                      </span>
                      Export File
                    </button>
                    {role === "Admin" ? (
                      <button onClick={downloadPdf} className="add-button mx-1">
                        <span>
                          <i className="fa fa-file-pdf-o"></i>
                        </span>
                        Pdf
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="main_content">
              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <TableContainer
                      component={Paper}
                      style={{ overflowX: "auto" }}
                      ref={targetRef}
                    >
                      <Table
                        stickyHeader
                        aria-label="sticky table"
                        className="table-no-card"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Sr.No.</TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderByCRM === "patientId"}
                                direction={
                                  orderByCRM === "patientId"
                                    ? orderDirectionCRM
                                    : "asc"
                                }
                                onClick={() => handleSortCRM("patientId")}
                              >
                                Patient ID
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderByCRM === "patientName"}
                                direction={
                                  orderByCRM === "patientName"
                                    ? orderDirectionCRM
                                    : "asc"
                                }
                                onClick={() => handleSortCRM("patientName")}
                              >
                                Patient Name
                              </TableSortLabel>
                            </TableCell>
                            {/* <TableCell>Disease Name</TableCell> */}
                            <TableCell>
                              <TableSortLabel
                                active={orderByCRM === "disease_name"}
                                direction={
                                  orderByCRM === "disease_name"
                                    ? orderDirectionCRM
                                    : "asc"
                                }
                                onClick={() => handleSortCRM("disease_name")}
                              >
                                Disease Name
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderByCRM === "patientName"}
                                direction={
                                  orderByCRM === "patientName"
                                    ? orderDirectionCRM
                                    : "asc"
                                }
                                onClick={() => handleSortCRM("patientName")}
                              >
                                Appointment Id
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderByCRM === "appointment_Date"}
                                direction={
                                  orderByCRM === "appointment_Date"
                                    ? orderDirectionCRM
                                    : "asc"
                                }
                                onClick={() =>
                                  handleSortCRM("appointment_Date")
                                }
                              >
                                Appointment Date
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderByCRM === "Hospital_name"}
                                direction={
                                  orderByCRM === "Hospital_name"
                                    ? orderDirectionCRM
                                    : "asc"
                                }
                                onClick={() => handleSortCRM("Hospital_name")}
                              >
                                Hospital Name
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>
                              <TableSortLabel
                                active={orderByCRM === "appointement_status"}
                                direction={
                                  orderByCRM === "appointement_status"
                                    ? orderDirectionCRM
                                    : "asc"
                                }
                                onClick={() =>
                                  handleSortCRM("appointement_status")
                                }
                              >
                                Status
                              </TableSortLabel>
                            </TableCell>
                            {/* <TableCell>Status</TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {appointments.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} align="center">
                                No data found
                              </TableCell>
                            </TableRow>
                          ) : (
                            (pdfRowLimit
                              ? appointments.slice(0, pdfRowLimit)
                              : appointments.slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage,
                                )
                            ).map((info, i) => (
                              <TableRow
                                role="checkbox"
                                tabIndex={-1}
                                key={info.code}
                              >
                                <TableCell>
                                  {pdfRowLimit
                                    ? i + 1
                                    : pageAPP * rowsPerPageAPP + i + 1}
                                </TableCell>
                                <TableCell>{info.patientId}</TableCell>
                                <TableCell>{info.patientName}</TableCell>
                                <TableCell>{info.disease_name}</TableCell>
                                <TableCell>{info.appointmentId}</TableCell>
                                <TableCell>
                                  {new Date(
                                    info.appointment_Date,
                                  ).toLocaleDateString("en-GB")}
                                </TableCell>
                                <TableCell>{info.Hospital_name}</TableCell>
                                <TableCell>
                                  <FormControl
                                    sx={{ m: 1, minWidth: 120 }}
                                    size="small"
                                    className="cont-main"
                                  >
                                    <Select
                                      value={
                                        info.appointement_status === "Follow-Up"
                                          ? 2
                                          : info.appointement_status ===
                                              "Complete"
                                            ? 3
                                            : info.appointement_status ===
                                                "Cancelled"
                                              ? 4
                                              : "Schedule"
                                      }
                                      onChange={(e) =>
                                        handleChange(e, info.appointmentId)
                                      }
                                      displayEmpty
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                      className="status-direct"
                                    >
                                      <MenuItem value="Schedule" disabled>
                                        Schedule
                                      </MenuItem>
                                      <MenuItem value="2">Follow-Up</MenuItem>
                                      <MenuItem value="3"> Completed</MenuItem>
                                      <MenuItem value="4">Cancelled</MenuItem>
                                    </Select>
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                      {!pdfRowLimit && (
                        <Stack spacing={2} alignItems="end" marginTop={2}>
                          <Pagination
                            count={Math.ceil(appointments.length / rowsPerPage)}
                            page={page + 1}
                            onChange={(event, value) => setPage(value - 1)}
                            shape="rounded"
                            className="page-item"
                          />
                        </Stack>
                      )}
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="delete_appointment"
            className="modal fade delete-modal"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <img
                    src="assets/img/sent.png"
                    alt=""
                    width="50"
                    height="46"
                  />
                  <h3>Are you sure want to delete this Appointment?</h3>
                  <div className="m-t-20">
                    {" "}
                    <a href="#" className="btn btn-white" data-dismiss="modal">
                      Close
                    </a>
                    <button type="submit" className="btn btn-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        {/* ---------- TAB 2 : ANOTHER PAGE ---------- */}
        <TabPanel value={tabValue} index={1}>
          <div className="main_content">
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <TableContainer
                    component={Paper}
                    style={{ overflowX: "auto" }}
                    ref={targetRef}
                  >
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      className="table-no-card"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr.No.</TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderByAPP === "name"}
                              direction={
                                orderByAPP === "name"
                                  ? orderDirectionAPP
                                  : "asc"
                              }
                              onClick={() => handleSortAPP("name")}
                            >
                              Name
                            </TableSortLabel>
                          </TableCell>
                          {/* <TableCell>Patient email</TableCell> */}
                          <TableCell>
                            <TableSortLabel
                              active={orderByAPP === "email"}
                              direction={
                                orderByAPP === "email"
                                  ? orderDirectionAPP
                                  : "asc"
                              }
                              onClick={() => handleSortAPP("email")}
                            >
                              Email
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderByAPP === "city"}
                              direction={
                                orderByAPP === "city"
                                  ? orderDirectionAPP
                                  : "asc"
                              }
                              onClick={() => handleSortAPP("city")}
                            >
                              City
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderByAPP === "health_issue"}
                              direction={
                                orderByAPP === "health_issue"
                                  ? orderDirectionAPP
                                  : "asc"
                              }
                              onClick={() => handleSortAPP("health_issue")}
                            >
                              Disease Name
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderByAPP === "apt_on"}
                              direction={
                                orderByAPP === "apt_on"
                                  ? orderDirectionAPP
                                  : "asc"
                              }
                              onClick={() => handleSortAPP("apt_on")}
                            >
                              Appointment Date
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderByAPP === "paid_amount"}
                              direction={
                                orderByAPP === "paid_amount"
                                  ? orderDirectionAPP
                                  : "asc"
                              }
                              onClick={() => handleSortAPP("paid_amount")}
                            >
                              Paid Amount
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dataApp.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} align="center">
                              No data found
                            </TableCell>
                          </TableRow>
                        ) : (
                          dataApp
                            .slice(
                              pageAPP * rowsPerPageAPP,
                              pageAPP * rowsPerPageAPP + rowsPerPageAPP,
                            )
                            .map((info, i) => (
                              <TableRow
                                role="checkbox"
                                tabIndex={-1}
                                key={info.code}
                              >
                                <TableCell>
                                  {pdfRowLimit
                                    ? i + 1
                                    : pageAPP * rowsPerPageAPP + i + 1}
                                </TableCell>
                                <TableCell>{info.name}</TableCell>
                                <TableCell>{info.email}</TableCell>
                                <TableCell>{info.city}</TableCell>
                                <TableCell>{info.health_issue}</TableCell>
                                <TableCell>
                                  {new Date(info.apt_on).toLocaleDateString(
                                    "en-GB",
                                  )}
                                </TableCell>
                                <TableCell>{info.paid_amount}</TableCell>
                                <TableCell>
                                  <i
                                    className="fa fa-eye"
                                    onClick={() => handleView(info)}
                                    style={{ cursor: "pointer" }}
                                  ></i>
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                    {!pdfRowLimit && (
                      <Stack spacing={2} alignItems="end" marginTop={2}>
                        <Pagination
                          count={Math.ceil(dataApp.length / rowsPerPageAPP)}
                          page={pageAPP + 1}
                          onChange={(event, value) => setPageAPP(value - 1)}
                          shape="rounded"
                          className="page-item"
                        />
                      </Stack>
                    )}
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
       <TabPanel value={tabValue} index={2}>
  <div className="main_content">
    <div className="row">
      <div className="col-md-12">
        <div className="table-responsive">
          <TableContainer component={Paper} style={{ overflowX: "auto" }}>
            <Table stickyHeader className="table-no-card">

              {/* ✅ TABLE HEADER */}
              <TableHead>
                <TableRow>
                  <TableCell>Sr.No.</TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={orderByENQ === "patientName"}
                      direction={orderDirectionENQ}
                      onClick={() => handleSortENQ("patientName")}
                    >
                      Patient Name
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={orderByENQ === "hospitalName"}
                      direction={orderDirectionENQ}
                      onClick={() => handleSortENQ("hospitalName")}
                    >
                      Hospital Name
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={orderByENQ === "health_issue"}
                      direction={orderDirectionENQ}
                      onClick={() => handleSortENQ("health_issue")}
                    >
                      Health Issue
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={orderByENQ === "appointment_Date"}
                      direction={orderDirectionENQ}
                      onClick={() => handleSortENQ("appointment_Date")}
                    >
                      Appointment Date
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={orderByENQ === "appointment_Time"}
                      direction={orderDirectionENQ}
                      onClick={() => handleSortENQ("appointment_Time")}
                    >
                      Time
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>Notes</TableCell>
                  <TableCell>Reports</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              {/* ✅ TABLE BODY */}
              <TableBody>
                {enquiryAppointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No data found
                    </TableCell>
                  </TableRow>
                ) : (
                  enquiryAppointments
                    .slice(
                      pageENQ * rowsPerPageENQ,
                      pageENQ * rowsPerPageENQ + rowsPerPageENQ
                    )
                    .map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          {pageENQ * rowsPerPageENQ + i + 1}
                        </TableCell>

                        <TableCell>{item?.patientName}</TableCell>
                        <TableCell>{item?.hospitalName.slice(0,20)+"..."}</TableCell>
                        <TableCell>{item?.health_issue}</TableCell>

                        <TableCell>
                          {new Date(item?.appointment_Date).toLocaleDateString("en-GB")}
                        </TableCell>

                        <TableCell>{item?.appointment_Time}</TableCell>

                      <TableCell>
  {item?.discussionNotes
    ? item.discussionNotes.slice(0, 20) + "..."
    : "-"}
</TableCell>

                        {/* ✅ Reports */}
                        <TableCell>
                          {item.reports?.length > 0 ? (
                            item.reports.map((file, idx) => (
                              <div key={idx}>
                                <a href={file} target="_blank" rel="noreferrer">
                                  View
                                </a>
                              </div>
                            ))
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
  <FormControl size="small" sx={{ minWidth: 120 }} size="small"
                                    className="cont-main">
    <Select
    className="status-direct"
      value={
        item.status 
      }
      onChange={(e) => handleEnqStatusChange(e, item._id)}
    >
      <MenuItem value='Pending'>Pending</MenuItem>
      <MenuItem value='Schedule'>Schedule</MenuItem>
      <MenuItem value='Follow-Up'>Follow-Up</MenuItem>
      <MenuItem value='Completed'>Completed</MenuItem>
      <MenuItem value='Cancelled'>Cancelled</MenuItem>
    </Select>
  </FormControl>
</TableCell>
                        <TableCell>
  <i
    className="fa fa-edit"
    style={{ cursor: "pointer", color: "#0ba6df" }}
    onClick={() => handleEdit(item)}
  ></i>
  <i
    className="fa fa-trash ms-1"
    style={{ cursor: "pointer", color: "#ff0000" }}
    onClick={() => handleDelete(item)}
  ></i>
</TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>

            {/* ✅ PAGINATION SAME STYLE */}
            <Stack spacing={2} alignItems="end" marginTop={2}>
              <Pagination
                count={Math.ceil(enquiryAppointments.length / rowsPerPageENQ)}
                page={pageENQ + 1}
                onChange={(e, val) => setPageENQ(val - 1)}
                shape="rounded"
                className="page-item"
              />
            </Stack>
          </TableContainer>
        </div>
      </div>
    </div>
  </div>
</TabPanel>
<Dialog   open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
  <div className="main-card-header "  style={{
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 10,
  }}>
    <h6>Edit Appointment</h6>
    <div className="cross-icon" onClick={() => setOpenEdit(false)}>
      <i className="fa-solid fa-xmark"></i>
    </div>
  </div>

  <DialogContent  sx={{
    maxHeight: "70vh",   // 👈 थोड़ा बढ़ा दो
    overflowY: "auto",
  }}>
    <Box className="contact-form">
<FormControl fullWidth size="small">
  <label>Select Hospital</label>

<Select
  value={editData.hospital_id || ""}
  onChange={(e) => {
    const selectedId = e.target.value;

    const selectedHospital = hospitalList.find(
      (item) => item.id === selectedId
    );

    setEditData((prev) => ({
      ...prev,
      hospital_id: selectedId,
      hospitalName: selectedHospital?.name || "",
    }));
  }}
>
  {hospitalList?.map((item) => (
    <MenuItem
      key={ item.id}
      value={ item.id}   
    >
      { item.name}
    </MenuItem>
  ))}
</Select>
</FormControl>
      <div className="field-set">
        <label>Health Issue</label>
        <input
          type="text"
          className="form-control"
          value={editData.health_issue || ""}
          onChange={(e) =>
            setEditData({ ...editData, health_issue: e.target.value })
          }
        />
      </div>

      <div className="field-set">
        <label>Date</label>
        <input
  type="date"
  className="form-control"
  value={editData.appointment_Date?.split("T")[0] || ""}
  onChange={(e) =>
    setEditData({ ...editData, appointment_Date: e.target.value })
  }
/>
      </div>

      <div className="field-set">
        <label>Time</label>
        <input
  type="time"
  className="form-control"
  value={editData.appointment_Time?.slice(0, 5) || ""}
  onChange={(e) =>
    setEditData({ ...editData, appointment_Time: e.target.value })
  }
/>
      </div>

      <div className="field-set">
        <label>Notes</label>
        <textarea
          className="form-control"
          value={editData.discussionNotes || ""}
          onChange={(e) =>
            setEditData({ ...editData, discussionNotes: e.target.value })
          }
        />
      </div>

      {/* Upload */}
      <div className="field-set">
        <label>Upload Reports</label>
        <input
          type="file"
          multiple
          className="form-control"
          onChange={(e) => setEditImages(Array.from(e.target.files))}
        />
      </div>

    </Box>
  </DialogContent>

  <DialogActions>
    <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
    <button className="add-button" onClick={handleUpdate}>
      Update
    </button>
  </DialogActions>
</Dialog>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <div className="main-card-header">
            <div className="top-fixed-hd">
              <div className="note-hd">
                <h6>Detail's</h6>
              </div>
              <div className="cross-icon" onClick={handleClose}>
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
          </div>
          <DialogContent className="main-box view-table-detail">
            {selectedRecord && (
              <Box>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-4">
                            <InfoItem
                              label="Name"
                              value={selectedRecord.name}
                            />
                          </div>
                          <div className="col-md-4">
                            <InfoItem
                              label="Email"
                              value={selectedRecord.email}
                            />
                          </div>
                          <div className="col-md-4">
                            <InfoItem
                              label="Phone Number"
                              value={selectedRecord.phone}
                            />
                          </div>
                          <div className="col-md-4">
                            <InfoItem
                              label="Appointment Type"
                              value={selectedRecord.apt_type}
                            />
                          </div>
                          <div className="col-md-4">
                            <InfoItem
                              label="City"
                              value={selectedRecord.city}
                            />
                          </div>
                          <div className="col-md-4">
                            <InfoItem
                              label="Country"
                              value={selectedRecord.country}
                            />
                          </div>
                          <div className="col-md-4">
                            <InfoItem
                              label="Doctor"
                              value={selectedRecord.doctor}
                            />
                          </div>
                          <div className="col-md-4">
                            <InfoItem
                              label="Health Issue"
                              value={selectedRecord.health_issue}
                            />
                          </div>
                          <div className="col-md-4">
                            <InfoItem
                              label="Home Visit Address"
                              value={selectedRecord.home_visit_address}
                            />
                          </div>
                          <div className="col-md-4">
                            <InfoItem
                              label="Paid Amount"
                              value={selectedRecord.paid_amount}
                            />
                          </div>
                          <div className="col-md-4">
                            <InfoItem
                              label="Treatment"
                              value={selectedRecord.treatment}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Box>
            )}
          </DialogContent>
        </Dialog>
        <ToastContainer />
      </div>
    </>
  );
}
