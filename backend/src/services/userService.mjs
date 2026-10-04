import prisma from "../db/prismadb.mjs"
import AppError from "../utils/appError.mjs";

class UserService {
    static async setAddress(userId, data){
        return prisma.address.create({
            full_name: data.full_name,
            phone: data.phone,
            userId: userId,
            is_default: data.is_default
        })
    }

    static async updateUserDetails(userId, data) {
    const numericUserId = Number(userId);

    try {
        return await prisma.$transaction(async (tx) => {
            // 1. Update User
            const updatedUser = await tx.user.update({
                where: { id: numericUserId },
                data: { name: data.name, email: data.email }
            });

            // 2. Upsert Address
            // Ensure every field defined in the model without a default is accounted for
            await tx.address.upsert({
                where: { userId: numericUserId },
                update: {
                    full_name: data.name,
                    city: data.address,
                    phone: data.phone || "00-000000-000000",
                    is_default: true // This is required in your model
                },
                create: {
                    full_name: data.name,
                    city: data.address,
                    userId: numericUserId,
                    phone: data.phone || "00-000000-000000",
                    is_default: true
                }
            });

            return updatedUser;
        });
    } catch (error) {
        console.error("Prisma Transaction Error:", error); // <-- CHECK THIS IN YOUR TERMINAL
        throw error; // Let the controller handle the response
    }
}
}

export default UserService;