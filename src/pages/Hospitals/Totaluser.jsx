// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { baseurl } from "../../Basurl/Baseurl";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// export default function Totaluser() {
//   const location = useLocation();
//   console.log(location.state.data);
//   const [rows, setRows] = useState([]);
//   useEffect(() => {
//     GetUserData();
//   }, []);

//   const GetUserData = async () => {
//     try {
//       const response = await axios(
//         `${baseurl}getPatientsByHospitalId/${location?.state?.data}`
//       );
//       if (response.data.success === true) {
//         console.log(response.data.patients);
//         setRows(response.data.patients)
//       } else {
//         console.log("somethig wet wrong");
//       }
//     } catch (error) {
//       console.log(error.response.data);
//     }
//   };

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="row">
//           {" "}
//           <div className="table-responsive">
//             <TableContainer component={Paper} style={{ overflowX: "auto" }}>
//               <Table
//                 stickyHeader
//                 aria-label="sticky table"
//                 className="table-no-card"
//               >
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Sr.No.</TableCell>
//                     <TableCell>Image</TableCell>
//                     <TableCell>Hospital Name</TableCell>
//                     <TableCell>Location</TableCell>
//                     <TableCell>Hospital Code</TableCell>
//                     <TableCell>Contact</TableCell>
//                     <TableCell>Num. of Patient</TableCell>
//                     <TableCell>Status</TableCell>

//                     <TableCell>Action</TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>

//                  <TableRow key={}>
//                     <TableCell></TableCell>
//                  </TableRow>
//                 </TableBody>
//               </Table>
//               {/* <Stack spacing={2} alignItems="end" marginTop={2}>
//                 <Pagination
//                   count={Math.ceil(rows.length / rowsPerPage)}
//                   page={page + 1}
//                   onChange={(event, value) => setPage(value - 1)}
//                   shape="rounded"
//                   className="page-item"
//                 />
//               </Stack> */}
//             </TableContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseurl } from "../../Basurl/Baseurl";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  Stack,
  Avatar
} from "@mui/material";

export default function Totaluser() {
  const location = useLocation();
  const hospitalId = location?.state?.data;

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    GetUserData();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, rows]);

  const GetUserData = async () => {
    try {
      const response = await axios(`${baseurl}getPatientsByHospitalId/${hospitalId}`);
      if (response.data.success === true) {
        setRows(response.data.patients);
        setFilteredRows(response.data.patients);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error?.response?.data || "Server Error");
    }
  };

  const handleSearch = () => {
    const filtered = rows.filter((row) =>
      row.enquiryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.gender.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRows(filtered);
    setPage(1);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedRows = filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row mb-3">
          <div className="col-md-4">
            <TextField
              fullWidth
              label="Search by Name or Contact"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="table-responsive">
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table" className="table-no-card">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr.No.</TableCell>
                    <TableCell>Patient ID</TableCell>
                    <TableCell>Patient Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Country	</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Contact</TableCell>
                    {/* <TableCell>Action</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRows.length > 0 ? (
                    paginatedRows.map((row, index) => (
                      <TableRow key={row._id}>
                        <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                        <TableCell>{row.enquiryId	}</TableCell>
                        <TableCell>{row.patient_name	}</TableCell>
                        <TableCell>{row.age}</TableCell>
                        <TableCell>{row.country	}</TableCell>
                        <TableCell>{row.gender || "N/A"}</TableCell>
                        <TableCell>
                            {row.patient_emergency_contact_no}
                        </TableCell>
                      
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center">No Records Found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Stack spacing={2} alignItems="center" marginTop={2}>
              <Pagination
                count={Math.ceil(filteredRows.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                shape="rounded"
                color="primary"
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}
