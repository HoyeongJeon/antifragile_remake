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
router.post("/:sitterId", reservationController.postReservation);
router.put("/:sitterId/:reservationId", reservationController.putReservation);
router.delete(
  "/:sitterId/:reservationId",
  reservationController.deleteReservation
);
export default router;
