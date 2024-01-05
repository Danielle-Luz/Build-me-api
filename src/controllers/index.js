const { QuestionsService } = require("../services");
const { AnswersController } = require("./answers");
const { LearnersController } = require("./learners");
const { PermissionsController } = require("./permissions/index");
const { ProjectsController } = require("./projects");
const { QuestionsController } = require("./questions");
const { RankingsController } = require("./rankings");
const { RatingsController } = require("./ratings");
const { ResourcesController } = require("./resources/index");
const { RolesController } = require("./roles/index");
const { TechnologiesController } = require("./technologies");
const { TestsController } = require("./tests");
const { UserSkillsController } = require("./userSkills");
const { UsersController } = require("./users/index");
const { VacanciesController } = require("./vacancies");
const { VacancySubscriptionsController } = require("./vacancySubscriptions");
const { VacancyRequirementsController } = require("./vancancyRequirements");
const { VotationsController } = require("./votations");
const { VotesController } = require("./votes");

module.exports = {
  AnswersController,
  QuestionsService,
  RankingsController,
  LearnersController,
  PermissionsController,
  ProjectsController,
  QuestionsController,
  RatingsController,
  ResourcesController,
  RolesController,
  TechnologiesController,
  TestsController,
  UsersController,
  UserSkillsController,
  VacanciesController,
  VacancySubscriptionsController,
  VacancyRequirementsController,
  VotationsController,
  VotesController,
};
