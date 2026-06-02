import prisma from "../db/prismadb.mjs";

export const testGetProducts = async (req, res) => {
    console.log("1. Request hit the controller");
    console.time("PrismaQuery"); 
    
    const products = await prisma.product.findMany({});
    
    console.timeEnd("PrismaQuery"); // This will print the EXACT milliseconds Prisma took
    console.log("2. Sending response to frontend");
    
    res.json({
        success: true,
        data: products
    });
}