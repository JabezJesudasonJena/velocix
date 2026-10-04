import prisma from "../db/prismadb.mjs"
import AppError from "../utils/appError.mjs";

class CategoryService{
    static async createCategory(data){
        if(!data) throw new AppError("No data provided !")
        return await prisma.category.create({
            data:{
                name: data.name
            }
        })
    }

    static async getAllCategories(){
        return prisma.category.findMany({})
    }

    static async getAllCategoriesWithProducts(){
        return prisma.category.findMany({
            include: {products: true}
        })
    }

    static async getSingleCategory(data){
        return prisma.category.findFirst({
            where: {
                id: Number(data)
            }
        })
    }
    
    static async getCategoryByName(data){
        return prisma.category.findMany({
            where: {
                name: {
                    contains: data,
                    mode: 'insensitive'
                }
            }
        })
    }
}


export default CategoryService;