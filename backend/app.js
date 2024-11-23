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


const app = express();

app.use(cors({
    origin: [
      process.env.DASHBOARD_URL, // Frontend URL in .env
      "https://core1.nodadogenhospital.com", // Frontend URL directly added for CORS
      "https://hmscore1-backend.vercel.app", // Vercel Backend URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies if needed
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

// Test route to check if the backend is working
app.get("/test", (req, res) => {
  res.status(200).send("Backend is running!");
});

dbConnection();

app.use(errorMiddleware);

export default app;
