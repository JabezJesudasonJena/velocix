import {Router} from "express";
import authRoute from "./authRoute.mjs";

const router = Router();

router.use("/auth", authRoute)

export default router;