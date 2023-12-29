
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
  VacancySubscriptionsController.create
);

vacancySubscriptionsRouter.get(
  "/vacancies/:vacancyId",
  VacancySubscriptionsController.getByVacancyId
);

vacancySubscriptionsRouter.get(
  "/users/:userId",
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
