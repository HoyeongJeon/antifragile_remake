import response from "../lib/response.js";
import { customError } from "../utils/customError/index.js";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }
  signup = async (req, res, next) => {
    try {
      const { email, name, password, passwordCheck, auth } = req.body;

      if (password !== passwordCheck) {
        throw new customError(
          400,
          "Bad Request",
          "비밀번호가 일치하지 않습니다."
        );
      }

      const responseFromService = await this.authService.signup(
        email,
        name,
        password,
        auth
      );

      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      next(error);
    }
  };

  petsitter_signup = async (req, res, next) => {
    try {
      const {
        email,
        name,
        career,
        tags,
        auth,
        introduce,
        password,
        passwordCheck
      } = req.body;
      const { location } = req.file;
      if (password.length < 6) {
        throw new customError(
          400,
          "Bad Request",
          "비밀번호는 6자리 이상이어야 합니다."
        );
      }
      if (password !== passwordCheck) {
        throw new customError(
          400,
          "Bad Request",
          "비밀번호가 일치하지 않습니다."
        );
      }
      const Emailcheck =
        /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-za-z0-9\\-]+/;
      if (Emailcheck.test(email) === false) {
        throw new customError(
          400,
          "Bad Request",
          "이메일 형식이 올바르지 않습니다."
        );
      }
      const responseFromService = await this.authService.petsitter_signup(
        email,
        name,
        career,
        tags,
        auth,
        introduce,
        password,
        location
      );

      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new customError(
          400,
          "Bad Request",
          "아이디 / 비밀번호를 입력해주세요."
        );
      }

      const responseFromService = await this.authService.login(email, password);

      req.session.loggedIn = true;
      req.session.loggedInUser = responseFromService.data;
      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      next(error);
    }
  };

  petsitter_login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new customError(
          400,
          "Bad Request",
          "아이디 / 비밀번호를 입력해주세요."
        );
      }

      const responseFromService = await this.authService.petsitter_login(
        email,
        password
      );

      req.session.loggedIn = true;
      req.session.loggedInUser = responseFromService.data;
      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      next(error);
    }
  };

  me = async (req, res, next) => {
    try {
      return res.status(200).json(
        response({
          status: 200,
          message: "정보조회에 성공했습니다.",
          data: req.session.loggedInUser
        })
      );
    } catch (error) {
      next(error);
    }
  };
  logout = async (req, res, next) => {
    try {
      req.session.user = null;
      res.locals.loggedInUser = req.session.user;
      req.session.loggedIn = false;
      return res
        .status(200)
        .json(response({ status: 200, message: "로그아웃 됐습니다." }));
    } catch (error) {
      next(error);
    }
  };
  getMyInfo = async (req, res, next) => {
    try {
      const {
        loggedInUser: { userId }
      } = req.session;
      if (!userId) {
        throw new customError(400, "Bad Request", "잘못된 요청입니다.");
      }
      const responseFromService = await this.authService.getMyInfo(userId);
      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      next(error);
    }
  };

  chargeMoney = async (req, res, next) => {
    try {
      const {
        loggedInUser: { userId }
      } = req.session;
      const { money } = req.body;
      if (!userId || !money) {
        throw new customError(400, "Bad Request", "잘못된 요청입니다.");
      }
      console.log(userId, money);
      const responseFromService = await this.authService.chargeMoney(
        userId,
        money
      );

      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      next(error);
    }
  };

  emailCheck = async (req, res, next) => {
    try {
      const { email } = req.query;
      if (!email) {
        throw new customError(400, "Bad Request", "잘못된 요청입니다.");
      }
      const responseFromService = await this.authService.emailCheck(email);

      return res.status(responseFromService.status).json(responseFromService);
    } catch (error) {
      next(error);
    }
  };

  kakao = async (req, res, next) => {
    try {
      const baseURL = "https://kauth.kakao.com/oauth/authorize";
      const config = {
        client_id: process.env.KAKAO_CLIENT_ID,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        response_type: "code"
      };
      const configURL = new URLSearchParams(config).toString();
      const finalURL = `${baseURL}?${configURL}`;
      return res.redirect(finalURL);
    } catch (error) {
      next(error);
    }
  };
}
