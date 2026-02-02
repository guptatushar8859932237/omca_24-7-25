
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

export default function Hotel() {
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

  const medicalVisaData = formData?.data?.ambulance_requests || [];

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
      item.city?.toLowerCase().includes(search) ||
      item.select_date?.toLowerCase().includes(search) ||
      item.length_of_story?.toLowerCase().includes(search) ||
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
  const maxWidth = "md"; // xs | sm | md | lg | xl
  const handleClose = () => setOpen(false);
  /* ========= Reusable Info Item ========= */
  const InfoItem = ({ label, value }) => (
    <div className="">
      <h6>{label}</h6>
      <p>{value || "-"}</p>
    </div>
  );
  return (
    <div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="d-flex justify-content-between">
        <div>
          <h2>Ambulance Services</h2>
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
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString("en-GB")}</TableCell>
                  <TableCell>
                    <VisibilityIcon
                      className="eye-icon"
                      onClick={() => handleView(item)}
                      style={{cursor:"pointer"}}
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
              < h6>Ambulance Request</h6>
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
                  <div className="all-hd mb-3">
                      <h6>User Information</h6>
                    </div>
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
                      </div>
                    </div>
                  </div>
                   <div className="all-hd mb-3 mt-3">
                      <h6>Emergency Assessment</h6>
                    </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem label="Consciousness Status" value={selectedRecord.consciousness_status} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Breathing Difficulty" value={selectedRecord.breathing_difficulty} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Level of urgency" value={selectedRecord.level_of_urgency} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Bleeding or Trauma Details" value={selectedRecord.bleeding_or_trauma_details} />
                        </div>
                      </div>
                    </div>
                  </div>
                   <div className="all-hd mb-3 mt-3">
                      <h6>Pickup Details</h6>
                    </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem label="Pickup Address" value={selectedRecord.pickup_address} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Pickup Location Type" value={selectedRecord.pickup_location_type} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Pickup Date" value={selectedRecord.pickup_date} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Pickup Time" value={selectedRecord.pickup_time} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="GPS / Location Pin" value={selectedRecord.location_pin} />
                        </div>
                      </div>
                    </div>
                  </div>
                   <div className="all-hd mb-3 mt-3">
                      <h6>Destination Details</h6>
                    </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem label="Destination Address" value={selectedRecord.destination_address} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Hospital Name" value={selectedRecord.hospital_name} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Department or ward" value={selectedRecord.department_or_ward } />
                        </div>
                      </div>
                    </div>
                  </div>
                   <div className="all-hd mb-3 mt-3">
                      <h6>Medical Information</h6>
                    </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem label="Reason For Ambulance Request/Chief Complaint" value={selectedRecord.reason_for_ambulance_request} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Patient Condition" value={selectedRecord.patient_condition} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Ambulance Type" value={selectedRecord.ambulance_type } />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Special Needs" value={selectedRecord.special_needs } />
                        </div>
                      </div>
                    </div>
                  </div>
                   <div className="all-hd mb-3 mt-3">
                      <h6>Attendant / Contact Person</h6>
                    </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem label="Name of Caller Or Attendant" value={selectedRecord.name_of_caller_or_attendant} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Relationship to Patient" value={selectedRecord.relationship_to_patient} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Alternate Contact Number" value={selectedRecord.alternate_contact_number } />
                        </div>
                    
                      </div>
                    </div>
                  </div>
                   <div className="all-hd mb-3 mt-3">
                      <h6>Payment & Authorization</h6>
                    </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem label="Payment Method" value={selectedRecord.payment_method} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Insurance Details" value={selectedRecord.insurance_details} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Approval/Reference Number" value={selectedRecord.reference_number } />
                        </div>
                      </div>
                    </div>
                  </div>
                   <div className="all-hd mb-3 mt-3">
                      <h6>Additional Notes </h6>
                    </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem label="Special Instruction" value={selectedRecord.special_instructions} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Language Preference" value={selectedRecord.language_preference} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Doctor Reference" value={selectedRecord.doctor_reference } />
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
