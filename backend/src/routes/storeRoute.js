import { Router } from "express";
import StoreController from "../controllers/storeController.mjs";
import { protect } from "../middlewares/protect.mjs";

const storeRouter = Router();
// Get all stores for the homepage, no auth required.
storeRouter.get("/",StoreController.getAllStores);

// Create a store, auth required. A user can only have one store, so we check for that in the controller.
storeRouter.post("/create",protect,StoreController.AddStore);

// Get the current user's store, auth required.
storeRouter.get("/check", protect, StoreController.getCurrentUserStore);

//This will retrun a store details with products  
storeRouter.get("/storeproducts/:id", StoreController.getStoreWithProducts)

// Update store name, auth required.
storeRouter.put("/update/:id", protect, StoreController.updateStoreName);

// For now it will return the single store detials 
storeRouter.get("/:id", StoreController.getSingleStore);



export default storeRouter;