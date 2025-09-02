import express from "express";
import {
  getMe,
  login,
  register,
  validateToken,
} from "../controllers/UserController.js";
import { authToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/auth", login);

router.get("/me", authToken, getMe);

router.get("/validate", authToken, validateToken);

export default router;
