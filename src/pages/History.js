// import React from "react";
// import { Link } from "react-router-dom";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import { useState, useEffect } from "react";
// import Paper from "@mui/material/Paper";
// import axios from "axios";
// import { baseurl } from "../Basurl/Baseurl";
// import { Pagination, Stack } from "@mui/material";

// export default function History() {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   const fetchJobTitles = () => {
//     axios
//       .get(`${baseurl}getOldEnquiryHistory`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         if (response.data.success) {
//           console.log(response.data.data);
//           setRows(response.data.data);
//           // setJobTitles(response.data.details.map(job => job.jobTitle));
//           // setLocation(countries);
//         } else {
//           console.error("Failed to fetch job titles:", response.data.message);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching job titles:", error);
//       });
//   };
//   useEffect(() => {
//     fetchJobTitles();
//   }, []);
//   return (
//     <>
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="row">
//             <div className="col-md-12">
//               <h4 className="page-title">History</h4>
//             </div>
//           </div>
//           <div className="main_content">
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="table-responsive">
//                   <TableContainer
//                     component={Paper}
//                     style={{ overflowX: "auto" }}
//                   >
//                     <Table
//                       stickyHeader
//                       aria-label="sticky table"
//                       className="table-no-card"
//                     >
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Sr.No.</TableCell>
//                           <TableCell>Enquiry ID</TableCell>
//                           <TableCell>Enquiry Status</TableCell>
//                           <TableCell>Emergency Contact</TableCell>
//                           <TableCell>Email</TableCell>
//                           <TableCell>Disease Name</TableCell>
//                           <TableCell>Country</TableCell>
//                           <TableCell>Created At</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {rows
//                           .slice(
//                             page * rowsPerPage,
//                             page * rowsPerPage + rowsPerPage
//                           )
//                           .map((info, i) => {
//                             return (
//                               <TableRow
//                                 role="checkbox"
//                                 tabIndex={-1}
//                                 key={info.enquiryId}
//                               >
//                                 <TableCell>
//                                   {page * rowsPerPage + i + 1}
//                                 </TableCell>
//                                 <TableCell>{info.name}</TableCell>
//                                 <TableCell>{info.enq_status}</TableCell>
//                                 <TableCell>
//                                   {info.emergency_contact_no}
//                                 </TableCell>
//                                 <TableCell>{info.email}</TableCell>
//                                 <TableCell>{info.disease_name}</TableCell>
//                                 <TableCell>{info.country}</TableCell>
//                                 <TableCell>{new Date(info.createdAt).toLocaleDateString("en-GB")}</TableCell>
//                               </TableRow>
//                             );
//                           })}
//                       </TableBody>
//                     </Table>
//                     <Stack spacing={2} alignItems="end" marginTop={2}>
//                       <Pagination
//                         count={Math.ceil(rows.length / rowsPerPage)}
//                         page={page + 1}
//                         onChange={(event, value) => setPage(value - 1)}
//                         shape="rounded"
//                         className='page-item'
//                       />
//                     </Stack>
//                   </TableContainer>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import TableSortLabel from "@mui/material/TableSortLabel";
import { baseurl } from "../Basurl/Baseurl";
import { Pagination, Stack } from "@mui/material";

export default function History() {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState("asc");

  // ✅ Fetch Data
  const fetchHistory = () => {
    axios
      .get(`${baseurl}getOldEnquiryHistory`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success) {
          setRows(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // ✅ Sorting Function
  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    const direction = isAsc ? "desc" : "asc";

    setOrderBy(field);
    setOrderDirection(direction);

    const sortedData = [...rows].sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      // ✅ Date sorting
      if (field === "createdAt") {
        return direction === "asc"
          ? new Date(valA) - new Date(valB)
          : new Date(valB) - new Date(valA);
      }

      // ✅ String sorting
      if (typeof valA === "string") {
        return direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return 0;
    });

    setRows(sortedData);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <h4 className="page-title">History</h4>
          </div>
        </div>

        <div className="main_content">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <TableContainer component={Paper}>
                  <Table stickyHeader className="table-no-card">
                    
                    {/* ✅ TABLE HEADER */}
                    <TableHead>
                      <TableRow>
                        <TableCell>Sr.No.</TableCell>

                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "enquiryId"}
                            direction={
                              orderBy === "enquiryId"
                                ? orderDirection
                                : "asc"
                            }
                            onClick={() => handleSort("enquiryId")}
                          >
                            Enquiry ID
                          </TableSortLabel>
                        </TableCell>

                        <TableCell>Enquiry Status</TableCell>
                        <TableCell>Emergency Contact</TableCell>

                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "email"}
                            direction={
                              orderBy === "email"
                                ? orderDirection
                                : "asc"
                            }
                            onClick={() => handleSort("email")}
                          >
                            Email
                          </TableSortLabel>
                        </TableCell>

                        <TableCell>Disease Name</TableCell>

                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "country"}
                            direction={
                              orderBy === "country"
                                ? orderDirection
                                : "asc"
                            }
                            onClick={() => handleSort("country")}
                          >
                            Country
                          </TableSortLabel>
                        </TableCell>

                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "createdAt"}
                            direction={
                              orderBy === "createdAt"
                                ? orderDirection
                                : "asc"
                            }
                            onClick={() => handleSort("createdAt")}
                          >
                            Date / Time
                          </TableSortLabel>
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    {/* ✅ TABLE BODY */}
                    <TableBody>
                      {rows.length > 0 ? (
                        rows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((info, i) => (
                            <TableRow key={info.enquiryId}>
                              
                              <TableCell>
                                {page * rowsPerPage + i + 1}
                              </TableCell>

                              {/* ✅ FIXED */}
                              <TableCell>{info.enquiryId}</TableCell>

                              <TableCell>{info.enq_status}</TableCell>

                              <TableCell>
                                {info.emergency_contact_no}
                              </TableCell>

                              <TableCell>{info.email}</TableCell>

                              <TableCell>{info.disease_name}</TableCell>

                              <TableCell>{info.country}</TableCell>

                              {/* ✅ DATE + TIME */}
                              <TableCell>
                                {new Date(info.createdAt).toLocaleString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
                                )}
                              </TableCell>

                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} align="center">
                            No Data Found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>

                  {/* ✅ PAGINATION */}
                  <Stack spacing={2} alignItems="end" marginTop={2}>
                    <Pagination
                      count={Math.ceil(rows.length / rowsPerPage)}
                      page={page + 1}
                      onChange={(event, value) => setPage(value - 1)}
                      shape="rounded"
                    />
                  </Stack>

                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}