const { Router } = require("express");
const { VacancySubscriptionsController } = require("../../controllers");
const {
  VacancySubscriptionsMiddlewares,
  UtilsMiddlewares,
  UsersMiddlewares,
} = require("../../middlewares");
const { newVacancySubscriptionSchema } = require("../../schemas");

const vacancySubscriptionsRouter = Router();

vacancySubscriptionsRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newVacancySubscriptionSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacancySubscriptionsMiddlewares.hasPermissionOnRoute,
  VacancySubscriptionsMiddlewares.doesVacancyExists,
  VacancySubscriptionsMiddlewares.hasVacancyChosenCandidate,
  VacancySubscriptionsMiddlewares.doesUserMeetVacationRequirements,
  VacancySubscriptionsMiddlewares.wasSubscriptionAlreadyDone,
  VacancySubscriptionsController.create
);

vacancySubscriptionsRouter.get(
  "/vacancies/:vacancyId",
  VacancySubscriptionsMiddlewares.doesVacancyExists,
  VacancySubscriptionsController.getByVacancyId
);

vacancySubscriptionsRouter.get(
  "/users/:userId",
  VacancySubscriptionsMiddlewares.doesUserExists,
  VacancySubscriptionsController.getByUserId
);

vacancySubscriptionsRouter.get("/:id", VacancySubscriptionsController.getById);

vacancySubscriptionsRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacancySubscriptionsMiddlewares.hasPermissionOnRoute,
  VacancySubscriptionsController.delete
);

module.exports = { vacancySubscriptionsRouter };
