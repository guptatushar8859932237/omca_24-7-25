import { configureStore } from "@reduxjs/toolkit";
import  authReducer from '../reducer/LoginSlice'
import staffReducer from '../reducer/StaffSlice'
import HospitalREducer from  '../reducer/HospitalSlice'
import TreatmentSlice from '../reducer/TreatmentSlice'
import Patientreducer from  '../reducer/PatientsSlice'
import Enquiryreducer from '../reducer/EnquirySlice'
import PatientTreatmentsreducer from '../reducer/PatientTreatmentSlice'
import Servicesreducer from '../reducer/ServiceSlice'
import permissionsSlice from '../reducer/PermissionsSlice'
import userreducer from '../reducer/userSlice'
import Countriesreducer from '../reducer/Countries'
import chnagepermisson from '../reducer/NewpermissonsSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer, // Use authReducer here
        staff:staffReducer,
        hospital:HospitalREducer,
        Treatment:TreatmentSlice,
        patient:Patientreducer,
        Enquiry:Enquiryreducer,
        PatientTreatments:PatientTreatmentsreducer,
        Service:Servicesreducer,
        Permissions:permissionsSlice,
        getuser:userreducer,
        Countries:Countriesreducer,
        NewPermissions:chnagepermisson


      }
})