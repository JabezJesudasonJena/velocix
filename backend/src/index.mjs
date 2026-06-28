import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes/index.mjs";
dotenv.config();


//File Imports
import globalErrorHandler from "./utils/errorHandler.js";
import AppError from "./utils/appError.mjs";

const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));

//Global middleware for logs
app.use((req, res, next) => {
    console.log(`${req.method}\t${req.url}`);   
    next();
})
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


export default app;