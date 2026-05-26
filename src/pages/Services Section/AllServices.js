import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Stack,
  Pagination,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { GetAllServices, ActiveService } from "../../reducer/ServiceSlice";
import axios from "axios";
import TableSortLabel from "@mui/material/TableSortLabel";
import { baseurl } from "../../Basurl/Baseurl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { usePDF } from "react-to-pdf";
export default function AllServices() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = localStorage.getItem("Role");
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [page, setPage] = useState(0);
  const [showActions, setShowActions] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [activeToggleLoading, setActiveToggleLoading] = useState(null);
  const [pdfRowLimit, setPdfRowLimit] = useState(null);
  const [orderBy, setOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState("asc");
  const { Service, loading, error } = useSelector((state) => state.Service);
  useEffect(() => {
    dispatch(GetAllServices());
  }, [dispatch]);
  useEffect(() => {
    if (Service) {
      setRows(Service);
      setSearchApiData(Service);
    }
  }, [Service]);
  const EditButton = (e, id) => {
    navigate("/Admin/edit-service", { state: { serviceId: id } });
  };
  const handleDelete = async (e, serviceId) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6e7881",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${baseurl}delete_service/${serviceId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.data.success === true) {
          await dispatch(GetAllServices());
          Swal.fire("Deleted!", "Service deleted successfully.", "success");
        }
      } catch (error) {
        console.log("Delete error:", error);
        Swal.fire("Error!", "Something went wrong.", "error");
      }
    }
  };

  const handleSort = (field) => {
    const isAsc = orderBy === field && orderDirection === "asc";
    const direction = isAsc ? "desc" : "asc";

    setOrderBy(field);
    setOrderDirection(direction);

    const sortedData = [...rows].sort((a, b) => {
      let valA = a[field];
      let valB = b[field];

      // ✅ Date sorting
      if (field === "createdAt" || field === "deletedAt") {
        return direction === "asc"
          ? new Date(valA) - new Date(valB)
          : new Date(valB) - new Date(valA);
      }

      // ✅ Price (NUMBER FIX 🔥)
      if (field === "price") {
        return direction === "asc"
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      }

      // ✅ Boolean (status)
      if (field === "isActive") {
        return direction === "asc"
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      }

      // ✅ String
      if (typeof valA === "string") {
        return direction === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return 0;
    });

    setRows(sortedData);
  };
  const dataActiveInactive = async (id, currentState) => {
    try {
      setActiveToggleLoading(id);
      const result = await dispatch(ActiveService({ id })).unwrap();
      console.log("API Response:", result);
      await dispatch(GetAllServices());
      Swal.fire("Status!", "Status updated successfully", "success");
    } catch (err) {
      console.error("Error:", err);
      const errorMessage = err?.message || JSON.stringify(err);
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setActiveToggleLoading(null);
    }
  };
  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);
    setPage(0); // ⭐ IMPORTANT

    if (!value) {
      setRows(searchApiData);
      return;
    }

    const filtered = searchApiData.filter((item) => {
      const id = item.serviceId?.toLowerCase() || "";
      const name = item.serviceName?.toLowerCase() || "";
      const price = item.price?.toString().toLowerCase() || "";
      const duration = item.duration?.toLowerCase() || "";

      return (
        id.includes(value) ||
        name.includes(value) ||
        price.includes(value) ||
        duration.includes(value)
      );
    });

    setRows(filtered);
  };

  const handleClearFilter = () => {
    setFilterValue("");
    setRows(searchApiData);
    setPage(0); // ⭐ IMPORTANT
  };

  const handlegetpdfdata = () => {
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
            "error",
          );
          return;
        }
        setPdfRowLimit(userInput);
        setTimeout(() => {
          toPDF();
          setPdfRowLimit(null);
        }, 300);
      }
    });
  };
  const handleclickondata = () => {
    setShowActions(true);
    setPage(0); // ⭐ IMPORTANT
    dispatch(GetAllServices());
  };
  const handleclickpostdatadesltes = async () => {
    setShowActions(false);
    setPage(0); // ⭐ IMPORTANT

    try {
      const response = await axios.get(`${baseurl}get_deleted_services`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (response) {
        setRows(response.data.services);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setPage(0);
  }, [rows]);
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row gx-3">
          <div className="col-md-12">
            <div className="country-top">
              <div className="topmainhd mb-0">
                <h6>Manage Services</h6>
              </div>
              <div className="search-btn-main">
                <div className="">
                  <TextField
                    className="field-count"
                    label="Search"
                    size="small"
                    value={filterValue}
                    onChange={handleFilter}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" className="input-set">
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
                <div>
                  <Link to="/Admin/add-Services" className="add-button">
                    <i className="fa fa-plus me-2"></i>New Service
                  </Link>
                </div>
                {role === "Admin" ? (
                  <div>
                    <Link onClick={handlegetpdfdata} className="add-button">
                      <i className="fa fa-file-pdf-o me-2"></i>Pdf
                    </Link>
                  </div>
                ) : (
                  ""
                )}
                {localStorage.getItem("Role") === "Admin" ? (
                  showActions === true ? (
                    <button
                      className="add-button"
                      onClick={handleclickpostdatadesltes}
                    >
                      Deleted Data
                    </button>
                  ) : (
                    <button className="add-button" onClick={handleclickondata}>
                      Services
                    </button>
                  )
                ) : null}
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
                    ref={targetRef}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Sr.No.</TableCell>
                        {!showActions === true ? (
                          <>
                            <TableCell>Deleted By Name</TableCell>
                            <TableCell>Deleted By Email</TableCell>
                            <TableCell>Deleted By Time</TableCell>
                            <TableCell>Deleted By Date</TableCell>
                          </>
                        ) : (
                          ""
                        )}
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "serviceId"}
                            direction={
                              orderBy === "serviceId" ? orderDirection : "asc"
                            }
                            onClick={() => handleSort("serviceId")}
                          >
                            Service ID
                          </TableSortLabel>
                        </TableCell>
                        {/* <TableCell>Service Name</TableCell> */}
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "serviceName"}
                            direction={
                              orderBy === "serviceName" ? orderDirection : "asc"
                            }
                            onClick={() => handleSort("serviceName")}
                          >
                            Service Name
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "price"}
                            direction={
                              orderBy === "price" ? orderDirection : "asc"
                            }
                            onClick={() => handleSort("price")}
                          >
                            Price
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "duration"}
                            direction={
                              orderBy === "duration" ? orderDirection : "asc"
                            }
                            onClick={() => handleSort("duration")}
                          >
                            Duration
                          </TableSortLabel>
                        </TableCell>
                        <TableCell>
                          <TableSortLabel
                            active={orderBy === "description"}
                            direction={
                              orderBy === "description" ? orderDirection : "asc"
                            }
                            onClick={() => handleSort("description")}
                          >
                            Description
                          </TableSortLabel>
                        </TableCell>
                        {showActions === true ? (
                          <>
                            <TableCell>
                              <TableSortLabel
                                active={orderBy === "isActive"}
                                direction={
                                  orderBy === "isActive"
                                    ? orderDirection
                                    : "asc"
                                }
                                onClick={() => handleSort("isActive")}
                              >
                                Status
                              </TableSortLabel>
                            </TableCell>
                            <TableCell>Action</TableCell>
                          </>
                        ) : (
                          ""
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(pdfRowLimit
                        ? rows.slice(0, pdfRowLimit)
                        : rows.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                      ).map((info, i) => (
                        <TableRow key={info.serviceId}>
                          <TableCell>
                            {pdfRowLimit ? i + 1 : page * rowsPerPage + i + 1}
                          </TableCell>
                          {!showActions === true ? (
                            <>
                              <TableCell>{info?.deletedBy?.name}</TableCell>
                              <TableCell>{info?.deletedBy?.email}</TableCell>
                              <TableCell>
                                {" "}
                                {info?.deletedAt &&
                                  new Date(info.deletedAt).toLocaleTimeString(
                                    "en-GB",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )}
                              </TableCell>
                              <TableCell>
                                {new Date(info?.deletedAt).toLocaleDateString(
                                  "en-GB",
                                )}
                              </TableCell>
                            </>
                          ) : (
                            ""
                          )}
                          <TableCell>{info.serviceId}</TableCell>
                          <TableCell>{info.serviceName}</TableCell>
                          <TableCell>${info.price}</TableCell>
                          <TableCell>{info.duration}</TableCell>
                          <TableCell>{info.description}</TableCell>
                          {showActions === true ? (
                            <>
                              <TableCell>
                                <label className="active-switch">
                                  <input
                                    type="checkbox"
                                    className="active-switch-input"
                                    checked={Boolean(info.isActive)}
                                    disabled={
                                      activeToggleLoading === info.serviceId
                                    }
                                    onChange={() =>
                                      dataActiveInactive(
                                        info.serviceId,
                                        info.isActive,
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
                              <TableCell>
                                <div className="action-icon">
                                  <i
                                    className="fa-solid fa-pen-to-square"
                                    onClick={(e) =>
                                      EditButton(e, info.serviceId)
                                    }
                                  />
                                  {localStorage.getItem("Role") === "Admin" && (
                                    <i
                                      className="fa-solid fa-trash"
                                      onClick={(e) =>
                                        handleDelete(e, info.serviceId)
                                      }
                                    ></i>
                                  )}
                                </div>
                              </TableCell>
                            </>
                          ) : (
                            ""
                          )}
                        </TableRow>
                      ))}
                      {rows.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            No Data Found
                          </TableCell>
                        </TableRow>
                      )}
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
  );
}
