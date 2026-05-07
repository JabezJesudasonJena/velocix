import { createProductService } from "../services/productService.mjs";

export const createProductController = async (req , res ) => {
    try{
        const product = await createProductService(req.body, req.user, req.store);
        res.status(200).json(product);
    }catch(err){
        return res.status(400).json({err: err.message})
    }

}