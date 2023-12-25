const { Router } = require("express");
const { RatingsController } = require("../../controllers");
const { UtilsMiddlewares, UsersMiddlewares } = require("../../middlewares");
const { newRatingSchema, updatedRatingSchema } = require("../../schemas");

const ratingsRouter = Router();

ratingsRouter.post(
  "/",
  UtilsMiddlewares.validateSchema(newRatingSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  RatingsController.create
);

ratingsRouter.get("/made/:authorId", RatingsController.getRatingsMade);
ratingsRouter.get(
  "/received/:ratedRecipientId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  RatingsController.getRatingsMade
);
ratingsRouter.get(
  "/average/:ratedRecipientId",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  RatingsController.getRatingsAverage
);

ratingsRouter.post(
  "/:id",
  UtilsMiddlewares.validateSchema(updatedRatingSchema),
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  RatingsController.update
);

ratingsRouter.delete(
  "/:id",
  UsersMiddlewares.isTokenFilled,
  UsersMiddlewares.validateToken,
  RatingsController.delete
);

module.exports = { ratingsRouter };
