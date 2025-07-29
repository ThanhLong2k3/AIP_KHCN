import express from "express";
import { loginAccount } from "../controllers/auth/login";
import { registerAccount } from "../controllers/auth/register";
import { forgotPassword } from "../controllers/auth/forgotPassword";
import { sendRegisterOTP } from "../controllers/auth/sendRegisterOTP";
import { resetPassword } from "../controllers/auth/resetPassword";
import { verifyRegisterOtp } from "../controllers/auth/verifyRegisterOtp";

const authRoute = express.Router();

authRoute.post("/login", loginAccount);
authRoute.post("/register", registerAccount);
authRoute.post('/forgot-password', forgotPassword);
authRoute.post('/register-otp', sendRegisterOTP);
authRoute.post('/reset-password', resetPassword);
authRoute.post('/verify-otp', verifyRegisterOtp);

export default authRoute;
