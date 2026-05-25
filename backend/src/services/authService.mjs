import jwt from "jsonwebtoken";
import prisma from "../db/prismadb.mjs";
import bcrypt from "bcrypt";
import AppError from "../utils/appError.mjs";

class AuthService{
    static async signUp(user){
        if (!user.naame || !user.email || !user.password) {
            throw new AppError("Name, email, and password are required");
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const prismaUser = await prisma.user.create({
            data:{
                name,
                email,
                password : hashedPassword,
                role,
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
        return token;
    }
}

export default AuthService;