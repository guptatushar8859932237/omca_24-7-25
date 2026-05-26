import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testForms } from "../../reducer/FormsEnquiry";
import TableSortLabel from "@mui/material/TableSortLabel";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { AdminBaseUrl } from "../../Basurl/Baseurl";
import axios from "axios";
import Swal from "sweetalert2";
export default function FlightSrvices() {
  const dispatch = useDispatch();
  const {
    testForms: formData,
    loading,
    error,
  } = useSelector((state) => state.testForms);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  useEffect(() => {
    dispatch(testForms());
  }, [dispatch]);
  const medicalVisaData = formData?.data?.flight || [];
  const handleFilter = (e) => {
    setFilterValue(e.target.value);
    setPage(0);
  };
  const handleClearFilter = () => {
    setFilterValue("");
    setPage(0);
  };
  const handleSort = (field) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const filteredData = medicalVisaData.filter((item) => {
    const search = filterValue.toLowerCase();
    return (
      item.first_name?.toLowerCase().includes(search) ||
      item.email?.toLowerCase().includes(search) ||
      item.city?.toLowerCase().includes(search) ||
      String(item.phone)?.includes(search) ||
      item.services?.replaceAll("_", " ")?.toLowerCase().includes(search) ||
      item.to?.toLowerCase().includes(search) ||
      item.from?.toLowerCase().includes(search) ||
      new Date(item.select_date)
        .toLocaleDateString("en-GB")
        ?.toLowerCase()
        .includes(search)
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!orderBy) return 0;

    let valA = a[orderBy] || "";
    let valB = b[orderBy] || "";

    // Date sorting
    if (orderBy === "select_date") {
      return order === "asc"
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    }

    // Number sorting
    if (!isNaN(valA) && !isNaN(valB)) {
      return order === "asc" ? valA - valB : valB - valA;
    }

    // String sorting
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
  const maxWidth = "md"; // xs | sm | md | lg | xl
  const handleClose = () => setOpen(false);
  /* ========= Reusable Info Item ========= */
  const InfoItem = ({ label, value }) => (
    <div className="">
      <h6>{label}</h6>
      <p>{value || "-"}</p>
    </div>
  );
  const handleChangtype = async (e, b) => {
    console.log(e, b);
    const data = {
      id: b?.id,
      model: "Flight",
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
          <h6>Flight Service</h6>
        </div>
        <div classname="">
          <TextField
            label="Search"
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
                <TableCell>Sr.No.</TableCell>
                <TableCell
                  sortDirection={orderBy === "first_name" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "first_name"}
                    direction={orderBy === "first_name" ? order : "asc"}
                    onClick={() => handleSort("first_name")}
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
                  sortDirection={orderBy === "select_date" ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === "select_date"}
                    direction={orderBy === "select_date" ? order : "asc"}
                    onClick={() => handleSort("select_date")}
                  >
                    Date
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
                    <TableCell>{item.first_name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      {new Date(item.select_date).toLocaleDateString("en-GB")}
                    </TableCell>
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
                          onClick={() => handleView(item)}
                          style={{ cursor: "pointer" }}
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
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <div className="main-card-header">
          <div className="top-fixed-hd">
            <div className="note-hd">
              <h6>Flight Service </h6>
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
                <div className="col-md-12 mb-3">
                  <div className="all-hd mb-3 mt-3">
                    <h6>User Details</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem
                            label="Name"
                            value={selectedRecord.first_name}
                          />
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
                            label="Passport Number"
                            value={selectedRecord.passport_number}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="all-hd mb-3 mt-3">
                    <h6>Travel Details</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem label=" From" value={selectedRecord.from} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="To" value={selectedRecord.to} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Travel Date"
                            value={new Date(
                              selectedRecord.select_date,
                            ).toLocaleDateString("en-GB")}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Arrival Time "
                            value={selectedRecord.arrival_time}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Number of Traveller"
                            value={selectedRecord.travellers_count}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Service "
                            value={selectedRecord.services}
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
