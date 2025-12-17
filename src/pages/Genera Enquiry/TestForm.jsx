// import React from 'react'

// export default function TestForm() {
//   return (
//     <div>
      
//     </div>
//   )
// }
// import React from 'react'

// export default function AirAmbulance() {
//   return (
//     <div>
      
//     </div>
//   )
// }
// import React from 'react'

// export default function Hotel() {
//   return (
//     <div>
//       Hotel
//     </div>
//   )
// }
// import React from 'react'

// export default function Vil() {
//   return (
//     <div>
//       vil
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

export default function TestForm() {
  const dispatch = useDispatch();

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

  const medicalVisaData = formData?.data?.test_form || [];

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
    item.date?.toLowerCase().includes(search) ||
    item.time?.toLowerCase().includes(search) ||
    item.address?.toLowerCase().includes(search) ||
    item.number_of_people?.toLowerCase().includes(search) 
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
 const fullWidth = true;
const maxWidth = "lg"; // xs | sm | md | lg | xl
  const handleClose = () => setOpen(false);

  return (
    <div>

      {loading && <p>Loading...</p>}
      {error &&  <p style={{ color: "red" }}>{error}</p>}
        <div className="d-flex justify-content-between">
            <div>
      <h2>Test Forms</h2>
            </div >
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
      <TableContainer   component={Paper}
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
              <TableCell>Phone</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Address</TableCell>
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
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.time}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>
                      <VisibilityIcon
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
                                          open={open} onClose={handleClose}
                                        >
                                          <div className="main-card-header">
                                            <div className="top-fixed-hd">
                                              <div className="note-hd">
                                                < h6>Test Form Request</h6>
                                              </div>
                                              <div className="cross-icon" onClick={handleClose}>
                                                <i className="fa-solid fa-xmark"></i>
                                              </div>
                                            </div>
                                          </div>
                                          <DialogContent className="main-box view-table-detail">
                                    <Box>
                                      {selectedRecord && (
                                        <div className="table-responsive dataset">
                                          <table className="table table-bordered mb-0">
                                            <tbody>
                                              {Object.entries(selectedRecord)
                                                .filter(([key]) =>
                                                  [
                                                    "first_name",
                                                    "email",
                                                    "phone",
                                                    "services",
                                                    "from",
                                                    "to",
                                                    "select_date",
                                                    "travellers_count",
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
                                    </Box>
                                  </DialogContent>
                                  
                                        </Dialog>
    </div>
  );
}
