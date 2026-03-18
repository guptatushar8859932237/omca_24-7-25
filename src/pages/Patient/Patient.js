import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { GetAllPatients } from "../../reducer/PatientsSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { DeletePatient } from "../../reducer/PatientsSlice";
import Swal from "sweetalert2";
import { StatusPatient } from "../../reducer/PatientsSlice";
import { GetAllTreatment } from "../../reducer/TreatmentSlice";
import TableSortLabel from "@mui/material/TableSortLabel";
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
import { useSearchParams } from "react-router-dom";

export default function Patient() {
  const role = localStorage.getItem("Role");
  const navigate = useNavigate();
  const location = useLocation();
  const [showActions, setShowActions] = useState(true);
  const [page, setPage] = useState(1);
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
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [report, setReport] = useState({
    country: " ",
    gender: " ",
    age: " ",
  });

  const [searchParams] = useSearchParams();

  const statusFromUrl = searchParams.get("status");
  const typeFromUrl = searchParams.get("type");
  const dashboardFilterApplied = useRef(false);
  // Read dashboard filter values ONCE from location.state at mount time.
  // We capture them into a ref so they survive the state-clearing navigate.
  const initialStatusFilter = useRef(location.state?.status || "");
  const initialTypeFilter = useRef(location.state?.type || "");

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
        p_status: statusFromUrl || "",
        patient_type_new: typeFromUrl || "",
      }),
    );
  }, [dispatch, page, rowsPerPage, searchTerm, statusFromUrl, typeFromUrl]);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };
  useEffect(() => {
    if (patient) {
      setRows(patient);
      setSearchApiData(patient);
    }
  }, [patient]);
  const EditButton = (e, id) => {
    navigate("/Admin/edit-patient", {
      state: {
        patientId: id,
      },
    });
  };
  const PatientDetail = (e, id, enq, c, d) => {
    navigate("/Admin/Patient-Detail", {
      state: {
        patientId: id,
        enqId: enq,
        testid: c,
        tratmentlit: d,
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
        setRows(response.data.data);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Filterdata = () => {
    setOpenFilter(true);
  };
  const closeFitler = () => {
    setOpenFilter(false);
  };
  const filterdataapi = async (value, filterType = "status") => {
    console.log("Filtering by:", filterType, value);
    try {
      let response;
      if (filterType === "status") {
        response = await axios.get(
          `${baseurl}get_patients_by_status?p_status=${encodeURIComponent(value)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
      } else if (filterType === "type") {
        response = await axios.get(
          `${baseurl}get_patient_type_new?patient_type_new=${encodeURIComponent(value)}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
      }
      setRows(response.data.data);
      setSearchApiData(response.data.data);
      setOpenFilter(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to filter data");
    }
  };
  const filterdataapiExisting = async () => {
    const statusValues = [
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
    const typeValues = [
      "Private",
      "Foundation",
      "Insurance",
      "Insurance + Private",
    ];
    if (statusValues.includes(onVaue)) {
      await filterdataapi(onVaue, "status");
    } else if (typeValues.includes(onVaue)) {
      await filterdataapi(onVaue, "type");
    }
  };
const handleRequestSort = (property) => {
  const isAsc = orderBy === property && order === "asc";
  const direction = isAsc ? "desc" : "asc";

  setOrder(direction);
  setOrderBy(property);

  const sortedRows = [...rows].sort((a, b) => {
    let valueA = "";
    let valueB = "";

    if (property === "patient_disease") {
      valueA = a.patient_disease?.map(d => d.disease_name).join(", ") || "";
      valueB = b.patient_disease?.map(d => d.disease_name).join(", ") || "";
    } else {
      valueA = a[property] || "";
      valueB = b[property] || "";
    }

    return direction === "asc"
      ? valueA.localeCompare(valueB)
      : valueB.localeCompare(valueA);
  });

  setRows(sortedRows);
};
  // const handleRequestSort = (property) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   const direction = isAsc ? "desc" : "asc";

  //   setOrder(direction);
  //   setOrderBy(property);

  //   const sortedRows = [...rows].sort((a, b) => {
  //     const valueA = a[property] || "";
  //     const valueB = b[property] || "";

  //     if (valueA < valueB) return direction === "asc" ? -1 : 1;
  //     if (valueA > valueB) return direction === "asc" ? 1 : -1;
  //     return 0;
  //   });

  //   setRows(sortedRows);
  // };
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
                    <i className="fa-solid fa-xmark"></i>
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
                            value={onVaue}
                            onChange={(e) => {
                              setOnVaue(e.target.value);
                            }}
                            inputProps={{
                              "aria-label": "Without label",
                            }}
                            className="status-direct"
                          >
                            <MenuItem value="" disabled>
                              <em>Select Filter</em>
                            </MenuItem>

                            <MenuItem
                              disabled
                              style={{ fontWeight: "bold", color: "#666" }}
                            >
                              --- Status ---
                            </MenuItem>
                            <MenuItem value="Travelled">Travelled</MenuItem>
                            <MenuItem value="Confirmed">Confirmed</MenuItem>
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="On Hold">On Hold</MenuItem>
                            <MenuItem value="Treatment Completed">
                              Treatment Completed
                            </MenuItem>
                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                            <MenuItem value="Local Case">Local Case</MenuItem>
                            <MenuItem value="Follow Up">Follow Up</MenuItem>
                            <MenuItem value="Passed Away">Passed Away</MenuItem>

                            <MenuItem
                              disabled
                              style={{ fontWeight: "bold", color: "#666" }}
                            >
                              --- Patient Type ---
                            </MenuItem>
                            <MenuItem value="Foundation">Foundation</MenuItem>
                            <MenuItem value="Private">Private</MenuItem>
                            <MenuItem value="Insurance">Insurance</MenuItem>
                            <MenuItem value="Insurance + Private">
                              Insurance + Private
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <div className="d-flex justify-content-center">
                        <button
                          className="add-button ms-2"
                          onClick={(e) => {
                            e.preventDefault();
                            filterdataapiExisting();
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
                          <TableCell>
                            <TableSortLabel 
                              active={orderBy === "patientNumber"}
                              direction={
                                orderBy === "patientNumber" ? order : "asc"
                              }
                              onClick={() => handleRequestSort("patientNumber")}
                            >
                              Patient Id
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "patient_name"}
                              direction={
                                orderBy === "patient_name" ? order : "asc"
                              }
                              onClick={() => handleRequestSort("patient_name")}
                            >
                              Patient Name
                            </TableSortLabel>
                          </TableCell>
                      <TableCell>
  <TableSortLabel
    active={orderBy === "patient_disease"}
    direction={orderBy === "patient_disease" ? order : "asc"}
    onClick={() => handleRequestSort("patient_disease")}
  >
    Patient Disease
  </TableSortLabel>
</TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "country"}
                              direction={orderBy === "country" ? order : "asc"}
                              onClick={() => handleRequestSort("country")}
                            >
                              Country
                            </TableSortLabel>
                          </TableCell>
                          {showActions === true ? (
                            <>
                             <TableCell>
  <TableSortLabel
    active={orderBy === "patient_type_new"}
    direction={orderBy === "patient_type_new" ? order : "asc"}
    onClick={() => handleRequestSort("patient_type_new")}
  >
    Patient Type
  </TableSortLabel>
</TableCell>
                           <TableCell>
  <TableSortLabel
    active={orderBy === "p_status"}
    direction={orderBy === "p_status" ? order : "asc"}
    onClick={() => handleRequestSort("p_status")}
  >
    Status
  </TableSortLabel>
</TableCell>
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
                            rows.map((info, i) => {
                              return (
                                <TableRow key={info.patientId}>
                                  <TableCell>
                                    {(page - 1) * rowsPerPage + i + 1}
                                  </TableCell>
                                  {showActions === false                                                                                                                                                                                                                                                                                                                                                                                                                          ? (
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
                                        info.id,
                                        info.patient_disease[0].treatment_id,
                                      )
                                    }
                                    title={info.patient_name}
                                  >
                                    {info.patient_name.length > 15
                                      ? info.patient_name.substring(0, 15) +
                                        "..."
                                      : info.patient_name}
                                  </TableCell>
                                  <TableCell
                                    style={{ cursor: "pointer" }}
                                    title={info.patient_disease
                                      ?.map((d) => d.disease_name)
                                      .join(", ")}
                                  >
                                    {(() => {
                                      const diseases = info.patient_disease
                                        ?.map((d) => d.disease_name)
                                        .join(", ");
                                      if (!diseases) return "";
                                      return diseases.length > 15
                                        ? diseases.substring(0, 15) + "..."
                                        : diseases;
                                    })()}
                                  </TableCell>
                                  <TableCell>{info.country}</TableCell>

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
                                              handleChangefffff(
                                                e,
                                                info.patientId,
                                              )
                                            }
                                            displayEmpty
                                            inputProps={{
                                              "aria-label": "Without label",
                                            }}
                                            className="status-direct"
                                          >
                                            <MenuItem value="Travelled">
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
                                              info.id,
                                              info.patient_disease[0]
                                                .treatment_id,
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
                              );
                            })
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
