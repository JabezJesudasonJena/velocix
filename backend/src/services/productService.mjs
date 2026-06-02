import prisma from "../db/prismadb.mjs";
import AppError from "../utils/appError.mjs";

const parsePositiveInt = (value, fallback) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

class ProductService{
    static async getAllProducts(query = {}){
        const page = parsePositiveInt(query.page, 1);
        const limit = parsePositiveInt(query.limit, 20);
        const skip = (page - 1) * limit;

        // Limit the result set so the API stays responsive on large tables.
        const products =  await prisma.product.findMany({
            skip,
            take: limit,
            orderBy: {
                id: "asc"
            }
        });
        if(products.length < 1){
            throw new AppError("No Products", 404)
        }
        return products;
    }

    static async addProduct(data, user, store){
        if (!store) {
            throw new AppError("Store is required to create a product", 400);
        }

        if (store.ownerId !== user.id) {
            throw new AppError("User does not own the store", 403);
        }

        // Persist the product against the validated store and owner.
        return await prisma.product.create({
            data : {
                name: data.name,
                price: data.price,
                storeId: store.id,
                category: data.category,
                isEdible: data.isEdible,
                stock: data.stock
            }
        });
    }

    static async getSingleProduct(productId){
        return await prisma.product.findFirst({
            where:{
                id: Number(productId)
            }
        });
    }

    static async getPaginatedProducts(page = {}){
        const currentPage = parsePositiveInt(page.page, 1);
        const limit = parsePositiveInt(page.limit, 20);
        const skip = (currentPage - 1) * limit;

        return await prisma.product.findMany({
            skip,
            take: limit,
            orderBy: {
                id: "asc"
            }
        })
    }

    static async getSortedProducts(){
        // Sort products alphabetically for the sorted list endpoint.
        return await prisma.product.findMany({
            orderBy:{
                name: "asc"
            },
            select:{
                id:true, name: true, price: true, storeId: true, category: true
            }
        })
    }
}

export default ProductService;