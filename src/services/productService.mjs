import prisma from "../db/prismadb.mjs";


export const createProductService = async (data, user, store) => {
    if (store.ownerId != user.id) throw new Error("User does not own the store");
    try{
        const prismaProduct = await prisma.product.create({
            data : {
                name: data.name,
                price: data.price,
                storeId: data.storeId,
                category: data.category,
                isEdible: data.isEdible,
                quantity: data.quantity
            }
        })
        return prismaProduct
    }catch(err){
        return {err : err}
    }
    
}