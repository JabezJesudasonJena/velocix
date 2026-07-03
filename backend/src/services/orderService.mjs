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

    static async createOrder(userId, data, items) {
    if (!Array.isArray(items) || items.length === 0) throw new AppError("Order Items are required!", 400);

    return await prisma.$transaction(async (tx) => {
        // 1. Fetch all products and their inventory in one query
        const productIds = [...new Set(items.map((item) => item.productId))];
        const products = await tx.product.findMany({
            where: { id: { in: productIds } },
            include: { inventory: true }
        });
        const productMap = new Map(products.map((product) => [product.id, product]));

        let totalPrice = 0;
        const processedItems = [];

        // 2. Validate stock and calculate total price
        for (const item of items) {
            const product = productMap.get(item.productId);

            if (!product) throw new AppError(`Product ${item.productId} not found!`, 404);
            
            if (!product.inventory || product.inventory.quantity < item.quantity) {
                throw new AppError(`${product.name} is out of stock`, 400);
            }

            totalPrice += (product.price * item.quantity);

            // Store the required data for the next step so we don't query the map again
            processedItems.push({
                productId: product.id,
                productName: product.name,
                quantity: item.quantity,
                ProductPrice: product.price // Extracted from DB, not the frontend payload!
            });
        }

        let targetAddressId = data?.addressId;

        if (targetAddressId) {
            const address = await tx.address.findFirst({
                where: {
                    id: targetAddressId,
                    userId
                },
                select: {
                    id: true
                }
            });
        }

        // 3. Create the single Order
        const orderData = {
            total: totalPrice,
            status: "pending",
            user: {
                connect: {
                    id: userId
                }
            }
        };

        if (targetAddressId) {
            orderData.address = {
                connect: {
                    id: targetAddressId
                }
            };
        }

        if (data?.couponId) {
            orderData.coupon = {
                connect: {
                    id: data.couponId
                }
            };
        }

        const order = await tx.order.create({
            data: orderData
        });

        // 4. Create OrderItems and Decrement Stock
        for (const item of processedItems) {
            
            await tx.orderItem.create({
                data: {
                    orderId: order.id,
                    productName: item.productName,
                    quantity: item.quantity,
                    ProductPrice: item.ProductPrice
                }
            });

            await tx.inventory.update({
                // NOTE: Using 'producId' here to match the typo in your Prisma schema. 
                // If you fixed the typo in schema.prisma, change this to 'productId'.
                where: { productId: item.productId },
                data: {
                    quantity: { decrement: item.quantity }
                }
            });
        }

        return order;
    });
}
}

export default OrderService;


