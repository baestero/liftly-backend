import express from "express";
import { login, register } from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", register);

router.post("/auth", login);

export default router;
