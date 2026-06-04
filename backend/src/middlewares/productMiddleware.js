import prisma from "../db/prismadb.mjs";
import AppError from "../utils/appError.mjs";

export const store = async (req , res, next) => {
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