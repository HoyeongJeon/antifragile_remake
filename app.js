import "dotenv/config";
import "./src/utils/redis";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import expressMySQLSession from "express-mysql-session";
import cors from "cors";
import path from "path";
import { SERVER_PORT } from "./src/constants/app.contant";
import {
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_USERNAME,
  MYSQL_PORT,
  MYSQL_DATABASE
} from "./src/constants/db.constant.js";
import { SECRET_KEY } from "./src/constants/security.constant.js";
import logMiddleware from "./src/middlewares/log.middleware.js";
import localsMiddleware from "./src/middlewares/locals.middleware.js";
import errorHandlingMiddleware from "./src/middlewares/error-handling.middleware.js";
import router from "./src/routes/index.js";
const app = express();
const __dirname = path.resolve();
const PORT = SERVER_PORT || 3000;
const MySQLStore = expressMySQLSession(session);

const sessionStore = new MySQLStore({
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  expiration: 1000 * 60 * 60 * 24, // 세션의 만료 기간을 1일로 설정합니다.
  createDatabaseTable: true
});

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(logMiddleware);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

app.use(localsMiddleware);

app.use("/uploads", express.static("uploads"));
app.use("/", router);

app.use("/", express.static(path.join(__dirname + "/src", "assets")));
app.use(express.static("assets"));

app.use(errorHandlingMiddleware);
app.listen(PORT, () => {
  console.log(`포트 ${PORT} 으로 서버가 열렸습니다.`);
});
