import prisma from "../db/prismadb.mjs";

export const createOrderService = async (userId,data) => {
    try{
        let total = 0;
        for (const item of data.items) {
            total += item.quantity * item.price;
        }
        const prismaOrder = await prisma.order.create({
            data : {
                userId: userId,
                storeId: data.storeId,
                total: total,
                status: data.status,
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


export const placeOrderService = async (userId, data) => {
    try {
        const checkQuantity = await prisma.product.findFirst({
            where : {
                id: data.productId
            },
            select:{
                quantity: true
            }
        })
        
    }catch (err) {
        return err
    }
}