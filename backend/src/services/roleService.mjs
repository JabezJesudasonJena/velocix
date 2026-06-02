import prisma from "../db/prismadb.mjs";
import AppError from "../utils/appError.mjs";

const parsePositiveInt = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};


class ShoppingPageService{

    static async getUserName(userId){
        return await prisma.user.findFirst({
            where:{
                id: userId
            },
            select:{
                name:true, role: true
            }
        })
    }
    
    static async getProducts(query = {}){
        try {
            const page = parsePositiveInt(query.page, 1);
            const limit = parsePositiveInt(query.limit, 20);
            const skip = (page - 1) * limit;

            // Limit the products list instead of loading the entire table.
            return await prisma.product.findMany({
                skip,
                take: limit,
                orderBy: {
                    id: "asc"
                }
            })
        }catch(err){
            throw new AppError(err.message || "Unable to load products", 500);
        }
    }
    
}

export default  ShoppingPageService;