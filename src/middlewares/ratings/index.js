const { StatusCodes } = require("http-status-codes");
const {
  NoPermissionError,
  RecordNotFoundError,
  AppError,
} = require("../../errors");
const { RatingCooldownError } = require("../../errors/RatingCooldownError");
const { RatingsServices, VacanciesService } = require("../../services");

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
    const projectId = request.validatedData.projectId;

    const lastRating = await RatingsServices.getAuthorLastRatingForUser(
      authorId,
      ratedRecipientId,
      projectId
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

  static async isProjectColleague(request, response, nextMiddleware) {
    const { ratedRecipientId, projectId } = request.validatedData;
    const authorId = request.loggedUser.id;

    const chosenCandidateIds = [authorId, ratedRecipientId];
    const projectColleagues = await VacanciesService.getProjectColleagues(
      projectId,
      chosenCandidateIds
    );

    const areColleagues = projectColleagues.length == 2;

    if (!areColleagues) {
      const errorMessage =
        "A user is unable to rate a user they haven't collaborated with on the specified project";
      throw new AppError(errorMessage, StatusCodes.NOT_FOUND);
    }

    return nextMiddleware();
  }
}

module.exports = { RatingsMiddlewares };
