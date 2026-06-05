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
        
        /* Traditional way to create store 
        const store =  await prisma.store.create({
            data:{
                name: data.name,
                ownerId:user.id,
                lat: data.lat ?? data.latitude,
                lng: data.lng ?? data.longitude   
            }
         })
        */
        return await prisma.$executeRaw`
            INSERT INTO "Store" ("name","ownerId","desc","location")
            VALUES(
                ${data.name},
                ${user.id},
                ${data.desc},
                ST_SetSRID(ST_MakePoint(${data.lng}, ${data.lat}), 4326)
            )
        `
    }


    static async getAllStores(){
        const stores = await prisma.store.findMany({});
        if(!stores || stores.length ==0){
            throw new AppError("No Store There", 401 );
        }
        return stores;
    }

    static async getSingleStore(storeId){
        const store= await prisma.store.findFirst({
            where:{
                id: Number(storeId)
            }
        });
        console.log(store);
        return store;
    }

    static async getSingleStoreWithProducts(storeId){
        const store = await prisma.$queryRaw`
            SELECT 
                s.id,
                s.name,
                s."ownerId",
                s.desc,
                ST_Y(s.location::geometry) AS lat,
                ST_X(s.location::geometry) AS lng,
                COALESCE(json_agg(p) FILTER (WHERE p.id IS NOT NULL), '[]') AS products
            FROM "Store" s
            LEFT JOIN "Product" p ON p."storeId" = s.id
            WHERE s.id = ${storeId}
            GROUP BY s.id;
        `;
        return store[0];
    }

    static async getNearestStore(data){
        const lat = parseFloat(data.lat);
        const lng = parseFloat(data.lng);
        const radiusInMeters = parseInt(data.radius,10) || 5000;

        if(isNaN(lat) || isNaN(lng)){
            throw new AppError("Latitude and Longitude are not valid", 400);
        }

        /*  
            Nearest Store caalculation:
                DistanceSphere checks the nearest location based on the req.query
                
        */
        
        const nearestStores = await prisma.$queryRaw`
            SELECT 
                id, 
                name,
                "ownerId",
                desc,
                ST_Y(location::geometry) AS lat,
                ST_X(location::geometry) AS lng,
                ST_DistanceSphere(location, ST_MakePoint(${lng}, ${lat})) as distance_meters
            FROM "Store"
            WHERE ST_DistanceSphere(location, ST_MakePoint(${lng}, ${lat})) <= ${radiusInMeters}
            ORDER BY distance_meters ASC;
        `;

        return nearestStores;

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