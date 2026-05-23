import PlaceOrderService from "../services/placeOrder.mjs";

class PlaceOrderController {
    static async placeOrder(req, res){
        try{
            const order = 
                await PlaceOrderService.placeOrder(
                    1,
                    req.body,
                    req.body.items
                )
            return res.status(200).json(order)
        }
        catch(err){
            return res.status(400).json({err: err.message});
        }
    }
}

export default PlaceOrderController;