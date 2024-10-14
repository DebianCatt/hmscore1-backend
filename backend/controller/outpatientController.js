import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Outpatient } from "../models/outpatientSchema.js";
import { ArchivedPatient } from "../models/archiveSchema.js";
import { v4 as uuidv4 } from "uuid";


export const postOutpatient = catchAsyncErrors(async (req, res, next) => {
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
        appointmentDate,
        followUpNeeded,
    } = req.body;

    if (!firstName || !lastName || !dob || !gender || !mobile || !address || !primaryHealthConcern || !appointmentDate) {
        return next(new ErrorHandler("Please fill up all required fields!", 400));
    }

    // Gennenerate a unique patient ID
    const patientId = uuidv4();

    const outpatient = await Outpatient.create({
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
        appointmentDate,
        followUpNeeded,
    });

    res.status(201).json({
        success: true,
        message: "Outpatient record created successfully!",
        outpatient,
    });
});


export const dischargeOutpatient = catchAsyncErrors(async (req, res, next) => {
    const { patientId } = req.params;

    // Find the outpatient record by patientId
    const outpatient = await Outpatient.findOne({ patientId });
    if (!outpatient) {
        return next(new ErrorHandler("Outpatient not found!", 404));
    }

    // Create an archived record from the outpatient data
    const archivedPatient = await ArchivedPatient.create({
        ...outpatient.toObject(), // Copy outpatient data
        status: "Archived", // Set status to Archived
    });

    // Delete the original outpatient record. Optional
    await Outpatient.deleteOne({ patientId });

    res.status(200).json({
        success: true,
        message: "Outpatient discharged and archived successfully!",
        archivedPatient,
    });
});


export const getOutpatients = catchAsyncErrors(async (req, res, next) => {
    const outpatients = await Outpatient.find(); // Fetch all outpatients from the database

    if (!outpatients) {
        return next(new ErrorHandler("No outpatients found!", 404));
    }

    res.status(200).json({
        success: true,
        outpatients, // Send the outpatient records in the response
    });
});



export const getOutpatientCount = catchAsyncErrors(async (req, res, next) => {
    const count = await Outpatient.countDocuments(); // Count all outpatient records
    res.status(200).json({
        success: true,
        count, // Send back the count
    });
});

