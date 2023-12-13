import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { PetsittersRepository } from "../repositories/petsitters.repository.js";
import { PetssitersService } from "../services/petsitters.service.js";
import { PetsittersController } from "../controllers/petsitters.controller.js";
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();

const petsittersRepository = new PetsittersRepository(prisma);
const petsittersService = new PetssitersService(petsittersRepository);
const petsittersController = new PetsittersController(petsittersService);

router.get("/", petsittersController.getPetsitters);
router.get("/search", petsittersController.searchPetsitters);
router.get("/:petsitterId", petsittersController.getPetsitterById);

router.post(
  "/profile/:petsitterId/review",
  authMiddleware,
  petsittersController.postReviews
);
router.put(
  "/profile/:petsitterId/review/:reviewId",
  authMiddleware,
  petsittersController.putReviews
);
// router.delete(
//   "/profile/:petsitterId/review/:reviewId",
//   authMiddleware,
//   petsittersController.deleteReviews
// );
export default router;
