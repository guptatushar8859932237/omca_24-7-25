// import React from 'react'

// export default function PickUpanddrops() {
//   return (
//     <div>
//       Pickup and drops
//     </div>
//   )
// }
// // import React from 'react'

// // export default function Story() {
// //   return (
// //     <div>
// //       Story
// //     </div>
// //   )
// // }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testForms } from "../../reducer/FormsEnquiry";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, InputAdornment, IconButton, Pagination, Stack,
  Modal, Box
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

export default function PickUpanddrops() {
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

  const medicalVisaData = formData?.data?.pickup || [];

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
    item.city?.toLowerCase().includes(search) ||
    item.phone?.toLowerCase().includes(search) ||
    item.perfired_time?.toLowerCase().includes(search) ||
    item.pickup_location?.toLowerCase().includes(search) ||
    item.travel_date?.toLowerCase().includes(search) ||
    item.drop_location?.toLowerCase().includes(search)
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

  const handleClose = () => setOpen(false);

  return (
    <div>

      {loading && <p>Loading...</p>}
      {error &&  <p style={{ color: "red" }}>{error}</p>}
        <div className="d-flex justify-content-between">
            <div>
      <h2>Pickup and Drop</h2>
            </div >
            <div>
 <div style={{ maxWidth: "300px", marginBottom: "15px" }}>
        <TextField
          label="Search by applying for"
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
              <TableCell>Time</TableCell>
              <TableCell>Traveller  Date</TableCell>
              <TableCell>Pickup Location</TableCell>
              <TableCell>Drop Location</TableCell>
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
                  <TableCell>{item.perfired_time}</TableCell>
                  <TableCell>{item.travel_date}</TableCell>
                  <TableCell>{item.pickup_location}</TableCell>
                  <TableCell>{item.drop_location}</TableCell>
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
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 500,
            bgcolor: "white",
            p: 3,
            borderRadius: "8px",
            margin: "80px auto",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <h3>Full Details</h3>

          {selectedRecord &&
            Object.entries(selectedRecord).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {String(value)}
              </p>
            ))}

          <button
            onClick={handleClose}
            style={{
              marginTop: "15px",
              padding: "6px 15px",
              background: "black",
              color: "white",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </Box>
      </Modal>
    </div>
  );
}
