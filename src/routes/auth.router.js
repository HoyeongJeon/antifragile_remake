import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validationCheck from "../middlewares/validation.middleware.js";
import { AuthRepository } from "../repositories/auth.repository.js";
import { AuthService } from "../services/auth.service.js";
import { AuthController } from "../controllers/auth.controller.js";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post("/users/signup", validationCheck, authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.me);

export default router;
