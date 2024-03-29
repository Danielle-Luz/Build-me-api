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
  VacanciesMiddlewares.areRelatedProjectVacancySubscriptionsClosed,
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
  VacanciesController.getVacanciesRelatedToUser
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
vacanciesRouter.get(
  "/projects/:projectId/isMember",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacanciesController.isUserInProjectVacancy
);

vacanciesRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedVacancySchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacanciesMiddlewares.hasPermissionOnRoute,
  VacanciesMiddlewares.doesCandidateExists,
  UtilsMiddlewares.wasNoFieldUpdated,
  VacanciesMiddlewares.isRelatedProjectFinished,
  VacanciesMiddlewares.isNewChosenCandidateEqualToPrevious,
  VacanciesMiddlewares.hasReachedOpenProjectVacancyLimit,
  VacanciesController.update
);
vacanciesRouter.patch(
  "/giveup/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacanciesMiddlewares.isRelatedProjectFinished,
  VacanciesMiddlewares.isLoggedUserEqualToChosenCandidate,
  VacanciesController.giveUpFromVacancy
);

vacanciesRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacanciesMiddlewares.hasPermissionOnRoute,
  VacanciesMiddlewares.doesVacancyHasChosenCandidate,
  VacanciesController.delete
);

module.exports = { vacanciesRouter };
