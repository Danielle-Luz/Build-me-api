const { permissionsRouter } = require("./permissions/index");
const { resourcesRouter } = require("./resources/index");
const { rolesRouter } = require("./roles/index");
const { usersRouter } = require("./users/index");

module.exports = {
  permissionsRouter,
  resourcesRouter,
  rolesRouter,
  usersRouter,
};
