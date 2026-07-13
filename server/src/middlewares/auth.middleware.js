import JWT from "jsonwebtoken";
import User from "../models/user.model.js";

export const AuthProtect = async (req, res, next) => {
    try {
        const token = req.cookies.CravingToken;
        if (!token) {
            const error = new Error("Unauthorized: No token provided");
            error.statusCode = 401;
            return next(err);
        }
        const decode = await JWT.decode(token, process.env.JWT_SECRET)
        if (!decode) {
            const error = new Error("Session expired");
            error.statusCode = 401;
            return next(err);
        }
        const verifiedUser = await User.findById(decode.id);

        if (!verifiedUser) {
            const error = new Error("Session expired");
            error.statusCode = 401;
            return next(err);
        }
        req.user = verifiedUser
        next();
    } catch (error) {
        console.log(error.message)
        error = new Error("Unknown error from middleware")
        error.statusCode = 500
        return next(error);
    }
}

export const RestaurantAuthProtect = async (req, res, next) => {
    try {
        const token = req.cookies.CravingToken;

        if (!token) {
            const error = new Error("Unauthorized: No token provided");
            error.statusCode = 401;
            return next(error);
        }
    } catch (error) {
        console.log(error.message)
        error = new Error("Unknown error from middleware")
        error.statusCode = 500
        return next(error);
    }
}