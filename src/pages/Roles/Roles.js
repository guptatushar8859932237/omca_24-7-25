import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { baseurl } from "../../Basurl/Baseurl";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Box,
  Stack,
} from "@mui/material";
export default function Roles() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [note, setNote] = useState("");
  const [page, setPage] = useState(0);
  const [popupopen, setPopupopen] = useState(false);
  const rowsPerPage = 10;
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
        "error",
      );
    }
  };

  const handleDeleteExternal = (item) => {
    console.log(item);
    Swal.fire({
      title: "Are you sure?",
      text: "This role will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.post(`${baseurl}deleteRole/${item._id}`);

          if (res?.data?.success) {
            Swal.fire("Deleted!", "Role deleted successfully", "success");
            getRoles(); // refresh table
          } else {
            Swal.fire("Error", res?.data?.message || "Delete failed", "error");
          }
        } catch (error) {
          Swal.fire(
            "Error",
            error?.response?.data?.message || "Something went wrong",
            "error",
          );
        }
      }
    });
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row gx-3">
          <div className="col-md-12">
            <div className="country-top">
              <div className="topmainhd mb-0">
                <h6>Manage Roles</h6>
              </div>
              <div className="">
                <button
                  className="add-button"
                  onClick={() => setPopupopen(true)}
                >
                  <i className="fa fa-plus me-2"></i>New Role
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="main_content">
              <div className="table-responsive">
                <TableContainer component={Paper} style={{ overflowX: "auto" }}>
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    className="table-no-card"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Sr.No.</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage,
                        )
                        .map((item, index) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              {page * rowsPerPage + index + 1}
                            </TableCell>
                            <TableCell>{item.role}</TableCell>
                            <TableCell>
                              <div className="action-icon">
                                <i
                                  className="fa-solid fa-trash"
                                  onClick={() => handleDeleteExternal(item)}
                                ></i>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <Stack spacing={2}>
                    <Pagination
                      className="page-nation"
                      count={Math.ceil(rows.length / rowsPerPage)}
                      page={page + 1}
                      onChange={(event, value) => setPage(value - 1)}
                      color="primary"
                    />
                  </Stack>
                </TableContainer>
              </div>
            </div>
          </div>
          <React.Fragment>
            <Dialog
              fullWidth={true}
              maxWidth="sm"
              open={popupopen}
              onClose={() => setPopupopen(false)}
            >
              {/* Header */}
              <div className="main-card-header">
                <div className="note-hd">
                  <h6>Add Role</h6>
                </div>
                <div className="cross-icon" onClick={() => setPopupopen(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>

              {/* Body */}
              <DialogContent className="main-box">
                <Box noValidate component="form" className="contact-form">
                  <div className="field-set">
                    <label>
                      Role<span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      placeholder="Enter role"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>

                  {/* Submit */}
                  <DialogActions className="submit-main">
                    <Button variant="contained" onClick={handleAddRole}>
                      Submit
                    </Button>
                  </DialogActions>
                </Box>
              </DialogContent>
            </Dialog>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
}
