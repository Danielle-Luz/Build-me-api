const { QuestionsService } = require("../services");
const { LearnersController } = require("./learners");
const { PermissionsController } = require("./permissions/index");
const { ProjectsController } = require("./projects");
const { QuestionsController } = require("./questions");
const { RatingsController } = require("./ratings");
const { ResourcesController } = require("./resources/index");
const { RolesController } = require("./roles/index");
const { TechnologiesController } = require("./technologies");
const { UserSkillsController } = require("./userSkills");
const { UsersController } = require("./users/index");
const { VacanciesController } = require("./vacancies");
const { VacancySubscriptionsController } = require("./vacancySubscriptions");
const { VacancyRequirementsController } = require("./vancancyRequirements");

module.exports = {
  QuestionsService,
  LearnersController,
  PermissionsController,
  ProjectsController,
  QuestionsController,
  RatingsController,
  ResourcesController,
  RolesController,
  TechnologiesController,
  UsersController,
  UserSkillsController,
  VacanciesController,
  VacancySubscriptionsController,
  VacancyRequirementsController,
};
