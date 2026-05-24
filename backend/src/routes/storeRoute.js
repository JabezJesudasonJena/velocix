import { Router } from "express";
import { createStoreController, getAllStoreController, storeExist } from "../controllers/storeController.mjs";
import { jwtMiddleware, sessionMiddleware } from "../middlewares/jwtMiddleware.mjs";

const storeRouter = Router();

storeRouter.post("/create",jwtMiddleware,createStoreController);
storeRouter.get("/allstore",getAllStoreController);
storeRouter.get("/check", jwtMiddleware, storeExist)

export default storeRouter;