// import { Link } from "react-router-dom";
// import TableContainer from "@mui/material/TableContainer";
// import Swal from "sweetalert2";
// import Paper from "@mui/material/Paper";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { GetAllTreatment } from "../../reducer/TreatmentSlice";
// import { useState, useEffect } from "react";
// import TableCell from "@mui/material/TableCell";
// import { DeleteTreatment } from "../../reducer/TreatmentSlice";
// import {
//   Pagination,
//   Stack,
//   Table,
//   TableBody,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import { usePDF } from 'react-to-pdf';
// export default function Treatments() {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]);
//   const dispatch = useDispatch();
//   const { Treatment, loading, error } = useSelector((state) => state.Treatment);
//    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
//   useEffect(() => {
//     dispatch(GetAllTreatment());
//   }, [dispatch]);

//   useEffect(() => {
//     if (Treatment) {
//       setRows(Treatment);
//     }
//   }, [Treatment]);

//   console.log(error, Treatment);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const EditButton = (e, id) => {
//     navigate("/Admin/edit-treatments", {
//       state: {
//         course_id: id,
//       },
//     });
//   };
//   const handledelet = (e, hospitalId) => {
//     e.preventDefault();

//     const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton: "btn btn-success",
//         cancelButton: "btn btn-danger",
//       },
//       buttonsStyling: false,
//     });
//     swalWithBootstrapButtons
//       .fire({
//         title: "Are you sure?",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel!",
//         reverseButtons: true,
//       })
//       .then((result) => {
//         if (result.isConfirmed) {
//           dispatch(DeleteTreatment({ id: hospitalId }))
//             .unwrap() // If using Redux Toolkit, unwrap to handle success/failure easily
//             .then(() => {
//               return dispatch(GetAllTreatment());
//             })
//             .then((newData) => {
//               Swal.fire(
//                 "Deleted!",
//                 "Treatment Course has been deleted.",
//                 "success"
//               );
//               setRows(newData.payload); // Update rows with the latest data
//             })
//             .catch((err) => {
//               Swal.fire("Error!", err?.message || "An error occurred", "error");
//             });
//         } else if (result.dismiss === Swal.DismissReason.cancel) {
//           swalWithBootstrapButtons.fire({
//             title: "Cancelled",
//             // text: "Hospital data is safe :)",
//             icon: "error",
//           });
//         }
//       });
//   };
//   return (
//     <>
//       <div className="page-wrapper">
//         <div className="content">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="country-top">
//                 <div className="">
//                   <h4 className="page-title mb-0">Manage Treatments</h4>
//                 </div>
//                 <div className="search-btn-main">
//                   <div className="">
//                     <Link to="/Admin/add-treatments" className="add-button">
//                       <i className="fa fa-plus"></i> New Treatment
//                     </Link>
//                     <Link onClick={() => toPDF()}  className="add-button ms-2">
//                       <i className="fa fa-file-pdf-o"></i> Pdf
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="main_content">
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="table-responsive">
//                   <TableContainer
//                     component={Paper}
//                     style={{ overflowX: "auto" }}
//                   >
//                     <Table
//                       stickyHeader
//                       aria-label="sticky table"
//                       className="table-no-card"
//                       ref={targetRef}
//                     >
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Sr.No.</TableCell>
//                           <TableCell>Disease Name</TableCell>
//                           <TableCell>Price </TableCell>
//                           <TableCell>Demanding Country</TableCell>
//                           <TableCell>Action</TableCell>
//                         </TableRow>
//                       </TableHead>

//                       <TableBody>
//                         {rows.length > 0 &&
//                         rows.slice(
//                           page * rowsPerPage,
//                           page * rowsPerPage + rowsPerPage
//                         ).length > 0 ? (
//                           rows
//                             .slice(
//                               page * rowsPerPage,
//                               page * rowsPerPage + rowsPerPage
//                             )
//                             .map((info, i) => (
//                               <TableRow key={info.serviceId}>
//                                 <TableCell>
//                                   {page * rowsPerPage + i + 1}
//                                 </TableCell>
//                                 <TableCell>{info.course_name}</TableCell>
//                                 <TableCell>{info.course_price}</TableCell>
//                                 <TableCell>
//                                   {info.most_demanded_country ? (
//                                     <span>{info.most_demanded_country}</span>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </TableCell>
//                                 <TableCell className="action-icon">
//                                   <i
//                                     className="fa-solid fa-pen-to-square"
//                                     onClick={(e) =>
//                                       EditButton(e, info.course_id)
//                                     }
//                                  />
//                                   {localStorage.getItem("Role") === "Admin" ? (
//                                     <i
//                                       className="fa-solid fa-trash"
//                                       onClick={(e) =>
//                                         handledelet(e, info.course_id)
//                                       }
//                                     ></i>
//                                   ) : (
//                                     ""
//                                   )}
//                                 </TableCell>
//                               </TableRow>
//                             ))
//                         ) : (
//                           <TableRow>
//                             <TableCell colSpan={7} align="center">
//                               No Data Found
//                             </TableCell>
//                           </TableRow>
//                         )}
//                       </TableBody>
//                     </Table>
//                     <Stack spacing={2}>
//                       <Pagination
//                         className="page-nation"
//                         count={Math.ceil(rows.length / rowsPerPage)}
//                         page={page + 1}
//                         onChange={(event, value) => setPage(value - 1)}
//                         color="primary"
//                       />
//                     </Stack>
//                   </TableContainer>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// ... other imports
import { Link } from "react-router-dom";
import TableContainer from "@mui/material/TableContainer";
import Swal from "sweetalert2";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllTreatment, DeleteTreatment } from "../../reducer/TreatmentSlice";
import { useState, useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import { usePDF } from "react-to-pdf";

export default function Treatments() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [pdfRowLimit, setPdfRowLimit] = useState(null); // for PDF control

  const dispatch = useDispatch();
  const { Treatment } = useSelector((state) => state.Treatment);
  const { toPDF, targetRef } = usePDF({ filename: "treatments.pdf" });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetAllTreatment());
  }, [dispatch]);

  useEffect(() => {
    if (Treatment) {
      setRows(Treatment);
    }
  }, [Treatment]);

  const handlePdfGeneration = () => {
    const maxRows = rows.length || 1;

    Swal.fire({
      title: "Enter rows for PDF",
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
          setPdfRowLimit(null); // reset after generation
        }, 300);
      }
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
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(DeleteTreatment({ id: hospitalId }))
            .unwrap()
            .then(() => {
              return dispatch(GetAllTreatment());
            })
            .then((newData) => {
              Swal.fire(
                "Deleted!",
                "Treatment Course has been deleted.",
                "success"
              );
              setRows(newData.payload);
            })
            .catch((err) => {
              Swal.fire("Error!", err?.message || "An error occurred", "error");
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Hospital data is safe :)",
            icon: "error",
          });
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
                <div>
                  <h4 className="page-title mb-0">Manage Treatments</h4>
                </div>
                <div className="search-btn-main">
                  <div>
                    <Link to="/Admin/add-treatments" className="add-button">
                      <i className="fa fa-plus"></i> New Treatment
                    </Link>
                    <Link onClick={handlePdfGeneration} className="add-button ms-2">
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
                    <Table
                      stickyHeader
                      aria-label="sticky table"
                      className="table-no-card"
                      ref={targetRef}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr.No.</TableCell>
                          <TableCell>Disease Name</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Demanding Country</TableCell>
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
                          <TableRow key={info.serviceId}>
                            <TableCell>
                              {pdfRowLimit
                                ? i + 1
                                : page * rowsPerPage + i + 1}
                            </TableCell>
                            <TableCell>{info.course_name}</TableCell>
                            <TableCell>{info.course_price}</TableCell>
                            <TableCell>
                              {info.most_demanded_country ? (
                                <span>{info.most_demanded_country}</span>
                              ) : (
                                ""
                              )}
                            </TableCell>
                            <TableCell className="action-icon">
                              <i
                                className="fa-solid fa-pen-to-square"
                                onClick={() => {
                                  navigate("/Admin/edit-treatments", {
                                    state: { course_id: info.course_id },
                                  });
                                }}
                              />
                              {localStorage.getItem("Role") === "Admin" && (
                                <i
                                  className="fa-solid fa-trash"
                                  onClick={(e) => handledelet(e, info.course_id)}
                                ></i>
                              )}
                            </TableCell>
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
    </>
  );
}
