import { Router } from "express";
import { createStoreController, getAllStoreController } from "../controllers/storeController.mjs";
import { sessionMiddleware } from "../middlewares/jwtMiddleware.mjs";

const storeRouter = Router();

storeRouter.post("/create",sessionMiddleware,createStoreController);
storeRouter.get("/allstore",getAllStoreController);

export default storeRouter;