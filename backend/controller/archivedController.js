import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { ArchivedPatient } from "../models/archiveSchema.js";
import { Outpatient } from "../models/outpatientSchema.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

// Archive Outpatient or Inpatient
export const archivePatient = catchAsyncErrors(async (req, res, next) => {
    const patientId = req.params.id;

    // Find the patient (either outpatient or inpatient) by ID
    const outpatient = await Outpatient.findById(patientId);
    const inpatient = await Inpatient.findById(patientId); // Assuming you have an Inpatient model

    let patientToArchive = null;
    let dischargeDate = null;

    if (outpatient) {
        // Archive the outpatient
        patientToArchive = outpatient;

        // Set dischargeDate to current date for outpatient archiving
        dischargeDate = new Date(); // Archive date is set to the current date
    } else if (inpatient) {
        // Archive the inpatient
        patientToArchive = inpatient;

        // Set dischargeDate to current date for inpatient archiving
        dischargeDate = new Date(); // Archive date is set to the current date
    } else {
        return next(new ErrorHandler("Patient not found!", 404));
    }

    // Create archived patient without deleting the original patient data
    const archivedPatient = await ArchivedPatient.create({
        firstName: patientToArchive.firstName,
        middleName: patientToArchive.middleName,
        lastName: patientToArchive.lastName,
        dob: patientToArchive.dob,
        gender: patientToArchive.gender,
        mobile: patientToArchive.mobile,
        landline: patientToArchive.landline,
        email: patientToArchive.email,
        address: patientToArchive.address,
        primaryHealthConcern: patientToArchive.primaryHealthConcern,
        medicalHistory: patientToArchive.medicalHistory,
        currentMedications: patientToArchive.currentMedications,
        familyMedicalHistory: patientToArchive.familyMedicalHistory,
        insuranceInformation: patientToArchive.insuranceInformation,
        patientId: patientToArchive.patientId,
        appointmentDate: patientToArchive.appointmentDate, // For outpatients
        dischargeDate: dischargeDate, // Set the discharge date to the current date
        status: "Archived",
    });

    res.status(201).json({
        success: true,
        message: "Patient archived successfully!",
        archivedPatient,
    });
});

