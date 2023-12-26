const { LearnersController } = require("./learners");
const { PermissionsController } = require("./permissions/index");
const { ProjectsController } = require("./projects");
const { RatingsController } = require("./ratings");
const { ResourcesController } = require("./resources/index");
const { RolesController } = require("./roles/index");
const { UsersController } = require("./users/index");
const { VacanciesController } = require("./vacancies");

module.exports = {
  LearnersController,
  PermissionsController,
  ProjectsController,
  RatingsController,
  ResourcesController,
  RolesController,
  UsersController,
  VacanciesController,
};
