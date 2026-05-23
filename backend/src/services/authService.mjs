import jwt from "jsonwebtoken";
import prisma from "../db/prismadb.mjs";
import bcrypt from "bcrypt";

export const signUpService = async (user) => {
    if (!user || typeof user !== "object") {
        throw new Error("Invalid signup payload");
    }

    const name = String(user.name ?? "").trim();
    const email = String(user.email ?? "").trim().toLowerCase();
    const password = String(user.password ?? "");
    const role = String(user.role ?? "consumer").trim() || "consumer";

    if (!name || !email || !password) {
        throw new Error("Name, email, and password are required");
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