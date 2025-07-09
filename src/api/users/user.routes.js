import { Router } from "express";
import { userController } from "./user.controller.js";
import { validateToken } from "../../middlewares/validateToken.middleware.js";
import { contextMiddleware } from "../../middlewares/context.middleware.js";

const router = Router();

router.use(validateToken, contextMiddleware);

router.get("/", userController);

export { router as userRoutes };
