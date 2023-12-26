const { ProjectsMiddlewares } = require("./projects");
const { RatingsMiddlewares } = require("./ratings");
const { UsersMiddlewares } = require("./users/index");
const { UtilsMiddlewares } = require("./utils/index");

module.exports = {
  ProjectsMiddlewares,
  RatingsMiddlewares,
  UsersMiddlewares,
  UtilsMiddlewares,
};
