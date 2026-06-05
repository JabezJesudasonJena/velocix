import StoreService from "../services/storeService.js";
import { catchAsync } from "../utils/catchAsync.js";

class StoreController {
    static AddStore = catchAsync(async (req,res) => {
        const store = await StoreService.AddStore(req.body, req.user);
        return res.status(201).json({
            success: true,
            data: store
        })
    })

    static getAllStores = catchAsync(async(req, res) => {
        const stores = await StoreService.getAllStores();
        return res.status(200). json({
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

    static getStoreWithProducts = catchAsync(async (req, res) =>{
        const storeWithProducts = await StoreService.getSingleStoreWithProducts(req.params.id || req.body.storeId);
        return res.status(200).json({
            success: true,
            data: storeWithProducts
        })
    })

    static getCurrentUserStore = catchAsync(async (req, res) => {
        // Send back the owner's store so the product form can reuse it.
        const store = await StoreService.getCurrentUserStore(req.user.id);
        return res.status(200).json({
            success: true,
            data: store
        });
    })

    static updateStoreName = catchAsync(async (req, res) => {
        const { storeId, newName } = req.body;
        const updatedStore = await StoreService.updateStoreName(req.params.id || storeId, newName, req.user.id);
        return res.status(200).json({
            success: true,
            data: updatedStore
        });
    })

    // Nearest Stores
    static getNearestStores = catchAsync(async (req, res) => {
        const nearestStores = await StoreService.getNearestStore(req.query);
        return res.status(200).json({
            success: true,
            data: nearestStores
        })
    })
}


export default StoreController;