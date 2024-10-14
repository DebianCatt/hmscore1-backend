import mongoose from "mongoose";

const archiveSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    dob: Date,
    gender: String,
    mobile: String,
    landline: String,
    email: String,
    address: String,
    primaryHealthConcern: String,
    medicalHistory: String,
    currentMedications: String,
    familyMedicalHistory: String,
    insuranceInformation: {
        provider: String,
        policyNumber: String,
    },
    patientId: String,
    appointmentDate: Date,   // For outpatients
    dischargeDate: Date,     // For inpatients
    followUpNeeded: Boolean, // For outpatients
    wardRoomPreference: String, // For inpatients
    expectedLengthOfStay: Number, // For inpatients
    emergencyContact: {
        name: String,
        relationship: String,
        contactNumber: String,
    },
    guardianDetails: {
        name: String,
        relationship: String,
    },
    status: String, // Can be "Active" or "Archived"
});



export const ArchivedPatient = mongoose.model("ArchivedPatient", archiveSchema);
