const { Router } = require("express");
const { TechnologiesController } = require("../../controllers");
const {
  UtilsMiddlewares,
  UsersMiddlewares,
  PermissionsMiddlewares,
  TechnologiesMiddlewares,
} = require("../../middlewares");
const {
  newTechnologySchema,
  updatedTechnologySchema,
} = require("../../schemas");

const technologiesRouter = Router();

technologiesRouter.post(
  "/",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  UtilsMiddlewares.validateSchema(newTechnologySchema),
  PermissionsMiddlewares.hasPermissionOnRoute,
  TechnologiesMiddlewares.hasUniqueName,
  TechnologiesController.create
);

technologiesRouter.get("/", TechnologiesController.getAll);
technologiesRouter.get("/:id", TechnologiesController.getById);

technologiesRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedTechnologySchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  UtilsMiddlewares.wasNoFieldUpdated,
  TechnologiesMiddlewares.hasUniqueName,
  TechnologiesController.update
);

technologiesRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  TechnologiesController.delete
);

module.exports = { technologiesRouter };
