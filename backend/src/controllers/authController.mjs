import AuthService from "../services/authService.mjs"
import { catchAsync } from "../utils/catchAsync.js";

class AuthController{
    static signUp = catchAsync(async (req, res) => {
        const user = await AuthService.signUp(req.body);
        return res.status(201).json({
            success: true,
            data: user
        })
    })

    static signIn = catchAsync(async (req, res) => {
        const token = await AuthService.signIn(req.body);
        
        //HttpOnly Cookie sending to frontend
        res.cookie('jwt', token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite:'strict',
            maxAge: 7*24*60*60 *1000 // 7 Days
        })

        //Sending jwt as a response
        return res.status(200).json({
            success: true,
            token: token
        });
    })
}

export default AuthController;