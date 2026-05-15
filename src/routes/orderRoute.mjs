import { Router } from "express";
import { sessionMiddleware} from "../middlewares/jwtMiddleware.mjs";
import { createOrderController } from "../controllers/orderController.mjs";


const orderRouter = Router();

orderRouter.post(
    "/create",
    sessionMiddleware,
    createOrderController
)

export default orderRouter;