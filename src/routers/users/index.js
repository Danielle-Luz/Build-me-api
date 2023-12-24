const { Router } = require("express");
const { UsersController } = require("../../controllers/index");
const {
  UsersMiddlewares,
  UtilsMiddlewares,
} = require("../../middlewares/index");
const { userLoginSchema, newUserSchema } = require("../../schemas/index");

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
  UsersMiddlewares.isTokenFilled,
  UtilsMiddlewares.validateSchema(newUserSchema),
  UsersMiddlewares.isUsernameUnique,
  UsersMiddlewares.isEmailUnique,
  UsersController.create
);

module.exports = { usersRouter };
