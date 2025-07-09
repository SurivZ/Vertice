import { Router } from "express";
import { getApiController } from "./main.controller.js";

const router = Router();

router.get("/", getApiController);

export { router as mainRoutes };
