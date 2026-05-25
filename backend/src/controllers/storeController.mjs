import StoreService from "../services/storeService.js";
import { catchAsync } from "../utils/catchAsync.js";

class StoreController {
    static AddStore = catchAsync(async (req,res) => {
        const store = await StoreService.AddStore(req.body, req.user);
        return res.status(200).json({
            success: true,
            data: store
        })
    })

    static getAllStores = catchAsync(async(req, res) => {
        const stores = await StoreService.getAllStores();
        return res.status(200).json({
            success: true,
            data: stores
        })
    })

    static getSingleStore = catchAsync(async (req, res) => {
        const store = await StoreService.getSingleStore(req.params.id || req.body.id);
        return res.status(200).json({
            success: true,
            data: store
        });
    })
}

export default StoreController;