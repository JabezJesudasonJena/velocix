import { Router } from "express";
import { createStoreController, getAllStoreController, storeProtectCreateController } from "../controllers/storeController.mjs";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.mjs";

const storeRouter = Router();

storeRouter.post("/create",createStoreController);
storeRouter.get("/allstore",getAllStoreController);
storeRouter.post("/",jwtMiddleware, storeProtectCreateController);

export default storeRouter;