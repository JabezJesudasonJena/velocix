import jwt from "jsonwebtoken";
import AppError from "../utils/appError.mjs";
import { catchAsync } from "../utils/catchAsync.js";

export const protect = catchAsync(async(req, res, next)=> {
    let token;


    //Extract the token from the headers or cookie
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }else if(req.cookies && req.cookies.jwt){
        token = req.cookies.jwt
    }
    // Handle: No token
    if(!token){
        throw new AppError('You are not logged. Please Log in to get Access', 401);
    }
    
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
})

export const protectProduct = catchAsync(async(req, res, next) => {
    // This middleware is used to protect product routes and check if the user is the owner of the store.
    // The store is attached to the request in the checkStoreValidity middleware, so we can access it here.\ 
    if(req.store.ownerId !== req.user.id){
        throw new AppError("You do not own this store", 403);
    }
    next();
})