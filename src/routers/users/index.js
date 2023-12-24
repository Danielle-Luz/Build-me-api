const { Router } = require("express");
const { UsersController } = require("../../controllers/index");
const {
  UsersMiddlewares,
  UtilsMiddlewares,
} = require("../../middlewares/index");
const { userLoginSchema, newUserSchema } = require("../../schemas/index");

const usersRouter = Router();

usersRouter.get("", UsersController.getAll);
usersRouter.get("/:id", UsersController.getById);

usersRouter.post(
  "/login",
  UtilsMiddlewares.validateSchema(userLoginSchema),
  UsersController.login
);
usersRouter.post(
  "/newUser",
  UtilsMiddlewares.validateSchema(newUserSchema),
  UsersMiddlewares.isUsernameUnique,
  UsersMiddlewares.isEmailUnique,
  UsersController.create
);

module.exports = { usersRouter };
