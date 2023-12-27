const { Router } = require("express");
const { ResourcesController } = require("../../controllers/index");
const { UtilsMiddlewares, UsersMiddlewares, PermissionsMiddlewares } = require("../../middlewares/index");
const { nameSchema } = require("../../schemas/index");

const resourcesRouter = Router();

resourcesRouter.post(
  "/",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  UtilsMiddlewares.validateSchema(nameSchema),
  ResourcesController.create
);

resourcesRouter.get(
  "/",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  ResourcesController.getAll
);

module.exports = { resourcesRouter };
