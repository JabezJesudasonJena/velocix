
import jwt from 'jsonwebtoken';

export const jwtMiddleware = (req, res, next) => {
    // 1. Safely grab the header
    const authHeader = req.headers["authorization"];
    
    // 2. Prevent crashes by checking if it exists AND is formatted correctly
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ msg: "Access denied. No token provided." });
    }

    // 3. Extract the token
    const token = authHeader.split(" ")[1];

    // 4. Verify the token (No 'await' needed here with the callback pattern)
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if (err) {
            return res.status(403).json({ msg: "Invalid or expired token." });
        }
        
        // 5. Attach user payload to request and proceed
        req.user = decodedUser;
        next();
    });
};
export const sessionMiddleware = async (req, res, next) => {
    const token = req.session.token;
    if(!req.session.token) return res.status(400).json({msg: "Invalid Session token"});
    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(400).json({msg: err})
        req.user = user;
        next();
    })
};