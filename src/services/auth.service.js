import response from "../lib/response.js";
import bcrypt from "bcrypt";
import { PASSWORD_HASH_SALT } from "../constants/security.constant.js";
import { customError } from "../utils/customError/index.js";
export class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }
  signup = async (email, name, password) => {
    const duplicatedId = await this.authRepository.findByEmail(email);
    if (duplicatedId) {
      throw new customError(409, "Conflict", "이미 존재하는 아이디입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT);

    const signUp = await this.authRepository.signup(
      email,
      name,
      hashedPassword
    );
    return response({
      status: 200,
      message: "회원가입에 성공했습니다.",
      data: signUp
    });
  };

  petsitter_signup = async (
    email,
    name,
    career,
    tags,
    introduce,
    password,
    path
  ) => {
    const duplicatedId = await this.authRepository.petsitter_findByEmail(email);
    if (duplicatedId) {
      throw new customError(409, "Conflict", "이미 존재하는 아이디입니다.");
    }

    const hashedPassword = await bcrypt.hash(password, PASSWORD_HASH_SALT);

    const signUp = await this.authRepository.petsitter_signup(
      email,
      name,
      career,
      tags,
      introduce,
      hashedPassword,
      path
    );
    return response({
      status: 200,
      message: "회원가입에 성공했습니다.",
      data: signUp
    });
  };

  login = async (email, password) => {
    const duplicatedId = await this.authRepository.findByEmail(email);
    if (!duplicatedId) {
      throw new customError(409, "Conflict", "존재하지 않는 아이디입니다.");
    }
    const isMatch = await bcrypt.compare(password, duplicatedId.password);
    if (!isMatch) {
      throw new customError(400, "Bad Request", "잘못된 비밀번호입니다.");
    }

    const isCorrectUser = duplicatedId && isMatch;

    if (!isCorrectUser) {
      throw new customError(
        400,
        "Bad Request",
        "일치하는 인증정보가 없습니다."
      );
    }

    delete duplicatedId.password;
    return response({
      status: 200,
      message: "로그인에 성공했습니다.",
      data: duplicatedId
    });
  };

  petsitter_login = async (email, password) => {
    const duplicatedId = await this.authRepository.petsitter_findByEmail(email);
    if (!duplicatedId) {
      throw new customError(409, "Conflict", "존재하지 않는 아이디입니다.");
      // return response({
      //   status: 409,
      //   message: "존재하지 않는 아이디입니다."
      // });
    }
    const isMatch = await bcrypt.compare(password, duplicatedId.password);
    if (!isMatch) {
      throw new customError(400, "Bad Request", "잘못된 비밀번호입니다.");
    }

    const isCorrectUser = duplicatedId && isMatch;

    if (!isCorrectUser) {
      throw new customError(
        400,
        "Bad Request",
        "일치하는 인증정보가 없습니다."
      );
    }

    delete duplicatedId.password;
    return response({
      status: 200,
      message: "로그인에 성공했습니다.",
      data: duplicatedId
    });
  };

  getMyInfo = async (userId) => {
    const myInfo = await this.authRepository.getMyInfo(userId);
    if (!myInfo) {
      throw new customError(400, "Bad Request", "잘못된 요청입니다.");
    }
    return response({
      status: 200,
      message: "정보조회에 성공했습니다.",
      data: myInfo
    });
  };

  chargeMoney = async (userId, money) => {
    console.log(userId, money);
    const result = await this.authRepository.chargeMoney(userId, money);
    if (!result) {
      throw new customError(400, "Bad Request", "잘못된 요청입니다.");
    }
    return response({
      status: 200,
      message: "충전에 성공했습니다.",
      data: result
    });
  };
}
