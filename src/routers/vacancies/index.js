const { Router } = require("express");
const { VacanciesController } = require("../../controllers");
const {
  UtilsMiddlewares,
  UsersMiddlewares,
  VacanciesMiddlewares,
} = require("../../middlewares");
const { newVacancySchema, updatedVacancySchema } = require("../../schemas");

const vacanciesRouter = Router();

vacanciesRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newVacancySchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacanciesMiddlewares.hasPermissionOnRoute,
  VacanciesMiddlewares.isRelatedProjectAlreadyClosed,
  VacanciesController.create
);

vacanciesRouter.get("/", VacanciesController.getAll);
vacanciesRouter.get(
  "/unrelated/projects/:projectId",
  VacanciesController.getProjectVacanciesWithoutCandidate
);
vacanciesRouter.get(
  "/projects/open",
  VacanciesController.getOpenProjectsUnrelatedVacancies
);
vacanciesRouter.get(
  "/projects/:projectId",
  VacanciesController.getProjectVacancies
);
vacanciesRouter.get("/:id", VacanciesController.getVacationById);
vacanciesRouter.get(
  "/users/:userId",
  VacanciesController.getVacantionsRelatedToUser
);

vacanciesRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedVacancySchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacanciesMiddlewares.hasPermissionOnRoute,
  VacanciesController.update
);

vacanciesRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacanciesMiddlewares.hasPermissionOnRoute,
  VacanciesController.delete
);

module.exports = { vacanciesRouter };
