import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { GetPatientTreatments } from "../../reducer/PatientTreatmentSlice";
import { AddHospitalForPatient } from "../../reducer/PatientTreatmentSlice";
import { GetAllHositalData } from "../../reducer/HospitalSlice";
import { GetAllCountries, GetAllCountries2 } from "../../reducer/Countries";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import { AppointmentForPatient } from "../../reducer/PatientTreatmentSlice";
import {
  AdminBaseUrl,
  baseu11,
  baseurl,
  image,
  imageUrl,
} from "../../Basurl/Baseurl";
import { GetAllTreatment } from "../../reducer/TreatmentSlice";
import { ExtraServices } from "../../reducer/PatientTreatmentSlice";
import axios from "axios";
import { AddNewTretmentPayment } from "../../reducer/PatientTreatmentSlice";
import { FaPen } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import avtar from "../../img/avtarImg.jpg";
import {
  Checkbox,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import html2pdf from "html2pdf.js";
import { useRef } from "react";
function PatientDetail() {
  const navigate = useNavigate();
  const [openGuesthouse, setOpenGuesthouse] = useState(false);
  const [isEditGuesthouse, setIsEditGuesthouse] = useState(false);
  const [seekerStatus, setSeekerStatus] = React.useState({});
  const [treatmentData, setTreatmentData] = useState([]);
  const [recommend, setRecommend] = useState("");
  const [pickuptime, setPickuptime] = useState("");
  const [treatmentIds1, setTreatmentIds1] = useState("");
  const [vehicalnumber, setVehicalnumber] = useState("");
  const [openModalDovPlan, setOpenModalDovPlan] = useState(false);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);
  const [airAmbulanceData, setAirAmbulanceData] = useState([]);
  const [ambulanceData, setAmbulanceData] = useState([]);
  const [treatmentData1, setTreatmentData1] = useState([]);
  const [selectedAttendants, setSelectedAttendants] = useState([]);
  const [treatemntData1, setTreatemntData1] = useState([]);
  const [open4, setOpen4] = React.useState(false);
  const [doctorReviewData1, setDoctorReviewData1] = useState([]);
  const [datagetapiPaidto, setDatagetapiPaidto] = useState([]);
  const [getAttendeDetails, setGetAttendeDetails] = useState([]);
  const [attandantnew, setAttandantnew] = useState([]);
  const [guestHouseBooking, setGuestHouseBooking] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [datainfo, setDatainfo] = useState("");
  const [dataHospitalID, setDataHospitalID] = useState("");
  const [dataStatus, setDataStatus] = useState("");
  const [openAppointment, setOpenAppointment] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    hospital_id: "",
    hospitalName: "",
    health_issue: "",
    Notes: "",
    appointment_Date: "",
    appointment_Time: "",
    enq_userName: "",
    user_id: "",
    enq_phoneNumber: "",
    enq_email: "",
    enquiryId: "",
  });
  const hospitalRef = useRef();
  const omcaRef = useRef();
  const [guestHouseBookingobj, setGuestHouseBookingobj] = useState({});
  const [hospitalDetails, setHospitalDetails] = useState({});
  const [errors, setErrors] = useState({});
  const [valueofappointmentpaidto, setValueofappointmentpaidto] = useState("");
  const [drivername, setDrivername] = useState("");
  const [pharmacyadd, setPharmacyadd] = useState(false);
  const [attendedeaisledit, setAttendedeaisledit] = useState(false);
  const [popupopenattande, setPopupopenattande] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [notesID, setNotesID] = useState("");
  const [drivercontact, setDrivercontact] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [treatmentNamePassport, setTreatmentNamePassport] = useState("");
  const [treatmentIdFilter, setTreatmentIdFilter] = useState("");
  const [value1, setValue1] = useState("");
  const [treatmntidPharmacy, setTreatmntidPharmacy] = useState("");
  const [passportDetails, setPassportDetails] = useState({});
  const [editData, setEditData] = useState(null);
  const [dataPerforma, setDataPerforma] = useState(null);
  const [edited, setEdited] = useState(false);
  const [treatMentNAem, setTreatMentNAem] = useState("");
  const [filesData, setFilesData] = useState({
    attendant_fullname: "",
    attendant_relation: "",
    attendant_contact: "",
    Attende_passport: null,
    Attende_photo: null,
  });
  const [treatmentNameHeading, setTreatmentNameHeading] = useState("");
  const [attendId, setAttendId] = useState("");
  const [dataC, setDataC] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const { Countries } = useSelector((state) => state.Countries);
  const { PatientTreatments, loading, error } = useSelector(
    (state) => state.PatientTreatments,
  );
  const [ispatient, setIspatient] = useState("");
  const [datedata, setDatedata] = useState("");
  const [appointmentid, setAppointmentid] = useState("");
  const [tretment, setTretment] = useState([]);
  const [undadedservice, setUndadedservice] = useState([]);
  const [Service, setService] = useState([]);
  const [statuddropdown, setStatuddropdown] = useState("offline");
  const [reportdataget, setReportdataget] = useState([]);
  const [iniData, setIniData] = useState({});
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [hospitalList, setHospitalList] = useState([]);
  const [tratmentenqId, setTratmentenqId] = useState("");
  const [notesModal, setNotesModal] = useState(false);
  const [openmodalCharge, setOpenmodalCharge] = useState(false);
  const [hospitalCharge, setHospitalCharge] = useState("");
  const [treatmentIdCharge, setTreatmentIdCharge] = useState("");
  const [dataImperial, setDataImperial] = useState(false);
  const [open32, setOpen32] = useState(false);
  const [editModalNotes, setEditModalNotes] = useState(false);
  const [modalEditServiceOpen, setModalEditServiceOpen] = useState(false);
  const [treatmentIDservice, setTreatmentIDservice] = useState(null);
  const [open10, setOpen10] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [noteHospital2, setNoteHospital2] = useState("");
  const [treatmentPlanPopup, setTreatmentPlanPopup] = useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [note, setNote] = useState("");
  const [drreviewnotes, setDrreviewnotes] = useState("");
  const [date, setDate] = useState();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [hospitalId, setHospitalId] = useState("");
  const [doctorReviewNotes, setDoctorReviewNotes] = useState("");
  const [notesTable, setNotesTable] = useState([]);
  const [valuedata, setValuedata] = useState("");
  const [hospitalData, setHospitalData] = useState({
    hospital_id: "",
    hospital_Name: "",
    hospital_email: "",
  });
  const [treatmentId, setTreatmentId] = useState("");
  const [hospitalcharge, sethospitalharge] = useState("");
  const [hospitlID, setHospitlID] = useState([]);
  const [ishospitalArray, setIShospitalArray] = useState([]);
  const [dataForConfirmedEnq, setDataForConfirmedEnq] = useState([]);
  const [note2, setNote2] = useState("");
  const [activeSubTab, setActiveSubTab] = useState("details");
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(null);
  const [mainTab, setMainTab] = useState(() => {
    return localStorage.getItem("patientMainTab") || "treatment-plans";
  });
  const [date2, setDate2] = useState();
  const [appHospital, setAppHospital] = useState("");
  const [kys, setKyc] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notes, setNotes] = useState([]);
  const [dataHospital, setDataHospital] = useState([]);
  const [imagefile, setImagefile] = useState(null);
  const [treatmentIDa, setTreatmentIDa] = useState(null);
  const [enqId, setEnqId] = useState("");
  const [nodaestInput, setNodaestInput] = useState("");
  const [treatmentChargeid, setTreatmentChargeid] = useState("");
  const [gettreatmentserID, setGettreatmentserID] = useState("");
  const [dropdaowbreviwnotes, setDropdaowbreviwnotes] = useState("");
  const [pharmacyvalue, setPharmacyvalue] = useState("");
  const [serviceData, setServiceData] = useState([]);
  const [payment_details, setPayment_details] = useState([]);
  const [reportsFilered1, setReportsFilered1] = useState([]);
  const [paidTo, setPaidTo] = useState([]);
  const [paymentsFilered, setPaymentsFilered] = useState([]);
  const [attandantFilered, setAttandantFilered] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [appointmentTabel, setAppointmentTabel] = useState([]);
  const [chkservice, setChkservice] = useState([]);
  const [blogErr, setBlogErr] = useState(false);
  const [formDataGuestHouse, setFormDataGuestHouse] = useState({
    guestHouseName: "",
    dateRangeFrom: "",
    dateRangeTo: "",
    numberOfRooms: "",
    paymentAmount: "",
    paymentDate: "",
    notes: "",
    invoiceFile: null,
  });
  const [editPatientProfile, setEditPatientProfile] = useState(false);
  const [hAndleReport, setHAndleReport] = useState(false);
  const [appointErr, setAppointErr] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [oeditappp, setOeditappp] = useState(false);
  const [openPharmacyModal, setOpenPharmacyModal] = useState(false);
  const [isEditT, setIsEditT] = useState(false);
  const [treatmentuser, setTreatmentuser] = useState([]);
  const [noteErr, setNoteErr] = useState(false);
  const [data, setData] = useState({
    paid_amount: "",
    paymentMethod: "",
    payment_Date: "",
    notes: "",
  });
  const usrFount = localStorage.getItem("_id");
  useEffect(() => {
    gtdatareportsdata();
    getextraservice();
  }, []);
  useEffect(() => {
    getAttemdeData();
  }, []);
  useEffect(() => {
    getTreatmentPlan();
  }, []);
  const getextraservice = async () => {
    try {
      const response = await axios.get(`${baseurl}paid_service`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      const extraServices = response.data; // 👈 cleaner
    } catch (error) {
      console.error("Error fetching extra services:", error);
      throw error;
    }
  };
  const handleDownloadPDF = (ref, fileName = "download.pdf") => {
    const element = ref?.current;
    if (!element) return; // ✅ safety
    element.classList.add("pdf-mode");
    const opt = {
      margin: 0, // 🔥 thoda spacing (top, left, bottom, right)
      filename: fileName, // ✅ dynamic filename
      html2canvas: {
        scale: 2,
        scrollX: 0,
        scrollY: 0,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };
    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        element.classList.remove("pdf-mode");
      });
  };
  const hadnlcecEdopenmodalGuestHouse = (item, info) => {
    console.log(item, info);
    setTreatmentIds1(item.patientId);
    setFormDataGuestHouse(item);
    setIsEditGuesthouse(true);
    setOpenGuesthouse(true);
  };
  const handleclickGuestHouse = (info) => {
    setTreatmentIds1(info.treatment_id);
    setOpenGuesthouse(true);
  };
  const handleCloseguesthouse = () => {
    setOpenGuesthouse(false);
    setTreatmentIds1();
    setIsEditGuesthouse(false);
    setFormDataGuestHouse("");
    setOpenGuesthouse(false);
  };
  const AddpaymentOnchnage = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const ServiceData2 = useSelector((state) => state.Service.Service);
  const { hospital } = useSelector((state) => state.hospital);
  const { Treatment } = useSelector((state) => state.Treatment);
  useEffect(() => {
    dispatch(GetAllTreatment());
  }, [dispatch]);
  useEffect(() => {
    dispatch(GetAllHositalData());
    // console.log(error, hospital);
  }, [dispatch]);
  useEffect(() => {
    dispatch(GetAllCountries2());
    dispatch(GetPatientTreatments({ id: location.state.patientId }));
  }, [dispatch, location.state.patientId]);
  useEffect(() => {
    if (PatientTreatments) {
      console.log(PatientTreatments);
      setIspatient(PatientTreatments);
      console.log(PatientTreatments);
      setTretment(PatientTreatments.treatments || []);
      setKyc(PatientTreatments.Kyc_details);
      setNotes(PatientTreatments.discussionNotes);
      setPayment_details(PatientTreatments.payment_details);
      const treatmentId = PatientTreatments?.treatments?.[0]?.treatment_id;
      console.log(treatmentId);
      if (treatmentId) {
        patient_guesthouse(treatmentId); // 👈 pass karo
      }
      setChkservice(PatientTreatments.services);
    }
  }, [PatientTreatments]);
  const handleClose = () => {
    sethospitalharge("");
    setOpen(false);
  };
  const handleClickOpen = (e, tretmentId) => {
    setOpen(true);
    setTreatmentId(tretmentId);
  };
  const handleClose5 = () => {
    setOpen5(false);
  };
  const handleClickOpen1 = (e, tretmentId, listhospital) => {
    console.log(e, tretmentId, listhospital);
    setEdited(false);
    setOpen1(true);
    setTreatmentId(selectedTreatmentId);
    setIShospitalArray(hospitalDetails);
  };
  const handleClickOpenNotes = (e, tretmentId, listhospital) => {
    setOpen5(true);
    setOpenNotes(true);
    setTreatmentId(tretmentId);
    setIShospitalArray(listhospital);
  };
  const handleClickOpen2 = (e, tretmentId, listhospital) => {
    setOpen2(true);
  };
  useEffect(() => {
    if (dataC?.treatment_id) {
      getDataapi3(dataC);
    }
  }, [dataC]);
  const handleClickOpen3 = (e, tretmentId) => {
    setOpen3(true);
    setTreatmentId(tretmentId);
  };
  const handleClickOpenPerforma = (e, tretmentId) => {
    setOpen32(true);
    setTreatmentId(tretmentId);
  };
  useEffect(() => {
    const treatmentId = tretment?.treatment?.[0]?.treatment_id;

    if (treatmentId) {
      patient_guesthouse();
      getallPayments();
    }
  }, [location.state.patientId, tretment]);
  const handleclosePerforma = () => {
    setOpen32(false);
  };
  const handleEditreport = (id, info) => {
    setTreatmentId(id, info.treatmentId);
    setIniData(id);
    setHAndleReport(true);
    setOpen10(true);
  };
  const handleClickOpen10 = (e, tretmentId) => {
    setTreatmentId(tretmentId);
    setOpen10(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
    setDrivername("");
    setPickuptime("");
    setNote("");
    setVehicalnumber("");
    setDate("");
  };
  const statusRole = localStorage.getItem("Role");
  const handleClose2 = () => {
    setOpen2(false);
    setFilesData("");
    setAttendedeaisledit(false);
  };
  const setHospitalFunction1 = async () => {
    try {
      const response = await axios.post(`${AdminBaseUrl}hospital_list`);
      if (response.data.success) {
        console.log(response.data.data);
        setHospitalList(response.data.data);
      }
    } catch (error) {}
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
  const handleNotesdataqw = async (e) => {
    e.preventDefault();
    if (!note || !recommend || images.length === 0) {
      return Swal.fire("Error", "All fields are required", "error");
    }
    try {
      let response;
      if (tabValue === 0) {
        const enquiryPayload = new FormData();
        enquiryPayload.append("review_notes", note);
        enquiryPayload.append("Recommendations", recommend); // ⚠️ old API key
        enquiryPayload.append("enquiryId", enqId);
        enquiryPayload.append("user_type", statusRole);
        images.forEach((img) => {
          enquiryPayload.append("images", img);
        });
        console.log("OLD API PAYLOAD →", [...enquiryPayload.entries()]);
        response = await axios.post(
          `${baseurl}addDoctorReview`,
          enquiryPayload,
        );
      } else {
        const newPayload = new FormData();
        const typeMap = {
          1: "AmbulanceRequest",
          2: "AirAmbulance",
          3: "PatientQuery",
        };
        newPayload.append("review_notes", note);
        newPayload.append("enquiry_id", tratmentenqId);
        newPayload.append("recommendations", recommend);
        newPayload.append("user_type", statusRole);
        newPayload.append("reference_id", enqId);
        newPayload.append("model_type", typeMap[tabValue]);
        images.forEach((img) => {
          newPayload.append("images[]", img);
        });
        console.log("NEW API PAYLOAD →", [...newPayload.entries()]);
        response = await axios.post(`${AdminBaseUrl}review/store`, newPayload);
      }
      if (response?.data?.success) {
        handleClose4();
        Swal.fire("Success", "Doctor Review Added Successfully", "success");
        setNote("");
        setRecommend("");
        setImages([]);
      }
    } catch (error) {
      console.log(error);
      let message = "Something went wrong";
      if (error.response) {
        message = error.response.data?.message || message;
      } else if (error.request) {
        message = "No response from server";
      } else {
        message = error.message;
      }
      Swal.fire("Error", message, "error");
    }
  };
  const handleSubmitAppointment = async () => {
    const { appointment_Date, appointment_Time, Notes } = appointmentData;
    if (!appointment_Date) {
      return Swal.fire("Error", "Please select appointment date", "error");
    }
    if (!appointment_Time) {
      return Swal.fire("Error", "Please select appointment time", "error");
    }
    if (!Notes) {
      return Swal.fire("Error", "Please enter notes", "error");
    }
    if (images.length === 0) {
      return Swal.fire("Error", "Please upload at least one report", "error");
    }
    console.log(appointmentData);
    try {
      const formData = new FormData();
      formData.append("enquiryId", appointmentData.enquiry_id);
      formData.append("hospital_id", appointmentData.hospital_id);
      formData.append("hospitalName", appointmentData.hospitalName);
      formData.append("hospital_email", appointmentData.hospital_email);
      formData.append("health_issue", appointmentData.health_issue);
      formData.append("Notes", appointmentData.Notes);
      formData.append("appointment_Date", appointmentData.appointment_Date);
      formData.append("appointment_Time", appointmentData.appointment_Time);
      formData.append("enq_userName", appointmentData.enq_userName);
      formData.append("enq_phoneNumber", appointmentData?.enq_phoneNumber);
      formData.append("user_id", appointmentData?.user_id);
      // formData.append("enq_country_code", appointmentData.enq_country_code);
      formData.append("enq_email", appointmentData.enq_email);
      images.forEach((file) => {
        formData.append("reports", file);
      });
      const res = await axios.post(
        `${baseurl}create_enquiry_appointment/${usrFount}`,
        formData,
      );
      if (res.data.success) {
        Swal.fire("Success", "Appointment Created", "success");
        handleCloseAppointment();
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClose10 = () => {
    setOpen10(false);
    setHAndleReport(false);
    setIniData("");
  };
  const PatientDetailButton = (e, id) => {
    navigate("/Admin/add-patient-treatment", {
      state: {
        patient: location.state.patientId,
      },
    });
  };
  const GetActiveService = () => {
    axios
      .get(`${baseurl}get_activeServices`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setService(response.data.services);
        } else {
          console.error("Failed to fetch job titles:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching job titles:", error);
      });
  };
  useEffect(() => {
    GetActiveService();
    setHospitalFunction1();
    getDataforconfirmedenq();
  }, []);
  const getDataforconfirmedenq = async () => {
    try {
      const response = await axios.get(
        `${baseurl}enquiries/by-patient/${location.state.patientId}`,
      );
      if (response.data.data) {
        setDataForConfirmedEnq(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose4 = () => {
    setOpen4(false);
  };
  useEffect(() => {
    get3tabdata();
  }, []);
  console.log(location.state.user_id);
  const get3tabdata = async (datauserId, getcountry, rolestatus) => {
    const payload = {
      user_id: location.state.user_id,
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
      setTreatmentData1(response?.data?.data?.get_treatment_estimate || []);
    } catch (error) {
      console.log(error);
    }
  };
  const handlesubmitdata = async () => {
    const priceValue = Number(data.price);
    if (!data.price || isNaN(priceValue) || priceValue <= 0) {
      Swal.fire({
        title: "Error",
        text: "Price must be greater than 0",
        icon: "error",
      });
      return;
    }
    const startDate = new Date(datedata.start_date);
    const endDate = new Date(datedata.end_date);
    if (!datedata.start_date || !datedata.end_date) {
      Swal.fire({
        title: "Error",
        text: "Please select both start date and end date",
        icon: "error",
      });
      return;
    }
    if (startDate >= endDate) {
      Swal.fire({
        title: "Error",
        text: "Start date must be smaller than end date",
        icon: "error",
      });
      return;
    }
    const servipostdata = {
      services: {
        serviceId: valuedata,
        price: priceValue,
        startTime: datedata.start_date,
        endTime: datedata.end_date,
      },
    };
    try {
      const response = await axios.post(
        `${baseurl}patient_extra_service/${gettreatmentserID}`,
        servipostdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data.success === true) {
        setOpenModal(false);
        dispatch(
          GetPatientTreatments({
            id: location.state.patientId,
          }),
        );
        Swal.fire("Service Added successfully!", "", "success");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong!";
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    }
  };
  useEffect(() => {
    gettreatment11();
  }, []);
  const hadnlcecEditModal = (item, treatmentId) => {
    setTreatmentIDservice(treatmentId.treatment_id);
    setModalEditServiceOpen(true);
    setData(item);
  };
  const hadnlcecEcloseeModal = () => {
    setModalEditServiceOpen(false);
  };
  const gettreatment11 = async () => {
    try {
      const response = await axios.post(`${baseurl}treatment_list`);
    } catch (error) {}
  };
  useEffect(() => {
    getDrreview();
  }, []);
  useEffect(() => {
    gettreatment();
  }, [ispatient?.patientId]);
  const gettreatment = async () => {
    try {
      const response = await axios.get(
        `${baseurl}get_patient_treatment/${ispatient?.patientId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );
      setTreatmentuser(response.data.patient_treatments, "treatment data");
    } catch (error) {
      console.error("Error fetching treatment data", error);
    }
  };
  useEffect(() => {
    getAllPaidTo();
  }, []);
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setBlogErr({ hospitalcharge: false });
    const result = await dispatch(
      AddHospitalForPatient({
        id: location.state.patientId,
        hospitalId: hospitalId,
        treatmentId: treatmentId,
      }),
    );
    if (AddHospitalForPatient.rejected.match(result)) {
      const allErrors = result.payload; // array of backend errors
      setOpen(false);
      Swal.fire({
        title: "Error Occurred",
        html: allErrors.join("<br>"),
        icon: "error",
      }).then(() => {
        setOpen(true);
      });
      setIsSubmitting(false);
      return;
    }
    try {
      setOpen(false);
      Swal.fire("Patient assigned to Hospital successfully!", "", "success");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
      setTreatmentId("");
      setNote("");
      setDate("");
      setHospitalId("");
      setBlogErr(false);
    } catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const deletePaymentInvoice = async (item) => {
    console.log(item);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${baseurl}delete_payment/${item._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          },
        );
        if (response.data?.success) {
          getDataapi3(selectedTreatmentId);
          dispatch(GetPatientTreatments({ id: location.state.patientId }));
          Swal.fire("Deleted!", "Payment has been deleted.", "success");
        } else {
          toast.error("Failed to delete Payment");
        }
      } catch (error) {
        console.error("Delete Payment error:", error);
        toast.error("Something went wrong");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        icon: "error",
      });
    }
  };
  const handleDelete212 = async (item) => {
    console.log(item);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    });
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${baseurl}deleteTreatmentAttendee/${item}`,
        );
        if (response.data?.success) {
          Swal.fire("Deleted!", "Report has been deleted.", "success");
          getDataapi3(selectedTreatmentId);
        } else {
          toast.error("Failed to delete report");
        }
      } catch (error) {
        console.error("Delete report error:", error);
        toast.error("Something went wrong");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        icon: "error",
      });
    }
  };
  const handledeleteReport = async (item) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${baseurl}deleteReport/${item._id}`,
        );
        if (response.data?.success) {
          Swal.fire("Deleted!", "Report has been deleted.", "success");
          getDataapi3(selectedTreatmentId);
        } else {
          toast.error("Failed to delete report");
        }
      } catch (error) {
        console.error("Delete report error:", error);
        toast.error("Something went wrong");
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        icon: "error",
      });
    }
  };
  const handlesubmitAppoint = async (e) => {
    e.preventDefault();
    const isOffline = statuddropdown === "offline";
    setAppointErr({
      note: false,
      date: false,
      drivername: false,
      vehicalnumber: false,
      drivercontact: false,
      pickuptime: false,
      hospitalcharge: false,
    });
    let hasError = false;
    if (!note) {
      setAppointErr((prev) => ({ ...prev, note: true }));
      hasError = true;
    }
    if (!date) {
      setAppointErr((prev) => ({ ...prev, date: true }));
      hasError = true;
    }
    if (!pickuptime) {
      setAppointErr((prev) => ({ ...prev, pickuptime: true }));
      hasError = true;
    }
    if (isOffline) {
      if (!drivername) {
        setAppointErr((prev) => ({ ...prev, drivername: true }));
        hasError = true;
      }
    }
    if (hasError) {
      return;
    }
    try {
      const result = await dispatch(
        AppointmentForPatient({
          patientId: location.state.patientId,
          hospitalId: hospitalData.hospital_id,
          hospital_Name: hospitalData.hospital_Name,
          hospital_email: hospitalData.hospital_email,
          treatment_id: treatmentId,
          note: note,
          mode: statuddropdown,
          appointment_Date: date,
          pickup_time: pickuptime,
          vehicle_no: vehicalnumber,
          driver_name: drivername,
          driver_contact: drivercontact,
        }),
      ).unwrap();
      getDataapi3(treatmentId);
      setOpen1(false);
      Swal.fire("Patient assigned to Appointment successfully!", "", "success");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
      setTreatmentId("");
      sethospitalharge("");
      setHospitalId("");
      setNote("");
      setDate("");
      setDrivercontact("");
      setPickuptime("");
      setDrivername("");
      setVehicalnumber("");
      setAppointErr(false);
    } catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  };
  const handlesubmitAppoint111 = async (e) => {
    e.preventDefault();
    const isOffline = statuddropdown === "offline";
    setAppointErr({
      note: false,
      date: false,
    });
    let hasError = false;
    if (!note) {
      setAppointErr((prev) => ({ ...prev, note: true }));
      hasError = true;
    }
    if (!date) {
      setAppointErr((prev) => ({ ...prev, date: true }));
      hasError = true;
    }
    if (hasError) {
      return;
    }
    try {
      const result = await dispatch(
        AppointmentForPatient({
          patientId: location.state.patientId,
          hospitalId: hospitalData.hospital_id,
          hospital_Name: hospitalData.hospital_Name,
          hospital_email: hospitalData.hospital_email,
          treatment_id: treatmentId,
          note: note,
          mode: statuddropdown,
          appointment_Date: date,
        }),
      ).unwrap();
      getDataapi3(treatmentId);
      setOpen1(false);
      Swal.fire("Patient assigned to Appointment successfully!", "", "success");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
      setTreatmentId("");
      sethospitalharge("");
      setHospitalId("");
      setNote("");
      setDate("");
      setDrivercontact("");
      setPickuptime("");
      setDrivername("");
      setVehicalnumber("");
      setAppointErr(false);
    } catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  };
  const getdataApi = async () => {
    try {
      const rresponse = await axios.post(`${AdminBaseUrl}hospital_list`);
      if (rresponse.data.success === "true") {
        setDataHospital(rresponse.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getdataApi();
  }, []);
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf",
  ];
  const handleKysDetail = async (e) => {
    e.preventDefault();
    const {
      attendant_fullname,
      attendant_relation,
      attendant_contact,
      Attende_passport,
      country,
      attendant_address,
    } = filesData;
    if (
      !attendant_fullname?.trim() ||
      !attendant_relation?.trim() ||
      !attendant_contact?.trim() ||
      !country?.trim() ||
      !Attende_passport ||
      !attendant_address
    ) {
      Swal.fire("All fields are mandatory!", "", "warning");
      return;
    }
    const formData = new FormData();
    formData.append("attendant_fullname", attendant_fullname);
    formData.append("attendant_relation", attendant_relation);
    formData.append("attendant_contact", attendant_contact);
    formData.append("country", filesData.country);
    formData.append("attendant_address", attendant_address);
    filesData.Attende_passport.forEach((file) => {
      formData.append("attendant_passport", file);
    });
    console.log(filesData);
    try {
      const response = await axios.post(
        `${baseurl}addAttendeeDetails/${location.state.patientId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.data.success) {
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        setOpen2(false);
        getattendantnewai();
        Swal.fire("Attendant  Details Added Successfully!", "", "success");
        setFilesData({
          attendant_fullname: "",
          attendant_relation: "",
          attendant_contact: "",
          Attende_passport: null,
          Attende_photo: null,
        });
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        error?.response?.data?.message || error.message,
        "error",
      );
    }
  };
  const hospitalStatuses = [
    "Under Review",
    "Under Surgery",
    "Admitted",
    "Assigned to Hospital",
    "Under Recovery",
    "Discharged",
  ];
  const editatednde = async (e) => {
    e.preventDefault();
    const {
      attendant_fullname,
      attendant_relation,
      attendant_contact,
      country,
      attendant_address,
    } = filesData;
    if (!attendant_fullname?.trim()) {
      return Swal.fire("Error!", "Attendant fullname is required", "error");
    }
    if (!attendant_relation?.trim()) {
      return Swal.fire("Error!", "Attendant relation is required", "error");
    }
    if (!attendant_contact?.toString().trim()) {
      return Swal.fire("Error!", "Attendant contact is required", "error");
    }
    if (!country?.trim()) {
      return Swal.fire("Error!", "Country is required", "error");
    }
    if (!attendant_address?.trim()) {
      return Swal.fire("Error!", "Attendant address is required", "error");
    }
    const formData = new FormData();
    formData.append("attendant_fullname", attendant_fullname);
    formData.append("attendant_relation", attendant_relation);
    formData.append("attendant_contact", attendant_contact);
    formData.append("country", country);
    formData.append("attendant_address", attendant_address);
    if (filesData?.Attende_passport && filesData.Attende_passport.length > 0) {
      filesData.Attende_passport.forEach((file) => {
        formData.append("attendant_passport", file);
      });
    }
    try {
      const response = await axios.put(
        `${baseurl}updateAttendeeDetails/${filesData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.data.success) {
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        getattendantnewai();
        setOpen2(false);
        Swal.fire(
          "Success!",
          "Attendant Details Updated Successfully!",
          "success",
        );
        setFilesData({
          attendant_fullname: "",
          attendant_relation: "",
          attendant_contact: "",
          country: "",
          attendant_address: "",
          Attende_passport: null,
          Attende_photo: null,
        });
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        error?.response?.data?.message || error.message,
        "error",
      );
    }
  };
  const handechangesearch = (e) => {
    console.log(e.target.value);
    setDrreviewnotes(e.target.value);
    // setdropdaowbreviwnotes()
  };
  useEffect(() => {
    getattendantnewai();
  }, []);
  const getattendantnewai = async () => {
    try {
      const response = await axios.get(
        `${baseurl}getAttendeeDetails/${location.state.patientId}`,
      );
      setAttandantnew(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilesData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e, fieldName) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (fieldName === "Attende_photo") {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        Swal.fire("Only image file allowed for Photo!", "", "warning");
        return;
      }
      setFilesData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));
    } else if (fieldName === "Attende_passport") {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter(
        (file) =>
          file.type.startsWith("image/") || file.type === "application/pdf",
      );
      if (validFiles.length !== fileArray.length) {
        Swal.fire("Only images and PDF files are allowed!", "", "warning");
        return;
      }
      setFilesData((prev) => ({
        ...prev,
        [fieldName]: validFiles,
      }));
    }
  };
  const handleOnChangeCheckbox = (event, id) => {
    const selectedService = Service.find((info) => info.serviceId === id);
    if (selectedService) {
      if (event.target.checked) {
        if (!selectedServices.some((service) => service.serviceId === id)) {
          setSelectedServices((prev) => [
            ...prev,
            {
              serviceId: selectedService.serviceId,
              price: selectedService.price,
            },
          ]);
        }
        setChkservice((prev) => [...prev, selectedService]);
      } else {
        setSelectedServices((prev) =>
          prev.filter((service) => service.serviceId !== id),
        );
        setChkservice((prev) =>
          prev.filter((service) => service.serviceId !== id),
        );
      }
    }
  };
  const handleExtraService = async () => {
    const allServices = [...chkservice, ...selectedServices];
    try {
      const result = await dispatch(
        ExtraServices({ id: location.state.patientId, services: allServices }),
      ).unwrap();
      Swal.fire("New Services Added!", "", "success");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
    } catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    }
  };
  const handleNotesdata = (e) => {
    e.preventDefault();
    setNoteErr({
      note2: false,
      date2: false,
    });
    let hasError = false;
    if (!note2) {
      setNoteErr((prev) => ({ ...prev, note2: true }));
      hasError = true;
    }
    if (!date2) {
      setNoteErr((prev) => ({ ...prev, date2: true }));
      hasError = true;
    }
    if (hasError) return;
    const formData = new FormData();
    formData.append("note", note2);
    formData.append("date", date2);
    if (images && images.length > 0) {
      images.forEach((img) => {
        formData.append("treatmentNoteImages", img); // backend should use upload.array("images")
      });
    }
    axios
      .post(`${baseurl}add_treatment_notes/${treatmentId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setOpen5(false);
          getDataapi3(treatmentId);
          Swal.fire("Success", "Notes added successfully!", "success");
          dispatch(GetPatientTreatments({ id: location.state.patientId }));
        }
        setNote2("");
        setDate2("");
        setImages([]);
        setNoteErr({
          note2: false,
          date2: false,
        });
      })
      .catch((error) => {
        setOpen5(false);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };
  const handleAddTritmentPayment = async () => {
    console.log(treatmentId, selectedTreatmentId);
    if (!valueofappointmentpaidto) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select Paid To",
      });
      return;
    }
    if (!iniData?.paid_for) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select Paid For",
      });
      return;
    }
    if (!data?.notes) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select Notes",
      });
      return;
    }
    if (!data?.paymentMethod) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select Payment Method",
      });
      return;
    }
    if (!data?.paid_amount) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select Paid Amount",
      });
      return;
    }
    if (!data?.payment_Date) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please select Payment Date",
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("id", treatmentId || selectedTreatmentId);
      formData.append("paid_amount", data?.paid_amount);
      formData.append("notes", data?.notes);
      formData.append("paymentMethod", data?.paymentMethod);
      formData.append("payment_Date", data?.payment_Date);
      formData.append("paid_to", valueofappointmentpaidto);
      formData.append("paid_for", iniData?.paid_for);
      formData.append("platform", 1);
      if (iniData?.attachFile) {
        formData.append("attachFile", iniData.attachFile);
      }
      await dispatch(AddNewTretmentPayment(formData)).unwrap();
      getDataapi3(selectedTreatmentId);
      setOpen3(false);
      Swal.fire("Success!", "Payment Details Added Successfully!", "success");
      if (location.state?.patientId) {
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
      }
      setTreatmentId("");
      setData({
        paid_amount: "",
        paymentMethod: "",
        payment_Date: "",
      });
    } catch (err) {
      const errorMessage =
        typeof err === "string" ? err : err?.message || "Something went wrong";
      setOpen3(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      }).then(() => {
        setOpen3(true);
      });
    }
  };
  const handleChange = async (event, id) => {
    const { value } = event.target;
    setSeekerStatus((prev) => ({
      ...prev,
      [id]: value,
    }));
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authorization token is missing");
    }
    const response = await axios.post(
      `${baseurl}update_treatment_status/${id}`,
      { status: event.target.value },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    try {
      Swal.fire("Success!", "Status updated successfully!", "success");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
      return response.data;
    } catch (err) {}
  };
  const handleChangeDetails = async (event, id) => {
    try {
      const { value } = event.target;
      setSeekerStatus((prev) => ({
        ...prev,
        [id]: value,
      }));
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token is missing");
      }
      const response = await axios.post(
        `${baseurl}update_appointment_status/${id}`,
        { status: parseInt(value) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      Swal.fire("Success!", "Status updated successfully!", "success");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
      return response.data;
    } catch (err) {
      console.error(err.response || err.message);
      if (err.response && err.response.data && err.response.data.message) {
        Swal.fire("Error", err.response.data.message, "error");
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };
  const groupedPayments = payment_details?.reduce((acc, info) => {
    if (!acc[info.treatment_id]) {
      acc[info.treatment_id] = [];
    }
    acc[info.treatment_id].push(info);
    return acc;
  }, {});
  const getMappedStatus = (status) => {
    const hospitalStatuses = [
      "Under Review",
      "Admitted",
      "Under Surgery",
      "Under Recovery",
      "Discharged",
      "Assigned to Hospital",
    ];
    if (hospitalStatuses.includes(status)) {
      return "Assigned to Hospital";
    }
    return status || "";
  };
  const penModal = (a, b) => {
    getapicall(b);
    setGettreatmentserID(b);
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    getallservice();
  }, []);
  const getallservice = async () => {
    try {
      const response = await axios.get(`${baseurl}get_activeServices`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setServiceData(response.data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const andlechange = (e) => {
    const { name, value } = e.target;
    const val1 = e.target.value;
    getapicall(val1);
    setData({ ...data, [name]: value });
    serviceData.map((info) => {
      if (info.serviceId === value) {
        setValuedata(value);
        setData({ ...data, price: info.price });
      }
    });
  };
  const andlechangedate = (e) => {
    const { name, value } = e.target;
    setDatedata({ ...datedata, [name]: value });
  };
  const handleClickOpen4 = (e, enq, info) => {
    console.log(info);
    setOpen4(true);
    setEnqId(enq);
    setTratmentenqId(info.id);
  };
  const handleCloseAppointment = () => {
    setOpenAppointment(false);
    setImages([]);
    setAppointmentData({
      patient_name: "",
      doctor_name: "",
      date: "",
      time: "",
      notes: "",
      user_id: "",
      enq_userName: "",
      enq_phoneNumber: "",
      enq_email: "",
    });
  };
  const handleOpenAppointment = (info) => {
    console.log(info);
    setAppointmentData({
      hospital_id: "",
      hospitalName: "",
      health_issue: "",
      Notes: "",
      appointment_Date: "",
      appointment_Time: "",
      enq_userName: info.name,
      enq_phoneNumber: info.emergency_contact_no,
      user_id: info._id,
      enq_email: info.email,
      enquiry_id: info.enquiryId,
    });
    setOpenAppointment(true);
  };
  const getapicall = (getapicall) => {
    axios
      .get(`${baseurl}get_unadded_services_for_treatment/${getapicall}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUndadedservice(response.data.availableServices);
      })
      .catch((error) => {
        console.error("Error fetching unadded services:", error);
      });
  };
  const handlefilechange = (e) => {
    const { name, value } = e.target;
    setIniData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlefilechangechangeinput = async (e) => {
    console.log(e.target.value);
    setValueofappointmentpaidto(e.target.value);
    try {
      const response = await axios.get(
        `${baseurl}/getPaidForByPaidTo/${e.target.value}`,
      );
      setDatagetapiPaidto(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange12 = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire("Only JPG, PNG, files are allowed.");
      return;
    }
    setImagefile(file); // store in state
  };
  const handleFileChange1 = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));
    if (validFiles.length !== files.length) {
      Swal.fire("Only JPG, PNG, or PDF files are allowed.");
      return;
    }
    setImagefile(validFiles);
  };
  const handleAttachFile = (e) => {
    const file = e.target.files[0];
    setIniData((prev) => ({
      ...prev,
      attachFile: file,
    }));
  };
  const handleViewImages = (images) => {
    if (!images || images.length === 0) return;
    images.forEach((img) => {
      const url = image + img;
      window.open(url, "_blank");
    });
  };
  const handleClickEditReport = async () => {
    console.log("a", treatmentId);
    if (!iniData?.reportTitle?.trim()) {
      return Swal.fire("Error", "Report Title is required", "error");
    }
    if (!iniData?.treatment_report_date) {
      return Swal.fire("Error", "Report Date is required", "error");
    }
    try {
      Swal.fire({
        title: "Updating...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const formData = new FormData();
      formData.append("reportTitle", iniData.reportTitle);
      formData.append(
        "treatment_report_date",
        new Date(iniData.treatment_report_date).toISOString().split("T")[0],
      );
      formData.append("platform", 1);
      if (iniData?.attachFile) {
        formData.append("attachFile", iniData.attachFile);
      }
      if (Array.isArray(imagefile)) {
        imagefile.forEach((file) => {
          formData.append("treatmentReport", file);
        });
      }
      const response = await axios.put(
        `${baseurl}editReport/${iniData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Report Updated Successfully ✅",
          timer: 1500,
          showConfirmButton: false,
        });
        handleClose10();
        getDataapi3(treatmentId.treatmentId);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.data?.message || "Failed to update report",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };
  const handleClickSubmit = async () => {
    // 🔥 VALIDATION START
    if (!iniData.reportTitle) {
      return Swal.fire("Error", "Report Title is required", "error");
    }
    if (!iniData.treatment_report_date) {
      return Swal.fire("Error", "Report Date is required", "error");
    }
    if (!imagefile || imagefile.length === 0) {
      return Swal.fire(
        "Error",
        "At least one Treatment Report image is required",
        "error",
      );
    }
    try {
      const formData = new FormData();
      formData.append("reportTitle", iniData.reportTitle);
      formData.append("treatment_report_date", iniData.treatment_report_date);
      formData.append("platform", 1);
      formData.append("attachFile", iniData.attachFile);
      imagefile.forEach((file) => {
        formData.append("treatmentReport", file);
      });
      const response = await axios.post(
        `${baseurl}addReports/${treatmentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Report Added Successfully!",
        });
        handleClose10();
        getDataapi3(treatmentId);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response?.data?.message || "Failed to add report",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };
  const handleopenNotesModal = (id) => {
    const response = notes.filter((item) => {
      return item.id === id;
    });
    setNodaestInput(response[0]);
    setNotesModal(true);
  };
  const handleCloseNotesmodal = () => {
    setNotesModal(false);
  };
  const handlechangenotesdata = (e) => {
    const { name, value } = e.target;
    setNodaestInput({ ...nodaestInput, [name]: value });
  };
  const handleKysDetailnotes = async (e) => {
    e.preventDefault();
    try {
      const postdata = {
        id: nodaestInput.id,
        note: nodaestInput.note,
        date: nodaestInput.date,
      };
      const response = await axios.post(
        `${baseurl}update_notes/${location.state.patientId}`,
        postdata,
      );
      if (response.data.success === true) {
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        handleCloseNotesmodal();
        Swal.fire("Notes Updates Successfully!", "", "success");
      } else {
        toast.error("somethign went wornh");
      }
    } catch (error) {}
  };
  const gtdatareportsdata = async () => {
    try {
      const response = await axios.get(
        `${baseurl}getReports/${location.state.patientId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data.success === true) {
        setTreatmentData(response.data.data);
        setReportdataget(response.data.data);
      } else {
      }
    } catch (error) {}
  };
  const handledelete = async (info) => {
    console.log(info);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This hospital will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6e7881",
      confirmButtonText: "Yes, delete it!",
    });
    if (!result.isConfirmed) return;
    try {
      const response = await axios.delete(
        `${baseurl}deleteTreatmentHospital/${info.treatment_id}/${info.hospital.details.hospital_id}`,
      );
      if (response.data.success === true) {
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Hospital deleted successfully",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Server error occurred", "error");
    }
  };
  const editServiceandlechange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  // const handlesubmitdataserviceEdit = async () => {
  //   const payload = {
  //     _id: data._id,
  //     duration: data.duration,
  //     endTime: data.endTime,
  //     price: Number(data.price),
  //     service_type: data.service_type,
  //     serviceId: data.serviceId,
  //     serviceName: data.serviceName,
  //     startTime: data.startTime,
  //   };
  //   try {
  //     const response = await axios.put(
  //       `${baseurl}edit_patient_extra_service/${treatmentIDservice}/${data.serviceId}`,
  //       payload, // (agar body bhejni hai)
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     );
  //     if (response.data?.success) {
  //       hadnlcecEcloseeModal();
  //       dispatch(GetPatientTreatments({ id: location.state.patientId }));
  //       Swal.fire({
  //         icon: "success",
  //         title: "Updated!",
  //         text: response.data.message || "Service updated successfully",
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "warning",
  //         title: "Warning",
  //         text: response.data?.message || "Update failed",
  //       });
  //     }
  //   } catch (error) {
  //     const errorMessage =
  //       error?.response?.data?.message ||
  //       error?.message ||
  //       "Something went wrong!";
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: errorMessage,
  //       didOpen: () => {
  //         const swalContainer = document.querySelector(".swal2-container");
  //         if (swalContainer) {
  //           swalContainer.style.zIndex = "1500"; // MUI Dialog se zyada
  //         }
  //       },
  //     });
  //   }
  // };
  const handlesubmitdataserviceEdit = async () => {
    // Convert price to number
    const priceValue = Number(data.price);
    // Price Validation
    if (!data.price || isNaN(priceValue) || priceValue <= 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Price must be greater than 0",
        didOpen: () => {
          const swalContainer = document.querySelector(".swal2-container");
          if (swalContainer) {
            swalContainer.style.zIndex = "1500";
          }
        },
      });
      return;
    }
    // Date Mandatory Validation
    if (!data.startTime || !data.endTime) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Both start date and end date are mandatory",
        didOpen: () => {
          const swalContainer = document.querySelector(".swal2-container");
          if (swalContainer) {
            swalContainer.style.zIndex = "1500";
          }
        },
      });
      return;
    }
    // Date Comparison Validation
    const startDate = new Date(data.startTime);
    const endDate = new Date(data.endTime);
    if (startDate >= endDate) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Start date must be smaller than end date",
        didOpen: () => {
          const swalContainer = document.querySelector(".swal2-container");
          if (swalContainer) {
            swalContainer.style.zIndex = "1500";
          }
        },
      });
      return;
    }
    const payload = {
      _id: data._id,
      duration: data.duration,
      endTime: data.endTime,
      price: priceValue,
      service_type: data.service_type,
      serviceId: data.serviceId,
      serviceName: data.serviceName,
      startTime: data.startTime,
    };
    try {
      const response = await axios.put(
        `${baseurl}edit_patient_extra_service/${treatmentIDservice}/${data.serviceId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data?.success) {
        hadnlcecEcloseeModal();
        dispatch(
          GetPatientTreatments({
            id: location.state.patientId,
          }),
        );
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: response.data.message || "Service updated successfully",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: response.data?.message || "Update failed",
        });
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong!";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
        didOpen: () => {
          const swalContainer = document.querySelector(".swal2-container");

          if (swalContainer) {
            swalContainer.style.zIndex = "1500";
          }
        },
      });
    }
  };
  const handledeltePatientserveice = async (a, b, index) => {
    console.log(a, b);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this service?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6e7881",
    });
    if (!result.isConfirmed) return;
    try {
      const response = await axios.delete(
        `${baseurl}delete_patient_extra_service/${b.treatment_id}/${a.serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data?.success) {
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        Swal.fire("Deleted!", "Service Deleted Successfully", "success");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Unable to delete service",
        "error",
      );
    }
  };
  const handleclickeditfunc = (item) => {
    setAppointmentid(item.appointmentId);
    setEdited(true);
    setOpen1(true);
    setEditData(item);
    setStatuddropdown(item.mode);
    setNote(item.note || "");
    setDate(item.appointment_Date || "");
    setAppHospital({
      hospital_id: item.hospital_id,
      hospital_Name: item.hospital_Name,
    });
    if (item.mode === "offline") {
      setPickuptime(item.pickup_time || "");
      setDrivername(item.driver_name || "");
      setDrivercontact(item.driver_contact || "");
      setVehicalnumber(item.vehicle_no || "");
    } else {
      setPickuptime("");
      setDrivername("");
      setDrivercontact("");
      setVehicalnumber("");
    }
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  const handleRecommendChange = (e) => {
    setRecommend(e.target.value);
  };
  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleClose1editapp = () => {
    setOeditappp(false);
  };
  const handleclickeditdelete = async (item) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6e7881",
    });
    if (!result.isConfirmed) return;
    try {
      const response = await axios.delete(
        `${baseurl}delete_appointment/${item.appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data?.success) {
        getDataapi3(selectedTreatmentId);
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        Swal.fire(
          "Deleted!",
          response.data.message || "Appointment deleted successfully",
          "success",
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || "Unable to delete appointment",
        "error",
      );
    }
  };
  const handleExtraButton = async () => {
    try {
      const formattedDate = date
        ? new Date(date).toISOString().split("T")[0]
        : "";

      // 🔥 COMMON VALIDATION (for both)
      if (!hospitalData?.hospital_id) {
        return Swal.fire("Please select hospital", "", "warning");
      }

      if (!note) {
        return Swal.fire("Note is required", "", "warning");
      }

      if (!formattedDate) {
        return Swal.fire("Date is required", "", "warning");
      }

      if (!statuddropdown) {
        return Swal.fire("Mode is required", "", "warning");
      }

      // 🔥 OFFLINE VALIDATION
      if (statuddropdown === "offline") {
        if (!pickuptime) {
          return Swal.fire("Pickup time is required", "", "warning");
        }
        if (!drivername) {
          return Swal.fire("Driver name is required", "", "warning");
        }
      }

      // 🔥 ONLINE VALIDATION (if needed add more)
      if (statuddropdown === "online") {
        // example: you can enforce something extra here
        // if (!someField) return Swal.fire("Required", "", "warning");
      }

      const payload = {
        hospitalId: hospitalData.hospital_id,
        note: note,
        appointment_Date: formattedDate,
        mode: statuddropdown,
        ...(statuddropdown === "offline" && {
          pickup_time: pickuptime,
          driver_name: drivername,
          driver_contact: drivercontact,
          vehicle_no: vehicalnumber,
        }),
      };

      console.log(payload);

      const response = await axios.put(
        `${baseurl}edit_appointment/${appointmentid}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response?.data?.success) {
        Swal.fire("Appointment updated successfully!", "", "success");
        setOpen1(false);

        getDataapi3(selectedTreatmentId);
        dispatch(GetPatientTreatments({ id: location.state.patientId }));

        // reset
        setNote("");
        setDate("");
        setPickuptime("");
        setDrivername("");
        setDrivercontact("");
        setVehicalnumber("");
        setAppHospital(null);
        setEdited(false);
        setAppointErr(false);
      } else {
        Swal.fire("Update failed!", "", "error");
      }
    } catch (err) {
      Swal.fire(
        "Error!",
        err?.response?.data?.message || err?.message || "Something went wrong",
        "error",
      );
    }
  };
  const handleClicexportPayment = async (a, b) => {
    try {
      const response = await axios.get(`${baseurl}exportTreatmentExcel/${b}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "treatment-payments.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      Swal.fire("Success", "Excel downloaded successfully!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to download excel file", "error");
    }
  };
  const EditButton = (a, b) => {
    setTreatmentIDservice(b.treatment_id);
    setEditModalNotes(true);
    setNotesID(a._id);
    setNote2(a.note);
    setDate2(new Date(a.date).toISOString().split("T")[0]);
  };
  const handleCloseEditModal = () => {
    setEditModalNotes(false);
  };
  const editNotes = async () => {
    if (!note2 || !date2) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter note and date",
      });
      return;
    }
    const formData = new FormData();
    formData.append("note", note2);
    formData.append("date", date2);

    // 👉 append multiple images
    images.forEach((img) => {
      formData.append("treatmentNoteImages", img);
    });
    try {
      const response = await axios.put(
        `${baseurl}edit_treatment_note/${treatmentIDservice}/${notesID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        getDataapi3(treatmentIDservice);
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Note updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        handleCloseEditModal();
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: response.data.message || "Update failed",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again",
      });
    }
  };
  const EditDelete = async (a, b) => {
    const confirm = await Swal.fire({
      title: "Delete Note?",
      text: "Are You sure to delete this notes!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6e7881",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });
    if (!confirm.isConfirmed) return;
    try {
      const response = await axios.delete(
        `${baseurl}delete_treatment_note/${b.treatment_id}/${a._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Note deleted successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        getDataapi3(b.treatment_id);
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        handleCloseEditModal(); // or close delete modal if you have one
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: response.data.message || "Delete failed",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again",
      });
    }
  };
  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  const EditFreeDelete = async (a, b, c) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "This extra service will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6e7881",
      confirmButtonText: "Yes, delete it",
    });
    if (!confirmResult.isConfirmed) return;
    try {
      const response = await axios.delete(
        `${baseurl}delete_patient_extra_service/${b.treatment_id}/${c}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Extra service deleted successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
      } else {
        Swal.fire("Error", response.data.message || "Delete failed", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong!", "error");
    }
  };
  // ///////////////////////////////////////////////PlanTreatmentPopUp
  const PlanTreatmentPopUp = () => {
    setTreatmentPlanPopup(true);
  };
  const PlanTreatmentPopupClose = () => {
    setTreatmentPlanPopup(false);
  };
  const handleChangeDetails123 = (selectedCourse) => {
    if (!selectedCourse) return;
    const dataStore = selectedCourse.id;
    setHospitalFunction(dataStore);
  };
  const setHospitalFunction = async (dataStore) => {
    const payload = {
      treatment_id: dataStore,
    };
    try {
      const response = await axios.post(
        `${AdminBaseUrl}treatment_hospital_list`,
        payload,
      );
      if (response.data.success) {
        const hospitalData = response.data.data;
        const updatedList = [
          { _id: "all", name: "Select All" }, // 👈 YEH LINE ADD
          ...hospitalData,
        ];
        setHospitlID(updatedList);
      }
    } catch (error) {}
  };
  const validateForm = () => {
    const newErrors = {};
    if (!fieldValue) {
      newErrors.treatment = "Treatment is required";
    }

    if (!hospitalId || hospitalId.length === 0) {
      newErrors.hospitals = "Please select at least one hospital";
    }
    if (!images || images.length === 0) {
      newErrors.reports = "Please upload at least one report";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const uploadmultipleRecord = async () => {
    if (!validateForm()) return;
    const swalOnTop = Swal.mixin({
      customClass: {
        popup: "swal-on-top",
      },
      buttonsStyling: true,
    });
    const formData = new FormData();
    formData.append("patientObjectId", location.state.testid);
    formData.append("patientId", location.state.patientId);
    formData.append("treatment", JSON.stringify(fieldValue));
    formData.append("hospitals", JSON.stringify(hospitalId));
    formData.append("doctorReviewId", drreviewnotes);
    formData.append("platform", 1);
    formData.append("notes", value1 || "");
    images.forEach((file) => {
      formData.append("reports", file);
    });
    try {
      const response = await axios.post(
        `${baseurl}addTreatmentPlan`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response?.data?.success) {
        getTreatmentPlan();
        setTreatmentPlanPopup(false);
        await swalOnTop.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Treatment plan added successfully",
          confirmButtonText: "OK",
        });
        PlanTreatmentPopupClose();
        setFieldValue(null);
        setHospitalId([]);
        setValue1("");
        setImages([]);
      } else {
        await swalOnTop.fire(
          "Error",
          response?.data?.message || "Something went wrong",
          "error",
        );
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Server error occurred";
      await swalOnTop.fire("Error", errorMsg, "error");
    }
  };

  const handlechangeGdoc = (e) => {
    const selectedFiles = Array.from(e.target.files); // 👈 important
    setFiles(selectedFiles);
  };
  const handleAddTritmentPaymenttestsubmit = async () => {
    try {
      if (!dataPerforma) {
        Swal.fire({
          icon: "warning",
          title: "No File Selected",
          text: "Please select a Performa Invoice file first.",
        });
        return;
      }
      const formData = new FormData();
      formData.append("perfomainvoice", dataPerforma);
      const response = await axios.post(`${baseurl}performainvoice`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        setOpen32(false);
        Swal.fire({
          icon: "success",
          title: "Uploaded Successfully!",
          text: response?.data?.message || "Performa Invoice uploaded.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed!",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };
  const handledelteguestHouse = async (item, info, index) => {
    console.log(item, info, index);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const response = await axios.post(
          `${baseurl}deleteGuestHouseCharge/${item.id}`,
        );
        if (response?.data?.success) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: response.data.message || "Record deleted successfully",
          });
          patient_guesthouse(item.treatment_id); // ya jo bhi API tum use kar rahe ho refresh ke liye
          dispatch(GetPatientTreatments({ id: location.state.patientId }));
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response?.data?.message || "Something went wrong",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            error.response?.data?.message || "Server error, please try again",
        });
      }
    }
  };
  const AddpaymentOnchnage123 = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      Swal.fire("Only PDF or Image files are allowed!");
      e.target.value = null;
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      Swal.fire("File size must be less than 5MB");
      e.target.value = null;
      return;
    }
    setDataPerforma((prev) => ({
      ...prev,
      perfomainvoice: file,
    }));
  };
  const getDrreview = async () => {
    const payload = {
      patientId: location.state.patientId,
    };
    try {
      const response = await axios.get(
        `${baseurl}get_doctor_review/${location.state.patientId}`,
      );
      if (response.data.success) {
        console.log(response.data);
        setDoctorReviewData1(response.data.data);
      }
    } catch (error) {}
  };
  const getTreatmentPlan = async () => {
    const payload = {
      patientId: location.state.patientId,
    };
    try {
      const response = await axios.post(
        `${baseurl}getTreatmentPlans?patientId=${location.state.patientId}`,
      );
      if (response.data.success) {
        setTreatemntData1(response.data.data);
      }
    } catch (error) {}
  };
  const handleclickApprove = (hospitalids, b) => {};
  const approveReject = async (info, hospitalId, status) => {
    setDatainfo(info);
    setDataHospitalID(hospitalId);
    setDataStatus(status);
    setOpenModalDovPlan(true);
  };
  const apihitpost = async () => {
    try {
      if (!files || files.length === 0) {
        await Swal.fire({
          icon: "warning",
          title: "Document Required",
          text: "Please upload a document before submitting",
        });
        return;
      }

      const formData = new FormData();
      formData.append("status", dataStatus);

      files.forEach((file) => {
        formData.append("documents", file);
      });

      const response = await axios.put(
        `${baseurl}updateHospitalStatus/${datainfo._id}/${dataHospitalID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response?.data?.success) {
        await Swal.fire("Success", "Hospital approved successfully", "success");
        closemodaldocumnt();
        getTreatmentPlan();
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
      } else {
        await Swal.fire(
          "Error",
          response?.data?.message || "Status update failed",
          "error",
        );
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Server error occurred";

      await Swal.fire("Error", errorMsg, "error");
    }
  };

  const closemodaldocumnt = () => {
    setOpenModalDovPlan(false);
  };
  const handleclickEdAppointment = (a) => {
    navigate("/Admin/Edit-patient-treatment", {
      state: { data: a, patientid: location.state.patientId },
    });
  };
  const EditButtoneditprofile = (id) => {
    setEditPatientProfile(true);
  };
  const EditButtoneditprofileClose = () => {
    setEditPatientProfile(false);
  };
  const handleupdateProfile = async () => {
    if (!imagefile) {
      Swal.fire({
        icon: "warning",
        title: "No Image Selected",
        text: "Please select an image first.",
      });
      return;
    }
    const formData = new FormData();
    formData.append("patient_Profile", imagefile);
    try {
      const response = await axios.put(
        `${baseurl}update_patient/${location?.state?.patientId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Patient profile updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        EditButtoneditprofileClose();
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        setImagefile(null);
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: response?.data?.message || "Something went wrong",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: error?.response?.data?.message || "Something went wrong",
      });
    }
  };
  const handleclickAttandpDetails = async (id) => {
    setAttendId(id);
    // console.log(id);
    try {
      const response = await axios.get(`${baseurl}getAttendeeDetails/${id}`);
      setTreatmentNamePassport(response.data);
      if (response.data.success) {
        setPassportDetails(response.data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handkekeypreees = (e) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };
  const handledeedit = (a, b) => {
    console.log(a, b);
    setTreatmentChargeid(a.treatment_id);
    // console.log(a, b);
    setIsEditT(true);
    setHospitalCharge({
      id: b._id,
      service_name: b.service_name,
      price: b.price,
      date: b.date ? new Date(b.date).toISOString().split("T")[0] : "",
    });
    setOpenmodalCharge(true);
    // setDataImperial(true);
  };
  const dataIwemperial = () => {
    setDataImperial(false);
  };
  const handleNothospitalchargeesdata = async () => {
    const payload = {
      hospital_charge: noteHospital2,
    };
    try {
      const response = await axios.put(
        `${baseurl}updateHospitalCharge/${treatmentIDa?.treatment_id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data.success) {
        setDataImperial(false);
        setNoteHospital2("");
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Hospital charge updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };
  const getSelectedTreatmentInfo = () => {
    if (!selectedTreatmentId) return null;
    return tretment?.find((t) => t.treatment_id === selectedTreatmentId);
  };

  const handleMainTabChange = (tab) => {
    setMainTab(tab);
    localStorage.setItem("patientMainTab", tab);
    setSelectedTreatmentId(null);
    setActiveSubTab("details");
  };
  const handleAction = (e, type, info, d) => {
    console.log(e, type, info, d);
    const tId = info.treatment_id;
    const hDetails = info.hospital.details;
    setHospitalData({
      hospital_id: info.hospital.details.hospital_id,
      hospital_Name: info.hospital.details.hospital_Name,
      hospital_email: info.hospital.details.hospital_email,
    });
    const status = info.treatment_status;
    const treatmentName = info.treatment_name;

    setSelectedTreatmentId(tId);
    setTreatMentNAem(status);
    setTreatmentNameHeading(d);
    setTreatmentIdFilter(treatmentName);
    setHospitalDetails(hDetails);
    getDataapi3(tId);
    console.log(e, type, info, d);
    if (type === "attendant") {
      setActiveSubTab("attendant");
      handleclickAttandpDetails(tId);
    } else if (type === "payment") {
      setActiveSubTab("payment");
    } else if (type === "reports") {
      setActiveSubTab("reports");
    } else if (type === "hospital") {
      handleClickOpen(e, tId);
    } else if (type === "appointment") {
      setSelectedTreatmentId(tId);
      setActiveSubTab("appointment"); // modal (optional)
      // handleClickOpen1(e,tId,hDetails)
    } else if (type === "notes") {
      setActiveSubTab("notes"); // ✅ ADD THIS
      // modal (optional)
    } else if (type === "services") {
      penModal(info, tId);
    }
  };
  //   const handleAction = (e, type, info, d) => {
  //     console.log(e, type, info, d);
  //     const tId = info.treatment_id;
  //     const hDetails = info.Hospital_details;
  //     const status = info.treatment_status;
  //     const treatmentName = info.treatment_name;
  //     setSelectedTreatmentId(tId);
  //     setTreatMentNAem(status);
  //     setTreatmentNameHeading(d);
  //     setTreatmentIdFilter(treatmentName);
  //     console.log(tId);
  //     getDataapi3(tId);
  //     if (type === "attendant") {
  //       setActiveSubTab("attendant");
  //       handleclickAttandpDetails(tId);
  //     } else if (type === "payment") {
  //       setActiveSubTab("payment");
  //     } else if (type === "reports") {
  //       setActiveSubTab("reports");
  //     } else if (type === "hospital") {
  //       handleClickOpen(e, tId);
  //     } else if (type === "appointment") {
  //       handleClickOpen1(e,tId,hDetails)
  //     } else if (type === "notes") {
  //       handleClickOpenNotes(e, tId, hDetails);
  //     } else if (type === "services") {
  //       penModal(info, tId);
  //     }
  //   };
  const handleclickdeleteplan = async (item) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });
      if (result.isConfirmed) {
        const response = await axios.delete(
          `${baseurl}deleteTreatmentPlan/${item._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (response.data.success) {
          Swal.fire("Deleted!", "Plan deleted successfully.", "success");
          getTreatmentPlan();
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };
  const handleStatusChange = async (id, status) => {
    try {
      const response = await axios.post(
        `${baseurl}update_treatment_status/${id}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
        Swal.fire("Updated!", "Status changed successfully", "success");
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong", "error");
    }
  };
  const getallPayments = async () => {
    try {
      const patientId = location?.state?.patientId;
      const response = await axios.get(
        `${baseurl}getAllPaymentsByPatientId/${patientId}`,
      );
      // console.log(response.data);
    } catch (error) {
      // console.log(error);
    }
  };
  //   const getDataapi3 = async (tId) => {
  //     try {
  //       const treatmentid = selectedTreatmentId || tId;
  //       const response = await axios.get(
  //         `${baseurl}getAllTreatmentData/${location.state.patientId}/${treatmentid}`,
  //       );
  //       const data = response.data.data;
  //       const normalizedAttendants = data.attendants.map((att) => {
  //         let passport = att.attendant_passport;
  //         // normalize to array
  //         if (!passport) {
  //           passport = [];
  //         } else if (Array.isArray(passport)) {
  //           passport = passport;
  //         } else if (typeof passport === "string") {
  //           try {
  //             if (passport.startsWith("[")) {
  //               passport = JSON.parse(passport);
  //             } else {
  //               passport = [passport];
  //             }
  //           } catch {
  //             passport = [passport];
  //           }
  //         } else if (typeof passport === "object") {
  //           passport = [passport];
  //         }
  //         return {
  //           ...att,
  //           attendant_passport: passport,
  //         };
  //       });
  //       console.log(data)
  //       setAppointmentTabel(data.appointment)
  //       setPaymentsFilered(data.payment_details);
  //       setReportsFilered1(data.reports);
  //       setAttandantFilered(normalizedAttendants);
  //       setNotesTable(data.notes || []);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handleclickpharmacycharge = (info) => {
    console.log(info);
    setTreatmntidPharmacy(info.treatment_id);
    setOpenPharmacyModal(true);
    setPharmacyadd(false);
  };
  const deletepharmacy = async (info, index) => {
    console.log(info);

    // 🔥 Confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this pharmacy charge!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    // ❌ If user cancels → stop
    if (!result.isConfirmed) return;

    try {
      const response = await axios.delete(
        `${baseurl}deletePharmacyCharge/${info.treatment_id}`,
        {
          data: { index: index },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
      // ✅ Success Swal
      Swal.fire({
        title: "Deleted!",
        text: response?.data?.message || "Pharmacy charge deleted successfully",
        icon: "success",
      });

      // 🔄 Optional: refresh data
      // getPharmacyData();
    } catch (error) {
      console.log(error);

      // ❌ Error Swal
      Swal.fire({
        title: "Error!",
        text:
          error?.response?.data?.message ||
          "Failed to delete, please try again",
        icon: "error",
      });
    }
  };

  const getAllPaidTo = async () => {
    try {
      const response = await axios.get(`${baseurl}getAllPaidTo`);
      if (response.data.success) {
        console.log(response.data.data);
        setPaidTo(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleclickpcloseacycharge = () => {
    setOpenPharmacyModal(false);
    setOpenPharmacyModal(false);
    setPharmacyadd(false);
    setPharmacyvalue(false);
  };
  const getDataapi3 = async (tId) => {
    try {
      const response = await axios.get(
        `${baseurl}getAllTreatmentData/${location.state.patientId}/${tId}`,
      );
      const data = response.data.data;
      setDoctorReviewNotes(response.data.data);
      console.log("API DATA:", data);
      const filteredAppointments = (data.appointment || []).filter(
        (item) => item.treatment_id === tId,
      );
      const filteredNotes = (data.notes || []).filter(
        (item) => item.treatment_id === tId,
      );
      const filteredReports = (data.reports || []).filter(
        (item) => item.treatmentId === tId, // reports me yeh sahi hai
      );
      const filteredPayments = (data.payment_details || []).filter(
        (item) => item.treatment_id === tId,
      );
      const filteredAttendants = (data.attendants || []).filter(
        (item) => item.treatment_id === tId,
      );
      setAppointmentTabel(filteredAppointments);
      setNotesTable(filteredNotes);
      setReportsFilered1(filteredReports);
      setPaymentsFilered(filteredPayments);
      setAttandantFilered(filteredAttendants);
    } catch (error) {
      console.log(error);
    }
  };

 const handledeltePayment = async (a, b, c) => {
  console.log(a, b, c);
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You want to delete this payment!",
    icon: "warning",
    showCancelButton: true,
   confirmButtonColor: "#d33" ,
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });
  if (result.isConfirmed) {
    try {
      const response = await axios.delete(
        `${baseurl}delete_payment/${a.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
      Swal.fire(
        "Deleted!",
        response?.data?.message || "Payment deleted successfully",
        "success"
      );
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error!",
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  }
};
  const handleclickDeleteTreatment = async (treatment_id) => {
    console.log(treatment_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this treatment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6e7881",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${baseurl}deleteTreatment/${treatment_id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
          );
          if (response.data.success) {
            Swal.fire("Deleted!", response.data.message, "success");
            dispatch(GetPatientTreatments({ id: location.state.patientId }));
          } else {
            Swal.fire("Error!", response.data.message, "error");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Something went wrong", "error");
        }
      }
    });
  };
  const getAttemdeData = async () => {
    try {
      const response = await axios.get(
        `${baseurl}getAttendeeDetails/${location.state.patientId}`,
      );
      if (response.data.success) {
        setGetAttendeDetails(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleclickopencharge = (info) => {
    setTreatmentIdCharge(info.treatment_id);
    setOpenmodalCharge(true);
  };
  const handleclickclosecharge = () => {
    setIsEditT(false);
    setHospitalCharge("");
    setOpenmodalCharge(false);
  };
  const addhospitalChare = (e) => {
    const { name, value } = e.target;
    setHospitalCharge({ ...hospitalCharge, [name]: value });
  };
  const addchargeapiHedithspital = async () => {
    const payload = {
      charge_id: hospitalCharge.id,
      service_name: hospitalCharge.service_name,
      price: parseInt(hospitalCharge.price),
      date: hospitalCharge.date,
    };

    try {
      const response = await axios.put(
        `${baseurl}editHospitalServiceCharge/${treatmentChargeid}`,
        payload, // ✅ data goes here
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data);
      handleclickclosecharge();
      setTreatmentChargeid("");
      setHospitalCharge("");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
      // ✅ Success Swal
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Hospital charge Edit successfully!",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.log(error);

      // ❌ Error Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#d33",
      });
    }
  };
  // const addchargeapiHospital = async () => {
  //   const payload = {
  //     service_name: hospitalCharge.service_name,
  //     price: hospitalCharge.price,
  //     date: hospitalCharge.date,
  //   };

  //   try {
  //     const response = await axios.post(
  //       `${baseurl}addHospitalCharge/${treatmentIdCharge}`,
  //       payload, // ✅ data goes here
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       },
  //     );

  //     console.log(response.data);
  //     handleclickclosecharge();
  //     setHospitalCharge("");
  //     dispatch(GetPatientTreatments({ id: location.state.patientId }));
  //     // ✅ Success Swal
  //     Swal.fire({
  //       icon: "success",
  //       title: "Success",
  //       text: "Hospital charge added successfully!",
  //       confirmButtonColor: "#3085d6",
  //     });
  //   } catch (error) {
  //     console.log(error);

  //     // ❌ Error Swal
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: error?.response?.data?.message || "Something went wrong!",
  //       confirmButtonColor: "#d33",
  //     });
  //   }
  // };
  const addchargeapiHospital = async () => {
    // Convert price to number
    const priceValue = Number(hospitalCharge.price);

    // Validation
    if (!hospitalCharge.price || isNaN(priceValue) || priceValue <= 0) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Price must be greater than 0",
        confirmButtonColor: "#d33",
      });

      return; // रोक देगा API call
    }

    const payload = {
      service_name: hospitalCharge.service_name,
      price: priceValue,
      date: hospitalCharge.date,
    };

    try {
      const response = await axios.post(
        `${baseurl}addHospitalCharge/${treatmentIdCharge}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log(response.data);

      handleclickclosecharge();

      setHospitalCharge({
        service_name: "",
        price: "",
        date: "",
      });

      dispatch(
        GetPatientTreatments({
          id: location.state.patientId,
        }),
      );

      // Success Swal
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Hospital charge added successfully!",
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.log(error);

      // Error Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#d33",
      });
    }
  };
  const handledeedit123222 = async (info, index) => {
    console.log(info, index);

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this hospital charge!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3b3b3b",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await axios.delete(
        `${baseurl}deleteHospitalServiceCharge/${info.treatment_id}`,
        {
          data: {
            index: index, // ✅ IMPORTANT
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Hospital charge deleted successfully!",
        });

        // 🔥 refresh
        getDataapi3(info.treatment_id);
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    }
  };

  // pharmacy

  const addhosppharmacyhare = (e) => {
    const { name, value } = e.target;
    setPharmacyvalue({ ...pharmacyvalue, [name]: value });
  };

  const addchargeapipharmacy = async () => {
    // Convert price to number
    const priceValue = Number(pharmacyvalue.price);

    // Validation
    if (!pharmacyvalue.price || isNaN(priceValue) || priceValue <= 0) {
      Swal.fire({
        title: "Validation Error!",
        text: "Price must be greater than 0",
        icon: "error",
      });

      return; // Stop API call
    }

    const payload = {
      service_name: pharmacyvalue.service_name,
      price: priceValue,
      date: pharmacyvalue.date,
    };

    try {
      const response = await axios.post(
        `${baseurl}addPharmacyCharge/${treatmntidPharmacy}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      getDataapi3(treatmntidPharmacy);

      setPharmacyvalue({
        service_name: "",
        price: "",
        date: "",
      });

      dispatch(
        GetPatientTreatments({
          id: location.state.patientId,
        }),
      );

      handleclickpcloseacycharge();

      // Success
      Swal.fire({
        title: "Success!",
        text: response?.data?.message || "Charge added successfully",
        icon: "success",
      });
    } catch (error) {
      console.log(error);

      // Error
      Swal.fire({
        title: "Error!",
        text:
          error?.response?.data?.message ||
          "Something went wrong, please try again",
        icon: "error",
      });
    }
  };
  // const addchargeapipharmacy = async () => {
  //   const payload = {
  //     service_name: pharmacyvalue.service_name,
  //     price: pharmacyvalue.price,
  //     date: pharmacyvalue.date,
  //   };
  //   try {
  //     const response = await axios.post(
  //       `${baseurl}addPharmacyCharge/${treatmntidPharmacy}`,
  //       payload,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ token added
  //         },
  //       },
  //     );
  //     getDataapi3(treatmntidPharmacy);
  //     setPharmacyvalue("");
  //     dispatch(GetPatientTreatments({ id: location.state.patientId }));
  //     handleclickpcloseacycharge();
  //     // ✅ Success
  //     Swal.fire({
  //       title: "Success!",
  //       text: response?.data?.message || "Charge added successfully",
  //       icon: "success",
  //     });
  //   } catch (error) {
  //     console.log(error);

  //     // ❌ Error
  //     Swal.fire({
  //       title: "Error!",
  //       text:
  //         error?.response?.data?.message ||
  //         "Something went wrong, please try again",
  //       icon: "error",
  //     });
  //   }
  // };
  const handleeditpharmacycharge = (item, info) => {
    console.log(item, info);
    setTreatmntidPharmacy(info.treatment_id);
    setOpenPharmacyModal(true);
    setPharmacyadd(true);
    setPharmacyvalue({
      service_name: item.service_name,
      price: item.price,
      date: item.date ? item.date.split("T")[0] : "",
      _id: item._id,
    });
  };
  const editpaharmacy = async () => {
    const payload = {
      service_name: pharmacyvalue.service_name,
      price: parseInt(pharmacyvalue.price),
      date: pharmacyvalue.date, // ✅ already YYYY-MM-DD hona chahiye
      charge_id: pharmacyvalue._id,
    };
    try {
      const response = await axios.put(
        `${baseurl}editPharmacyCharge/${treatmntidPharmacy}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setPharmacyvalue("");
      setOpenPharmacyModal(false);
      setPharmacyadd(false);
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
      // ✅ Success Swal
      Swal.fire({
        title: "Success!",
        text: response?.data?.message || "Pharmacy updated successfully",
        icon: "success",
      });

      // 🔄 Optional: refresh data
      // getPharmacyData();
    } catch (error) {
      console.log(error);

      // ❌ Error Swal
      Swal.fire({
        title: "Error!",
        text:
          error?.response?.data?.message ||
          "Failed to update, please try again",
        icon: "error",
      });
    }
  };

  const handlechangeGuesthouse = (e) => {
    const { name, value, type, files } = e.target;

    setFormDataGuestHouse((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // const submitGuestHouseApi = async () => {
  //   try {
  //     const formData = new FormData();

  //     // ✅ append all fields
  //     formData.append("guestHouseName", iniData.guestHouseName || "");
  //     formData.append("dateRangeFrom", iniData.dateRangeFrom || "");
  //     formData.append("dateRangeTo", iniData.dateRangeTo || "");
  //     formData.append("numberOfRooms", hospitalCharge.numberOfRooms || "");
  //     formData.append("paymentAmount", hospitalCharge.paymentAmount || "");
  //     formData.append("paymentDate", iniData.paymentDate || "");
  //     formData.append("notes", iniData.notes || "");

  //     // ✅ file
  //     if (iniData.invoiceFile) {
  //       formData.append("invoiceFile", iniData.invoiceFile);
  //     }

  //     // 🔥 API call
  //     const response = await axios.post(
  //       `${baseurl}addGuestHouseCharge`,formData);

  //     // ✅ Success Swal
  //     if (response.data.success) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Success",
  //         text: response.data.message || "Data submitted successfully",
  //         confirmButtonColor: "#3085d6",
  //       });

  //       handleCloseguesthouse(); // modal close
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: response.data.message || "Something went wrong",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error);

  //     // ❌ Error Swal
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text:
  //         error.response?.data?.message ||
  //         "Server error. Please try again.",
  //     });
  //   }
  // };

  const handleClickGuesthuseedit = async () => {
    const data = formDataGuestHouse;
    console.log(data);
    // 🔥 Validation
    if (!data.guestHouseName?.trim()) {
      return Swal.fire("Error", "Guest House Name is required", "error");
    }

    if (!data.dateRangeFrom) {
      return Swal.fire("Error", "Date Range From is required", "error");
    }

    if (!data.dateRangeTo) {
      return Swal.fire("Error", "Date Range To is required", "error");
    }

    // ✅ Date logic
    if (new Date(data.dateRangeTo) < new Date(data.dateRangeFrom)) {
      return Swal.fire("Error", "End date must be after start date", "error");
    }

    if (!data.numberOfRooms) {
      return Swal.fire("Error", "Number of Rooms is required", "error");
    }

    if (!data.paymentAmount) {
      return Swal.fire("Error", "Payment Amount is required", "error");
    }

    if (!data.paymentDate) {
      return Swal.fire("Error", "Payment Date is required", "error");
    }

    if (!data.notes?.trim()) {
      return Swal.fire("Error", "Notes is required", "error");
    }

    try {
      const formData = new FormData();

      // ✅ normal fields
      Object.keys(data).forEach((key) => {
        if (
          key !== "invoiceFile" &&
          data[key] !== null &&
          data[key] !== undefined
        ) {
          formData.append(key, data[key]);
        }
      });

      // ✅ file only if selected
      if (data.invoiceFile instanceof File) {
        formData.append("invoiceFile", data.invoiceFile);
      }

      // ✅ extra params
      formData.append("treatment_id", treatmentIds1);
      formData.append("patientId", location.state.patientId);

      const response = await axios.post(
        `${baseurl}updateGuestHouseCharge/${data.id}`,
        formData,
      );

      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Data updated successfully",
        });

        patient_guesthouse(data.treatment_id);

        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        handleCloseguesthouse();
      } else {
        Swal.fire(
          "Error",
          response?.data?.message || "Something went wrong",
          "error",
        );
      }
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        error.response?.data?.message || "Server error",
        "error",
      );
    }
  };

  // const handleClickGuesthuseedit = async () => {
  //   const data = formDataGuestHouse;

  //   // 🔥 Validation
  //   if (!data.guestHouseName?.trim()) {
  //     return Swal.fire("Error", "Guest House Name is required", "error");
  //   }

  //   if (!data.dateRangeFrom) {
  //     return Swal.fire("Error", "Date Range From is required", "error");
  //   }

  //   if (!data.dateRangeTo) {
  //     return Swal.fire("Error", "Date Range To is required", "error");
  //   }

  //   // ✅ Date logic validation
  //   if (new Date(data.dateRangeTo) < new Date(data.dateRangeFrom)) {
  //     return Swal.fire("Error", "End date must be after start date", "error");
  //   }

  //   if (!data.numberOfRooms) {
  //     return Swal.fire("Error", "Number of Rooms is required", "error");
  //   }

  //   if (!data.paymentAmount) {
  //     return Swal.fire("Error", "Payment Amount is required", "error");
  //   }

  //   if (!data.paymentDate) {
  //     return Swal.fire("Error", "Payment Date is required", "error");
  //   }

  //   if (!data.notes?.trim()) {
  //     return Swal.fire("Error", "Notes is required", "error");
  //   }

  //   if (!data.invoiceFile) {
  //     return Swal.fire("Error", "Invoice File is required", "error");
  //   }

  //   try {
  //     const formData = new FormData();
  //     Object.keys(data).forEach((key) => {
  //       if (data[key] !== null && data[key] !== undefined) {
  //         formData.append(key, data[key]);
  //       }
  //     });
  //     formData.append("treatment_id", treatmentIds1);
  //     formData.append("patientId", location.state.patientId);

  //     const response = await axios.post(
  //       `${baseurl}updateGuestHouseCharge/${data.id}`,
  //       formData,
  //     );
  //     if (response?.data?.success) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Success",
  //         text: response.data.message || "Data Edite successfully",
  //       });
  //       patient_guesthouse(treatmentIds1);
  //       handleCloseguesthouse();
  //     } else {
  //       Swal.fire(
  //         "Error",
  //         response?.data?.message || "Something went wrong",
  //         "error",
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);

  //     Swal.fire(
  //       "Error",
  //       error.response?.data?.message || "Server error",
  //       "error",
  //     );
  //   }
  // };
  const submitGuestHouseApi = async () => {
    const data = formDataGuestHouse;

    // 🔥 Validation
    if (!data.guestHouseName?.trim()) {
      return Swal.fire("Error", "Guest House Name is required", "error");
    }

    if (!data.dateRangeFrom) {
      return Swal.fire("Error", "Date Range From is required", "error");
    }

    if (!data.dateRangeTo) {
      return Swal.fire("Error", "Date Range To is required", "error");
    }

    // ✅ Date logic validation
    if (new Date(data.dateRangeTo) < new Date(data.dateRangeFrom)) {
      return Swal.fire("Error", "End date must be after start date", "error");
    }

    if (!data.numberOfRooms) {
      return Swal.fire("Error", "Number of Rooms is required", "error");
    }

    if (!data.paymentAmount) {
      return Swal.fire("Error", "Payment Amount is required", "error");
    }

    if (!data.paymentDate) {
      return Swal.fire("Error", "Payment Date is required", "error");
    }

    if (!data.notes?.trim()) {
      return Swal.fire("Error", "Notes is required", "error");
    }

    if (!data.invoiceFile) {
      return Swal.fire("Error", "Invoice File is required", "error");
    }

    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });
      formData.append("treatment_id", treatmentIds1);
      formData.append("patientId", location.state.patientId);

      const response = await axios.post(
        `${baseurl}addGuestHouseCharge`,
        formData,
      );
      if (response?.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message || "Data submitted successfully",
        });
        patient_guesthouse(treatmentIds1);
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        handleCloseguesthouse();
      } else {
        Swal.fire(
          "Error",
          response?.data?.message || "Something went wrong",
          "error",
        );
      }
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        error.response?.data?.message || "Server error",
        "error",
      );
    }
  };

  const handleclickopenpopup = () => {
    setPopupopenattande(true);
  };
  const handlecliclosepup = () => {
    setPopupopenattande(false);
  };

  const handleassignAtendent = async () => {
    try {
      // 🔍 Validation
      if (!selectedAttendants || selectedAttendants.length === 0) {
        return Swal.fire({
          icon: "warning",
          title: "No Selection",
          text: "Please select at least one attendant!",
        });
      }
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to assign selected attendants?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, assign",
        cancelButtonText: "Cancel",
      });
      if (!result.isConfirmed) return;
      const payload = {
        AttendeeIds: selectedAttendants,
      };
      const response = await axios.post(
        `${baseurl}treatmentAssignAttendee/${selectedTreatmentId}`,
        payload,
      );
      handlecliclosepup();
      getDataapi3(selectedTreatmentId);
      // ✅ Success Swal
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Attendees assigned successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      // 🔄 Optional Reset
      setSelectedAttendants([]);
    } catch (error) {
      console.error(error);

      // ❌ Error Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!",
      });
    }
  };

  const handleEdit = (item) => {
    setFilesData(item);
    console.log(item);
    setOpen2(true);
    setAttendedeaisledit(true);
  };
  // const handleDelete=(item)=>{
  //   const response = await  axios.delete(`${baseurl}deleteTreatmentAttendee/${item._id}`)

  // }

  const handleDeletetrtrtrtr = async (item) => {
    try {
      // 🔔 Confirmation Popup
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this attendee?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete",
        cancelButtonText: "Cancel",
        cancelButtonColor: "#6e7881",
      });

      if (!result.isConfirmed) return;

      // 🚀 API Call
      await axios.delete(`${baseurl}deleteAttendee/${item?._id}`);

      // ✅ Success Swal
      getattendantnewai();
      //  dispatch(GetPatientTreatments({id:location.state.patientId}))  // 👈 call your API again
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Attendee deleted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(error);

      // ❌ Error Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong!",
      });
    }
  };

  const patient_guesthouse = async (treatmentId) => {
    try {
      const response = await axios.get(
        `${baseurl}getGuestHouseCharge/${location.state.patientId}/${treatmentId}`,
      );
      console.log(response.data.data);
      setGuestHouseBooking(response.data.data);
      setGuestHouseBookingobj(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-md-12">
              <h4 className="page-title">
                <span>
                  <i
                    className="fi fi-sr-angle-double-small-left"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.history.back();
                    }}
                  ></i>
                </span>
                Patient Details
              </h4>
            </div>
          </div>
          <div className="main_content">
            <div className="row gx-0 align-items-center">
              <div className="col-md-5">
                <div class="profile-sidebar">
                  <div class="top">
                    <form>
                      <div class="image-wrap">
                        <div class="part-img">
                          <img
                            src={
                              ispatient?.patient_Profile
                                ? `${image}${ispatient?.patient_Profile}`
                                : avtar
                            }
                            className="pro-img"
                            alt=""
                          />
                        </div>
                        <input
                          type="file"
                          class="form-control d-none"
                          name="profile_pic"
                        />
                        <label htmlFor="profileUpload" className="edit-icon">
                          <FaPen
                            size={12}
                            onClick={(e) =>
                              EditButtoneditprofile(location.state.patientId)
                            }
                          />
                        </label>
                      </div>
                    </form>
                    <div class="part-txt">
                      <h6>{ispatient?.patient_name}</h6>
                      <p>
                        Patient ID :{" "}
                        {ispatient?.patientNumber
                          ? ispatient?.patientNumber
                          : ispatient?.patientId}
                      </p>
                      {showModal && (
                        <div className="custom-modal">
                          <div className="modal-content">
                            {/* CLOSE BUTTON */}
                            <button
                              className="close-btn"
                              onClick={() => setShowModal(false)}
                            >
                              ✖
                            </button>

                            {/* PREV BUTTON */}
                            <button
                              onClick={() =>
                                setCurrentIndex((prev) =>
                                  prev === 0
                                    ? (kys?.[0]?.id_proof?.length || 1) - 1
                                    : prev - 1,
                                )
                              }
                            >
                              ⬅
                            </button>
                            {/* FILE VIEWER */}
                            {(() => {
                              const currentFile =
                                kys?.[0]?.id_proof?.[currentIndex];
                              const fileUrl = currentFile
                                ? `https://sisccltd.com/omca_crm/${currentFile}`
                                : "";
                              const isPdf = currentFile
                                ?.toLowerCase()
                                .endsWith(".pdf");
                              if (!currentFile) {
                                return <p>No file available</p>;
                              }
                              return isPdf ? (
                                <iframe
                                  src={fileUrl}
                                  title="PDF Viewer"
                                  width="400px"
                                  height="400px"
                                  style={{ border: "none" }}
                                />
                              ) : (
                                <img
                                  src={fileUrl}
                                  alt="Document"
                                  style={{
                                    width: "400px",
                                    height: "400px",
                                    objectFit: "contain",
                                  }}
                                />
                              );
                            })()}
                            <button
                              onClick={() =>
                                setCurrentIndex((prev) =>
                                  prev === (kys?.[0]?.id_proof?.length || 1) - 1
                                    ? 0
                                    : prev + 1,
                                )
                              }
                            >
                              ➡
                            </button>
                            {(() => {
                              const currentFile =
                                kys?.[0]?.id_proof?.[currentIndex];
                              const fileUrl = currentFile
                                ? `https://sisccltd.com/omca_crm/${currentFile}`
                                : "";
                              const isPdf = currentFile
                                ?.toLowerCase()
                                .endsWith(".pdf");
                              return (
                                isPdf && (
                                  <div style={{ marginTop: "10px" }}>
                                    <a
                                      href={fileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      Open PDF in new tab
                                    </a>
                                  </div>
                                )
                              );
                            })()}
                          </div>
                        </div>
                      )}
                      {kys?.[0]?.id_proof && kys[0].id_proof.length > 0 && (
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="viewbtn"
                            onClick={() => {
                              const files = kys[0]?.id_proof;

                              if (files && files.length > 0) {
                                setCurrentIndex(0);
                                setShowModal(true);
                              } else {
                                Swal.fire(
                                  "Error",
                                  "Document not available",
                                  "error",
                                );
                              }
                            }}
                          >
                            View Patient ID
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-7 patinfomain">
                <div className="user-info-main">
                  {ispatient?.contact_no && (
                    <p>
                      <i className="fa-solid fa-phone"></i>
                      <span>
                        {ispatient.phoneCode} {ispatient.contact_no}
                      </span>
                    </p>
                  )}
                  <p>
                    <i class="fa-solid fa-phone"></i>
                    <span>
                      {ispatient.phoneCode} {ispatient?.emergency_contact_no}
                    </span>
                  </p>
                  <p>
                    <i class="fa-solid fa-envelope"></i>
                    <span>{ispatient?.email}</span>
                  </p>
                  <p>
                    Gender:<span>{ispatient?.gender}</span>
                  </p>
                  <p>
                    Age:<span>{ispatient?.age}</span>
                  </p>
                </div>
                <div className="user-info-main">
                  <p>
                    <i class="fa-solid fa-house-user"></i>
                    <span>{ispatient?.address}</span>
                  </p>
                  <p>
                    Town:<span>{ispatient?.town}</span>
                  </p>
                  <p>
                    Country:<span>{ispatient?.country}</span>
                  </p>
                  <p>
                    Patient-Status:<span>{ispatient?.patient_status}</span>
                  </p>
                  <p>
                    Passport Number:<span>{ispatient?.passport_num}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="patient-tabs">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  className={`nav-link ${mainTab === "Doctor-Review" ? "active" : ""}`}
                  href="#about-cont126"
                  data-toggle="tab"
                  onClick={() => handleMainTabChange("Doctor-Review")}
                >
                  Doctor Review{" "}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${mainTab === "treatment-plans" ? "active" : ""}`}
                  href="#about-cont123"
                  data-toggle="tab"
                  onClick={() => handleMainTabChange("treatment-plans")}
                >
                  Treatment Plans{" "}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${mainTab === "treatment" ? "active" : ""}`}
                  href="#about-cont"
                  data-toggle="tab"
                  onClick={() => handleMainTabChange("treatment")}
                >
                  Treatment{" "}
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${mainTab === "Attende" ? "active" : ""}`}
                  href="#attendecontent"
                  data-toggle="tab"
                  onClick={() => handleMainTabChange("Attende")}
                >
                  Attendants
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${mainTab === "Patient_Enquiry" ? "active" : ""}`}
                  href="#attendecontent"
                  data-toggle="tab"
                  onClick={() => handleMainTabChange("Patient_Enquiry")}
                >
                  Patient Enquiry
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div
                className={`tab-pane ${mainTab === "Doctor-Review" ? "show active" : ""} mt-5`}
                id="about-cont126"
              >
                <div className="row gx-3 gy-3">
                  <div className="col-md-12">
                    {doctorReviewData1?.length === 0 ? (
                      <p className="text-center">
                        No Doctor Review for this patients
                      </p>
                    ) : (
                      <>
                        {doctorReviewData1?.map((info, index) => {
                          return (
                            <div className="card-box" key={index}>
                              <div className="treatment-header">
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <h5>Doctor Reviews</h5>
                                  </div>
                                </div>
                              </div>
                              <div className="treatment-body">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="">
                                      <h5>Recommendations</h5>
                                      <div>
                                        <span className="hospital-name">
                                          {info?.Recommendations}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="">
                                      <h5>Reports</h5>
                                      {info?.images?.length > 0 ? (
                                        info?.images?.map((report, index) => (
                                          <div key={index}>
                                            <a
                                              href={`${baseu11}/${report}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="report-link"
                                            >
                                              View
                                            </a>
                                          </div>
                                        ))
                                      ) : (
                                        <span className="text-muted">
                                          No Reports
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="">
                                      <h5>Notes</h5>
                                      <p className="notes-text">
                                        {info?.review_notes || "No Notes Added"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="row">
                                    {info.comments &&
                                      info.comments.length > 0 && (
                                        <div className="col-md-12">
                                          <div
                                            className="accordion"
                                            id={`commentsAccordion${index}`}
                                          >
                                            <div className="accordion-item border-0">
                                              <h2
                                                className="accordion-header"
                                                id={`commentsHeading${index}`}
                                              >
                                                <button
                                                  className="accordion-button customstylecard collapsed"
                                                  type="button"
                                                  data-bs-toggle="collapse"
                                                  data-bs-target={`#commentsCollapse${index}`}
                                                  aria-expanded="false"
                                                  aria-controls={`commentsCollapse${index}`}
                                                >
                                                  <span>Comments</span>
                                                </button>
                                              </h2>
                                              <div
                                                id={`commentsCollapse${index}`}
                                                className="accordion-collapse collapse "
                                                aria-labelledby={`commentsHeading${index}`}
                                                data-bs-parent={`#commentsAccordion${index}`}
                                              >
                                                <div className="accordion-body p-0 pt-3">
                                                  <div className="row gy-3">
                                                    {info.comments.map(
                                                      (
                                                        comment,
                                                        commentIndex,
                                                      ) => (
                                                        <div
                                                          className="col-md-12"
                                                          key={
                                                            comment._id ||
                                                            commentIndex
                                                          }
                                                        >
                                                          <div className="card customstylecard">
                                                            <div className="card-body">
                                                              <div className="note-view">
                                                                <h3 className="card-title">
                                                                  {
                                                                    comment.user_type
                                                                  }{" "}
                                                                  Note
                                                                </h3>
                                                              </div>

                                                              <div className="experience-box">
                                                                <ul className="experience-list">
                                                                  <li className="mb-0">
                                                                    <div className="experience-user">
                                                                      <div className="before-circle"></div>
                                                                    </div>

                                                                    <div className="experience-content">
                                                                      <div className="timeline-content">
                                                                        <a
                                                                          href="#/"
                                                                          className="name"
                                                                        >
                                                                          {
                                                                            comment.Notes
                                                                          }
                                                                        </a>

                                                                        {/* Images */}
                                                                        {comment.images &&
                                                                          comment
                                                                            .images
                                                                            .length >
                                                                            0 && (
                                                                            <div className="mt-2 mb-2">
                                                                              {comment.images.map(
                                                                                (
                                                                                  img,
                                                                                  imgIndex,
                                                                                ) => {
                                                                                  const fullUrl =
                                                                                    img.startsWith(
                                                                                      "http",
                                                                                    )
                                                                                      ? img
                                                                                      : image +
                                                                                        img;

                                                                                  return (
                                                                                    <button
                                                                                      key={
                                                                                        imgIndex
                                                                                      }
                                                                                      type="button"
                                                                                      className="viewbtn btn-sm me-2"
                                                                                      onClick={() =>
                                                                                        window.open(
                                                                                          fullUrl,
                                                                                          "_blank",
                                                                                        )
                                                                                      }
                                                                                    >
                                                                                      View
                                                                                      Document{" "}
                                                                                      {imgIndex +
                                                                                        1}
                                                                                    </button>
                                                                                  );
                                                                                },
                                                                              )}
                                                                            </div>
                                                                          )}

                                                                        <div>
                                                                          Date -{" "}
                                                                          {comment.Date
                                                                            ? new Date(
                                                                                comment.Date,
                                                                              ).toLocaleDateString(
                                                                                "en-GB",
                                                                              )
                                                                            : new Date(
                                                                                comment.createdAt,
                                                                              ).toLocaleDateString(
                                                                                "en-GB",
                                                                              )}
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </li>
                                                                </ul>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      ),
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane ${mainTab === "treatment-plans" ? "show active" : ""}`}
                id="about-cont123"
              >
                <div className="main-tab-hd justify-content-end">
                  <div className="">
                    <button onClick={PlanTreatmentPopUp} className="add-button">
                      <span>
                        <i className="fa fa-plus"></i>
                      </span>{" "}
                      Add Treatment Plan
                    </button>
                  </div>
                </div>
                <div className="row gx-3 gy-3">
                  <div className="col-md-12">
                    {treatemntData1?.length === 0 ? (
                      <p className="text-center">
                        No Treatment Plan Added for this patients
                      </p>
                    ) : (
                      <>
                        {treatemntData1?.map((info, index) => {
                          // console.log(info, "array data");
                          return (
                            <div className="card-box" key={index}>
                              <div className="treatment-header">
                                <div className="d-flex justify-content-between">
                                  <div>
                                    <h5>{info?.treatment?.name}</h5>
                                  </div>
                                  <div>
                                    <i
                                      onClick={() => {
                                        handleclickdeleteplan(info);
                                      }}
                                      className="fa fa-trash text-danger me-2"
                                    ></i>
                                  </div>
                                </div>
                              </div>
                              <div className="treatment-body">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="">
                                      <h5>Hospital</h5>
                                      {info?.hospitals?.map((item, i) => (
                                        <div className="hospital-row" key={i}>
                                          <div>
                                            <span className="hospital-name">
                                              {item.name}
                                            </span>
                                            {info.isAnyHospitalApproved !==
                                              false && (
                                              <span
                                                className={`status-badge ${item.status === "Approved" ? "approved" : "pending"}`}
                                              >
                                                {item.status}
                                              </span>
                                            )}
                                          </div>
                                          {info.isAnyHospitalApproved !==
                                            true && (
                                            <button
                                              className="add-button"
                                              onClick={() =>
                                                approveReject(
                                                  info,
                                                  item.id,
                                                  "Approved",
                                                )
                                              }
                                            >
                                              Approve
                                            </button>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="">
                                      <h5>Reports</h5>
                                      {info?.reports?.length > 0 ? (
                                        info?.reports?.map((report, index) => (
                                          <div key={index}>
                                            <a
                                              href={`${image}${report.fileName}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="report-link"
                                            >
                                              View
                                            </a>
                                          </div>
                                        ))
                                      ) : (
                                        <span className="text-muted">
                                          No Reports
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="">
                                      <h5>Notes</h5>
                                      <p className="notes-text">
                                        {info?.notes || "No Notes Added"}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {info?.documents?.length > 0 ? (
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="treat-hd mb-3">
                                        <h6>Treatment plan</h6>
                                        <span className="line"></span>
                                      </div>
                                      <div className="">
                                        {info.documents.map((doc, index) => (
                                          <span key={index}>
                                            <button
                                              className="viewbtn me-2"
                                              onClick={() =>
                                                window.open(
                                                  `${imageUrl}/${doc.file}`,
                                                  "_blank",
                                                )
                                              }
                                            >
                                              View
                                            </button>
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <span></span>
                                )}
                                {info?.doctorReview?.review_notes ? (
                                  <>
                                    <div className="row mb-3">
                                      <div className="col-md-12">
                                        <div className="treat-hd my-3">
                                          <h6>Doctor Review</h6>
                                          <span className="line"></span>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="">
                                          <h5>Recommendation</h5>
                                          <p>
                                            {info?.doctorReview?.review_notes}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="">
                                          <h5>Notes</h5>
                                          <p>
                                            {
                                              info?.doctorReview
                                                ?.Recommendations
                                            }
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="">
                                          <h5>Documentation</h5>
                                          {info?.doctorReview?.images?.length >
                                          0 ? (
                                            <button
                                              className="viewbtn"
                                              onClick={() =>
                                                window.open(
                                                  `
                                                        ${imageUrl}/${info.doctorReview.images[0]}`,
                                                  "_blank",
                                                )
                                              }
                                            >
                                              View
                                            </button>
                                          ) : (
                                            <span></span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row">
                                      {info?.doctorReview?.comments &&
                                        info?.doctorReview?.comments.length >
                                          0 && (
                                          <div className="col-md-12">
                                            {/* Accordion */}
                                            <div
                                              className="accordion"
                                              id={`doctorCommentsAccordion${index}`}
                                            >
                                              <div className="accordion-item border-0">
                                                {/* Header */}
                                                <h2
                                                  className="accordion-header"
                                                  id={`doctorCommentsHeading${index}`}
                                                >
                                                  <button
                                                    className="accordion-button collapsed customstylecard"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#doctorCommentsCollapse${index}`}
                                                    aria-expanded="false"
                                                    aria-controls={`doctorCommentsCollapse${index}`}
                                                  >
                                                    <div className="d-flex align-items-center gap-2">
                                                      <span>Comments</span>
                                                    </div>
                                                  </button>
                                                </h2>

                                                {/* Body */}
                                                <div
                                                  id={`doctorCommentsCollapse${index}`}
                                                  className="accordion-collapse collapse"
                                                  aria-labelledby={`doctorCommentsHeading${index}`}
                                                  data-bs-parent={`#doctorCommentsAccordion${index}`}
                                                >
                                                  <div className="accordion-body p-0 pt-3">
                                                    <div className="row gy-3">
                                                      {info?.doctorReview?.comments.map(
                                                        (
                                                          comment,
                                                          commentIndex,
                                                        ) => (
                                                          <div
                                                            className="col-md-12"
                                                            key={
                                                              comment._id ||
                                                              commentIndex
                                                            }
                                                          >
                                                            <div className="card customstylecard">
                                                              <div className="card-body">
                                                                <div className="note-view">
                                                                  <h3 className="card-title">
                                                                    {
                                                                      comment.user_type
                                                                    }{" "}
                                                                    Note
                                                                  </h3>
                                                                </div>

                                                                <div className="experience-box">
                                                                  <ul className="experience-list">
                                                                    <li className="mb-0">
                                                                      <div className="experience-user">
                                                                        <div className="before-circle"></div>
                                                                      </div>

                                                                      <div className="experience-content">
                                                                        <div className="timeline-content">
                                                                          <a
                                                                            href="#/"
                                                                            className="name"
                                                                          >
                                                                            {
                                                                              comment.Notes
                                                                            }
                                                                          </a>

                                                                          {/* Images */}
                                                                          {comment.images &&
                                                                            comment
                                                                              .images
                                                                              .length >
                                                                              0 && (
                                                                              <div className="mt-2 mb-2">
                                                                                {comment.images.map(
                                                                                  (
                                                                                    img,
                                                                                    imgIndex,
                                                                                  ) => {
                                                                                    const fullUrl =
                                                                                      img.startsWith(
                                                                                        "http",
                                                                                      )
                                                                                        ? img
                                                                                        : image +
                                                                                          img;

                                                                                    return (
                                                                                      <button
                                                                                        key={
                                                                                          imgIndex
                                                                                        }
                                                                                        type="button"
                                                                                        className="viewbtn btn-sm me-2"
                                                                                        onClick={() =>
                                                                                          window.open(
                                                                                            fullUrl,
                                                                                            "_blank",
                                                                                          )
                                                                                        }
                                                                                      >
                                                                                        View
                                                                                        Document{" "}
                                                                                        {imgIndex +
                                                                                          1}
                                                                                      </button>
                                                                                    );
                                                                                  },
                                                                                )}
                                                                              </div>
                                                                            )}

                                                                          <div>
                                                                            Date
                                                                            -{" "}
                                                                            {comment.Date
                                                                              ? new Date(
                                                                                  comment.Date,
                                                                                ).toLocaleDateString(
                                                                                  "en-GB",
                                                                                )
                                                                              : new Date(
                                                                                  comment.createdAt,
                                                                                ).toLocaleDateString(
                                                                                  "en-GB",
                                                                                )}
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </li>
                                                                  </ul>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        ),
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                    </div>
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane ${mainTab === "treatment" ? "show active" : ""}`}
                id="about-cont"
              >
                <div className="main-tab-hd d-flex justify-content-end w-100">
                  <button onClick={PatientDetailButton} className="add-button">
                    <span>
                      <i className="fa fa-plus"></i>
                    </span>{" "}
                    Add Treatment
                  </button>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {tretment?.length === 0 ? (
                      <p className="text-center">
                        No Treatment Added for this patients
                      </p>
                    ) : (
                      <>
                        {([
                          "payment",
                          "reports",
                          "attendant",
                          "appointment",
                          "notes",
                        ].includes(activeSubTab)
                          ? tretment?.filter(
                              (item) =>
                                item.treatment_id === selectedTreatmentId,
                            )
                          : tretment
                        )?.map((info, index) => {
                          return (
                            <div className="card-box" id="accordion">
                              <div className="treat-card">
                                <div className="sectabmain">
                                  <div className="treat-id">
                                    <div className="mngetreatment">
                                      <h3
                                        onClick={() => {
                                          setActiveSubTab("details");
                                          setSelectedTreatmentId(
                                            info.treatment_id,
                                          );
                                        }}
                                        style={{
                                          cursor: "pointer",
                                          margin: 0,
                                        }}
                                      >
                                        {activeSubTab === "details"
                                          ? info.treatment_name
                                          : treatmentIdFilter === ""
                                            ? info.treatment_name
                                            : treatmentNameHeading}{" "}
                                      </h3>
                                      <div className="action-icon">
                                        <i
                                          className="fa-solid fa-trash"
                                          onClick={() => {
                                            handleclickDeleteTreatment(
                                              info.treatment_id,
                                            );
                                          }}
                                        ></i>
                                      </div>
                                    </div>
                                    <select
                                      className="form-select form-select-sm"
                                      value={getMappedStatus(
                                        info.treatment_status,
                                      )}
                                      onChange={(e) =>
                                        handleStatusChange(
                                          info.treatment_id,
                                          e.target.value,
                                        )
                                      }
                                    >
                                      <option value="">Select Status</option>
                                      <option value="Assigned to Hospital">
                                        Assigned to Hospital
                                      </option>
                                      <option value="In Process">
                                        In Process
                                      </option>
                                      <option value="Completed">
                                        Completed
                                      </option>
                                      <option value="Cancelled">
                                        Cancelled
                                      </option>
                                    </select>
                                  </div>
                                  <div className="accor-icon">
                                    <div className="">
                                      <ul className="nav nav-tabs treat-tabs">
                                        <li className="nav-item">
                                          <button
                                            className={`nav-link ${activeSubTab === "attendant" && selectedTreatmentId === info.treatment_id ? "active" : ""}`}
                                            onClick={(e) => {
                                              handleAction(
                                                e,
                                                "attendant",
                                                info,
                                                info.treatment_name,
                                              );
                                            }}
                                          >
                                            Assign Attendant
                                          </button>
                                        </li>
                                        <li className="nav-item">
                                          <button
                                            className={`nav-link ${activeSubTab === "payment" && selectedTreatmentId === info.treatment_id ? "active" : ""}`}
                                            onClick={(e) => {
                                              handleAction(
                                                e,
                                                "payment",
                                                info,
                                                info.treatment_name,
                                              );
                                            }}
                                          >
                                            Payment Details
                                          </button>
                                        </li>
                                        <li className="nav-item">
                                          <button
                                            className={`nav-link ${activeSubTab === "reports" && selectedTreatmentId === info.treatment_id ? "active" : ""}`}
                                            onClick={(e) => {
                                              handleAction(
                                                e,
                                                "reports",
                                                info,
                                                info.treatment_name,
                                              );
                                            }}
                                          >
                                            Reports
                                          </button>
                                        </li>

                                        <li className="nav-item">
                                          <button
                                            className="nav-link"
                                            onClick={(e) =>
                                              handleAction(
                                                e,
                                                "appointment",
                                                info,
                                                info.treatment_name,
                                              )
                                            }
                                          >
                                            Appointment
                                          </button>
                                        </li>
                                        <li className="nav-item">
                                          <button
                                            className="nav-link"
                                            onClick={(e) =>
                                              handleAction(
                                                e,
                                                "notes",
                                                info,
                                                info.treatment_name,
                                              )
                                            }
                                          >
                                            Notes
                                          </button>
                                        </li>
                                        {!info?.hospital?.details
                                          ?.hospital_Name && (
                                          <li className="nav-item">
                                            <button
                                              className="nav-link"
                                              onClick={(e) =>
                                                handleAction(
                                                  e,
                                                  "hospital",
                                                  info,
                                                  info.treatment_name,
                                                )
                                              }
                                            >
                                              + Add Hospital
                                            </button>
                                          </li>
                                        )}
                                      </ul>
                                    </div>
                                    <div
                                      className={`collapse-icon ${openIndex === index ? "rotate" : ""}`}
                                      onClick={() => {
                                        const isOpening = openIndex !== index;
                                        setOpenIndex(isOpening ? index : null);
                                        if (isOpening) {
                                          patient_guesthouse(info.treatment_id);
                                        }
                                      }}
                                      aria-expanded={openIndex === index}
                                    >
                                      <i className="fa-solid fa-chevron-down"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className={`collapse ${openIndex === index ? "show" : ""}`}
                              >
                                {activeSubTab === "details" ? (
                                  <>
                                    <div className="row gx-3 gy-3">
                                      {/* for hospital separate data */}
                                      <div className="col-md-12">
                                        <div
                                          className="card customstylecard"
                                          style={{
                                            border: "1px solid #0ba6df",
                                          }}
                                        >
                                          <div
                                            className="card-header d-flex justify-content-between align-items-center"
                                            style={{
                                              backgroundColor: "#E8F8FD",
                                              borderBottom: "1px solid #0ba6df",
                                            }}
                                          >
                                            <div className="d-flex gap-2 align-items-center">
                                              <h6>
                                                Hospital Name:{" "}
                                                {
                                                  info?.hospital?.details
                                                    ?.hospital_Name
                                                }
                                              </h6>
                                              <div className="action-icon">
                                                {info?.hospital?.details
                                                  ?.hospital_Name &&
                                                  info?.hospital?.charges
                                                    ?.length === 0 && (
                                                    <i
                                                      className="fa-solid fa-trash"
                                                      onClick={() =>
                                                        handledelete(info)
                                                      }
                                                    ></i>
                                                  )}
                                              </div>
                                            </div>
                                            {hospitalStatuses.includes(
                                              info?.treatment_status,
                                            ) && (
                                              <h6>
                                                Status: {info?.treatment_status}
                                              </h6>
                                            )}
                                            <div className="">
                                              <a
                                                href="!#"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  handleDownloadPDF(
                                                    hospitalRef,
                                                    "hospital.pdf",
                                                  );
                                                }}
                                              >
                                                <i className="fa-solid fa-download"></i>
                                              </a>
                                            </div>
                                          </div>
                                          <div className="card-body">
                                            <div ref={hospitalRef}>
                                              <div className="row gx-3 gy-3">
                                                <div className="col-md-6">
                                                  <div className="card patientreat">
                                                    <div className="card-header service-list">
                                                      <h6>Treatment</h6>
                                                    </div>
                                                    <div className="card-body">
                                                      <div className="table-responsive table-no-card">
                                                        <table className="table-card w-100">
                                                          <thead>
                                                            <tr>
                                                              <th>Name</th>
                                                              <th>Charge</th>
                                                              <th>Date</th>
                                                              <th>Time</th>
                                                              <th className="action-col pdf-hide">
                                                                Action
                                                              </th>
                                                            </tr>
                                                          </thead>
                                                          <tbody>
                                                            <tr key={index}>
                                                              <td>
                                                                {info?.treatment_name ||
                                                                  "-"}
                                                              </td>
                                                              <td>
                                                                $
                                                                {info?.treatment_course_fee ||
                                                                  "-"}
                                                              </td>
                                                              <td>
                                                                {new Date(
                                                                  info.treatment_created_at,
                                                                ).toLocaleDateString(
                                                                  "en-GB",
                                                                )}
                                                              </td>
                                                              <td>
                                                                {info.treatment_created_at
                                                                  ? new Date(
                                                                      info.treatment_created_at,
                                                                    ).toLocaleTimeString(
                                                                      "en-US",
                                                                      {
                                                                        hour: "2-digit",
                                                                        minute:
                                                                          "2-digit",
                                                                      },
                                                                    )
                                                                  : "-"}
                                                              </td>
                                                              <td className="pdf-hide">
                                                                <div className="action-icon">
                                                                  <i
                                                                    className="fa-solid fa-pen-to-square me-2"
                                                                    style={{
                                                                      cursor:
                                                                        "pointer",
                                                                    }}
                                                                    onClick={() => {
                                                                      handleclickEdAppointment(
                                                                        info,
                                                                      );
                                                                    }}
                                                                  ></i>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-md-6">
                                                  <div className="card patientreat">
                                                    <div className="card-header service-list d-flex justify-content-between">
                                                      <div>
                                                        <h6>
                                                          Hospital Charges
                                                        </h6>
                                                      </div>
                                                      <div className="pdf-hide">
                                                        <button
                                                          className="add-button"
                                                          onClick={() => {
                                                            handleclickopencharge(
                                                              info,
                                                            );
                                                          }}
                                                        >
                                                          Add Charge
                                                        </button>
                                                      </div>
                                                    </div>
                                                    <div className="card-body">
                                                      <div className="table-responsive table-no-card">
                                                        <table className="table-card w-100">
                                                          <thead>
                                                            <tr>
                                                              <th>
                                                                Service Name
                                                              </th>
                                                              <th>Price</th>
                                                              <th>Date</th>
                                                              <th className="action-col pdf-hide">
                                                                Action
                                                              </th>
                                                            </tr>
                                                          </thead>
                                                          <tbody>
                                                            {info?.hospital
                                                              ?.charges
                                                              ?.length > 0 ? (
                                                              info?.hospital?.charges?.map(
                                                                (
                                                                  item,
                                                                  index,
                                                                ) => {
                                                                  const createdAt =
                                                                    item?.date;

                                                                  return (
                                                                    <tr
                                                                      key={
                                                                        index
                                                                      }
                                                                    >
                                                                      <td>
                                                                        {item?.service_name ||
                                                                          "-"}
                                                                      </td>
                                                                      <td>
                                                                        $
                                                                        {item?.price ||
                                                                          "-"}
                                                                      </td>
                                                                      <td>
                                                                        {createdAt
                                                                          ? new Date(
                                                                              createdAt,
                                                                            ).toLocaleDateString(
                                                                              "en-GB",
                                                                            )
                                                                          : "-"}
                                                                      </td>
                                                                      <td className="pdf-hide">
                                                                        <div className="action-icon">
                                                                          <i
                                                                            className="fa-solid fa-pen-to-square me-2"
                                                                            style={{
                                                                              cursor:
                                                                                "pointer",
                                                                            }}
                                                                            onClick={() =>
                                                                              handledeedit(
                                                                                info,
                                                                                item,
                                                                              )
                                                                            }
                                                                          ></i>

                                                                          <i
                                                                            className="fa-solid fa-trash"
                                                                            style={{
                                                                              cursor:
                                                                                "pointer",
                                                                            }}
                                                                            onClick={() =>
                                                                              handledeedit123222(
                                                                                info,
                                                                                index,
                                                                              )
                                                                            }
                                                                          ></i>
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  );
                                                                },
                                                              )
                                                            ) : (
                                                              <tr>
                                                                <td
                                                                  colSpan="4"
                                                                  style={{
                                                                    textAlign:
                                                                      "center",
                                                                  }}
                                                                >
                                                                  No Data Found
                                                                </td>
                                                              </tr>
                                                            )}
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-md-12">
                                                  <div className="total-amount">
                                                    <h6 className="mb-0">
                                                      Total Amount:
                                                    </h6>
                                                    <p>
                                                      $
                                                      {
                                                        info?.hospital
                                                          ?.totalAmount
                                                      }
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="col-md-12">
                                                  <div className="card patientreat">
                                                    <div className="card-header service-list">
                                                      <h6>Payment</h6>
                                                    </div>
                                                    <div className="card-body">
                                                      <div className="table-responsive table-no-card">
                                                        <table className="table-card w-100">
                                                          <thead>
                                                            <tr>
                                                              <th>
                                                                Payment Amount
                                                              </th>
                                                              <th>
                                                                Payment Date
                                                              </th>
                                                              <th>
                                                                Payment Method
                                                              </th>
                                                              <th>Notes</th>
                                                              <th>Paid To</th>
                                                              <th>Paid For</th>
                                                              <th>Document</th>
                                                              <th>Pdf</th>
                                                              <th>Action</th>
                                                            </tr>
                                                          </thead>
                                                          <tbody>
                                                            {info?.hospital
                                                              ?.payments &&
                                                            info?.hospital
                                                              ?.payments
                                                              .length > 0 ? (
                                                              info?.hospital?.payments.map(
                                                                (
                                                                  item,
                                                                  index,
                                                                ) => {
                                                                  return (
                                                                    <tr
                                                                      key={
                                                                        item.id
                                                                      }
                                                                    >
                                                                      <td>
                                                                        $
                                                                        {
                                                                          item?.paid_amount
                                                                        }
                                                                      </td>

                                                                      <td>
                                                                        {new Date(
                                                                          item.payment_Date,
                                                                        ).toLocaleDateString(
                                                                          "en-GB",
                                                                        )}
                                                                      </td>
                                                                      <td>
                                                                        {
                                                                          item.paymentMethod
                                                                        }
                                                                      </td>
                                                                      <td>
                                                                        {item.notes ||
                                                                          "-"}
                                                                      </td>
                                                                      <td>
                                                                        {item
                                                                          .paid_to
                                                                          .name ||
                                                                          "-"}
                                                                      </td>
                                                                      <td>
                                                                        {item
                                                                          .paid_for
                                                                          .name ||
                                                                          "-"}
                                                                      </td>

                                                                      <td>
                                                                        {item?.attachFile ? (
                                                                          <button
                                                                            className="btn btn-sm btn-primary"
                                                                            onClick={() =>
                                                                              window.open(
                                                                                `${baseu11}/${item.attachFile}`,
                                                                                "_blank",
                                                                              )
                                                                            }
                                                                          >
                                                                            View
                                                                          </button>
                                                                        ) : (
                                                                          "No File"
                                                                        )}
                                                                      </td>
                                                                      <td>-</td>
                                                                      <td>
                                                                      <div className="action-icon">
                                                                        <div className="action-icon">
                                                                          {/* <i
                                                                            className="fa-solid fa-pen-to-square"
                                                                            onClick={() => {
                                                                              hadnlcecEdopenmodalGuestHouse(
                                                                                item,
                                                                                info,
                                                                              );
                                                                            }}
                                                                          ></i> */}
                                                                          <i
                                                                            className="fa-solid fa-trash"
                                                                            onClick={() => {
                                                                              handledeltePayment(
                                                                                item,
                                                                                info,
                                                                                index,
                                                                              );
                                                                            }}
                                                                          ></i>
                                                                        </div>
                                                                      </div>
                                                                    </td>
                                                                    </tr>
                                                                  );
                                                                },
                                                              )
                                                            ) : (
                                                              <tr>
                                                                <td
                                                                  colSpan="9"
                                                                  style={{
                                                                    textAlign:
                                                                      "center",
                                                                  }}
                                                                >
                                                                  No Data Found
                                                                </td>
                                                              </tr>
                                                            )}
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="card-footer"
                                            style={{
                                              borderTop: "1px solid #0ba6df",
                                            }}
                                          >
                                            <div className="row justify-content-end">
                                              <div className="col-md-12">
                                                <div className="total-amount">
                                                  <h6 className="mb-0">Paid</h6>
                                                  <p>
                                                    $
                                                    {info?.hospital?.paidAmount}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="card-footer"
                                            style={{
                                              borderTop: "1px solid #0ba6df",
                                            }}
                                          >
                                            <div className="row justify-content-end">
                                              <div className="col-md-12">
                                                <div className="total-amount">
                                                  <h6 className="mb-0">
                                                    Due Amount:
                                                  </h6>
                                                  <p>
                                                    ${info?.hospital?.dueAmount}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* for omca services */}
                                      <div className="col-md-12">
                                        <div
                                          className="card customstylecard"
                                          style={{
                                            border: "1px solid #22c7b8",
                                          }}
                                        >
                                          <div
                                            className="card-header d-flex align-items-center justify-content-between"
                                            style={{
                                              backgroundColor: "#EAFBF9",
                                              borderBottom: "1px solid #22c7b8",
                                            }}
                                          >
                                            <div className="d-flex gap-2 align-items-center">
                                              <h6>OMCA</h6>
                                              <a
                                                href="!#"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  handleDownloadPDF(
                                                    omcaRef,
                                                    "omca.pdf",
                                                  );
                                                }}
                                              >
                                                <i className="fa-solid fa-download"></i>
                                              </a>
                                            </div>
                                            <div className="">
                                              <button
                                                className="add-button"
                                                onClick={(e) =>
                                                  handleAction(
                                                    e,
                                                    "services",
                                                    info,
                                                    info.treatment_name,
                                                  )
                                                }
                                              >
                                                + Add Services
                                              </button>
                                            </div>
                                          </div>
                                          <div className="card-body">
                                            <div ref={omcaRef}>
                                              <div className="row gx-3 gy-3">
                                                <div className="col-md-6">
                                                  <div className="card patientreat">
                                                    <div className="card-header service-list">
                                                      <h6>Extra Services</h6>
                                                    </div>
                                                    <div className="card-body">
                                                      <div className="table-responsive table-no-card">
                                                        <table className="table-card w-100">
                                                          <thead>
                                                            <tr>
                                                              <th>
                                                                Service Name
                                                              </th>
                                                              <th>Price</th>
                                                              <th>
                                                                Valid From
                                                              </th>
                                                              <th>Valid To</th>
                                                              <th className="action-col pdf-hide">
                                                                Action
                                                              </th>
                                                            </tr>
                                                          </thead>
                                                          <tbody>
                                                            {info?.omca
                                                              ?.extraServices &&
                                                            info.omca.extraServices.filter(
                                                              (item) =>
                                                                item.price,
                                                            ).length > 0 ? (
                                                              info.omca.extraServices.map(
                                                                (
                                                                  item,
                                                                  index,
                                                                ) => {
                                                                  if (
                                                                    !item.price
                                                                  )
                                                                    return null;
                                                                  return (
                                                                    <tr
                                                                      key={
                                                                        item._id ||
                                                                        item.service_type
                                                                      }
                                                                    >
                                                                      <td>
                                                                        {item.serviceName ||
                                                                          "-"}
                                                                      </td>
                                                                      <td>
                                                                        $
                                                                        {
                                                                          item.price
                                                                        }
                                                                      </td>
                                                                      <td>
                                                                        {item.startTime
                                                                          ? new Date(
                                                                              item.startTime,
                                                                            ).toLocaleDateString(
                                                                              "en-GB",
                                                                            )
                                                                          : "-"}
                                                                      </td>
                                                                      <td>
                                                                        {item.endTime
                                                                          ? new Date(
                                                                              item.endTime,
                                                                            ).toLocaleDateString(
                                                                              "en-GB",
                                                                            )
                                                                          : "-"}
                                                                      </td>
                                                                      <td className="pdf-hide">
                                                                        <div className="action-icon">
                                                                          <i
                                                                            className="fa-solid fa-pen-to-square"
                                                                            onClick={() => {
                                                                              hadnlcecEditModal(
                                                                                item,
                                                                                info,
                                                                              );
                                                                            }}
                                                                          ></i>
                                                                          <i
                                                                            className="fa-solid fa-trash"
                                                                            onClick={() => {
                                                                              handledeltePatientserveice(
                                                                                item,
                                                                                info,
                                                                                index,
                                                                              );
                                                                            }}
                                                                          ></i>
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  );
                                                                },
                                                              )
                                                            ) : (
                                                              <tr>
                                                                <td
                                                                  colSpan="5"
                                                                  style={{
                                                                    textAlign:
                                                                      "center",
                                                                  }}
                                                                >
                                                                  No Data Found
                                                                </td>
                                                              </tr>
                                                            )}
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-md-6">
                                                  <div className="card patientreat">
                                                    <div className="card-header service-list">
                                                      <h6>Free Services</h6>
                                                    </div>
                                                    <div className="card-body">
                                                      <div className="table-responsive table-no-card">
                                                        <table className="table-card w-100">
                                                          <thead>
                                                            <tr>
                                                              <th>
                                                                Service Name
                                                              </th>
                                                              {/* <th>Price</th> */}
                                                              <th>Duration</th>
                                                              {/* <th>Valid To</th>*/}
                                                              <th className="action-col pdf-hide">
                                                                Action
                                                              </th>
                                                            </tr>
                                                          </thead>
                                                          <tbody>
                                                            {info?.omca
                                                              ?.freeServices &&
                                                            info.omca
                                                              .freeServices
                                                              .length > 0 ? (
                                                              info.omca.freeServices.map(
                                                                (
                                                                  item,
                                                                  index,
                                                                ) => {
                                                                  return (
                                                                    <tr
                                                                      key={
                                                                        index
                                                                      }
                                                                    >
                                                                      <td>
                                                                        {item.serviceName ||
                                                                          "-"}
                                                                      </td>
                                                                      <td>
                                                                        {
                                                                          item.duration
                                                                        }
                                                                      </td>
                                                                      <td className="pdf-hide">
                                                                        <div className="action-icon">
                                                                          {/* <i
                                                                            className="fa-solid fa-pen-to-square"
                                                                            onClick={() => {
                                                                              hadnlcecEditModal(
                                                                                item,
                                                                                info,
                                                                              );
                                                                            }}
                                                                          ></i> */}
                                                                          <i
                                                                            className="fa-solid fa-trash"
                                                                            onClick={() => {
                                                                              handledeltePatientserveice(
                                                                                item,
                                                                                info,
                                                                                index,
                                                                              );
                                                                            }}
                                                                          ></i>
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  );
                                                                },
                                                              )
                                                            ) : (
                                                              <tr>
                                                                <td
                                                                  colSpan={3}
                                                                  style={{
                                                                    textAlign:
                                                                      "center",
                                                                  }}
                                                                >
                                                                  No Data Found
                                                                </td>
                                                              </tr>
                                                            )}
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-md-12">
                                                  <div className="card patientreat">
                                                    <div className="card-header service-list d-flex justify-content-between">
                                                      <h6>
                                                        Guest House Services
                                                      </h6>
                                                      <div className="pdf-hide">
                                                        <button
                                                          className="add-button"
                                                          onClick={() => {
                                                            handleclickGuestHouse(
                                                              info,
                                                            );
                                                          }}
                                                        >
                                                          Add Guest House
                                                        </button>
                                                      </div>
                                                    </div>
                                                    <div className="card-body">
                                                      <div className="table-responsive table-no-card">
                                                        <table className="table-card w-100">
                                                          <thead>
                                                            <tr>
                                                              <th>
                                                                Guest House Name
                                                              </th>
                                                              <th>Check In</th>
                                                              <th>Check Out</th>
                                                              <th>
                                                                Total Rooms
                                                              </th>
                                                              <th>Amount</th>
                                                              <th>
                                                                Payment Date
                                                              </th>
                                                              <th>Notes</th>
                                                              <th className="action-col pdf-hide">
                                                                Document
                                                              </th>
                                                              <th className="action-col pdf-hide">
                                                                Action
                                                              </th>
                                                            </tr>
                                                          </thead>
                                                          <tbody>
                                                            {guestHouseBooking &&
                                                            guestHouseBooking.length >
                                                              0 ? (
                                                              guestHouseBooking.map(
                                                                (
                                                                  item,
                                                                  index,
                                                                ) => {
                                                                  return (
                                                                    <tr
                                                                      key={
                                                                        item.id
                                                                      }
                                                                    >
                                                                      <td>
                                                                        {item.guestHouseName ||
                                                                          "-"}
                                                                      </td>
                                                                      <td>
                                                                        {new Date(
                                                                          item.dateRangeFrom,
                                                                        ).toLocaleDateString(
                                                                          "en-GB",
                                                                        )}
                                                                      </td>
                                                                      <td>
                                                                        {new Date(
                                                                          item.dateRangeTo,
                                                                        ).toLocaleDateString(
                                                                          "en-GB",
                                                                        )}
                                                                      </td>

                                                                      <td>
                                                                        {
                                                                          item.numberOfRooms
                                                                        }
                                                                      </td>
                                                                      <td>
                                                                        $
                                                                        {parseInt(
                                                                          item?.paymentAmount,
                                                                        )}
                                                                      </td>
                                                                      <td>
                                                                        {new Date(
                                                                          item?.paymentDate,
                                                                        ).toLocaleDateString(
                                                                          "en-GB",
                                                                        )}
                                                                      </td>
                                                                      <td>
                                                                        {
                                                                          item?.notes
                                                                        }
                                                                      </td>
                                                                      <td className="pdf-hide">
                                                                        {item?.invoiceUrl ? (
                                                                          <button
                                                                            className="btn btn-sm btn-primary"
                                                                            onClick={() =>
                                                                              window.open(
                                                                                `${baseu11}/${item.invoiceUrl}`,
                                                                                "_blank",
                                                                              )
                                                                            }
                                                                          >
                                                                            View
                                                                          </button>
                                                                        ) : (
                                                                          "No File"
                                                                        )}
                                                                      </td>
                                                                      <td className="pdf-hide">
                                                                        <div className="action-icon">
                                                                          <div className="action-icon">
                                                                            <i
                                                                              className="fa-solid fa-pen-to-square"
                                                                              onClick={() => {
                                                                                hadnlcecEdopenmodalGuestHouse(
                                                                                  item,
                                                                                  info,
                                                                                );
                                                                              }}
                                                                            ></i>
                                                                            <i
                                                                              className="fa-solid fa-trash"
                                                                              onClick={() => {
                                                                                handledelteguestHouse(
                                                                                  item,
                                                                                  info,
                                                                                  index,
                                                                                );
                                                                              }}
                                                                            ></i>
                                                                          </div>
                                                                        </div>
                                                                      </td>
                                                                    </tr>
                                                                  );
                                                                },
                                                              )
                                                            ) : (
                                                              <tr>
                                                                <td
                                                                  colSpan="5"
                                                                  style={{
                                                                    textAlign:
                                                                      "center",
                                                                  }}
                                                                >
                                                                  No Data Found
                                                                </td>
                                                              </tr>
                                                            )}
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-md-12">
                                                  <div className="total-amount">
                                                    <h6 className="mb-0">
                                                      Total Amount:
                                                    </h6>
                                                    <p>
                                                      ${info?.omca?.totalAmount}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="col-md-12">
                                                  <div className="card patientreat">
                                                    <div className="card-header service-list">
                                                      <h6>Payment</h6>
                                                    </div>
                                                    <div className="card-body">
                                                      <div className="table-responsive table-no-card">
                                                        <table className="table-card w-100">
                                                          <thead>
                                                            <tr>
                                                              <th>Amount</th>
                                                              <th>
                                                                Payment Date
                                                              </th>
                                                              <th>Notes</th>
                                                              <th>Paid To</th>
                                                              <th>Paid For</th>
                                                              <th className="action-col pdf-hide">
                                                                Document
                                                              </th>
                                                              {/* <th>Action</th> */}
                                                            </tr>
                                                          </thead>
                                                          <tbody>
                                                            {info?.omca
                                                              ?.payments &&
                                                            info?.omca?.payments
                                                              .length > 0 ? (
                                                              info?.omca?.payments.map(
                                                                (
                                                                  item,
                                                                  index,
                                                                ) => {
                                                                  return (
                                                                    <tr
                                                                      key={
                                                                        item.id
                                                                      }
                                                                    >
                                                                      <td>
                                                                        $
                                                                        {
                                                                          item.paid_amount
                                                                        }
                                                                      </td>

                                                                      <td>
                                                                        {new Date(
                                                                          item.payment_Date,
                                                                        ).toLocaleDateString(
                                                                          "en-GB",
                                                                        )}
                                                                      </td>
                                                                      <td
                                                                        title={
                                                                          item.notes
                                                                        }
                                                                      >
                                                                        {item.notes
                                                                          ? item
                                                                              .notes
                                                                              .length >
                                                                            30
                                                                            ? item.notes.slice(
                                                                                0,
                                                                                30,
                                                                              ) +
                                                                              "..."
                                                                            : item.notes
                                                                          : "-"}
                                                                      </td>
                                                                      <td>
                                                                        {item
                                                                          .paid_to
                                                                          .name ||
                                                                          "-"}
                                                                      </td>
                                                                      <td>
                                                                        {item
                                                                          .paid_for
                                                                          .name ||
                                                                          "-"}
                                                                      </td>

                                                                      <td className="pdf-hide">
                                                                        {item?.attachFile ? (
                                                                          <button
                                                                            className="btn btn-sm btn-primary"
                                                                            onClick={() =>
                                                                              window.open(
                                                                                `${baseu11}${item.attachFile}`,
                                                                                "_blank",
                                                                              )
                                                                            }
                                                                          >
                                                                            View
                                                                          </button>
                                                                        ) : (
                                                                          "No File"
                                                                        )}
                                                                      </td>
                                                                    </tr>
                                                                  );
                                                                },
                                                              )
                                                            ) : (
                                                              <tr>
                                                                <td
                                                                  colSpan="5"
                                                                  style={{
                                                                    textAlign:
                                                                      "center",
                                                                  }}
                                                                >
                                                                  No Data Found
                                                                </td>
                                                              </tr>
                                                            )}
                                                          </tbody>
                                                        </table>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="card-footer"
                                            style={{
                                              borderTop: "1px solid #22c7b8",
                                            }}
                                          >
                                            <div className="row justify-content-end">
                                              <div className="col-md-12">
                                                <div className="total-amount">
                                                  <h6 className="mb-0">Paid</h6>
                                                  <p>
                                                    ${info?.omca?.paidAmount}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="card-footer"
                                            style={{
                                              borderTop: "1px solid #22c7b8",
                                            }}
                                          >
                                            <div className="row justify-content-end">
                                              <div className="col-md-12">
                                                <div className="total-amount">
                                                  <h6 className="mb-0">
                                                    Due Amount:
                                                  </h6>
                                                  <p>
                                                    ${info?.omca?.dueAmount}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* for pharmacy data */}
                                      <div className="col-md-12">
                                        <div
                                          className="card customstylecard"
                                          style={{
                                            border: "1px solid #58C8EC",
                                          }}
                                        >
                                          <div
                                            className="card-header d-flex justify-content-between"
                                            style={{
                                              backgroundColor: "#F2FCFF",
                                              borderBottom: "1px solid #58C8EC",
                                            }}
                                          >
                                            <div className="d-flex align-items-center gap-3">
                                              <h6>Pharmacy</h6>
                                              <div className="">
                                                <a href="">
                                                  <i class="fa-solid fa-download me-2"></i>
                                                </a>
                                              </div>
                                            </div>
                                            <div>
                                              <button
                                                className="add-button"
                                                onClick={() => {
                                                  handleclickpharmacycharge(
                                                    info,
                                                  );
                                                }}
                                              >
                                                Add Charge
                                              </button>
                                            </div>
                                          </div>
                                          <div className="card-body">
                                            <div className="row gx-3 gy-3">
                                              <div className="col-md-12">
                                                <div className="card patientreat">
                                                  <div className="card-header service-list">
                                                    <h6>Pharmacy</h6>
                                                  </div>
                                                  <div className="card-body">
                                                    <div className="table-responsive table-no-card">
                                                      <table className="table-card w-100">
                                                        <thead>
                                                          <tr>
                                                            <th>
                                                              Pharmacy Name
                                                            </th>
                                                            <th>Price</th>
                                                            <th>Date</th>
                                                            <th>Action</th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          {info?.pharmacy
                                                            ?.pharmacyCharges
                                                            ?.length > 0 ? (
                                                            info.pharmacy?.pharmacyCharges?.map(
                                                              (item, index) => (
                                                                <tr
                                                                  key={item._id}
                                                                >
                                                                  <td>
                                                                    {item?.service_name ||
                                                                      "-"}
                                                                  </td>
                                                                  <td>
                                                                    $
                                                                    {item?.price ||
                                                                      "-"}
                                                                  </td>
                                                                  <td>
                                                                    {new Date(
                                                                      item?.date,
                                                                    ).toLocaleDateString(
                                                                      "en-GB",
                                                                    ) || "-"}
                                                                  </td>
                                                                  <td>
                                                                    <div className="action-icon">
                                                                      <i
                                                                        className="fa-solid fa-pen-to-square"
                                                                        onClick={() => {
                                                                          handleeditpharmacycharge(
                                                                            item,
                                                                            info,
                                                                          );
                                                                        }}
                                                                      ></i>

                                                                      <i
                                                                        className="fa-solid fa-trash text-danger"
                                                                        style={{
                                                                          cursor:
                                                                            "pointer",
                                                                        }}
                                                                        onClick={() =>
                                                                          deletepharmacy(
                                                                            info,
                                                                            index,
                                                                          )
                                                                        }
                                                                      ></i>
                                                                    </div>
                                                                  </td>
                                                                </tr>
                                                              ),
                                                            )
                                                          ) : (
                                                            <tr>
                                                              <td
                                                                colSpan={
                                                                  usrFount ===
                                                                  "Admin"
                                                                    ? 9
                                                                    : 7
                                                                }
                                                                style={{
                                                                  textAlign:
                                                                    "center",
                                                                }}
                                                              >
                                                                No Data Found
                                                              </td>
                                                            </tr>
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="col-md-12">
                                                <div className="total-amount">
                                                  <h6 className="mb-0">
                                                    Total Amount:
                                                  </h6>
                                                  <p>
                                                    $
                                                    {
                                                      info?.pharmacy
                                                        ?.totalAmount
                                                    }
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="col-md-12">
                                                <div className="card patientreat">
                                                  <div className="card-header service-list">
                                                    <h6>Payment</h6>
                                                  </div>
                                                  <div className="card-body">
                                                    <div className="table-responsive table-no-card">
                                                      <table className="table-card w-100">
                                                        <thead>
                                                          <tr>
                                                            {/* <th>Payment</th> */}
                                                            <th>Paid Amount</th>
                                                            <th>Date</th>
                                                            <th>Notes</th>
                                                            <th>Paid To</th>
                                                            <th>Paid For</th>
                                                            <th>Method</th>
                                                            {/* <th>paid_amount</th> */}
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          {info?.pharmacy
                                                            ?.payments?.length >
                                                          0 ? (
                                                            info?.pharmacy?.payments?.map(
                                                              (item, index) => (
                                                                <tr
                                                                  key={item._id}
                                                                >
                                                                  {/* <td>
                                                            {item?.service_name ||
                                                              "-"}
                                                          </td> */}
                                                                  <td>
                                                                    $
                                                                    {item?.paid_amount ||
                                                                      "-"}
                                                                  </td>
                                                                  <td>
                                                                    {new Date(
                                                                      item?.payment_Date,
                                                                    ).toLocaleDateString(
                                                                      "en-GB",
                                                                    ) || "-"}
                                                                  </td>
                                                                  <td>
                                                                    {item.notes}
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      item
                                                                        .paid_for
                                                                        .name
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      item
                                                                        .paid_to
                                                                        .name
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      item.paymentMethod
                                                                    }
                                                                  </td>
                                                                </tr>
                                                              ),
                                                            )
                                                          ) : (
                                                            <tr>
                                                              <td
                                                                colSpan={
                                                                  usrFount ===
                                                                  "Admin"
                                                                    ? 9
                                                                    : 7
                                                                }
                                                                style={{
                                                                  textAlign:
                                                                    "center",
                                                                }}
                                                              >
                                                                No Data Found
                                                              </td>
                                                            </tr>
                                                          )}
                                                        </tbody>
                                                      </table>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="card-footer"
                                            style={{
                                              borderTop: "1px solid #58C8EC",
                                            }}
                                          >
                                            <div className="row justify-content-end">
                                              <div className="col-md-12">
                                                <div className="total-amount">
                                                  <h6 className="mb-0">Paid</h6>
                                                  <p>
                                                    $
                                                    {info?.pharmacy?.paidAmount}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="card-footer"
                                            style={{
                                              borderTop: "1px solid #58C8EC",
                                            }}
                                          >
                                            <div className="row justify-content-end">
                                              <div className="col-md-12">
                                                <div className="total-amount">
                                                  <h6 className="mb-0">
                                                    Due Amount:
                                                  </h6>
                                                  <p>
                                                    ${info?.pharmacy?.dueAmount}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  ""
                                )}
                                {activeSubTab === "attendant" &&
                                  selectedTreatmentId && (
                                    <>
                                      <div className="row">
                                        <div className="col-md-12">
                                          <div className="table-responsive">
                                            <TableContainer
                                              component={Paper}
                                              style={{
                                                overflowX: "auto",
                                              }}
                                            >
                                              <div className="d-flex justify-content-end">
                                                <buttton
                                                  className="add-button my-1"
                                                  onClick={handleclickopenpopup}
                                                >
                                                  Assign Attendent
                                                </buttton>
                                              </div>
                                              <Table
                                                stickyHeader
                                                aria-label="attendant table"
                                                className="table-no-card"
                                              >
                                                <TableHead>
                                                  <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell>
                                                      Relation
                                                    </TableCell>
                                                    <TableCell>
                                                      Contact
                                                    </TableCell>
                                                    <TableCell>
                                                      Country
                                                    </TableCell>
                                                    <TableCell>
                                                      Address
                                                    </TableCell>
                                                    <TableCell>
                                                      Attendant ID Proof
                                                    </TableCell>
                                                    <TableCell>
                                                      Action
                                                    </TableCell>
                                                  </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                  {attandantFilered.length ===
                                                  0 ? (
                                                    <TableRow>
                                                      <TableCell
                                                        colSpan={7}
                                                        align="center"
                                                      >
                                                        No attendants found
                                                      </TableCell>
                                                    </TableRow>
                                                  ) : (
                                                    attandantFilered.map(
                                                      (item, index) => (
                                                        <TableRow
                                                          key={
                                                            item._id || index
                                                          }
                                                        >
                                                          <TableCell>
                                                            {item?.AttendeeId
                                                              ?.attendant_fullname ||
                                                              "N/A"}
                                                          </TableCell>
                                                          <TableCell>
                                                            {item?.AttendeeId
                                                              ?.attendant_relation ||
                                                              "N/A"}
                                                          </TableCell>
                                                          <TableCell>
                                                            {item?.AttendeeId
                                                              ?.attendant_contact ||
                                                              "N/A"}
                                                          </TableCell>
                                                          <TableCell>
                                                            {item?.AttendeeId
                                                              ?.country ||
                                                              "N/A"}
                                                          </TableCell>
                                                          <TableCell>
                                                            {item?.AttendeeId
                                                              ?.attendant_address ||
                                                              "N/A"}
                                                          </TableCell>

                                                          <TableCell>
                                                            <div className="d-flex flex-wrap gap-2">
                                                              {Array.isArray(
                                                                item?.AttendeeId
                                                                  ?.attendant_passport,
                                                              ) &&
                                                              item.AttendeeId
                                                                .attendant_passport
                                                                .length > 0 ? (
                                                                item.AttendeeId.attendant_passport.map(
                                                                  (
                                                                    file,
                                                                    index,
                                                                  ) => {
                                                                    const filePath =
                                                                      typeof file ===
                                                                      "object"
                                                                        ? file?.path
                                                                        : file;

                                                                    return (
                                                                      <a
                                                                        key={
                                                                          index
                                                                        }
                                                                        href={`https://sisccltd.com/omca_crm/${filePath}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="btn btn-sm btn-primary"
                                                                      >
                                                                        View{" "}
                                                                      </a>
                                                                    );
                                                                  },
                                                                )
                                                              ) : (
                                                                <span>
                                                                  Not Uploaded
                                                                </span>
                                                              )}
                                                            </div>
                                                          </TableCell>
                                                          <TableCell>
                                                            <i
                                                              className="fa fa-trash ms-2 text-danger"
                                                              style={{
                                                                cursor:
                                                                  "pointer",
                                                              }}
                                                              onClick={() =>
                                                                handleDelete212(
                                                                  item?._id,
                                                                )
                                                              }
                                                            ></i>
                                                          </TableCell>
                                                        </TableRow>
                                                      ),
                                                    )
                                                  )}
                                                </TableBody>
                                              </Table>
                                            </TableContainer>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                {activeSubTab === "payment" &&
                                  selectedTreatmentId && (
                                    <>
                                      <div>
                                        <div className="row">
                                          <div className="col-md-12">
                                            <div className="experience-box">
                                              <div className="top-collpse">
                                                <div className="treat-buttons">
                                                  <button
                                                    onClick={(e) =>
                                                      handleClickOpen3()
                                                    }
                                                    className="add-button"
                                                  >
                                                    <span>
                                                      <i className="fa fa-plus"></i>
                                                    </span>{" "}
                                                    Add Amount
                                                  </button>
                                                  <button
                                                    onClick={(e) =>
                                                      handleClicexportPayment(
                                                        e,
                                                        info.treatment_id,
                                                      )
                                                    }
                                                    className="add-button"
                                                  >
                                                    <span>
                                                      {/* <i className="fa fa-plus"></i> */}
                                                    </span>{" "}
                                                    Export
                                                  </button>
                                                </div>
                                              </div>
                                              <TableContainer component={Paper}>
                                                <Table className="table-no-card">
                                                  <TableHead>
                                                    <TableRow>
                                                      <TableCell>
                                                        Payment Date
                                                      </TableCell>
                                                      <TableCell>
                                                        Payment Method
                                                      </TableCell>
                                                      <TableCell>
                                                        Payment Amount
                                                      </TableCell>
                                                      <TableCell>
                                                        Paid To
                                                      </TableCell>
                                                      <TableCell>
                                                        Paid For
                                                      </TableCell>
                                                      <TableCell>
                                                        Notes
                                                      </TableCell>

                                                      <TableCell>
                                                        Document
                                                      </TableCell>
                                                      {usrFount === "Admin" ? (
                                                        <>
                                                          <TableCell>
                                                            PDF
                                                          </TableCell>
                                                          <TableCell>
                                                            Action
                                                          </TableCell>
                                                        </>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </TableRow>
                                                  </TableHead>
                                                  <TableBody>
                                                    {paymentsFilered &&
                                                    paymentsFilered.length >
                                                      0 ? (
                                                      paymentsFilered.map(
                                                        (item) => (
                                                          <TableRow
                                                            key={item._id}
                                                          >
                                                            <TableCell>
                                                              {new Date(
                                                                item?.payment_Date,
                                                              ).toLocaleDateString(
                                                                "en-GB",
                                                              )}
                                                            </TableCell>
                                                            <TableCell>
                                                              {
                                                                item?.paymentMethod
                                                              }
                                                            </TableCell>
                                                            <TableCell>
                                                              $
                                                              {
                                                                item?.paid_amount
                                                              }
                                                            </TableCell>
                                                            <TableCell>
                                                              {
                                                                item?.paid_to
                                                                  ?.name
                                                              }
                                                            </TableCell>
                                                            <TableCell>
                                                              {item?.paid_for.name
                                                                ?.split("_")
                                                                .map(
                                                                  (word) =>
                                                                    word
                                                                      .charAt(0)
                                                                      .toUpperCase() +
                                                                    word.slice(
                                                                      1,
                                                                    ),
                                                                )
                                                                .join(" ")}
                                                            </TableCell>
                                                            <TableCell>
                                                              {item?.notes}
                                                            </TableCell>
                                                            <TableCell className="action-btn">
                                                              {item?.attachFile ? (
                                                                <a
                                                                  href={`https://sisccltd.com/omca_crm/${item.attachFile}`}
                                                                  target="_blank"
                                                                  rel="noopener noreferrer"
                                                                >
                                                                  <i className="fa fa-eye"></i>
                                                                </a>
                                                              ) : (
                                                                "-"
                                                              )}
                                                            </TableCell>
                                                            {usrFount ===
                                                            "Admin" ? (
                                                              <>
                                                                <TableCell>
                                                                  <button
                                                                    className="add-button"
                                                                    onClick={() => {
                                                                      navigate(
                                                                        "/Admin/Patient-Pdfdetails",
                                                                        {
                                                                          state:
                                                                            {
                                                                              data: item?._id,
                                                                            },
                                                                        },
                                                                      );
                                                                    }}
                                                                  >
                                                                    <i className="fa fa-download"></i>
                                                                  </button>
                                                                </TableCell>
                                                                <TableCell>
                                                                  <i
                                                                    className="fa-solid fa-trash text-danger"
                                                                    style={{
                                                                      cursor:
                                                                        "pointer",
                                                                    }}
                                                                    onClick={() =>
                                                                      deletePaymentInvoice(
                                                                        item,
                                                                      )
                                                                    }
                                                                  ></i>
                                                                </TableCell>
                                                              </>
                                                            ) : (
                                                              ""
                                                            )}
                                                          </TableRow>
                                                        ),
                                                      )
                                                    ) : (
                                                      <TableRow>
                                                        <TableCell
                                                          colSpan={
                                                            usrFount === "Admin"
                                                              ? 9
                                                              : 7
                                                          }
                                                          align="center"
                                                        >
                                                          No Data Found
                                                        </TableCell>
                                                      </TableRow>
                                                    )}
                                                  </TableBody>
                                                </Table>
                                              </TableContainer>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                {activeSubTab === "reports" &&
                                  selectedTreatmentId && (
                                    <div className="card patientnotes">
                                      <div className="card-header service-list justify-content-between">
                                        <h6>Reports</h6>
                                        <button
                                          className="add-button"
                                          onClick={(e) =>
                                            handleClickOpen10(
                                              e,
                                              selectedTreatmentId,
                                            )
                                          }
                                        >
                                          <i className="fa fa-plus text-white"></i>
                                        </button>
                                      </div>
                                      <div className="card-body px-0">
                                        <div className="table-responsive table-no-card">
                                          <table className="table-card w-100">
                                            <thead>
                                              <tr>
                                                <th>Treatment Name</th>
                                                <th>Report Title</th>
                                                <th>Report Date</th>
                                                <th>Added By</th>
                                                {usrFount === "Admin" ? (
                                                  <>
                                                    {" "}
                                                    <th>Reports</th>
                                                    <th>Action</th>
                                                  </>
                                                ) : (
                                                  ""
                                                )}
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {reportsFilered1 &&
                                              reportsFilered1.length > 0 ? (
                                                reportsFilered1.map((item) => (
                                                  <tr key={item._id}>
                                                    <td>
                                                      {
                                                        item?.treatment_course_name
                                                      }
                                                    </td>
                                                    <td>{item?.reportTitle}</td>
                                                    <td>
                                                      {" "}
                                                      {new Date(
                                                        item?.treatment_report_date,
                                                      ).toLocaleDateString(
                                                        "en-GB",
                                                      )}
                                                    </td>
                                                    <td>
                                                      {" "}
                                                      {item?.platform === 1
                                                        ? "CRM"
                                                        : "Hospital"}
                                                    </td>
                                                    {usrFount === "Admin" ? (
                                                      <>
                                                        {" "}
                                                        <td>
                                                          <a
                                                            href={`${image}${item.treatmentReport}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                          >
                                                            Download Report
                                                          </a>
                                                        </td>
                                                        <td className="action-icon">
                                                          <i
                                                            className="fa-solid fa-trash text-danger"
                                                            style={{
                                                              cursor: "pointer",
                                                            }}
                                                            onClick={() =>
                                                              handledeleteReport(
                                                                item,
                                                              )
                                                            }
                                                          ></i>
                                                          <i
                                                            className="fa-solid fa-pen-to-square"
                                                            onClick={() =>
                                                              handleEditreport(
                                                                item,
                                                                info,
                                                              )
                                                            }
                                                          ></i>
                                                        </td>
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </tr>
                                                ))
                                              ) : (
                                                <tr>
                                                  <td
                                                    colSpan="5"
                                                    style={{
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    No Data Found
                                                  </td>
                                                </tr>
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                        {doctorReviewNotes?.documents?.length >
                                          0 && (
                                          <>
                                            <div className="treat-hd my-3">
                                              <h6>Treatment Plan Documents</h6>
                                              <span className="line"></span>
                                            </div>
                                            <div className="">
                                              {doctorReviewNotes?.documents?.map(
                                                (doc, index) => (
                                                  <span key={index}>
                                                    <button
                                                      type="button"
                                                      className="viewbtn me-2"
                                                      onClick={() =>
                                                        window.open(
                                                          `${imageUrl}/${doc?.file}`,
                                                          "_blank",
                                                        )
                                                      }
                                                    >
                                                      View {index + 1}
                                                    </button>
                                                  </span>
                                                ),
                                              )}
                                            </div>
                                          </>
                                        )}
                                        <div className="treat-hd my-3">
                                          <h6>Doctor Review</h6>
                                          <span className="line"></span>
                                        </div>
                                        <div className="row mb-3">
                                          <div className="col-md-6">
                                            <div className="">
                                              <h6>Recommendation</h6>
                                              <p>
                                                {
                                                  doctorReviewNotes
                                                    ?.doctorReview?.review_notes
                                                }
                                              </p>
                                            </div>
                                          </div>
                                          <div className="col-md-3">
                                            <div className="">
                                              <h6>Notes</h6>
                                              <p>
                                                {
                                                  doctorReviewNotes
                                                    ?.doctorReview
                                                    ?.Recommendations
                                                }
                                              </p>
                                            </div>
                                          </div>
                                          <div className="col-md-3">
                                            <div className="">
                                              <h6>Documentation</h6>
                                              {doctorReviewNotes?.doctorReview
                                                ?.images?.length > 0 ? (
                                                <button
                                                  className="viewbtn"
                                                  onClick={() =>
                                                    window.open(
                                                      `${imageUrl}/${doctorReviewNotes.doctorReview.images[0]}`,
                                                      "_blank",
                                                    )
                                                  }
                                                >
                                                  View
                                                </button>
                                              ) : (
                                                <span></span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row">
                                          {doctorReviewNotes?.doctorReview
                                            ?.comments &&
                                            doctorReviewNotes?.doctorReview
                                              ?.comments.length > 0 && (
                                              <div className="col-md-12">
                                                {/* Accordion */}
                                                <div
                                                  className="accordion"
                                                  id="doctorReviewCommentsAccordion"
                                                >
                                                  <div className="accordion-item border-0">
                                                    {/* Header */}
                                                    <h2
                                                      className="accordion-header"
                                                      id="doctorReviewCommentsHeading"
                                                    >
                                                      <button
                                                        className="accordion-button collapsed customstylecard"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#doctorReviewCommentsCollapse"
                                                        aria-expanded="false"
                                                        aria-controls="doctorReviewCommentsCollapse"
                                                      >
                                                        <div className="d-flex align-items-center gap-2">
                                                          <span>Comments</span>
                                                        </div>
                                                      </button>
                                                    </h2>
                                                    <div
                                                      id="doctorReviewCommentsCollapse"
                                                      className="accordion-collapse collapse"
                                                      aria-labelledby="doctorReviewCommentsHeading"
                                                      data-bs-parent="#doctorReviewCommentsAccordion"
                                                    >
                                                      <div className="accordion-body p-0 pt-3">
                                                        <div className="row gy-3">
                                                          {doctorReviewNotes?.doctorReview?.comments.map(
                                                            (
                                                              comment,
                                                              commentIndex,
                                                            ) => (
                                                              <div
                                                                className="col-md-12"
                                                                key={
                                                                  comment._id ||
                                                                  commentIndex
                                                                }
                                                              >
                                                                <div className="card customstylecard">
                                                                  <div className="card-body">
                                                                    <div className="note-view">
                                                                      <h3 className="card-title">
                                                                        {
                                                                          comment.user_type
                                                                        }{" "}
                                                                        Note
                                                                      </h3>
                                                                    </div>

                                                                    <div className="experience-box">
                                                                      <ul className="experience-list">
                                                                        <li className="mb-0">
                                                                          <div className="experience-user">
                                                                            <div className="before-circle"></div>
                                                                          </div>

                                                                          <div className="experience-content">
                                                                            <div className="timeline-content">
                                                                              <a
                                                                                href="#/"
                                                                                className="name"
                                                                              >
                                                                                {
                                                                                  comment.Notes
                                                                                }
                                                                              </a>

                                                                              {/* Images */}
                                                                              {comment.images &&
                                                                                comment
                                                                                  .images
                                                                                  .length >
                                                                                  0 && (
                                                                                  <div className="mt-2 mb-2">
                                                                                    {comment.images.map(
                                                                                      (
                                                                                        img,
                                                                                        imgIndex,
                                                                                      ) => {
                                                                                        const fullUrl =
                                                                                          img.startsWith(
                                                                                            "http",
                                                                                          )
                                                                                            ? img
                                                                                            : image +
                                                                                              img;

                                                                                        return (
                                                                                          <button
                                                                                            key={
                                                                                              imgIndex
                                                                                            }
                                                                                            type="button"
                                                                                            className="viewbtn btn-sm me-2"
                                                                                            onClick={() =>
                                                                                              window.open(
                                                                                                fullUrl,
                                                                                                "_blank",
                                                                                              )
                                                                                            }
                                                                                          >
                                                                                            View
                                                                                            Document{" "}
                                                                                            {imgIndex +
                                                                                              1}
                                                                                          </button>
                                                                                        );
                                                                                      },
                                                                                    )}
                                                                                  </div>
                                                                                )}

                                                                              <div>
                                                                                Date
                                                                                -{" "}
                                                                                {comment.Date
                                                                                  ? new Date(
                                                                                      comment.Date,
                                                                                    ).toLocaleDateString(
                                                                                      "en-GB",
                                                                                    )
                                                                                  : new Date(
                                                                                      comment.createdAt,
                                                                                    ).toLocaleDateString(
                                                                                      "en-GB",
                                                                                    )}
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                        </li>
                                                                      </ul>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            ),
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                {activeSubTab === "appointment" &&
                                  selectedTreatmentId === info.treatment_id && (
                                    <div className="row">
                                      <div className="col-md-12">
                                        <div className="top-collpse">
                                          <div className="treat-buttons mb-0">
                                            <button
                                              className="add-button"
                                              onClick={(e) =>
                                                handleClickOpen1(
                                                  e,
                                                  selectedTreatmentId,
                                                  info,
                                                )
                                              }
                                            >
                                              <span>
                                                <i className="fa fa-plus"></i>
                                              </span>
                                              Add Appointment
                                            </button>
                                          </div>
                                        </div>
                                        <div className="table-responsive table-no-card">
                                          <table className="table-card w-100">
                                            <thead>
                                              <tr>
                                                <th>ID</th>
                                                <th>Vehicle No</th>
                                                <th>Driver Name</th>
                                                <th>Driver Contact</th>
                                                <th>Pickup Time</th>
                                                <th>Date</th>
                                                <th>Notes</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {appointmentTabel.length === 0 ? (
                                                <tr>
                                                  <td
                                                    colSpan="8"
                                                    className="text-center"
                                                  >
                                                    No Appointment Found
                                                  </td>
                                                </tr>
                                              ) : (
                                                appointmentTabel.map((item) => (
                                                  <tr key={item._id}>
                                                    <td>
                                                      {item.appointmentId}
                                                    </td>
                                                    <td>
                                                      {item.mode !== "online"
                                                        ? item.vehicle_no
                                                        : "-"}
                                                    </td>
                                                    <td>
                                                      {item.mode !== "online"
                                                        ? item.driver_name
                                                        : "-"}
                                                    </td>
                                                    <td>
                                                      {item.mode !== "online"
                                                        ? item.driver_contact
                                                        : "-"}
                                                    </td>
                                                    <td>
                                                      {item.mode !== "online"
                                                        ? item.pickup_time
                                                        : "-"}
                                                    </td>
                                                    <td>
                                                      {item.appointment_Date
                                                        ? new Date(
                                                            item.appointment_Date,
                                                          )
                                                            .toISOString()
                                                            .slice(0, 10)
                                                        : ""}
                                                    </td>
                                                    <td>{item.note}</td>
                                                    <td>
                                                      <span className="badge bg-primary">
                                                        {item.status}
                                                      </span>
                                                    </td>
                                                    <td>
                                                      <td>
                                                        <div className="action-icon">
                                                          <i
                                                            className="fa-solid fa-pen-to-square"
                                                            onClick={() =>
                                                              handleclickeditfunc(
                                                                item,
                                                                info,
                                                              )
                                                            }
                                                          ></i>
                                                          <i
                                                            className="fa-solid fa-trash"
                                                            onClick={() =>
                                                              handleclickeditdelete(
                                                                item,
                                                                info,
                                                              )
                                                            }
                                                          ></i>
                                                        </div>
                                                      </td>
                                                    </td>
                                                  </tr>
                                                ))
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                {activeSubTab === "notes" &&
                                  selectedTreatmentId === info.treatment_id && (
                                    <div className="card patientnotes">
                                      <div className="card-header service-list justify-content-between">
                                        <h6>Notes</h6>
                                        <button
                                          className="add-button"
                                          onClick={(e) =>
                                            handleClickOpenNotes(
                                              e,
                                              selectedTreatmentId,
                                              info,
                                            )
                                          }
                                        >
                                          <i className="fa fa-plus text-white"></i>
                                        </button>
                                      </div>
                                      <div className="card-body px-0">
                                        <div className="table-responsive table-no-card">
                                          <table className="table-card w-100">
                                            <thead>
                                              <tr>
                                                <th>Note</th>
                                                <th>Date</th>
                                                <th>Added By</th>
                                                <th>Images</th>
                                                <th>Action</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {notesTable &&
                                              notesTable.length > 0 ? (
                                                notesTable.map(
                                                  (item, index) => {
                                                    return (
                                                      <tr
                                                        key={item._id || index}
                                                      >
                                                        <td
                                                          title={item.note}
                                                          style={{
                                                            width: "50%",
                                                            cursor: "pointer",
                                                          }}
                                                        >
                                                          {item.note
                                                            ? item.note.length >
                                                              110
                                                              ? item.note.slice(
                                                                  0,
                                                                  110,
                                                                ) + "..."
                                                              : item.note
                                                            : "-"}
                                                        </td>
                                                        {/* <td style={{ width: "20%" }}> {item.note || "-"} </td> */}
                                                        <td>
                                                          {item?.date
                                                            ? new Date(
                                                                item.date,
                                                              ).toLocaleDateString(
                                                                "en-GB",
                                                              )
                                                            : "-"}
                                                        </td>
                                                        <td>
                                                          {item.platform == "1"
                                                            ? "CRM"
                                                            : "Hospital"}{" "}
                                                        </td>
                                                        <td>
                                                          {item
                                                            ?.treatmentNoteImages
                                                            ?.length > 0
                                                            ? item.treatmentNoteImages.map(
                                                                (
                                                                  img,
                                                                  index,
                                                                ) => (
                                                                  <button
                                                                    key={index}
                                                                    className="btn btn-sm btn-primary me-1"
                                                                    onClick={() =>
                                                                      window.open(
                                                                        `https://sisccltd.com/omca_crm/${img}`,
                                                                        "_blank",
                                                                      )
                                                                    }
                                                                  >
                                                                    View
                                                                  </button>
                                                                ),
                                                              )
                                                            : "-"}
                                                        </td>

                                                        <td>
                                                          <div className="action-icon">
                                                            <i
                                                              className="fa-solid fa-pen-to-square"
                                                              onClick={() =>
                                                                EditButton(
                                                                  item,
                                                                  info,
                                                                )
                                                              }
                                                            ></i>
                                                            <i
                                                              className="fa-solid fa-trash"
                                                              onClick={() =>
                                                                EditDelete(
                                                                  item,
                                                                  info,
                                                                )
                                                              }
                                                            ></i>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    );
                                                  },
                                                )
                                              ) : (
                                                <tr>
                                                  <td
                                                    colSpan="5"
                                                    style={{
                                                      textAlign: "center",
                                                    }}
                                                  >
                                                    No Data Found
                                                  </td>
                                                </tr>
                                              )}
                                            </tbody>
                                          </table>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane ${mainTab === "Attende" ? "show active" : ""}`}
                id="atten-cont"
              >
                <div className="main-tab-hd justify-content-end">
                  <div className="">
                    <button
                      onClick={(e) => handleClickOpen2(e, selectedTreatmentId)}
                      className="add-button"
                    >
                      <span>
                        <i className="fa fa-plus"></i>
                      </span>{" "}
                      Add Attendant{" "}
                    </button>
                  </div>
                </div>
                <div className="card-box">
                  <div className="row gx-3 gy-3">
                    <div className="col-md-12">
                      <div className="table-responsive">
                        <TableContainer
                          component={Paper}
                          style={{
                            overflowX: "auto",
                          }}
                        >
                          <Table
                            stickyHeader
                            aria-label="attendant table"
                            className="table-no-card"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Sr.No.</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Relation</TableCell>
                                <TableCell>Contact</TableCell>
                                <TableCell>Country</TableCell>
                                <TableCell>Attendant Address</TableCell>
                                <TableCell>Attendant ID Proof</TableCell>
                                <TableCell>Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {attandantnew.length === 0 ? (
                                <TableRow>
                                  <TableCell colSpan={7} align="center">
                                    No attendants found
                                  </TableCell>
                                </TableRow>
                              ) : (
                                attandantnew.map((item, index) => (
                                  <TableRow key={item._id || index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                      {item?.attendant_fullname || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                      {item?.attendant_relation || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                      {item.phoneCode}{" "}
                                      {item?.attendant_contact || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                      {item?.country || "N/A"}
                                    </TableCell>
                                    <TableCell>
                                      {item?.attendant_address}
                                    </TableCell>
                                    <TableCell className="d-flex gap-2">
                                      {item?.attendant_passport?.length > 0
                                        ? item.attendant_passport.map(
                                            (file, fIndex) => {
                                              const filePath =
                                                typeof file === "object"
                                                  ? file?.path
                                                  : file;
                                              return (
                                                <div key={fIndex}>
                                                  <a
                                                    href={`https://sisccltd.com/omca_crm/${filePath}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="viewbtn"
                                                  >
                                                    View{" "}
                                                    {item.attendant_passport
                                                      .length > 1
                                                      ? fIndex + 1
                                                      : ""}
                                                  </a>
                                                </div>
                                              );
                                            },
                                          )
                                        : "Not Uploaded"}
                                    </TableCell>
                                    <TableCell className="action-icon">
                                      <i
                                        className="fa fa-edit"
                                        onClick={() => handleEdit(item)}
                                      ></i>
                                      <i
                                        className="fa fa-trash ms-2"
                                        onClick={() =>
                                          handleDeletetrtrtrtr(item)
                                        }
                                      ></i>
                                    </TableCell>
                                  </TableRow>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane ${mainTab === "Patient_Enquiry" ? "show active" : ""}`}
                id="atten-cont"
              >
                <div className="main-tab-hd justify-content-end">
                  <div className=""></div>
                </div>
                <div className="card-box">
                  <div className="row gx-3 gy-3">
                    <div className="col-md-12">
                      <div className="table-responsive">
                        <div className="card-box">
                          {/* Tabs */}
                          <ul className="nav nav-tabs mb-3">
                            <li className="nav-item">
                              <button
                                className={`nav-link ${tabValue === 0 ? "active" : ""}`}
                                onClick={() => setTabValue(0)}
                              >
                                Enquiry
                              </button>
                            </li>
                            <li className="nav-item">
                              <button
                                className={`nav-link ${tabValue === 1 ? "active" : ""}`}
                                onClick={() => setTabValue(1)}
                              >
                                Ambulance Servie
                              </button>
                            </li>
                            <li className="nav-item">
                              <button
                                className={`nav-link ${tabValue === 2 ? "active" : ""}`}
                                onClick={() => setTabValue(2)}
                              >
                                Air Medical Escort
                              </button>
                            </li>
                            <li className="nav-item">
                              <button
                                className={`nav-link ${tabValue === 3 ? "active" : ""}`}
                                onClick={() => setTabValue(3)}
                              >
                                Treatment Estimate
                              </button>
                            </li>
                          </ul>
                          <div className="row gx-3 gy-3">
                            <div className="col-md-12">
                              <div className="table-responsive">
                                {/* Enquiry */}
                                {tabValue === 0 && (
                                  <div>
                                    <TableContainer className="table-responsive">
                                      <Table className="table-no-card">
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>Sr.No.</TableCell>
                                            <TableCell>Enquiry IDs</TableCell>
                                            <TableCell>Country</TableCell>
                                            <TableCell>Treating In</TableCell>
                                            <TableCell>Date/Time</TableCell>
                                            <TableCell>Action</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {dataForConfirmedEnq.map(
                                            (info, i) => (
                                              <TableRow key={info._id}>
                                                <TableCell>{i + 1}</TableCell>
                                                <TableCell>
                                                  {info.enquiryId}
                                                </TableCell>

                                                <TableCell>
                                                  {" "}
                                                  {info?.country?.length > 10
                                                    ? info.country.slice(
                                                        0,
                                                        10,
                                                      ) + "..."
                                                    : info.country}
                                                </TableCell>
                                                <TableCell>
                                                  {" "}
                                                  {info?.treatingIn?.length > 10
                                                    ? info.treatingIn.slice(
                                                        0,
                                                        10,
                                                      ) + "..."
                                                    : info.treatingIn}
                                                </TableCell>
                                                <TableCell>
                                                  {/* {new Date(
                                                    info.createdAt,
                                                  ).toLocaleDateString("en-GB")} */}
                                                  {new Date(
                                                    info.createdAt,
                                                  ).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                      day: "numeric",
                                                      month: "short",
                                                      year: "numeric",
                                                    },
                                                  )}{" "}
                                                  {new Date(
                                                    info.createdAt,
                                                  ).toLocaleTimeString(
                                                    "en-GB",
                                                    {
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                      hour12: true,
                                                    },
                                                  )}
                                                </TableCell>
                                                <TableCell className="action-icon">
                                                  <VisibilityIcon
                                                    className="eye-icon"
                                                    onClick={(e) =>
                                                      ViewDetail(
                                                        e,
                                                        tabValue,
                                                        info,
                                                      )
                                                    }
                                                  />
                                                  {info?.hasDoctorReview ===
                                                  true ? (
                                                    ""
                                                  ) : (
                                                    <i
                                                      className="fa-solid fa-stethoscope"
                                                      onClick={(e) =>
                                                        handleClickOpen4(
                                                          e,
                                                          info.enquiryId,
                                                          info,
                                                        )
                                                      }
                                                    ></i>
                                                  )}
                                                  {info?.hasAppointment ===
                                                  true ? (
                                                    ""
                                                  ) : (
                                                    <i
                                                      className="fa-solid fa-calendar-plus"
                                                      title="Add Appointment"
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      onClick={() =>
                                                        handleOpenAppointment(
                                                          info,
                                                        )
                                                      }
                                                    ></i>
                                                  )}
                                                </TableCell>
                                              </TableRow>
                                            ),
                                          )}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </div>
                                )}
                                {tabValue === 1 && (
                                  <div>
                                    <div>
                                      <TableContainer className="table-responsive">
                                        <Table className="table-no-card">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell>Sr.No.</TableCell>
                                              <TableCell>Enquiry IDs</TableCell>
                                              <TableCell>Country</TableCell>
                                              <TableCell>Treating In</TableCell>
                                              <TableCell>Date/Time</TableCell>
                                              <TableCell>Action</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {ambulanceData?.length > 0 ? (
                                              ambulanceData.map((info, i) => (
                                                <TableRow key={info._id}>
                                                  <TableCell>{i + 1}</TableCell>

                                                  <TableCell>
                                                    {info.enquiryId}
                                                  </TableCell>
                                                  <TableCell>
                                                    {info?.country?.length > 10
                                                      ? info.country.slice(
                                                          0,
                                                          10,
                                                        ) + "..."
                                                      : info.country}
                                                  </TableCell>

                                                  <TableCell>
                                                    {info?.treating_in_country
                                                      ?.length > 10
                                                      ? info.treating_in_country.slice(
                                                          0,
                                                          10,
                                                        ) + "..."
                                                      : info.treating_in_country}
                                                  </TableCell>

                                                  <TableCell>
                                                    {new Date(
                                                      info.created_at,
                                                    ).toLocaleDateString(
                                                      "en-GB",
                                                      {
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                      },
                                                    )}{" "}
                                                    {new Date(
                                                      info.created_at,
                                                    ).toLocaleTimeString(
                                                      "en-GB",
                                                      {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                      },
                                                    )}
                                                  </TableCell>

                                                  <TableCell className="action-icon">
                                                    <VisibilityIcon
                                                      className="eye-icon"
                                                      onClick={(e) =>
                                                        ViewDetail(
                                                          e,
                                                          tabValue,
                                                          info,
                                                        )
                                                      }
                                                    />

                                                    {info?.hasDoctorReview !==
                                                      true && (
                                                      <i
                                                        className="fa-solid fa-stethoscope"
                                                        onClick={(e) =>
                                                          handleClickOpen4(
                                                            e,
                                                            info.enquiryId,
                                                            info,
                                                          )
                                                        }
                                                      ></i>
                                                    )}

                                                    {info?.hasAppointment !==
                                                      true && (
                                                      <i
                                                        className="fa-solid fa-calendar-plus"
                                                        title="Add Appointment"
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                          handleOpenAppointment(
                                                            info,
                                                          )
                                                        }
                                                      ></i>
                                                    )}
                                                  </TableCell>
                                                </TableRow>
                                              ))
                                            ) : (
                                              <TableRow>
                                                <TableCell
                                                  colSpan={7}
                                                  align="center"
                                                >
                                                  No Data Found
                                                </TableCell>
                                              </TableRow>
                                            )}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </div>
                                  </div>
                                )}
                                {tabValue === 2 && (
                                  <div>
                                    <TableContainer className="table-responsive">
                                      <Table className="table-no-card">
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>Sr.No.</TableCell>
                                            <TableCell>Enquiry IDs</TableCell>
                                            <TableCell>Country</TableCell>
                                            <TableCell>Treating In</TableCell>
                                            <TableCell>Date/Time</TableCell>
                                            <TableCell>Action</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {airAmbulanceData?.length > 0 ? (
                                            airAmbulanceData.map((info, i) => (
                                              <TableRow key={info._id}>
                                                <TableCell>{i + 1}</TableCell>

                                                <TableCell>
                                                  {info.enquiryId}
                                                </TableCell>
                                                <TableCell>
                                                  {info?.country?.length > 10
                                                    ? info.country.slice(
                                                        0,
                                                        10,
                                                      ) + "..."
                                                    : info.country}
                                                </TableCell>
                                                <TableCell>
                                                  {info?.treating_in_country
                                                    ?.length > 10
                                                    ? info.treating_in_country.slice(
                                                        0,
                                                        10,
                                                      ) + "..."
                                                    : info.treating_in_country}
                                                </TableCell>
                                                <TableCell>
                                                  {new Date(
                                                    info.created_at,
                                                  ).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                      day: "numeric",
                                                      month: "short",
                                                      year: "numeric",
                                                    },
                                                  )}{" "}
                                                  {new Date(
                                                    info.created_at,
                                                  ).toLocaleTimeString(
                                                    "en-GB",
                                                    {
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                      hour12: true,
                                                    },
                                                  )}
                                                </TableCell>
                                                <TableCell className="action-icon">
                                                  <VisibilityIcon
                                                    className="eye-icon"
                                                    onClick={(e) =>
                                                      ViewDetail(
                                                        e,
                                                        tabValue,
                                                        info,
                                                      )
                                                    }
                                                  />
                                                  {info?.hasDoctorReview !==
                                                    true && (
                                                    <i
                                                      className="fa-solid fa-stethoscope"
                                                      onClick={(e) =>
                                                        handleClickOpen4(
                                                          e,
                                                          info.enquiryId,
                                                          info,
                                                        )
                                                      }
                                                    ></i>
                                                  )}
                                                  {info?.hasAppointment !==
                                                    true && (
                                                    <i
                                                      className="fa-solid fa-calendar-plus"
                                                      title="Add Appointment"
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      onClick={() =>
                                                        handleOpenAppointment(
                                                          info,
                                                        )
                                                      }
                                                    ></i>
                                                  )}
                                                </TableCell>
                                              </TableRow>
                                            ))
                                          ) : (
                                            <TableRow>
                                              <TableCell
                                                colSpan={7}
                                                align="center"
                                              >
                                                No Data Found
                                              </TableCell>
                                            </TableRow>
                                          )}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </div>
                                )}
                                {tabValue === 3 && (
                                  <div>
                                    <TableContainer className="table-responsive">
                                      <Table className="table-no-card">
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>Sr.No.</TableCell>
                                            <TableCell>Enquiry IDs</TableCell>
                                            <TableCell>Country</TableCell>
                                            <TableCell>Treating In</TableCell>
                                            <TableCell>Date/Time</TableCell>
                                            <TableCell>Action</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {treatmentData1?.length > 0 ? (
                                            treatmentData1.map((info, i) => (
                                              <TableRow key={info._id}>
                                                <TableCell>{i + 1}</TableCell>

                                                <TableCell>
                                                  {info.enquiryId}
                                                </TableCell>
                                                <TableCell>
                                                  {info?.country?.length > 10
                                                    ? info.country.slice(
                                                        0,
                                                        10,
                                                      ) + "..."
                                                    : info.country}
                                                </TableCell>

                                                <TableCell>
                                                  {info?.treatingIn?.length > 10
                                                    ? info.treatingIn.slice(
                                                        0,
                                                        10,
                                                      ) + "..."
                                                    : info.treatingIn}
                                                </TableCell>
                                                <TableCell>
                                                  {/* {new Date(
                                                    info.created_at,
                                                  ).toLocaleDateString(
                                                    "en-GB",
                                                  )} */}
                                                  {new Date(
                                                    info.created_at,
                                                  ).toLocaleDateString(
                                                    "en-GB",
                                                    {
                                                      day: "numeric",
                                                      month: "short",
                                                      year: "numeric",
                                                    },
                                                  )}{" "}
                                                  {new Date(
                                                    info.created_at,
                                                  ).toLocaleTimeString(
                                                    "en-GB",
                                                    {
                                                      hour: "2-digit",
                                                      minute: "2-digit",
                                                      hour12: true,
                                                    },
                                                  )}
                                                </TableCell>
                                                <TableCell className="action-icon">
                                                  <VisibilityIcon
                                                    className="eye-icon"
                                                    onClick={(e) =>
                                                      ViewDetail(
                                                        e,
                                                        tabValue,
                                                        info,
                                                      )
                                                    }
                                                  />
                                                  {info?.hasDoctorReview !==
                                                    true && (
                                                    <i
                                                      className="fa-solid fa-stethoscope"
                                                      onClick={(e) =>
                                                        handleClickOpen4(
                                                          e,
                                                          info.enquiryId,
                                                          info,
                                                        )
                                                      }
                                                    ></i>
                                                  )}
                                                  {info?.hasAppointment !==
                                                    true && (
                                                    <i
                                                      className="fa-solid fa-calendar-plus"
                                                      title="Add Appointment"
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      onClick={() =>
                                                        handleOpenAppointment(
                                                          info,
                                                        )
                                                      }
                                                    ></i>
                                                  )}
                                                </TableCell>
                                              </TableRow>
                                            ))
                                          ) : (
                                            <TableRow>
                                              <TableCell
                                                colSpan={7}
                                                align="center"
                                              >
                                                No Data Found
                                              </TableCell>
                                            </TableRow>
                                          )}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <React.Fragment>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={treatmentPlanPopup}
          onClose={PlanTreatmentPopupClose}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Plan Treatment</h6>
            </div>
            <div className="cross-icon" onClick={PlanTreatmentPopupClose}>
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <DialogContent className="main-box view-table-detail">
            <Box noValidate component="form" className="contact-form">
              <div className="row">
                <div className="col-md-12">
                  <div className="field-set">
                    <label>
                      Treatment course<span className="text-danger">*</span>
                    </label>
                    <Autocomplete
                      options={Treatment || []}
                      getOptionLabel={(option) => option.name || ""}
                      onChange={(e, newValue) => {
                        setFieldValue(newValue);
                        handleChangeDetails123(newValue);
                        setErrors((prev) => ({ ...prev, treatment: "" }));
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Select Treatment Course"
                          error={!!errors.treatment}
                          helperText={errors.treatment}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="field-set">
                    <label>
                      Select Hospital<span className="text-danger">*</span>
                    </label>
                    <Autocomplete
                      multiple
                      options={hospitlID || []}
                      value={hospitalId || []}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.name}
                      onChange={(e, values) => {
                        const isSelectAll = values.find(
                          (val) => val._id === "all",
                        );

                        if (isSelectAll) {
                          const allHospitals = hospitlID.filter(
                            (item) => item._id !== "all",
                          );
                          setHospitalId(allHospitals);
                        } else {
                          setHospitalId(values);
                        }

                        setErrors((prev) => ({ ...prev, hospitals: "" }));
                      }}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            checked={
                              option._id === "all"
                                ? hospitalId.length === hospitlID.length - 1
                                : selected
                            }
                          />
                          {option.name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Hospital"
                          error={!!errors.hospitals}
                        />
                      )}
                    />
                  </div>
                  {errors.hospitals && (
                    <small className="text-danger">{errors.hospitals}</small>
                  )}
                </div>
                <div className="col-md-12">
                  <div className="field-set">
                    <label>
                      Doctor Notes<span className="text-danger"></span>
                    </label>
                    <select
                      name="doctorReviewId"
                      className="form-control"
                      onChange={handechangesearch}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {doctorReviewData1?.map((item) => {
                        const reviewText = item?.review_notes || "";

                        return (
                          <option key={item._id} value={item._id}>
                            {reviewText.length > 75
                              ? reviewText.slice(0, 75) + "..."
                              : reviewText || "No Review Notes"}
                          </option>
                        );
                      })}
                    </select>
                    {errors.drreviewnotes && (
                      <small className="text-danger">
                        {errors.drreviewnotes}
                      </small>
                    )}
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="field-set">
                    <label>
                      Select Reports<span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      multiple
                      className="form-control"
                      onChange={(e) => {
                        setImages(Array.from(e.target.files));
                        setErrors((prev) => ({ ...prev, reports: "" }));
                      }}
                    />
                  </div>
                  {errors.reports && (
                    <small className="text-danger">{errors.reports}</small>
                  )}
                </div>
                <div className="col-md-12">
                  <div className="field-set">
                    <label>
                      Notes<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      onChange={(e) => {
                        setValue1(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <DialogActions className="submit-main">
                <Button
                  type="button"
                  onClick={uploadmultipleRecord}
                  variant="contained"
                >
                  Send
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog
          fullWidth
          maxWidth="sm"
          open={modalEditServiceOpen}
          onClose={hadnlcecEcloseeModal}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Edit Service</h6>
            </div>
            <div className="cross-icon" onClick={hadnlcecEcloseeModal}>
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
                gap: 3,
                width: "100%",
              }}
              className="contact-form"
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <div className="field-set mb-0">
                    <label>
                      Service<span className="text-danger"></span>
                    </label>
                    <input
                      className="form-control"
                      onChange={editServiceandlechange}
                      value={data.serviceName}
                      disabled
                      name="serviceId"
                    />
                  </div>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <div className="field-set mb-0">
                    <label>
                      Enter Price<span className="text-danger">*</span>
                    </label>
                    <div className="fixpricee">
                      <p className="code-dial">USD($)</p>
                      <input
                        type="text"
                        className="form-control code-in"
                        value={data.price}
                        name="price"
                        onChange={editServiceandlechange}
                        placeholder="Enter price"
                      />
                    </div>
                  </div>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <div className="field-set mb-0">
                    <div className="field-set mb-0">
                      <label>
                        Start Date<span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="startTime"
                        value={
                          data.startTime ? data.startTime.split("T")[0] : ""
                        }
                        onChange={editServiceandlechange}
                        placeholder="Enter start date"
                      />
                    </div>
                  </div>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <div className="field-set mb-0">
                    <label>
                      End Date<span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="endTime"
                      value={data.endTime ? data.endTime.split("T")[0] : ""}
                      onChange={editServiceandlechange}
                      placeholder="Enter end date"
                    />
                  </div>
                </Box>
              </Box>

              <DialogActions className="submit-main">
                <Button
                  type="button"
                  onClick={handlesubmitdataserviceEdit}
                  variant="contained"
                >
                  Submit
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog fullWidth maxWidth="sm" open={openModal} onClose={closeModal}>
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Add Service</h6>
            </div>
            <div className="cross-icon" onClick={closeModal}>
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
                gap: 3,
                width: "100%",
              }}
              className="contact-form"
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <div className="field-set mb-0">
                    <label>
                      Select Service<span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-control"
                      onChange={andlechange}
                      name="serviceId"
                    >
                      <option>Select</option>
                      {undadedservice?.map((item, index) => (
                        <option key={index} value={item.serviceId}>
                          {item.serviceName}
                        </option>
                      ))}
                    </select>
                  </div>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <div className="field-set mb-0">
                    <label>
                      Enter Price<span className="text-danger">*</span>
                    </label>
                    <div className="fixpricee">
                      <p className="code-dial">USD($)</p>
                      <input
                        type="number"
                        className="form-control code-in"
                        value={data.price}
                        name="price"
                        onChange={andlechange}
                        placeholder="Enter price"
                      />
                    </div>
                  </div>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <div className="field-set mb-0">
                    <div className="field-set mb-0">
                      <label>
                        Start Date<span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="start_date"
                        onChange={andlechangedate}
                        placeholder="Enter start date"
                      />
                    </div>
                  </div>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <div className="field-set mb-0">
                    <label>
                      End Date<span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="end_date"
                      onChange={andlechangedate}
                      placeholder="Enter end date"
                    />
                  </div>
                </Box>
              </Box>
              <DialogActions className="submit-main">
                <Button
                  type="button"
                  onClick={handlesubmitdata}
                  variant="contained"
                >
                  Submit
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          onClose={handleClose}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Add Hospital</h6>
            </div>
            <div className="cross-icon" onClick={handleClose}>
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
                minHeight: "350px",
              }}
              className="contact-form"
            >
              <Box>
                <form
                  id="contact-form"
                  className="contact-form"
                  method="post"
                  role="form"
                >
                  <div className="field-set">
                    <label>
                      Hospital Name<span className="text-danger">*</span>
                    </label>
                    <Autocomplete
                      disablePortal
                      options={dataHospital?.map((job) => job.name) || []} // Fallback to empty array
                      onChange={(e, value) => {
                        const selectedCourse = dataHospital?.find(
                          (job) => job.name === value,
                        );
                        const courseId = selectedCourse;
                        setHospitalId(courseId);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Hospital" />
                      )}
                      size="small"
                      style={{
                        backgroundColor:
                          "linear-gradient(181deg, #22c7b8 0%, #0ba6df 72%)",
                        border: "0 !important",
                        borderColor: "transparent",
                      }}
                    />
                  </div>
                  <div className="field-set">
                    <label>
                      Treatment Id<span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Treatment ID"
                      className="form-control"
                      name="treatmentId"
                      required=""
                      value={treatmentId}
                    />
                  </div>
                  <DialogActions className="submit-main">
                    <Button
                      type="submit"
                      onClick={(e) => handlesubmit(e)}
                      variant="contained"
                      disabled={isSubmitting} //✅ disables button while submitting
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
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
          open={open1}
          onClose={handleClose1}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>{edited === true ? "Edit" : "Add"} Appointment</h6>
            </div>
            <div className="cross-icon" onClick={handleClose1}>
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <DialogContent className="main-box view-table-detail">
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
                <form
                  id="contact-form"
                  className="contact-form"
                  method="post"
                  role="form"
                >
                  <div className="field-set">
                    <div>
                      <h6>Appointment will be:</h6>
                      <div className="d-flex gap-3">
                        <div className="radio-on">
                          <label>
                            <input
                              type="radio"
                              name="status"
                              value="online"
                              checked={statuddropdown === "online"}
                              onChange={(e) =>
                                setStatuddropdown(e.target.value)
                              }
                            />
                            Online
                          </label>
                        </div>
                        <div className="radio-on">
                          <label>
                            <input
                              type="radio"
                              name="status"
                              value="offline"
                              checked={statuddropdown === "offline"}
                              onChange={(e) =>
                                setStatuddropdown(e.target.value)
                              }
                            />
                            Offline
                          </label>
                        </div>
                      </div>
                    </div>
                    <label>
                      {" "}
                      Hospital<span className="text-danger">*</span>
                    </label>
                    {/* <Autocomplete
                      disablePortal
                      options={ishospitalArray || []}
                      getOptionLabel={(option) => option.hospital_Name || ""}
                      value={appHospital}
                      onChange={(e, value) => {
                        setAppHospital(value);
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option?.hospital_id === value?.hospital_id
                      }
                      renderInput={(params) => <TextField {...params} />}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          padding: "0px",
                          "&:hover fieldset": {
                            borderColor: "#ced4da",
                          },
                        },
                      }}
                    /> */}
                    <TextField
                      fullWidth
                      value={hospitalData.hospital_Name || ""}
                      onChange={(e) => {
                        const value = e.target.value;

                        const matchedHospital = ishospitalArray.find(
                          (item) => item.hospital_Name === value,
                        );

                        setHospitalData({
                          hospital_Name: value,
                          hospital_email: matchedHospital.hospital_email,
                          hospital_id: matchedHospital
                            ? matchedHospital.hospital_id
                            : "",
                        });
                      }}
                    />
                  </div>
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
                      component="textarea"
                      placeholder="Note"
                      onChange={(e) => setNote(e.target.value)}
                      value={note}
                    />
                    <span style={{ color: "red" }}>
                      {appointErr && !note ? "*Please Enter Your  note" : ""}
                    </span>
                  </div>
                  <div className="field-set">
                    <label>
                      Appointment Date<span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      id="birthday"
                      name="date"
                      placeholder="Appointment Date"
                      className="form-control"
                      onChange={(e) => setDate(e.target.value)}
                      value={
                        date ? new Date(date).toISOString().split("T")[0] : ""
                      }
                      min={new Date().toISOString().split("T")[0]}
                    />

                    <span style={{ color: "red" }}>
                      {appointErr && !date ? "*Please Enter Your date" : ""}
                    </span>
                  </div>
                  {statuddropdown === "offline" ? (
                    <>
                      <div className="field-set">
                        <label>
                          Pickup Time<span className="text-danger">*</span>
                        </label>
                        <input
                          type="time"
                          id="birthday"
                          name="pickup_time"
                          placeholder="pickup_time"
                          className="form-control"
                          onChange={(e) => setPickuptime(e.target.value)}
                          value={pickuptime}
                        />
                        <span style={{ color: "red" }}>
                          {appointErr && !pickuptime
                            ? "*Please Select Pickup Time"
                            : ""}
                        </span>
                      </div>
                      <div className="field-set">
                        <label>
                          Driver Name<span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          id="birthday"
                          name="driver_name"
                          placeholder="Driver Name"
                          className="form-control"
                          onChange={(e) => setDrivername(e.target.value)}
                          value={drivername}
                        />
                        <span style={{ color: "red" }}>
                          {appointErr && !drivername
                            ? "*Please Enter the Driver Name"
                            : ""}
                        </span>
                      </div>
                      <div className="field-set">
                        <label>
                          Driver Contact<span className="text-danger"></span>
                        </label>
                        <input
                          type="number"
                          id="birthday"
                          name="driver_contact"
                          placeholder="Driver Contact"
                          className="form-control"
                          onChange={(e) => setDrivercontact(e.target.value)}
                          value={drivercontact}
                        />
                      </div>
                      <div className="field-set">
                        <label>
                          Vehicle Number<span className="text-danger"></span>
                        </label>
                        <input
                          type="type"
                          id="birthday"
                          name="vehicle_no"
                          placeholder="Vehicle Number"
                          className="form-control"
                          onChange={(e) => setVehicalnumber(e.target.value)}
                          value={vehicalnumber}
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <DialogActions className="submit-main">
                    {!edited && (
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={(e) =>
                          statuddropdown === "offline"
                            ? handlesubmitAppoint(e)
                            : handlesubmitAppoint111(e)
                        }
                      >
                        Submit
                      </Button>
                    )}
                    {edited && (
                      <Button
                        type="button" // 🔥 IMPORTANT
                        variant="contained"
                        color="primary"
                        onClick={handleExtraButton}
                      >
                        Edit Appointment
                      </Button>
                    )}
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
          open={open2}
          onClose={handleClose2}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>
                {attendedeaisledit === true ? "Edit" : "Add"} Attendant Details
              </h6>
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
                <form id="contact-form" className="contact-form">
                  <div className="row">
                    <div className="col-6">
                      <div className="field-set">
                        <label>
                          Name<span className="text-danger">*</span>
                        </label>
                        <div className="upload-input">
                          <input
                            type="text"
                            name="attendant_fullname"
                            className="form-control"
                            value={filesData.attendant_fullname}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="field-set">
                        <label>
                          Attendant Relation
                          <span className="text-danger">*</span>
                        </label>
                        <div className="upload-input">
                          <input
                            type="text"
                            name="attendant_relation"
                            className="form-control"
                            value={filesData.attendant_relation}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <div className="field-set">
                        <label>
                          Country<span className="text-danger">*</span>
                        </label>

                        <Autocomplete
                          options={Countries || []}
                          getOptionLabel={(option) => option?.name || ""}
                          value={
                            Countries?.find(
                              (country) => country.name === filesData.country,
                            ) || null
                          }
                          onChange={(event, newValue) => {
                            setFilesData({
                              ...filesData,
                              country: newValue?.name || "",
                              dial_code: newValue?.dial_code || "",
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Country"
                              size="small"
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="field-set">
                        <label>
                          Attendant Contact
                          <span className="text-danger">*</span>
                        </label>

                        <div className="country-code">
                          <input
                            type="text"
                            className="form-control code-dial"
                            value={filesData.dial_code}
                            disabled
                          />

                          <input
                            type="text"
                            name="attendant_contact"
                            className="form-control code-in"
                            value={filesData.attendant_contact}
                            onKeyPress={handkekeypreees}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="field-set">
                        <label>
                          Attendant Id Proof
                          <span className="text-danger">
                            {attendedeaisledit === true ? "" : "*"}
                          </span>
                        </label>
                        <div className="upload-input">
                          <input
                            type="file"
                            multiple
                            accept="image/*,application/pdf"
                            className="form-control"
                            onChange={(e) =>
                              handleFileChange(e, "Attende_passport")
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="field-set">
                        <label>
                          Attendant Address
                          <span className="text-danger">*</span>
                        </label>
                        <div className="upload-input">
                          <input
                            type="text"
                            name="attendant_address"
                            className="form-control"
                            value={filesData.attendant_address}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogActions className="submit-main">
                    {/* <Button
                      type="submit"
                      onClick={handleKysDetail}
                      variant="contained"
                    >
                      Submit
                    </Button> */}
                    {attendedeaisledit === true ? (
                      <Button
                        type="submit"
                        onClick={editatednde}
                        variant="contained"
                      >
                        Edit Attendant
                      </Button>
                    ) : (
                      <Button onClick={handleKysDetail} variant="contained">
                        Submit
                      </Button>
                    )}
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
          open={dataImperial}
          onClose={dataIwemperial}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Edit Hospital Charge</h6>
            </div>
            <div className="cross-icon" onClick={dataIwemperial}>
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
                      Enter Charge<span className="text-danger">*</span>
                    </label>
                    <input
                      id="w3review"
                      name="setNoteHospital2"
                      className="form-control"
                      placeholder="Charge"
                      onKeyPress={(e) => {
                        handkekeypreees(e);
                      }}
                      onChange={(e) => setNoteHospital2(e.target.value)}
                      value={noteHospital2}
                    />
                  </div>
                  <DialogActions className="submit-main">
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleNothospitalchargeesdata();
                      }}
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
          open={open5}
          onClose={handleClose5}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Add Notes</h6>
            </div>
            <div className="cross-icon" onClick={handleClose5}>
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
                      Notes<span className="text-danger">*</span>
                    </label>
                    <textarea
                      id="w3review"
                      name="discussionNotes"
                      rows="4"
                      cols="50"
                      className="form-control"
                      placeholder="Note"
                      onChange={(e) => setNote2(e.target.value)}
                      value={note2}
                    />
                    <span style={{ color: "red" }}>
                      {noteErr && !note2 ? "Please Enter Your  note" : ""}
                    </span>
                  </div>
                  <div className="field-set">
                    <label>Upload Images</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => setImages([...e.target.files])}
                    />
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
                      onChange={(e) => setDate2(e.target.value)}
                      value={date2}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <span style={{ color: "red" }}>
                      {noteErr && !date2 ? "Please Enter Your  date" : ""}
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
          open={editModalNotes}
          onClose={handleCloseEditModal}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Edit Notes</h6>
            </div>
            <div className="cross-icon" onClick={handleCloseEditModal}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <DialogContent className="main-box">
            <Box
              component="form"
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                editNotes();
              }}
            >
              <div className="field-set">
                <label>
                  Notes<span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Note"
                  onChange={(e) => setNote2(e.target.value)}
                  value={note2}
                />
                <span style={{ color: "red" }}>
                  {noteErr && !note2 ? "Please Enter Your note" : ""}
                </span>
              </div>
              <div className="field-set">
                <label>Upload Images</label>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="form-control"
                  onChange={(e) => setImages([...e.target.files])}
                />
              </div>
              <div className="field-set">
                <label>
                  Date<span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => setDate2(e.target.value)}
                  value={date2}
                  min={date2 || new Date().toISOString().split("T")[0]}
                />
                <span style={{ color: "red" }}>
                  {noteErr && !date2 ? "Please Enter Your date" : ""}
                </span>
              </div>
              <DialogActions className="submit-main">
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
        <ToastContainer />
      </React.Fragment>
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open32}
          onClose={handleclosePerforma}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Add Invoice</h6>
            </div>
            <div className="cross-icon" onClick={handleclosePerforma}>
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
                      Add Performa Invoice<span className="text-danger"></span>
                    </label>
                    <input
                      type="file"
                      id="birthday"
                      name="perfomainvoice"
                      placeholder="Appointment Date"
                      className="form-control"
                      accept=".pdf,image/*"
                      onChange={AddpaymentOnchnage123}
                    />
                  </div>
                  <DialogActions className="submit-main">
                    <Button
                      // type="submit"
                      onClick={() => {
                        handleAddTritmentPaymenttestsubmit();
                      }}
                      variant="contained"
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
          open={open3}
          onClose={handleClose3}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Add Amount</h6>
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
                <form
                  id="contact-form"
                  className="contact-form view-table-detail"
                >
                  <div className="field-set">
                    <label>
                      Paid To <span className="text-danger">*</span>
                    </label>
                    <select
                      placeholder="payment Method"
                      className="form-control"
                      name="paid_to"
                      required
                      onChange={handlefilechangechangeinput}
                    >
                      <option>Select</option>
                      {paidTo.map((item, index) => {
                        return (
                          <>
                            <option value={item._id}>{item.name}</option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="field-set">
                    <label>
                      Paid For <span className="text-danger">*</span>
                    </label>
                    <select
                      placeholder="payment Method"
                      className="form-control"
                      name="paid_for"
                      required
                      onChange={handlefilechange}
                    >
                      <option>Select</option>
                      {datagetapiPaidto.map((item, index) => {
                        return (
                          <>
                            <option value={item._id}>{item.name}</option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div className="field-set">
                    <label>
                      Attach Invoice <span className="text-danger"></span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      name="attachFile"
                      onChange={handleAttachFile}
                    />
                  </div>

                  <div className="field-set">
                    <label>
                      Paid Amount<span className="text-danger">*</span>
                    </label>
                    <div className="fixpricee">
                      <p className="code-dial">USD($)</p>
                      <input
                        type="text"
                        placeholder="paid amount"
                        className="form-control"
                        onKeyPress={handleKeyPress}
                        name="paid_amount"
                        required=""
                        onChange={AddpaymentOnchnage}
                        value={data.paid_amount}
                      />
                    </div>
                  </div>
                  {/* <div>{info.treatment_due_payment}</div> */}
                  <div className="field-set">
                    <label>
                      Payment Method<span className="text-danger">*</span>
                    </label>
                    <select
                      placeholder="payment Method"
                      className="form-control"
                      name="paymentMethod"
                      required=""
                      onChange={AddpaymentOnchnage}
                      value={data.paymentMethod}
                    >
                      <option>Select</option>
                      <option value="Cash">Cash</option>
                      <option value="UPI">Online via UPI</option>
                      <option value="foundation">Foundation</option>
                      <option value="Internet banking">Internet banking</option>
                      <option value="Via Net Banking">Via Net Banking</option>
                      <option value="Credit/Debit Card">
                        Debit Card / Credit Card
                      </option>
                    </select>
                  </div>
                  <div className="field-set">
                    <label>
                      Payment Date<span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      id="birthday"
                      name="payment_Date"
                      placeholder="Appointment Date"
                      className="form-control"
                      onChange={AddpaymentOnchnage}
                      value={data.payment_Date}
                      max={new Date().toISOString().split("T")[0]} // Prevent future date
                    />
                  </div>
                  <div className="field-set">
                    <label>
                      Notes<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="notes"
                      className="form-control"
                      name="notes"
                      required=""
                      onChange={AddpaymentOnchnage}
                      value={data.notes}
                    />
                  </div>
                  <DialogActions className="submit-main">
                    <Button
                      // type="submit"
                      onClick={() => {
                        handleAddTritmentPayment();
                      }}
                      // onClick={(e) => handleAddTritmentPayment(e)}
                      variant="contained"
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
          open={open10}
          onClose={handleClose10}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>{hAndleReport === true ? "Edit" : "Add"} Reports</h6>
            </div>
            <div className="cross-icon" onClick={handleClose10}>
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <DialogContent className="main-box view-table-detail">
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
                <div id="contact-form" className="contact-form">
                  <div className="field-set">
                    <label>
                      Reports Title<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Report Title"
                      className="form-control"
                      name="reportTitle"
                      value={iniData.reportTitle}
                      onChange={handlefilechange}
                    />
                  </div>
                  <div className="field-set">
                    <label>
                      Reports{" "}
                      <span className="text-danger">
                        {hAndleReport === true ? "" : "*"}
                      </span>
                    </label>
                    <input
                      type="file"
                      multiple
                      className="form-control"
                      name="treatmentReport"
                      onChange={handleFileChange1}
                    />
                  </div>
                  <div className="field-set">
                    <label>
                      Treatment Report Date{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={
                        iniData?.treatment_report_date
                          ? iniData.treatment_report_date.split("T")[0]
                          : ""
                      }
                      name="treatment_report_date"
                      required
                      onChange={handlefilechange}
                    />
                  </div>

                  <DialogActions className="submit-main">
                    {hAndleReport === true ? (
                      <Button
                        // type="submit"
                        onClick={handleClickEditReport}
                        variant="contained"
                      >
                        Edit Report
                      </Button>
                    ) : (
                      <Button
                        // type="submit"
                        onClick={handleClickSubmit}
                        variant="contained"
                      >
                        Submit
                      </Button>
                    )}
                  </DialogActions>
                </div>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={openModalDovPlan}
          onClose={closemodaldocumnt}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6> Add Document</h6>
            </div>
            <div className="cross-icon" onClick={closemodaldocumnt}>
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <DialogContent className="main-box view-table-detail">
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
                <div id="contact-form" className="contact-form">
                  <div className="field-set">
                    <label>
                      Document<span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      multiple
                      onChange={handlechangeGdoc}
                    />
                  </div>
                  <DialogActions className="submit-main">
                    <Button onClick={apihitpost} variant="contained">
                      Add Document
                    </Button>
                  </DialogActions>
                </div>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={openGuesthouse}
          onClose={handleCloseguesthouse}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>{isEditGuesthouse === false ? "Add" : "Edit"} Guest House</h6>
            </div>
            <div className="cross-icon" onClick={handleCloseguesthouse}>
              <i class="fa-solid fa-xmark"></i>
            </div>
          </div>
          <DialogContent className="main-box view-table-detail">
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
                <div id="contact-form" className="contact-form">
                  <div className="field-set">
                    <label>
                      Guest House Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder=" Guest House Name"
                      className="form-control"
                      name="guestHouseName"
                      value={formDataGuestHouse.guestHouseName}
                      onChange={handlechangeGuesthouse}
                    />
                  </div>
                  <div className="field-set">
                    <label>
                      Date Range From <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={
                        formDataGuestHouse?.dateRangeFrom
                          ? formDataGuestHouse.dateRangeFrom.split("T")[0]
                          : ""
                      }
                      name="dateRangeFrom"
                      required
                      onChange={handlechangeGuesthouse}
                    />
                  </div>
                  <div className="field-set">
                    <label>
                      Date Range To <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={
                        formDataGuestHouse?.dateRangeTo
                          ? formDataGuestHouse.dateRangeTo.split("T")[0]
                          : ""
                      }
                      name="dateRangeTo"
                      required
                      onChange={handlechangeGuesthouse}
                    />
                  </div>

                  <div className="field-set">
                    <label>
                      Number Of Rooms<span className="text-danger">*</span>
                    </label>
                    <div className="upload-input">
                      <input
                        type="text"
                        className="form-control"
                        name="numberOfRooms"
                        value={formDataGuestHouse.numberOfRooms}
                        onKeyPress={handkekeypreees}
                        onChange={handlechangeGuesthouse}
                      />
                    </div>

                    <div className="field-set">
                      <label>
                        Payment Amount<span className="text-danger">*</span>
                      </label>
                      <div className="upload-input">
                        <div className="fixpricee">
                          <p className="code-dial">USD($)</p>
                          <input
                            type="number"
                            className="form-control code-in"
                            name="paymentAmount"
                            value={formDataGuestHouse.paymentAmount}
                            onKeyPress={handkekeypreees}
                            onChange={handlechangeGuesthouse}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="field-set">
                      <label>
                        Payment Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={
                          formDataGuestHouse?.paymentDate
                            ? formDataGuestHouse.paymentDate.split("T")[0]
                            : ""
                        }
                        name="paymentDate"
                        required
                        onChange={handlechangeGuesthouse}
                      />
                    </div>
                    <div className="field-set">
                      <label>
                        Notes <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={formDataGuestHouse?.notes}
                        name="notes"
                        required
                        onChange={handlechangeGuesthouse}
                      />
                    </div>

                    <div className="field-set">
                      <label>
                        Invoice File{" "}
                        <span className="text-danger">
                          {isEditGuesthouse === true ? "" : "*"}
                        </span>
                      </label>
                      <input
                        type="file"
                        placeholder="payment Method"
                        className="form-control"
                        name="invoiceFile"
                        accept="image/*"
                        required
                        onChange={handlechangeGuesthouse}
                      />
                    </div>
                  </div>

                  <DialogActions className="submit-main">
                    {isEditGuesthouse === true ? (
                      <Button
                        // type="submit"
                        onClick={handleClickGuesthuseedit}
                        variant="contained"
                      >
                        Edit Guest House
                      </Button>
                    ) : (
                      <Button
                        // type="submit"
                        onClick={submitGuestHouseApi}
                        variant="contained"
                      >
                        Add Guest House
                      </Button>
                    )}
                  </DialogActions>
                </div>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={editPatientProfile}
          onClose={EditButtoneditprofileClose}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Upload Profile</h6>
            </div>
            <div className="cross-icon" onClick={EditButtoneditprofileClose}>
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
                <div id="contact-form" className="contact-form">
                  <div className="field-set">
                    <label>
                      Profile <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      placeholder="payment Method"
                      className="form-control"
                      name="patient_Profile"
                      accept="image/*"
                      required
                      onChange={handleFileChange12}
                    />
                  </div>

                  <DialogActions className="submit-main">
                    <Button
                      // type="submit"
                      onClick={() => handleupdateProfile()}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </div>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={openmodalCharge}
          onClose={handleclickclosecharge}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>{isEditT === true ? "Edit" : "Add"} Hospital Charge</h6>
            </div>
            <div className="cross-icon" onClick={handleclickclosecharge}>
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
                <div className="field-set">
                  <label>
                    Service Name<span className="text-danger"></span>
                  </label>
                  <div className="upload-input">
                    <input
                      type="text"
                      className="form-control"
                      name="service_name"
                      value={hospitalCharge.service_name}
                      onChange={addhospitalChare}
                    />
                  </div>
                </div>
                <div className="field-set">
                  <label>
                    Price<span className="text-danger"></span>
                  </label>
                  <div className="upload-input">
                    <div className="fixpricee">
                      <p className="code-dial">USD($)</p>
                      <input
                        type="number"
                        className="form-control code-in"
                        name="price"
                        value={hospitalCharge.price}
                        onKeyPress={handkekeypreees}
                        onChange={addhospitalChare}
                      />
                    </div>
                  </div>
                </div>
                <div className="field-set">
                  <label>
                    Date<span className="text-danger"></span>
                  </label>
                  <div className="upload-input">
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={hospitalCharge.date || ""}
                      onChange={addhospitalChare}
                    />
                  </div>
                </div>
                <DialogActions className="submit-main">
                  {isEditT === true ? (
                    <Button
                      onClick={addchargeapiHedithspital}
                      variant="contained"
                    >
                      Edit Charge
                    </Button>
                  ) : (
                    <Button onClick={addchargeapiHospital} variant="contained">
                      Submit
                    </Button>
                  )}
                </DialogActions>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={openPharmacyModal}
          onClose={handleclickpcloseacycharge}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>{pharmacyadd === true ? "Edit" : "Add"} Pharmacy Charge</h6>
            </div>
            <div className="cross-icon" onClick={handleclickpcloseacycharge}>
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
                <div className="field-set">
                  <label>
                    Pharmacy Name<span className="text-danger"></span>
                  </label>
                  <div className="upload-input">
                    <input
                      type="text"
                      className="form-control"
                      name="service_name"
                      value={pharmacyvalue.service_name}
                      onChange={addhosppharmacyhare}
                    />
                  </div>
                </div>
                <div className="field-set">
                  <label>
                    Price<span className="text-danger"></span>
                  </label>
                  <div className="upload-input">
                    <div className="fixpricee">
                      <p className="code-dial">USD($)</p>
                      <input
                        type="number"
                        className="form-control code-in"
                        name="price"
                        value={pharmacyvalue.price}
                        onKeyPress={handkekeypreees}
                        onChange={addhosppharmacyhare}
                      />
                    </div>
                  </div>
                </div>
                <div className="field-set">
                  <label>
                    Date<span className="text-danger"></span>
                  </label>
                  <div className="upload-input">
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={pharmacyvalue.date || ""}
                      onChange={addhosppharmacyhare}
                    />
                  </div>
                </div>
                <DialogActions className="submit-main">
                  {pharmacyadd === true ? (
                    <Button onClick={editpaharmacy} variant="contained">
                      Edit Charge
                    </Button>
                  ) : (
                    <Button onClick={addchargeapipharmacy} variant="contained">
                      Submit
                    </Button>
                  )}
                </DialogActions>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={notesModal}
          onClose={handleCloseNotesmodal}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Edit Notes</h6>
            </div>
            <div className="cross-icon" onClick={handleCloseNotesmodal}>
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
                      Notes<span className="text-danger">*</span>
                    </label>
                    <div className="upload-input">
                      <input
                        type="text"
                        className="form-control"
                        name="note"
                        value={nodaestInput.note}
                        onChange={handlechangenotesdata}
                      />
                    </div>
                  </div>
                  <DialogActions className="submit-main">
                    <Button
                      type="submit"
                      onClick={(e) => handleKysDetailnotes(e)}
                      variant="contained"
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
          open={popupopenattande}
          onClose={handlecliclosepup}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Assign Attendant</h6>
            </div>
            <div className="cross-icon" onClick={handlecliclosepup}>
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
                      Select Attendent<span className="text-danger">*</span>
                    </label>
                    <div className="upload-input">
                      <Autocomplete
                        multiple
                        options={attandantnew}
                        disableCloseOnSelect
                        getOptionLabel={(option) =>
                          option.attendant_fullname || ""
                        }
                        onChange={(event, newValue) => {
                          const ids = newValue.map((item) => item._id); // 👈 extract _id
                          setSelectedAttendants(ids); // 👈 sirf IDs store
                        }}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>
                            <Checkbox
                              checked={selected}
                              style={{ marginRight: 8 }}
                            />
                            {option.attendant_fullname}
                          </li>
                        )}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Attendants" />
                        )}
                      />
                    </div>
                  </div>
                  <DialogActions className="submit-main">
                    <Button onClick={handleassignAtendent} variant="contained">
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
      <React.Fragment>
        <Dialog
          open={openAppointment}
          onClose={handleCloseAppointment}
          fullWidth
          maxWidth="sm"
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Add Appointment</h6>
            </div>
            <div className="cross-icon" onClick={handleCloseAppointment}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
          <DialogContent className="view-table-detail">
            <Box className="contact-form">
              <div className="field-set mb-2">
                <FormControl fullWidth size="small">
                  <label>Select Hospital</label>
                  <Select
                    value={appointmentData.hospital_id || ""}
                    onChange={(e) => {
                      const selectedId = e.target.value;

                      const selectedHospital = hospitalList.find(
                        (item) => item.id === selectedId,
                      );

                      setAppointmentData((prev) => ({
                        ...prev,
                        hospital_id: selectedId,
                        hospitalName: selectedHospital?.name || "",
                        hospital_email: selectedHospital?.email || "",
                      }));
                    }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 250,
                        },
                      },
                    }}
                  >
                    {hospitalList.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="field-set">
                <label>Health Issue</label>
                <input
                  type="text"
                  name="health_issue"
                  className="form-control"
                  value={appointmentData.health_issue}
                  onChange={handleAppointmentChange}
                />
              </div>
              <div className="field-set">
                <label>Date</label>
                <span className="text-danger">*</span>
                <input
                  type="date"
                  name="appointment_Date"
                  className="form-control"
                  value={appointmentData.appointment_Date}
                  onChange={handleAppointmentChange}
                />
              </div>
              <div className="field-set">
                <label>Time</label>
                <span className="text-danger">*</span>
                <input
                  type="time"
                  name="appointment_Time"
                  className="form-control"
                  value={appointmentData.appointment_Time}
                  onChange={handleAppointmentChange}
                />
              </div>
              <div className="field-set">
                <label>Notes</label>
                <span className="text-danger">*</span>
                <textarea
                  name="Notes"
                  className="form-control"
                  value={appointmentData.Notes}
                  onChange={handleAppointmentChange}
                />
              </div>
              <div className="field-set">
                <label>
                  Upload Reports / Documents{" "}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    setImages(files);
                  }}
                />
                {images.length > 0 && (
                  <div style={{ marginTop: "10px" }}>
                    {images.map((file, index) => (
                      <div key={index} style={{ fontSize: "12px" }}>
                        📄 {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <DialogActions className="submit-main">
                <Button onClick={handleCloseAppointment}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmitAppointment}>
                  Submit
                </Button>
              </DialogActions>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </>
  );
}
export default PatientDetail;
