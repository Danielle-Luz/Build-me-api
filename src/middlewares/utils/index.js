class UtilsMiddlewares {
  static validateSchema(schema) {
    return (request, response, nextMiddleware) => {
      const validatedData = schema.parse(request.body);
      request.validatedData = validatedData;
      return nextMiddleware();
    };
  }
}

module.exports = { UtilsMiddlewares };
