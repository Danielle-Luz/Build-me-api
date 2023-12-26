const { permissionsRouter } = require("./permissions/index");
const { projectsRouter } = require("./projects");
const { ratingsRouter } = require("./ratings");
const { resourcesRouter } = require("./resources/index");
const { rolesRouter } = require("./roles/index");
const { usersRouter } = require("./users/index");
const { vacanciesRouter } = require("./vacancies");
module.exports = {
  permissionsRouter,
  projectsRouter,
  ratingsRouter,
  resourcesRouter,
  rolesRouter,
  usersRouter,
  vacanciesRouter,
};
