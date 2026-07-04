import { Router } from "express"
import CategoryController from "../controllers/categoryController.mjs"

const categoryRouter = Router();

categoryRouter.post(
    "/create",
    CategoryController.createCategory
)

categoryRouter.get(
    "/",
    CategoryController.getAllCategories
)

categoryRouter.get(
    "/all",
    CategoryController.getCategoriesWithProducts
)

categoryRouter.get(
    "/search",
    CategoryController.getCategoryByName
)

categoryRouter.get(
    "/:id",
    CategoryController.getSingleCategory
)

export default categoryRouter;
