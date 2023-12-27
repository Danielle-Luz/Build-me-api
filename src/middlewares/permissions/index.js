const { UtilsMiddlewares } = require("../utils");

class PermissionsMiddlewares {
  static async hasPermissionOnRoute(request, response, nextMiddleware) {
    return await UtilsMiddlewares.hasPermissionOnRoute(
      request,
      response,
      nextMiddleware,
      undefined
    );
  }
}

module.exports = { PermissionsMiddlewares };
