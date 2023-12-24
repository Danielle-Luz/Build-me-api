const { Router } = require("express");
const { PermissionsController } = require("../../controllers/index");
const { UtilsMiddlewares } = require("../../middlewares/index");
const { newPermissionSchema } = require("../../schemas/index");

const permissionsRouter = Router();

permissionsRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newPermissionSchema),
  PermissionsController.create
);

module.exports = { permissionsRouter };
