import prisma from "../db/prismadb.mjs";

export const checkStoreValidity = async (req , res , next) => {
    // Normalize the store id before querying Prisma.
    const checkPrismaStore = Number(req.body.storeId);
    if(!checkPrismaStore) return res.status(400).json({err: "Store id is not present"});
    const searchStore = await prisma.store.findUnique({
        where : {
            id : checkPrismaStore
        }
    })
    if(!searchStore) return res.status(400).json({err: "Store is not there in database"})
    req.store = searchStore;
    next();
}