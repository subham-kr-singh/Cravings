import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { genToken } from '../utils/auth.service.js'

export const register = async (req, res, next) => {
    try {

        // get data from body
        const { fullName, email, phone, gender, dob, password } = req.body;

        //  check all fields
        if (!fullName || !email || !phone || !gender || !dob || !password) {
            const error = new Error("All Field Required");
            error.statusCode = 400;
            return next(error);
        }

        // chceking for existing user 
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error("Email already Register");
            error.statusCode = 409;
            return next(error);
        }
        const SALT = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, SALT);

        // create Default Photo
        const photoUrl = `https://placehold.co/600x400?text=${fullName.charAt(0).toUpperCase()}`;

        const photo = {
            url: photoUrl,
            publicId: null
        }

        // Create New User and Complete registration
        const newUser = await User.create({
            fullName,
            email,
            phone,
            gender,
            photo,
            dob,
            password: hashPassword
        });

        // response
        res.status(201).json({
            message: "New user Created Successfully"
        });

    } catch (error) {
        // Print Error 
        console.log(error.message)

        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error("All Field Required")
            error.statusCode = 404;
            return next(error);
        }

        const existingUser = await User.findOne({ email }); ``

        if (!existingUser) {
            const error = new Error("Email not Register")
            error.statusCode = 404;
            return next(error);
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            const error = new Error("Incorrect Password")
            error.statusCode = 401;
            return next(error);
        }

        const payload = existingUser.toObject();

        await genToken(payload, res)

        res.status(200).json({ message: "User logged in successfully", data: payload })

    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

export const logout = (req, res) => {
    res.clearCookie("CravingToken", { maxAge: 0 }).status(200).json({ message: "Logout Successfull from controller" })
}