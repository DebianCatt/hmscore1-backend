import express from "express";
import { archiveOutpatient, getArchivedPatients } from "../controller/archivedController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Route to get all archived patients (inpatients and outpatients)
router.get("/", isAdminAuthenticated, getArchivedPatients);

// Route to archive an outpatient by ID
router.post("/archiveOutpatient/:id", isAdminAuthenticated, archiveOutpatient);


export default router;
