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

vacancyRequirementsRouter.patch(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacancyRequirementsMiddlewares.hasPermissionOnRoute,
  UtilsMiddlewares.validateSchema(updatedVacancyRequirementSchema),
  VacancyRequirementsMiddlewares.doesTechnologyExists,
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
