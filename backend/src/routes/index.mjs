import {Router} from "express";
import authRoute from "./authRoute.mjs";
import storeRouter from "./storeRoute.js";
import { sessionMiddleware } from "../middlewares/jwtMiddleware.mjs";
import productRouter from "./productRoutes.mjs";
import orderRouter from "./orderRoute.mjs"
import testRouter from "./testRoute.mjs";
import consumerRouter from "./consumerRouter.mjs";


const router = Router();

router.use("/auth", authRoute);
router.use("/store", storeRouter);
router.use("/product", productRouter);
router.use("/order",orderRouter);

//Homepage  
router.use("/location", consumerRouter);

//Router to test  spped of Prisma query
router.use("/test", testRouter);

router.get("/", sessionMiddleware, (req, res) => {
    res.status(200).json({msg :  "succes authenticated"})
})

export default router;