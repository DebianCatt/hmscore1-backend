// inpatientController.js

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Inpatient } from "../models/inpatientSchema.js";
import { ArchivedPatient } from "../models/archiveSchema.js";
import { v4 as uuidv4 } from "uuid";

// Adding an Inpatient
export const postInpatient = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        middleName,
        lastName,
        dob,
        gender,
        mobile,
        landline,
        email,
        address,
        primaryHealthConcern,
        medicalHistory,
        currentMedications,
        familyMedicalHistory,
        insuranceInformation,
        admissionDate,
        wardRoomPreference,
        expectedLengthOfStay,
        emergencyContact,
        guardianDetails,
    } = req.body;

    if (!firstName || !lastName || !dob || !gender || !mobile || !address || !primaryHealthConcern || !admissionDate) {
        return next(new ErrorHandler("Please fill up all required fields!", 400));
    }

    // Generate a unique patient ID
    const patientId = uuidv4();

    const inpatient = await Inpatient.create({
        firstName,
        middleName,
        lastName,
        dob,
        gender,
        mobile,
        landline,
        email,
        address,
        primaryHealthConcern,
        medicalHistory,
        currentMedications,
        familyMedicalHistory,
        insuranceInformation,
        patientId,
        admissionDate,
        wardRoomPreference,
        expectedLengthOfStay,
        emergencyContact,
        guardianDetails,
    });

    res.status(201).json({
        success: true,
        message: "Inpatient record created successfully!",
        inpatient,
    });
});

// Discharge a Patient
export const dischargePatient = catchAsyncErrors(async (req, res, next) => {
    const { patientId } = req.params; // Get patient ID from request parameters

    // Find the patient
    const patient = await Inpatient.findOne({ patientId });

    // Check if patient exists
    if (!patient) {
        return next(new ErrorHandler("Patient not found!", 404));
    }

    // Create an archived record from the inpatient data
    const archivedPatient = await ArchivedPatient.create({
        ...patient.toObject(), // Copy inpatient data
        status: "Archived", // Set status to Archived
    });

    // Delete the original inpatient record. Optional
    await Inpatient.deleteOne({ patientId });

    // Return success response
    res.status(200).json({
        success: true,
        message: "Patient discharged and archived successfully!",
        archivedPatient,
    });
});

export const getAllInpatients = async (req, res) => {
    try {
        const inpatients = await Inpatient.find();
        res.status(200).json({ inpatients });
    } catch (error) {
        res.status(500).json({ message: "Error fetching inpatients", error: error.message });
    }
};



export const getInpatientCount = catchAsyncErrors(async (req, res, next) => {
    const count = await Inpatient.countDocuments(); // Count all inpatient records
    res.status(200).json({
        success: true,
        count, // Send back the count
    });
});

