import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { DeleteEnquiry, GetAllEnquiry } from "../../src/reducer/EnquirySlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { EnquiryStatus } from "../../src/reducer/EnquirySlice";
import MenuItem from "@mui/material/MenuItem";
import { EnquirySample } from "../../src/reducer/EnquirySlice";
import { ImportEnquirys } from "../../src/reducer/EnquirySlice";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import NotesIcon from "@mui/icons-material/Notes";
import FormHelperText from "@mui/material/FormHelperText";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { baseurl } from "../Basurl/Baseurl";
import { Pagination, Stack } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { usePDF } from "react-to-pdf";

export default function Inquiry() {
  const { toPDF, targetRef } = usePDF({ filename: "inquiry.pdf" });
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [date, setDate] = useState();
  const [open2, setOpen2] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [open3, setOpen3] = React.useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [searchApiData, setSearchApiData] = useState([]);
  const dispatch = useDispatch();
  const { Enquiry, loading, error } = useSelector((state) => state.Enquiry);
  const [seekerStatus, setSeekerStatus] = React.useState({});
  const [blogErr, setBlogErr] = useState(false);
  const [pdfRowLimit, setPdfRowLimit] = useState(false);
  console.log(Enquiry);
  const [enqId, setEnqId] = useState("");
  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpen2 = (e, enq) => {
    setOpen2(true);
    setEnqId(enq);
  };
  const handleClickOpen3 = (e) => {
    setOpen3(true);
  };
  useEffect(() => {
    dispatch(GetAllEnquiry());
    console.log(error, Enquiry);
  }, [dispatch]);
  useEffect(() => {
    if (Enquiry) {
      setRows(Enquiry);
      setSearchApiData(Enquiry);
    }
  }, [Enquiry]);
  console.log(searchApiData);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const EditButton = (e, id) => {
    navigate("/Admin/edit-Enquiry", {
      state: {
        enquiryId: id,
      },
    });
  };
  const ViewDetail = (e, id) => {
    navigate("/Admin/Enquiry-Detail", {
      state: {
        enquiryId: id,
      },
    });
  };
  const handleChange = async (event, id) => {
    const { value } = event.target;
    // Update local state first
    setSeekerStatus((prev) => ({
      ...prev,
      [id]: value,
    }));
    try {
      const result = await dispatch(
        EnquiryStatus({ id, status: Number(value) })
      ).unwrap();
      Swal.fire("Success!", "Status updated successfully!", "success");
      // Wait for backend update before fetching new data
      setTimeout(async () => {
        await dispatch(GetAllEnquiry()).unwrap();
      }, 500);
    } catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  };
  const handleSampleFile = async () => {
    try {
      const response = await axios.get(
        `${baseurl}export_enquiries`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
        {
          responseType: "blob",
        }
      );
      console.log(response.data);
      // Create a downloadable link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Sample_Enquiry.xlsx"); // File name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return response.data; // Success response
    } catch (err) {
      console.error(
        "Error downloading the sample file:",
        err.response?.data?.message || err.message
      );
      // Handle error properly or throw
      throw err;
    }
  };
  // console.log(selectedImage)
  const handleImportFile = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error("Please select a file before uploading.");
      // Swal.fire("Error!", "Please select a file before uploading.", "error");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedImage);
    // Debug FormData
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    try {
      // Dispatch your action or make the API call
      const result = await dispatch(ImportEnquirys(formData)).unwrap();
      setOpen3(false);
      dispatch(GetAllEnquiry());
      Swal.fire("Success!", `${result.message}`, "success");
    } catch (err) {
      console.log(err);
      setOpen3(false);
      Swal.fire("Error!", err?.error || "An error occurred", "error");
    }
  };
  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const enquiryId = item.enquiryId?.toLowerCase() || "";
        const emailMatches = item.email.toLowerCase();
        const name = item.name?.toLowerCase() || "";
        const age = item.age?.toString().toLowerCase() || "";
        const comtact = item.emergency_contact?.toString().toLowerCase() || "";
        const country = item.country?.toLowerCase() || "";
        const disease_name = item.disease_name?.toLowerCase() || "";
        const searchValue = event.target.value.toLowerCase();
        return (
          enquiryId.includes(searchValue) ||
          age.includes(searchValue) ||
          comtact.includes(searchValue) ||
          disease_name.includes(searchValue) ||
          name.includes(searchValue) ||
          emailMatches.includes(searchValue) ||
          country.includes(searchValue) ||
          name.includes(searchValue)
        );
      });
      setRows(filterResult);
    }
    setFilterValue(event.target.value);
  };
  const handleClearFilter = () => {
    setFilterValue("");
    setRows(searchApiData);
  };
  const [age, setAge] = React.useState("");

  const handleChange3 = (event) => {
    setAge(event.target.value);
  };
  const handleNotesdata = (e) => {
    e.preventDefault();
    setBlogErr({
      note: false,
      date: false,
    });
    if (!note) {
      setBlogErr((prevState) => ({ ...prevState, note: true }));
    }
    if (!date) {
      setBlogErr((prevState) => ({ ...prevState, date: true }));
    }
    if (!note || !date) {
      return;
    }
    axios
      .post(`${baseurl}add_notes/${enqId}`, {
        note: note,
        date: date,
      })
      .then((response) => {
        console.log(response);
        setBlogErr(false);
        if (response.status === 200) {
          setOpen2(false);
          Swal.fire("Success", "Notes added successfully!", "success");
        }
        setNote("");
        setDate("");
      })
      .catch((error) => {
        setOpen2(false);
        console.log(error);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };

  const handledelete = (e, patientId) => {
    console.log(e);
    // e.preventDefault();

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(DeleteEnquiry({ id: e }))
            .unwrap() // If using Redux Toolkit, unwrap to handle success/failure easily
            .then(() => {
              return dispatch(GetAllEnquiry());
            })
            .then((newData) => {
              Swal.fire("Deleted!", "Patient has been deleted.", "success");
              setRows(newData.payload); // Update rows with the latest data
            })

            .catch((err) => {
              Swal.fire("Error!", err?.message || "An error occurred", "error");
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  };

  const donloadpdf = async () => {
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
            "error"
          );
          return;
        }

        setPdfRowLimit(userInput);

        setTimeout(() => {
          toPDF();
          setPdfRowLimit(null); // reset to normal view
        }, 300);
      }
    });
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="country-top">
                <div className="">
                  <h4 className="page-title mb-0">Enquiries</h4>
                </div>
                <div className="search-btn-main">
                  <div className="mr-3">
                    <TextField
                      sx={{ width: "100%" }}
                      className="field-count"
                      label="Search By Enquiry Id Or Country"
                      id="outlined-required"
                      size="small"
                      value={filterValue}
                      onChange={handleFilter} // Pass event directly
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {filterValue && (
                              <IconButton
                                onClick={handleClearFilter}
                                edge="end"
                                className="input-set"
                              >
                                <ClearIcon />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="">
                    <div className="table-top-btn">
                      <Link to="/Admin/add-Enquiry" className="add-button">
                        <span>
                          <i className="fa fa-plus"></i>
                        </span>
                        New Enquiry
                      </Link>
                      <button
                        onClick={(e) => handleClickOpen3(e)}
                        className="add-button"
                      >
                        <span>
                          <i className="fa fa-file-excel-o mx-1"></i>
                        </span>{" "}
                        Import Excel File
                      </button>
                      <button onClick={handleSampleFile} className="add-button">
                        <span>
                          <i className="fa fa-file"></i>
                        </span>
                        Export File
                      </button>
                      <button onClick={donloadpdf} className="add-button">
                        <span>
                          <i className="fa fa-file-pdf-o"></i>
                        </span>
                        pdf
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main_content">
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <TableContainer
                    component={Paper}
                    style={{ overflowX: "auto" }}
                    ref={targetRef}
                  >
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      className="table-no-card"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr.No.</TableCell>
                          <TableCell>Enquiry IDs</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Country</TableCell>
                          <TableCell>Contact</TableCell>
                          <TableCell>Disease name</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                          <TableCell>Notes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(pdfRowLimit
                          ? rows.slice(0, pdfRowLimit)
                          : rows.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                        ).length > 0 ? (
                          (pdfRowLimit
                            ? rows.slice(0, pdfRowLimit)
                            : rows.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                          ).map((info, i) => (
                            <TableRow
                              role="checkbox"
                              tabIndex={-1}
                              key={info.code}
                            >
                              <TableCell>
                                {pdfRowLimit
                                  ? i + 1
                                  : page * rowsPerPage + i + 1}
                              </TableCell>
                              <TableCell>{info.enquiryId}</TableCell>
                              <TableCell>{info.name}</TableCell>
                              <TableCell>{info.email}</TableCell>
                              <TableCell>{info.country}</TableCell>
                              <TableCell>{info.emergency_contact}</TableCell>
                              <TableCell>{info.disease_name}</TableCell>
                              <TableCell>
                                <FormControl
                                  sx={{ m: 1, minWidth: 120 }}
                                  size="small"
                                  className="cont-main"
                                >
                                  <Select
                                    value={
                                      seekerStatus[info.enquiryId]
                                        ? seekerStatus[info.enquiryId]
                                        : info.Enquiry_status === "Confirmed"
                                        ? "1"
                                        : info.Enquiry_status === "Hold"
                                        ? "2"
                                        : info.Enquiry_status === "Follow-Up"
                                        ? "3"
                                        : info.Enquiry_status === "Dead"
                                        ? "4"
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleChange(e, info.enquiryId)
                                    }
                                    displayEmpty
                                    inputProps={{
                                      "aria-label": "Without label",
                                    }}
                                    className="status-direct"
                                    renderValue={(selected) => {
                                      switch (selected) {
                                        case "1":
                                          return "Confirmed";
                                        case "2":
                                          return "Hold";
                                        case "3":
                                          return "Follow-up";
                                        case "4":
                                          return "Closed";
                                        default:
                                          return "Pending";
                                      }
                                    }}
                                  >
                                    <MenuItem value="1">Confirmed</MenuItem>
                                    <MenuItem value="2">Hold</MenuItem>
                                    <MenuItem value="3">Follow-up</MenuItem>
                                    <MenuItem value="4">Closed</MenuItem>
                                  </Select>
                                </FormControl>
                              </TableCell>
                              <TableCell className="action-icon">
                                <VisibilityIcon
                                  className="eye-icon"
                                  onClick={(e) => ViewDetail(e, info.enquiryId)}
                                />
                                <i
                                  className="fa-solid fa-pen-to-square"
                                  onClick={(e) => EditButton(e, info.enquiryId)}
                                ></i>
                                {localStorage.getItem("Role") === "Admin" && (
                                  <i
                                    className="fa-solid fa-trash"
                                    onClick={() => handledelete(info)}
                                  ></i>
                                )}
                              </TableCell>
                              <TableCell className="action-icon">
                                <i
                                  className="fa-solid fa-notes-medical"
                                  onClick={(e) =>
                                    handleClickOpen2(e, info.enquiryId)
                                  }
                                ></i>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={11}>
                              <div className="flex justify-center py-4">
                                <p className="text-center text-gray-500">
                                  No Data Found
                                </p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    {!pdfRowLimit && (
                      <Stack spacing={2}>
                        <Pagination
                          className="page-nation"
                          count={Math.ceil(rows.length / rowsPerPage)}
                          page={page + 1}
                          onChange={(event, value) => setPage(value - 1)}
                          color="primary"
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
      {/* Import-file-modal */}
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open3}
          onClose={handleClose3}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Import Excel File</h6>
            </div>
            <div className="cross-icon" onClick={handleClose3}>
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <DialogContent className="main-box">
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
              }}
              className="contact-form"
            >
              <Box>
                <form id="contact-form" className="contact-form">
                  <div className="field-set">
                    <label>
                      Choose File<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="file"
                      id="fileSelect"
                      accept=".xlsx, .xls, .csv"
                      onChange={(event) => {
                        const file = event.target.files[0];
                        console.log("Selected file:", file);
                        setSelectedImage(file);
                      }}
                    />
                  </div>
                  <DialogActions className="submit-main">
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={(e) => handleImportFile(e)}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </form>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      {/* Delete-modal */}
      <div
        id="delete_appointment"
        className="modal fade delete-modal"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <img src="assets/img/sent.png" alt="" width="50" height="46" />
              <h3>Are you sure want to delete this Appointment?</h3>
              <div className="m-t-20">
                {" "}
                <a href="#" className="btn btn-white" data-dismiss="modal">
                  Close
                </a>
                <button type="submit" className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Notes-modal */}
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open2}
          onClose={handleClose2}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Create Notes</h6>
            </div>
            <div className="cross-icon" onClick={handleClose2}>
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <DialogContent className="main-box">
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "fit-content",
              }}
              className="contact-form"
            >
              <Box>
                <form id="contact-form">
                  <div className="field-set">
                    <label>
                      Notes<span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="w3review"
                      name="discussionNotes"
                      rows="4"
                      cols="50"
                      className="form-control"
                      placeholder="Note"
                      onChange={(e) => setNote(e.target.value)}
                      value={note}
                    />
                    <span style={{ color: "red" }}>
                      {blogErr && !note ? "Please Enter Your  note" : ""}
                    </span>
                  </div>
                  <div className="field-set">
                    <label>
                      Date<span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      id="birthday"
                      name="date"
                      placeholder="Date"
                      className="form-control"
                      onChange={(e) => setDate(e.target.value)}
                      value={date}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <span style={{ color: "red" }}>
                      {blogErr && !date ? "Please Enter Your  date" : ""}
                    </span>
                  </div>
                  <DialogActions className="submit-main">
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleNotesdata}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </form>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
        <ToastContainer />
      </React.Fragment>
    </>
  );
}
