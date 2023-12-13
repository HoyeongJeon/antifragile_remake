import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validationCheck from "../middlewares/validation.middleware.js";
import { AuthRepository } from "../repositories/auth.repository.js";
import { AuthService } from "../services/auth.service.js";
import { AuthController } from "../controllers/auth.controller.js";
import { prisma } from "../utils/prisma/index.js";
import { publicOnlyMiddleware } from "../middlewares/public-only.middleware.js";

const router = express.Router();

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post(
  "/users/signup",
  publicOnlyMiddleware,
  validationCheck,
  authController.signup
);
router.post("/users/login", publicOnlyMiddleware, authController.login);
router.post(
  "/petsitters/signup",
  publicOnlyMiddleware,
  validationCheck,
  authController.petsitter_signup
);
router.post(
  "/petsitters/login",
  publicOnlyMiddleware,
  authController.petsitter_login
);
router.post("/logout", authMiddleware, authController.logout);
router.get("/me", authMiddleware, authController.me);
// 카카오톡 로그인 만들기
router.get(
  "/startLoginWithKakaoTalk",
  publicOnlyMiddleware,
  authController.startLoginWithKakaoTalk
);

export default router;
