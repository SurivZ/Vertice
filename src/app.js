import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import { catch404, errorHandler } from "./middlewares/error.middleware.js";

import { mainRoutes } from "./api/main/main.routes.js";
import { authRoutes } from "./api/auth/auth.routes.js";
import { productRoutes } from "./api/products/products.routes.js";
import { orderRoutes } from "./api/orders/orders.routes.js";
import { userRoutes } from "./api/users/user.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));

app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/me", userRoutes);

app.use(catch404);
app.use(errorHandler);

export { app };
