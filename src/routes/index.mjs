import {Router} from "express";
import authRoute from "./authRoute.mjs";
import storeRouter from "./storeRoute.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/store", storeRouter);

export default router;