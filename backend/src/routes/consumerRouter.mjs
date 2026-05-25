import { Router } from "express";
import consumerController from "../controllers/consumerController.mjs";

const consumerRouter = Router();

consumerRouter.get("/nearestlocation", consumerController.getClosestLocation);

export default consumerRouter;