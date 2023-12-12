import express from "express";
import authRouter from "./auth.router";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("you are in server!");
});
router.use("/auth", authRouter);

export default router;
