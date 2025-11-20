import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { GetAllActivity } from "../reducer/ActivitySlice";
import { Pagination, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ActivityTracker() {
  const dispatch = useDispatch();
const navigate =useNavigate()
  const { Activity, loading, error } = useSelector((state) => state.Activity);

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(GetAllActivity());
  }, [dispatch]);

  useEffect(() => {
    if (Activity) {
      setRows(Activity);
    }
  }, [Activity]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

 const handleclick = (log) => {
    console.log(log)
    navigate("/Admin/Activity-user", {
      state: { userId: log.userId, userName: log.name },
    });
  };


  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          {/* TOP TITLE */}
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title mb-0">Manage User Activity</h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="activity table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr. No</TableCell>
                          <TableCell>User Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>View</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {rows.length > 0 ? (
                          rows
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((log, i) => (
                              <TableRow key={log._id || i}>
                                <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                                <TableCell>{log.name}</TableCell>
                                <TableCell>{log.email}</TableCell>
                                <TableCell>{log.role}</TableCell>
                                <TableCell ><i
  className="fa fa-eye"
  onClick={() => handleclick(log)}
  style={{ cursor: "pointer" }}
></i></TableCell>
                              </TableRow>
                            ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} align="center">
                              No Activity Found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>

                    {/* PAGINATION */}
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
    </>
  );
}
