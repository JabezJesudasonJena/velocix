import prisma from "../db/prismadb.mjs"
import AppError from "../utils/appError.mjs";

class OrderService{
    static async placeOrder(userId, data, items){
        return await prisma.$transaction(async (tx) => {
            console.log(items)
            let totalPrice = 0;
            // Validate Stock
            for(const item of items){
                const product = await tx.product.findUnique({
                    where : {
                        id:item.productId
                    }
                });

                if(!product) throw new AppError("Product not found !")
                
                if(product.stock < item.quantity){
                    throw new Error(
                        `${product.name} is out of stock`
                    );
                }

                totalPrice += (
                    product.price * item.quantity
                )
            };
            
            // Create Order
            const order = await tx.order.create({
                data:{
                    userId: userId,
                    storeId: data.storeId,
                    total: totalPrice,
                    status: "PENDING"
                }
            });

            console.log(items)
            // Update Stock
            for (const item of items ){
                console.log(item)
                const product = await tx.product.findUnique({
                    where: {
                        id: item.productId
                        }
                });
                
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
        return await prisma.findUnique({
            where:{
                id: orderId
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


