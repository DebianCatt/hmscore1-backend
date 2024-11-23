import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import {errorMiddleware} from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
//import appointmentRouter from "./router/appointmentRouter.js";
import inpatientRouter from "./router/inpatientRouter.js";
import outpatientRouter from "./router/outpatientRouter.js";
import archivedRouter from "./router/archivedRouter.js";
//import { updateInpatient } from "./controller/inpatientController.js";



const app = express();
config({path: "./config/config.env"});

app.use(cors({
    origin: [process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));


//app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
//app.use("/api/v1/appointment", appointmentRouter);
app.use("/api/v1/inpatients", inpatientRouter);
app.use("/api/v1/outpatients", outpatientRouter);
app.use("/api/v1/archivedPatients", archivedRouter);
app.use("/api/v1/updateInpatients", inpatientRouter);


dbConnection();

app.use(errorMiddleware);

export default app;






