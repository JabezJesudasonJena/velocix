import {Router} from 'express';
import UserController from '../controllers/userController.mjs';
import { protect } from '../middlewares/protect.mjs';
import UserMidd from '../middlewares/userMiddleware.mjs';


const userRouter = Router();

userRouter.post(
    "/new",
    protect,
    UserMidd.userValidity,
    UserController.setAddress
);

export default userRouter;