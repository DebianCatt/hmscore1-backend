
/*
CURRENTLY DISABLED FOR NOW



import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required: true,
        minLength: [2, "First name must contain atleast 2 characters!"]
    },
    lastName: {
        type:String,
        required: true,
        minLength: [2, "Last name must contain atleast 2 characters!"]
    },
    email: {
        type:String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email!"]
    },
    phone: {
        type:String,
        required: true,
        minLength: [11, "Phone number must be 11 Digits!"],
        maxLength: [11, "Phone number must be 11 Digits!"]
    },
    philsysornic: {  //PhilSys ID  or National Identity Card(NIC)
        type:String,
        required: true,
        minLength: [12, "PhilSys or NIC must contain atleast 12 characters!"],
        maxLength: [12, "PhilSys or NIC must contain atleast 12 characters!"]
    },
    dob: {
        type: Date,
        required: [true, "Date of Birth is required!"],

    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    appointment_date: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },

    
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);


*/