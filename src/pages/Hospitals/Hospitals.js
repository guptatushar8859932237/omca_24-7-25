import React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import { GetAllHositalData } from "../../reducer/HospitalSlice";
import { useSelector, useDispatch } from "react-redux";
import { baseurl, image } from "../../Basurl/Baseurl";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DeleteHospital } from "../../reducer/HospitalSlice";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { Pagination, Stack } from "@mui/material";
import { usePDF } from 'react-to-pdf';
import axios from "axios";
export default function Hospitals() {
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({ filename: "hospitals.pdf" });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [pdfRowLimit, setPdfRowLimit] = useState(null); // ✅ NEW

  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const { hospital, loading, error } = useSelector((state) => state.hospital);

  useEffect(() => {
    dispatch(GetAllHositalData());
  }, [dispatch]);

  useEffect(() => {
    if (hospital) {
      setRows(hospital);
      setSearchApiData(hospital);
    }
  }, [hospital]);

  const handlePDFGenerateWithLimit = () => {
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const EditButton = (e, id) => {
    navigate("/Admin/edit-hospitals", {
      state: {
        hospitalId: id,
      },
    });
  };


  const handledelet = (e, hospitalId) => {
    e.preventDefault();

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
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(DeleteHospital({ id: hospitalId }))
            .unwrap() // If using Redux Toolkit, unwrap to handle success/failure easily
            .then(() => {
              return dispatch(GetAllHositalData());
            })
            .then((newData) => {
              Swal.fire("Deleted!", "Hospital has been deleted.", "success");
              setRows(newData.payload); // Update rows with the latest data
            })
            .catch((err) => {
              Swal.fire("Error!", err?.message || "An error occurred", "error");
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            // text: "Hospital data is safe :)",
            icon: "error",
          });
        }
      });
  };

  const handleFilter = (event) => {
    const searchValue = event.target.value.toLowerCase();

    if (searchValue === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const enquiryId = item.enquiryId?.toLowerCase() || "";
        const hospitalName = item.hospitalName?.toLowerCase() || "";
        const patientName = item.patient_name?.toLowerCase() || "";
        const location = item.location?.toLowerCase() || "";
        const hospitalCode = item.hospitalCode?.toLowerCase() || "";
        const country = item.country?.toLowerCase() || "";
        const contact = item.contact?.toString() || "";

        return (
          enquiryId.includes(searchValue) ||
          hospitalName.includes(searchValue) ||
          patientName.includes(searchValue) ||
          location.includes(searchValue) ||
          country.includes(searchValue) ||
          contact.includes(searchValue) ||
          hospitalCode.includes(searchValue)
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

  const handleStatusToggle = async (hospitalId, newStatus) => {
    console.log(hospitalId, newStatus);
    try {
      const datapost = { status: newStatus === true ? 1 : 0 };

      const response = await axios.post(
        `${baseurl}/changeHospitalStatus/${hospitalId}`,
        datapost
      );

      if (response.status === 200) {
        Swal.fire("Status Updated!", "", "success");
        return dispatch(GetAllHositalData());
        // Optionally refresh list or update UI
        // await fetchHospitals();
      } else {
        Swal.fire("Error!", "Failed to update status", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error!",
        error?.response?.data?.message || "Could not update status",
        "error"
      );
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          {/* HEADER */}
          <div className="row">
            <div className="col-md-12">
              <div className="country-top">
                <h4 className="page-title mb-0">Manage Hospitals</h4>
                <div className="search-btn-main">
                  <div className="">
                  <TextField
                    className="field-count"
                    sx={{ width: "100%" }}
                    label="Search By Hospitals Name"
                    id="outlined-size-small"
                    size="small"
                    value={filterValue}
                    onChange={handleFilter}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {filterValue && (
                            <IconButton onClick={handleClearFilter} edge="end">
                              <ClearIcon />
                            </IconButton>
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  </div>
                  <div className="">
                    <Link to="/Admin/add-hospitals" className="add-button">
                    <i className="fa fa-plus"></i> New Hospital
                  </Link>
                  <Link onClick={handlePDFGenerateWithLimit} className="add-button ms-2">
                    <i className="fa fa-file-pdf-o"></i> Pdf
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="main_content">
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <TableContainer component={Paper} style={{ overflowX: "auto" }}>
                    <Table
                      stickyHeader
                      aria-label="hospital table"
                      className="table-no-card"
                      ref={targetRef}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr.No.</TableCell>
                          <TableCell>Image</TableCell>
                          <TableCell>Hospital Name</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell>Hospital Code</TableCell>
                          <TableCell>Contact</TableCell>
                          <TableCell>Num. of Patient</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(pdfRowLimit
                          ? rows.slice(0, pdfRowLimit)
                          : rows.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        ).map((info, i) => (
                          <TableRow key={info.hospitalId}>
                            <TableCell>
                              {pdfRowLimit ? i + 1 : page * rowsPerPage + i + 1}
                            </TableCell>
                            <TableCell>
                              <img
                                src={`${image}${info.hospitalImage}`}
                                className="hos-img"
                                alt=""
                              />
                            </TableCell>
                            <TableCell>{info.hospitalName}</TableCell>
                            <TableCell>{info.location}</TableCell>
                            <TableCell>{info.hospitalCode}</TableCell>
                            <TableCell>{info.contact}</TableCell>
                            <TableCell
                              className="text-primary"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                navigate("/Admin/totalUser", {
                                  state: { data: info.hospitalId },
                                })
                              }
                            >
                              {info.patientCount}
                            </TableCell>
                            <TableCell>
                              <label className="active-switch">
                                <input
                                  type="checkbox"
                                  className="active-switch-input"
                                  checked={info.status === 1}
                                  onChange={(e) =>
                                    handleStatusToggle(info.hospitalId, e.target.checked)
                                  }
                                />
                                <span
                                  className="active-switch-label"
                                  data-on="Active"
                                  data-off="Inactive"
                                ></span>
                                <span className="active-switch-handle"></span>
                              </label>
                            </TableCell>
                            <TableCell className="action-icon">
                              <i
                                className="fa-solid fa-pen-to-square"
                                onClick={(e) => EditButton(e, info.hospitalId)}
                              />
                              {localStorage.getItem("Role") === "Admin" && (
                                <i
                                  className="fa-solid fa-trash"
                                  onClick={(e) => handledelet(e, info.hospitalId)}
                                />
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        {rows.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={9} align="center">
                              No Data Found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>

                    {/* PAGINATION: hide during PDF view */}
                    {!pdfRowLimit && (
                      <Stack spacing={2} alignItems="end" marginTop={2}>
                        <Pagination
                          count={Math.ceil(rows.length / rowsPerPage)}
                          page={page + 1}
                          onChange={(event, value) => setPage(value - 1)}
                          shape="rounded"
                          className="page-item"
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
    </>
  );
}
