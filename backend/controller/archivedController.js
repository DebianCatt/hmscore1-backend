import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ArchivedPatient } from "../models/archiveSchema.js";
import { Outpatient } from "../models/outpatientSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// Archive Outpatient
export const archiveOutpatient = catchAsyncErrors(async (req, res, next) => {
    const outpatientId = req.params.id;

    // Find the outpatient by ID
    const outpatient = await Outpatient.findById(outpatientId);

    if (!outpatient) {
        return next(new ErrorHandler("Outpatient not found!", 404));
    }

    // Archive the outpatient
    const archivedOutpatient = await ArchivedPatient.create({
        firstName: outpatient.firstName,
        middleName: outpatient.middleName,
        lastName: outpatient.lastName,
        dob: outpatient.dob,
        gender: outpatient.gender,
        mobile: outpatient.mobile,
        landline: outpatient.landline,
        email: outpatient.email,
        address: outpatient.address,
        primaryHealthConcern: outpatient.primaryHealthConcern,
        medicalHistory: outpatient.medicalHistory,
        currentMedications: outpatient.currentMedications,
        familyMedicalHistory: outpatient.familyMedicalHistory,
        insuranceInformation: outpatient.insuranceInformation,
        patientId: outpatient.patientId,
        appointmentDate: outpatient.appointmentDate,
        followUpNeeded: outpatient.followUpNeeded,
        status: "Archived",
    });

    // Remove the outpatient record from the original collection
    await Outpatient.findByIdAndDelete(outpatientId);

    res.status(201).json({
        success: true,
        message: "Outpatient archived successfully!",
        archivedOutpatient,
    });
});

// Get Archived Patients (Both Inpatients and Outpatients)
export const getArchivedPatients = catchAsyncErrors(async (req, res, next) => {
    const archivedPatients = await ArchivedPatient.find(); //includes both archived inpatients and outpatients

    if (!archivedPatients.length) {
        return next(new ErrorHandler("No archived patients found!", 404));
    }

    res.status(200).json({
        success: true,
        archivedPatients,
    });
});
