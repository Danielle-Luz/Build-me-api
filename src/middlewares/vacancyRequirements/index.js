const { VacanciesService, TechnologiesService } = require("../../services");

class VacancyRequirementsMiddlewares {
  static async doesVacancyExists(request, response, nextMiddleware) {
    const vacancyId = request.validatedData.vacancyId;

    await VacanciesService.getVacancyById(vacancyId);

    return nextMiddleware();
  }

  static async doesTechnologyExists(request, response, nextMiddleware) {
    const technologyId = request.validatedData.technologyId;

    await TechnologiesService.getById(technologyId);

    return nextMiddleware();
  }
}

module.exports = { VacancyRequirementsMiddlewares };
