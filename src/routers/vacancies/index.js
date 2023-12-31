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
  VacanciesMiddlewares.doesCandidateExists,
  VacanciesMiddlewares.doesProjectExists,
  VacanciesMiddlewares.hasReachedOpenProjectVacancyLimit,
  VacanciesController.create
);

vacanciesRouter.get("/", VacanciesController.getAll);
vacanciesRouter.get(
  "/unrelated/projects/:projectId",
  VacanciesMiddlewares.doesProjectExists,
  VacanciesController.getProjectVacanciesWithoutCandidate
);
vacanciesRouter.get(
  "/projects/open",
  VacanciesController.getOpenProjectsUnrelatedVacancies
);
vacanciesRouter.get(
  "/projects/:projectId",
  VacanciesMiddlewares.doesProjectExists,
  VacanciesController.getProjectVacancies
);
vacanciesRouter.get("/:id", VacanciesController.getVacancyById);
vacanciesRouter.get(
  "/users/:userId",
  VacanciesMiddlewares.doesCandidateExists,
  VacanciesController.getVacantionsRelatedToUser
);
vacanciesRouter.get(
  "/projects/:projectId/users/:userId",
  VacanciesMiddlewares.doesProjectExists,
  VacanciesMiddlewares.doesCandidateExists,
  VacanciesController.getVacanciesMatchingUserSkillsForProject
);
vacanciesRouter.get(
  "/available/users/:userId",
  VacanciesMiddlewares.doesCandidateExists,
  VacanciesController.getAllVacanciesMatchingUserSkills
);

vacanciesRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedVacancySchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacanciesMiddlewares.hasPermissionOnRoute,
  VacanciesMiddlewares.doesCandidateExists,
  UtilsMiddlewares.wasNoFieldUpdated,
  VacanciesMiddlewares.hasReachedOpenProjectVacancyLimit,
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
