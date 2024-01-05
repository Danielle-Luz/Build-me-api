const { AnswersService } = require("./answers");
const { LearnersService } = require("./learners");
const { PermissionsService } = require("./permissions/index");
const { ProjectsService } = require("./projects");
const { QuestionsService } = require("./questions");
const { RankingsService } = require("./rankings");
const { RatingsServices } = require("./ratings");
const { ResourcesService } = require("./resources/index");
const { RolesService } = require("./roles/index");
const { TechnologiesService } = require("./technologies");
const { TestsService } = require("./tests");
const { UserSkillsService } = require("./userSkills");
const { UsersService } = require("./users/index");
const { VacanciesService } = require("./vacancies");
const { VacancyRequirementsService } = require("./vacancyRequirements");
const { VacancySubscriptionsService } = require("./vacancySubscriptions");
const { VotationsService } = require("./votations");
const { VotesService } = require("./votes");

module.exports = {
  AnswersService,
  LearnersService,
  PermissionsService,
  ProjectsService,
  QuestionsService,
  RankingsService,
  RatingsServices,
  ResourcesService,
  RolesService,
  TechnologiesService,
  TestsService,
  UsersService,
  UserSkillsService,
  VacanciesService,
  VacancySubscriptionsService,
  VacancyRequirementsService,
  VotationsService,
  VotesService,
};
