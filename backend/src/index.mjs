import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {rateLimit} from "express-rate-limit"

import router from "./routes/index.mjs";
dotenv.config();


//File Imports
import globalErrorHandler from "./utils/errorHandler.js";
import AppError from "./utils/appError.mjs";

const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 10, 
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 64, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})


const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(limiter)
app.use("/api", router);

// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/health",(req, res)=>{
    res.send("Health os Ok!")
})

app.all("/*splat", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});


// Global Middleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});