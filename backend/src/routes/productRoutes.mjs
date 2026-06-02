import { Router } from "express";
import { checkStoreValidity } from "../middlewares/storeExistMiddle.mjs";
import { protect } from "../middlewares/protect.mjs";
import ProductController from "../controllers/productController.mjs";


const productRouter = Router();

productRouter.post(
    "/create",
    protect,
    checkStoreValidity,
    ProductController.addProduct
)

productRouter.get("/sorted",ProductController.getSortedProducts);

productRouter.get("/", ProductController.getAllProducts)
productRouter.get("/paginated", ProductController.getPaginatedProduct)


productRouter.put("/update/:id", protect, ProductController.updateProduct)

productRouter.get("/:id",ProductController.getProduct)



export default productRouter;