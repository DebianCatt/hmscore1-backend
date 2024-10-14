import mongoose from "mongoose";
import validator from "validator";

const inpatientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [2, "First name must contain at least 2 characters!"],
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true,
        minLength: [2, "Last name must contain at least 2 characters!"],
    },
    dob: {
        type: Date,
        required: [true, "Date of Birth is required!"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"],
    },
    mobile: {
        type: String,
        required: true,
        minLength: [10, "Mobile number must be at least 10 digits!"],
        maxLength: [15, "Mobile number cannot exceed 15 digits!"],
    },
    landline: {
        type: String,
    },
    email: {
        type: String,
        validate: [validator.isEmail, "Please provide a valid email!"],
    },
    address: {
        type: String,
        required: true,
    },
    primaryHealthConcern: {
        type: String,
        required: true,
    },
    medicalHistory: {
        type: String,
    },
    currentMedications: {
        type: String,
    },
    familyMedicalHistory: {
        type: String,
    },
    insuranceInformation: {
        provider: {
            type: String,
        },
        policyNumber: {
            type: String,
        },
    },
    patientId: {
        type: String,
        unique: true,
        required: true,
    },
    admissionDate: {
        type: Date,
        required: true,
    },
    wardRoomPreference: {
        type: String,
    },
    expectedLengthOfStay: {
        type: Number, // in days
    },
    emergencyContact: {
        name: {
            type: String,
            required: true,
        },
        relationship: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
    },
    guardianDetails: {
        name: {
            type: String,
        },
        relationship: {
            type: String,
        },
    },
    status: {
        type: String,
        enum: ["Active", "Discharged"],
        default: "Active",
    },
});

export const Inpatient = mongoose.model("Inpatient", inpatientSchema);
