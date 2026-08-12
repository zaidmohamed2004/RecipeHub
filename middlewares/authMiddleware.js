const { verifyToken } = require("../config/jwt.js");

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "Token is required"
            });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Token is required"
            });
        }
        const decoded = verifyToken(token);
        req.userId = decoded.id;
        req.role = decoded.role;

        next();
    } 
    catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = authMiddleware;