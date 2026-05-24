import { Router } from "express";
import { createStoreController, getAllStoreController } from "../controllers/storeController.mjs";
import { jwtMiddleware, sessionMiddleware } from "../middlewares/jwtMiddleware.mjs";

const storeRouter = Router();

storeRouter.post("/create",jwtMiddleware,createStoreController);
storeRouter.get("/allstore",getAllStoreController);

export default storeRouter;