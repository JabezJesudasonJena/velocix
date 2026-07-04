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

userRouter.patch(
    "/edit",
    protect,
    UserMidd.userValidity,
    UserController.updateUserDetails
)

export default userRouter;