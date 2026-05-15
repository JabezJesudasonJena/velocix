import prisma from "../db/prismadb.mjs";

export const createOrderService = async (data) => {
    try{
        const prismaOrder = await prisma.order.create({
            data : {
                userId: data.userId,
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
        console.log(err)
        return {
            error: err.message
        }
    }
}