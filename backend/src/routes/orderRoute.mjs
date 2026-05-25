import { Router } from "express";
import OrderController from "../controllers/orderController.mjs";


const orderRouter = Router();

orderRouter.post(
    "/create",
    OrderController.placeOrder
)

export default orderRouter;