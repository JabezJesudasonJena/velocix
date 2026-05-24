import { createStore, getAllStoresService, storeExistService} from "../services/storeService.js"

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

export const storeExist = async (req, res) => {
    try{
        const getStore = await storeExistService(req.user.id);
        res.status(200).json(getStore);
    }catch(err){
        res.status(400).json({err: err.message})
        console.log(err.message)
    }
}