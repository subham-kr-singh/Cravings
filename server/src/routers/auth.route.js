import express from 'express';

import { login, register, logout } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);

router.post("/send-otp", SendOtp);
router.post("/verify-otp", VerifyOtp);
router.post("/reset-password", OTPAuthProtect, ResetPassword);

export default router;