import { createStore, getAllStoresService} from "../services/storeService.js"

export const createStoreController = async (req , res) => {
    try {
        const store = await createStore(req.body, req.user);
        res.status(200).json(store)
    }catch(err){
        res.status(500).json({error : err.message})
    }
}

export const getAllStoreController = async (req, res) => {
    try{
        const store = await getAllStoresService(req.body);
        res.status(200).json(store)
    }catch(err){
        res.status(500).json({error : err.message})
    }
}