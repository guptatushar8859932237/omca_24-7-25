
// import React, { useState, useEffect } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { useSelector, useDispatch } from "react-redux";
// import { GetAllActivity } from "../reducer/ActivitySlice";
// import { Pagination, Stack } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { baseurl } from "../Basurl/Baseurl";

// export default function ActivityTracker() {
//   const dispatch = useDispatch();
// const navigate =useNavigate()
//   const { Activity, loading, error } = useSelector((state) => state.Activity);

//   const location = useLocation()
//   const dataID=location.state.userId;
//   const [rows, setRows] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage] = useState(10);

//   useEffect(() => {
//     dispatch(GetAllActivity());
//   }, [dispatch]);

//   useEffect(() => {
//     if (Activity) {
//       setRows(Activity);
//     }
//   }, [Activity]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
// const handleclick =()=>{
//     navigate('/Admin/Activity-user')
// }
// useEffect(()=>{
// getuserActivity()
// },[])
// const getuserActivity =async()=>{
//     console.log(dataID)
//     try {
//         const response = await axios.get(`${baseurl}getUserLogs/${dataID}`)
//         console.log(response.data)
//     } catch (error) {
//         console.log(error)
//     }
// }
//   return (
//     <>
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="row">
//             <div className="col-md-12">
//               <h4 className="page-title mb-0">Manage User Activity</h4>
//             </div>
//           </div>
//           <div className="main_content">
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="table-responsive">
//                   <TableContainer component={Paper}>
//                     <Table stickyHeader aria-label="activity table">
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Sr. No</TableCell>
//                           <TableCell>User Name</TableCell>
//                           <TableCell>Email</TableCell>
//                           <TableCell>Role</TableCell>
//                           <TableCell>View</TableCell>
//                         </TableRow>
//                       </TableHead>

//                       <TableBody>
//                         {rows.length > 0 ? (
//                           rows
//                             .slice(
//                               page * rowsPerPage,
//                               page * rowsPerPage + rowsPerPage
//                             )
//                             .map((log, i) => (
//                               <TableRow key={log._id || i}>
//                                 <TableCell>{page * rowsPerPage + i + 1}</TableCell>
//                                 <TableCell>{log.name}</TableCell>
//                                 <TableCell>{log.email}</TableCell>
//                                 <TableCell>{log.role}</TableCell>
//                                 <TableCell><i className="fa fa-eye" style={{cursor:"pointer"}} onClick={handleclick}></i></TableCell>
//                               </TableRow>
//                             ))
//                         ) : (
//                           <TableRow>
//                             <TableCell colSpan={5} align="center">
//                               No Activity Found
//                             </TableCell>
//                           </TableRow>
//                         )}
//                       </TableBody>
//                     </Table>

//                     {/* PAGINATION */}
//                     <Stack spacing={2} alignItems="end" marginTop={2}>
//                       <Pagination
//                         count={Math.ceil(rows.length / rowsPerPage)}
//                         page={page + 1}
//                         onChange={(event, value) => setPage(value - 1)}
//                         shape="rounded"
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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pagination, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseurl } from "../Basurl/Baseurl";
import Swal from "sweetalert2";

export default function ActivityUserLogs() {
  const location = useLocation();

  // ⭐ RECEIVING DATA HERE
  const { userId, userName } = location.state || {};

  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // ⭐ FETCH USER LOGS

const getUserActivity = async () => {
  try {
    const response = await axios.get(`${baseurl}getUserLogs/${userId}`);

    setLogs(response.data.data || []);
    console.log("USER LOGS:", response.data);

  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: error.response?.data?.message || "Something went wrong",
      icon: "error",
    });

    console.log(error);
  }
};


  useEffect(() => {
    if (userId) {
      getUserActivity();
    }
  }, [userId]);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <h4 className="page-title mb-3">Activity Logs of: {userName}</h4>

          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Sr No</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Login Time</TableCell>
                  <TableCell>LogOut Time</TableCell>
                  <TableCell>Duration</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {logs.length > 0 ? (
                  logs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((log, i) => (
                      <TableRow key={i}>
                        <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                        <TableCell>{new Date(log?.date).toLocaleDateString("en-GB")}</TableCell>
                        <TableCell>{log?.loginTime}</TableCell>
                        <TableCell> {log?.logoutTime ? new Date(log.logoutTime).toLocaleTimeString() : "--"}</TableCell>
                        <TableCell>{log?.activeDuration}</TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No Logs Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <Stack spacing={2} alignItems="end" marginTop={2}>
              <Pagination
                count={Math.ceil(logs.length / rowsPerPage)}
                page={page + 1}
                onChange={(e, val) => setPage(val - 1)}
                shape="rounded"
              />
            </Stack>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
