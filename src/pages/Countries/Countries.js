import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { baseurl } from "../../Basurl/Baseurl";
import { useNavigate } from "react-router-dom";
import { GetAllCountries } from "../../reducer/Countries";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { toast, ToastContainer } from "react-toastify";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";
import { Pagination, Stack } from "@mui/material";

export default function Countries() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();
  const { Countries, loading, error } = useSelector((state) => state.Countries);
  const [searchApiData, setSearchApiData] = useState([]);

  useEffect(() => {
    dispatch(GetAllCountries());
  }, [dispatch]);

  useEffect(() => {
    if (Countries) {
      setRows(Countries);
      setSearchApiData(Countries);
    }
  }, [Countries]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleedit = (id) => {
    navigate("/Admin/edit-countries", {
      state: { countryId: id },
    });
  };
  const handledelet = (id) => {
    axios
      .delete(`${baseurl}deleteCountry/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          dispatch(GetAllCountries());
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error("Error deleting country");
        console.error(error);
      });
  };
  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "1" ? "0" : "1";
    try {
      const response = await axios.put(
        `${baseurl}changeCountryStatus/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        dispatch(GetAllCountries());
        Swal.fire("Status updated successfully!", "", "success"); // ✅ Here is Swal
      } else {
        Swal.fire("Failed to update status", "", "error"); // Optional error swal
      }
    } catch (error) {
      Swal.fire("Error occurred while updating status", "", "error"); // Optional catch swal
      console.error(error);
    }
  };

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);
    if (value === "") {
      setRows(searchApiData);
    } else {
      const filtered = searchApiData.filter((item) => {
        const name = item.name?.toLowerCase() || "";
        const code = item.code?.toLowerCase() || "";
        const dial_code = item.dial_code?.toLowerCase() || "";
        return (
          name.includes(value) ||
          code.includes(value) ||
          dial_code.includes(value)
        );
      });
      setRows(filtered);
    }
  };

  const handleClearFilter = () => {
    setFilterValue("");
    setRows(searchApiData);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="country-top">
                <h4 className="page-title mb-0">Manage Countries</h4>
                <div className="search-btn-main">
                  <TextField
                    className="field-count"
                    sx={{ width: "100%" }}
                    label="Search by countries"
                    size="small"
                    value={filterValue}
                    onChange={handleFilter}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {filterValue && (
                            <IconButton onClick={handleClearFilter} edge="end">
                              <ClearIcon />
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
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
                  >
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      className="table-no-card"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr.No.</TableCell>
                          <TableCell>Country Name</TableCell>
                          <TableCell>Country Code</TableCell>
                          <TableCell>Dial Code</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.length > 0 &&
                        rows.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        ).length > 0 ? (
                          rows
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((info, i) => (
                              <TableRow key={info._id || i}>
                                <TableCell>
                                  {page * rowsPerPage + i + 1}
                                </TableCell>
                                <TableCell>{info.name}</TableCell>
                                <TableCell>{info.code}</TableCell>
                                <TableCell>{info.dial_code}</TableCell>
                                <TableCell>
                                  <label className="active-switch">
                                    <input
                                      type="checkbox"
                                      className="active-switch-input"
                                      checked={info.status === "1"}
                                      onChange={() =>
                                        handleStatusToggle(
                                          info._id,
                                          info.status
                                        )
                                      }
                                    />
                                    <span
                                      className="active-switch-label"
                                      data-on="Active"
                                      data-off="Inactive"
                                    ></span>
                                    <span className="active-switch-handle"></span>
                                  </label>
                                </TableCell>
                                <TableCell className="action-icon">
                                  <i
                                    className="fa-solid fa-pen-to-square"
                                    onClick={() => handleedit(info._id)}
                                    style={{
                                      cursor: "pointer",
                                      marginRight: "10px",
                                    }}
                                  ></i>
                                </TableCell>
                              </TableRow>
                            ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} align="center">
                              No Data Found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    <Stack spacing={2} alignItems="end" marginTop={2}>
                      <Pagination
                        count={Math.ceil(rows.length / rowsPerPage)}
                        page={page + 1}
                        onChange={(event, value) => setPage(value - 1)}
                        shape="rounded"
                        className="page-item"
                      />
                    </Stack>
                    {/* <TablePagination
                      component="div"
                      count={rows.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={10}
                      rowsPerPageOptions={[]}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelRowsPerPage=""
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingRight: 2,
                        marginBottom: 5,
                      }}
                    /> */}
                  </TableContainer>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
