import jwt from "jsonwebtoken";

export const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({msg : "Invalid token"});
        req.user = user;
        next();
    });
};