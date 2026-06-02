import { Router } from "express";
import StoreController from "../controllers/storeController.mjs";
import { jwtMiddleware, sessionMiddleware } from "../middlewares/jwtMiddleware.mjs";
import { protect } from "../middlewares/protect.mjs";

const storeRouter = Router();

storeRouter.post("/create",protect,StoreController.AddStore);
storeRouter.get("/check", protect, StoreController.getCurrentUserStore);
storeRouter.get("/:id", jwtMiddleware, StoreController.getSingleStore);
storeRouter.get("/allstore",StoreController.getAllStores);

export default storeRouter;