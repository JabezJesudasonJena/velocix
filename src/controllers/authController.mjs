import { signInService, signUpService } from "../services/authService.mjs";


export const signUpController = async (req, res) => {
    try {
        const user = await signUpService(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({msg : error.message});
    }
}

export const signInController = async (req, res) => {
    try {
        const token = await signInService(req.body);
        res.status(200).json({token});
    } catch (error) {
        res.status(400).json({msg : error.message});
    }
}