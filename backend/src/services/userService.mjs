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
}

export default UserService;