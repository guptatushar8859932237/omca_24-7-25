import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { GetAllStaffUser } from "../../reducer/StaffSlice";
import { baseurl, image } from "../../Basurl/Baseurl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { ActiveStaffUser } from "../../reducer/StaffSlice";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import { DeleteStaff } from "../../reducer/StaffSlice";
import { Pagination, Stack } from "@mui/material";
import axios from "axios";
import { usePDF } from 'react-to-pdf';
export default function Staff() {
     const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const [pdfRowLimit, setPdfRowLimit] = useState(null);
  const { staff, loading, error } = useSelector((state) => state.staff);

  useEffect(() => {
    dispatch(GetAllStaffUser());
    console.log(error, staff);
  }, [dispatch]);

  useEffect(() => {
    if (staff) {
      setRows(staff);
    }
  }, [staff]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const EditButton = (e, id) => {
    navigate("/Admin/edit-staff", {
      state: {
        staffID: id,
      },
    });
  };

  const dataActiveInactive = async (id, currentState) => {
    try {
      const newState = currentState === 1 ? 0 : 1; // Invert status
      const result = await dispatch(ActiveStaffUser({ id: id })).unwrap();
      dispatch(GetAllStaffUser()); 
      Swal.fire(
        "Status!",
        newState === 1 ? "Activate." : "DeActivate.",
        "success"
      );
    } catch (err) {
      console.error("Error object:", err);
      const errorMessage =
        typeof err === "string"
          ? err
          : typeof err?.message === "string"
          ? err.message
          : typeof err?.message?.message === "string"
          ? err.message.message
          : JSON.stringify(err);
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
    }
  };

  const handledelet = (e, staffID) => {
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
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(DeleteStaff({ id: staffID }))
            .unwrap() // If using Redux Toolkit, unwrap to handle success/failure easily
            .then(() => {
              return dispatch(GetAllStaffUser());
            })
            .then((newData) => {
              Swal.fire("Deleted!", "Staff has been deleted.", "success");
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

  const handleSampleFile = async () => {
    try {
      const response = await axios.get(
        `${baseurl}export_staffs`,
        {
          responseType: "blob", // Important for downloading files
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
      throw err;
    }
  };
  const handlegetpdfdata =()=>{
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
                  <h4 className="page-title mb-0">Manage staff</h4>
                </div>
                <div className="search-btn-main">
                  <div className="mr-3">
                    <TextField
                      className="field-count"
                      sx={{ width: "100%" }}
                      label="Search By Staff Name"
                      id="outlined-size-small"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      
                    />
                  </div>
                  <div className="">
                    <Link to="/Admin/add-staff" className="add-button">
                      <i className="fa fa-plus mx-1"></i> New Staff
                    </Link>
                    <button
                      onClick={handleSampleFile}
                      className="add-button ms-2"
                    >
                      <span>
                        <i className="fa fa-file mx-1"></i>
                      </span>
                      Export File
                    </button>
                    <button
                     onClick={ handlegetpdfdata}
                  
                      className="add-button ms-2"
                    >
                      <span>
                        <i className="fa fa-file-pdf-o"></i>
                      </span>
                  Pdf
                    </button>
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
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Role</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(pdfRowLimit?
                         rows.slice(0, pdfRowLimit)
                          : rows.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                        ).map((info, i) => {
                            console.log(info, "info");
                            return (
                              <TableRow
                                role="checkbox"
                                tabIndex={-1}
                                key={info.code}
                              >
                                <TableCell>
                                 {pdfRowLimit ? i + 1 : page * rowsPerPage + i + 1}
                                </TableCell>
                                <TableCell>
                                  <img
                                    src={`${image}${info.profileImage}`}
                                    className="hos-img"
                                    alt=""
                                  />
                                </TableCell>
                                <TableCell>{info.name}</TableCell>
                                <TableCell>{info.role}</TableCell>
                                <TableCell>{info.email}</TableCell>

                                <TableCell>
                                  {
                                 
                                    <label className="active-switch">
                                      <input
                                        className="active-switch-input "
                                        type="checkbox"
                                        checked={Boolean(info.status)}
                                        onChange={() => {
                                          dataActiveInactive(
                                            info._id,
                                            info.status
                                          );
                                        }}
                                      />
                                      <span
                                        className="active-switch-label "
                                        data-on="Active"
                                        data-off="Inactive"
                                      ></span>
                                      <span className="active-switch-handle"></span>
                                    </label>
                                  }
                                </TableCell>
                                <TableCell className="action-icon">
                                  <i
                                    className="fa-solid fa-pen-to-square"
                                    onClick={(e) => EditButton(e, info._id)}
                                  ></i>
                                 
                                  {localStorage.getItem("Role") === "Admin" ? (
                                    <i
                                      className="fa-solid fa-trash"
                                      onClick={(e) => handledelet(e, info._id)}
                                    ></i>
                                  ) : (
                                    ""
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
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
      <div
        id="delete_patient"
        className="modal fade delete-modal"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <img src="assets/img/sent.png" alt="" width="50" height="46" />
              <h3>Are you sure want to delete this Patient?</h3>
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
    </>
  );
}
