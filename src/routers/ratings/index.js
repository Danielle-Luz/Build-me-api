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
  RatingsController.create
);

ratingsRouter.get(
  "/made/:authorId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  RatingsController.getRatingsMade
);
ratingsRouter.get(
  "/received/:ratedRecipientId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  RatingsController.getRatingsReceived
);
ratingsRouter.get(
  "/average/:ratedRecipientId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  RatingsController.getRatingsAverage
);

ratingsRouter.patch(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedRatingSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
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
