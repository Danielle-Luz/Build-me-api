const { permissionsRouter } = require("./permissions/index");
const { ratingsRouter } = require("./ratings");
const { resourcesRouter } = require("./resources/index");
const { rolesRouter } = require("./roles/index");
const { usersRouter } = require("./users/index");

module.exports = {
  permissionsRouter,
  ratingsRouter,
  resourcesRouter,
  rolesRouter,
  usersRouter,
};
