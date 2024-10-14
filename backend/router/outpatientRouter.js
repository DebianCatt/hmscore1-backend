import express from "express";
import { postOutpatient, dischargeOutpatient, getOutpatients } from "../controller/outpatientController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
import  * as outpatientController from "../controller/outpatientController.js"

const router = express.Router();


router.post("/add", isAdminAuthenticated, postOutpatient);

// Route to fetch all outpatients
router.get("/outpatients", isAdminAuthenticated, getOutpatients);

// Route to discharge and archive an outpatient
router.post("/archive/:patientId", isAdminAuthenticated, dischargeOutpatient);


router.get('/count', outpatientController.getOutpatientCount);


export default router;
