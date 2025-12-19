// import React from 'react'

// export default function Story() {
//   return (
//     <div>
//       Story
//     </div>
//   )
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testForms } from "../../reducer/FormsEnquiry";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, InputAdornment, IconButton, Pagination, Stack,
  Modal, Box,
  Dialog,
  DialogContent
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

export default function Stay() {
  const dispatch = useDispatch();
  const fullWidth = true;
  const maxWidth = "md"; // xs | sm | md | lg | xl
  const { testForms: formData, loading, error } = useSelector(
    (state) => state.testForms
  );

  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  // Popup states
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    dispatch(testForms());
  }, [dispatch]);

  const medicalVisaData = formData?.data?.stay || [];

  const handleFilter = (e) => {
    setFilterValue(e.target.value);
    setPage(0);
  };

  const handleClearFilter = () => {
    setFilterValue("");
    setPage(0);
  };

  const filteredData = medicalVisaData.filter((item) => {
    const search = filterValue.toLowerCase();

    return (
      item.name?.toLowerCase().includes(search) ||
      item.email?.toLowerCase().includes(search) ||
      item.phone?.toLowerCase().includes(search) ||
     new Date(item.select_date).toLocaleDateString("en-GB")?.toLowerCase().includes(search)
    );
  });


  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Open popup
  const handleView = (record) => {
    setSelectedRecord(record);
    setOpen(true);
  };
  /* ========= Reusable Info Item ========= */
  const InfoItem = ({ label, value }) => (
    <div className="">
      <h6>{label}</h6>
      <p>{value || "-"}</p>
    </div>
  );
  const handleClose = () => setOpen(false);

  return (
    <div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="d-flex justify-content-between">
        <div>
          <h2>Stay</h2>

        </div >
        <div>
          <div style={{ maxWidth: "300px", marginBottom: "15px" }}>
            <TextField
              label="Search"
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
      <TableContainer component={Paper}
        style={{ overflowX: "auto" }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          className="table-no-card"
        >
          <TableHead>
            <TableRow>
              <TableCell>Sr No.</TableCell>
              <TableCell> Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Total People</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Date</TableCell>
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
                  <TableCell>{item.number_of_people}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{new Date(item.select_date).toLocaleDateString("en-GB")}</TableCell>
                  <TableCell>
                    <VisibilityIcon
                      className="eye-icon"
                      style={{cursor:"pointer"}}
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
        open={open} onClose={handleClose}
      >
        <div className="main-card-header">
          <div className="top-fixed-hd">
            <div className="note-hd">
              < h6>Stay Request</h6>
            </div>
            <div className="cross-icon" onClick={handleClose}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>
        <DialogContent className="main-box view-table-detail">
        
            {/* {selectedRecord && (
              <div className="table-responsive dataset">
                <table className="table table-bordered mb-0">
                  <tbody>
                    {Object.entries(selectedRecord)
                      .filter(([key]) =>
                        [
                          "email",
                          "name",
                          "email",
                          "phone",
                          "city",
                          "select_date",
                          "number_of_people",
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
            )} */}
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
                            <InfoItem label="Email" value={selectedRecord.email} />
                          </div>
                          <div className="col-md-4">
                            <InfoItem label="Phone Number" value={selectedRecord.phone} />
                          </div>
                          <div className="col-md-4">
                            <InfoItem label="Date" value={new Date(selectedRecord.select_date).toLocaleDateString("en-GB")} />
                          </div>
                          <div className="col-md-4">
                            <InfoItem label="City" value={selectedRecord.city} />
                          </div>
                          <div className="col-md-4">
                            <InfoItem label="Whatsapp Number" value={selectedRecord.number_of_people} />
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
