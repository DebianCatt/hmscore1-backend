import express from "express";
import { isAdminAuthenticated } from "../middlewares/auth.js";
import { addWard, getWardList} from "../controller/wardController.js";

const router = express.Router();
router.get('/', isAdminAuthenticated, getWardList);
router.post('/create', isAdminAuthenticated, addWard);

export default router;
