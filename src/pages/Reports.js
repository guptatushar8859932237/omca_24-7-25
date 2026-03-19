// import React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import { useState, useEffect } from "react";
// import Paper from "@mui/material/Paper";
// import TextField from "@mui/material/TextField";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   GetAllPatients,
//   DeletePatient,
//   StatusPatient,
// } from "../reducer/PatientsSlice";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { GetAllTreatment } from "../reducer/TreatmentSlice";
// import axios from "axios";
// import { baseu11, baseurl, excelExoprt, image } from "../Basurl/Baseurl";
// import DatePicker from "react-multi-date-picker";
// import { usePDF } from "react-to-pdf";
// import {
//   FormControl,
//   MenuItem,
//   OutlinedInput,
//   Pagination,
//   Select,
//   Stack,
// } from "@mui/material";
// import { GetAllCountries2 } from "../reducer/Countries";
// import { GetAllHositalData } from "../reducer/HospitalSlice";
// export default function Reports() {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [rows, setRows] = useState([]);
//   const dispatch = useDispatch();
//   const { patient, loading, error } = useSelector((state) => state.patient);
//     const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
//    const [pdfRowLimit, setPdfRowLimit] = useState(null);
//   const { Treatment } = useSelector((state) => state.Treatment);
//   const [seekerStatus, setSeekerStatus] = React.useState({});
//   const [treatmentname, setTreatmentname] = useState([]);
//   const [dateRange, setDateRange] = useState([null, null]);
//   const startDate = dateRange?.[0]?.format("YYYY-MM-DD") || "";
//   const endDate = dateRange?.[1]?.format("YYYY-MM-DD") || "";
//   const [report, setReport] = useState({
//     country: "",
//     treatment: "",
//     age: "",
//   });
//   const { Countries } = useSelector((state) => state.Countries);
//   console.log();
//   useEffect(() => {
//     dispatch(GetAllCountries2());
//   }, [dispatch]);
//   const submitInputdata = (e) => {
//     const { name, value } = e.target;
//     setReport({ ...report, [name]: value });
//   };
//   useEffect(() => {
//     dispatch(GetAllTreatment());
//   }, [dispatch]);
//   useEffect(() => {
//     if (Treatment) {
//       setTreatmentname(Treatment);
//     }
//   }, [Treatment]);
//   useEffect(() => {
//     dispatch(GetAllPatients());
//   }, [dispatch]);
//   useEffect(() => {
//     if (patient) {
//       setRows(patient);
//     }
//   }, [patient]);
//   const handledelet = (e, patientId) => {
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
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel!",
//         reverseButtons: true,
//       })
//       .then((result) => {
//         if (result.isConfirmed) {
//           dispatch(DeletePatient({ id: patientId }))
//             .unwrap()
//             .then(() => dispatch(GetAllPatients()))
//             .then((newData) => {
//               Swal.fire("Deleted!", "Patient has been deleted.", "success");
//               setRows(newData.payload);
//             })
//             .catch((err) => {
//               Swal.fire("Error!", err?.message || "An error occurred", "error");
//             });
//         } else if (result.dismiss === Swal.DismissReason.cancel) {
//           swalWithBootstrapButtons.fire({
//             title: "Cancelled",
//             text: "Hospital data is safe :)",
//             icon: "error",
//           });
//         }
//       });
//   };
//   const { hospital } = useSelector((state) => state.hospital);
//   useEffect(() => {
//     dispatch(GetAllHositalData());
//     console.log(error, hospital);
//   }, [dispatch]);
//   const handleClickOpen = async (e, id) => {
//     e.preventDefault();
//     try {
//       await dispatch(
//         StatusPatient({ id, status: Number(seekerStatus) })
//       ).unwrap();
//       Swal.fire("Success!", "Patient details updated successfully.", "success");
//       dispatch(GetAllPatients());
//     } catch (err) {
//       Swal.fire("Error!", err?.message || "An error occurred", "error");
//     }
//   };
//   // const getReportData = () => {
//   //   try {
//   //     axios
//   //       .get(
//   //         `${baseurl}exportfilteredpatient/?startDate=${encodeURIComponent(
//   //           startDate
//   //         )}&treatment_course_name=${encodeURIComponent(
//   //           report.treatment.trim()
//   //         )}&endDate=${encodeURIComponent(
//   //           endDate
//   //         )}&country=${encodeURIComponent(
//   //           report.country.trim()
//   //         )}&age=${encodeURIComponent(report.age.trim())}`
//   //       )
//   //       .then((response) => {
//   //         console.log(response.data);
//   //         if (response.data.success && response.data.data) {
//   //           setRows(response.data.data); // Show filtered patients in table
//   //         }


//   //         if (response.data.download_link) {
//   //           const link = document.createElement("a");
//   //           link.href = `${baseu11}${response.data.download_link}`;
//   //           link.setAttribute("download", "report.xlsx");
//   //           document.body.appendChild(link);
//   //           link.click();
//   //           link.remove();
//   //         }
//   //       })
//   //       .catch((error) => {
//   //         console.log(error);
//   //         console.log(error?.response?.data);
//   //         const errorMessage =
//   //           error?.response?.data?.message ||
//   //           error?.response?.data?.error ||
//   //           "Something went wrong";
//   //         Swal.fire("Error", errorMessage, "error");
//   //       });
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

// const getReportData = async () => {
//   try {
//     const response = await axios.get(
//       `${baseurl}exportfilteredpatient/?startDate=${encodeURIComponent(
//         startDate
//       )}&treatment_course_name=${encodeURIComponent(
//         report.treatment.trim()
//       )}&endDate=${encodeURIComponent(
//         endDate
//       )}&country=${encodeURIComponent(
//         report.country.trim()
//       )}&age=${encodeURIComponent(report.age.trim())}`
//     );

//     console.log(response.data);

//     // 1️⃣ Table data show karo
//     if (response.data.success && response.data.data) {
//       setRows(response.data.data);
//     }

//     // 2️⃣ Agar download link hai to user se poochho
//     if (response.data.download_link) {
//       const result = await Swal.fire({
//         title: "Download Report?",
//         text: "Do you want to download the Excel report?",
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonText: "Yes, Download",
//         cancelButtonText: "No",
//       });

//       if (result.isConfirmed) {
//         const link = document.createElement("a");
//         link.href = `${baseu11}${response.data.download_link}`;
//         link.setAttribute("download", "report.xlsx");
//         document.body.appendChild(link);
//         link.click();
//         link.remove();
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     const errorMessage =
//       error?.response?.data?.message ||
//       error?.response?.data?.error ||
//       "Something went wrong";
//     Swal.fire("Error", errorMessage, "error");
//   }
// };


//   const downloadPdf = async () => {
//       const maxRows = rows.length || 1;
//       Swal.fire({
//         title: "Enter number of rows for PDF",
//         input: "number",
//         inputLabel: `Choose between 1 and ${maxRows}`,
//         inputAttributes: {
//           min: "1",
//           max: maxRows.toString(),
//           step: "1",
//         },
//         inputValue: rowsPerPage,
//         showCancelButton: true,
//         confirmButtonText: "Generate PDF",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           const userInput = parseInt(result.value, 10);
//           if (isNaN(userInput) || userInput < 1 || userInput > maxRows) {
//             Swal.fire(
//               "Invalid entry",
//               `Please enter a number between 1 and ${maxRows}`,
//               "error"
//             );
//             return;
//           }
//           setPdfRowLimit(userInput);
//           setTimeout(() => {
//             toPDF();
//             setPdfRowLimit(null); // reset to normal view
//           }, 300);
//         }
//       });
//     };
//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         <div className="row">
//           <div className="col-md-12">
//             <div className="country-top">
//               <div className="">
//                 <h4 className="page-title mb-0">Reports</h4>
//               </div>
//                {localStorage.getItem("Role") === "Admin" ? (
//                <button onClick={downloadPdf} className="add-button ms-2">
//                   <span>
//                     <i className="fa fa-file-pdf-o"></i>
//                   </span>
//                   PDF
//                 </button>):("")}
//             </div>
//           </div>
//         </div>
//         <div className="row">
//           <div className="col-md-12">
//             <div className="card">
//               <div className="card-body">
//                 <div className="row align-items-end">
//                   <div className="col-md-3">
//                     <div className="field-set">
//                       <label>Country<span className="text-danger">*</span></label>
//                       <FormControl fullWidth size="small">
//                         <Select
//                           name="country"
//                           value={report.country}
//                           onChange={submitInputdata}
//                           displayEmpty
//                           input={<OutlinedInput placeholder="Select Country" />}
//                           sx={{ height: 40 }}
//                           className="select-country form-control"
//                           MenuProps={{
//                             PaperProps: {
//                               style: { maxHeight: 200 },
//                             },
//                           }}
//                         >
//                           <MenuItem value="">
//                             <em>Select Country</em>
//                           </MenuItem>
//                           {Countries && Countries.length > 0 ? (
//                             Countries.map((con, idx) => (
//                               <MenuItem key={idx} value={con.name}>
//                                 {con.name}
//                               </MenuItem>
//                             ))
//                           ) : (
//                             <MenuItem disabled>No countries available</MenuItem>
//                           )}
//                         </Select>
//                       </FormControl>
//                     </div>
//                   </div>
//                   <div className="col-md-3">
//                     <div className="field-set">
//                       <label>Treatment Name<span className="text-danger">*</span></label>
//                       <FormControl fullWidth size="small">
//                         <Select
//                           name="treatment"
//                           value={report.treatment}
//                           onChange={submitInputdata}
//                           displayEmpty
//                           input={<OutlinedInput placeholder="Select Treatment" />}
//                           sx={{ height: 40 }}
//                           className="select-treatment form-control"
//                           MenuProps={{
//                             PaperProps: {
//                               style: { maxHeight: 200 },
//                             },
//                           }}
//                         >
//                           <MenuItem value="">
//                             <em>Select Treatment</em>
//                           </MenuItem>
//                           {treatmentname && treatmentname.length > 0 ? (
//                             treatmentname.map((item, index) => (
//                               <MenuItem key={index} value={item.course_name}>
//                                 {item.course_name}
//                               </MenuItem>
//                             ))
//                           ) : (
//                             <MenuItem disabled>No treatments available</MenuItem>
//                           )}
//                         </Select>
//                       </FormControl>
//                     </div>
//                   </div>
//                   <div className="col-md-3">
//                     <div className="field-set">
//                       <label>Hospital<span className="text-danger">*</span></label>
//                       <FormControl fullWidth size="small">
//                         <Select
//                           name="hospital"
//                           value={report.hospital}
//                           onChange={submitInputdata}
//                           displayEmpty
//                           input={<OutlinedInput placeholder="Select Hospital" />}
//                           sx={{ height: 40 }}
//                           className="select-hospital form-control"
//                           MenuProps={{
//                             PaperProps: {
//                               style: { maxHeight: 200 },
//                             },
//                           }}
//                         >
//                           <MenuItem value="">
//                             <em>Select Hospital</em>
//                           </MenuItem>
//                           {hospital && hospital.length > 0 ? (
//                             hospital.map((item, index) => (
//                               <MenuItem key={index} value={item.name}>
//                                 {item.name}
//                               </MenuItem>
//                             ))
//                           ) : (
//                             <MenuItem disabled>No hospitals available</MenuItem>
//                           )}
//                         </Select>
//                       </FormControl>
//                     </div>
//                   </div>
//                   <div className="col-md-3">
//                     <div className="field-set field-count">
//                       <label>Select Date<span className="text-danger">*</span></label>
//                       <DatePicker
//                         value={dateRange}
//                         format="MM/DD/YYYY"
//                         placeholder="Start Date To End Date"
//                         onChange={setDateRange}
//                         range
//                         numberOfMonths={2}
//                         InputLabelProps={{ shrink: true }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-3">
//                     <div className="field-set">
//                       <label>Age<span className="text-danger">*</span></label>
//                       <TextField
//                         id="age"
//                         placeholder="Enter Age"
//                         variant="outlined"
//                         size="small"
//                         onChange={submitInputdata}
//                         name="age"
//                         value={report.age}
//                         fullWidth
//                         className="field-count"
//                         InputLabelProps={{ shrink: true }}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-3">
//                     <div className="mb-4">
//                       <button className="add-button" onClick={getReportData}>
//                         Report
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="main_content">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="table-responsive">
//                 <TableContainer component={Paper}  ref={targetRef} style={{ overflowX: "auto" }}>
//                   <Table
//                     stickyHeader
//                     aria-label="sticky table"
//                     className="table-no-card">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Sr.No.</TableCell>
//                         <TableCell>Patient Id</TableCell>
//                         <TableCell>Patient Name</TableCell>
//                         <TableCell> Contact No</TableCell>
//                         <TableCell>Email</TableCell>
//                         <TableCell>Date</TableCell>
//                         <TableCell>Country</TableCell>
//                         <TableCell>Patient Disease</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {rows
//                         .slice(
//                           page * rowsPerPage,
//                           page * rowsPerPage + rowsPerPage
//                         )
//                         .map((info, i) => {
//                           console.log(info);
//                           return (
//                             <>
//                               <TableRow
//                                 role="checkbox"
//                                 tabIndex={-1}
//                                 key={info.patientId}
//                               >
//                                 <TableCell>
//                                   {page * rowsPerPage + i + 1}
//                                 </TableCell>
//                                 <TableCell>{info.patientId}</TableCell>
//                                 <TableCell>{info.patient_name}</TableCell>
//                                 <TableCell>
//                                   {info.emergency_contact
//                                     ? info.emergency_contact
//                                     : info.emergency_contact_no}
//                                 </TableCell>
//                                 <TableCell>{info.email}</TableCell>
//                                 <TableCell>
//                                   {new Date(info.createdAt).toLocaleDateString(
//                                     "en-GB"
//                                   )}
//                                 </TableCell>
//                                 <TableCell>{info.country}</TableCell>
//                                 <TableCell>
//                                   {info.patient_disease[0].disease_name}
//                                 </TableCell>
//                               </TableRow>
//                             </>
//                           );
//                         })}
//                     </TableBody>
//                   </Table>
//                   <Stack spacing={2} alignItems="end" marginTop={2}>
//                     <Pagination
//                       count={Math.ceil(rows.length / rowsPerPage)}
//                       page={page + 1}
//                       onChange={(event, value) => setPage(value - 1)}
//                       shape="rounded"
//                       className="page-item"
//                     />
//                   </Stack>
//                 </TableContainer>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAllPatients,
  DeletePatient,
  StatusPatient,
} from "../reducer/PatientsSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { GetAllTreatment } from "../reducer/TreatmentSlice";
import axios from "axios";
import { baseu11, baseurl, excelExoprt, image } from "../Basurl/Baseurl";
import DatePicker from "react-multi-date-picker";
import { usePDF } from "react-to-pdf";
import {
  FormControl,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Stack,
} from "@mui/material";
import { GetAllCountries2 } from "../reducer/Countries";
import { GetAllHositalData } from "../reducer/HospitalSlice";
export default function Reports() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  // const [lastFilterParams, setLastFilterParams] = useState(null);

  const dispatch = useDispatch();
  const { patient, loading, error } = useSelector((state) => state.patient);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const [lastFilterParams, setLastFilterParams] = useState(null);
  const [pdfRowLimit, setPdfRowLimit] = useState(null);
  const { Treatment } = useSelector((state) => state.Treatment);
  const [seekerStatus, setSeekerStatus] = React.useState({});
  const [treatmentname, setTreatmentname] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const startDate = dateRange?.[0]?.format("YYYY-MM-DD") || "";
  const endDate = dateRange?.[1]?.format("YYYY-MM-DD") || "";
  const [report, setReport] = useState({
    country: "",
    treatment: "",
    age: "",
  });
  const { Countries } = useSelector((state) => state.Countries);
  console.log();
  useEffect(() => {
    dispatch(GetAllCountries2());
  }, [dispatch]);
  const submitInputdata = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };
  useEffect(() => {
    dispatch(GetAllTreatment());
  }, [dispatch]);
  useEffect(() => {
    if (Treatment) {
      setTreatmentname(Treatment);
    }
  }, [Treatment]);
  useEffect(() => {
    dispatch(GetAllPatients());
  }, [dispatch]);
  useEffect(() => {
    if (patient && patient.length > 0) {
      setRows(patient);
    }
  }, [patient]);
  const handledelet = (e, patientId) => {
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
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(DeletePatient({ id: patientId }))
            .unwrap()
            .then(() => dispatch(GetAllPatients()))
            .then((newData) => {
              Swal.fire("Deleted!", "Patient has been deleted.", "success");
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
  const { hospital } = useSelector((state) => state.hospital);
  useEffect(() => {
    getReportData()
    dispatch(GetAllHositalData());
    console.log(error, hospital);
  }, [dispatch]);
  const handleClickOpen = async (e, id) => {
    e.preventDefault();
    try {
      await dispatch(
        StatusPatient({ id, status: Number(seekerStatus) }),
      ).unwrap();
      Swal.fire("Success!", "Patient details updated successfully.", "success");
      dispatch(GetAllPatients());
    } catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  };
  // const getReportData = () => {
  //   try {
  //     axios
  //       .get(
  //         `${baseurl}exportfilteredpatient/?startDate=${encodeURIComponent(
  //           startDate
  //         )}&treatment_course_name=${encodeURIComponent(
  //           report.treatment.trim()
  //         )}&endDate=${encodeURIComponent(
  //           endDate
  //         )}&country=${encodeURIComponent(
  //           report.country.trim()
  //         )}&age=${encodeURIComponent(report.age.trim())}`
  //       )
  //       .then((response) => {
  //         console.log(response.data);
  //         if (response.data.success && response.data.data) {
  //           setRows(response.data.data); // Show filtered patients in table
  //         }

  //         if (response.data.download_link) {
  //           const link = document.createElement("a");
  //           link.href = `${baseu11}${response.data.download_link}`;
  //           link.setAttribute("download", "report.xlsx");
  //           document.body.appendChild(link);
  //           link.click();
  //           link.remove();
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         console.log(error?.response?.data);
  //         const errorMessage =
  //           error?.response?.data?.message ||
  //           error?.response?.data?.error ||
  //           "Something went wrong";
  //         Swal.fire("Error", errorMessage, "error");
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const downloadFilteredReport = async () => {
    if (!lastFilterParams) {
      Swal.fire("Warning", "Please generate report first", "warning");
      return;
    }

    try {
      const response = await axios.get(`${baseurl}exportfilteredpatient/`, {
        params: lastFilterParams,
      });

      if (response.data.download_link) {
        const link = document.createElement("a");
        link.href = `${baseu11}${response.data.download_link}`;
        link.setAttribute("download", "filtered-report.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        Swal.fire("Info", "No file available to download", "info");
      }
    } catch (error) {
      Swal.fire("Error", "Download failed", "error");
    }
  };

  const getReportData = async () => {
    try {
      const params = {
        startDate,
        endDate,
        treatment_course_name: report.treatment.trim(),
        country: report.country.trim(),
        age: report.age.trim(),
      };

      const response = await axios.get(`${baseurl}exportfilteredpatient/`, {
        params,
      });

      if (response.data.success && response.data.data) {
        setRows(response.data.data);
        setLastFilterParams(params); // 👈 save filters for download
        setPage(0);
      }
      //       if (response.data.success && response.data.data) {
      //   setRows(response.data.data);
      //   setLastFilterParams(params);
      //   // 👈 VERY IMPORTANT
      // }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong";
      Swal.fire("Error", errorMessage, "error");
    }
  };

  const downloadPdf = async () => {
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
            "error",
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
    <div className="page-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="country-top">
              <div className="">
                <h4 className="page-title mb-0">Reports</h4>
              </div>
              {localStorage.getItem("Role") === "Admin" ? (
                <div className="d-flex gap-2">
                  <button
                    className="add-button btn-secondary"
                    onClick={downloadFilteredReport}
                  >
                    Export
                  </button>
                  <button onClick={downloadPdf} className="add-button ms-2">
                    <span>
                      <i className="fa fa-file-pdf-o"></i>
                    </span>
                    PDF
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row align-items-end">
                  <div className="col-md-3">
                    <div className="field-set">
                      <label>
                        Country<span className="text-danger">*</span>
                      </label>
                      <FormControl fullWidth size="small">
                        <Select
                          name="country"
                          value={report.country}
                          onChange={submitInputdata}
                          displayEmpty
                          input={<OutlinedInput placeholder="Select Country" />}
                          sx={{ height: 40 }}
                          className="select-country form-control"
                          MenuProps={{
                            PaperProps: {
                              style: { maxHeight: 200 },
                            },
                          }}
                        >
                          <MenuItem value="" className="custmselect">Select Country</MenuItem>
                          {Countries && Countries.length > 0 ? (
                            Countries.map((con, idx) => (
                              <MenuItem className="custmselect" key={idx} value={con.name}>
                                {con.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>No countries available</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="field-set">
                      <label>Treatment Name<span className="text-danger">*</span></label>
                      <FormControl fullWidth size="small">
                        <Select
                          name="treatment"
                          value={report.treatment}
                          onChange={submitInputdata}
                          displayEmpty
                          input={
                            <OutlinedInput placeholder="Select Treatment" />
                          }
                          sx={{ height: 40 }}
                          className="select-treatment"
                          MenuProps={{
                            PaperProps: {
                              style: { maxHeight: 200 },
                            },
                          }}
                        >
                          <MenuItem value="" className="custmselect">Select Treatment</MenuItem>
                          {treatmentname && treatmentname.length > 0 ? (
                            treatmentname.map((item, index) => (
                              <MenuItem className="custmselect" key={index} value={item.course_name}>
                                {item.course_name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>
                              No treatments available
                            </MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="field-set">
                      <label>
                        Hospital<span className="text-danger">*</span>
                      </label>
                      <FormControl fullWidth size="small">
                        <Select

                          name="hospital"
                          value={report.hospital}
                          onChange={submitInputdata}
                          displayEmpty
                          input={
                            <OutlinedInput placeholder="Select Hospital" />
                          }
                          sx={{ height: 40 }}
                          className="select-hospital"
                          MenuProps={{
                            PaperProps: {
                              style: { maxHeight: 200 },
                            },
                          }}
                        >
                          <MenuItem className="custmselect" value="">Select Hospital</MenuItem>
                          {hospital && hospital.length > 0 ? (
                            hospital.map((item, index) => (
                              <MenuItem className="custmselect" key={index} value={item.name}>
                                {item.name}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem disabled>No hospitals available</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="field-set field-count">
                      <label>
                        Select Date<span className="text-danger">*</span>
                      </label>
                      <DatePicker
                        value={dateRange}
                        format="MM/DD/YYYY"
                        placeholder="Start Date To End Date"
                        onChange={setDateRange}
                        range
                        numberOfMonths={2}
                        InputLabelProps={{ shrink: true }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="field-set">
                      <label>
                        Age<span className="text-danger">*</span>
                      </label>
                      <TextField
                        id="age"
                        placeholder="Enter Age"
                        variant="outlined"
                        size="small"
                        onChange={submitInputdata}
                        name="age"
                        value={report.age}
                        fullWidth
                        className="field-count"
                        InputLabelProps={{ shrink: true }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="mb-4">
                      <div className="mb-4 d-flex gap-2">
                        <button className="add-button" onClick={getReportData}>
                          Filter
                        </button>
                      </div>
                    </div>
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
                  ref={targetRef}
                  style={{ overflowX: "auto" }}
                >
                  <Table
                    stickyHeader
                    aria-label="sticky table"
                    className="table-no-card"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Sr.No.</TableCell>
                        <TableCell>Patient Id</TableCell>
                        <TableCell>Patient Name</TableCell>
                        <TableCell> Contact No</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Country</TableCell>
                        <TableCell>Patient Disease</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.length > 0 ? (
                        rows
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((info, i) => {
                            console.log(info);
                            return (
                              <>
                                <TableRow
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={info.patientId}
                                >
                                  <TableCell>
                                    {page * rowsPerPage + i + 1}
                                  </TableCell>
                                  <TableCell>{info.patientId}</TableCell>
                                  <TableCell>{info.patient_name}</TableCell>
                                  <TableCell>
                                    {info.emergency_contact
                                      ? info.emergency_contact
                                      : info.emergency_contact_no}
                                  </TableCell>
                                  <TableCell>{info.email}</TableCell>
                                  <TableCell>
                                    {new Date(info.createdAt).toLocaleDateString(
                                      "en-GB",
                                    )}
                                  </TableCell>
                                  <TableCell>{info.country}</TableCell>
                                  <TableCell>
                                    {info.patient_disease[0].disease_name}
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          })) : ""}
                    </TableBody>
                  </Table>
                  <Stack spacing={2} alignItems="end" marginTop={2}>
                    <Pagination
                      count={Math.ceil(rows.length / rowsPerPage)}
                      page={page + 1}
                      onChange={(event, value) => setPage(value - 1)}
                      shape="rounded"
                      className="page-item"
                    />
                  </Stack>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}