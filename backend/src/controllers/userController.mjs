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

    static updateUserDetails = catchAsync(async(req, res) => {
        const user = await UserService.updateUserDetails(req.user.id, req.body);
        return res.status(200).json({
            success: true,
            data: user
        })
    })
}

export default UserController;