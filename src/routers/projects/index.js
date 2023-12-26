const { Router } = require("express");
const { ProjectsController } = require("../../controllers");

const projectsRouter = Router();

projectsRouter.post("/", ProjectsController.create);

projectsRouter.get("/", ProjectsController.getAll);
projectsRouter.get("/:id", ProjectsController.getProjectById);
projectsRouter.get("/user/:createdById", ProjectsController.getUserProjects);
projectsRouter.get("/search/:value", ProjectsController.getProjectsByFilter);
projectsRouter.get("/open", ProjectsController.getOpenProjects);
projectsRouter.get(
  "/selectionMethod/:selectionMethod",
  ProjectsController.getProjectsByMemberSelectionMethod
);

projectsRouter.patch("/:id", ProjectsController.update);

projectsRouter.delete("/:id", ProjectsController.delete);

module.exports = { projectsRouter };
