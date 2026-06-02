import prisma from "../db/prismadb.mjs"
import AppError from "../utils/appError.mjs";

class OrderService{
    static async placeOrder(userId, data, items){
        if (!data?.storeId) {
            throw new AppError("Store id is required", 400);
        }

        if (!Array.isArray(items) || items.length === 0) {
            throw new AppError("Order items are required", 400);
        }

        return await prisma.$transaction(async (tx) => {
            let totalPrice = 0;

            // Load every product once so the transaction does not do repeated lookups.
            const productIds = [...new Set(items.map((item) => item.productId))];
            const products = await tx.product.findMany({
                where: {
                    id: {
                        in: productIds
                    }
                }
            });
            const productMap = new Map(products.map((product) => [product.id, product]));

            for (const item of items) {
                const product = productMap.get(item.productId);

                if (!product) {
                    throw new AppError("Product not found !", 404);
                }

                if (product.stock < item.quantity) {
                    throw new Error(`${product.name} is out of stock`);
                }

                totalPrice += product.price * item.quantity;
            }
            
            // Create Order
            const order = await tx.order.create({
                data:{
                    userId: userId,
                    storeId: data.storeId,
                    total: totalPrice,
                    status: "PENDING"
                }
            });

            // Update Stock
            for (const item of items ){
                const product = productMap.get(item.productId);
                
                await tx.orderItem.create({
                    data: {
                        orderId: order.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: product.price
                    }
                })

                const updated = await tx.product.updateMany({
                    where : {
                        id: item.productId,
                        stock:{
                            gte: item.quantity
                        }
                    },
                    data:{
                        stock:{
                            decrement: item.quantity
                        }
                    }
                });
                if(updated.count === 0){
                    throw new Error(
                        `${product.name} stock Unavailabe`
                    )
                }
            }
            return order;
        });
    }

    // GET order

    static async getOrder(orderId){
        return await prisma.order.findUnique({
            where:{
                id: Number(orderId)
            },
            include: {
                items: true
            }
        })
    }

    static async cancelOrder(orderId){
        return await prisma.order.update({
            where:{
                id: orderId
            },
            data:{
                status: "CANCELED"
            }
        })
    }
}

export default OrderService;


