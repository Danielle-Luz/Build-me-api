const { PermissionsService } = require("./permissions/index");
const { ProjectsService } = require("./projects");
const { RatingsServices } = require("./ratings");
const { ResourcesService } = require("./resources/index");
const { RolesService } = require("./roles/index");
const { UsersService } = require("./users/index");
const { VacanciesService } = require("./vacancies");

module.exports = {
  PermissionsService,
  ProjectsService,
  RatingsServices,
  ResourcesService,
  RolesService,
  UsersService,
  VacanciesService,
};
