import prisma from "../db/prismadb.mjs";
import AppError from "../utils/appError.mjs";

class ProductService{
    static async getAllProducts(){
        const products =  await prisma.product.findMany({});
        if(products.length < 1){
            throw new AppError("No Products", 404)
        }
        return products;
    }

    static async addProduct(data){
        if (store.ownerId != user.id) throw new Error("User does not own the store");
        try{
            return await prisma.product.create({
                data : {
                    name: data.name,
                    price: data.price,
                    storeId: data.storeId,
                    category: data.category,
                    isEdible: data.isEdible,
                    stock: data.stock
                }
            });
        }catch(err){
            return err;
        }
    }

    static async getSingleProduct(productId){
        try{
            return await prisma.product.findFirst({
                where:{
                    id: Number(productId)
                }
            });
        }catch(err){
            return err;
        }
    }

    static async getPaginatedProducts(page){
        try{
            return prisma.product.findMany({
                skip:page.skip,
                take:page.take
            })
        }catch(err){
            return err;
        }
    }

    static async getSortedProducts(){
        try{
            return await prisma.product.findMany({
                orderB:{
                    name: "asc"
                },
                select:{
                    id:true, name: true, price: true, storeId: true, category: true
                }
            })
        }catch(err){
            return err;
        }
    }
}

export default ProductService;