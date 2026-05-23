import jwt from "jsonwebtoken";
import prisma from "../db/prismadb.mjs";
import bcrypt from "bcrypt";
import { jwtMiddleware } from "../middlewares/jwtMiddleware.mjs";

export const signUpService = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const prismaUser = await prisma.user.create({
        data:{
            name: user.name,
            email : user.email,
            password : hashedPassword,
            role : user.role,
        }
    })
    return prismaUser;
}

export const signInService = async (user) => {
    const prismaUser = await prisma.user.findUnique({
        where : {
            email : user.email
        }
    });
    if (!prismaUser) throw new Error("User not found");
    const isPasswordValid = await bcrypt.compare(user.password, prismaUser.password);
    
    if(!isPasswordValid) throw new Error('Invalid password')
    const token = jwt.sign({id: prismaUser.id, role : prismaUser.role}, process.env.JWT_SECRET, {expiresIn : "1h"});
    return token;
}