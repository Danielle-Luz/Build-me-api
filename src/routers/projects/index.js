const { Router } = require("express");
const { ProjectsController } = require("../../controllers");
const {
  UtilsMiddlewares,
  UsersMiddlewares,
  ProjectsMiddlewares,
} = require("../../middlewares");
const { newProjectSchema, updateProjectSchema } = require("../../schemas");

const projectsRouter = Router();

projectsRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newProjectSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  ProjectsMiddlewares.isCloseDateGreaterThanActualDate,
  ProjectsController.create
);

projectsRouter.get("/", ProjectsController.getAll);
projectsRouter.get("/vacancySubscriptions/open", ProjectsController.getProjectsWithOpenVacancySubscriptions);
projectsRouter.get("/unfinished", ProjectsController.getUnfinishedProjects);
projectsRouter.get(
  "/selectionMethod/:selectionMethod",
  ProjectsMiddlewares.isSelectionMethodValid,
  ProjectsController.getProjectsByMemberSelectionMethod
);
projectsRouter.get("/:id", ProjectsController.getById);
projectsRouter.get(
  "/users/:createdById",
  ProjectsMiddlewares.doesUserExists,
  ProjectsController.getUserProjects
);
projectsRouter.get("/search/:value", ProjectsController.getProjectsByFilter);

projectsRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updateProjectSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  ProjectsMiddlewares.hasPermissionOnRoute,
  UtilsMiddlewares.wasNoFieldUpdated,
  ProjectsMiddlewares.isCloseDateGreaterThanActualDate,
  ProjectsController.update
);

projectsRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  ProjectsMiddlewares.hasPermissionOnRoute,
  ProjectsController.delete
);

module.exports = { projectsRouter };
