// controllers/productController.js
import ProductService from "../services/productService.mjs";
import { catchAsync } from "../utils/catchAsync.js";

class ProductController{

    static getAllProducts = catchAsync(async (req, res)=> {
        // Use query pagination so the endpoint does not return the whole table.
        const products = await ProductService.getAllProducts(req.query);
        return res.status(200).json({
            success: true,
            data: products
        });
    })

    static addProduct = catchAsync(async(req, res) => {
        // Pass the validated store and user so ownership can be checked here.
        const product = await ProductService.addProduct(req.body, req.user, req.store);
        return res.status(201).json({
            success: true,
            data: product
        })
    });

    static createProduct = catchAsync(async (req, res) => {
        const product = await ProductService.createProduct(req.body.data,req.store.id);
        return res.status(201).json({
            success: true,
            data: product
        })
    })

    static getProduct = catchAsync(async(req, res) => {
        const id = Number(req.params.id)
        const product = await ProductService.getSingleProduct(id);
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
    
    static getProductsByName = catchAsync(async(req, res) => {
        const products = await ProductService.getProductsByName(req.body.name || req.params.name);
        return res.status(200).json({
            success: true,
            data: products
        })
    })

    static updateProduct = catchAsync(async(req, res) => {
        const product = await ProductService.updateProduct(req.params.id, req.user.id, req.body);
        return res.status(200).json({
            success: true,
            data: product
        });
    })

    static getSearchProduct = catchAsync(async(req, res) => {
        const product = await ProductService.searchProducts(req.query.q);
        return res.status(200).json({
            success: true,
            data: product
        })
    })

}

export default ProductController;