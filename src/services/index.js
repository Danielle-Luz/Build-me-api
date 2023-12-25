const { PermissionsService } = require("./permissions/index");
const { RatingsServices } = require("./ratings");
const { ResourcesService } = require("./resources/index");
const { RolesService } = require("./roles/index");
const { UsersService } = require("./users/index");

module.exports = {
  PermissionsService,
  RatingsServices,
  ResourcesService,
  RolesService,
  UsersService,
};
