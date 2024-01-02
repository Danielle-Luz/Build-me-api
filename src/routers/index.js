const { answersRouter } = require("./answers");
const { learnersRouter } = require("./learners");
const { permissionsRouter } = require("./permissions/index");
const { projectsRouter } = require("./projects");
const { questionsRouter } = require("./questions");
const { ratingsRouter } = require("./ratings");
const { resourcesRouter } = require("./resources/index");
const { rolesRouter } = require("./roles/index");
const { technologiesRouter } = require("./technologies");
const { userSkillsRouter } = require("./userSkills");
const { usersRouter } = require("./users/index");
const { vacanciesRouter } = require("./vacancies");
const { vacancyRequirementsRouter } = require("./vacancyRequirements");
const { vacancySubscriptionsRouter } = require("./vacancySubscriptions");

module.exports = {
  answersRouter,
  learnersRouter,
  permissionsRouter,
  projectsRouter,
  questionsRouter,
  ratingsRouter,
  resourcesRouter,
  rolesRouter,
  technologiesRouter,
  usersRouter,
  userSkillsRouter,
  vacanciesRouter,
  vacancyRequirementsRouter,
  vacancySubscriptionsRouter,
};
