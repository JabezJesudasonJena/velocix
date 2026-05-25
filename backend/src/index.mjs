import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/index.mjs";
dotenv.config();


//File Imports
import globalErrorHandler from "./utils/errorHandler.js";
import AppError from "./utils/appError.mjs";

const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use("/api", router);

// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/health",(req, res)=>{
    res.send("Health os Ok!")
})

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


// Global Middleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});