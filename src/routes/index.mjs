import {Router} from "express";
import authRoute from "./authRoute.mjs";
import storeRouter from "./storeRoute.js";
import { sessionMiddleware } from "../middlewares/jwtMiddleware.mjs";
import productRouter from "./productRoutes.mjs";
import orderRouter from "./orderRoute.mjs"

const router = Router();

router.use("/auth", authRoute);
router.use("/store", storeRouter);
router.use("/product", productRouter);
router.use("/order",orderRouter);

router.get("/", sessionMiddleware, (req, res) => {
    res.status(200).json({msg :  "succes authenticated"})
})

export default router;