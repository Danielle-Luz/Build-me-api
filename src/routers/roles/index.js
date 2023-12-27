const { Router } = require("express");
const { RolesController } = require("../../controllers/index");
const {
  UtilsMiddlewares,
  UsersMiddlewares,
  PermissionsMiddlewares,
} = require("../../middlewares/index");
const { nameSchema } = require("../../schemas/index");

const rolesRouter = Router();

rolesRouter.post(
  "/",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  UtilsMiddlewares.validateSchema(nameSchema),
  RolesController.create
);

rolesRouter.get(
  "/",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  RolesController.getAll
);

module.exports = { rolesRouter };
