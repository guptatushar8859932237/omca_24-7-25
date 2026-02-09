import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
// components/Loader.jsx
import CircularProgress from "@mui/material/CircularProgress";
import { GetAllPatients } from "../../reducer/PatientsSlice";
import { useNavigate } from "react-router-dom";
import { DeletePatient } from "../../reducer/PatientsSlice";
import Swal from "sweetalert2";
import { StatusPatient } from "../../reducer/PatientsSlice";
import { GetAllTreatment } from "../../reducer/TreatmentSlice";
import axios from "axios";
import { baseurl } from "../../Basurl/Baseurl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import {
  Dialog,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import { usePDF } from "react-to-pdf";
import Loader from "../../components/Loader";
export default function Patient() {
  const role = localStorage.getItem("Role");
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(true);
  const [page, setPage] = useState(1);
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(25);
  // const [filterValue, setFilterValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [onVaue, setOnVaue] = useState("");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [openfilter, setOpenFilter] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => state.patient);
  const { patient, loading, error } = useSelector((state) => state.patient);
  const { Treatment } = useSelector((state) => state.Treatment);
  const [seekerStatus, setSeekerStatus] = React.useState({});
  const [treatmentname, setTreatmentname] = useState([]);
  const { toPDF, targetRef } = usePDF({ filename: "Patient.pdf" });
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [pdfRowLimit, setPdfRowLimit] = useState(null);
  console.log(Treatment);
  const [report, setReport] = useState({
    country: " ",
    gender: " ",
    age: " ",
  });
  const submitInputdata = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };
  const handleJobTitleChange = (event, value) => {
    setSelectedJobTitle(value);
  };
  useEffect(() => {
    dispatch(GetAllTreatment());
  }, [dispatch]);
  useEffect(() => {
    if (Treatment) {
      setTreatmentname(Treatment);
    }
  }, [Treatment]);

  useEffect(() => {
    dispatch(
      GetAllPatients({
        page,
        limit: rowsPerPage,
        search: searchTerm,
      }),
    );
  }, [dispatch, page, rowsPerPage, searchTerm]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // reset pagination on search
  };
  useEffect(() => {
    if (patient) {
      setRows(patient);
      setSearchApiData(patient);
    }
  }, [patient]);
  console.log(patient);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1); // ✅ backend page 1-based
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const EditButton = (e, id) => {
    navigate("/Admin/edit-patient", {
      state: {
        patientId: id,
      },
    });
  };
  const PatientDetail = (e, id, enq) => {
    navigate("/Admin/Patient-Detail", {
      state: {
        patientId: id,
        enqId: enq,
      },
    });
  };
  const handledelet = (e, patientId) => {
    e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await dispatch(DeletePatient({ id: patientId })).unwrap();

            await dispatch(
              GetAllPatients({
                page,
                limit: rowsPerPage,
                search: searchTerm,
              }),
            );

            Swal.fire("Deleted!", "Patient has been deleted.", "success");
          } catch (err) {
            Swal.fire("Error!", err?.message || "An error occurred", "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "info",
          });
        }
      });
  };

  // const handledelet = (e, patientId) => {
  //   e.preventDefault();
  //   const swalWithBootstrapButtons = Swal.mixin({
  //     customClass: {
  //       confirmButton: "btn btn-success",
  //       cancelButton: "btn btn-danger",
  //     },
  //     buttonsStyling: false,
  //   });
  //   swalWithBootstrapButtons
  //     .fire({
  //       title: "Are you sure?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, delete it!",
  //       cancelButtonText: "No, cancel!",
  //       reverseButtons: true,
  //     })
  //     .then((result) => {
  //       if (result.isConfirmed) {
  //         dispatch(DeletePatient({ id: patientId }))
  //           .unwrap()
  //           .then(() => {
  //               dispatch(
  // GetAllPatients({
  //   page,
  //   limit: rowsPerPage,
  //   search: searchTerm,
  // }))
  //           })
  //           .then((newData) => {
  //             Swal.fire("Deleted!", "Patient has been deleted.", "success");
  //             setRows(newData.payload);
  //           })
  //           .catch((err) => {
  //             Swal.fire("Error!", err?.message || "An error occurred", "error");
  //           });
  //       } else if (result.dismiss === Swal.DismissReason.cancel) {
  //         swalWithBootstrapButtons.fire({
  //           title: "Cancelled",
  //           icon: "error",
  //         });
  //       }
  //     });
  // };
  const handleChange = (event, id) => {
    const { value } = event.target;
    setSeekerStatus(value);
  };
  const handleClickOpen = async (e, id) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        StatusPatient({ id: id, status: Number(seekerStatus) }),
      ).unwrap();
      Swal.fire("Success!", "Patient details updated successfully.", "success");
      dispatch(
        GetAllPatients({
          page,
          limit: rowsPerPage,
          search: searchTerm,
        }),
      );
    } catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  };
  const getReportData = () => {
    axios
      .get(
        `${baseurl}exportfilteredpatient/${localStorage.getItem(
          "_id",
        )}?gender=${encodeURIComponent(
          report.gender.trim(),
        )}&treatment_name=${encodeURIComponent(
          selectedJobTitle.trim(),
        )}&age=${encodeURIComponent(
          report.age.trim(),
        )}&country=${encodeURIComponent(report.country.trim())}`,
        {
          responseType: "blob",
        },
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `report_${report}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        Swal.fire(
          "Error",
          `No candidates found for the jobs posted by this client`,
          "error",
        );
      })
      .finally(() => {});
  };
  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const enquiryId = item.patientId?.toLowerCase() || "";
        const patientNumber = item.patientNumber?.toLowerCase() || "";
        const emailMatches = item.email.toLowerCase();
        const name = item.patient_name?.toLowerCase() || "";
        const p_status = item.p_status?.toLowerCase() || "";
        const contact = item?.emergency_contact
          ? item.emergency_contact.toString().toLowerCase()
          : "";
        const country = item.country?.toLowerCase() || "";
        const patientdesiese =
          item.patient_disease[0].disease_name?.toLowerCase() || "";
        const searchValue = event.target.value.toLowerCase();
        return (
          enquiryId.includes(searchValue) ||
          patientNumber.includes(searchValue) ||
          country.includes(searchValue) ||
          patientdesiese.includes(searchValue) ||
          p_status.includes(searchValue) ||
          contact.includes(searchValue) ||
          name.includes(searchValue) ||
          emailMatches.includes(searchValue)
        );
      });
      setRows(filterResult);
    }
    setFilterValue(event.target.value);
  };
  const handleClearFilter = () => {
    setFilterValue("");
    setRows(searchApiData);
  };
  console.log(seekerStatus);
  const handleSampleFile = async () => {
    try {
      const response = await axios.get(`${baseurl}export_patients`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Sample_Patient.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return response.data;
    } catch (err) {
      console.error(
        "Error downloading the sample file:",
        err.response?.data?.message || err.message,
      );
      throw err;
    }
  };
  const downloadPdf = async () => {
    const maxRows = rows.length || 1;
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
          setPdfRowLimit(null);
        }, 300);
      }
    });
  };
  const handleChangtype = async (e, i) => {
    console.log(e, i);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      const response = await axios.post(
        `${baseurl}changePatientTypeStatus/${i}`,
        { p_status: e.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200 || response.status === 201) {
        dispatch(
          GetAllPatients({
            page,
            limit: rowsPerPage,
            search: searchTerm,
          }),
        );

        Swal.fire(
          "Success!",
          "patient status updated successfully!",
          "success",
        );
        dispatch(
          GetAllPatients({
            page,
            limit: rowsPerPage,
            search: searchTerm,
          }),
        );

        try {
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
  const handleChangefffff = async (e, i) => {
    console.log(e, i);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      const response = await axios.post(
        `${baseurl}changePatientStatus/${i}`,
        { p_status: e.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200 || response.status === 201) {
        dispatch(
          GetAllPatients({
            page,
            limit: rowsPerPage,
            search: searchTerm,
          }),
        );

        Swal.fire(
          "Success!",
          "patient status updated successfully!",
          "success",
        );
        dispatch(
          GetAllPatients({
            page,
            limit: rowsPerPage,
            search: searchTerm,
          }),
        );

        try {
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
  const handleclickondata = () => {
    setShowActions(true);
    dispatch(
      GetAllPatients({
        page,
        limit: rowsPerPage,
        search: searchTerm,
      }),
    );
  };
  const handleclickpostdatadesltes = async () => {
    setShowActions(false);
    try {
      const response = await axios.get(`${baseurl}getAllDeletedPatients`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (response) {
        console.log(response.data);
        setRows(response.data.data);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Filterdata = () => {
    console.log("filter data");
    setOpenFilter(true);
  };
  const closeFitler = () => {
    console.log("filter data");
    setOpenFilter(false);
  };
  const filterdataapi = async () => {
    console.log(onVaue);
    try {
      const response = await axios.get(
        `${baseurl}get_patients_by_status?p_status=${onVaue}`,
      );
      console.log(response.data.data);
      setRows(response.data.data);
      setSearchApiData(response.data.data);
      closeFitler();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <React.Fragment>
              <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={openfilter}
                onClose={closeFitler}
              >
                <div className="main-card-header">
                  <div className="note-hd">
                    <h6>Filter</h6>
                  </div>
                  <div className="cross-icon" onClick={closeFitler}>
                    <i class="fa-solid fa-xmark"></i>
                  </div>
                </div>
                <DialogContent className="main-box">
                  <Box
                    noValidate
                    component="form"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "fit-content",
                    }}
                    className="contact-form"
                  >
                    <Box>
                      <TableCell>
                        <FormControl
                          sx={{ m: 1, minWidth: 500 }}
                          size="large"
                          className="cont-main"
                        >
                          <Select
                            placeholder="Filter data"
                            displayEmpty
                            onChange={(e) => {
                              setOnVaue(e.target.value);
                            }}
                            inputProps={{
                              "aria-label": "Without label",
                            }}
                            className="status-direct"
                          >
                            <em>select Data</em>
                            <MenuItem value="Foundation">Foundation</MenuItem>
                            <MenuItem value="Private">Private</MenuItem>
                            <MenuItem value="Travelled"> Travelled</MenuItem>
                            <MenuItem value="Confirmed">Confirmed</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="On Hold">On Hold</MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                            <MenuItem value="Local Case">Local Case</MenuItem>
                            <MenuItem value="Follow Up">Follow Up</MenuItem>
                            <MenuItem value="Passed Away">Passed Away</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <div className="d-flex justify-content-center">
                        <button
                          className="add-button ms-2"
                          onClick={(e) => {
                            e.preventDefault();
                            filterdataapi();
                          }}
                        >
                          Filter Data
                        </button>
                      </div>
                    </Box>
                  </Box>
                </DialogContent>
              </Dialog>
            </React.Fragment>
            <div className="col-md-12">
              <div className="country-top">
                <div className="">
                  <h4 className="page-title mb-0">Manage Patients</h4>
                </div>
                <div className="d-flex">
                  <div className="search-btn-main">
                    <div className="mr-3">
                      {/* <TextField
                        sx={{ width: "100%" }}
                        label="Search"
                        id="outlined-size-small"
                        size="small"
                        className="field-count"
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
                      /> */}
                      <TextField
                        label="Search"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearch}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              {searchTerm && (
                                <IconButton onClick={() => setSearchTerm("")}>
                                  <ClearIcon />
                                </IconButton>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                  </div>
                  <button onClick={handleSampleFile} className="add-button ">
                    <span>
                      <i className="fa fa-file mx-1"></i>
                    </span>
                    Export File
                  </button>
                  <button onClick={Filterdata} className="add-button ms-2">
                    <span>
                      <i className="fa fa-filter"></i>
                    </span>
                    Filter
                  </button>
                  {role === "Admin" ? (
                    <button onClick={downloadPdf} className="add-button ms-2">
                      <span>
                        <i className="fa fa-file-pdf-o"></i>
                      </span>
                      PDF
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
              <div className="action-icon d-flex justify-content-end mb-3">
                {localStorage.getItem("Role") === "Admin" ? (
                  showActions === true ? (
                    <button
                      className="add-button"
                      onClick={handleclickpostdatadesltes}
                    >
                      Deleted Data
                    </button>
                  ) : (
                    <button className="add-button" onClick={handleclickondata}>
                      Patient
                    </button>
                  )
                ) : null}
              </div>
              <div className="col-md-12">
                <div className="table-responsive" ref={targetRef}>
                  <TableContainer
                    component={Paper}
                    style={{ overflowX: "auto" }}
                  >
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      className="table-no-card"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr.No.</TableCell>
                          {showActions === false ? (
                            <>
                              <TableCell>Deleted By</TableCell>
                              <TableCell>Deleted BY Email</TableCell>
                              <TableCell>Deleted Time</TableCell>
                              <TableCell>Deleted Date</TableCell>
                            </>
                          ) : (
                            ""
                          )}
                          <TableCell>Patient Id</TableCell>
                          <TableCell>Patient Name</TableCell>
                          <TableCell>Emergency contact</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Country</TableCell>
                          <TableCell>Patient Disease</TableCell>
                          {showActions === true ? (
                            <>
                              <TableCell>Patient Type</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Action</TableCell>
                            </>
                          ) : (
                            ""
                          )}
                        </TableRow>
                      </TableHead>
                      {loading ? (
                        <Loader />
                      ) : (
                        <TableBody>
                          {rows.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={15} align="center">
                                No data found
                              </TableCell>
                            </TableRow>
                          ) : (
                            rows.map((info, i) => (
                              <TableRow key={info.patientId}>
                                <TableCell>
                                  {(page - 1) * rowsPerPage + i + 1}
                                </TableCell>
                                {showActions === false ? (
                                  <>
                                    <TableCell>
                                      {info?.deletedBy?.name}
                                    </TableCell>
                                    <TableCell>
                                      {info?.deletedBy?.email}
                                    </TableCell>
                                    <TableCell>
                                      {new Date(
                                        info.deletedAt,
                                      ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </TableCell>
                                    <TableCell>
                                      {new Date(
                                        info?.deletedAt,
                                      ).toLocaleDateString("en-GB")}
                                    </TableCell>
                                  </>
                                ) : (
                                  ""
                                )}
                                <TableCell>
                                  {info.patientNumber || info.patientId}
                                </TableCell>
                                <TableCell
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) =>
                                    PatientDetail(
                                      e,
                                      info.patientId,
                                      info.enquiryId,
                                    )
                                  }
                                >
                                  {info.patient_name}
                                </TableCell>
                                <TableCell>
                                  {info.emergency_contact ||
                                    info.emergency_contact_no}
                                </TableCell>
                                <TableCell>
                                  {new Date(info.createdAt).toLocaleDateString(
                                    "en-GB",
                                  )}
                                </TableCell>
                                <TableCell>{info.email}</TableCell>
                                <TableCell>{info.country}</TableCell>
                                <TableCell>
                                  {info.patient_disease
                                    ?.map((d) => d.disease_name)
                                    .join(", ")}
                                </TableCell>

                                {showActions === true ? (
                                  <>
                                    <TableCell>
                                      <FormControl
                                        sx={{ m: 1, minWidth: 120 }}
                                        size="small"
                                        className="cont-main"
                                      >
                                        <Select
                                          value={info.patient_type_new}
                                          onChange={(e) =>
                                            handleChangtype(e, info.patientId)
                                          }
                                          displayEmpty
                                          inputProps={{
                                            "aria-label": "Without label",
                                          }}
                                          className="status-direct"
                                        >
                                          <MenuItem value="Private">
                                            Private
                                          </MenuItem>
                                          <MenuItem value="Foundation">
                                            Foundation
                                          </MenuItem>
                                          <MenuItem value="Insurance">
                                            Insurance
                                          </MenuItem>
                                          <MenuItem value="Insurance + Private">
                                            Insurance + Private
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </TableCell>
                                    <TableCell>
                                      <FormControl
                                        sx={{ m: 1, minWidth: 120 }}
                                        size="small"
                                        className="cont-main"
                                      >
                                        <Select
                                          value={info.p_status}
                                          onChange={(e) =>
                                            handleChangefffff(e, info.patientId)
                                          }
                                          displayEmpty
                                          inputProps={{
                                            "aria-label": "Without label",
                                          }}
                                          className="status-direct"
                                        >
                                          {/* <MenuItem value="Foundation">
                                              Foundation
                                            </MenuItem>
                                            <MenuItem value="Private">
                                              Private
                                            </MenuItem>  */}
                                          <MenuItem value="Travelled">
                                            {" "}
                                            Travelled
                                          </MenuItem>
                                          <MenuItem value="Confirmed">
                                            Confirmed
                                          </MenuItem>
                                          <MenuItem value="Pending">
                                            Pending
                                          </MenuItem>
                                          <MenuItem value="On Hold">
                                            On Hold
                                          </MenuItem>
                                          <MenuItem value="Treatment Completed">
                                            Treatment Completed
                                          </MenuItem>
                                          <MenuItem value="Cancelled">
                                            Cancelled
                                          </MenuItem>
                                          <MenuItem value="Local Case">
                                            Local Case
                                          </MenuItem>
                                          <MenuItem value="Follow Up">
                                            Follow Up
                                          </MenuItem>
                                          <MenuItem value="Passed Away">
                                            Passed Away
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    </TableCell>
                                    <TableCell className="action-icon">
                                      <VisibilityIcon
                                        className="eye-icon"
                                        onClick={(e) =>
                                          PatientDetail(
                                            e,
                                            info.patientId,
                                            info.enquiryId,
                                          )
                                        }
                                      />
                                      <i
                                        className="fa-solid fa-pen-to-square"
                                        onClick={(e) =>
                                          EditButton(e, info.patientId)
                                        }
                                      ></i>
                                      {localStorage.getItem("Role") ===
                                      "Admin" ? (
                                        <i
                                          className="fa-solid fa-trash"
                                          onClick={(e) => {
                                            handledelet(e, info.patientId);
                                          }}
                                        ></i>
                                      ) : (
                                        ""
                                      )}
                                    </TableCell>
                                  </>
                                ) : (
                                  ""
                                )}
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      )}
                    </Table>
                    {!pdfRowLimit && (
                      <Stack spacing={2}>
                        <Pagination
                          className="page-nation"
                          count={pagination.totalPages}
                          page={page}
                          onChange={(event, value) => setPage(value)}
                          color="primary"
                        />
                      </Stack>
                    )}
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
