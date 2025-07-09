import { Router } from "express";
import {
  createOrderController,
  getOrderByIdController,
  getUserOrdersController,
} from "./orders.controller.js";
import { validateToken } from "../../middlewares/validateToken.middleware.js";
import { contextMiddleware } from "../../middlewares/context.middleware.js";

const router = Router();

router.use(validateToken, contextMiddleware);

router.get("/", getUserOrdersController);
router.get("/:id", getOrderByIdController);

router.post("/", createOrderController);

export { router as orderRoutes };
