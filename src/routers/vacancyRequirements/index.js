const { Router } = require("express");
const { VacancyRequirementsController } = require("../../controllers");
const {
  VacancyRequirementsMiddlewares,
  UtilsMiddlewares,
  UsersMiddlewares,
} = require("../../middlewares");
const {
  newVacancyRequirementSchema,
  updatedVacancyRequirementSchema,
} = require("../../schemas");

const vacancyRequirementsRouter = Router();

vacancyRequirementsRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newVacancyRequirementSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacancyRequirementsMiddlewares.hasPermissionOnRoute,
  VacancyRequirementsMiddlewares.doesTechnologyExists,
  VacancyRequirementsMiddlewares.doesVacancyExists,
  VacancyRequirementsMiddlewares.doesRelatedVacancyHaveChosenCandidate,
  VacancyRequirementsMiddlewares.isTechnologyAlreadyRelatedToVacancy,
  VacancyRequirementsMiddlewares.setScoreBasedOnSkillLevel,
  VacancyRequirementsController.create
);

vacancyRequirementsRouter.get(
  "/vacancies/:vacancyId",
  VacancyRequirementsMiddlewares.doesVacancyExists,
  VacancyRequirementsController.getVacancyRequirementsByVacancyId
);
vacancyRequirementsRouter.get(
  "/:id",
  VacancyRequirementsController.getVacancyRequirementById
);

vacancyRequirementsRouter.patch(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacancyRequirementsMiddlewares.hasPermissionOnRoute,
  UtilsMiddlewares.validateSchema(updatedVacancyRequirementSchema),
  VacancyRequirementsMiddlewares.doesTechnologyExists,
  VacancyRequirementsMiddlewares.isTechnologyAlreadyRelatedToVacancy,
  VacancyRequirementsMiddlewares.doesRelatedVacancyHaveChosenCandidate,
  VacancyRequirementsController.update
);

vacancyRequirementsRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacancyRequirementsMiddlewares.hasPermissionOnRoute,
  VacancyRequirementsMiddlewares.doesRelatedVacancyHaveChosenCandidate,
  VacancyRequirementsController.delete
);

module.exports = { vacancyRequirementsRouter };
