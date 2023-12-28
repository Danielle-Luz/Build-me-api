const { LearnersMiddlewares } = require("./learners");
const { PermissionsMiddlewares } = require("./permissions");
const { ProjectsMiddlewares } = require("./projects");
const { RatingsMiddlewares } = require("./ratings");
const { TechnologiesMiddlewares } = require("./technologies");
const { UsersMiddlewares } = require("./users/index");
const { UtilsMiddlewares } = require("./utils/index");
const { VacanciesMiddlewares } = require("./vacancies");
const { VacancyRequirementsMiddlewares } = require("./vacancyRequirements");

module.exports = {
  LearnersMiddlewares,
  PermissionsMiddlewares,
  ProjectsMiddlewares,
  RatingsMiddlewares,
  TechnologiesMiddlewares,
  UsersMiddlewares,
  UtilsMiddlewares,
  VacanciesMiddlewares,
  VacancyRequirementsMiddlewares,
};
