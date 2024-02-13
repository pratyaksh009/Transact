import jwt from "jsonwebtoken";
import { config } from "../config.js";
// import dotenv from "dotenv";
// dotenv.config();
const JWT_SECRET = config.JWT_SECRET;

const UserAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedAuther = jwt.verify(token, JWT_SECRET);
        // console.log(decodedAuther);
        if (decodedAuther.userId) {
            req.userId = decodedAuther.userId;
            next();
        } else {
            return res.status(403).json({});
        }
    } catch (e) {
        console.log(e);
        return res.status(403).json({});
    }
};

export { UserAuth };
