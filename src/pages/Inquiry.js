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
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { EnquiryStatus } from "../../src/reducer/EnquirySlice";
import MenuItem from "@mui/material/MenuItem";
import { ImportEnquirys } from "../../src/reducer/EnquirySlice";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIcon from "@mui/icons-material/Assignment";
import axios from "axios";
import { AdminBaseUrl, baseurl } from "../Basurl/Baseurl";
import { Autocomplete, OutlinedInput, Pagination, Stack } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { usePDF } from "react-to-pdf";
import { GetAllHositalData } from "../reducer/HospitalSlice";
import { Field } from "formik";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { testForms } from "../reducer/FormsEnquiry";
export default function Inquiry() {
  const { toPDF, targetRef } = usePDF({ filename: "inquiry.pdf" });
  const role = localStorage.getItem("Role");
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [date, setDate] = useState();
  const [datauserId, setDatauserId] = useState([]);
  const [open2, setOpen2] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open9, setOpen9] = React.useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [report, setReport] = useState([]);
  const [searchApiData, setSearchApiData] = useState([]);
  const [roleStatuses, setRoleStatuses] = useState([]);
  const [getcountries, setGetcountries] = useState([]);
  const dispatch = useDispatch();
  const { testForms: formData } = useSelector((state) => state.testForms);
  const { Enquiry, loading, error } = useSelector((state) => state.Enquiry);
  const { hospital } = useSelector((state) => state.hospital);
  const [tabValue, setTabValue] = useState(0);
  const [recommend, setRecommend] = useState("");
  const [images, setImages] = useState([]);
  const [airAmbulanceData, setAirAmbulanceData] = useState([]);
  const [ambulanceData, setAmbulanceData] = useState([]);
  const [treatmentData, setTreatmentData] = useState([]);
  useEffect(() => {
    dispatch(testForms());
  }, [dispatch]);
  useEffect(() => {
    getUserId();
  }, []);
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };
  const permissions = localStorage.getItem("permissionArray") || "";
  console.log(permissions);
  const handleRecommendChange = (e) => {
    setRecommend(e.target.value);
  };
  const tabsConfig = [
    { label: "Enquiry", value: 0, permission: "/Enquiries" },
    { label: "Ambulance Service", value: 1, permission: "/Ambulance_Service" },
    {
      label: "Air Medical Escort",
      value: 2,
      permission: "/Air_Medical_Escort",
    },
    {
      label: "Treatment Estimate",
      value: 3,
      permission: "/Treatment_Estimate",
    },
  ];
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  const filteredTabs = tabsConfig.filter((tab) =>
    permissions.includes(tab.permission),
  );
  const handleNotesdataqw = async (e) => {
    e.preventDefault();
    if (!note || !recommend || images.length === 0) {
      return Swal.fire("Error", "All fields are required", "error");
    }
    try {
      const formData = new FormData();
      formData.append("review_notes", note);
      formData.append("Recommendations", recommend);
      formData.append("enquiryId", enqId);
      formData.append("user_type", statusRole);
      images.forEach((img) => {
        formData.append("images", img);
      });
      const response = await axios.post(`${baseurl}addDoctorReview`, formData);
      if (response.data.success) {
        handleClose4();
        Swal.fire("Success", "Data submitted successfully", "success");
        setNote("");
        setRecommend("");
        setImages([]);
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
  const statusRole = localStorage.getItem("Role");
  const get3tabdata = async (datauserId, getcountry, rolestatus) => {
    const payload = {
      user_ids: datauserId,
      accessCountries: getcountry,
      roleStatuses: rolestatus,
      is_admin: statusRole === "Admin" ? 1 : 0,
    };
    try {
      const response = await axios.post(
        `${AdminBaseUrl}other_enquiry_requests`,
        payload,
      );
      console.log(response.data.data);
      setAirAmbulanceData(response.data?.data?.air_ambulance || []);
      setAmbulanceData(response?.data?.data?.ambulance_requests || []);
      setTreatmentData(response?.data?.data?.get_treatment_estimate || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(GetAllHositalData());
    console.log(error, hospital);
  }, [dispatch]);
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
  const handleClose4 = () => {
    setOpen4(false);
  };
  const handleClose2wew = () => {
    setOpen9(false);
  };
  const handleClickOpen2modla = () => {
    setOpen9(true);
  };
  const handleClickOpen2 = (e, enq) => {
    setOpen2(true);
    setEnqId(enq);
  };
  const handleClickOpen4 = (e, enq) => {
    setOpen4(true);
    setEnqId(enq);
  };
  const handleClickOpen3 = (e) => {
    setOpen3(true);
  };
  const statusMap = {
    0: "Pending",
    1: "Confirmed",
    2: "Hold",
    3: "Follow-Up",
    4: "Dead",
  };
  useEffect(() => {
    dispatch(GetAllEnquiry());
    console.log(error, Enquiry);
  }, [dispatch]);
  // useEffect(() => {
  //   if (Array.isArray(Enquiry) && Enquiry.length > 0) {
  //     const filtered = Enquiry.filter(
  //       (item) => item.Enquiry_status !== "Confirmed",
  //     );
  //     setRows(filtered);
  //     setSearchApiData(filtered);
  //   } else {
  //     setRows([]);
  //     setSearchApiData([]);
  //   }
  // }, [Enquiry]);

  useEffect(() => {
    const savedTab = localStorage.getItem("tabenquiry");
    const permittedValues = filteredTabs.map((t) => t.value);

    if (savedTab !== null && permittedValues.includes(Number(savedTab))) {
      setTabValue(Number(savedTab));
    } else if (permittedValues.length > 0) {
      setTabValue(permittedValues[0]);
      localStorage.setItem("tabenquiry", permittedValues[0]);
    }
  }, [permissions, filteredTabs.length]);
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
 const handleDeleteExternal = async (row) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this request?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
  });
  if (!result.isConfirmed) return;
  try {
    const payload = {
      id: row.raw?.id || row.enquiryId, // ✅ safe id
      model:
        tabValue === 1
          ? "AmbulanceRequest"
          : tabValue === 2
          ? "AirAmbulance"
          : tabValue === 3
          ? "PatientQuery"
          : "",
      status: "Deleted",
    };
    const res = await axios.post(
      `${AdminBaseUrl}update_user_request_status`,
      payload
    );
    if (res?.data?.success) {
      Swal.fire("Deleted!", "Record deleted successfully", "success");
      await dispatch(testForms());   // external data
      await getUserId();            // tab data reload
    }
  } catch (error) {
    console.log(error);
    Swal.fire("Error!", "Something went wrong", "error");
  }
};
  const ViewDetail = (e, type, info) => {
    console.log(e, type, info);
    const routeMap = {
      0: "/Admin/Enquiry-Detail",
      1: "/Admin/Enquiry-DetailAmbulance",
      2: "/Admin/airambulanceview",
      3: "/Admin/medicalescortservice",
    };
    const path = routeMap[type];
    if (!path) return;
    console.log(type);
    localStorage.setItem("tabenquiry", type);
    navigate(path, {
      state: {
        id: type === 0 ? info.enquiryId : info.id, // ✅ FIX
        enquiryId: info.enquiryId, // optional
        type: type,
      },
    });
  };
  const sendToPatientAPI = async (type, data) => {
    try {
      const response = await axios.post(`${baseurl}createPatientFromExternal`, {
        enquiry_type: type,
        data: data,
      });
      if (response.data.success) {
        // Swal.fire("Success!", `${type} converted to patient`, "success");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };
  const handleChangtype = async (e, b) => {
    const value = e?.value || e?.target?.value;
    console.log(tabValue);
    console.log(e);
    console.log(value);
    const data1 = parseInt(value);
    const data = {
      id: b?.id,
      status: statusMap[data1],
      model:
        tabValue === 1
          ? "AmbulanceRequest"
          : tabValue === 2
            ? "AirAmbulance"
            : tabValue === 3
              ? "PatientQuery"
              : "",
    };
    try {
      const response = await axios.post(
        `${AdminBaseUrl}update_user_request_status`,
        data,
      );
      dispatch(testForms());
        // await get3tabdata(datauserId, getcountries, roleStatuses);
      if (response?.data?.success) {
        // Swal.fire("Success", "Status Updated Successfully", "success");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
const handleTabChange = (event, newValue) => {
  setTabValue(newValue);
  localStorage.setItem("tabenquiry", newValue);
  setRows([]);
  setSearchApiData([]);
};
useEffect(() => {
  // setLoadingTab(false);
}, [rows]);
  const handleChange = async (event, id, tabValue, data) => {
    console.log(event, id, tabValue, data);
    const { value } = event.target;
    const status = Number(value);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to update / convert?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });
    if (!result.isConfirmed) return;
    if (tabValue === 0) {
      if (status === 1) {
        try {
          const payload = {
            full_name: data.raw.name,
            email: data.raw.email,
            phone_code: data.raw.phoneCode,
            phone: data.raw.emergency_contact,
            passport_number: data.raw.passport_num,
            user_type: 2,
          };
          const response = await axios.post(
            `https://omcacrm.com/omca/api/user_registration`,
            payload,
          );
          if (response.data.success) {
            await dispatch(
              EnquiryStatus({
                id,
                status,
                enquiry_type: "OMCA Enquiry",
                user_id: response.data.data.id,
              }),
            ).unwrap();
            Swal.fire("Success!", "Converted to patient!", "success");
            dispatch(GetAllEnquiry());
          }
        } catch (err) {
          Swal.fire("Error!", err?.message || "Error", "error");
        }
      } else {
        await dispatch(
          EnquiryStatus({
            id,
            status,
            enquiry_type: "OMCA Enquiry",
          }),
        ).unwrap();
        Swal.fire("Success!", "Status Change Successfully!", "success");
        dispatch(GetAllEnquiry());
      }
    } else {
      if (status === 1) {
        try {
          if (tabValue === 1) {
            await sendToPatientAPI("Ambulance Service", data.raw);
          }
          if (tabValue === 2) {
            await sendToPatientAPI("Air Medical Escort", data.raw);
          }
          if (tabValue === 3) {
            await sendToPatientAPI("Treatment Estimate", data.raw);
          }
          await handleChangtype({ value }, data.raw);

          Swal.fire("Success!", "Converted to patient!", "success");

          dispatch(GetAllEnquiry());
        } catch (err) {
          Swal.fire("Error!", err?.message || "Error", "error");
        }
      } else {
        await handleChangtype({ value }, data.raw);

        Swal.fire("Success!", "Status changed!", "success");
        dispatch(GetAllEnquiry());
      }
    }
  };
  const handleSampleFile = async () => {
    try {
      const response = await axios.get(`${baseurl}export_enquiries`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Sample Enquiry.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      Swal.fire({
        icon: "success",
        title: "Download Complete",
        text: "Sample_Enquiry.xlsx has been downloaded successfully!",
        timer: 3000,
        showConfirmButton: false,
      });
      return response.data;
    } catch (err) {
      console.error(
        "Error downloading the sample file:",
        err.response?.data?.message || err.message,
      );
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: err.response?.data?.message || "Something went wrong!",
      });
      throw err;
    }
  };
  const handleHospitalChange = (event, newValue) => {
    setReport((prev) => ({ ...prev, hospital: newValue }));
  };
  const handleImportFile = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error("Please select a file before uploading.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedImage);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    try {
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
    const value = event.target.value.toLowerCase().trim();
    setFilterValue(event.target.value);
    setPage(0);

    if (!value) {
      setRows(searchApiData);
      return;
    }

    const filterResult = searchApiData.filter((item) => {
      return (
        String(item.enquiryId || "")
          .toLowerCase()
          .includes(value) ||
        String(item.email || "")
          .toLowerCase()
          .includes(value) ||
        String(item.country || "")
          .toLowerCase()
          .includes(value) ||
        String(item.name || "")
          .toLowerCase()
          .includes(value) ||
        String(item.age || "")
          .toLowerCase()
          .includes(value) ||
        String(item.emergency_contact || "")
          .toLowerCase()
          .includes(value) ||
        String(item.disease_name || "")
          .toLowerCase()
          .includes(value)
      );
    });

    setRows(filterResult);
  };
  const handleClearFilter = () => {
    setFilterValue("");
    setRows(searchApiData);
    setPage(0); // ⭐ RESET PAGE
  };
  useEffect(() => {
    setPage(0);
  }, [rows]);
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
            .unwrap()
            .then(() => {
              return dispatch(GetAllEnquiry());
            })
            .then((newData) => {
              Swal.fire("Deleted!", "Patient has been deleted.", "success");
              const normalized = normalizeData(
                newData.payload || [],
                "enquiry",
              );
              setRows(normalized);
              setSearchApiData(normalized);
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
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && orderDirection === "asc";
    const direction = isAsc ? "desc" : "asc";

    setOrderDirection(direction);
    setOrderBy(property);

    const sortedData = [...rows].sort((a, b) => {
      let valA = a[property];
      let valB = b[property];

      // ✅ Handle null/undefined
      if (!valA) valA = "";
      if (!valB) valB = "";

      // ✅ Special handling for DATE
      if (property === "date") {
        return direction === "asc"
          ? new Date(valA) - new Date(valB)
          : new Date(valB) - new Date(valA);
      }
      if (property === "enquiryId" || property === "age") {
        return direction === "asc"
          ? Number(valA) - Number(valB)
          : Number(valB) - Number(valA);
      }
      valA = valA.toString().toLowerCase();
      valB = valB.toString().toLowerCase();
      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setRows(sortedData);
  };
  useEffect(() => {
  let filtered = [];

  if (tabValue === 0 && Enquiry?.length) {
    filtered = normalizeData(Enquiry, "enquiry");
  }

  if (tabValue === 1 && ambulanceData?.length) {
    filtered = normalizeData(ambulanceData, "ambulance");
  }

  if (tabValue === 2 && airAmbulanceData?.length) {
    filtered = normalizeData(airAmbulanceData, "air");
  }

  if (tabValue === 3 && treatmentData?.length) {
    filtered = normalizeData(treatmentData, "treatment");
  }

  setRows(filtered);
  setSearchApiData(filtered);
}, [tabValue, Enquiry, ambulanceData, airAmbulanceData, treatmentData]);
//   useEffect(() => {
//   let filtered = [];

//   if (tabValue === 0) {
//     filtered = normalizeData(Enquiry || [], "enquiry");
//   }

//   if (tabValue === 1) {
//     filtered = normalizeData(ambulanceData, "ambulance");
//   }

//   if (tabValue === 2) {
//     filtered = normalizeData(airAmbulanceData, "air");
//   }

//   if (tabValue === 3) {
//     filtered = normalizeData(treatmentData, "treatment");
//   }

//   setRows(filtered);
//   setSearchApiData(filtered);
// }, [tabValue]); // ✅ ONLY tabValue

// useEffect(() => {
//   if (tabValue === 0) {
//     const data = normalizeData(Enquiry || [], "enquiry");
//     setRows(data);
//     setSearchApiData(data);
//   }
// }, [Enquiry]);

// useEffect(() => {
//   if (tabValue === 1) {
//     const data = normalizeData(ambulanceData, "ambulance");
//     setRows(data);
//     setSearchApiData(data);
//   }
// }, [ambulanceData]);

// useEffect(() => {
//   if (tabValue === 2) {
//     const data = normalizeData(airAmbulanceData, "air");
//     setRows(data);
//     setSearchApiData(data);
//   }
// }, [airAmbulanceData]);

// useEffect(() => {
//   if (tabValue === 3) {
//     const data = normalizeData(treatmentData, "treatment");
//     setRows(data);
//     setSearchApiData(data);
//   }
// }, [treatmentData]);
  // useEffect(() => {
  //   let filtered = [];
  //   switch (tabValue) {
  //     case 0:
  //       filtered = normalizeData(Enquiry || [], "enquiry");
  //       break;
  //     case 1:
  //       filtered = normalizeData(ambulanceData, "ambulance");
  //       break;
  //     case 2:
  //       filtered = normalizeData(airAmbulanceData, "air");
  //       break;
  //     case 3:
  //       filtered = normalizeData(treatmentData, "treatment");
  //       break;
  //     default:
  //       filtered = [];
  //   }
  //   setRows(filtered);
  //   setSearchApiData(filtered);
  // }, [tabValue, Enquiry, ambulanceData, airAmbulanceData, treatmentData]);
  const normalizeData = (data, type) => {
    return data.map((item) => ({
      enquiryId: item.enquiryId || item.id || 0,
      name: item.name || item.first_name || "",
      email: item.email || "",
      country: item.country || "",
      treatingIn: item.treatingIn || item.treating_in_country || "",
      emergency_contact: item.emergency_contact || item.phone || "",
      disease_name:
        item.disease_name || item.services?.replaceAll("_", " ") || "",
      Enquiry_status: item.Enquiry_status || item.status || "",
      date: item.createdAt || item.created_at || "",
      id: item.id,
      raw: item,
    }));
  };
  const getUserId = async () => {
    try {
      const response = await axios.get(`${baseurl}get_patient_user_ids`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        console.log(response.data);
        console.log("a");
        get3tabdata(
          response.data.user_ids,
          response.data.accessCountries,
          response.data.roleStatuses,
        );
        console.log("b");
        setGetcountries(response.data.accessCountries);
        setRoleStatuses(response.data.roleStatuses);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
            {/* {
              role==="Admin"?  <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Enquiry" />
                <Tab label="Ambulance Service" />
                <Tab label="Air Medical Escort" />
                <Tab label="Treatment Estimate" />
              </Tabs> :
 getcountries.length === 0 ? (
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Enquiry" />
              </Tabs>
            ) : (
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="Enquiry" />
                <Tab label="Ambulance Service" />
                <Tab label="Air Medical Escort" />
                <Tab label="Treatment Estimate" />
              </Tabs>
            )} */}
           <Tabs value={tabValue} onChange={handleTabChange}>
  {filteredTabs.map((tab) => (
    <Tab key={tab.value} label={tab.label} value={tab.value} />
  ))}
</Tabs>
          </Box>
          <div className="row">
            <div className="col-md-12">
              <div className="country-top">
                <div className="">
                  <h4 className="page-title mb-0">
                    {tabValue === 0
                      ? "Enquiries"
                      : tabValue === 1
                        ? "Ambulance Service"
                        : tabValue === 2
                          ? "Air Medical escort"
                          : tabValue === 3
                            ? "Treatment Estimate"
                            : ""}
                  </h4>
                </div>
                <div className="search-btn-main">
                  <div className="mr-3">
                    <TextField
                      sx={{ width: "100%" }}
                      className="field-count"
                      label="Search"
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
                  {tabValue === 0 ? (
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
                          Import File
                        </button>
                        <button
                          onClick={handleSampleFile}
                          className="add-button"
                        >
                          <span>
                            <i className="fa fa-file"></i>
                          </span>
                          Export File
                        </button>
                        {role === "Admin" ? (
                          <button onClick={donloadpdf} className="add-button">
                            <span>
                              <i className="fa fa-file-pdf-o"></i>
                            </span>
                            pdf
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
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
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "enquiryId"}
                              direction={
                                orderBy === "enquiryId" ? orderDirection : "asc"
                              }
                              onClick={() => handleRequestSort("enquiryId")}
                            >
                              Enquiry IDs
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "name"}
                              direction={
                                orderBy === "name" ? orderDirection : "asc"
                              }
                              onClick={() => handleRequestSort("name")}
                            >
                              Name
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "country"}
                              direction={
                                orderBy === "country" ? orderDirection : "asc"
                              }
                              onClick={() => handleRequestSort("country")}
                            >
                              Country
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "treatingIn"}
                              direction={
                                orderBy === "treatingIn"
                                  ? orderDirection
                                  : "asc"
                              }
                              onClick={() => handleRequestSort("treatingIn")}
                            >
                              Treating In
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "date"}
                              direction={
                                orderBy === "date" ? orderDirection : "asc"
                              }
                              onClick={() => handleRequestSort("date")}
                            >
                              Date / Time
                            </TableSortLabel>
                          </TableCell>
                          <TableCell>
                            <TableSortLabel
                              active={orderBy === "Enquiry_status"}
                              direction={orderBy === "Enquiry_status" ? orderDirection : "asc"}
                              onClick={() => handleRequestSort("Enquiry_status")}
                            >
                              Status
                            </TableSortLabel>
                          </TableCell>
                          {/* <TableCell>Status</TableCell> */}
                          <TableCell>Actions</TableCell>
                          {tabValue === 0 ? (
                            <>
                              <TableCell>Notes</TableCell>
                            </>
                          ) : (
                            ""
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(pdfRowLimit
                          ? rows.slice(0, pdfRowLimit)
                          : rows.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                        ).length > 0 ? (
                          (pdfRowLimit
                            ? rows.slice(0, pdfRowLimit)
                            : rows.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage,
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
                              <TableCell
                                style={{ cursor: "pointer" }}
                                onClick={(e) => ViewDetail(e, tabValue, info)}
                              >
                                {info.name}
                              </TableCell>
                              <TableCell>{info.country}</TableCell>
                              <TableCell>{info.treatingIn}</TableCell>
                              <TableCell>
                                {new Date(info.date).toLocaleDateString(
                                  "en-GB",
                                )}
                                -
                                {new Date(info.date).toLocaleTimeString(
                                  "en-GB",
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  },
                                )}
                              </TableCell>

                              <TableCell>
                                {info.Enquiry_status === "Confirmed" ? (
                                  // ✅ Only show text
                                  <span style={{ fontWeight: "bold" }}>
                                    Confirmed
                                  </span>
                                ) : (
                                  // ✅ Otherwise show dropdown
                                  <FormControl
                                    sx={{ m: 1, minWidth: 120 }}
                                    size="small"
                                    className="cont-main"
                                  >
                                    <Select
                                      value={
                                        seekerStatus[info.enquiryId]
                                          ? seekerStatus[info.enquiryId]
                                          : info.Enquiry_status === "Hold"
                                            ? "2"
                                            : info.Enquiry_status ===
                                              "Follow-Up"
                                              ? "3"
                                              : info.Enquiry_status === "Dead"
                                                ? "4"
                                                : "0"
                                      }
                                      onChange={(e) =>
                                        handleChange(
                                          e,
                                          info.enquiryId,
                                          tabValue,
                                          info,
                                        )
                                      }
                                      displayEmpty
                                      className="status-direct"
                                    >
                                      <MenuItem value="0">Pending</MenuItem>
                                      <MenuItem value="1">Confirmed</MenuItem>
                                      <MenuItem value="2">Hold</MenuItem>
                                      <MenuItem value="3">Follow-up</MenuItem>
                                      <MenuItem value="4">Closed</MenuItem>
                                    </Select>
                                  </FormControl>
                                )}
                              </TableCell>
                              <TableCell className="action-icon">
                                <VisibilityIcon
                                  className="eye-icon"
                                  onClick={(e) => ViewDetail(e, tabValue, info)}
                                />
                                {/* {tabValue === 0 ? (
                                  <>
                                    <i
                                      className="fa-solid fa-pen-to-square"
                                      onClick={(e) =>
                                        EditButton(e, info.enquiryId)
                                      }
                                    ></i>

                                    {localStorage.getItem("Role") ===
                                      "Admin" && (
                                        <i
                                          className="fa-solid fa-trash"
                                          onClick={() => handledelete(info)}
                                        ></i>
                                      )}
                                  </>
                                ) : (
                                  ""
                                )} */}
                                {tabValue === 0 ? (
                                  <>
                                    <i
                                      className="fa-solid fa-pen-to-square"
                                      onClick={(e) =>
                                        EditButton(e, info.enquiryId)
                                      }
                                    ></i>

                                    {localStorage.getItem("Role") ===
                                      "Admin" && (
                                        <i
                                          className="fa-solid fa-trash"
                                          onClick={() => handledelete(info)}
                                        ></i>
                                      )}
                                  </>
                                ) : (
                                  // 🔥 NEW DELETE FOR OTHER TABS
                                  <i
                                    className="fa-solid fa-trash"
                                    onClick={() => handleDeleteExternal(info)}
                                  ></i>
                                )}
                              </TableCell>
                              {tabValue === 0 ? (
                                <>
                                  <TableCell className="action-icon">
                                    <i
                                      className="fa-solid fa-notes-medical"
                                      onClick={(e) =>
                                        handleClickOpen2(e, info.enquiryId)
                                      }
                                    ></i>
                                    <i
                                      className="fa-solid fa-stethoscope"
                                      onClick={(e) =>
                                        handleClickOpen4(e, info.enquiryId)
                                      }
                                    ></i>
                                  </TableCell>
                                </>
                              ) : (
                                ""
                              )}
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
              className="Date / Time-form"
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
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open9}
          onClose={handleClose2wew}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Add Hospitals</h6>
            </div>
            <div className="cross-icon" onClick={handleClose2wew}>
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
                  <div className="col-sm-12">
                    <div className="field-set">
                      <label>
                        Select Hospital<span className="text-danger">*</span>
                      </label>
                      <Autocomplete
                        multiple
                        options={
                          hospital && hospital.length > 0
                            ? hospital.map((h) => h.name)
                            : []
                        }
                        value={report.hospital || []}
                        onChange={handleHospitalChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Search & Select Hospital"
                            variant="outlined"
                            size="small"
                          />
                        )}
                      />
                    </div>
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
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open4}
          onClose={handleClose4}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Doctor Review</h6>
            </div>
            <div className="cross-icon" onClick={handleClose4}>
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
                      Review Notes<span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="w3review"
                      name="discussionNotes"
                      rows="4"
                      cols="50"
                      className="form-control"
                      placeholder="Review"
                      onChange={handleNoteChange}
                      value={note}
                    />
                    <span style={{ color: "red" }}>
                      {blogErr && !note ? "Please Enter Your  note" : ""}
                    </span>
                  </div>
                  <div className="field-set">
                    <label>
                      Upload Images<span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      onChange={handleImageChange}
                      name="upload_image"
                      id=""
                    />
                  </div>
                  <div className="field-set">
                    <label>
                      Recommendations<span className="text-danger">*</span>
                    </label>
                    <textarea
                      id=""
                      name="recommend"
                      rows="4"
                      cols="50"
                      onChange={handleRecommendChange}
                      className="form-control"
                      value={recommend}
                      placeholder="Recommendations"
                    />
                  </div>
                  <DialogActions className="submit-main">
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleNotesdataqw}
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
