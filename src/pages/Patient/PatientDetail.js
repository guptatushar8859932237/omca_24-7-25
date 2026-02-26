import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { GetPatientTreatments } from "../../reducer/PatientTreatmentSlice";
import { AddHospitalForPatient } from "../../reducer/PatientTreatmentSlice";
import { GetAllHositalData } from "../../reducer/HospitalSlice";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
import { AppointmentForPatient } from "../../reducer/PatientTreatmentSlice";
import {
  AdminBaseUrl,
  base,
  baseu11,
  baseurl,
  image,
} from "../../Basurl/Baseurl";
import { GetAllTreatment } from "../../reducer/TreatmentSlice";
import { ExtraServices } from "../../reducer/PatientTreatmentSlice";
import Select from "@mui/material/Select";
import moment from "moment";
import axios from "axios";
import { AddNewTretmentPayment } from "../../reducer/PatientTreatmentSlice";
import { FaPen } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import avtar from "../../img/avtarImg.jpg";
import {
  Avatar,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditPatientTreatment from "./EditPatientTreatment";
function PatientDetail() {
  const navigate = useNavigate();
  const [seekerStatus, setSeekerStatus] = React.useState({});
  const [treatmentData, setTreatmentData] = useState([]);
  const [pickuptime, setPickuptime] = useState("");
  const [vehicalnumber, setVehicalnumber] = useState("");
  const [images, setImages] = useState([]);
  const [treatemntData1, setTreatemntData1] = useState([]);
  const [errors, setErrors] = useState({});
  const [drivername, setDrivername] = useState("");
  const [notesID, setNotesID] = useState("");
  const [drivercontact, setDrivercontact] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const [treatmentNamePassport, setTreatmentNamePassport] = useState("");
  const [value1, setValue1] = useState("");
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

  const [attendId, setAttendId] = useState("");

  const location = useLocation();
  const dispatch = useDispatch();
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
  const [notesModal, setNotesModal] = useState(false);
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
  const [date, setDate] = useState();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [hospitalId, setHospitalId] = useState("");
  const [valuedata, setValuedata] = useState("");
  const [treatmentId, setTreatmentId] = useState("");
  const [hospitalcharge, sethospitalharge] = useState("");
  const [hospitlID, setHospitlID] = useState([]);
  const [ishospitalArray, setIShospitalArray] = useState([]);
  const [note2, setNote2] = useState("");
  const [activeSubTab, setActiveSubTab] = useState("details");
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(null);
  const [mainTab, setMainTab] = useState("treatment-plans");
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
  const [gettreatmentserID, setGettreatmentserID] = useState("");
  const [serviceData, setServiceData] = useState([]);
  const [payment_details, setPayment_details] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [chkservice, setChkservice] = useState([]);
  const [blogErr, setBlogErr] = useState(false);
  const [editPatientProfile, setEditPatientProfile] = useState(false);
  const [appointErr, setAppointErr] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [oeditappp, setOeditappp] = useState(false);
  const [treatmentuser, setTreatmentuser] = useState([]);
  const [noteErr, setNoteErr] = useState(false);
  const [data, setData] = useState({
    paid_amount: "",
    paymentMethod: "",
    payment_Date: "",
  });
  useEffect(() => {
    gtdatareportsdata();
    getextraservice();
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
      console.log("Fetched Extra Services:", extraServices); // 👈 cleaner log
    } catch (error) {
      console.error("Error fetching extra services:", error);
      throw error;
    }
  };
  const AddpaymentOnchnage = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const ServiceData2 = useSelector((state) => state.Service.Service);
  const { hospital } = useSelector((state) => state.hospital);
  const { Treatment } = useSelector((state) => state.Treatment);
  useEffect(() => {
    dispatch(GetAllTreatment());
  }, [dispatch]);
  useEffect(() => {
    dispatch(GetAllHositalData());
    console.log(error, hospital);
  }, [dispatch]);
  useEffect(() => {
    dispatch(GetPatientTreatments({ id: location.state.patientId }));
  }, [dispatch, location.state.patientId]);
  useEffect(() => {
    if (PatientTreatments) {
      setIspatient(PatientTreatments);
      console.log(PatientTreatments.treatments);
      setTretment(PatientTreatments.treatments || []);
      setKyc(PatientTreatments.Kyc_details);
      setNotes(PatientTreatments.discussionNotes);
      setPayment_details(PatientTreatments.payment_details);
      setChkservice(PatientTreatments.services);
    }
  }, [PatientTreatments]);
  console.log(chkservice);
  const handleClose = () => {
    sethospitalharge("");
    setOpen(false);
  };
  const handleClickOpen = (e, tretmentId) => {
    setOpen(true);
    setTreatmentId(tretmentId);
  };
  const handleClickOpen5 = (e, enq) => {
    setOpen5(true);
    setEnqId(enq);
  };
  const handleClose5 = () => {
    setOpen5(false);
  };
  const handleClickOpen1 = (e, tretmentId, listhospital) => {
    console.log(
      "Asdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsd",
      e.target.value,
      treatmentId,
      listhospital,
    );
    setEdited(false);
    setOpen1(true);
    setTreatmentId(tretmentId);
    setIShospitalArray(listhospital);
  };
  const handleClickOpenNotes = (e, tretmentId, listhospital) => {
    console.log(e.target.value, treatmentId, listhospital);
    setOpen5(true);
    setOpenNotes(true);
    setTreatmentId(tretmentId);
    setIShospitalArray(listhospital);
  };
  const handleClickOpen2 = (e, tretmentId, listhospital) => {
    setOpen2(true);
  };
  const handleClickOpen3 = (e, tretmentId) => {
    console.log(tretmentId);
    setOpen3(true);
    setTreatmentId(tretmentId);
  };
  const handleClickOpenPerforma = (e, tretmentId) => {
    console.log(e, tretmentId);
    setOpen32(true);
    setTreatmentId(tretmentId);
  };

  const handleclosePerforma = () => {
    setOpen32(false);
  };
  const handleClickOpen10 = (e, tretmentId) => {
    console.log(tretmentId);
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
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose3 = () => {
    setOpen3(false);
  };
  const handleClose10 = () => {
    setOpen10(false);
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
        console.log(response.data.services);
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
  }, []);

  const handlesubmitdata = async () => {
    const servipostdata = {
      services: {
        serviceId: valuedata,
        price: data.price,
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
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        Swal.fire("Service Added successfully!", "", "success");
      }
    } catch (error) {
      console.log(error);
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
    console.log(item, treatmentId.treatment_id);
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
      console.log(
        "ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
        response.data.data,
      );
    } catch (error) {
      console.log("getting error");
    }
  };
  useEffect(() => {
    gettreatment();
  }, [ispatient?.patientId]);
  const gettreatment = async () => {
    console.log(ispatient?.patientId, "id");
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
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setBlogErr({ hospitalcharge: false });
    if (!hospitalcharge) {
      setBlogErr((prev) => ({ ...prev, hospitalcharge: true }));
      setIsSubmitting(false);
      return;
    }
    const result = await dispatch(
      AddHospitalForPatient({
        id: location.state.patientId,
        hospitalId: hospitalId,
        treatmentId: treatmentId,
        hospital_charge: hospitalcharge,
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
          gtdatareportsdata();
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
      appHospital: false,
      hospitalcharge: false,
    });
    let hasError = false;
    if (!appHospital) {
      setAppointErr((prev) => ({ ...prev, appHospital: true }));
      hasError = true;
    }
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
          hospitalId: appHospital,
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
      appHospital: false,
    });
    let hasError = false;
    if (!appHospital) {
      setAppointErr((prev) => ({ ...prev, appHospital: true }));
      hasError = true;
    }
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
          hospitalId: appHospital,
          treatment_id: treatmentId,
          note: note,
          mode: statuddropdown,
          appointment_Date: date,
        }),
      ).unwrap();
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
  // const [filesData, setFilesData] = useState({});
  const getdataApi = async () => {
    try {
      const rresponse = await axios.post(`${AdminBaseUrl}hospital_list`);
      console.log("yyyyyyyyyyyyyyyy", rresponse.data.data);
      if (rresponse.data.success === "true") {
        setDataHospital(rresponse.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdataApi();
  }, []);
  // const onChangeFile = (e, fieldName) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   if (fieldName === "photo" && fieldName === "Attende_photo") {
  //     const isImage = file.type.startsWith("image/");
  //     if (!isImage) {
  //       alert("Please upload an image file only for photo.");
  //       return;
  //     }
  //   }
  //   setFilesData((prevState) => ({
  //     ...prevState,
  //     [fieldName]: file,
  //   }));
  // };
  const handleKysDetail = async (e) => {
    e.preventDefault();

    const {
      attendant_fullname,
      attendant_relation,
      attendant_contact,
      Attende_passport,
      Attende_photo,
    } = filesData;

    // ✅ Mandatory Validation
    if (
      !attendant_fullname?.trim() ||
      !attendant_relation?.trim() ||
      !attendant_contact?.trim() ||
      !Attende_passport ||
      !Attende_photo
    ) {
      Swal.fire("All fields are mandatory!", "", "warning");
      return;
    }

    const formData = new FormData();

    formData.append("attendant_fullname", attendant_fullname);
    formData.append("attendant_relation", attendant_relation);
    formData.append("attendant_contact", attendant_contact);
    formData.append("attendant_passport", Attende_passport);
    formData.append("attendant_image", Attende_photo);

    try {
      const response = await axios.post(
        `${baseurl}addAttendeeDetails/${attendId}`,
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
        Swal.fire("Attendant  Details Added Successfully!", "", "success");
        // Optional: Reset form
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilesData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image for photo only
    if (fieldName === "Attende_photo") {
      if (!file.type.startsWith("image/")) {
        Swal.fire("Please upload image file only!", "", "warning");
        return;
      }
    }

    setFilesData((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
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
    console.log("Selected Services:", selectedServices);
    console.log("Previous Services (chkservice):", chkservice);
    console.log("All Services Sent to API:", allServices);
  };
  const handleNotesdata = (e) => {
    e.preventDefault();
    setNoteErr({
      note2: false,
      date2: false,
    });

    if (!note2) {
      setAppointErr((prevState) => ({ ...prevState, note2: true }));
    }
    if (!date2) {
      setAppointErr((prevState) => ({ ...prevState, date2: true }));
    }
    if (!note2 || !date2) {
      return;
    }
    axios
      .post(`${baseurl}add_treatment_notes/${treatmentId}`, {
        note: note2,
        date: date2,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setOpen5(false);
          Swal.fire("Success", "Notes added successfully!", "success");
          dispatch(GetPatientTreatments({ id: location.state.patientId }));
        }
        setNote2("");
        setDate2("");
        setNoteErr(false);
      })
      .catch((error) => {
        setOpen5(false);
        console.log(error);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };
  //   const handleAddTritmentPayment = async (e) => {
  //     e.preventDefault();
  //  if (!treatmentId) {
  //     Swal.fire("Error", "Treatment ID missing", "error");
  //     return;
  //   }
  //     try {
  //       await dispatch(
  //         AddNewTretmentPayment({
  //           id: treatmentId,
  //           paid_amount: data.paid_amount,
  //           paymentMethod: data.paymentMethod,
  //           payment_Date: data.payment_Date,
  //         }),
  //       ).unwrap();

  //       setOpen3(false);
  //       Swal.fire("Success!", "Payment Details Added Successfully!", "success");
  //       dispatch(GetPatientTreatments({ id: location.state.patientId }));
  //       setTreatmentId("");
  //       setData("");
  //     } catch (err) {
  //       const errorMessage =
  //         typeof err === "string" ? err : err?.message || "Something went wrong";

  //       // ✅ STEP 1: close modal
  //       setOpen3(false);

  //       // ✅ STEP 2: show error swal
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: errorMessage,
  //         confirmButtonText: "OK",
  //       }).then(() => {
  //         // ✅ STEP 3: reopen modal after OK
  //         setOpen3(true);
  //       });
  //     }
  //   };
  const handleAddTritmentPayment = async (e) => {
    // e.preventDefault();

    // if (!treatmentId) {
    //   Swal.fire("Error", "Treatment ID missing", "error");
    //   return;
    // }

    try {
      await dispatch(
        AddNewTretmentPayment({
          id: treatmentId || selectedTreatmentId,
          paid_amount: data?.paid_amount,
          paymentMethod: data?.paymentMethod,
          payment_Date: data?.payment_Date,
        }),
      ).unwrap();

      setOpen3(false);

      Swal.fire("Success!", "Payment Details Added Successfully!", "success");

      if (location.state?.patientId) {
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
      }

      setTreatmentId("");

      // ✅ reset properly
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
    console.log(event.target, id);
    const { value } = event.target;
    console.log(seekerStatus);
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
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeDetails = async (event, id) => {
    try {
      console.log(event.target, id);
      const { value } = event.target;
      console.log(seekerStatus);
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
    console.log(info);
    if (!acc[info.treatment_id]) {
      acc[info.treatment_id] = [];
    }
    acc[info.treatment_id].push(info);
    return acc;
  }, {});
  console.log("cccccccccccccccccccccccccccccccccccccccccccc", groupedPayments);
  const penModal = (a, b) => {
    console.log(a, b);
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
      console.log(response.data, "treatment data");
      setServiceData(response.data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };
  console.log(ServiceData2, loading, error);
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
  const getapicall = (getapicall) => {
    axios
      .get(`${baseurl}get_unadded_services_for_treatment/${getapicall}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(
          "tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt",
          response.data.availableServices,
        );
        setUndadedservice(response.data.availableServices);
      })
      .catch((error) => {
        console.error("Error fetching unadded services:", error);
      });
  };

  const handlefilechange = (e) => {
    const { name, value } = e.target;
    setIniData({ ...iniData, [name]: value });
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
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/pdf",
    ];

    if (!allowedTypes.includes(file.type)) {
      Swal.fire("Only JPG, PNG, or PDF files are allowed.");
      return;
    }

    setImagefile(file); // store in state
  };

  const handleClickSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("reportTitle", iniData.reportTitle);
      formData.append("treatmentReport", imagefile);
      formData.append("treatment_report_date", iniData.treatment_report_date);
      formData.append("platform", 1);

      const response = await axios.post(
        `${baseurl}addReports/${treatmentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.data?.success) {
        handleClose10();
        gtdatareportsdata();

        setTimeout(() => {
          Swal.fire("Success", "Report Added Successfully!", "success");
        }, 300);
      } else {
        handleClose10();

        setTimeout(() => {
          Swal.fire(
            "Error",
            response.data?.message || "Failed to add report",
            "error",
          );
        }, 300);
      }
    } catch (error) {
      handleClose10();

      setTimeout(() => {
        if (error.response) {
          Swal.fire(
            "Error",
            error.response.data?.message || "Server error",
            "error",
          );
        } else if (error.request) {
          Swal.fire("Network Error", "Server not responding", "error");
        } else {
          Swal.fire("Error", error.message, "error");
        }
      }, 300);
    }
  };

  const handleopenNotesModal = (id) => {
    console.log(notes);
    const response = notes.filter((item) => {
      return item.id === id;
    });
    console.log(response[0].date);
    setNodaestInput(response[0]);
    console.log(id);
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
    } catch (error) {
      console.log(error);
    }
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
        console.log(response.data.data, "ldsgkfffffffffffffffffffffffffffff");
        setTreatmentData(response.data.data);
        setReportdataget(response.data.data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handledelete = async (info, item) => {
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
        `${baseurl}deleteTreatmentHospital/${info.treatment_id}/${item.hospital_id}`,
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

  const handlesubmitdataserviceEdit = async () => {
    console.log("Type:", typeof data.price);
    const payload = {
      _id: data._id,
      duration: data.duration,
      endTime: data.endTime,
      price: Number(data.price),
      service_type: data.service_type,
      serviceId: data.serviceId,
      serviceName: data.serviceName,
      startTime: data.startTime,
    };
    console.log(data);
    try {
      const response = await axios.put(
        `${baseurl}edit_patient_extra_service/${treatmentIDservice}/${data.serviceId}`,
        payload, // (agar body bhejni hai)
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data?.success) {
        hadnlcecEcloseeModal();
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
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
      console.log("error", error);

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
            swalContainer.style.zIndex = "1500"; // MUI Dialog se zyada
          }
        },
      });
    }
  };
  const handledeltePatientserveice = async (a, b, index) => {
    console.log(a, b, index);
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
        `${baseurl}delete_patient_extra_service/${b.treatment_id}/${index}`,
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
    console.log(item.appointment_Date);
    setAppointmentid(item.appointmentId);
    setEdited(true);
    setOpen1(true);
    setEditData(item);
    setStatuddropdown(item.mode);
    setNote(item.disease_name || "");
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
  const handleClose1editapp = () => {
    setOeditappp(false);
  };
  const handleclickeditdelete = async (item) => {
    console.log(item.appointmentId);
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
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        Swal.fire(
          "Deleted!",
          response.data.message || "Appointment deleted successfully",
          "success",
        );
      }
    } catch (error) {
      console.log("error", error);

      Swal.fire(
        "Error",
        error?.response?.data?.message || "Unable to delete appointment",
        "error",
      );
    }
  };

  const handleExtraButton = async () => {
    try {
      // 🔹 date ko YYYY-MM-DD format me convert
      const formattedDate = date
        ? new Date(date).toISOString().split("T")[0]
        : "";

      const payload = {
        hospitalId: appHospital,
        note: note,
        appointment_Date: formattedDate, // ✅ formatted date
        mode: statuddropdown,

        ...(statuddropdown === "offline" && {
          pickup_time: pickuptime,
          driver_name: drivername,
          driver_contact: drivercontact,
          vehicle_no: vehicalnumber,
        }),
      };

      console.log("Edit Payload:", payload);

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
        dispatch(GetPatientTreatments({ id: location.state.patientId }));

        // reset form
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
      console.log(error);
      Swal.fire("Error", "Failed to download excel file", "error");
    }
  };
  const EditButton = (a, b) => {
    console.log(a, b);
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
    const payload = {
      note: note2,
      date: date2,
    };
    try {
      const response = await axios.put(
        `${baseurl}edit_treatment_note/${treatmentIDservice}/${notesID}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      if (response.data.success) {
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
      console.log(error);
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
    console.log(a, b);
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
      console.log(error);
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
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Extra service deleted successfully",
          timer: 1500,
          showConfirmButton: false,
        });

        // 🔁 Refresh data (example)
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
    console.log(dataStore);
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
    } catch (error) {
      console.log(error);
    }
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
    formData.append("notes", value1 || "");
    images.forEach((file) => {
      formData.append("reports", file);
    });

    try {
      const response = await axios.post(
        `${baseurl}addTreatmentPlan`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
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
  // const handleAddTritmentPaymenttestsubmit =async ()=>{
  //   try {
  //     console.log(dataPerforma)
  //     const formData = new FormData()
  //     const response = await axios.post(`${baseurl}performainvoice`,formData, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",
  //         },
  //       })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
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
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed!",
        text:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };
  const AddpaymentOnchnage123 = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Allowed types
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

    // File type validation
    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF or Image files are allowed!");
      e.target.value = null;
      return;
    }

    // File size validation (5MB max)
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("File size must be less than 5MB");
      e.target.value = null;
      return;
    }

    console.log("Valid file:", file);

    // Agar state me store karna ho:
    setDataPerforma((prev) => ({
      ...prev,
      perfomainvoice: file,
    }));
  };

  const getTreatmentPlan = async () => {
    const payload = {
      patientId: location.state.patientId,
    };
    try {
      const response = await axios.post(
        `${baseurl}getTreatmentPlans?patientId=${location.state.patientId}`,
      );
      console.log(response.data);
      if (response.data.success) {
        setTreatemntData1(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleclickApprove = (hospitalids, b) => {
    console.log(hospitalids, b);
  };
  const approveReject = async (info, hospitalId, status) => {
    const payload = { status };
    try {
      const response = await axios.put(
        `${baseurl}updateHospitalStatus/${info._id}/${hospitalId}`,
        payload,
      );
      if (response?.data?.success) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: `Hospitals approved successfully`,
          confirmButtonText: "OK",
        });
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

  const handleclickEdAppointment = (a) => {
    console.log(a);
    navigate("/Admin/Edit-patient-treatment", {
      state: { data: a, patientid: location.state.patientId },
    });
  };

  const EditButtoneditprofile = (id) => {
    console.log(id);
    setEditPatientProfile(true);

    //  await dispatch(
    //           EditPatientType({
    //             id: ispatient.patientId,
    //             data: formData,
    //           }),
    //         ).unwrap();

    //         Swal.fire(
    //           "Success!",
    //           "Patient updated successfully",
    //           "success",
    //         );
    //         navigate("/Admin/patients");
  };

  const EditButtoneditprofileClose = () => {
    setEditPatientProfile(false);
  };

  // const handleupdateProfile =async()=>{
  //   const formData = new FormData()
  //   formData.append("patient_Profile",imagefile)
  //   try {
  //     const response = await axios.put(`${baseurl}update_patient/${location.state.patientId}`,formData, {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //             "Content-Type": "multipart/form-data",
  //           },
  //         })
  //         if(response.data.success){
  //           console.log(response.data)
  //           setImagefile(null)
  //         }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
            // ❌ Content-Type manually set karne ki zarurat nahi hoti
            // Browser automatically set karega with boundary
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
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: error?.response?.data?.message || "Something went wrong",
      });
    }
  };

  const handleclickAttandpDetails = async (id) => {
    setAttendId(id);
    console.log(id);
    try {
      const response = await axios.get(`${baseurl}getAttendeeDetails/${id}`);
      setTreatmentNamePassport(response.data);
      if (response.data.success) {
        console.log(response.data.data);
        setPassportDetails(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handkekeypreees =(e)=>{
  //   if(e.charcode)
  // }
  const handkekeypreees = (e) => {
    const charCode = e.charCode;

    // 48–57 are ASCII codes for 0–9
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
  };

  const handledeedit = (a, b) => {
    console.log(a, b);
    setTreatmentIDa(a);
    setDataImperial(true);
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
        // dispatch(getTreatmentPlan)
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

  const getSelectedTreatmentName = () => {
    return getSelectedTreatmentInfo()?.treatment_name || "";
  };

  const handleMainTabChange = (tab) => {
    setMainTab(tab);
    setSelectedTreatmentId(null);
    setActiveSubTab("details");
  };

  const handleBackToTreatmentList = () => {
    setSelectedTreatmentId(null);
    setActiveSubTab("details");
  };

  const handleAction = (e, type, info) => {
    const tId = info.treatment_id;
    const hDetails = info.Hospital_details;
    const status = info.treatment_status;

    setSelectedTreatmentId(tId);
    setTreatMentNAem(status);

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
      handleClickOpen1(e, tId, hDetails);
    } else if (type === "notes") {
      handleClickOpenNotes(e, tId, hDetails);
    } else if (type === "services") {
      penModal(info, tId);
    }
  };

  const handleclickdeleteplan =(item)=>{
    console.log(item)
  }
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
            <div className="row align-items-center">
              <div className="col-md-6">
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
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="viewbtn"
                          onClick={() => {
                            const file = kys[0].id_proof;
                            if (file) {
                              window.open(
                                `https://sisccltd.com/omca_crm/${file}`,
                                "_blank",
                              );
                            } else {
                              Swal.fire(
                                "error",
                                "Document not available",
                                "Error",
                              );
                            }
                          }}
                        >
                          View Patient ID
                        </button>
                        {/* <button
                          type="button"
                          className="viewbtn"
                          onClick={() => {
                            const file = kys[0].passport;

                            if (file) {
                              window.open(
                                `https://sisccltd.com/omca_crm/${file}`,
                                "_blank",
                              );
                            } else {
                              alert("Document not available");
                            }
                          }}
                        >
                          View Passport
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 patinfomain">
                <div className="user-info-main">
                  <p>
                    <i class="fa-solid fa-phone"></i>
                    <span>{ispatient?.contact_no}</span>
                  </p>
                  <p>
                    <i class="fa-solid fa-phone"></i>
                    <span>{ispatient?.emergency_contact_no}</span>
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
                <a className={`nav-link ${mainTab === "treatment-plans" ? "active" : ""}`} href="#about-cont123" data-toggle="tab"
                  onClick={() => handleMainTabChange("treatment-plans")}>Treatment Plans{" "}
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${mainTab === "treatment" ? "active" : ""}`} href="#about-cont" data-toggle="tab" onClick={() => handleMainTabChange("treatment")}>
                  Treatment{" "}
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className={`tab-pane ${mainTab === "treatment-plans" ? "show active" : ""}`} id="about-cont123">
                <div className="main-tab-hd justify-content-end">
                  <div className="">
                    <button onClick={PlanTreatmentPopUp} className="add-button">
                      <span><i className="fa fa-plus"></i></span>{" "}Add Treatment Plan
                    </button>
                  </div>
                </div>
                <div className="row gx-3 gy-3">
                  <div className="col-md-12">
                    {treatemntData1?.length === 0 ? (
                      "No Treatment Plan Added for this patients"
                    ) : (
                      <>
                        {treatemntData1?.map((info, index) => {
                          console.log(info, "array data");
                          return (
                            <div className="card-box" key={index}>
                              <div className="treatment-header">
                                <div className="d-flex justify-content-between">
                                  <div>
                                <h5>{info?.treatment?.name}</h5>
                                  </div>
                                  <div>
                                {/* <i onClick={()=>{handleclickdeleteplan(info?.treatment)}} className="fa fa-trash text-danger me-2"></i> */}
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
                                  <div className="col-md-2">
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
                                              View Document
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
                                  <div className="col-md-2">
                                    <div className="">
                                      <h5>Notes</h5>
                                      <p className="notes-text">
                                        {info?.notes || "No Notes Added"}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-md-2">
                                    <div className="">
                                      <h5>Action</h5>
                                      <div className="action-icon">
                                        <i className="fa-solid fa-trash" onClick={() => EditDelete(index, info)}></i>
                                      </div>
                                    </div>
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
              <div className={`tab-pane ${mainTab === "treatment" ? "show active" : ""}`} id="about-cont">
                {activeSubTab === "details" && (
                  <div>
                    <div className="main-tab-hd">
                      <div className="all-hd">
                        <h6>All Treatments</h6>
                      </div>
                      <div className="">
                        <button
                          onClick={PatientDetailButton}
                          className="add-button"
                        >
                          <span>
                            <i className="fa fa-plus"></i>
                          </span>{" "}
                          Add Treatment
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        {tretment?.length === 0 ? (
                          "No Treatment  Added for this patients"
                        ) : (
                          <>
                            {tretment?.map((info, index) => {
                              console.log(info, "array data");
                              return (
                                <div className="card-box">
                                  <div className="treat-card">
                                    <div className="sectabmain">
                                      <div className="treat-id">
                                        <h3
                                          onClick={() => {
                                            // Clicking in the list navigates to details sub-tab as per user request
                                            setActiveSubTab("details");
                                            setSelectedTreatmentId(
                                              info.treatment_id,
                                            );
                                          }}
                                          style={{ cursor: "pointer" }}
                                        >
                                          {info.treatment_name}{" "}
                                        </h3>
                                        <p className="mb-0">{info.treatment_status}</p>
                                      </div>
                                      <div className="">
                                        <ul className="nav nav-tabs treat-tabs">
                                          <li className="nav-item">
                                            <button
                                              className={`nav-link ${activeSubTab === "attendant" && selectedTreatmentId === info.treatment_id ? "active" : ""}`}
                                              onClick={(e) =>
                                                handleAction(
                                                  e,
                                                  "attendant",
                                                  info,
                                                )
                                              }
                                            >
                                              Add Attendant
                                            </button>
                                          </li>
                                          <li className="nav-item">
                                            <button
                                              className={`nav-link ${activeSubTab === "payment" && selectedTreatmentId === info.treatment_id ? "active" : ""}`}
                                              onClick={(e) =>
                                                handleAction(e, "payment", info)
                                              }
                                            >
                                              Payment Details
                                            </button>
                                          </li>
                                          <li className="nav-item">
                                            <button
                                              className={`nav-link ${activeSubTab === "reports" && selectedTreatmentId === info.treatment_id ? "active" : ""}`}
                                              onClick={(e) =>
                                                handleAction(e, "reports", info)
                                              }
                                            >
                                              Reports
                                            </button>
                                          </li>
                                          {!info?.Hospital_details?.some(
                                            (item) => item.hospital_Name,
                                          ) && (
                                              <li className="nav-item">
                                                <button
                                                  className="nav-link"
                                                  onClick={(e) =>
                                                    handleAction(
                                                      e,
                                                      "hospital",
                                                      info,
                                                    )
                                                  }
                                                >
                                                  + Add Hospital
                                                </button>
                                              </li>
                                            )}

                                          <li className="nav-item">
                                            <button
                                              className="nav-link"
                                              onClick={(e) =>
                                                handleAction(
                                                  e,
                                                  "appointment",
                                                  info,
                                                )
                                              }
                                            >
                                              + Add Appointment
                                            </button>
                                          </li>
                                          <li className="nav-item">
                                            <button
                                              className="nav-link"
                                              onClick={(e) =>
                                                handleAction(e, "notes", info)
                                              }
                                            >
                                              + Add Notes
                                            </button>
                                          </li>
                                          <li className="nav-item">
                                            <button
                                              className="nav-link"
                                              onClick={(e) =>
                                                handleAction(
                                                  e,
                                                  "services",
                                                  info,
                                                )
                                              }
                                            >
                                              + Add Services
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <hr></hr>
                                  <div className="row gx-3 gy-3">
                                    <div className="col-md-4">
                                      <div className="card patientreat">
                                        <div className="card-header service-list">
                                          <div className="d-flex">
                                            <div>
                                              <h6>Treatment</h6>
                                            </div>
                                            <div>
                                              <h6
                                                className="mx-2"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                  handleclickEdAppointment(
                                                    info,
                                                  );
                                                }}
                                              >
                                                <i className="fa-solid fa-pen-to-square"></i>
                                              </h6>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="card-body">
                                          <ul className="trment-list">
                                            <li>
                                              <div className="row">
                                                <div className="col-md-12">
                                                  <div className="para-main-div">
                                                    <p>
                                                      Name:{" "}
                                                      {info?.treatment_name}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="row">
                                                <div className="col-md-12">
                                                  <div className="para-main-div">
                                                    <p>
                                                      Charge:{" "}
                                                      {
                                                        info.treatment_course_fee
                                                      }{" "}
                                                      {info.duration}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="row">
                                                <div className="col-md-12">
                                                  <div className="para-main-div">
                                                    <p>
                                                      Date:{" "}
                                                      {new Date(
                                                        info?.treatment_created_at,
                                                      ).toLocaleDateString(
                                                        "en-GB",
                                                      )}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </li>
                                            <li>
                                              <div className="row">
                                                <div className="col-md-12">
                                                  <div className="para-main-div">
                                                    <p>
                                                      Time:{" "}
                                                      {new Date(
                                                        info?.treatment_created_at,
                                                      ).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        second: "2-digit",
                                                      })}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="card patientreat">
                                        <div className="card-header service-list">
                                          <h6>Hospital </h6>
                                        </div>
                                        <div className="card-body">
                                          <ul className="trment-list">
                                            {info?.Hospital_details.map(
                                              (item, index) => {
                                                console.log(item);
                                                return (
                                                  <>
                                                    <li key={index}>
                                                      <div className="row align-items-center">
                                                        {/* Left Content */}
                                                        <div className="col-md-10">
                                                          <div className="para-main-div">
                                                            <p className="mb-1">
                                                              <strong>
                                                                Name:
                                                              </strong>{" "}
                                                              {item.hospital_Name ||
                                                                "-"}
                                                            </p>
                                                            <p className="mb-0">
                                                              <strong>
                                                                Charge:
                                                              </strong>{" "}
                                                              {item.hospital_charge ||
                                                                "-"}
                                                            </p>
                                                          </div>
                                                        </div>

                                                        {/* Right Icons */}
                                                        <div className="col-md-2 text-end">
                                                          <div className="action-icon">
                                                            {item.hospital_Name && (
                                                              <i
                                                                className="fa-solid fa-pen-to-square"
                                                                onClick={() =>
                                                                  handledeedit(
                                                                    info,
                                                                    item,
                                                                  )
                                                                }
                                                              ></i>
                                                            )}

                                                            {item.hospital_Name && (
                                                              <i
                                                                className="fa-solid fa-trash"
                                                                onClick={() =>
                                                                  handledelete(
                                                                    info,
                                                                    item,
                                                                  )
                                                                }
                                                              ></i>
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </li>
                                                  </>
                                                );
                                              },
                                            )}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    {(() => {
                                      const freeServices =
                                        info?.services?.filter(
                                          (item) =>
                                            item.service_type === "Free",
                                        );

                                      if (
                                        !freeServices ||
                                        freeServices.length === 0
                                      )
                                        return null;

                                      return (
                                        <div className="col-md-4">
                                          <div className="card patientreat">
                                            <div className="card-header service-list action-icon">
                                              <h6>Free Services</h6>
                                            </div>
                                            <div className="card-body">
                                              <ul className="free-list">
                                                {freeServices.map(
                                                  (item, index) => (
                                                    <li key={item._id || index}>
                                                      <div className="row">
                                                        <div className="col-md-12">
                                                          <div className="para-main-div d-flex">
                                                            <div>
                                                              <p>
                                                                {
                                                                  item.serviceName
                                                                }
                                                              </p>
                                                            </div>
                                                            <div>
                                                              <i
                                                                className="fa-solid fa-trash mx-2 text-danger"
                                                                style={{
                                                                  cursor:
                                                                    "pointer",
                                                                }}
                                                                onClick={() =>
                                                                  EditFreeDelete(
                                                                    item,
                                                                    info,
                                                                    index,
                                                                  )
                                                                }
                                                              ></i>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </li>
                                                  ),
                                                )}
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })()}
                                    <div className="col-md-6">
                                      {info?.services?.length > 0 ? (
                                        <div className="card patientreat">
                                          <div className="card-header service-list">
                                            <h6>Extra Services</h6>
                                          </div>
                                          <div className="card-body">
                                            <div className="table-responsive table-no-card">
                                              <table className="table-card w-100">
                                                <thead>
                                                  <tr>
                                                    <th>Service Name</th>
                                                    <th>Price</th>
                                                    <th>Valid From</th>
                                                    <th>Valid To</th>
                                                    <th>Action</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {info?.services?.map(
                                                    (item, index) => {
                                                      if (!item.price)
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
                                                          <td>{item.price}</td>
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
                                                          <td>
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
                                                  )}
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="col-md-6">
                                      {info?.treatmentNotes?.length > 0 ? (
                                        <div className="card patientreat">
                                          <div className="card-header service-list">
                                            <h6>Notes</h6>
                                          </div>
                                          <div className="card-body">
                                            <div className="table-responsive table-no-card">
                                              <table className="table-card w-100">
                                                <thead>
                                                  <tr>
                                                    <th>Note</th>
                                                    <th>Date</th>
                                                    <th>From</th>
                                                    <th>Action</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {info?.treatmentNotes?.map((item, index) => {
                                                    return (
                                                      <tr key={item._id || index}>
                                                        <td>{item.note || "-"}</td>
                                                        <td>{item?.date ? new Date(item.date).toLocaleDateString("en-GB") : "-"}</td>
                                                        <td>from dynamic data</td>
                                                        <td>
                                                          <div className="action-icon">
                                                            <i className="fa-solid fa-pen-to-square" onClick={() => EditButton(item, info)}></i>
                                                            <i className="fa-solid fa-trash" onClick={() => EditDelete(item, info)}></i>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    );
                                                  })}
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                    <div className="col-md-12">
                                      {info?.appointments_details?.length >
                                        0 ? (
                                        <div className="card patientreat">
                                          <div className="card-header service-list">
                                            <h6>Appointment</h6>
                                          </div>
                                          <div className="card-body">
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
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {info.appointments_details?.map(
                                                    (item) => (
                                                      <tr
                                                        key={item.appointmentId}
                                                      >
                                                        <td>
                                                          {item.appointmentId}
                                                        </td>
                                                        <td>
                                                          {item.mode !==
                                                            "online"
                                                            ? item.vehicle_no
                                                            : "-"}
                                                        </td>
                                                        <td>
                                                          {item.mode !==
                                                            "online"
                                                            ? item.driver_name
                                                            : "-"}
                                                        </td>
                                                        <td>
                                                          {item.mode !==
                                                            "online"
                                                            ? item.driver_contact
                                                            : "-"}
                                                        </td>
                                                        <td>
                                                          {item.mode !==
                                                            "online"
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
                                                        <td>
                                                          {item.status ===
                                                            "Complete" ? (
                                                            <span className="badge bg-primary">
                                                              Completed
                                                            </span>
                                                          ) : (
                                                            <span className="badge bg-primary">
                                                              {item.status}
                                                            </span>
                                                          )}
                                                        </td>
                                                        <td className="action-icon">
                                                          <i
                                                            className="fa-solid fa-pen-to-square"
                                                            onClick={() => {
                                                              handleclickeditfunc(
                                                                item,
                                                              );
                                                            }}
                                                          ></i>
                                                          <i
                                                            className="fa-solid fa-trash"
                                                            onClick={() => {
                                                              handleclickeditdelete(
                                                                item,
                                                              );
                                                            }}
                                                          ></i>
                                                        </td>
                                                      </tr>
                                                    ),
                                                  )}
                                                </tbody>
                                              </table>
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                  <hr></hr>
                                  <div className="row justify-content-end">
                                    <div className="col-md-12">
                                      <div className="total-amount">
                                        <h6 className="mb-0">Total Amount:</h6>
                                        <p>{info.treatment_total_charge}</p>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="total-amount">
                                        <h6 className="mb-0">Due Amount:</h6>
                                        <p>{info.treatment_due_payment}</p>
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
                )}
              </div>
              {activeSubTab === "attendant" && selectedTreatmentId && (
                <div>
                  <div className="main-tab-hd">
                    <div className="all-hd">
                      <h6>Attendant Details</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card-box">
                        <div className="treat-card">
                          <div className="sectabmain">
                            <div className="treat-id">
                              <h3 className="mb-0" style={{ cursor: "pointer" }} onClick={handleBackToTreatmentList}> {getSelectedTreatmentName()}</h3>
                            </div>
                            <div className="">
                              <ul className="nav nav-tabs treat-tabs">
                                <li className="nav-item">
                                  <button
                                    className={`nav-link ${activeSubTab === "attendant" ? "active" : ""}`}
                                    onClick={(e) =>
                                      handleAction(
                                        e,
                                        "attendant",
                                        getSelectedTreatmentInfo(),
                                      )
                                    }
                                  >
                                    Add Attendant
                                  </button>
                                </li>
                                <li className="nav-item">
                                  <button
                                    className={`nav-link ${activeSubTab === "payment" ? "active" : ""}`}
                                    onClick={(e) =>
                                      handleAction(
                                        e,
                                        "payment",
                                        getSelectedTreatmentInfo(),
                                      )
                                    }
                                  >
                                    Payment Details
                                  </button>
                                </li>
                                <li className="nav-item">
                                  <button
                                    className={`nav-link ${activeSubTab === "reports" ? "active" : ""}`}
                                    onClick={(e) =>
                                      handleAction(
                                        e,
                                        "reports",
                                        getSelectedTreatmentInfo(),
                                      )
                                    }
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
                                        "hospital",
                                        getSelectedTreatmentInfo(),
                                      )
                                    }
                                  >
                                    + Add Hospital
                                  </button>
                                </li>
                                <li className="nav-item">
                                  <button
                                    className="nav-link"
                                    onClick={(e) =>
                                      handleAction(
                                        e,
                                        "appointment",
                                        getSelectedTreatmentInfo(),
                                      )
                                    }
                                  >
                                    + Add Appointment
                                  </button>
                                </li>
                                <li className="nav-item">
                                  <button
                                    className="nav-link"
                                    onClick={(e) =>
                                      handleAction(
                                        e,
                                        "notes",
                                        getSelectedTreatmentInfo(),
                                      )
                                    }
                                  >
                                    + Add Notes
                                  </button>
                                </li>
                                <li className="nav-item">
                                  <button
                                    className="nav-link"
                                    onClick={(e) =>
                                      handleAction(
                                        e,
                                        "services",
                                        getSelectedTreatmentInfo(),
                                      )
                                    }
                                  >
                                    + Add Services
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <hr></hr>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="treat-buttons">
                              <button
                                onClick={(e) =>
                                  handleClickOpen2(e, selectedTreatmentId)
                                }
                                className="add-button"
                              >
                                <span>
                                  <i className="fa fa-plus"></i>
                                </span>{" "}
                                Add Attendant
                              </button>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="card attendant-card">
                              <div className="card-body">
                                <div className="detail-row">
                                  <label>Name</label>
                                  <span>
                                    {passportDetails?.attendant_fullname ||
                                      "N/A"}
                                  </span>
                                </div>
                                <div className="detail-row">
                                  <label>Relation</label>
                                  <span>
                                    {passportDetails?.attendant_relation ||
                                      "N/A"}
                                  </span>
                                </div>
                                <div className="detail-row">
                                  <label>Contact</label>
                                  <span>
                                    {passportDetails?.attendant_contact ||
                                      "N/A"}
                                  </span>
                                </div>
                                <div className="detail-row">
                                  <label>Attendant Photo</label>
                                  <span>
                                    {passportDetails?.attendant_photo ? (
                                      <a
                                        href={`https://sisccltd.com/omca_crm/${passportDetails.attendant_photo}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pdfdown"
                                      >
                                        View
                                      </a>
                                    ) : (
                                      <span className="text-muted small">
                                        Not Uploaded
                                      </span>
                                    )}
                                  </span>
                                </div>
                                <div className="detail-row">
                                  <label>Attendant Passport</label>
                                  <span>
                                    {passportDetails?.attendant_passport ? (
                                      <a
                                        href={`https://sisccltd.com/omca_crm/${passportDetails.attendant_passport}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pdfdown"
                                      >
                                        View
                                      </a>
                                    ) : (
                                      <span className="text-muted small">
                                        Not Uploaded
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeSubTab === "payment" && selectedTreatmentId && (
                <div>
                  <div className="main-tab-hd">
                    <div className="all-hd">
                      <h6>Payment Details</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {Object.keys(groupedPayments).length === 0 ? (
                        <>
                          <div className="card-box">
                            <div className="treat-card">
                              <div className="sectabmain">
                                <div className="treat-id">
                                  <h3 className="mb-0" style={{ cursor: "pointer" }} onClick={handleBackToTreatmentList}>{getSelectedTreatmentName()}</h3>
                                </div>
                                <div className="">
                                  <ul className="nav nav-tabs treat-tabs">
                                    <li className="nav-item">
                                      <button
                                        className={`nav-link ${activeSubTab === "attendant" ? "active" : ""}`}
                                        onClick={(e) =>
                                          handleAction(
                                            e,
                                            "attendant",
                                            getSelectedTreatmentInfo(),
                                          )
                                        }
                                      >
                                        Add Attendant
                                      </button>
                                    </li>
                                    <li className="nav-item">
                                      <button
                                        className={`nav-link ${activeSubTab === "payment" ? "active" : ""}`}
                                        onClick={(e) =>
                                          handleAction(
                                            e,
                                            "payment",
                                            getSelectedTreatmentInfo(),
                                          )
                                        }
                                      >
                                        Payment Details
                                      </button>
                                    </li>
                                    <li className="nav-item">
                                      <button
                                        className={`nav-link ${activeSubTab === "reports" ? "active" : ""}`}
                                        onClick={(e) =>
                                          handleAction(
                                            e,
                                            "reports",
                                            getSelectedTreatmentInfo(),
                                          )
                                        }
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
                                            "hospital",
                                            getSelectedTreatmentInfo(),
                                          )
                                        }
                                      >
                                        + Add Hospital
                                      </button>
                                    </li>
                                    <li className="nav-item">
                                      <button
                                        className="nav-link"
                                        onClick={(e) =>
                                          handleAction(
                                            e,
                                            "appointment",
                                            getSelectedTreatmentInfo(),
                                          )
                                        }
                                      >
                                        + Add Appointment
                                      </button>
                                    </li>
                                    <li className="nav-item">
                                      <button
                                        className="nav-link"
                                        onClick={(e) =>
                                          handleAction(
                                            e,
                                            "notes",
                                            getSelectedTreatmentInfo(),
                                          )
                                        }
                                      >
                                        + Add Notes
                                      </button>
                                    </li>
                                    <li className="nav-item">
                                      <button
                                        className="nav-link"
                                        onClick={(e) =>
                                          handleAction(
                                            e,
                                            "services",
                                            getSelectedTreatmentInfo(),
                                          )
                                        }
                                      >
                                        + Add Services
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr></hr>
                        </>
                      ) : (
                        <>
                          {groupedPayments &&
                            Object.entries(groupedPayments).map(
                              ([treatmentId, payments], index) => {
                                const { treatment_course_name } =
                                  payments[0] || {};
                                return (
                                  <>
                                    <div className="card-box" key={treatmentId}>
                                      <div className="treat-card">
                                        <div className="sectabmain">
                                          <div className="treat-id">
                                            <h3 className="mb-0" style={{ cursor: "pointer" }} onClick={handleBackToTreatmentList}>
                                              {" "} {treatment_course_name}
                                            </h3>
                                          </div>
                                          <div className="">
                                            <ul className="nav nav-tabs treat-tabs">
                                              <li className="nav-item">
                                                <button
                                                  className={`nav-link ${activeSubTab === "attendant" ? "active" : ""}`}
                                                  onClick={(e) =>
                                                    handleAction(
                                                      e,
                                                      "attendant",
                                                      getSelectedTreatmentInfo(),
                                                    )
                                                  }
                                                >
                                                  Add Attendant
                                                </button>
                                              </li>
                                              <li className="nav-item">
                                                <button
                                                  className={`nav-link ${activeSubTab === "payment" ? "active" : ""}`}
                                                  onClick={(e) =>
                                                    handleAction(
                                                      e,
                                                      "payment",
                                                      getSelectedTreatmentInfo(),
                                                    )
                                                  }
                                                >
                                                  Payment Details
                                                </button>
                                              </li>
                                              <li className="nav-item">
                                                <button
                                                  className={`nav-link ${activeSubTab === "reports" ? "active" : ""}`}
                                                  onClick={(e) =>
                                                    handleAction(
                                                      e,
                                                      "reports",
                                                      getSelectedTreatmentInfo(),
                                                    )
                                                  }
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
                                                      "hospital",
                                                      getSelectedTreatmentInfo(),
                                                    )
                                                  }
                                                >
                                                  + Add Hospital
                                                </button>
                                              </li>
                                              <li className="nav-item">
                                                <button
                                                  className="nav-link"
                                                  onClick={(e) =>
                                                    handleAction(
                                                      e,
                                                      "appointment",
                                                      getSelectedTreatmentInfo(),
                                                    )
                                                  }
                                                >
                                                  + Add Appointment
                                                </button>
                                              </li>
                                              <li className="nav-item">
                                                <button
                                                  className="nav-link"
                                                  onClick={(e) =>
                                                    handleAction(
                                                      e,
                                                      "notes",
                                                      getSelectedTreatmentInfo(),
                                                    )
                                                  }
                                                >
                                                  + Add Notes
                                                </button>
                                              </li>
                                              <li className="nav-item">
                                                <button
                                                  className="nav-link"
                                                  onClick={(e) =>
                                                    handleAction(
                                                      e,
                                                      "services",
                                                      getSelectedTreatmentInfo(),
                                                    )
                                                  }
                                                >
                                                  + Add Services
                                                </button>
                                              </li>

                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                      <hr></hr>
                                      <div className="experience-box">
                                        <div className="treat-buttons">
                                          <button onClick={(e) => handleClickOpen3(e, treatmentId,)} className="add-button">
                                            <span><i className="fa fa-plus"></i></span>{" "}Add Amount
                                          </button>
                                          <button onClick={(e) => handleClicexportPayment(e, treatmentId,)} className="add-button">
                                            <span><i className="fa fa-plus"></i></span>{" "}Export
                                          </button>
                                        </div>
                                        <ul className="experience-list">
                                          {payments.map((info, idx) => {
                                            console.log(info);
                                            return (
                                              <>
                                                <li key={idx}>
                                                  <div className="experience-user">
                                                    <div className="before-circle"></div>
                                                  </div>
                                                  <div className="experience-content">
                                                    <div className="timeline-content">
                                                      <div className="">
                                                        <div>
                                                          Payment Date -{" "}
                                                          {moment(
                                                            info.payment_Date,
                                                          ).format("L")}
                                                        </div>
                                                        <div>
                                                          Payment Method -{" "}
                                                          {info.paymentMethod}
                                                        </div>
                                                        <div>
                                                          Paid Amount -{" "}
                                                          {info.paid_amount}
                                                        </div>
                                                      </div>
                                                      <div className="">
                                                        <button
                                                          className="add-button"
                                                          onClick={() => {
                                                            navigate(
                                                              "/Admin/Patient-Pdfdetails",
                                                              {
                                                                state: {
                                                                  data: info?.payment_id,
                                                                },
                                                              },
                                                            );
                                                          }}
                                                        >
                                                          {" "}
                                                          PDF Download
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </li>
                                              </>
                                            );
                                          })}
                                        </ul>
                                      </div>
                                    </div>
                                  </>
                                );
                              },
                            )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {activeSubTab === "reports" && selectedTreatmentId && (
                <div>
                  <div className="main-tab-hd">
                    <div className="all-hd">
                      <h6>Reports</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {treatmentData.map((treatment) => {
                        console.log(treatment);
                        return (
                          <>
                            <div className="card-box mb-4" key={treatment.treatmentId}>
                              <div className="treat-card">
                                <div className="sectabmain">
                                  <div className="treat-id">
                                    <h3 className="mb-0" style={{ cursor: "pointer" }} onClick={handleBackToTreatmentList}>
                                      {treatment?.treatment_course_name}
                                    </h3>
                                  </div>
                                  <div className="">
                                    <ul className="nav nav-tabs treat-tabs">
                                      <li className="nav-item">
                                        <button
                                          className={`nav-link ${activeSubTab === "attendant" ? "active" : ""}`}
                                          onClick={(e) =>
                                            handleAction(
                                              e,
                                              "attendant",
                                              getSelectedTreatmentInfo(),
                                            )
                                          }
                                        >
                                          Add Attendant
                                        </button>
                                      </li>
                                      <li className="nav-item">
                                        <button
                                          className={`nav-link ${activeSubTab === "payment" ? "active" : ""}`}
                                          onClick={(e) =>
                                            handleAction(
                                              e,
                                              "payment",
                                              getSelectedTreatmentInfo(),
                                            )
                                          }
                                        >
                                          Payment Details
                                        </button>
                                      </li>
                                      <li className="nav-item">
                                        <button
                                          className={`nav-link ${activeSubTab === "reports" ? "active" : ""}`}
                                          onClick={(e) =>
                                            handleAction(
                                              e,
                                              "reports",
                                              getSelectedTreatmentInfo(),
                                            )
                                          }
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
                                              "hospital",
                                              getSelectedTreatmentInfo(),
                                            )
                                          }
                                        >
                                          + Add Hospital
                                        </button>
                                      </li>
                                      <li className="nav-item">
                                        <button
                                          className="nav-link"
                                          onClick={(e) =>
                                            handleAction(
                                              e,
                                              "appointment",
                                              getSelectedTreatmentInfo(),
                                            )
                                          }
                                        >
                                          + Add Appointment
                                        </button>
                                      </li>
                                      <li className="nav-item">
                                        <button
                                          className="nav-link"
                                          onClick={(e) =>
                                            handleAction(
                                              e,
                                              "notes",
                                              getSelectedTreatmentInfo(),
                                            )
                                          }
                                        >
                                          + Add Notes
                                        </button>
                                      </li>
                                      <li className="nav-item">
                                        <button
                                          className="nav-link"
                                          onClick={(e) =>
                                            handleAction(
                                              e,
                                              "services",
                                              getSelectedTreatmentInfo(),
                                            )
                                          }
                                        >
                                          + Add Services
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <hr></hr>
                              <div className="treat-buttons">
                                <button onClick={(e) => handleClickOpen10(e, treatment.treatmentId,)} className="add-button" >
                                  <span><i className="fa fa-plus"></i></span>{" "}
                                  Add Report
                                </button>
                              </div>
                              {treatment.reports &&
                                treatment.reports.length > 0 ? (
                                <div className="table-responsive">
                                  <TableContainer component={Paper}>
                                    <Table className="table-no-card">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Treatment ID</TableCell>
                                          <TableCell>Report Title</TableCell>
                                          <TableCell>Report Date</TableCell>
                                          <TableCell>From</TableCell>
                                          {localStorage.getItem("Role") ===
                                            "Admin" && (
                                              <>
                                                <TableCell>Reports</TableCell>
                                                <TableCell>Action</TableCell>
                                              </>
                                            )}
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {treatment.reports.map((item) => (
                                          <TableRow key={item._id}>
                                            <TableCell>
                                              {item.treatmentId}
                                            </TableCell>
                                            <TableCell>
                                              {item.reportTitle}
                                            </TableCell>
                                            <TableCell>
                                              {new Date(
                                                item.treatment_report_date,
                                              ).toLocaleDateString("en-GB")}
                                            </TableCell>
                                            <TableCell>from data</TableCell>

                                            {localStorage.getItem("Role") ===
                                              "Admin" && (
                                                <>
                                                  <TableCell>
                                                    <a
                                                      href={`${image}${item.treatmentReport}`}
                                                      target="_blank"
                                                      rel="noreferrer"
                                                    >
                                                      Download Report
                                                    </a>
                                                  </TableCell>
                                                  <TableCell>
                                                    <i
                                                      style={{
                                                        cursor: "pointer",
                                                      }}
                                                      className="fa-solid fa-trash text-danger"
                                                      onClick={() =>
                                                        handledeleteReport(item)
                                                      }
                                                    ></i>
                                                  </TableCell>
                                                </>
                                              )}
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </div>
                              ) : (
                                <p>No reports available</p>
                              )}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* treatment-plan */}
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
              <Box>
                <Box>
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
                </Box>
                <Box>
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
                </Box>
                <Box>
                  <div className="field-set">
                    <label>
                      Select Reports<span className="text-danger"></span>
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
                </Box>
                <Box>
                  <div className="field-set mb-0">
                    <label>
                      Notes<span className="text-danger"></span>
                    </label>
                    <input
                      className="form-control"
                      onChange={(e) => {
                        setValue1(e.target.value);
                      }}
                    />
                  </div>
                </Box>
              </Box>
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
                    <input
                      type="text"
                      className="form-control"
                      value={data.price}
                      name="price"
                      onChange={editServiceandlechange}
                      placeholder="Enter price"
                    />
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
                        placeholder="Enter price"
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
                      placeholder="Enter price"
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
                    <input
                      type="number"
                      className="form-control"
                      value={data.price}
                      name="price"
                      onChange={andlechange}
                      placeholder="Enter price"
                    />
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
                        placeholder="Enter price"
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
                      placeholder="Enter price"
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
      {/* add-hospital-modal-start */}
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
                  <div className="field-set">
                    <label>
                      Hospital Charges<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Hospital Charge"
                      className="form-control"
                      name="hospitalcharge"
                      required=""
                      onChange={(e) => sethospitalharge(e.target.value)}
                      value={hospitalcharge}
                    />
                    <span style={{ color: "red" }}>
                      {blogErr && !hospitalcharge
                        ? "*Please Enter Your  Hospital charge"
                        : ""}
                    </span>
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
                    <Autocomplete
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
                      {appointErr && !note ? "*Please Enter Your date" : ""}
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
              <h6>Add Attendant Details</h6>
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
                  <div className="field-set">
                    <label>
                      Attendant Relation<span className="text-danger">*</span>
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
                  <div className="field-set">
                    <label>
                      Attendant Contact<span className="text-danger">*</span>
                    </label>
                    <div className="upload-input">
                      <input
                        type="text"
                        onKeyPress={(e) => {
                          handkekeypreees(e);
                        }}
                        name="attendant_contact"
                        className="form-control"
                        value={filesData.attendant_contact}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="field-set">
                    <label>
                      Attendant Passport<span className="text-danger">*</span>
                    </label>
                    <div className="upload-input">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) =>
                          handleFileChange(e, "Attende_passport")
                        }
                      />
                    </div>
                  </div>
                  <div className="field-set">
                    <label>
                      Attendant Photo<span className="text-danger">*</span>
                    </label>
                    <div className="upload-input">
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => handleFileChange(e, "Attende_photo")}
                      />
                    </div>
                  </div>
                  <DialogActions className="submit-main">
                    <Button
                      type="submit"
                      onClick={handleKysDetail}
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
          open={dataImperial}
          onClose={dataIwemperial}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Add Hospital Charge</h6>
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
                      // type="submit"
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
      {/* add-payment-modal-start */}
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
                  {/* <div>{info.treatment_due_payment}</div> */}

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
                <form id="contact-form" className="contact-form">
                  <div className="field-set">
                    <label>
                      Paid Amount<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="paid amount"
                      className="form-control"
                      name="paid_amount"
                      required=""
                      onChange={AddpaymentOnchnage}
                      value={data.paid_amount}
                    />
                  </div>
                  {/* <div>{info.treatment_due_payment}</div> */}
                  <div className="field-set">
                    <label>
                      Payment Method<span className="text-danger"></span>
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
                      <option value="Credit/Debit Card">
                        Debit Card / Credit Card
                      </option>
                    </select>
                  </div>
                  <div className="field-set">
                    <label>
                      Payment Date<span className="text-danger"></span>
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
              <h6>Add Reports</h6>
            </div>
            <div className="cross-icon" onClick={handleClose10}>
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
                      Reports Title<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Report Title"
                      className="form-control"
                      multiple
                      name="reportTitle"
                      required=""
                      onChange={handlefilechange}
                    />
                  </div>
                  <div className="field-set">
                    <label>
                      Reports <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      multiple
                      placeholder="payment Method"
                      className="form-control"
                      name="treatmentReport"
                      required
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
                      placeholder="payment Method"
                      className="form-control"
                      name="treatment_report_date"
                      required
                      onChange={handlefilechange}
                    />
                  </div>

                  <DialogActions className="submit-main">
                    <Button
                      // type="submit"
                      onClick={(e) => handleClickSubmit(e)}
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
    </>
  );
}
export default PatientDetail;
