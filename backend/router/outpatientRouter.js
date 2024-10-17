import express from "express";
import { postOutpatient, dischargeOutpatient, getOutpatients } from "../controller/outpatientController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
import  * as outpatientController from "../controller/outpatientController.js"

const router = express.Router();


router.post("/add", isAdminAuthenticated, postOutpatient);


router.get("/outpatients", isAdminAuthenticated, getOutpatients);


router.post("/archive/:patientId", isAdminAuthenticated, dischargeOutpatient);


router.get('/count', outpatientController.getOutpatientCount);

router.put("/update/:patientId", isAdminAuthenticated, outpatientController.updateOutpatient);




export default router;
