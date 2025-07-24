import React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { baseurl } from "../Basurl/Baseurl";
import { Pagination, Stack } from "@mui/material";
import Swal from "sweetalert2";
import { usePDF } from "react-to-pdf";

export default function Earning() {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [pdfRowLimit, setPdfRowLimit] = useState(null);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const fetchJobTitles = () => {
    axios
      .get(`${baseurl}totalEarnings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.earnings);
          setRows(response.data.earnings);
          // setJobTitles(response.data.details.map(job => job.jobTitle));
          // setLocation(countries);
        } else {
          console.error("Failed to fetch job titles:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };
  useEffect(() => {
    fetchJobTitles();
  }, []);


const downloadPdf  = async () => {
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

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">Payments</h4>
            </div>
          
          </div>
          <div className="row d-flex">
            {/* <div className='col-sm-3'>
                      <Autocomplete
                        className=''
                        disablePortal
                        id="combo-box-job-title"
                        options={Treatment.map(item => (item.course_name))}
                        value={selectedJobTitle}
                        onChange={handleJobTitleChange}
                        size="small"
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="treatment name" />}
                      />
                    </div> */}
            {/* <div className='col-sm-2'>
                      <TextField id="outlined-basic" label="age" variant="outlined" size="small" onChange={submitInputdata} name="age" value={report.age} />
                    </div> */}
              {/* <button className="btn btn btn-primary" href="job-grid" onClick={getReportData}>
                        Report
                      </button> */}
                       
            {/* <div className="col-sm-8 col-9 text-right m-b-20">
                      <Link to="/Admin/add-patient" className="btn btn btn-primary btn-rounded float-right"><i
                        className="fa fa-plus"></i> New Patient</Link>
                    </div> */}
          </div>
          <div className="main_content">
             <div className='d-flex justify-content-end me-2 mb-2'>

              <button onClick={downloadPdf} className="add-button ms-2">
                    <span>
                      <i className="fa fa-file-pdf-o"></i>
                    </span>
                    PDF
                  </button>
            </div>
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
                          <TableCell>Total Amount</TableCell>
                          <TableCell>Remaining Balance</TableCell>
                          <TableCell>Amount Paid</TableCell>
                          <TableCell>Disease Agreement</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                         {(pdfRowLimit?
                         rows.slice(0, pdfRowLimit)
                          : rows.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                        ).map((info, i) => {
                            return (
                              <TableRow
                                role="checkbox"
                                tabIndex={-1}
                                key={info.enquiryId}
                              >
                                <TableCell>
                                   {pdfRowLimit ? i + 1 : page * rowsPerPage + i + 1}
                                </TableCell>{" "}
                                <TableCell>{info.patientId}</TableCell>
                                <TableCell>{info.patient_name}</TableCell>
                                <TableCell>{info.total_Amount}</TableCell>
                                <TableCell>{info.remaining_balance}</TableCell>
                                <TableCell>{info.amount_paid}</TableCell>
                                <TableCell>{info.Disease_agreement}</TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                       {!pdfRowLimit && (
                                         <Stack spacing={2} alignItems="end" marginTop={2}>
                                           <Pagination
                                             count={Math.ceil(rows.length / rowsPerPage)}
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
      </div>
    </>
  );
}
