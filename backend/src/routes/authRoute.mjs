import {Router} from 'express'
import AuthController from '../controllers/authController.mjs';
import {protect} from "../middlewares/protect.mjs"


const authRouter = Router();

authRouter.post("/signup", AuthController.signUp);
authRouter.post("/signin", AuthController.signIn);

// It will return user Detials
authRouter.get("/profile",protect ,AuthController.profile)


export default authRouter;