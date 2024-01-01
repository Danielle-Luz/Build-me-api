const { LearnersService } = require("./learners");
const { PermissionsService } = require("./permissions/index");
const { ProjectsService } = require("./projects");
const { QuestionsService } = require("./questions");
const { RatingsServices } = require("./ratings");
const { ResourcesService } = require("./resources/index");
const { RolesService } = require("./roles/index");
const { TechnologiesService } = require("./technologies");
const { UserSkillsService } = require("./userSkills");
const { UsersService } = require("./users/index");
const { VacanciesService } = require("./vacancies");
const { VacancyRequirementsService } = require("./vacancyRequirements");
const { VacancySubscriptionsService } = require("./vacancySubscriptions");

module.exports = {
  LearnersService,
  PermissionsService,
  ProjectsService,
  QuestionsService,
  RatingsServices,
  ResourcesService,
  RolesService,
  TechnologiesService,
  UsersService,
  UserSkillsService,
  VacanciesService,
  VacancySubscriptionsService,
  VacancyRequirementsService,
};
