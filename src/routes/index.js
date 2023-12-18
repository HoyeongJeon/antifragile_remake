import express from "express";
import authRouter from "./auth.router";
import petsittersRouter from "./petsitters.router";
import reservationRouter from "./reservation.router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/petsitters", petsittersRouter);
router.use("/reservation", reservationRouter);

export default router;
