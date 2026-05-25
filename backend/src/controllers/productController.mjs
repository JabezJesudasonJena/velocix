// controllers/productController.js
import ProductService from "../services/productService.mjs";
import { catchAsync } from "../utils/catchAsync.js";

class ProductController{

    static getAllProducts = catchAsync(async (req, res)=> {
        const products = await getAllProducts.getAllProducts();
        return res.status(200).json({
            success: true,
            data: products
        });
    })

    static addProduct = catchAsync(async(req, res) => {
        const product = await ProductService.addProduct(req.body);
        return res.status(201).json({
            success: true,
            data: product
        })
    });

    static getProduct = catchAsync(async(req, res) => {
        const product = await ProductService.getSingleProduct(req.params.id);
        return res.status(200).json({
            success: true,
            data: product
        })
    })

    static getPaginatedProduct = catchAsync(async(req,res) => {
        const products = await ProductService.getPaginatedProducts(req.query);
        return res.status(200).json({
            success: true,
            data: products
        })
    })

    static getSortedProducts = catchAsync(async(req,res) => {
        const products = await ProductService.getSortedProducts();
        return res.status(200).json({
            success: true,
            data: products
        })
    })

}

export default ProductController;