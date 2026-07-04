import { catchAsync } from "../utils/catchAsync.js";
import prisma from "../db/prismadb.mjs";

class LocationController {
    static getNearestStores = catchAsync(async(req , res) => {
        const lat = parseFloat(req.query.lat);
        const lng = parseFloat(req.query.lng);

        if (isNaN(lat) || isNaN(lng)) {
            return res.status(400).json({ 
                success: false, 
                message: "Valid latitude and longitude are required." 
            });
        }

        // Use Prisma's raw query to leverage PostGIS spatial functions
        // ST_MakePoint takes (Longitude, Latitude)
        // ST_Distance returns the distance in meters.
        const stores = await prisma.$queryRaw`
            SELECT 
                id, 
                name, 
                "desc", 
                status, 
                lat, 
                lng,
                ST_Distance(location, ST_MakePoint(${lng}, ${lat})::geography) as distance_meters
            FROM "Store"
            WHERE status = 'active'
            ORDER BY distance_meters ASC
            LIMIT 20;
        `;

        // Prisma sometimes returns raw numeric calculations as BigInt or unformatted types.
        // We clean up the response before sending it to the frontend.
        const formattedStores = stores.map(store => ({
            ...store,
            distance_meters: Number(store.distance_meters),
            distance_km: (Number(store.distance_meters) / 1000).toFixed(2) // Convert to km
        }));

        return res.status(200).json({
            success: true,
            data: formattedStores
        });
    })
}

export default LocationController;