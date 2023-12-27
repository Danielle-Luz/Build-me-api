const { Router } = require("express");
const { PermissionsController } = require("../../controllers/index");
const {
  UtilsMiddlewares,
  UsersMiddlewares,
  PermissionsMiddlewares,
} = require("../../middlewares/index");
const {
  newPermissionSchema,
  updatedPermissionSchema,
} = require("../../schemas/index");

const permissionsRouter = Router();

permissionsRouter.post(
  "/",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  UtilsMiddlewares.validateSchema(newPermissionSchema),
  PermissionsController.create
);

permissionsRouter.get(
  "/",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  PermissionsController.getAll
);

permissionsRouter.patch(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  PermissionsMiddlewares.hasPermissionOnRoute,
  UtilsMiddlewares.validateSchema(updatedPermissionSchema),
  UtilsMiddlewares.wasNoFieldUpdated,
  PermissionsController.update
);

module.exports = { permissionsRouter };
