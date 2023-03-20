import { Application } from "express";
import AuthController from "./auth.controller";
import ValidationMiddleware from "../../middlewares/validation.middleware";
import { ChangePassword, Login, Register } from "./auth.dto";

const authRoutes = (app: Application) => {
  const authController = new AuthController();
  app.route("/v1/user").get(authController.findAllUser);
  app.route("/v1/auth/login").post(ValidationMiddleware(Login), authController.login);
  app.route("/v1/auth/register").post(ValidationMiddleware(Register), authController.register);
  app
    .route("/v1/auth/change-password")
    .post(ValidationMiddleware(ChangePassword), authController.changePassword);

  app.route("/v1/user/change-status/:id").patch(authController.changeStatus);
  app.route("/v1/user/delete/:id").delete(authController.delete);
};

export default authRoutes;
