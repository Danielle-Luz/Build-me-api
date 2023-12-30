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
  RatingsMiddlewares.doesUserExists("ratedRecipientId"),
  RatingsMiddlewares.doesUserExists("authorId"),
  RatingsMiddlewares.isSelfRating,
  RatingsMiddlewares.isProjectColleague,
  RatingsMiddlewares.isLastRatingHasMoreThanFifteenDaysOlder,
  RatingsController.create
);

ratingsRouter.get(
  "/made/:authorId",
  RatingsMiddlewares.doesUserExists("authorId"),
  RatingsController.getRatingsMade
);
ratingsRouter.get(
  "/received/:ratedRecipientId",
  RatingsMiddlewares.doesUserExists("ratedRecipientId"),
  RatingsController.getRatingsReceived
);
ratingsRouter.get(
  "/average/:ratedRecipientId",
  RatingsMiddlewares.doesUserExists("ratedRecipientId"),
  RatingsController.getRatingsAverage
);

ratingsRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedRatingSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  UtilsMiddlewares.wasNoFieldUpdated,
  RatingsMiddlewares.wasRatingMadeByLoggedUser,
  RatingsMiddlewares.doesUserExists("ratedRecipientId"),
  RatingsMiddlewares.doesUserExists("authorId"),
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
