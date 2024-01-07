const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Build Me",
      version: "1.0.0",
      description:
        "Platform where users can manage and join programming projects",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: {
      bearerAuth: []
    }
  },
  apis: ["./src/routers/**/index.js"],
};

const swaggerConfig = swaggerJsdoc(options);

function getSwaggerConfigAsJson(request, response) {
  response.setHeader("Content-Type", "application/json");
  return response.send(swaggerConfig);
}

module.exports = { swaggerConfig, getSwaggerConfigAsJson };
