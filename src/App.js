import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { AdminLogin } from "./pages/authentication/AdminLogin";
import { Forgot } from "./pages/authentication/Forgot";
import Dashboard from "./pages/Dashboard";
import Patient from "./pages/Patient/Patient";
import Appointment from "./pages/Appointments/Appointments";
import History from "./pages/History";
import Reports from "./pages/Reports";
import Earnings from "./pages/Earning";
import Inquiry from "./pages/Inquiry";
import Treatments from "./pages/Treatments/Treatments";
import Hospitals from "./pages/Hospitals/Hospitals";
import Countries from "./pages/Countries/Countries";
import Staff from "./pages/Staff/Staff";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import AddAppointments from "./pages/Appointments/AddAppointments";
import EditAppointments from "./pages/Appointments/EditAppointments";
import AddPatient from "./pages/Patient/AddPatient";
import EditPatient from "./pages/Patient/EditPatient";
import AddTreatments from "./pages/Treatments/AddTreatments";
import EditTreatments from "./pages/Treatments/EditTreatments";
import AddStaff from "./pages/Staff/AddStaff";
import EditStaff from "./pages/Staff/EditStaff";
import AddCountries from "./pages/Countries/AddCountries";
import EditCountries from "./pages/Countries/EditCountries";
import AddHospitals from "./pages/Hospitals/AddHospitals";
import EditHospitals from "./pages/Hospitals/EditHospitals";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Main from "./components/Admin";
import Protected from "./components/Protected";
import Permission from "../src/pages/Permission/Permission";
import PatientDetail from "./pages/Patient/PatientDetail";
import AddEnquiry from "./pages/Enquiry/AddEnquiry";
import EditEnquiry from "./pages/Enquiry/EditEnquiry";
import AddPatientTreatment from "./pages/Patient/AddPatientTreatment";
import Services from "./pages/Services Section/AllServices";
import AddServices from "../src/pages/Services Section/AddServices";
import ChnagePassword from "./pages/ChnagePassword";
import { AuthOpt } from "./pages/authentication/AuthOpt";
import { ResetPassword } from "./pages/authentication/ResetPassword";
import EnquiryDetail from "./pages/Enquiry/EnquiryDetail";
import Newpermission from "./pages/Permission/Newpermission";
import EditService from "./pages/Services Section/EditService";
import Totaluser from "./pages/Hospitals/Totaluser";
function App() {
  //   const [count, setCount] = useState(0);

  // setCount(count + 1);
  // setCount(count + 1);

  // console.log(count);

  console.log("22/04/25");
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            {/* <div className="main-wrapper"> */}
            <Route path="/" element={<AdminLogin />} />
            <Route path="/Forgot" element={<Forgot />} />
            <Route path="/opt" element={<AuthOpt />} />
            <Route path="/Reset" element={<ResetPassword />} />
            <Route
              path="/Dashboard"
              element={<Protected Component={Dashboard} />}
            />
            {/* <div className="content-wrapper"> */}
            <Route path="/Admin" element={<Protected Component={Main} />}>
              <Route index path="/Admin/Permission" element={<Permission />} />
              <Route
                index
                path="/Admin/New-Permission"
                element={<Newpermission />}
              />
              <Route index path="/Admin/patients" element={<Patient />} />
              <Route
                index
                path="/Admin/chnage-password"
                element={<ChnagePassword />}
              />
              <Route
                index
                path="/Admin/appointments"
                element={<Appointment />}
              />
              <Route index path="/Admin/history" element={<History />} />
              <Route index path="/Admin/reports" element={<Reports />} />
              <Route index path="/Admin/earnings" element={<Earnings />} />
              <Route in path="/Admin/inquiry" element={<Inquiry />} />
              <Route index path="/Admin/Services" element={<Services />} />
              <Route index path="/Admin/edit-service" element={<EditService />} />
              <Route
                index
                path="/Admin/add-Services"
                element={<AddServices />}
              />
              <Route index path="/Admin/treatments" element={<Treatments />} />
              <Route index path="/Admin/hospitals" element={<Hospitals />} />
              <Route index path="/Admin/countries" element={<Countries />} />

              <Route index path="/Admin/staff" element={<Staff />} />
              <Route
                index
                path="/Admin/notifications"
                element={<Notifications />}
              />
              <Route index path="/Admin/settings" element={<Settings />} />
              <Route index path="/Admin/profile" element={<Profile />} />
              <Route
                index
                path="/Admin/edit-profile"
                element={<EditProfile />}
              />
              <Route
                index
                path="/Admin/add-appointments"
                element={<AddAppointments />}
              />
              <Route
                path="/Admin/edit-appointments"
                index
                element={<EditAppointments />}
              />
              <Route index path="/Admin/add-patient" element={<AddPatient />} />
              <Route
                index
                path="/Admin/edit-patient"
                element={<EditPatient />}
              />
              <Route
                index
                path="/Admin/add-treatments"
                element={<AddTreatments />}
              />
              <Route
                index
                path="/Admin/edit-treatments"
                element={<EditTreatments />}
              />
              <Route index path="/Admin/add-staff" element={<AddStaff />} />
              <Route index path="/Admin/edit-staff" element={<EditStaff />} />
              <Route
                index
                path="/Admin/add-countries"
                element={<AddCountries />}
              />
              <Route
                index
                path="/Admin/edit-countries"
                element={<EditCountries />}
              />
              <Route
                index
                path="/Admin/add-hospitals"
                element={<AddHospitals />}
              />
              <Route
                index
                path="/Admin/totalUser"
                element={<Totaluser />}
              />
              <Route
                index
                path="/Admin/edit-hospitals"
                element={<EditHospitals />}
              />
              <Route
                index
                path="/Admin/Patient-Detail"
                element={<PatientDetail />}
              />
              <Route index path="/Admin/add-Enquiry" element={<AddEnquiry />} />
              <Route
                index
                path="/Admin/edit-Enquiry"
                element={<EditEnquiry />}
              />
              <Route
                Patient-Detail
                path="/Admin/add-patient-treatment"
                element={<AddPatientTreatment />}
              />
              <Route
                index
                path="/Admin/Enquiry-Detail"
                element={<EnquiryDetail />}
              />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
