import { Router } from "express";
import LocationController from "../controllers/locationController.mjs";


const locationRouter = Router();

locationRouter.get(
    "/",
    LocationController.getNearestStores
)

export default locationRouter