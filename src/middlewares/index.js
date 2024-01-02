const { AnswersMiddlewares } = require("./answers");
const { LearnersMiddlewares } = require("./learners");
const { PermissionsMiddlewares } = require("./permissions");
const { ProjectsMiddlewares } = require("./projects");
const { QuestionsMiddlewares } = require("./questions");
const { RatingsMiddlewares } = require("./ratings");
const { TechnologiesMiddlewares } = require("./technologies");
const { TestsMiddlewares } = require("./tests");
const { UserSkillsMiddlewares } = require("./userSkills");
const { UsersMiddlewares } = require("./users/index");
const { UtilsMiddlewares } = require("./utils/index");
const { VacanciesMiddlewares } = require("./vacancies");
const { VacancyRequirementsMiddlewares } = require("./vacancyRequirements");
const { VacancySubscriptionsMiddlewares } = require("./vacancySubscriptions");

module.exports = {
  AnswersMiddlewares,
  LearnersMiddlewares,
  PermissionsMiddlewares,
  ProjectsMiddlewares,
  QuestionsMiddlewares,
  RatingsMiddlewares,
  TechnologiesMiddlewares,
  TestsMiddlewares,
  UsersMiddlewares,
  UserSkillsMiddlewares,
  UtilsMiddlewares,
  VacanciesMiddlewares,
  VacancyRequirementsMiddlewares,
  VacancySubscriptionsMiddlewares,
};
