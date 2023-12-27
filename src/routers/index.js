const { learnersRouter } = require("./learners");
const { permissionsRouter } = require("./permissions/index");
const { projectsRouter } = require("./projects");
const { ratingsRouter } = require("./ratings");
const { resourcesRouter } = require("./resources/index");
const { rolesRouter } = require("./roles/index");
const { technologiesRouter } = require("./technologies");
const { usersRouter } = require("./users/index");
const { vacanciesRouter } = require("./vacancies");

module.exports = {
  learnersRouter,
  permissionsRouter,
  projectsRouter,
  ratingsRouter,
  resourcesRouter,
  rolesRouter,
  technologiesRouter,
  usersRouter,
  vacanciesRouter,
};
