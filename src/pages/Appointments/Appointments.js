import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../../Basurl/Baseurl";
import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { usePDF } from 'react-to-pdf';
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";
import { MenuItem, Pagination, Stack } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchApiData, setSearchApiData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
    const [pdfRowLimit, setPdfRowLimit] = useState(null);
  const [filterValue, setFilterValue] = useState("");
 const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const EditButton = (e, id) => {
    // navigate("/Admin/edit-patient", {
    //   state: {
    //     patientId: id,
    //   },
    // })
  };
  const PatientDetail = (e, id) => {
    // navigate("/Admin/Patient-Detail", {
    //   state: {
    //     patientId: id,
    //   },
    // })
  };

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
        }
      );

      // If response is OK, show success
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
  }, []);
  const handleFilter = (event) => {
    if (event.target.value === "") {
      setAppointments(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const enquiryId = item.patientId?.toLowerCase() || "";
        // const emailMatches = item.job_Desciption.toLowerCase();
        const country = item.patientName?.toLowerCase() || "";
        const Hospital_name = item.Hospital_name?.toLowerCase() || "";
        const appointement_status =
          item.appointement_status?.toLowerCase() || "";
        const appointmentId = item.appointmentId?.toLowerCase() || "";
        const disease_name = item.disease_name?.toLowerCase() || "";
        const searchValue = event.target.value.toLowerCase();
        // Check if the full name, last name, or email includes the search value
        return (
          enquiryId.includes(searchValue) ||
          Hospital_name.includes(searchValue) ||
          appointement_status.includes(searchValue) ||
          disease_name.includes(searchValue) ||
          appointmentId.includes(searchValue) ||
          country.includes(searchValue)
        );
      });
      setAppointments(filterResult);
    }
    setFilterValue(event.target.value);
  };
  const handleClearFilter = () => {
    setFilterValue("");
    setAppointments(searchApiData);
  };
  const handleSampleFile =async () => {
        try {
      const response = await axios.get(`${baseurl}export_appointments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }, {
        responseType: "blob", 
      });
      console.log(response.data)
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Sample_Enquiry.xlsx"); // File name
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


const downloadPdf  = async () => {
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
  return (
    <>
      <div className="page-wrapper">
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
                      label="Search By Patient ID and Hospital"
                      id="outlined-size-small"
                      size="small"
                      value={filterValue}
                      onChange={(e) => handleFilter(e)}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" className="input-set">
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
                   <button onClick={handleSampleFile} className="add-button mx-2">
                        <span>
                          <i className="fa fa-file"></i>
                        </span>
                        Export File
                      </button>
                   <button onClick={downloadPdf} className="add-button mx-2">
                        <span>
                      <i className="fa fa-file-pdf-o"></i>
                        </span>
                        Pdf
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
                          <TableCell>Patient ID</TableCell>
                          <TableCell>Patient Name</TableCell>
                          <TableCell>Disease Name</TableCell>
                          <TableCell>Appointment ID</TableCell>
                          <TableCell>Appointment Date</TableCell>
                          <TableCell>Hospital name</TableCell>
                          <TableCell>Status</TableCell>
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
                          (pdfRowLimit?
                         appointments.slice(0, pdfRowLimit)
                          : appointments.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                        ).map((info, i) => (
                              <TableRow
                                role="checkbox"
                                tabIndex={-1}
                                key={info.code}
                              >
                                <TableCell>
                            {pdfRowLimit ? i + 1 : page * rowsPerPage + i + 1}
                                </TableCell>
                                <TableCell>{info.patientId}</TableCell>
                                <TableCell>{info.patientName}</TableCell>
                                <TableCell>{info.disease_name}</TableCell>
                                <TableCell>{info.appointmentId}</TableCell>
                                <TableCell>
                                  {new Date(
                                    info.appointment_Date
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
                    </Stack>)}
                    {/* <TablePagination
                      component="div"
                      count={appointments.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[]}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
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
                <img src="assets/img/sent.png" alt="" width="50" height="46" />
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
        <ToastContainer />
      </div>
    </>
  );
}
