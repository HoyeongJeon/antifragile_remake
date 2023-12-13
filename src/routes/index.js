import express from "express";
import authRouter from "./auth.router";
import petsittersRouter from "./petsitters.router";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("you are in server!");
// });
router.use("/auth", authRouter);
router.use("/petsitters", petsittersRouter);

export default router;
