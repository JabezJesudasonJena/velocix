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

export const getSingleProductService = async (data) => {
    try {
        console.log(data)
        const prismaProduct = await prisma.product.findMany({
            where : {
                id: data.id
            }
        })
        return prismaProduct
    }catch(err){
        return err
    }
}

export const getPaginatedProductService = async (data) => {
    try {
        const filteredPrismaProducts = await prisma.product.findMany({
            skip:+data.skip,
            take:+data.take
        })
        return filteredPrismaProducts
    }catch(err){
        return err
    }
}

export const getSortedProductService = async () => {
    try {
        const prismaOrderdProducts = await prisma.product.findMany({
            where:{
                name: true
            },
            orderBy: {
                name: "asc"
            },
            select: {
                id : true, 
                price: true, 
                storeId: true,
                category: true
            }
        })
        return prismaOrderdProducts;
    }catch(err){
        return err
    }
}