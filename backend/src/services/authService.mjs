import jwt from "jsonwebtoken";
import prisma from "../db/prismadb.mjs";
import bcrypt from "bcrypt";
import AppError from "../utils/appError.mjs";

class AuthService{
    static async signUp(user){
        if (!user.name || !user.email || !user.password) {
            throw new AppError("Name, email, and password are required");
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const isEmailAlreadyPresent = await prisma.user.findFirst({
            where: {
                email: user.email
            }
        })
        if(isEmailAlreadyPresent) throw new AppError("Email already exists", 400);
        const prismaUser = await prisma.user.create({
            data:{
                name: user.name,
                email: user.email,
                password : hashedPassword,
                role: user.role,
            }
        })
        return prismaUser;
    }

    static async signIn(user){
        const prismaUser = await prisma.user.findUnique({
            where : {
                email : user.email
            }
        });
        if (!prismaUser) throw new AppError("Unauthorized Access", 404);
        const isPasswordValid = await bcrypt.compare(user.password, prismaUser.password);
        
        if(!isPasswordValid) throw new AppError("Unauthorized Access", 404);
        const token = jwt.sign({id: prismaUser.id, role : prismaUser.role}, process.env.JWT_SECRET, {expiresIn : "7d"});
        return {
            token: token,
            userData: {
                name: prismaUser.name,
                role: prismaUser.role
            }
        };
    }

    static async profile(userId){
        return await prisma.user.findFirst({
            where: {
                id: userId
            },
            // This ensures that password is not sent to the frontend
            include:{
                password: false, stores: true
            }
        })
    }
}

export default AuthService;