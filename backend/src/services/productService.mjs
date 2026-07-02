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
                categoryId: 1,
                sku: data.sku,
                desc: data.desc
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

    static async createProduct( body, storeId){
        const {data} = body;
        if(!storeId) throw new AppError("Store Id is not defiend");
        else if(!data) throw new AppError("Data is not defiened");
        return await prisma.$transaction(async(tx) => {
            const product = await tx.product.create({
                data:{
                    name : data.name,
                    price: data.price,
                    desc: data.desc,
                    storeId: storeId,
                    categoryId: data.categoryId,
                    sku: data.sku
                }
            });
            await tx.inventory.create({
                data:{
                    producId: product.id,
                    quantity: data.quantity,
                    reservedQuantity: 0
                }
            });
            await tx.ProductImage.createMany({
                data:data.images.map(url => {
                    productId: product.id,
                    url
                })
            })
        })
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

    static async getProductsByName(name){
        if(!name) throw new AppError("No Name defined",400);
        const products =  await prisma.product.findMany({
            where:{
                name: name
            },
            orderBy:{
                id: "asc"
            }
        })
        if(products.length == 0) throw new AppError("No Products Found !", 400)
        return products;
    }

    static async searchProducts(data){
        if(!data) throw new AppError("No Search query is passed");
        return await prisma.product.findMany({
            where: {
                name : {
                    contains : data,
                    mode: 'insensitive'
                }
            }
        })
    }

    static async updateProduct(productId, userId ,data){
        const store = await prisma.store.findFirst({
            where:{
                ownerId: userId
            }
        })
        if(!store) throw new AppError("There is no store owned by user", 400) 
        const product = await prisma.product.findFirst({
            where:{
                id: Number(productId)
            }
        });
        if(!product) throw new AppError("No Product Found !", 404)
        if(product.storeId != store.id) throw new AppError("The Product is not from the store the user owns", 404);

        return await prisma.product.update({
            where:{
                id: Number(productId)
            },
            data: data
        })

    }


    static async getFewProducts(data) {
        const {skip, take, limit} = data;
        return await prisma.product.findMany({
            skip: skip || 10,
            take: take || 100,
            limit: 100
        })
    }
}

export default ProductService;