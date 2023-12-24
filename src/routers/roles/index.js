const { Router } = require("express");
const { RolesController } = require("../../controllers/index");
const { UtilsMiddlewares } = require("../../middlewares/index");
const { nameSchema } = require("../../schemas/index");

const rolesRouter = Router();

rolesRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(nameSchema),
  RolesController.create
);

rolesRouter.get("/", RolesController.getAll);

module.exports = { rolesRouter };
