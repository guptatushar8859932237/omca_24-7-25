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
import {
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import { usePDF } from "react-to-pdf";
export default function Patient() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const { patient, loading, error } = useSelector((state) => state.patient);
  const { Treatment } = useSelector((state) => state.Treatment);
  const [seekerStatus, setSeekerStatus] = React.useState({});
  const [treatmentname, setTreatmentname] = useState([]);
   const { toPDF, targetRef } = usePDF({filename: 'Patient.pdf'});
  const [selectedJobTitle, setSelectedJobTitle] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [pdfRowLimit,setPdfRowLimit]=useState(null)
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
    dispatch(GetAllPatients());
    console.log(error, patient);
  }, [dispatch]);

  useEffect(() => {
    if (patient) {
      setRows(patient);
      setSearchApiData(patient);
    }
  }, [patient]);
  console.log(patient);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(DeletePatient({ id: patientId }))
            .unwrap() // If using Redux Toolkit, unwrap to handle success/failure easily
            .then(() => {
              return dispatch(GetAllPatients());
            })
            .then((newData) => {
              Swal.fire("Deleted!", "Patient has been deleted.", "success");
              setRows(newData.payload); // Update rows with the latest data
            })
            .catch((err) => {
              Swal.fire("Error!", err?.message || "An error occurred", "error");
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            // text: "Patient data is safe :)",
            icon: "error",
          });
        }
      });
  };

  const handleChange = (event, id) => {
    const { value } = event.target;
    setSeekerStatus(value);
  };

  const handleClickOpen = async (e, id) => {
    e.preventDefault(); // Prevent default behavior of the event

    try {
      const result = await dispatch(
        StatusPatient({ id: id, status: Number(seekerStatus) })
      ).unwrap();
      Swal.fire("Success!", "Patient details updated successfully.", "success");
      dispatch(GetAllPatients());
    } catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  };

  const getReportData = () => {
    axios
      .get(
        `${baseurl}exportfilteredpatient/${localStorage.getItem(
          "_id"
        )}?gender=${encodeURIComponent(
          report.gender.trim()
        )}&treatment_name=${encodeURIComponent(
          selectedJobTitle.trim()
        )}&age=${encodeURIComponent(
          report.age.trim()
        )}&country=${encodeURIComponent(report.country.trim())}`,
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        // Create a URL for the ip
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        // You can set a default file name here
        link.setAttribute("download", `report_${report}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove(); // Clean up after download
      })
      .catch((error) => {
        Swal.fire(
          "Error",
          `No candidates found for the jobs posted by this client`,
          "error"
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
        const emailMatches = item.email.toLowerCase();
        const name = item.patient_name?.toLowerCase() || "";
        const contact = item?.emergency_contact
          ? item.emergency_contact.toString().toLowerCase()
          : "";
        const country = item.country?.toLowerCase() || "";
        const patientdesiese =
          item.patient_disease[0].disease_name?.toLowerCase() || "";
        const searchValue = event.target.value.toLowerCase();
        return (
          enquiryId.includes(searchValue) ||
          country.includes(searchValue) ||
          patientdesiese.includes(searchValue) ||
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
      link.setAttribute("download", "Sample_Enquiry.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return response.data;
    } catch (err) {
      console.error(
        "Error downloading the sample file:",
        err.response?.data?.message || err.message
      );
      throw err;
    }
  };

  // const downloadPdf = async () => {
  //   try {
  //     const response = await axios.get(`${baseurl}all_patients_pdf`);
  //     console.log(response);
  //     if (response.status === 200) {
  //       console.log("PDF Download Response:", response.data);
  //       Swal.fire("Success", "PDF downloaded successfully", "success");
  //       // If you're actually downloading a file, add file-saving logic here
  //     } else {
  //       Swal.fire(
  //         "Failed",
  //         "Something went wrong while generating PDF",
  //         "error"
  //       );
  //     }
  //   } catch (error) {
  //     console.log("Download error:", error?.response?.data || error);
  //     Swal.fire("Error", "Something went wrong while downloading PDF", "error");
  //   }
  // };

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
                   "error"
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

    const handleChangefffff = async (e, i) => {
      console.log(e,i)
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          throw new Error("Authorization token is missing");
        }
  
        const response = await axios.post(
          `${baseurl}changePatientStatus/${i}`,
          { p_status : e.target.value},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        // If response is OK, show success
        if (response.status === 200 || response.status === 201) {
                   dispatch(GetAllPatients());
          Swal.fire("Success!", "patient status updated successfully!", "success");
  
          try {
            // await getAppointments(); // make sure it's awaited if it’s async
          } catch (refreshError) {
            console.error("Error refreshing appointments:", refreshError);
            toast.error("Failed to refresh appointments!");
          }
  
          return response.data;
        } else {
          // Handle unexpected non-200 responses
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
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="country-top">
                <div className="">
                  <h4 className="page-title mb-0">Manage Patients</h4>
                </div>
                <div className="d-flex">
                  <div className="search-btn-main">
                    <div className="mr-3">
                      <TextField
                        sx={{ width: "100%" }}
                        label="Search By Patient Id and Name"
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
                      />
                    </div>
                  </div>
                  <button onClick={handleSampleFile} className="add-button ">
                    <span>
                      <i className="fa fa-file mx-1"></i>
                    </span>
                    Export File
                  </button>
                  <button
                    onClick={downloadPdf}
                    className="add-button ms-2"
                  >
                    <span>
                      <i className="fa fa-file-pdf-o"></i>
                    </span>
                    PDF
                  </button>
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
                          <TableCell>Patient Id</TableCell>
                          <TableCell>Patient Name</TableCell>
                          <TableCell>Emergency contact</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Country</TableCell>
                          <TableCell>Patient Disease</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} align="center">
                              No data found
                            </TableCell>
                          </TableRow>
                        ) : (
                          (pdfRowLimit?
                         rows.slice(0, pdfRowLimit)
                          : rows.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                        ).map((info, i) => {
                              console.log(info)
                              return(
                                <>
                                <TableRow
                                role="checkbox"
                                tabIndex={-1}
                                key={info.code}
                              >
                                <TableCell>
                          {pdfRowLimit ? i + 1 : page * rowsPerPage + i + 1}
                                </TableCell>
                                <TableCell>
                                  {info?.patientNumber
                                    ? info?.patientNumber
                                    : info.patientId}
                                </TableCell>
                                <TableCell>{info.patient_name}</TableCell>
                                <TableCell>{info.emergency_contact}</TableCell>
                                <TableCell>
                                  {new Date(info.createdAt).toLocaleDateString(
                                    "en-GB"
                                  )}
                                </TableCell>
                                <TableCell>{info.email}</TableCell>
                                <TableCell>{info.country}</TableCell>
                               
                                <TableCell>
                                  {info.patient_disease
                                    .map((item) => item.disease_name)
                                    .join(", ")}
                                </TableCell>
                                 <TableCell>
                                  <FormControl
                                    sx={{ m: 1, minWidth: 120 }}
                                    size="small"
                                    className="cont-main"
                                  >
                                    <Select
                                      value={
                                        info.p_staus	
                                      }
                                      onChange={(e) =>
                                        handleChangefffff(e, info.patientId)
                                      }
                                      displayEmpty
                                      inputProps={{
                                        "aria-label": "Without label",
                                      }}
                                      className="status-direct"
                                      >
                                      <MenuItem value="Foundation" disabled>
                                        Foundation
                                      </MenuItem>
                                      <MenuItem value="Private">Private</MenuItem>
                                      <MenuItem value="Travelled"> Travelled</MenuItem>
                                      <MenuItem value="Confirmed">Confirmed</MenuItem>
                                      <MenuItem value="Pending">Pending</MenuItem>
                                      <MenuItem value="On Hold">On Hold</MenuItem>
                                      <MenuItem value="Cancel">Cancel</MenuItem>
                                      <MenuItem value="Local Case">Local Case</MenuItem>
                                      <MenuItem value="Follow Up">Follow Up</MenuItem>
                                      <MenuItem value="Passed Away">Passed Away</MenuItem>
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
                                        info.enquiryId
                                      )
                                    }
                                  />
                                  <i
                                    className="fa-solid fa-pen-to-square"
                                    onClick={(e) =>
                                      EditButton(e, info.patientId)
                                    }
                                  ></i>
                                  {localStorage.getItem("Role") === "Admin" ? (
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
                              </TableRow>
                                </>
                              )
                            }
                              
                            )
                        )}
                      </TableBody>
                    </Table>
                    {!pdfRowLimit && (
                      <Stack spacing={2}>
                      <Pagination
                        className="page-nation"
                        count={Math.ceil(rows.length / rowsPerPage)}
                        page={page + 1}
                        onChange={(event, value) => setPage(value - 1)}
                        color="primary"
                      />
                    </Stack>)
                      }
                    
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
