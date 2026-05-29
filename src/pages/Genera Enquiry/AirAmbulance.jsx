import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testForms } from "../../reducer/FormsEnquiry";
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
import Swal from "sweetalert2";
import { AdminBaseUrl } from "../../Basurl/Baseurl";
import axios from "axios";
export default function AirAmbulance() {
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
  useEffect(() => {
    dispatch(testForms());
  }, [dispatch]);
  const medicalVisaData = formData?.data?.air_ambulance || [];
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
      item.first_name?.toLowerCase().includes(search) ||
      item.email?.toLowerCase().includes(search) ||
      String(item.phone)?.includes(search) ||
      item.services?.toLowerCase().includes(search) ||
      item.city?.toLowerCase().includes(search) ||
      item.from?.toLowerCase().includes(search) ||
      item.to?.toLowerCase().includes(search) ||
      item.select_date?.toLowerCase().includes(search) ||
      String(item.travellers_count)?.includes(search) ||
      String(item.number_of_people)?.includes(search)
    );
  });
  const paginatedData = filteredData.slice(
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
const handleChangtype = async (e, b) => {
  console.log(e, b);
  const data = {
    id: b?.id,
    model: "AirAmbulance",
    status: e?.value || e?.target?.value
  };
  try {
    const response = await axios.post(
      `${AdminBaseUrl}update_user_request_status`,
      data
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
          <h2>Air Medical Escort</h2>
        </div>
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
      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table stickyHeader aria-label="sticky table" className="table-no-card">
          <TableHead>
            <TableRow>
              <TableCell>Sr No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Services</TableCell>
              <TableCell>Status</TableCell>
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
                  <TableCell>{item.services?.replaceAll("_", " ")}</TableCell>
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
                        <MenuItem value="Closed">Closed</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <VisibilityIcon
                      className="eye-icon"
                      onClick={() => handleView(item)}
                      style={{ cursor: "pointer" }}
                    />
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
        <Stack spacing={2} alignItems="end" marginTop={2} padding={2}>
          <Pagination
            count={Math.ceil(filteredData.length / rowsPerPage)}
            page={page + 1}
            onChange={(event, value) => setPage(value - 1)}
            shape="rounded"
          />
        </Stack>
      </TableContainer>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <div className="main-card-header">
          <div className="top-fixed-hd">
            <div className="note-hd">
              <h6>Air Medical Escort </h6>
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
                {/* personal */}
                <div className="col-md-12 mb-3">
                  <div className="all-hd mb-3">
                    <h6>User Information</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem label=" Name" value={selectedRecord.name} />
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
                  <div className="all-hd mb-3 mt-3">
                    <h6>Emergency Assessment</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem
                            label="Consciousness Status"
                            value={selectedRecord.consciousness_status}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Breathing Difficulty"
                            value={selectedRecord.breathing_difficulty}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Level of urgency"
                            value={selectedRecord.level_of_urgency}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Bleeding or Trauma Details"
                            value={selectedRecord.bleeding_or_trauma_details}
                          />
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
                          <InfoItem
                            label="Destination Address"
                            value={selectedRecord.destination_address}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Hospital Name"
                            value={selectedRecord.hospital_name}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Department or ward"
                            value={selectedRecord.department_or_ward}
                          />
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
                          <InfoItem
                            label="Reason For Ambulance Request/Chief Complaint"
                            value={selectedRecord.reason_for_ambulance_request}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Patient Condition"
                            value={selectedRecord.patient_condition}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Ambulance Type"
                            value={selectedRecord.ambulance_type}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Special Needs"
                            value={selectedRecord.special_needs}
                          />
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
                          <InfoItem
                            label="Name of Caller Or Attendant"
                            value={selectedRecord.name_of_caller_or_attendant}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Relationship to Patient"
                            value={selectedRecord.relationship_to_patient}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Alternate Contact Number"
                            value={selectedRecord.alternate_contact_number}
                          />
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
                          <InfoItem
                            label="Payment Method"
                            value={selectedRecord.payment_method}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Insurance Details"
                            value={selectedRecord.insurance_details}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Approval/Reference Number"
                            value={selectedRecord.reference_number}
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