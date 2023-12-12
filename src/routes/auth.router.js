import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validationCheck from "../middlewares/validation.middleware.js";

const router = express.Router();

// router.post("/signup", validationCheck, authController.signup);
// router.post("/login", authController.login);
// router.post("/logout", authController.logout);
// router.get("/me", authMiddleware, authController.me);

export default router;
