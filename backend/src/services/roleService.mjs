import prisma from "../db/prismadb.mjs";


class ShoppingPageService{

    static async getUserName(userId){
        try{
            return await prisma.user.findFirst({
                where:{
                    id: userId
                },
                select:{
                    name:true, role: true
                }
            })
        }catch(err){
            return err;
        }
    }
    
    static async getProducts(){
        try {
            return await prisma.product.findMany({})
        }catch(err){
            return await prisma
        }
    }
    
}

export default  ShoppingPageService;