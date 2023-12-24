const { ZodError } = require("zod");

class UtilsMiddlewares {
  static validateSchema(schema, validatedRequestProperty = "body") {
    return (request, response, nextMiddleware) => {
      const validatedData = schema.parse(request[validatedRequestProperty]);
      request.validatedData = validatedData;
      return nextMiddleware();
    };
  }
}

module.exports = { UtilsMiddlewares };
