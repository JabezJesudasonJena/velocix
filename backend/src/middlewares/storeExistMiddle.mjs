import prisma from "../db/prismadb.mjs";
import AppError from "../utils/appError.mjs";

export const checkStoreValidity = async (req , res , next) => {
    // Normalize the store id before querying Prisma.
    const checkPrismaStore = Number(req.body.storeId);
    if(!checkPrismaStore) throw new AppError("Invalid store id", 400);
    const searchStore = await prisma.store.findUnique({
        where : {
            id : checkPrismaStore
        }
    })
    if(!searchStore) throw new AppError("Store is not there in database", 400);
    req.store = searchStore;
    next();
}