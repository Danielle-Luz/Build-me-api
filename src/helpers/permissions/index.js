class PermissionsHelper {
  static getPermissionByHttpMethod(method) {
    const permissionsByHttpMethod = {
      POST: "create",
      GET: "read",
      PATCH: "update",
      DELETE: "delete",
    };

    return permissionsByHttpMethod[method];
  }
}

module.exports = { PermissionsHelper };
