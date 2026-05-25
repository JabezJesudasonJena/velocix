import { Router } from "express";
import { testGetProducts } from "../controllers/testController.mjs";

const testRouter = Router();

testRouter.get("/", testGetProducts)

export default testRouter;