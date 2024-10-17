import express from "express";
import { postInpatient, dischargePatient, getAllInpatients } from "../controller/inpatientController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
import  * as inpatientController from "../controller/inpatientController.js";
import { updateInpatient } from "../controller/inpatientController.js";



const router = express.Router();


router.post("/add", isAdminAuthenticated, postInpatient); 
router.post("/discharge/:patientId", isAdminAuthenticated, dischargePatient);


router.get("/inpatients", isAdminAuthenticated, getAllInpatients);

router.get('/count', inpatientController.getInpatientCount);
router.put("/update/:patientId", isAdminAuthenticated, updateInpatient);



export default router;
