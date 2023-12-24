const { Router } = require("express");
const { PermissionsController } = require("../../controllers/index");
const { UtilsMiddlewares } = require("../../middlewares/index");
const {
  newPermissionSchema,
  updatedPermissionSchema,
} = require("../../schemas/index");

const permissionsRouter = Router();

permissionsRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newPermissionSchema),
  PermissionsController.create
);

permissionsRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedPermissionSchema),
  PermissionsController.update
);

module.exports = { permissionsRouter };
