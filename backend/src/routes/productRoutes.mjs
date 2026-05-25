import { Router } from "express";
import { checkStoreValidity } from "../middlewares/storeExistMiddle.mjs";
import { jwtMiddleware} from "../middlewares/jwtMiddleware.mjs";
import ProductController from "../controllers/productController.mjs";

const productRouter = Router();

productRouter.post(
    "/create",
    jwtMiddleware,
    checkStoreValidity,
    ProductController.addProduct
)

productRouter.get("/sorted",ProductController.getSortedProducts);

//productRouter.get("/:id",getProduct)

productRouter.get("/", ProductController.getAllProducts)



export default productRouter;