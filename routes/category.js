import express from "express";
import { authToken } from "../middlewares/auth.js";
import { listCategory } from "../controllers/CategoryController.js";
import {
  listSubCategory,
  createSubCategory,
} from "../controllers/SubCategoryController.js";

const router = express.Router();

router.get("/", authToken, listCategory);

router.get("/:id/subcategories", listSubCategory);

router.post("/:id/subcategories", createSubCategory);

export default router;
