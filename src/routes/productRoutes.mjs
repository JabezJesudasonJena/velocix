import { Router } from "express";
import { checkStoreValidity } from "../middlewares/storeExistMiddle.mjs";
import { sessionMiddleware } from "../middlewares/jwtMiddleware.mjs";
import { createProductController } from "../controllers/productController.mjs";

const productRouter = Router();

productRouter.post(
    "/create",
    sessionMiddleware,
    checkStoreValidity,
    createProductController
)
    
export default productRouter;