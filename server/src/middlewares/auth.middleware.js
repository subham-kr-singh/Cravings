import JWT from "jsonwebtoken";
import User from "../models/user.model.js";

export const AuthProtect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        const error = new Error("Unauthorized: No token provided");
        error.statusCode = 401;
        return next(err);
    }
    try {
        const decode = await JWT.decode(token, process.env.JWT_SECRET)
        res.status(200).json({
            message: "user is found",
            data: decode
        })
    } catch (error) {
        console.log(error.message)
        error = new Error("Unknown error from middleware")
        error.statusCode = 500
        return next(error);
    }
}