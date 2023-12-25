const { NoPermissionError, RecordNotFoundError } = require("../../errors");
const { RatingCooldownError } = require("../../errors/RatingCooldownError");
const { RatingsServices } = require("../../services");

class RatingsMiddlewares {
  static async isSelfRating(request, response, nextMiddleware) {
    const authorId = request.loggedUser.id;
    const ratedRecipientId = request.validatedData.ratedRecipientId;

    const isAuthorSelfRating = authorId === ratedRecipientId;

    if (isAuthorSelfRating) {
      throw new NoPermissionError("A user cannot rate himself");
    }

    return nextMiddleware();
  }

  static async wasRatingMadeByLoggedUser(request, response, nextMiddleware) {
    const ratingId = request.params.id;
    const foundRating = await RatingsServices.getRatingsById(ratingId);

    if (!foundRating) {
      throw new RecordNotFoundError("No rating with the informed id was found");
    }

    const authorId = foundRating.authorId;
    const wasCreatedByLoggedUser = request.loggedUser.id == authorId;

    if (!wasCreatedByLoggedUser) {
      throw new NoPermissionError(
        "A user cannot change ratings from other users"
      );
    }

    return nextMiddleware();
  }

  static async isLastRatingHasMoreThanFifteenDaysOlder(
    request,
    response,
    nextMiddleware
  ) {
    const authorId = request.loggedUser.id;
    const ratedRecipientId = request.validatedData.ratedRecipientId;

    const lastRating = await RatingsServices.getAuthorLastRatingForUser(
      authorId,
      ratedRecipientId
    );

    const actualDate = new Date();
    const lastRatingDate = new Date(lastRating?.createdDate);

    const ratingAge = Math.floor(
      (actualDate - lastRatingDate) / (1000 * 60 * 60 * 24)
    );
    const isWithinFifteenDays = ratingAge < 15;

    if (isWithinFifteenDays) {
      throw new RatingCooldownError();
    }

    return nextMiddleware();
  }
}

module.exports = { RatingsMiddlewares };
