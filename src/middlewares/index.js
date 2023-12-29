const { LearnersMiddlewares } = require("./learners");
const { PermissionsMiddlewares } = require("./permissions");
const { ProjectsMiddlewares } = require("./projects");
const { RatingsMiddlewares } = require("./ratings");
const { TechnologiesMiddlewares } = require("./technologies");
const { UserSkillsMiddlewares } = require("./userSkills");
const { UsersMiddlewares } = require("./users/index");
const { UtilsMiddlewares } = require("./utils/index");
const { VacanciesMiddlewares } = require("./vacancies");
const { VacancyRequirementsMiddlewares } = require("./vacancyRequirements");
const { VacancySubscriptionsMiddlewares } = require("./vacancySubscriptions");

module.exports = {
  LearnersMiddlewares,
  PermissionsMiddlewares,
  ProjectsMiddlewares,
  RatingsMiddlewares,
  TechnologiesMiddlewares,
  UsersMiddlewares,
  UserSkillsMiddlewares,
  UtilsMiddlewares,
  VacanciesMiddlewares,
  VacancyRequirementsMiddlewares,
  VacancySubscriptionsMiddlewares,
};
