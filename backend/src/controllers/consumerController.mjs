import prisma from "../db/prismadb.mjs";
import { catchAsync } from "../utils/catchAsync.js";

class consumerController{

    static getClosestLocation = catchAsync( async(req, res) => {  
        const lat = parseFloat(req.query.lat);
        const lng = parseFloat(req.query.lng);

        if(isNaN(lat) || isNaN(lng)){
            return res.status(400).json({message: "Coordinates are not specified"})
        }

        // Only select columns that exist on Store and that the client needs.
        const nearestStores = await prisma.$queryRaw`
            SELECT id, name, latitude, longitude,
            ( 6371 * acos( cos( radians(${lat}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin( radians( latitude ) ) ) ) AS distance_km
            FROM "Store"
            WHERE latitude IS NOT NULL AND longitude IS NOT NULL
            ORDER BY distance_km ASC
            LIMIT 1
        `

        //Edge Cases Handling
        if(!nearestStores || nearestStores.length === 0){
            return res.status(400).json({message: "No Nearest stores found !"});
        }

        const nearestStore = nearestStores[0];
        
        const MAX_DELIEVERY_RADIUS_KM = 5;

        if(nearestStore.distance_km  > MAX_DELIEVERY_RADIUS_KM){
            return res.status(200).json({
                message: "You are outside delievery location",
                distance: nearestStore.distance_km  
            })
        }
        
        // Valid store
        res.status(200).json({
            success: true,
            data : nearestStore
        })
        }
    )
}

export default consumerController;