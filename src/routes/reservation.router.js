import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { ReservationRepository } from "../repositories/reservation.repository.js";
import { ReservationService } from "../services/reservation.service.js";
import { ReservationController } from "../controllers/reservation.controller.js";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

const reservationRepository = new ReservationRepository(prisma);
const reservationService = new ReservationService(reservationRepository);
const reservationController = new ReservationController(reservationService);

router.get("/:sitterId", reservationController.getReservation);
router.post("/", authMiddleware, reservationController.postReservation);
router.put(
  "/:sitterId/:reservationId",
  authMiddleware,
  reservationController.putReservation
);
router.delete(
  "/:sitterId/:reservationId",
  authMiddleware,
  reservationController.deleteReservation
);
export default router;
