export default class UtilsMiddlewares {
  validateSchema(schema) {
    return (request, response, nextMiddleware) => {
      schema.parse(request.body);
      return nextMiddleware();
    };
  }
}
