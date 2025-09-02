import express from "express";
import { getMe, login, register } from "../controllers/UserController.js";
import { authToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/auth", login);

router.get("/me", authToken, getMe);

export default router;
