import OrderService from "../services/orderService.mjs";
import { catchAsync } from "../utils/catchAsync.js";

class OrderController {
    static placeOrder = catchAsync(async(req, res) =>{
        const order = await OrderService.placeOrder(req.user.id, req.body, req.body.items);
        return res.status(200).json({
            success: true,
            data: order
        });
    })

    static createOrder = catchAsync(async(req, res) => {
        const order = await OrderService.createOrder(req.user.id, req.body, req.body.items);
        return res.status(200).json({
            success:true,
            data: order
        })
    })
}

export default OrderController;