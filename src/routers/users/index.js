const { Router } = require("express");
const { UsersController } = require("../../controllers/index");
const {
  UsersMiddlewares,
  UtilsMiddlewares,
} = require("../../middlewares/index");
const {
  newUserSchema,
  userLoginSchema,
  updatedUserSchema,
} = require("../../schemas/index");

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

usersRouter.patch(
  "/self",
  UtilsMiddlewares.validateSchema(updatedUserSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  UsersController.update
);

module.exports = { usersRouter };
