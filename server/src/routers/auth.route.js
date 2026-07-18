import express from 'express';

import { login, register, logout, SendOtp, VerifyOtp, ResetPassword } from '../controllers/auth.controller.js';
import { OTPAuthProtect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);

router.post("/send-otp", SendOtp);
router.post("/verify-otp", VerifyOtp);
router.post("/reset-password", OTPAuthProtect, ResetPassword);

export default router;