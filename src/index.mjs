import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.mjs";
dotenv.config();


const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api", router);


// Routers



// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});