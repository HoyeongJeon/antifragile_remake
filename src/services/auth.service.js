import response from "../lib/response.js";
import bcrypt from "bcrypt";
import { PASSWORD_HASH_SALT } from "../constants/security.constant.js";
import { customError } from "../utils/customError/index.js";
import nodemailer from "nodemailer";
import { promisify } from "util";
import redisClient from "../utils/redis/index.js";

const getAsync = promisify(redisClient.get).bind(redisClient);

export class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }
  signup = async (email, name, password, auth) => {
    const duplicatedId = await this.authRepository.findByEmail(email);
    if (duplicatedId) {
      throw new customError(409, "Conflict", "이미 존재하는 아이디입니다.");
    }

    const getValue = await getAsync(email);
    if (getValue !== auth) {
      throw new customError(
        400,
        "Bad Request",
        "인증번호가 일치하지 않습니다."
      );
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
    auth,
    introduce,
    password,
    path
  ) => {
    const duplicatedId = await this.authRepository.petsitter_findByEmail(email);
    if (duplicatedId) {
      throw new customError(409, "Conflict", "이미 존재하는 아이디입니다.");
    }

    const getValue = await getAsync(email);
    console.log(getValue);
    if (getValue !== auth) {
      throw new customError(
        400,
        "Bad Request",
        "인증번호가 일치하지 않습니다."
      );
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
    await this.authRepository.petsitter_login(duplicatedId.petsitterId);
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

  emailCheck = async (email) => {
    let authNum = Math.random().toString().substring(2, 6);
    let smtpConfig = {
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }
    };
    const transporter = nodemailer.createTransport(smtpConfig);

    transporter.verify((error, success) => {
      if (error) console.error(error);
      console.log("Your config is correct");
    });

    let message = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: "회원가입을 위한 인증번호를 입력해주세요", // Subject line
      // text: "Bye", // plain text body
      html: `<b>${authNum}</b>` // html body
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log("Error occurred");
        console.log(error.message);
        throw new customError(
          400,
          "Bad Request",
          "이메일 전송에 실패했습니다."
        );
      }

      console.log("Message sent successfully!");
      // only needed when using pooled connections
      transporter.close();
    });
    await redisClient.set(email, authNum);
    await redisClient.expire(email, 60 * 3); // 5분간 유효함
    console.log("authNum in Email Authentication", authNum);
    return response({
      status: 200,
      message: "이메일 전송에 성공했습니다.",
      data: authNum
    });
  };
  logout = async () => {
    await this.authRepository.logout();
  };
}
