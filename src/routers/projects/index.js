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
projectsRouter.get("/open", ProjectsController.getOpenProjects);
projectsRouter.get(
  "/selectionMethod/:selectionMethod",
  ProjectsController.getProjectsByMemberSelectionMethod
);
projectsRouter.get("/:id", ProjectsController.getProjectById);
projectsRouter.get("/users/:createdById", ProjectsController.getUserProjects);
projectsRouter.get("/search/:value", ProjectsController.getProjectsByFilter);

projectsRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updateProjectSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  ProjectsMiddlewares.hasPermissionOnRoute,
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
