import passport from "passport";
import { Strategy as kakaoStrategy } from "passport-kakao";
import { prisma } from "../utils/prisma";

const kakao = () => {
  passport.use(
    new kakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: "/auth/kakao/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          const exUser = await prisma.users.findFirst({
            where: {
              userId: profile.id % 1000000000,
              social: true
            }
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await prisma.users.create({
              data: {
                userId: profile.id % 1000000000,
                email: profile._json && profile._json.kakao_account.email,
                name: profile.username || profile.displayName,
                social: true
              }
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
export default kakao;
