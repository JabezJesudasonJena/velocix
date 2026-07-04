import {Router} from "express";
import authRoute from "./authRoute.mjs";
import storeRouter from "./storeRoute.js";
import { sessionMiddleware } from "../middlewares/jwtMiddleware.mjs";
import productRouter from "./productRoutes.mjs";
import orderRouter from "./orderRoute.mjs"
import testRouter from "./testRoute.mjs";
import consumerRouter from "./consumerRouter.mjs";
import categoryRouter from "./categoryRoute.mjs"
import locationRouter from "./locationRoute.mjs";
import userRouter from "./userRoute.mjs";

const router = Router();

router.use("/auth", authRoute);
router.use("/store", storeRouter);
router.use("/product", productRouter);
router.use("/order",orderRouter);
router.use('/category', categoryRouter);
router.use("/user", userRouter);

//Homepage  
// router.use("/location", consumerRouter);
router.use("/location", locationRouter);

//Router to test  spped of Prisma query
router.use("/test", testRouter);

router.get("/", sessionMiddleware, (req, res) => {
    res.status(200).json({msg :  "succes authenticated"})
})

export default router;