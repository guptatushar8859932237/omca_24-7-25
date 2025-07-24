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

export default function History() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const fetchJobTitles = () => {
    axios
      .get(`${baseurl}getOldEnquiryHistory`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success) {
          console.log(response.data.data);
          setRows(response.data.data);
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
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">History</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row d-flex">
              {/* <div className="col-sm-3 date_pick">
                      <DatePicker
                        value={dateRange}
                        format="MM/DD/YYYY"
                        placeholder="Start Date , End Date"
                        onChange={setDateRange}
                        range
                        numberOfMonths={2}
                      />
                    </div> */}
              {/* <div className='col-sm-3'>
                      <TextField id="outlined-basic" label="country" variant="outlined" size="small" onChange={submitInputdata} name="country" value={report.country}    sx={{ width: 300 }}/>
                    </div> */}
              {/* <div className='col-sm-2'>
                      <TextField id="outlined-basic" label="gender" variant="outlined" size="small" onChange={submitInputdata} name="gender" value={report.gender}/>
                    </div> */}
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
              <div className="col-sm-3 text-end">
                {/* <button className="btn btn btn-primary" href="job-grid" onClick={getReportData}>
                        Report
                      </button> */}
              </div>
              {/* <div className="col-sm-8 col-9 text-right m-b-20">
                      <Link to="/Admin/add-patient" className="btn btn btn-primary btn-rounded float-right"><i
                        className="fa fa-plus"></i> New Patient</Link>
                    </div> */}
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
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
                          <TableCell>Enquiry ID</TableCell>
                          <TableCell>Enquiry Status</TableCell>
                          <TableCell>Emergency Contact</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Disease Name</TableCell>
                          <TableCell>Country</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((info, i) => {
                            return (
                              <TableRow
                                role="checkbox"
                                tabIndex={-1}
                                key={info.enquiryId}
                              >
                                <TableCell>
                                  {page * rowsPerPage + i + 1}
                                </TableCell>
                                <TableCell>{info.name}</TableCell>
                                <TableCell>{info.enq_status}</TableCell>
                                <TableCell>
                                  {info.emergency_contact_no}
                                </TableCell>
                                <TableCell>{info.email}</TableCell>
                                <TableCell>{info.disease_name}</TableCell>
                                <TableCell>{info.country}</TableCell>
                                {/* <TableCell>{info.patient_disease.map((item) => (
                                        item.disease_name
      
                                      ))}</TableCell> */}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                    <Stack spacing={2} alignItems="end" marginTop={2}>
                      <Pagination
                        count={Math.ceil(rows.length / rowsPerPage)}
                        page={page + 1}
                        onChange={(event, value) => setPage(value - 1)}
                        shape="rounded"
                        className='page-item'
                      />
                    </Stack>
                    {/* <TablePagination
                      component="div"
                      count={rows.length}
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
      </div>
    </>
  );
}
