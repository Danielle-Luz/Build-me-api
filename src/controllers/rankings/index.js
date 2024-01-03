const { StatusCodes } = require("http-status-codes");
const { AppDatasource } = require("../../data-source");
const { Vacancies } = require("../../entities");
const { RankingsService } = require("../../services");

class RankingsController {
  static async getUsersWithMoreVacanciesParticipations(request, response) {
    const mostVacanciesApplications =
      await RankingsService.getUsersWithMoreVacanciesParticipations();

    return response.status(StatusCodes.OK).json(mostVacanciesApplications);
  }
}

module.exports = { RankingsController };
