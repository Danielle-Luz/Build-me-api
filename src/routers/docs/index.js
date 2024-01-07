const { Router } = require("express");
const swaggerUi = require("swagger-ui-express");
const {
  swaggerConfig,
  getSwaggerConfigAsJson,
} = require("../../docs/swaggerConfig");

const docsRouter = Router();

docsRouter.get("/docs.json", getSwaggerConfigAsJson);
docsRouter.use("/", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

module.exports = { docsRouter };
