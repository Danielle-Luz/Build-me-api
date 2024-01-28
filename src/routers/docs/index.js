const { Router } = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../../docs/swagger.json");

const docsRouter = Router();

docsRouter.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: { supportedSubmitMethods: ["get"] },
  })
);
docsRouter.get("/docs.json", (request, response) => {
  response.setHeader("Content-Type", "application/json");
  return response.send(swaggerDocument);
});

module.exports = { docsRouter };
