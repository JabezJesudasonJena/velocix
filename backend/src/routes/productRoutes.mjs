import { Router } from "express";
import { checkStoreValidity } from "../middlewares/storeExistMiddle.mjs";
import { protect } from "../middlewares/protect.mjs";
import ProductController from "../controllers/productController.mjs";
import { store, storeProtectMidd } from "../middlewares/productMiddleware.js";


const productRouter = Router();

productRouter.post(
    "/create",
    protect,
    store,
    ProductController.addProduct
)

productRouter.post(
    "/add",
    protect,
    store,
    storeProtectMidd,
    ProductController.createProduct
)

productRouter.get("/sorted",ProductController.getSortedProducts);

productRouter.get("/", ProductController.getAllProducts)
productRouter.get("/paginated", ProductController.getPaginatedProduct)
productRouter.get("/productsbyname", ProductController.getProductsByName);
productRouter.get("/search", ProductController.getSearchProduct)


// Parametric Routes
productRouter.put("/update/:id", protect, ProductController.updateProduct)

productRouter.get("/:id",ProductController.getProduct)



export default productRouter;