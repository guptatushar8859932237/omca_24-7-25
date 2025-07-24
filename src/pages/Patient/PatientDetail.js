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
import { baseurl, image } from "../../Basurl/Baseurl";
import { AddKysDetail } from "../../reducer/PatientTreatmentSlice";
import { ExtraServices } from "../../reducer/PatientTreatmentSlice";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import profile from "../../img/doctor-thumb-04.jpg";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { AddNewTretmentPayment } from "../../reducer/PatientTreatmentSlice";
import { toast, ToastContainer } from "react-toastify";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function PatientDetail() {
  const navigate = useNavigate();
  const [seekerStatus, setSeekerStatus] = React.useState({});
  const [pickuptime, setPickuptime] = useState("");
  const [vehicalnumber, setVehicalnumber] = useState("");
  const [drivername, setDrivername] = useState("");
  const [drivercontact, setDrivercontact] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();

  const { PatientTreatments, loading, error } = useSelector(
    (state) => state.PatientTreatments
  );
  const [ispatient, setIspatient] = useState("");
  const [datedata, setDatedata] = useState("");
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
  const [open10, setOpen10] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [note, setNote] = useState("");
  const [date, setDate] = useState();
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  const [hospitalId, setHospitalId] = useState("");
  const [valuedata, setValuedata] = useState("");
  const [treatmentId, setTreatmentId] = useState("");
  const [hospitalcharge, sethospitalharge] = useState("");
  const [ishospitalArray, setIShospitalArray] = useState([]);
  const [note2, setNote2] = useState("");
  const [date2, setDate2] = useState();
  const [appHospital, setAppHospital] = useState("");
  const [kys, setKyc] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notes, setNotes] = useState([]);
  const [dataHospital, setDataHospital] = useState([]);
  const [imagefile, setImagefile] = useState(null);
  const [enqId, setEnqId] = useState("");
  const [nodaestInput, setNodaestInput] = useState("");
  const [serviceData, setServiceData] = useState([]);
  const [payment_details, setPayment_details] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [chkservice, setChkservice] = useState([]);
  const [blogErr, setBlogErr] = useState(false);
  const [appointErr, setAppointErr] = useState(false);
  const [kysErr, setKysErr] = useState(false);
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
      setTretment(PatientTreatments.treatments || []); // Ensure treatments is always an array
      setKyc(PatientTreatments.Kyc_details);
      setNotes(PatientTreatments.discussionNotes);
      setPayment_details(PatientTreatments.payment_details);
      setChkservice(PatientTreatments.services);
    }
  }, [PatientTreatments]);
  console.log(chkservice);
  const handleClose = () => {
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
    console.log(e.target.value, treatmentId, listhospital);
    setOpen1(true);
    setTreatmentId(tretmentId);
    setIShospitalArray(listhospital);
  };
  const handleClickOpen2 = (e, tretmentId, listhospital) => {
    setOpen2(true);
  };
  const handleClickOpen3 = (e, tretmentId) => {
    setOpen3(true);
    setTreatmentId(tretmentId);
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
  // const handleClose4 = () => {
  //   setOpen4(false);
  // };
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
    console.log(servipostdata, "Service Data22");
    try {
      const response = await axios.post(
        `${baseurl}patient_extra_service/${data.treatment}`,
        servipostdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data.success === true) {
        setOpenModal(false);
        dispatch(GetPatientTreatments({ id: location.state.patientId }));
        Swal.fire("Service Added successfully!", "", "success");
      }
    } catch (error) {
      console.log(error);
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
        }
      );

      console.log(response.data);
      setTreatmentuser(response.data.patient_treatments, "treatment data");
    } catch (error) {
      console.error("Error fetching treatment data", error);
    }
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // prevent multiple clicks

    setIsSubmitting(true);
    setBlogErr({
      hospital_charge: false,
    });

    if (!hospitalcharge) {
      setBlogErr((prevState) => ({ ...prevState, hospitalcharge: true }));
    }
    if (!hospitalcharge) {
      return;
    }
    const result = await dispatch(
      AddHospitalForPatient({
        id: location.state.patientId,
        hospitalId: hospitalId,
        treatmentId: treatmentId,
        hospital_charge: hospitalcharge,
      })
    ).unwrap();
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
      setOpen(false);
      Swal.fire("Error!", err?.message || "An error occurred", "error");
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };
  const handlesubmitAppoint = async (e) => {
  e.preventDefault();

  const isOffline = statuddropdown === 'offline';

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

    if (!drivercontact) {
      setAppointErr((prev) => ({ ...prev, drivercontact: true }));
      hasError = true;
    }

    if (!vehicalnumber) {
      setAppointErr((prev) => ({ ...prev, vehicalnumber: true }));
      hasError = true;
    }
  }

  // If any required field is missing, stop the submission
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
        mode:statuddropdown ,
        appointment_Date: date,
        pickup_time: pickuptime,
        vehicle_no: vehicalnumber,
        driver_name: drivername,
        driver_contact: drivercontact,
      })
    ).unwrap();

    setOpen1(false);
    Swal.fire("Patient assigned to Appointment successfully!", "", "success");
    dispatch(GetPatientTreatments({ id: location.state.patientId }));

    // Reset form fields
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

  const isOffline = statuddropdown === 'offline';

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

  // If any required field is missing, stop the submission
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
        mode:statuddropdown ,
        appointment_Date: date,
      })
    ).unwrap();

    setOpen1(false);
    Swal.fire("Patient assigned to Appointment successfully!", "", "success");
    dispatch(GetPatientTreatments({ id: location.state.patientId }));

    // Reset form fields
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

  // const handlesubmitAppoint = async (e) => {
  //   e.preventDefault();
    
  //   setAppointErr({
  //     note: false,
  //     date: false,
  //     drivername: false,
  //     vehicalnumber: false,
  //     drivercontact: false,
  //   });

  //   if (!appHospital) {
  //     setAppointErr((prevState) => ({ ...prevState, appHospital: true }));
  //   }
  //   if (!note) {
  //     setAppointErr((prevState) => ({ ...prevState, note: true }));
  //   }
  //   if (!date) {
  //     setAppointErr((prevState) => ({ ...prevState, hospitalcharge: true }));
  //   }
  //   if (!drivername) {
  //     setAppointErr((prevState) => ({ ...prevState, drivername: true }));
  //   }
  //   if (!drivercontact) {
  //     setAppointErr((prevState) => ({ ...prevState, drivercontact: true }));
  //   }
  //   if (!vehicalnumber) {
  //     setAppointErr((prevState) => ({ ...prevState, vehicalnumber: true }));
  //   }
  //   if (!pickuptime) {
  //     setAppointErr((prevState) => ({ ...prevState, pickuptime: true }));
  //   }
  //   // If any field is empty, stop the submission
  //   if (!note || !date) {
  //     return;
  //   }
  //   const result = await dispatch(
  //     AppointmentForPatient({
  //       patientId: location.state.patientId,
  //       hospitalId: appHospital,
  //       treatment_id: treatmentId,
  //       note: note,
  //       appointment_Date: date,
  //       pickup_time: pickuptime,
  //       vehicle_no: vehicalnumber,
  //       driver_name: drivername,
  //       driver_contact: drivercontact,
  //     })
  //   ).unwrap();
  //   try {
  //     setOpen1(false);
  //     Swal.fire("Patient assigned to Appointment successfully!", "", "success");
  //     dispatch(GetPatientTreatments({ id: location.state.patientId }));
  //     setTreatmentId("");
  //     sethospitalharge("");
  //     setHospitalId("");
  //     setNote("");
  //     setDate("");
  //     setDrivercontact("");
  //     setPickuptime("");
  //     setDrivername("");
  //     setVehicalnumber("");
  //     setAppointErr(false);
  //   } catch (err) {
  //     Swal.fire("Error!", err?.message || "An error occurred", "error");
  //   }
  // };
  const [filesData, setFilesData] = useState({});
  const getdataApi = async () => {
    try {
      const rresponse = await axios.get(`${baseurl}getActiveHospitals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (rresponse.data.success === true) {
        setDataHospital(rresponse.data.Hospital_Details);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdataApi();
  }, []);

  const onChangeFile = (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Only validate image type for 'photo' field
    if (fieldName === "photo") {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        alert("Please upload an image file only for photo.");
        return;
      }
    }

    // Update the file in state
    setFilesData((prevState) => ({
      ...prevState,
      [fieldName]: file,
    }));
  };

  const handleKysDetail = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      AddKysDetail({
        id: location.state.patientId,
        id_proof: filesData.id_proof,
        passport: filesData.passport,
        photo: filesData.photo,
      })
    ).unwrap();
    console.log(filesData);
    try {
      setOpen2(false);
      Swal.fire("Passport Details Added Successfully!", "", "success");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
    } catch (err) {
      Swal.fire("Error!", err?.message || "An error occurred", "error");
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
          prev.filter((service) => service.serviceId !== id)
        );
        setChkservice((prev) =>
          prev.filter((service) => service.serviceId !== id)
        );
      }
    }
  };
  const handleExtraService = async () => {
    const allServices = [...chkservice, ...selectedServices];
    try {
      const result = await dispatch(
        ExtraServices({ id: location.state.patientId, services: allServices })
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
      .post(`${baseurl}add_notes/${location.state.enqId}`, {
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
  const handleAddTritmentPayment = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      AddNewTretmentPayment({
        id: treatmentId,
        paid_amount: data.paid_amount,
        paymentMethod: data.paymentMethod,
        payment_Date: data.payment_Date,
      })
    ).unwrap();
    // console.log(filesData);
    try {
      setOpen3(false);
      Swal.fire("Payment Details Added Successfully!", "", "success");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
      setTreatmentId("");
      setData("");
    } catch (err) {
      console.group("Submission Error");
      console.log("Raw error:", err);

      let errorMessage = "An error occurred";

      if (typeof err === "string") {
        errorMessage = err;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (typeof err === "object") {
        errorMessage = JSON.stringify(err);
      }

      console.error("Parsed error message:", errorMessage);
      Swal.fire("Error!", errorMessage, "error");
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
      }
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
        }
      );
      Swal.fire("Success!", "Status updated successfully!", "success");
      dispatch(GetPatientTreatments({ id: location.state.patientId }));
      return response.data;
    } catch (err) {
      console.error(err.response || err.message);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
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
  const penModal = () => {
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
  // useEffect(() => {
  //   dispatch(GetAllServices());
  // }, [dispatch]);
  // useEffect(() => {
  //   console.log(ServiceData2);
  //   setServiceData(ServiceData2);
  // }, [ServiceData2]);
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
        setUndadedservice(response.data.availableServices, "treatment data");
        // setData({ ...data, price: response.data.price });
      })
      .catch((error) => {
        console.error("Error fetching unadded services:", error);
      });
  };

  const handlefilechange = (e) => {
    const { name, value } = e.target;
    setIniData({ ...iniData, [name]: value });
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
      alert("Only JPG, PNG, or PDF files are allowed.");
      return;
    }

    setImagefile(file); // store in state
  };

  // const handleClickSubmit = async () => {
  //   console.log(treatmentId)
  //   try {
  //     const formData = new FormData();
  //     formData.append("reportTitle", iniData.reportTitle);
  //     formData.append("treatmentReport", imagefile); // make sure imagefile is from state

  //     const response = await axios.post(`${baseurl}addReports/${parseInt(treatmentId)}`, formData, {
  //       headers: {
  //          Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     console.log("Upload successful:", response.data);
  //   } catch (error) {
  //     console.error("Upload failed:", error);
  //   }
  // };

  const handleClickSubmit = async () => {
    console.log("Treatment ID:", treatmentId);
    try {
      const formData = new FormData();
      formData.append("reportTitle", iniData.reportTitle);
      formData.append("treatmentReport", imagefile);

      const response = await axios.post(
        `${baseurl}addReports/${treatmentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success === true) {
        handleClose10();
        Swal.fire("Report Added Successfully!", "", "success");
        // toast.success("Report Added Successfully");
      }
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
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
        postdata
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
        }
      );

      if (response.data.success === true) {
        setReportdataget(response.data.data);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <div className="row">
            <div className="col-sm-7 col-6">
              <h4 className="page-title">View-Details</h4>
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
                          <img src={profile} className="pro-img" />
                        </div>
                        {/* <button class="image-change" type="button"> */}
                        {/* <i class="fa fa-camera" aria-hidden="true"></i> */}
                        {/* </button> */}
                        <input
                          type="file"
                          class="form-control d-none"
                          name="profile_pic"
                        />
                      </div>
                    </form>
                    <div class="part-txt">
                      <h6>{ispatient?.patient_name}</h6>
                      {/* <p>{ispatient?.country}</p> */}
                      <p>Patient ID : {ispatient?.patientId}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="user-info-main">
                  <div className="table-responsive">
                    <table className="table mb-0">
                      <tbody>
                        <tr>
                          <td>Phone:</td>
                          <td className="even">
                            {ispatient?.emergency_contact_no}
                          </td>
                        </tr>
                        <tr>
                          <td>Email:</td>
                          <td className="even">{ispatient?.email}</td>
                        </tr>
                        <tr>
                          <td>Patient-Status:</td>
                          <td className="even"> {ispatient?.patient_status}</td>
                        </tr>
                        <tr>
                          <td>Country:</td>
                          <td className="even">{ispatient?.country}</td>
                        </tr>
                        <tr>
                          <td>Gender:</td>
                          <td className="even">{ispatient?.gender}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="patient-tabs">
            <ul className="nav nav-tabs nav-tabs-bottom">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  href="#about-cont"
                  data-toggle="tab"
                >
                  Treatment{" "}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#bottom-tab2" data-toggle="tab">
                  Add Passport
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#bottom-tab3" data-toggle="tab">
                  Discussion Notes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#bottom-tab4" data-toggle="tab">
                  Payment Details
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#bottom-tab5" data-toggle="tab">
                  Reports
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane show active" id="about-cont">
                <div className="main-tab-hd">
                  <div className="all-hd">
                    <h6>All Treatments</h6>
                  </div>
                  <div className="treat-buttons">
                    <div className="mr-3">
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
                    <div className="">
                      <button className="add-button" onClick={penModal}>
                        <span>
                          <i className="fa fa-plus"></i>
                        </span>{" "}
                        Add Services
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {/* {tretment.length === 0 ? (
                      <button style={{ display: 'block' }} onClick={PatientDetailButton} className="btn btn btn-primary btn-rounded float-right mx-2">
                        <i className="fa fa-plus"></i>Add Treatment
                      </button>
                    ) : (
                      <button style={{ display: 'none' }} onClick={PatientDetailButton} className="btn btn btn-primary btn-rounded float-right mx-2">
                        <i className="fa fa-plus"></i>Add Treatment
                      </button>
                    )} */}
                    {tretment?.length === 0 ? (
                      "No Treatment  Added for this patients"
                    ) : (
                      <>
                        {tretment?.map((info, index) => {
                          console.log(info, "array data");
                          return (
                            <div className="card-box">
                              <div className="treat-card">
                                <div className="treat-id">
                                  <div>
                                    <h3>
                                      Treatment ID-{info.treatment_id}{" "}
                                      {/* <p className="mx-5">{info.treatment_status}</p>{" "} */}
                                    </h3>
                                  </div>
                                </div>
                                <div className="d-flex">
                                  <div>
                                    <FormControl
                                      sx={{ m: 1, minWidth: 120 }}
                                      size="small"
                                      className="status-treat cont-main"
                                    >
                                      <Select
                                        value={info.treatment_status}
                                        onChange={(e) =>
                                          handleChange(e, info.treatment_id)
                                        }
                                        displayEmpty
                                        inputProps={{
                                          "aria-label": "Without label",
                                        }}
                                        className="status-direct"
                                      >
                                        <MenuItem value="Pending">
                                          Pending
                                        </MenuItem>
                                        <MenuItem value="InProgress">
                                          In Progress
                                        </MenuItem>
                                        <MenuItem value="Complete">
                                          Complete
                                        </MenuItem>
                                        <MenuItem value="Cancelled">
                                          Cancelled
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </div>
                                  <button
                                    onClick={(e) =>
                                      handleClickOpen(e, info.treatment_id)
                                    }
                                    className="add-button1"
                                  >
                                    <span>
                                      <i className="fa fa-plus"></i>
                                    </span>{" "}
                                    Add Hospital
                                  </button>
                                  <button
                                    onClick={(e) =>
                                      handleClickOpen1(
                                        e,
                                        info.treatment_id,
                                        info.Hospital_details
                                      )
                                    }
                                    className="add-button1"
                                  >
                                    <span>
                                      <i className="fa fa-plus"></i>
                                    </span>{" "}
                                    Add Appointment
                                  </button>
                                </div>
                              </div>
                              <hr></hr>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="service-list">
                                    <h5>Treatment</h5>
                                  </div>
                                  <ul>
                                    <li>
                                      <div className="row">
                                        <div className="col-sm-3">
                                          <div className="para-main-div">
                                            <h6>Name:</h6>
                                          </div>
                                        </div>
                                        <div className="col-sm-5">
                                          <div className="para-main-div">
                                            <p>{info.treatment_name}</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-sm-3">
                                          <div className="para-main-div">
                                            <h6>Charge:</h6>
                                          </div>
                                        </div>
                                        <div className="col-sm-5">
                                          <div className="para-main-div">
                                            <p>
                                              {info.treatment_course_fee}{" "}
                                              {info.duration}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                  <div className="service-list">
                                    <h6>Hospital</h6>
                                  </div>
                                  <ul className="mb-2">
                                    {info.Hospital_details.map((item) => {
                                      console.log(item);
                                      return (
                                        <>
                                          <li>
                                            <div className="row">
                                              <div className="col-sm-3">
                                                <div className="para-main-div">
                                                  <h6>Name:</h6>
                                                </div>
                                              </div>
                                              <div className="col-sm-5">
                                                <div className="para-main-div">
                                                  <p>{item.hospital_Name}</p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-sm-3">
                                                <div className="para-main-div">
                                                  <h6>Charge:</h6>
                                                </div>
                                              </div>
                                              <div className="col-sm-5">
                                                <div className="para-main-div">
                                                  <p>{item.hospital_charge}</p>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        </>
                                      );
                                    })}
                                  </ul>
                                  <div className="service-list">
                                    <h6>Free Services</h6>
                                  </div>
                                  <ul className="mb-2">
                                    {info?.services?.map((item, index) => {
                                      console.log(item);
                                      if (item.service_type === "Free") {
                                        return (
                                          <li
                                            key={item._id || item.serviceName}
                                          >
                                            <div className="row" key={index}>
                                              <div className="col-sm-3">
                                                <div className="para-main-div">
                                                  <h6>Name:</h6>
                                                </div>
                                              </div>
                                              <div className="col-sm-5">
                                                <div className="para-main-div">
                                                  <p>{item.serviceName} </p>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        );
                                      }
                                      return null;
                                    })}
                                  </ul>
                                  <div className="service-list">
                                    <h6>Extra Services</h6>
                                  </div>
                                  <ul className="mb-2">
                                    {info?.services?.map((item) => {
                                      if (!item.price) return null;
                                      return (
                                        <li key={item._id || item.service_type}>
                                          <div className="row">
                                            <div className="col-sm-3">
                                              <div className="para-main-div">
                                                <h6>Name:</h6>
                                              </div>
                                            </div>
                                            <div className="col-sm-5">
                                              <div className="para-main-div">
                                                <p>{item.serviceName}</p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-sm-3">
                                              <div className="para-main-div">
                                                <h6>Price:</h6>
                                              </div>
                                            </div>
                                            <div className="col-sm-5">
                                              <div className="para-main-div">
                                                <p>
                                                  {item.price} {"  "}{" "}
                                                  {item.duration}<br />
                                                  {new Date(item.startTime).toLocaleDateString("en-GB")} to {new Date(item.endTime).toLocaleDateString("en-GB")	}
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </div>
                                <div className="col-md-6">
                                  <div className="service-list">
                                    <h6>Appointment</h6>
                                  </div>
                                  <ul className="mb-2">
                                    {info.appointments_details?.map((item) => {
                                      console.log(item);
                                      return (
                                        <>
                                          <li>
                                            <div className="row">
                                              <div className="col-sm-3">
                                                <div className="para-main-div">
                                                  <h6>ID:</h6>
                                                </div>
                                              </div>
                                              <div className="col-sm-5">
                                                <div className="para-main-div">
                                                  <p>{item.appointmentId}</p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-sm-3">
                                                <div className="para-main-div">
                                                  <h6>Date:</h6>
                                                </div>
                                              </div>
                                              <div className="col-sm-5">
                                                <div className="para-main-div1">
                                                  <p>{item.appointment_Date}</p>
                                                  {item.status ===
                                                  "Complete" ? (
                                                    <p>{item.status}</p>
                                                  ) : (
                                                    <FormControl
                                                      sx={{
                                                        m: 1,
                                                        minWidth: 120,
                                                      }}
                                                      size="small"
                                                      className="app-status"
                                                    >
                                                      <Select
                                                        value={
                                                          item.status ===
                                                          "pending"
                                                            ? "1"
                                                            : item.status ===
                                                              "Follow-Up"
                                                            ? "2"
                                                            : item.status ===
                                                              "Complete"
                                                            ? "3"
                                                            : item.status ===
                                                              "Cancelled"
                                                            ? "4"
                                                            : "1"
                                                        }
                                                        onChange={(e) =>
                                                          handleChangeDetails(
                                                            e,
                                                            item.appointmentId
                                                          )
                                                        }
                                                        displayEmpty
                                                        inputProps={{
                                                          "aria-label":
                                                            "Without label",
                                                        }}
                                                        className="status-direct1"
                                                      >
                                                        <MenuItem
                                                          value="1"
                                                          disabled
                                                        >
                                                          Schedule
                                                        </MenuItem>
                                                        <MenuItem value="2">
                                                          Follow-Up
                                                        </MenuItem>
                                                        <MenuItem value="3">
                                                          Complete
                                                        </MenuItem>
                                                        <MenuItem value="4">
                                                          Cancelled
                                                        </MenuItem>
                                                      </Select>
                                                    </FormControl>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        </>
                                      );
                                    })}
                                  </ul>
                                  {info?.appointments_details?.length > 0 &&
                                    info.appointments_details.map(
                                      (appointment, index) => (
                                        <ul key={index}>
                                          <li>
                                            <div className="row">
                                              <div className="col-sm-3">
                                                <div className="para-main-div">
                                                  <h6>Vehicle Number:</h6>
                                                </div>
                                              </div>
                                              <div className="col-sm-5">
                                                <div className="para-main-div">
                                                  <p>
                                                    {appointment.vehicle_no}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-sm-3">
                                                <div className="para-main-div">
                                                  <h6>Driver Name:</h6>
                                                </div>
                                              </div>
                                              <div className="col-sm-5">
                                                <div className="para-main-div">
                                                  <p>
                                                    {appointment.driver_name}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-sm-3">
                                                <div className="para-main-div">
                                                  <h6>Driver Contact:</h6>
                                                </div>
                                              </div>
                                              <div className="col-sm-5">
                                                <div className="para-main-div">
                                                  <p>
                                                    {appointment.driver_contact}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-sm-3">
                                                <div className="para-main-div">
                                                  <h6>Pickup Time:</h6>
                                                </div>
                                              </div>
                                              <div className="col-sm-5">
                                                <div className="para-main-div">
                                                  <p>
                                                    {appointment.pickup_time}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        </ul>
                                      )
                                    )}

                                  {/* <div>
                                      <div className="row">
                                        <div className="col-sm-3 mb-2">
                                          <h6>Vehicle Number:</h6>
                                          <p>
                                            {
                                              info.appointments_details[0]
                                                .vehicle_no
                                            }
                                          </p>
                                        </div>
                                        <div className="col-sm-3 mb-2">
                                          <h6>Driver Name:</h6>
                                          <p>
                                            {
                                              info.appointments_details[0]
                                                .driver_name
                                            }
                                          </p>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-sm-3 mb-2">
                                          <h6>Driver Contact:</h6>
                                          <p>
                                            {
                                              info.appointments_details[0]
                                                .driver_contact
                                            }
                                          </p>
                                        </div>
                                        <div className="col-sm-3 mb-2">
                                          <h6>Pickup Time:</h6>
                                          <p>
                                            {
                                              info.appointments_details[0]
                                                .pickup_time
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div> */}
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
                              {/* <div className="experience-box">
                                <ul className="experience-list">
                                  <li>
                                    <div className="experience-user">
                                      <div className="before-circle"></div>
                                    </div>
                                    <div className="experience-box">
                                      <ul className="experience-list">
                                        <li>
                                          <div className="experience-user">
                                            <div className="before-circle"></div>
                                          </div>
                                          <div className="experience-content">
                                            <div className="timeline-content">
                                              <a className="name">
                                                Treatment Name-
                                                {info.treatment_name}
                                              </a>

                                            </div>
                                            {info.Hospital_details.map(
                                              (item) => {
                                                console.log(item);
                                                return (
                                                  <>
                                                    <div className="timeline-content">
                                                      <a className="name">
                                                        Hospital Name-
                                                        {item.hospital_Name}
                                                      </a>
                                                      <div className="ms-4 d-flex">
                                                        Hospital charge-
                                                        {item.hospital_charge}
                                                        <p>{item.status}</p>
                                                      </div>
                                                    </div>
                                                  </>
                                                );
                                              }
                                            )}
                                            {info.appointments_details.map(
                                              (item) => {
                                                console.log(item);
                                                return (
                                                  <>
                                                    <div className="timeline-content">
                                                      <a className="name">
                                                        Appointment ID-
                                                        {item.appointmentId}
                                                      </a>
                                                      <div className="d-flex">
                                                        Appointment Date-
                                                        {item.appointment_Date}
                                                        {item.status ===
                                                          "Complete" ? (
                                                          <p className="ms-5">
                                                            {item.status}
                                                          </p>
                                                        ) : (
                                                          <p className="ms-4">
                                                            <FormControl
                                                              sx={{
                                                                m: 1,
                                                                minWidth: 120,
                                                              }}
                                                              size="small"
                                                            >
                                                              <Select
                                                                value={
                                                                  item.status ===
                                                                    "pending"
                                                                    ? "1"
                                                                    : item.status ===
                                                                      "Follow-Up"
                                                                      ? "2"
                                                                      : item.status ===
                                                                        "Complete"
                                                                        ? "3"
                                                                        : item.status ===
                                                                          "Cancelled"
                                                                          ? "4"
                                                                          : "1"
                                                                }
                                                                onChange={(e) =>
                                                                  handleChangeDetails(
                                                                    e,
                                                                    item.appointmentId
                                                                  )
                                                                }
                                                                displayEmpty
                                                                inputProps={{
                                                                  "aria-label":
                                                                    "Without label",
                                                                }}
                                                              >
                                                                <MenuItem value="1">
                                                                  Schedule
                                                                </MenuItem>
                                                                <MenuItem value="2">
                                                                  Follow-Up
                                                                </MenuItem>
                                                                <MenuItem value="3">
                                                                  Complete
                                                                </MenuItem>
                                                                <MenuItem value="4">
                                                                  Cancelled
                                                                </MenuItem>
                                                              </Select>
                                                            </FormControl>
                                                          </p>
                                                        )}
                                                      </div>
                                                    </div>
                                                  </>
                                                );
                                              }
                                            )}

                                            Paid Extra Services -<br />
                                            {info?.services?.map((item) => {
                                              if (!item.price) return null;

                                              return (
                                                <div
                                                  className="timeline-content"
                                                  key={
                                                    item._id ||
                                                    item.service_type
                                                  }
                                                >
                                                  <a className="name">

                                                    {item.serviceName}
                                                  </a>

                                                  {item.serviceType && (
                                                    <div className="d-flex">
                                                      Type - {item.serviceType}
                                                    </div>
                                                  )}

                                                  <div className="d-flex">
                                                    Price - {item.price}
                                                  </div>
                                                </div>
                                              );
                                            })}

                                            <div className="timeline-content mt-3">
                                              <a className="name">
                                                Free Services -<br />
                                                {info?.services?.map((item) => {
                                                  if (
                                                    item.service_type === "Free"
                                                  ) {
                                                    return (
                                                      <div
                                                        className="timeline-content"
                                                        key={
                                                          item._id ||
                                                          item.serviceName
                                                        }
                                                      >
                                                        <a className="name">
                                                          {item.serviceName}
                                                        </a>
                                                      </div>
                                                    );
                                                  }
                                                  return null;
                                                })}
                                              </a>
                                            </div>
                                            <div>
                                              Total Charge-
                                              {info.treatment_total_charge}
                                            </div>
                                            <span className="time d-flex">
                                              treatment due payment-
                                              {info.treatment_due_payment}
                                            </span>
                                          </div>
                                        </li>
                                      </ul>

                                    </div>
                                  </li>
                                </ul>
                              </div> */}
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="bottom-tab2">
                <div className="main-tab-hd">
                  <div className="all-hd">
                    <h6>Passport Details</h6>
                  </div>
                  <button
                    onClick={(e) => handleClickOpen2(e)}
                    className="add-button"
                  >
                    <span>
                      <i className="fa fa-plus"></i>
                    </span>{" "}
                    Add Passport
                  </button>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {kys?.length === 0
                      ? "No passport details found"
                      : kys?.map((info, index) => (
                          <div key={index} className="card-box">
                            <div className="pass-detail">
                              <div className="img-patient">
                                <h6>Patient Image</h6>
                                <img
                                  src={`${image}${info.photo}`}
                                  alt="no image"
                                  className="rounded-circle shadow"
                                  width="100"
                                  height="100"
                                />
                              </div>
                              <div className="id-proof">
                                <h6>Id Proof</h6>
                                {info.id_proof ? (
                                  <a
                                    href={`https://sisccltd.com/omca_crm/${info.id_proof}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-primary btn-sm"
                                  >
                                    View PDF
                                  </a>
                                ) : (
                                  <span className="text-muted">
                                    Not Uploaded
                                  </span>
                                )}
                                <div className="">
                                  <h6>Passport</h6>
                                  {info.passport ? (
                                    <a
                                      href={`https://sisccltd.com/omca_crm/${info.passport}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="view-pass"
                                    >
                                      View Passport
                                    </a>
                                  ) : (
                                    <span className="text-muted">
                                      Not Uploaded
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="bottom-tab3">
                <div className="main-tab-hd">
                  <div className="all-hd">
                    <h6>Discussion Notes</h6>
                  </div>
                  <button
                    onClick={(e) => handleClickOpen5(e)}
                    className="add-button"
                  >
                    <span>
                      <i className="fa fa-plus"></i>
                    </span>{" "}
                    Add Notes
                  </button>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {notes?.length === 0 ? (
                      "No notes for Patient"
                    ) : (
                      <>
                        {notes?.map((info, index) => {
                          console.log(info);
                          return (
                            <>
                              <div className="card-box">
                                <div className="note-view">
                                  <h3 className="card-title">
                                    Note-{index + 1}
                                  </h3>
                                </div>
                                <div className="experience-box">
                                  <ul className="experience-list">
                                    <li>
                                      <div className="experience-user">
                                        <div className="before-circle"></div>
                                      </div>
                                      <div className="experience-content d-flex">
                                        <div className="timeline-content">
                                          <a href="#/" className="name">
                                            {info.note}
                                          </a>
                                          <div>
                                            {new Date(
                                              info.date
                                            ).toLocaleDateString("en-GB")}
                                          </div>
                                          {/* <span className="time">treatment due payment-{info.treatment_due_payment}</span> */}
                                        </div>
                                        <div>
                                          {" "}
                                          <i
                                            className="fa fa-edit text-primary "
                                            onClick={() => {
                                              handleopenNotesModal(info.id);
                                            }}
                                            style={{ cursor: "pointer" }}
                                          ></i>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="bottom-tab4">
                <div className="main-tab-hd">
                  <div className="all-hd">
                    <h6>Payment Details</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {/* {payment_details?.length === 0 ? (
                      "No payment details for patients"
                    ) : (
                      <>
                        {" "}
                        {payment_details?.map((info, index) => {
                          console.log(info)
                          return(
                            <>
 <div className="card-box">
                            <div className=" ">
                            
                              <button
                                className="btn btn btn-primary btn-rounded float-right"
                                onClick={(e) =>
                                  handleClickOpen3(e, info.treatment_id)
                                }
                              >
                                <i className="fa fa-plus"></i> Add Amount
                              </button>
                            </div>
                            <h3 className="card-title">
                              Payment Date-
                              {moment(info.payment_Date).format("L")}
                            </h3>
                            <p>Treatment ID-{info.treatment_id}</p>
                            <div className="experience-box">
                              <ul className="experience-list">
                                <li>
                                  <div className="experience-user">
                                    <div className="before-circle"></div>
                                  </div>
                                  <div className="experience-content">
                                    <div className="timeline-content">
                                      <a href=" " className="name">
                                        Payment Method-{info.paymentMethod}
                                      </a>
                                      <div>Paid amount-{info.paid_amount}</div>


                                      {/* {info.status} */}
                    {/* <span className="time">payment_Date-{info.payment_Date}</span> */}
                    {/* </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                            </>
                          )
                        }
                        )}
                      </>
                    )} */}

                    {payment_details?.length === 0 ? (
                      "No payment details for patients"
                    ) : (
                      <>
                        {/* {payment_details?.map((info, index) => {
                          console.log(info);
                          return (
                            <div className="card-box" key={index}>
                              <div className=" ">
                                {/* Show button only for first item */}
                        {/* {index === 0 && (
                                  <button
                                    className="btn btn btn-primary btn-rounded float-right"
                                    onClick={(e) =>
                                      handleClickOpen3(e, info.treatment_id)
                                    }
                                  >
                                    <i className="fa fa-plus"></i> Add Amount
                                  </button>
                                )}
                              </div>
                              <h3 className="card-title">
                                Payment Date -{" "}
                                {moment(info.payment_Date).format("L")}
                              </h3>
                              <p>Treatment ID - {info.treatment_id}</p>
                              <div className="experience-box">
                                <ul className="experience-list">
                                  <li>
                                    <div className="experience-user">
                                      <div className="before-circle"></div>
                                    </div>
                                    <div className="experience-content">
                                      <div className="timeline-content">
                                        <a href=" " className="name">
                                          Payment Method - {info.paymentMethod}
                                        </a>
                                        <div>
                                          Paid amount - {info.paid_amount}
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          );
                        })} */}
                        {groupedPayments &&
                          Object.entries(groupedPayments).map(
                            ([treatmentId, payments], index) => (
                              <div className="card-box" key={treatmentId}>
                                <div className="treat-card">
                                  <div className="treat-id">
                                    <div>
                                      <h3>Treatment ID-{treatmentId}</h3>
                                    </div>
                                  </div>
                                  <div className="">
                                    <button
                                      onClick={(e) =>
                                        handleClickOpen3(e, treatmentId)
                                      }
                                      className="add-button"
                                    >
                                      <span>
                                        <i className="fa fa-plus"></i>
                                      </span>{" "}
                                      Add Amount
                                    </button>
                                  </div>
                                </div>
                                <hr></hr>
                                <div className="experience-box">
                                  <ul className="experience-list">
                                    {payments.map((info, idx) => (
                                      <li key={idx}>
                                        <div className="experience-user">
                                          <div className="before-circle"></div>
                                        </div>
                                        <div className="experience-content">
                                          <div className="timeline-content">
                                            <div>
                                              Payment Date -{" "}
                                              {moment(info.payment_Date).format(
                                                "L"
                                              )}
                                            </div>
                                            <div>
                                              Payment Method -{" "}
                                              {info.paymentMethod}
                                            </div>
                                            <div>
                                              Paid Amount - {info.paid_amount}
                                            </div>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )
                          )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="bottom-tab5">
                <div className="main-tab-hd">
                  <div className="all-hd">
                    <h6>Reports</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {payment_details?.length === 0 ? (
                      "No Reports for patients "
                    ) : (
                      <>
                        {groupedPayments &&
                          Object.entries(groupedPayments).map(
                            ([treatmentId, payments], index) => (
                              <div className="card-box" key={treatmentId}>
                                <div className="treat-card">
                                  <div className="treat-id">
                                    <div>
                                      <h3>Treatment ID-{treatmentId}</h3>
                                    </div>
                                  </div>
                                  <div className="">
                                    <button
                                      onClick={(e) =>
                                        handleClickOpen10(e, treatmentId)
                                      }
                                      className="add-button"
                                    >
                                      <span>
                                        <i className="fa fa-plus"></i>
                                      </span>{" "}
                                      Add Report
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        <div className="col-md-12">
                          <div className="table-responsive">
                            <TableContainer
                              component={Paper}
                              style={{ overflowX: "auto" }}
                            >
                              <Table
                                stickyHeader
                                aria-label="sticky table"
                                className="table-no-card"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Tratment ID</TableCell>
                                    <TableCell>Course Name </TableCell>
                                    <TableCell>Report Title </TableCell>
                                    <TableCell>Reports</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {reportdataget &&
                                    reportdataget.length > 0 &&
                                    reportdataget.map((item, index) => {
                                      return (
                                        <>
                                          <TableRow key={index}>
                                            <TableCell>
                                              {item.treatmentId}
                                            </TableCell>
                                            <TableCell>
                                              {item.treatment_course_name}
                                            </TableCell>
                                            <TableCell>
                                              {item.reportTitle}
                                            </TableCell>
                                            <TableCell>
                                              <a
                                                href={`${image}${item.treatmentReport}`}
                                              >
                                                Download Report
                                              </a>
                                            </TableCell>
                                          </TableRow>
                                        </>
                                      );
                                    })}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* add-service-modal-start */}
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
              <Box>
                <div className="field-set mb-0">
                  <label>
                    Select Treatment<span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    name="treatment"
                    onChange={andlechange}
                  >
                    <option>Select Treatment</option>
                    {treatmentuser.map((item, index) => {
                      console.log(item);
                      return (
                        <>
                          <option key={index} value={item.treatmentId}>
                            {item.treatment_name}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
              </Box>
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
      {/* add-service-modal-end */}
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
                      options={
                        dataHospital?.map((job) => job.hospitalName) || []
                      } // Fallback to empty array
                      onChange={(e, value) => {
                        const selectedCourse = dataHospital?.find(
                          (job) => job.hospitalName === value
                        );
                        const courseId = selectedCourse
                          ? selectedCourse.hospitalId
                          : null;
                        setHospitalId(courseId);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Hospital" />
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
                      disabled={isSubmitting} // ✅ disables button while submitting
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </DialogActions>
                  {/* <DialogActions className="submit-main">
                    <Button
                      type="submit"
                      onClick={(e) => handlesubmit(e)}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </DialogActions> */}
                </form>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      {/* add-hospital-modal-end */}
      {/* add-appointment-modal-start */}
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open1}
          onClose={handleClose1}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Add Appointment</h6>
            </div>
            <div className="cross-icon" onClick={handleClose1}>
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
                  className="contact-form"
                  method="post"
                  role="form"
                >
                  
                  <div className="field-set">
                       <div>
      <p>Appointment will be:</p>
      <div className="d-flex">
      <div className="me-5">
 <label>
        <input
          type="radio"
          name="status"
          value="online"
          
          checked={statuddropdown === 'online'}
                      onChange={(e) => setStatuddropdown(e.target.value)}

          // onChange={handleChange}
        />
        Online
      </label>
      </div>
     
      <br />
      <div>
 <label>
        <input
          type="radio"
          name="status"
          value="offline"
          checked={statuddropdown === 'offline'}
                                onChange={(e) => setStatuddropdown(e.target.value)}

          // onChange={handleChange}
        />
        Offline
      </label>
      </div>
     </div>

      {/* <p>Your selected status: <strong>{status}</strong></p> */}
    </div>
                    <label>
                      Hospital<span className="text-danger">*</span>
                    </label>
                    <Autocomplete
                      disablePortal
                      options={
                        ishospitalArray?.map((job) => job.hospital_Name) || []
                      } // Fallback to empty array
                      onChange={(e, value) => {
                        const selectedCourse = ishospitalArray?.find(
                          (job) => job.hospital_Name === value
                        );
                        const courseId = selectedCourse
                          ? selectedCourse.hospital_id
                          : null;
                        setAppHospital(courseId);
                      }}
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
                      value={date}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    <span style={{ color: "red" }}>
                      {appointErr && !note ? "*Please Enter Your date" : ""}
                    </span>
                  </div>
                  {
                    statuddropdown === 'offline' ?
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
                      // min={new Date().toISOString().split("T")[0]}
                    />
                    <span style={{ color: "red" }}>
                      {appointErr && !pickuptime
                        ? "*Please Select Pickup Time"
                        : ""}
                    </span>
                    {/* <span style={{ color: "red" }}>
                      {appointErr && !note ? "*Please Enter Your date" : ""}
                    </span> */}
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
                      Driver Contact<span className="text-danger">*</span>
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
                    <span style={{ color: "red" }}>
                      {appointErr && !drivercontact
                        ? "*Please Enter the Driver Name"
                        : ""}
                    </span>
                  </div>
                  <div className="field-set">
                    <label>
                      Vehicle Number<span className="text-danger">*</span>
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
                    <span style={{ color: "red" }}>
                      {appointErr && !vehicalnumber
                        ? "*Please Enter the Driver Name"
                        : ""}
                    </span>
                  </div> 
                   </>: ""
                  }
                  
              {statuddropdown === 'offline'?    <DialogActions className="submit-main">
                    <Button
                      type="submit"
                      onClick={(e) => handlesubmitAppoint(e)}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </DialogActions>: <DialogActions className="submit-main">
                    <Button
                      type="submit"
                      onClick={(e) => handlesubmitAppoint111(e)}
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </DialogActions>
}
                </form>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </React.Fragment>
      {/* add-appointment-modal-end */}
      {/* add-password-modal-start */}
      <React.Fragment>
        <Dialog
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open2}
          onClose={handleClose2}
        >
          <div className="main-card-header">
            <div className="note-hd">
              <h6>Add Passport</h6>
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
                      ID Proof<span className="text-danger">*</span>
                    </label>
                    <div className="upload-input">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => onChangeFile(e, "id_proof")}
                      />
                    </div>
                  </div>
                  <div className="field-set">
                    <label>
                      Passport<span className="text-danger">*</span>
                    </label>
                    <div className="upload-input">
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => onChangeFile(e, "passport")}
                      />
                    </div>
                  </div>
                  <div className="field-set">
                    <label>
                      Photo<span className="text-danger">*</span>
                    </label>
                    <div className="upload-input">
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => onChangeFile(e, "photo")}
                      />
                    </div>
                  </div>
                  <DialogActions className="submit-main">
                    <Button
                      type="submit"
                      onClick={(e) => handleKysDetail(e)}
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
      {/* add-password-modal-end */}
      {/* add-notes-modal-start */}
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
      {/* add-notes-modal-end */}
      {/* add-payment-modal-start */}
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
                  <div className="field-set">
                    <label>
                      Payment Method<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="payment Method"
                      className="form-control"
                      name="paymentMethod"
                      required=""
                      onChange={AddpaymentOnchnage}
                      value={data.paymentMethod}
                    />
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
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <DialogActions className="submit-main">
                    <Button
                      type="submit"
                      onClick={(e) => handleAddTritmentPayment(e)}
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
      {/* Notes modal*/}
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
                  {/* <div className="field-set">
                    <label>
                      Date<span className="text-danger">*</span>
                    </label>
                    <div className="upload-input">
                      <input
                        type="date"
                        value={nodaestInput.date}
                        className="form-control"
                        name="date"
                        onChange={handlechangenotesdata}
                      />
                    </div>
                  </div> */}

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
