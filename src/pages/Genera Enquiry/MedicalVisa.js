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
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { AdminBaseUrl, baseurl } from "../../Basurl/Baseurl";
import Swal from "sweetalert2";

export default function MedicalVisa() {
  const dispatch = useDispatch();
  const {
    testForms: formData,
    loading,
    error,
  } = useSelector((state) => state.testForms);
  const [order, setOrder] = useState("asc"); // asc | desc
  const [orderBy, setOrderBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
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
      String(item.phone_number)?.includes(search) ||
      item.passport_number?.toLowerCase().includes(search)
    );
  });

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(field);
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!orderBy) return 0;

    let valA = a[orderBy] || "";
    let valB = b[orderBy] || "";

    // number handling
    if (!isNaN(valA) && !isNaN(valB)) {
      return order === "asc" ? valA - valB : valB - valA;
    }

    // string handling
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
      model: "Medical",
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
          <h2>Medical Visa </h2>
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
              <TableCell
                sortDirection={orderBy === "first_name" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "first_name"}
                  direction={orderBy === "first_name" ? order : "asc"}
                  onClick={() => handleSort("first_name")}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              {/* <TableCell>First Name</TableCell> */}
              <TableCell
                sortDirection={orderBy === "last_name" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "last_name"}
                  direction={orderBy === "last_name" ? order : "asc"}
                  onClick={() => handleSort("last_name")}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "country" ? order : false}>
                <TableSortLabel
                  active={orderBy === "country"}
                  direction={orderBy === "country" ? order : "asc"}
                  onClick={() => handleSort("country")}
                >
                  Country
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={orderBy === "passport_number" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "passport_number"}
                  direction={orderBy === "passport_number" ? order : "asc"}
                  onClick={() => handleSort("passport_number")}
                >
                  Passport No
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "phone_number"}
                  direction={orderBy === "phone_number" ? order : "asc"}
                  onClick={() => handleSort("phone_number")}
                >
                  Phone
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "applying_for"}
                  direction={orderBy === "applying_for" ? order : "asc"}
                  onClick={() => handleSort("applying_for")}
                >
                  Applying For
                </TableSortLabel>
              </TableCell>
              <TableCell sortDirection={orderBy === "status" ? order : false}>
                <TableSortLabel
                  active={orderBy === "status"}
                  direction={orderBy === "status" ? order : "asc"}
                  onClick={() => handleSort("status")}>
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
                  <TableCell>{item.last_name}</TableCell>
                  <TableCell>{item.nationality}</TableCell>
                  <TableCell>{item.passport_number}</TableCell>
                  <TableCell>{item.phone_number}</TableCell>
                  <TableCell>{item.applying_for?.replaceAll("_", " ")} </TableCell>
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
                      className="eye-icon"
                      style={{ cursor: "pointer" }}
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
              <h6>Medical Visa </h6>
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
          )} */}
          {selectedRecord && (
            <Box>
              <div className="row">
                {/* personal */}
                <div className="col-md-12 mb-3">
                  <div className="all-hd mb-3">
                    <h6>Personal Information</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem
                            label="First Name"
                            value={selectedRecord.first_name}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Middle Name"
                            value={selectedRecord.middle_name}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Last Name"
                            value={selectedRecord.last_name}
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
                            label="Dob"
                            value={new Date(
                              selectedRecord.dob,
                            ).toLocaleDateString("en-GB")}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Whatsapp Number"
                            value={selectedRecord.whatsApp_number}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Phone Number"
                            value={selectedRecord.phone_number}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* address */}
                <div className="col-md-12 mb-3">
                  <div className="all-hd mb-3">
                    <h6>Nationality & Address Details</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem
                            label="Nationality"
                            value={selectedRecord.nationality}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Country of Birth"
                            value={selectedRecord.country_of_birth}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Country Residence"
                            value={selectedRecord.country_residence}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Present Address"
                            value={selectedRecord.present_address}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Permanent Address"
                            value={selectedRecord.permanent_address}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* travel */}
                <div className="col-md-12 mb-3">
                  <div className="all-hd mb-3">
                    <h6>Travel Information</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem label="From" value={selectedRecord.from} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Applying For"
                            value={selectedRecord.applying_for}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Return Date"
                            value={new Date(
                              selectedRecord.return_date,
                            ).toLocaleDateString("en-GB")}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Arrival Date"
                            value={new Date(
                              selectedRecord.arrival_date,
                            ).toLocaleDateString("en-GB")}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Airport Arrival"
                            value={selectedRecord.airport_arrival}
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
                </div>
                {/* FATHER */}
                <div className="col-md-6 mb-3">
                  <div className="all-hd mb-3">
                    <h6>Father's Details</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <InfoItem
                            label="Name"
                            value={selectedRecord.father_name}
                          />
                        </div>
                        <div className="col-md-6">
                          <InfoItem
                            label="Nationality"
                            value={selectedRecord.father_nationality}
                          />
                        </div>
                        <div className="col-md-6">
                          <InfoItem
                            label="Place of birth"
                            value={selectedRecord.father_place_of_birth}
                          />
                        </div>
                        <div className="col-md-6">
                          <InfoItem
                            label="Country of birth"
                            value={selectedRecord.father_country_of_birth}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* MOTHER */}
                <div className="col-md-6 mb-3">
                  <div className="all-hd mb-3">
                    <h6>Mother's Details</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <InfoItem
                            label="Name"
                            value={selectedRecord.mother_name}
                          />
                        </div>
                        <div className="col-md-6">
                          <InfoItem
                            label="Nationality"
                            value={selectedRecord.mother_nationality}
                          />
                        </div>
                        <div className="col-md-6">
                          <InfoItem
                            label="Place of birth"
                            value={selectedRecord.mother_place_of_birth}
                          />
                        </div>
                        <div className="col-md-6">
                          <InfoItem
                            label="Country of birth"
                            value={selectedRecord.mother_country_birth}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* REFERENCE */}
                <div className="col-md-12 mb-3">
                  <div className="all-hd mb-3">
                    <h6>Reference Details</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem
                            label="Name"
                            value={selectedRecord.reference_name}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Permanent Address"
                            value={selectedRecord.reference_permanent_address}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Phone Number"
                            value={selectedRecord.reference_phone_number}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Country Name"
                            value={selectedRecord.reference_name_country}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Permanent Address-2"
                            value={selectedRecord.reference_permanent_address_2}
                          />
                        </div>
                        <div className="col-md-4">
                          <InfoItem
                            label="Phone Number-2"
                            value={selectedRecord.reference_phone_number_2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-12 mb-3">
                  <div className="all-hd mb-3">
                    <h6>Document Details</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <InfoItem label="" value={selectedRecord.reference_name} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Permanent Address" value={selectedRecord.reference_permanent_address} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Phone Number" value={selectedRecord.reference_phone_number} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Country Name" value={selectedRecord.reference_name_country} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Permanent Address-2" value={selectedRecord.reference_permanent_address_2} />
                        </div>
                        <div className="col-md-4">
                          <InfoItem label="Phone Number-2" value={selectedRecord.reference_phone_number_2} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="col-md-12 mt-3">
                  <div className="all-hd mb-3">
                    <h6>Document Details</h6>
                  </div>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        {/* Document 1 */}
                        <div className="col-md-4 mb-3">
                          <div className="border rounded p-2 text-center">
                            <h6 className="mb-2 fw-bold">
                              {selectedRecord.reference_doc_name_1 || "image"}
                            </h6>
                            <img
                              src={`https://omcacrm.com/omca/public/upload/photo/${selectedRecord.applicant_photo}`}
                              alt="doc-1"
                              className="img-fluid rounded"
                              style={{
                                height: "180px",
                                objectFit: "cover",
                                width: "100%",
                              }}
                            />
                          </div>
                        </div>

                        {/* Document 2 */}
                        <div className="col-md-4 mb-3">
                          <div className="border rounded p-2 text-center">
                            <h6 className="mb-2 fw-bold">
                              {selectedRecord.reference_doc_name_2 || "Visa"}
                            </h6>
                            <img
                              src={`https://omcacrm.com/omca/public/upload/medicalvisa/${selectedRecord.medical_visa}`}
                              alt="doc-2"
                              className="img-fluid rounded"
                              style={{
                                height: "180px",
                                objectFit: "cover",
                                width: "100%",
                              }}
                            />
                          </div>
                        </div>

                        {/* Document 3 */}
                        <div className="col-md-4 mb-3">
                          <div className="border rounded p-2 text-center">
                            <h6 className="mb-2 fw-bold">
                              {selectedRecord.reference_doc_name_3 ||
                                "Passport"}
                            </h6>
                            <img
                              src={`https://omcacrm.com/omca/public/upload/passport/${selectedRecord.passport_copy}`}
                              alt="doc-3"
                              className="img-fluid rounded"
                              style={{
                                height: "180px",
                                objectFit: "cover",
                                width: "100%",
                              }}
                            />
                          </div>
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
