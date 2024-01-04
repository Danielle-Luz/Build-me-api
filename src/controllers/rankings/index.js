const { StatusCodes } = require("http-status-codes");
const { AppDatasource } = require("../../data-source");
const { Vacancies } = require("../../entities");
const { RankingsService } = require("../../services");

class RankingsController {
  static async getUsersWithMoreVacanciesParticipations(request, response) {
    const orderedResults =
      await RankingsService.getUsersWithMoreVacanciesParticipations();
    return response.status(StatusCodes.OK).json(orderedResults);
  }

  static async getUsersWithMoreRatingsMade(request, response) {
    const orderedResults = await RankingsService.getUsersWithMoreRatingsMade();
    return response.status(StatusCodes.OK).json(orderedResults);
  }

  static async getUsersWithBiggestAverageRatings(request, response) {
    const orderedResults =
      await RankingsService.getUsersWithBiggestAverageRatings();
    return response.status(StatusCodes.OK).json(orderedResults);
  }

  static async getUsersWithMoreLearnerSubscriptions(request, response) {
    const orderedResults =
      await RankingsService.getUsersWithMoreLearnerSubscriptions();
    return response.status(StatusCodes.OK).json(orderedResults);
  }

  static async getUsersWithBiggestTestScores(request, response) {
    const orderedResults =
      await RankingsService.getUsersWithBiggestTestScores();
    return response.status(StatusCodes.OK).json(orderedResults);
  }

  static async getUsersWithBestSkillScores(request, response) {
    const orderedResults = await RankingsService.getUsersWithBestSkillScores();
    return response.status(StatusCodes.OK).json(orderedResults);
  }
}

module.exports = { RankingsController };
