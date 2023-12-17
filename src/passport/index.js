import { prisma } from "../utils/prisma/index.js";
import passport from "passport";
import kakao from "./kakaoStrategy.js";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.userId);
  });

  passport.deserializeUser(async (id, done) => {
    await prisma.users
      .findFirst({
        where: {
          userId: +id
        }
      })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  kakao();
};
