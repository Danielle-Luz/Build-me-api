const { ProjectsMiddlewares } = require("./projects");
const { RatingsMiddlewares } = require("./ratings");
const { UsersMiddlewares } = require("./users/index");
const { UtilsMiddlewares } = require("./utils/index");
const { VacanciesMiddlewares } = require("./vacancies");

module.exports = {
  ProjectsMiddlewares,
  RatingsMiddlewares,
  UsersMiddlewares,
  UtilsMiddlewares,
  VacanciesMiddlewares,
};
