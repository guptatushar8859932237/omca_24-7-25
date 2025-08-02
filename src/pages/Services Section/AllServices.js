import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Stack,
  Pagination,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { GetAllServices, ActiveService } from "../../reducer/ServiceSlice";
import axios from "axios";
import { baseurl } from "../../Basurl/Baseurl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { usePDF } from "react-to-pdf";
export default function AllServices() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [page, setPage] = useState(0);
  const [showActions, setShowActions] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [activeToggleLoading, setActiveToggleLoading] = useState(null);
  const [pdfRowLimit, setPdfRowLimit] = useState(null);

  const { Service, loading, error } = useSelector((state) => state.Service);
  useEffect(() => {
    dispatch(GetAllServices());
  }, [dispatch]);
  useEffect(() => {
    if (Service) {
      setRows(Service);
      setSearchApiData(Service);
    }
  }, [Service]);
  const EditButton = (e, id) => {
    navigate("/Admin/edit-service", { state: { serviceId: id } });
  };
  const handleDelete = async (e, serviceId) => {
    e.preventDefault();
    const response = await axios.delete(
      `${baseurl}delete_service/${serviceId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.success === true) {
      await dispatch(GetAllServices());
      Swal.fire("Status!", "Status updated successfully", "success");
    } else {
      console.log("coe error", error);
    }
  };
  const dataActiveInactive = async (id, currentState) => {
    try {
      setActiveToggleLoading(id);
      const result = await dispatch(ActiveService({ id })).unwrap();
      console.log("API Response:", result);
      await dispatch(GetAllServices());
      Swal.fire("Status!", "Status updated successfully", "success");
    } catch (err) {
      console.error("Error:", err);
      const errorMessage = err?.message || JSON.stringify(err);
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
    } finally {
      setActiveToggleLoading(null);
    }
  };

  const handleFilter = (event) => {
    const value = event.target.value.toLowerCase();
    setFilterValue(value);
    if (!value) {
      setRows(searchApiData);
      return;
    }
    const filtered = searchApiData.filter((item) => {
      const id = item.serviceId?.toLowerCase() || "";
      const name = item.serviceName?.toLowerCase() || "";
      const price = item.price?.toString().toLowerCase() || "";
      const duration = item.duration?.toLowerCase() || "";
      return (
        id.includes(value) ||
        name.includes(value) ||
        price.includes(value) ||
        duration.includes(value)
      );
    });
    setRows(filtered);
  };

  const handleClearFilter = () => {
    setFilterValue("");
    setRows(searchApiData);
  };
  const handlegetpdfdata = () => {
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
 const  handleclickondata =()=>{
   setShowActions(true)
       dispatch(GetAllServices());
 }
  const handleclickpostdatadesltes = async () => {
    setShowActions(false)
    try {
      const response = await axios.get(`${baseurl}get_deleted_services`);
      if (response) {
        console.log(response.data.services);
        setRows(response.data.services);
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="country-top">
              <div>
                <h4 className="page-title mb-0">Manage Services</h4>
              </div>
              <div className="search-btn-main">
                <div className="mr-3">
                  <TextField
                    className="field-count"
                    sx={{ width: "100%" }}
                    label="Search By Service Id and Name"
                    size="small"
                    value={filterValue}
                    onChange={handleFilter}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end" className="input-set">
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
                <div>
                  <Link to="/Admin/add-Services" className="add-button">
                    <i className="fa fa-plus"></i> New Service
                  </Link>
                </div>
                <div>
                  <Link onClick={handlegetpdfdata} className="add-button ms-2">
                    <i className="fa fa-file-pdf-o"></i> Pdf
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main_content">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <TableContainer component={Paper} style={{ overflowX: "auto" }}>
                  <div className="action-icon d-flex justify-content-end p-3">
                   {
  localStorage.getItem("Role") === "Admin" ? (
    showActions === true ? (
      <button className="add-button" onClick={handleclickpostdatadesltes}>
        Deleted Data
      </button>
    ) : (
      <button className="add-button" onClick={handleclickondata}>
        Services
      </button>
    )
  ) : null
}

                   
                  </div>
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    className="table-no-card"
                    ref={targetRef}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Sr.No.</TableCell>
                        <TableCell>Service ID</TableCell>
                        <TableCell>Service Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Duration</TableCell>
                       {
showActions ===true?<>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
</>
                        :""
                       }
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
                        <TableRow key={info.serviceId}>
                          <TableCell>
                            {pdfRowLimit ? i + 1 : page * rowsPerPage + i + 1}
                          </TableCell>
                          <TableCell>{info.serviceId}</TableCell>
                          <TableCell>{info.serviceName}</TableCell>
                          <TableCell>{info.price}</TableCell>
                          <TableCell>{info.duration}</TableCell>
                            {
showActions ===true?<>
                         <TableCell>
                            <label className="active-switch">
                              <input
                                type="checkbox"
                                className="active-switch-input"
                                checked={Boolean(info.isActive)}
                                disabled={
                                  activeToggleLoading === info.serviceId
                                }
                                onChange={() =>
                                  dataActiveInactive(
                                    info.serviceId,
                                    info.isActive
                                  )
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
                              onClick={(e) => EditButton(e, info.serviceId)}
                            />
                            {localStorage.getItem("Role") === "Admin" && (
                              <i
                                className="fa-solid fa-trash"
                                onClick={(e) => handleDelete(e, info.serviceId)}
                              ></i>
                            )}
                          </TableCell>
</>
                        :""
                       }
                         
                        </TableRow>
                      ))}

                      {rows.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            No Data Found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
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
  );
}
