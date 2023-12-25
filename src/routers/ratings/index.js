const { Router } = require("express");
const { RatingsController } = require("../../controllers");

const ratingsRouter = Router();

ratingsRouter.post("/", RatingsController.create);

ratingsRouter.get("/made/:authorId", RatingsController.getRatingsMade);
ratingsRouter.get(
  "/received/:ratedRecipientId",
  RatingsController.getRatingsMade
);
ratingsRouter.get(
  "/average/:ratedRecipientId",
  RatingsController.getRatingsAverage
);

ratingsRouter.post("/:id", RatingsController.update);

ratingsRouter.delete("/:id", RatingsController.delete);

module.exports = { ratingsRouter };
