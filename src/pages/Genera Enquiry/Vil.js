// // import React from 'react'

// // export default function Vil() {
// //   return (
// //     <div>
// //       vil
// //     </div>
// //   )
// // }

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { testForms } from "../../reducer/FormsEnquiry";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, TextField, InputAdornment, IconButton, Pagination, Stack,
//   Modal, Box,
//   Dialog,
//   DialogContent
// } from "@mui/material";

// import ClearIcon from "@mui/icons-material/Clear";

// export default function Vil() {
//   const dispatch = useDispatch();

//   const { testForms: formData, loading, error } = useSelector(
//     (state) => state.testForms
//   );

//   const [filterValue, setFilterValue] = useState("");
//   const [page, setPage] = useState(0);
//   const rowsPerPage = 10;

//   // Popup states
//   const [open, setOpen] = useState(false);
//   const [selectedRecord, setSelectedRecord] = useState(null);

//   useEffect(() => {
//     dispatch(testForms());
//   }, [dispatch]);

//   const medicalVisaData = formData?.data?.home_care || [];

//   const handleFilter = (e) => {
//     setFilterValue(e.target.value);
//     setPage(0);
//   };

//   const handleClearFilter = () => {
//     setFilterValue("");
//     setPage(0);
//   };

//   const filteredData = medicalVisaData.filter((item) => {
//     const search = filterValue.toLowerCase();

//     return (
//       item.name?.toLowerCase().includes(search) ||
//       item.email?.toLowerCase().includes(search) ||
//       item.phone?.toLowerCase().includes(search) ||
//       item.treatment_requirment?.toLowerCase().includes(search) ||
//       item.country?.toLowerCase().includes(search) ||
//       item.passport?.toLowerCase().includes(search) ||
//       item.number_of_atttend?.toLowerCase().includes(search)
//     );
//   });

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   // Open popup
//   const handleView = (record) => {
//     setSelectedRecord(record);
//     setOpen(true);
//   };
//   const fullWidth = true;
//   const maxWidth = "lg"; // xs | sm | md | lg | xl
//   const handleClose = () => setOpen(false);
//   /* ========= Reusable Info Item ========= */
//   const InfoItem = ({ label, value }) => (
//     <div className="">
//       <h6>{label}</h6>
//       <p>{value || "-"}</p>
//     </div>
//   );
//   return (
//     <div>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <div className="d-flex justify-content-between">
//         <div>
//           <h2>Home Care</h2>
//         </div >
//         <div>
//           <div style={{ maxWidth: "300px", marginBottom: "15px" }}>
//             <TextField
//               label="Search"
//               size="small"
//               value={filterValue}
//               onChange={handleFilter}
//               InputLabelProps={{ shrink: true }}
//               placeholder="Search..."
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     {filterValue && (
//                       <IconButton onClick={handleClearFilter}>
//                         <ClearIcon />
//                       </IconButton>
//                     )}
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{ width: "100%" }}
//             />
//           </div>
//         </div>
//       </div>
//       {/* Search */}

//       {/* Table */}
//       <TableContainer component={Paper}
//         style={{ overflowX: "auto" }}>
//         <Table
//           stickyHeader
//           aria-label="sticky table"
//           className="table-no-card"
//         >
//           <TableHead>
//             <TableRow>
//               <TableCell>Sr No.</TableCell>
//               <TableCell> Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Country</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((item, i) => (
//                 <TableRow key={i}>
//                   <TableCell>{page * rowsPerPage + i + 1}</TableCell>
//                   <TableCell>{item.name}</TableCell>
//                   <TableCell>{item.email}</TableCell>
//                   <TableCell>{item.phone}</TableCell>
//                   <TableCell>{item.country}</TableCell>
//                   <TableCell>
//                     <VisibilityIcon
//                       className="eye-icon"
//                       style={{cursor:"pointer"}}
//                       onClick={() => handleView(item)}
//                     />
//                     {/* <button
//                       onClick={() => handleView(item)}
//                       style={{
//                         padding: "5px 12px",
//                         cursor: "pointer",
//                         background: "#1976d2",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "4px",
//                       }}
//                     >
//                       View
//                     </button> */}
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={8} align="center">
//                   No Data Found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>

//         {/* Pagination */}
//         <Stack spacing={2} alignItems="end" marginTop={2} padding={2}>
//           <Pagination
//             count={Math.ceil(filteredData.length / rowsPerPage)}
//             page={page + 1}
//             onChange={(event, value) => setPage(value - 1)}
//             shape="rounded"
//           />
//         </Stack>
//       </TableContainer>
//       {/* Popup Modal */}
//       <Dialog
//         fullWidth={fullWidth}
//         maxWidth={maxWidth}
//         open={open} onClose={handleClose}>
//         <div className="main-card-header">
//           <div className="top-fixed-hd">
//             <div className="note-hd">
//               < h6>Home Care Request</h6>
//             </div>
//             <div className="cross-icon" onClick={handleClose}>
//               <i className="fa-solid fa-xmark"></i>
//             </div>
//           </div>
//         </div>
//         <DialogContent className="main-box view-table-detail">
//           {/* <Box>
//             {selectedRecord && (
//               <div className="table-responsive dataset">
//                 <table className="table table-bordered mb-0">
//                   <tbody>
//                     {Object.entries(selectedRecord)
//                       .filter(([key]) =>
//                         [
//                           "name",
//                           "email",
//                           "phone",
//                           "country",
//                           "treatment_requirment",
//                           "number_of_atttend",
//                           "passport",
//                         ].includes(key)
//                       )
//                       .map(([key, value]) => (
//                         <tr key={key}>
//                           <th>
//                             {key
//                               .replace(/_/g, " ")
//                               .replace(/\b\w/g, (char) => char.toUpperCase())}
//                           </th>
//                           <td>{String(value)}</td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </Box> */}
//           {selectedRecord && (
//             <Box>
//               <div className="row">
//                 {/* personal */}
//                 <div className="col-md-12 mb-3">
//                   {/* <div className="all-hd mb-3">
//                         <h6>Personal Information</h6>
//                       </div> */}
//                   <div className="card">
//                     <div className="card-body">
//                       <div className="row">
//                         <div className="col-md-4">
//                           <InfoItem label="Name" value={selectedRecord.name} />
//                         </div>
//                         <div className="col-md-4">
//                           <InfoItem label="Email" value={selectedRecord.email} />
//                         </div>
//                         <div className="col-md-4">
//                           <InfoItem label="Phone Number" value={selectedRecord.phone} />
//                         </div>
//                         <div className="col-md-4">
//                           <InfoItem label="Country" value={selectedRecord.country} />
//                         </div>
//                         <div className="col-md-4">
//                           <InfoItem label="Treatment" value={selectedRecord.treatment_requirment} />
//                         </div>
//                         <div className="col-md-4">
//                           <InfoItem label="Number of attend" value={selectedRecord.number_of_atttend} />
//                         </div>
//                         <div className="col-md-4">
//                           <InfoItem label="Passport" value={selectedRecord.passport} />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Box>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testForms } from "../../reducer/FormsEnquiry";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TableSortLabel from "@mui/material/TableSortLabel";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  Stack,
  Modal,
  Box,
  Dialog,
  DialogContent,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { AdminBaseUrl } from "../../Basurl/Baseurl";
import Swal from "sweetalert2";

export default function Vil() {
  const dispatch = useDispatch();

  const {
    testForms: formData,
    loading,
    error,
  } = useSelector((state) => state.testForms);

  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  // Popup states
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    dispatch(testForms());
  }, [dispatch]);

  const medicalVisaData = formData?.data?.home_care || [];

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
    setPage(0);
  };

  const handleClearFilter = () => {
    setFilterValue("");
    setPage(0);
  };

  // 1. Filter first
  const filteredData = medicalVisaData.filter((item) => {
    const search = filterValue.toLowerCase();

    return (
      item.name?.toLowerCase().includes(search) ||
      item.email?.toLowerCase().includes(search) ||
      item.city?.toLowerCase().includes(search) ||
      item.phone?.toLowerCase().includes(search) ||
      item.perfired_time?.toLowerCase().includes(search) ||
      item.pickup_location?.toLowerCase().includes(search) ||
      item.travel_date?.toLowerCase().includes(search) ||
      item.drop_location?.toLowerCase().includes(search)
    );
  });

  // 2. Sort after filtering
  const sortedData = [...filteredData].sort((a, b) => {
    if (!orderBy) return 0;

    let valA = a[orderBy] || "";
    let valB = b[orderBy] || "";

    // Date handling
    if (orderBy === "pickup_date") {
      return order === "asc"
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    }

    // Number handling
    if (!isNaN(valA) && !isNaN(valB)) {
      return order === "asc" ? valA - valB : valB - valA;
    }

    // String handling
    valA = valA.toString().toLowerCase();
    valB = valB.toString().toLowerCase();

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;

    return 0;
  });

  // 3. Paginate last
  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // const paginatedData = sortedData.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };
  // Open popup
  const handleView = (record) => {
    setSelectedRecord(record);
    setOpen(true);
  };
  //   const sortedData = [...filteredData].sort((a, b) => {
  //   if (!orderBy) return 0;

  //   let valA = a[orderBy] || "";
  //   let valB = b[orderBy] || "";

  //   // Date handling
  //   if (orderBy === "pickup_date") {
  //     return order === "asc"
  //       ? new Date(valA) - new Date(valB)
  //       : new Date(valB) - new Date(valA);
  //   }

  //   // Number handling
  //   if (!isNaN(valA) && !isNaN(valB)) {
  //     return order === "asc" ? valA - valB : valB - valA;
  //   }

  //   // String handling
  //   valA = valA.toString().toLowerCase();
  //   valB = valB.toString().toLowerCase();

  //   if (valA < valB) return order === "asc" ? -1 : 1;
  //   if (valA > valB) return order === "asc" ? 1 : -1;

  //   return 0;
  // });

  const fullWidth = true;
  const maxWidth = "lg"; // xs | sm | md | lg | xl

  const handleClose = () => setOpen(false);
  /* ========= Reusable Info Item ========= */
  const InfoItem = ({ label, value }) => (
    <div>
      <strong>{label}</strong>
      <div>{value}</div>
    </div>
  );

  const handleChangtype = async (e, b) => {
    console.log(e, b);

    const data = {
      id: b?.id,
      model: "Pickup",
      status: e?.value || e?.target?.value,
    };

    try {
      const response = await axios.post(
        `${AdminBaseUrl}update_user_request_status`,
        data,
      );
      dispatch(testForms());
      if (response?.data?.success) {
        Swal.fire("Success", "Status Updated Successfully", "success");
      }
    } catch (error) {
      console.log(error);

      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="country-top">
        <div className="topmainhd mb-0">
          <h6>Home Care</h6>
        </div>
        <div className="">
          <TextField
            label="Search "
            size="small"
            value={filterValue}
            onChange={handleFilter}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {filterValue && (
                    <IconButton onClick={handleClearFilter}>
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
      <div className="table-responsive">
        <TableContainer component={Paper} style={{ overflowX: "auto" }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            className="table-no-card"
          >
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell sortDirection={orderBy === "name" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "name"}
                    direction={orderBy === "name" ? order : "asc"}
                    onClick={() => handleSort("name")}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === "email" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "email"}
                    direction={orderBy === "email" ? order : "asc"}
                    onClick={() => handleSort("email")}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === "phone" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "phone"}
                    direction={orderBy === "phone" ? order : "asc"}
                    onClick={() => handleSort("phone")}
                  >
                    Phone
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sortDirection={orderBy === "country" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "country"}
                    direction={orderBy === "country" ? order : "asc"}
                    onClick={() => handleSort("country")}
                  >
                    Country
                  </TableSortLabel>
                </TableCell>
                <TableCell sortDirection={orderBy === "status" ? order : false}>
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderBy === "status" ? order : "asc"}
                    onClick={() => handleSort("status")}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>
                      <FormControl
                        sx={{ m: 1, minWidth: 120 }}
                        size="small"
                        className="cont-main"
                      >
                        <Select
                          value={item.status}
                          onChange={(e) => handleChangtype(e, item)}
                          displayEmpty
                          inputProps={{
                            "aria-label": "Without label",
                          }}
                          className="status-direct"
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="In-Process">In-Process</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                          <MenuItem value="Cancel">Cancel</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <div className="action-icon">
                        <VisibilityIcon
                          className="eye-icon"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleView(item)}
                        />
                      </div>
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
          {/* Pagination */}
          <Stack spacing={2} alignItems="end" marginTop={2}>
            <Pagination
              count={Math.ceil(filteredData.length / rowsPerPage)}
              page={page + 1}
              onChange={(event, value) => setPage(value - 1)}
              shape="rounded"
            />
          </Stack>
        </TableContainer>
      </div>
      {/* Popup Modal */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <div className="main-card-header">
          <div className="top-fixed-hd">
            <div className="note-hd">
              <h6>Home Care </h6>
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
                {/* personal */}
                <div className="col-md-12 mb-3">
                  <div className="all-hd mb-3">
                    <h6>User Information</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem label="Name" value={selectedRecord.name} />
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
                            value={`${selectedRecord.country_code} ${selectedRecord.phone}`}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Passport Number"
                            value={selectedRecord.passport_number}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="all-hd mb-3 mt-3">
                    <h6>Home Care Details</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem
                            label="Home Care Type"
                            value={selectedRecord.home_care_type}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Home Care Services"
                            value={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: selectedRecord.home_care_services,
                                }}
                              />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="all-hd mb-3 mt-3">
                    <h6>Address Details</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem
                            label="Country"
                            value={selectedRecord.country}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="State"
                            value={selectedRecord.state}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="City" value={selectedRecord.city} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Address"
                            value={selectedRecord.address}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Pin Code"
                            value={selectedRecord.pin_code}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="GPS / Location Pin"
                            value={selectedRecord.location_pin}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="all-hd mb-3 mt-3">
                    <h6>Contact Details</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem
                            label="Contact Number"
                            value={selectedRecord.contact_number}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Emergency Contact Number"
                            value={selectedRecord.emergency_contact_number}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="all-hd mb-3 mt-3">
                    <h6>Date Range</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem
                            label="Start Date"
                            value={selectedRecord.start_date}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="End Date"
                            value={selectedRecord.end_date}
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
    </>
  );
}
