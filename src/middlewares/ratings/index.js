const { NoPermissionError } = require("../../errors");
const { RatingsServices } = require("../../services");

class RatingsMiddlewares {
  static async isSelfRating(request, response, nextMiddleware) {
    const authorId = request.loggedUser.id;
    const ratedRecipientId = request.validatedData.ratedRecipientId;

    console.log("author id", authorId);
    console.log("recipient id", ratedRecipientId);

    const isAuthorSelfRating = authorId === ratedRecipientId;

    if (isAuthorSelfRating) {
      throw new NoPermissionError("A user cannot rate himself");
    }

    return nextMiddleware();
  }

  static async wasRatingMadeByLoggedUser(request, response, nextMiddleware) {
    const ratingId = request.params.id;
    const foundRating = await RatingsServices.getRatingsById(ratingId);

    console.log("found rating", foundRating);
    console.log("\nrating id", ratingId);

    const authorId = foundRating.authorId;
    const wasCreatedByLoggedUser = request.loggedUser.id == authorId;

    if (!wasCreatedByLoggedUser) {
      throw new NoPermissionError(
        "A user cannot change ratings from other users"
      );
    }

    return nextMiddleware();
  }
}

module.exports = { RatingsMiddlewares };
