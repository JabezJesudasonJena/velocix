import prisma from "../db/prismadb.mjs"
import AppError from "../utils/appError.mjs";

const parsePositiveInt = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

class StoreService{
    static async AddStore(data, user){
        if(user.role != "store-admin"){
            throw new AppError("Not a store-admin", 403);
        }

        // Map the incoming coordinates to the Store columns the schema expects.
        return await prisma.store.create({
            data:{
                name: data.name,
                ownerId:user.id,
                latitude: data.lat ?? data.latitude,
                longitude: data.lng ?? data.longitude   
            }
        })
    }


    static async getAllStores(query = {}){
        const page = parsePositiveInt(query.page, 1);
        const limit = parsePositiveInt(query.limit, 20);
        const skip = (page - 1) * limit;

        // Page store results so the endpoint stays responsive on large tables.
        const stores = await prisma.store.findMany({
            skip,
            take: limit,
            orderBy: {
                id: "asc"
            }
        });
        if(!stores || stores.length ==0){
            throw new AppError("No Store There", 401 );
        }
        return stores;
    }

    static async getSingleStore(storeId){
        return await prisma.store.findFirst({
            where:{
                id: Number(storeId)
            }
        });
    }

    static async getCurrentUserStore(userId){
        // Return the store owned by the signed-in user for frontend setup flows.
        const store = await prisma.store.findFirst({
            where: {
                ownerId: Number(userId)
            }
        });

        if (!store) {
            throw new AppError("Store is not there in database", 404);
        }

        return store;
    }

}

export default StoreService;