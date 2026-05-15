import { createOrderService } from "../services/orderService.mjs";

export const createOrderController = async (req , res) => {
    try{
        const prismaOrder = await createOrderService(req.body);
        return res.status(200).json({Order: prismaOrder})
    }catch(err){    
        console.log(err.message)
        return res.status(400).json({errorMessage: err.message})
    }
}