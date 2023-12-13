import response from "../lib/response";
import customError from "../utils/customError";

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    // 경고?
    return res.status(400).json(
      response({
        status: 400,
        message: "로그인된 사용자는 접근할 수 없습니다."
      })
    );
  }
};
