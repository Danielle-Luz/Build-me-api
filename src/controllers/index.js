const { PermissionsController } = require("./permissions/index");
const { RatingsController } = require("./ratings");
const { ResourcesController } = require("./resources/index");
const { RolesController } = require("./roles/index");
const { UsersController } = require("./users/index");

module.exports = {
  PermissionsController,
  RatingsController,
  ResourcesController,
  RolesController,
  UsersController,
};
