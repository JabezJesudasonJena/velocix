import { Router } from "express";
import { checkStoreValidity } from "../middlewares/storeExistMiddle.mjs";
import { sessionMiddleware } from "../middlewares/jwtMiddleware.mjs";
import { createProductController, getfilterproduct, getProduct, getSortedProduct } from "../controllers/productController.mjs";

const productRouter = Router();

productRouter.post(
    "/create",
    sessionMiddleware,
    checkStoreValidity,
    createProductController
)

productRouter.get("/sorted",getSortedProduct);

productRouter.get("/:id",getProduct)

productRouter.get("/", getfilterproduct)
    
export default productRouter;