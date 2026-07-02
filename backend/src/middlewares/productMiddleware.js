import prisma from "../db/prismadb.mjs";
import AppError from "../utils/appError.mjs";

export const store = async (req , res, next) => {
    console.log(req.body.storeId)
    const store = await prisma.store.findFirst({
        where:{
            id: req.body.storeId
        }
    })
    if(!store) throw new AppError("No Store found!",400);
    if(req.user.id !== store.ownerId) throw new AppError("You should be the owner of the store to Add products", 404);
    req.store = store;
    next();
}

export const storeProtectMidd = async (req, res, next) => {
    if(!req.user.id || !req.store.ownerId) {
        throw new AppError("No store or user data provided", 404);
    }
    if(req.user.id != req.store.ownerId) {
        throw new AppError("This user is not the owner of the store !", 400);
    }
    next();
}