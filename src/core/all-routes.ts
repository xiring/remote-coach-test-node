import { Application } from "express";
import authRoutes from "./auth/auth.routes";

const initRoutes = (app: Application) => {
  authRoutes(app);
};

export default initRoutes;
