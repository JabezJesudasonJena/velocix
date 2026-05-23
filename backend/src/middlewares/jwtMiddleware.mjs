import jwt from "jsonwebtoken";

export const jwtMiddleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({msg : "Invalid token"});
        req.user = user;
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