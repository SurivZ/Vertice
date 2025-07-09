import { Router } from "express";
import {
  getAllProductsController,
  getProductByIdController,
} from "./products.controller.js";

const router = Router();

router.get("/", getAllProductsController);
router.get("/:id", getProductByIdController);

export { router as productRoutes };
