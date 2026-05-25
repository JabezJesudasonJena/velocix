import { Router } from "express";
import StoreController from "../controllers/storeController.mjs";
import { jwtMiddleware, sessionMiddleware } from "../middlewares/jwtMiddleware.mjs";

const storeRouter = Router();

storeRouter.post("/create",jwtMiddleware,StoreController.AddStore);
storeRouter.get("/:id", jwtMiddleware, StoreController.getSingleStore);
storeRouter.get("/allstore",StoreController.getAllStores);

export default storeRouter;