import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";
import inpatientRouter from "./router/inpatientRouter.js";
import outpatientRouter from "./router/outpatientRouter.js";
import archivedRouter from "./router/archivedRouter.js";
import cloudinary from "cloudinary";

const app = express();

// Cloudinary Configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors({
    origin: [process.env.DASHBOARD_URL || "https://core1.nodadogenhospital.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/inpatients", inpatientRouter);
app.use("/api/v1/outpatients", outpatientRouter);
app.use("/api/v1/archivedPatients", archivedRouter);
app.use("/api/v1/updateInpatients", inpatientRouter);
app.use("/api/v1/ward", wardRouter);

// test route
app.get("/test", (req, res) => {
    res.status(200).send("Backend is running!");
});

dbConnection();
app.use(errorMiddleware);

export default app;
