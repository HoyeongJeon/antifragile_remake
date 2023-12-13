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
router.get("/:petsitterId(d+)", petsittersController.getPetsitterById);
router.get("/search", petsittersController.searchPetsitters);

export default router;
