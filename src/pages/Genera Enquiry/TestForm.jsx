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

export default function TestForm() {
  const dispatch = useDispatch();

  const {
    testForms: formData,
    loading,
    error,
  } = useSelector((state) => state.testForms);

  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // Popup states
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  useEffect(() => {
    dispatch(testForms());
  }, [dispatch]);

  const medicalVisaData = formData?.data?.test_form || [];

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
    setPage(0);
  };
  const filteredData = medicalVisaData.filter((item) => {
    const search = filterValue.toLowerCase();

    return (
      item.name?.toLowerCase().includes(search) ||
      item.email?.toLowerCase().includes(search) ||
      String(item.phone)?.toLowerCase().includes(search) ||
      item.date?.toLowerCase().includes(search) ||
      item.time?.toLowerCase().includes(search) ||
      item.address?.toLowerCase().includes(search) ||
      String(item.number_of_people)?.toLowerCase().includes(search)
    );
  });
  const handleClearFilter = () => {
    setFilterValue("");
    setPage(0);
  };
  const sortedData = [...filteredData].sort((a, b) => {
    if (!orderBy) return 0;

    let valA = a[orderBy] || "";
    let valB = b[orderBy] || "";

    // Date handling
    if (orderBy === "date") {
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

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // Open popup
  const handleView = (record) => {
    setSelectedRecord(record);
    setOpen(true);
  };
  const fullWidth = true;
  const maxWidth = "lg"; // xs | sm | md | lg | xl
  const handleClose = () => setOpen(false);
  /* ========= Reusable Info Item ========= */
  const InfoItem = ({ label, value }) => (
    <div className="">
      <h6>{label}</h6>
      <p>{value || "-"}</p>
    </div>
  );
  const handleSort = (field) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };
  const handleChangtype = async (e, b) => {
    console.log(e, b);

    const data = {
      id: b?.id,
      model: "LabTest",
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
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="d-flex justify-content-between">
        <div>
          <h2>Test Form</h2>
        </div>
        <div>
          <div style={{ maxWidth: "300px", marginBottom: "15px" }}>
            <TextField
              label="Search "
              size="small"
              value={filterValue}
              onChange={handleFilter}
              InputLabelProps={{ shrink: true }}
              placeholder="Search..."
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
              sx={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
      {/* Search */}

      {/* Table */}
      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table stickyHeader aria-label="sticky table" className="table-no-card">
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
              <TableCell sortDirection={orderBy === "date" ? order : false}>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleSort("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "time" ? order : false}>
                <TableSortLabel
                  active={orderBy === "time"}
                  direction={orderBy === "time" ? order : "asc"}
                  onClick={() => handleSort("time")}
                >
                  Time
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
                  <TableCell>
                    {new Date(item.date).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>{item.time}</TableCell>
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
                    <VisibilityIcon
                      style={{ cursor: "pointer" }}
                      className="eye-icon"
                      onClick={() => handleView(item)}
                    />
                    {/* <button
                      onClick={() => handleView(item)}
                      style={{
                        padding: "5px 12px",
                        cursor: "pointer",
                        background: "#1976d2",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      View
                    </button> */}
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
        <Stack spacing={2} alignItems="end" marginTop={2} padding={2}>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page + 1}
            onChange={(event, value) => setPage(value - 1)}
            shape="rounded"
          />
        </Stack>
      </TableContainer>

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
              <h6>Test Form </h6>
            </div>
            <div className="cross-icon" onClick={handleClose}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>
        <DialogContent className="main-box view-table-detail">
          {/* <Box>
            {selectedRecord && (
              <div className="table-responsive dataset">
                <table className="table table-bordered mb-0">
                  <tbody>
                    {Object.entries(selectedRecord)
                      .filter(([key]) =>
                        [
                          "name",
                          "email",
                          "phone",
                          "date",
                          "time",
                          "address",
                        ].includes(key)
                      )
                      .map(([key, value]) => (
                        <tr key={key}>
                          <th>
                            {key
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (char) => char.toUpperCase())}
                          </th>
                          <td>{String(value)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </Box> */}
          {selectedRecord && (
            <Box>
              <div className="row">
                {/* personal */}
                <div className="col-md-12 mb-3">
                  {/* <div className="all-hd mb-3">
                        <h6>Personal Information</h6>
                      </div> */}
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
                            value={selectedRecord.phone}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Date"
                            value={new Date(
                              selectedRecord.date,
                            ).toLocaleDateString("en-GB")}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Time" value={selectedRecord.time} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="City" value={selectedRecord.city} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Test Names"
                            value={selectedRecord.test_names}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Hospital"
                            value={selectedRecord.hospital}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Home Sample Collection"
                            value={selectedRecord.home_sample_collection}
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
    </div>
  );
}
