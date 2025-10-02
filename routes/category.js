import express from "express";
import { authToken } from "../middlewares/auth.js";
import { listCategory } from "../controllers/CategoryController.js";
import { listSubCategory } from "../controllers/SubCategoryController.js";

import {
  createExercise,
  deleteExercise,
  listExercise,
  getExerciseById,
  updateExercise,
} from "../controllers/ExcerciseController.js";

const router = express.Router();

router.get("/", authToken, listCategory);

router.get("/:categoryId/subcategories", authToken, listSubCategory);

router.get(
  "/:categoryId/subcategories/:subCategoryId/exercises",
  authToken,
  listExercise
);

router.get(
  "/:categoryId/subcategories/:subCategoryId/exercises/:exerciseId",
  authToken,
  getExerciseById
);

router.post(
  "/:categoryId/subcategories/:subCategoryId/exercises",
  authToken,
  createExercise
);

router.put(
  "/:categoryId/subcategories/:subCategoryId/exercises/:exerciseId",
  authToken,
  updateExercise
);

router.delete(
  "/:categoryId/subcategories/:subCategoryId/exercises/:exerciseId",
  authToken,
  deleteExercise
);

export default router;
