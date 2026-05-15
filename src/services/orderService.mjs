import prisma from "../db/prismadb.mjs";

export const createOrderService = async (userId,data) => {
    try{
        const prismaOrder = await prisma.order.create({
            data : {
                userId: userId,
                storeId: data.storeId,
                total: data.total,
                items: {
                    create : data.items.map(item =>({ 
                            productId : item.productId,
                            quantity: item.quantity,
                            price: item.price
                    }))
                }
            }
        })
        return prismaOrder
    }catch(err){
        return {
            error: err.message
        }
    }
}