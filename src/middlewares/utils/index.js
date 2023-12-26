const { NoPermissionError } = require("../../errors");
const { PermissionsHelper } = require("../../helpers");
const { PermissionsService } = require("../../services");

class UtilsMiddlewares {
  static validateSchema(schema, validatedRequestProperty = "body") {
    return (request, response, nextMiddleware) => {
      const validatedData = schema.parse(request[validatedRequestProperty]);
      request.validatedData = validatedData;
      return nextMiddleware();
    };
  }

  static async hasPermissionOnRoute(request, response, nextMiddleware, userId) {
    const loggedUserRoleId = request.loggedUser.roleId.id;
    const accessedResourceName = request.originalUrl.split("/")[1];
    const routeRequiredPermission =
      PermissionsHelper.getPermissionByHttpMethod(request.method);
    
    const loggedUserPermissions =
      await PermissionsService.getPermissionsByFilters(
        accessedResourceName,
        loggedUserRoleId
      );

    const isUserUnauthorized =
      !loggedUserPermissions[routeRequiredPermission];
    const isModifyingOtherUserRecord = userId != request.loggedUser.id;

    if (isUserUnauthorized && isModifyingOtherUserRecord) {
      throw new NoPermissionError();
    }

    return nextMiddleware();
  }
}

module.exports = { UtilsMiddlewares };
