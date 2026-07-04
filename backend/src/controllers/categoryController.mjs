import { catchAsync } from "../utils/catchAsync.js";
import CategoryService from "../services/categoryService.mjs";

class CategoryController{
    static createCategory = catchAsync(async(req , res) => {
        const category = await CategoryService.createCategory(req.body);
        return res.status(201).json({
            success: true,
            data: category
        })
    })

    static getAllCategories = catchAsync(async(req , res) => {
        const categories = await CategoryService.getAllCategories();
        return res.status(200).json({
            success: true,
            data: categories
        })
    })

    static getCategoriesWithProducts = catchAsync(async(req, res) => {
        const categories = await CategoryService.getAllCategoriesWithProducts();
        return res.status(200).json({
            success: true,
            data: categories
        })
    })

    static getSingleCategory = catchAsync(async(req , res) => {
        const categories = await CategoryService.getSingleCategory(req.params.id || req.query.id);
        return res.status(200).json({
            success: true,
            data: categories
        })
    })
    
    static getCategoryByName = catchAsync(async(req , res) => {
        const categories = await CategoryService.getCategoryByName(req.body.name);
        return res.status(200).json({
            success: true,
            data: categories
        })
    })
}

export default CategoryController;