const { Router } = require("express");
const { RatingsController } = require("../../controllers");
const {
  UtilsMiddlewares,
  UsersMiddlewares,
  RatingsMiddlewares,
} = require("../../middlewares");
const { newRatingSchema, updatedRatingSchema } = require("../../schemas");

const ratingsRouter = Router();

ratingsRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newRatingSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  RatingsMiddlewares.isSelfRating,
  RatingsMiddlewares.isProjectColleague,
  RatingsMiddlewares.isLastRatingHasMoreThanFifteenDaysOlder,
  RatingsController.create
);

ratingsRouter.get("/made/:authorId", RatingsController.getRatingsMade);
ratingsRouter.get(
  "/received/:ratedRecipientId",
  RatingsController.getRatingsReceived
);
ratingsRouter.get(
  "/average/:ratedRecipientId",
  RatingsController.getRatingsAverage
);

ratingsRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedRatingSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  UtilsMiddlewares.wasNoFieldUpdated,
  RatingsMiddlewares.wasRatingMadeByLoggedUser,
  RatingsController.update
);

ratingsRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  RatingsMiddlewares.wasRatingMadeByLoggedUser,
  RatingsController.delete
);

module.exports = { ratingsRouter };
