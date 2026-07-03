import { Router } from "express";
import OrderController from "../controllers/orderController.mjs";
import { protect } from "../middlewares/protect.mjs";


const orderRouter = Router();

orderRouter.post(
    "/create",
    OrderController.placeOrder
)

orderRouter.post(
    "/place",
    protect,
    OrderController.createOrder
)

export default orderRouter;