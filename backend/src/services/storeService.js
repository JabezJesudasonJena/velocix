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
                lat: data.lat ?? data.latitude,
                lng: data.lng ?? data.longitude   
            }
        })
    }


    static async getAllStores(){
        const stores = await prisma.store.findMany({});
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

    static async getSingleStoreWithProducts(storeId){
        return await prisma.store.findFirst({
            where:{
                id: Number(storeId)
            },
            include: {
                products: true
            }
        })
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

    static async updateStoreName(storeId, newName, userId){
        const store = await prisma.store.findFirst({
            where: {
                id: Number(storeId)
            }
        });
        if (!store) {
            throw new AppError("Store is not there in database", 404);
        }
        if (store.ownerId !== Number(userId)) {
            throw new AppError("User does not own the store", 403);
        }
        return await prisma.store.update({
            where: {
                id: Number(storeId)
            },
            data: {
                name: newName
            }
        });
    }

}

export default StoreService;