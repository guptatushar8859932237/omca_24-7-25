
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { testForms } from "../../reducer/FormsEnquiry";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TextField, InputAdornment, IconButton, Pagination, Stack,
  Modal, Box
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ClearIcon from "@mui/icons-material/Clear";

export default function MedicalVisa() {
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

  const medicalVisaData = formData?.data?.medical_visa || [];

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
      item.applying_for?.toLowerCase().includes(search) ||
      item.first_name?.toLowerCase().includes(search) ||
      item.last_name?.toLowerCase().includes(search) ||
      item.nationality?.toLowerCase().includes(search) ||
      item.phone_number?.toLowerCase().includes(search) ||
      item.passport_number?.toLowerCase().includes(search)
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="d-flex justify-content-between">
        <div>
          <h2>Medical Visa Request</h2>

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
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell>Passport No</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Applying For</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{page * rowsPerPage + i + 1}</TableCell>
                  <TableCell>{item.first_name}</TableCell>
                  <TableCell>{item.last_name}</TableCell>
                  <TableCell>{item.nationality}</TableCell>
                  <TableCell>{item.passport_number}</TableCell>
                  <TableCell>{item.phone_number}</TableCell>
                  <TableCell>{item.applying_for}</TableCell>
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
              < h6>Medical Visa Request</h6>
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
                  "from",
                  "applying_for",
                  "email",
                  "whatsApp_number",
                  "phone_number",
                  "return_date",
                  "arrival_date",
                  "airport_arrival",
                  "first_name",
                  "middle_name",
                  "last_name",
                  "dob",
                  "nationality",
                  "country_of_birth",
                  "country_residence",
                  "passport_number",
                  "present_address",
                  "permanent_address",
                  "father_name",
                  "father_nationality",
                  "father_place_of_birth",
                  "father_country_of_birth",
                  "mother_name",
                  "mother_nationality",
                  "mother_place_of_birth",
                  "mother_country_birth",
                  "reference_name",
                  "reference_permanent_address",
                  "reference_phone_number",
                  "reference_name_country",
                  "reference_permanent_address_2",
                  "reference_phone_number_2",
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
