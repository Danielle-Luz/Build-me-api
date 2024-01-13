const { StatusCodes } = require("http-status-codes");
const { AppDatasource } = require("../../data-source");
const { Vacancies } = require("../../entities");
const { RankingsService } = require("../../services");

class RankingsController {
  static async getUsersWithMoreVacanciesParticipations(request, response) {
    const { page, quantity } = request.query;
    const orderedResults =
      await RankingsService.getUsersWithMoreVacanciesParticipations({
        page,
        quantity,
      });

    return response.status(StatusCodes.OK).json(orderedResults);
  }

  static async getUsersWithMoreRatingsMade(request, response) {
    const { page, quantity } = request.query;
    const orderedResults = await RankingsService.getUsersWithMoreRatingsMade({
      page,
      quantity,
    });

    return response.status(StatusCodes.OK).json(orderedResults);
  }

  static async getUsersWithBiggestAverageRatings(request, response) {
    const { page, quantity } = request.query;
    const orderedResults =
      await RankingsService.getUsersWithBiggestAverageRatings({
        page,
        quantity,
      });

    return response.status(StatusCodes.OK).json(orderedResults);
  }

  static async getUsersWithMoreLearnerSubscriptions(request, response) {
    const { page, quantity } = request.query;
    const orderedResults =
      await RankingsService.getUsersWithMoreLearnerSubscriptions({
        page,
        quantity,
      });

    return response.status(StatusCodes.OK).json(orderedResults);
  }

  static async getUsersWithBiggestTestScores(request, response) {
    const { page, quantity } = request.query;
    const orderedResults = await RankingsService.getUsersWithBiggestTestScores({
      page,
      quantity,
    });

    return response.status(StatusCodes.OK).json(orderedResults);
  }

  static async getUsersWithBestSkillScores(request, response) {
    const { page, quantity } = request.query;
    const orderedResults = await RankingsService.getUsersWithBestSkillScores({
      page,
      quantity,
    });
    
    return response.status(StatusCodes.OK).json(orderedResults);
  }
}

module.exports = { RankingsController };
