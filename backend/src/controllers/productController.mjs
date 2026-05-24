import { createProductService, getAllProductsService, getPaginatedProductService, getSingleProductService, getSortedProductService} from "../services/productService.mjs";

export const createProductController = async (req , res ) => {
    try{
        const product = await createProductService(req.body, req.user, req.store);
        res.status(200).json(product);
    }catch(err){
        return res.status(400).json({err: err.message})
    }

}

export const getProduct  = async (req , res) => {
    try{
        const prismaProduct = await getSingleProductService(req.params.id);
        // console.log(req.params.id)
        res.status(200).json(prismaProduct);
    }catch(err){
        res.status(400).json({err: err.message})
    }
}

export const getfilterproduct = async (req , res) => {
    try{
        const prismaProduct = await getPaginatedProductService(req.query);
        res.status(200).json(prismaProduct);
    }catch(err){
        res.status(400).json({err: err.message})
    }
}


export const getSortedProduct = async (req , res) => {
    try {
        const prismaProducts = await getSortedProductService();
        res.status(200).json(prismaProducts)
    }catch(err){
        res.status(400).json({err: err.message})
    }
}

export const getAllProducts = async (req, res) => {
    try{
        const prismaProducts = await getAllProductsService();
        res.status(200).json(prismaProducts);
    }catch(err){
        return res.status(400).json({err: err.message})
    }
}