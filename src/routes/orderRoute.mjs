import { Router } from "express";
import { sessionMiddleware} from "../middlewares/jwtMiddleware.mjs";
import PlaceOrderController from "../controllers/placeOrderController.mjs";


const orderRouter = Router();

orderRouter.post(
    "/create",
    PlaceOrderController.placeOrder
)

export default orderRouter;