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
  VacancyRequirementsMiddlewares.isTechnologyAlreadyRelatedToVacancy,
  VacancyRequirementsController.create
);

vacancyRequirementsRouter.get(
  "/vacancies/:vacancyId",
  VacancyRequirementsController.getVacancyRequirementsByVacancyId
);
vacancyRequirementsRouter.get(
  "/:id",
  VacancyRequirementsController.getVacancyRequirementById
);
vacancyRequirementsRouter.get(
  "/projects/:projectId/users/:userId",
  VacancyRequirementsController.getVacanciesThatMeetFilters
);

vacancyRequirementsRouter.patch(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacancyRequirementsMiddlewares.hasPermissionOnRoute,
  UtilsMiddlewares.validateSchema(updatedVacancyRequirementSchema),
  VacancyRequirementsMiddlewares.doesTechnologyExists,
  VacancyRequirementsMiddlewares.isTechnologyAlreadyRelatedToVacancy,
  VacancyRequirementsController.update
);

vacancyRequirementsRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacancyRequirementsMiddlewares.hasPermissionOnRoute,
  VacancyRequirementsController.delete
);

module.exports = { vacancyRequirementsRouter };
