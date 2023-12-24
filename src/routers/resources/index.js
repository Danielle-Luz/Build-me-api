const { Router } = require("express");
const { ResourcesController } = require("../../controllers/index");
const { UtilsMiddlewares } = require("../../middlewares/index");
const { nameSchema } = require("../../schemas/index");

const resourcesRouter = Router();

resourcesRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(nameSchema),
  ResourcesController.create
);

module.exports = { resourcesRouter };
