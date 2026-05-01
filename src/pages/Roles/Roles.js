// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import React, { useState, useEffect } from "react";
// import {
//   GetAllStaffUser,
//   ActiveStaffUser,
//   DeleteStaff,
// } from "../../reducer/StaffSlice";
// import { baseurl, image } from "../../Basurl/Baseurl";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { usePDF } from "react-to-pdf";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Pagination from "@mui/material/Pagination";
// import TextField from "@mui/material/TextField";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import { Box, Button, Dialog, DialogActions, DialogContent } from "@mui/material";
// export default function Roles() {
//   const role = localStorage.getItem("Role");
//   const navigate = useNavigate();
//     const [fullWidth, setFullWidth] = React.useState(true);
//     const [maxWidth, setMaxWidth] = React.useState("sm");
//   const dispatch = useDispatch();
//   const { toPDF, targetRef } = usePDF({ filename: "staff.pdf" });
//   const [rows, setRows] = useState([]);
//   const [rowsdata, setRowsdata] = useState([]);
//   const [search, setSearch] = useState("");
//   const [note, setNote] = useState("");
//   const [page, setPage] = useState(0);
//   const [orderBy, setOrderBy] = useState("");
//   const [orderDirection, setOrderDirection] = useState("asc");
//     const [popupopen,setPopupopen]=useState(false)
//   const rowsPerPage = 10;
//   const [pdfRowLimit, setPdfRowLimit] = useState(null);
//   const { staff, loading, error } = useSelector((state) => state.staff);
//   /* ---------------- FETCH DATA ---------------- */
//  const getRolesa=async()=>{
//     try {
//         const response = await axios.get(`${baseurl}getAllRoles`)
//         if(response.data.data){
//             setRowsdata(response.data.data)
//         }
//     } catch (error) {
//         console.log(error)
//     }
//  }
//   /* ---------------- HANDLERS ---------------- */
//   const handleEdit = (id) => {
//     navigate("/Admin/edit-staff", { state: { staffID: id } });
//   };
  
//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(DeleteStaff({ id }))
//           .unwrap()
//           .then(() => dispatch(GetAllStaffUser()))
//           .then(() =>
//             Swal.fire("Deleted!", "Staff deleted successfully", "success")
//           )
//           .catch(() =>
//             Swal.fire("Error!", "Delete operation failed", "error")
//           );
//       }
//     });
//   };
//   const ahdnelclickopenopo =()=>{
//     setPopupopen(true)
//   }
//   const closemodalpopup =()=>{
//     setPopupopen(false)
//   }
//   const handleNotesdataqw =async()=>{
//   if (!note) {
//     return Swal.fire({
//       icon: "warning",
//       title: "Validation Error",
//       text: "Role is required",
//     });
//   }
//   try {
//     const payload = {
//       role: note,
//     };
//     const response = await axios.post(`${baseurl}createRole`, payload);
//     if (response?.data?.success) {
//         closemodalpopup()
//       Swal.fire({
//         icon: "success",
//         title: "Success",
//         text: "Role created successfully!",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       setNote("");
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Failed",
//         text: response?.data?.message || "Something went wrong",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text:
//         error?.response?.data?.message ||
//         "Server error, please try again later",
//     });
//   }
//   }

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="country-top">
//           <h4 className="page-title mb-0">Manage Roles</h4>
//           <div className="search-btn-main">
//             {/* <TextField
//               label="Search"
//               size="small"
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setPage(0);
//               }}
//               className="field-count"
//             /> */}
//             <button className="add-button" onClick={ahdnelclickopenopo}>
//               <i className="fa fa-plus" ></i> New Roles
//             </button>
//           </div>
//         </div>
//         <TableContainer ref={targetRef} className="table-responsive">
//           <Table className="table-no-card">
//             <TableHead>
//               <TableRow>
//                 <TableCell>Sr.No.</TableCell>
//                 <TableCell>
//                     Role
//                 </TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
             
//                 <TableRow key={info._id}>
//                   <TableCell>
//                     {pdfRowLimit ? i + 1 : page * rowsPerPage + i + 1}
//                   </TableCell>
//                   <TableCell>
//                     <img
//                       src={`${image}${info.profileImage}`}
//                       className="hos-img"
//                       alt=""
//                     />
//                   </TableCell>
//                   <TableCell>{info.name}</TableCell>
//                   <TableCell>{info.role}</TableCell>
//                   <TableCell>{info.email}</TableCell>
//                   <TableCell>{new Date(info.createdAt).toLocaleDateString("en-GB")}/{new Date(info.createdAt).toLocaleTimeString('en-GB', {
//   hour: '2-digit',
//   minute: '2-digit',
//   hour12: true,
// })}</TableCell>
//                  <TableCell>
//                               {   
//                                    <label className="active-switch">
//                                      <input
//                                        className="active-switch-input "
//                                        type="checkbox"
//                                        checked={Boolean(info.status)}
//                                        onChange={() => {
//                                          dataActiveInactive(
//                                            info._id,
//                                            info.status
//                                          );
//                                        }}
//                                      />
//                                      <span
//                                        className="active-switch-label "
//                                        data-on="Active"
//                                        data-off="Inactive"
//                                      ></span>
//                                      <span className="active-switch-handle"></span>
//                                    </label>
//                                  }
//                                </TableCell>
//                   <TableCell className="action-icon">
//                     <i
//                       className="fa-solid fa-pen-to-square"
//                       onClick={() => handleEdit(info._id)}
//                     ></i>
//                     {role === "Admin" && (
//                       <i
//                         className="fa fa-trash ms-1"
//                         onClick={() => handleDelete(info._id)}
//                       ></i>
//                     )}
//                   </TableCell>
//                 </TableRow>
             
//             </TableBody>
//           </Table>
//           {!pdfRowLimit && (
//             <div className="d-flex justify-content-end mt-2">
//               <Pagination
//                 count={Math.ceil(filteredRows.length / rowsPerPage)}
//                 page={page + 1}
//                 onChange={(e, value) => setPage(value - 1)}
//               />
//             </div>
//           )}
//         </TableContainer>
//       </div>
//       <React.Fragment>
//               <Dialog
//                 fullWidth={fullWidth}
//                 maxWidth={maxWidth}
//                 open={popupopen}
//                 onClose={closemodalpopup}
//               >
//                 <div className="main-card-header">
//                   <div className="note-hd">
//                     <h6>Add Role</h6>
//                   </div>
//                   <div className="cross-icon" onClick={closemodalpopup}>
//                     <i class="fa-solid fa-xmark"></i>
//                   </div>
//                 </div>
//         <DialogContent className="main-box">
//                   <Box
//                     noValidate
//                     component="form"
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       width: "fit-content",
//                     }}
//                     className="contact-form"
//                   >
//                     <Box>
//                       <form id="contact-form">
//                         <div className="field-set">
//                           <label>
//                             Enter Role<span className="text-danger">*</span>
//                           </label>
//                           <input
//                             id="w3review"
//                             name="discussionNotes"
//                             rows="4"
//                             cols="50"
//                             className="form-control"
//                             placeholder="Role"
//                            value={note}
//   onChange={(e) => setNote(e.target.value)}
//                           />
//                         </div>
//                         <DialogActions className="submit-main">
//                           <Button
//                             type="submit"
//                             variant="contained"
//                             onClick={handleNotesdataqw}
//                           >
//                             Submit
//                           </Button>
//                         </DialogActions>
//                       </form>
//                     </Box>
//                   </Box>
//                 </DialogContent>
//                   </Dialog>
//                       </React.Fragment>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { baseurl } from "../../Basurl/Baseurl";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Pagination,
  Dialog, DialogActions, DialogContent,
  Button, Box
} from "@mui/material";

export default function Roles() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [note, setNote] = useState("");
  const [page, setPage] = useState(0);
  const [popupopen, setPopupopen] = useState(false);

  const rowsPerPage = 10;

  /* ---------------- FETCH DATA ---------------- */
  const getRoles = async () => {
    try {
      const res = await axios.get(`${baseurl}getAllRoles`);
      setRows(res?.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  /* ---------------- ADD ROLE ---------------- */
  const handleAddRole = async () => {
    if (!note) {
      return Swal.fire("Error", "Role is required", "warning");
    }

    try {
      const res = await axios.post(`${baseurl}createRole`, {
        role: note,
      });

      if (res?.data?.success) {
        Swal.fire("Success", "Role created", "success");
        setNote("");
        setPopupopen(false);
        getRoles(); // refresh list
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="country-top">
          <h4>Manage Roles</h4>
          <button className="add-button" onClick={() => setPopupopen(true)}>
            + New Role
          </button>
        </div>

        {/* TABLE */}
        <TableContainer  className="table-no-card">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sr.No</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell>{item.role}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          {/* PAGINATION */}
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page + 1}
            onChange={(e, val) => setPage(val - 1)}
          />
        </TableContainer>
      </div>

      {/* MODAL */}
      <Dialog open={popupopen} onClose={() => setPopupopen(false)}>
        <DialogContent>
          <Box className="contact-form">
            <label>Enter Role *</label>
            <textarea
              className="form-control"
              placeholder="Enter role"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <DialogActions>
              <Button onClick={handleAddRole} variant="contained">
                Submit
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}