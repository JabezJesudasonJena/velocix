import {Router} from 'express'
import AuthController from '../controllers/authController.mjs';

const authRouter = Router();

authRouter.post("/signup", AuthController.signUp);
authRouter.post("/signin", AuthController.signIn);


export default authRouter;