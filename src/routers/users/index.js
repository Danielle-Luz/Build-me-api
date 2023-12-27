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
usersRouter.get("/search/:value", UsersController.getUsersBySearchedValue);

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
  UsersMiddlewares.isRoleIdValid,
  UsersController.create
);

usersRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedUserSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  UtilsMiddlewares.wasNoFieldUpdated,
  UsersMiddlewares.isRoleIdValid,
  UsersMiddlewares.hasPermissionOnRoute,
  UsersController.update
);

usersRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  UsersMiddlewares.hasPermissionOnRoute,
  UsersController.delete
);

module.exports = { usersRouter };
