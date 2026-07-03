import UserService from "../services/userService.mjs";
import { catchAsync } from "../utils/catchAsync.js";

class UserController {
    static setAddress = catchAsync(async(req , res) => {
        const address = await UserService.setAddress(req.body);
        return res.status(201).json({
            success: true,
            data: address
        })
    })
}

export default UserController;