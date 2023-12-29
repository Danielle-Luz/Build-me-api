const { Router } = require("express");
const { VacancySubscriptionsController } = require("../../controllers");
const {
  VacancySubscriptionsMiddlewares,
  UtilsMiddlewares,
  UsersMiddlewares,
} = require("../../middlewares");
const { newVacancySubscriptionSchema } = require("../../schemas");

const vacancySubscriptionRouter = Router();

vacancySubscriptionRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newVacancySubscriptionSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacancySubscriptionsMiddlewares.hasPermissionOnRoute,
  VacancySubscriptionsController.create
);

vacancySubscriptionRouter.get(
  "/vacancies/:vacancyId",
  VacancySubscriptionsController.getByVacancyId
);

vacancySubscriptionRouter.get(
  "/users/:userId",
  VacancySubscriptionsController.getByUserId
);

vacancySubscriptionRouter.get("/:id", VacancySubscriptionsController.getById);

vacancySubscriptionRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  VacancySubscriptionsMiddlewares.hasPermissionOnRoute,
  VacancySubscriptionsController.delete
);

module.exports = { vacancySubscriptionRouter };
