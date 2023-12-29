const { Learners } = require("./learners");
const { Permissions } = require("./permissions/index");
const { Projects } = require("./projects");
const { Ratings } = require("./ratings");
const { Resources } = require("./resources/index");
const { Roles } = require("./roles/index");
const { Technologies } = require("./technologies");
const { Users } = require("./users/index");
const { UserSkills } = require("./userSkills");
const { Vacancies } = require("./vacancies");
const { VacancyRequirements } = require("./vacancyRequirements");
const { VacancySubscriptions } = require("./vacancySubscriptions");

module.exports = {
  Learners,
  Permissions,
  Projects,
  Ratings,
  Resources,
  Roles,
  Technologies,
  Users,
  UserSkills,
  Vacancies,
  VacancyRequirements,
  VacancySubscriptions,
};
