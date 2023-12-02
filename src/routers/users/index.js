import { Router } from "express";
import { UsersController } from "../../controllers";
import { UtilsMiddlewares } from "../../middlewares";
import { userLoginSchema, newUserSchema } from "../../schemas";

const usersRouter = Router();

usersRouter.get("");
usersRouter.get("/:id");
usersRouter.post(
  "/login",
  UtilsMiddlewares.validateSchema(userLoginSchema),
  UsersController.login
);
usersRouter.post(
  "/newUser",
  UtilsMiddlewares.validateSchema(newUserSchema),
  UsersController.create
);

export default usersRouter;
