import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validationCheck from "../middlewares/validation.middleware.js";
import { AuthRepository } from "../repositories/auth.repository.js";
import { AuthService } from "../services/auth.service.js";
import { AuthController } from "../controllers/auth.controller.js";
import { prisma } from "../utils/prisma/index.js";
import { publicOnlyMiddleware } from "../middlewares/public-only.middleware.js";
import imgUpload from "../middlewares/file-upload.middleware.js";

const router = express.Router();

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

// /auth/petsitters/signup
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
  imgUpload.single("profile"),
  authController.petsitter_signup
);

router.post(
  "/petsitters/login",
  publicOnlyMiddleware,
  authController.petsitter_login
);
router.get("/logout", authMiddleware, authController.logout);
router.get("/me", authMiddleware, authController.me);
router.get("/users", authMiddleware, authController.getMyInfo);
// 돈 충전하는 라우터
router.post("/users/charge", authMiddleware, authController.chargeMoney);
router.get("/email-auth", authController.emailCheck);
// 카카오 로그인
router.get("/kakao", authController.kakao);

router.get("/kakao/callback", async (req, res) => {
  const baseURL = "https://kauth.kakao.com/oauth/token";
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    code: req.query.code
  };
  const configURL = new URLSearchParams(config).toString();
  const finalURL = `${baseURL}?${configURL}`;
  const tokenRequest = await (
    await fetch(finalURL, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const emailObj = await (
      await fetch("https://kapi.kakao.com/v2/user/me", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      })
    ).json();
    const userData = emailObj.kakao_account;

    const email =
      userData.is_email_valid === true && userData.is_email_verified === true
        ? userData.email
        : undefined;
    if (!email) {
      return res.redirect("/login");
    }

    let exsistingUser = await prisma.users.findFirst({ where: { email } });
    if (exsistingUser) {
      req.session.loggedIn = true;
      req.session.loggedInUser = exsistingUser;
      return res.redirect("/");
    } else {
      const user = await prisma.users.create({
        data: {
          email,
          name: userData.profile.nickname,
          password: "",
          social: true
        }
      });
      console.log(user);
      req.session.loggedIn = true;
      req.session.loggedInUser = user;
      return res.redirect("/");
    }
  } else {
    return res.redirect("/login");
  }
});

export default router;
