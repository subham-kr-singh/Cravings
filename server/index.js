import dotenv from "dotenv";
dotenv.config()
import express from 'express';
import AuthRouter from './src/routers/auth.route.js';
import connectDB from './src/config/dbConnection.config.js';
import publicRouter from './src/routers/public.route.js';
import cookieParser from 'cookie-parser';
import { AuthProtect } from './src/middlewares/auth.middleware.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))

// Routers
app.use("/auth", AuthRouter);
app.use("/public", publicRouter)

// Default Error handler
app.use((err, req, res, next) => {
    const ErrMessage = err.message || "Internal Server Error";
    const ErrStatusCode = err.statusCode || 500;

    res.status(ErrStatusCode).json({ message: ErrMessage });
})

// Default API
app.get("/", AuthProtect, (req, res) => {
    res.json({ message: "Welcome to my Cravings" });
});

app.use((req, res) => {
    res.status(404).json({
        message: "API Not Found"
    })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
    connectDB();
})