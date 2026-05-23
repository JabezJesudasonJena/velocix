import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.mjs";
import session from "express-session";
dotenv.config();


const PORT = process.env.PORT || 5000;

const app = express();

// session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api", router);


// Routers



// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});