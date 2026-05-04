import {Router} from 'express'
import {signInController, signUpController} from "../controllers/authController.mjs";

const authRouter = Router();

authRouter.post("/signup", signUpController);
authRouter.post("/signin", signInController);


export default authRouter;