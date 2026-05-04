import { createStore, getStore } from "../services/storeService.js"

export const createStoreController = async (req , res) => {
    try {
        const store = await createStore(req.body, req.user.role);
        res.status(200).json(store)
    }catch(err){
        res.status(400).json({error : err})
    }
}

export const getAllStoreController = async (req, res) => {
    try{
        const store = await getStore(req.body);
        res.status(200).json(store)
    }catch(err){
        res.status(400).json({error : err})
    }
}