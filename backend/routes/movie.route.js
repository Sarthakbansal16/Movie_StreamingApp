import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createMovie,
  deleteMovie,
  getAllMovies,
  getMovie,
  getRandomMovie,
  updateMovie,
} from "../controllers/Movie.controller.js";

const router = Router();

router.post("/", verifyJWT, createMovie);
router.put("/updatemovie/:id", verifyJWT, updateMovie);
router.delete("/deletemovie/:id", verifyJWT, deleteMovie);
router.get("/getmovie/:id", verifyJWT, getMovie);
router.get("/randmovie", verifyJWT, getRandomMovie);
router.get("/", verifyJWT, getAllMovies);

export default router;
