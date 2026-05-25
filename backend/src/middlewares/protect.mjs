import jwt from "jsonwebtoken";
import AppError from "../utils/appError.mjs";
import { catchAsync } from "../utils/catchAsync";

export const protect = catchAsync(async(req, res, next)=> {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.cookies.jwt
    }else if(req.cookies && req.cookies.jwt){
        token = req.cookies.jwt
    }
    if(!token){
        throw new AppError('You are not logged. Please Log in to get Access', 401);
    }
    
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
})