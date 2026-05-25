import prisma from "../db/prismadb.mjs"
import AppError from "../utils/appError.mjs";

class StoreService{
    static async AddStore(data, user){
        if(user.role != "store-admin"){
            throw new Error("Not a store-admin");
        }
            return await prisma.store.create({
                data:{
                    name: data.name,
                    ownerId:user.id,
                    //Location
                    latitude: data.lat || data.latitude,
                    longitude: data.lng || data.longitude   
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
                id: storeId
            }
        });
    }

}

export default StoreService;