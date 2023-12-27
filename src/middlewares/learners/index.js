const { RecordNotFoundError } = require("../../errors");
const {
  LearnersService,
  VacanciesService,
  UsersService,
} = require("../../services");
const { UtilsMiddlewares } = require("../utils");

class LearnersMiddlewares {
  static async hasPermissionOnRoute(request, response, nextMiddleware) {
    let candidateId;

    if (request.method == "POST") {
      candidateId = request.validatedData.candidateId;
    } else {
      const learnerId = request.params.id;
      const foundLearner = await LearnersService.getById(learnerId);
      candidateId = foundLearner.candidateId;
    }

    return UtilsMiddlewares.hasPermissionOnRoute(
      request,
      response,
      nextMiddleware,
      candidateId
    );
  }

  static async doesVacancyExists(request, response, nextMiddleware) {
    const vacancyId = request.validatedData.vacancyId;

    if (vacancyId) {
      await VacanciesService.getVacancyById(vacancyId);
    }

    return nextMiddleware();
  }
}

module.exports = { LearnersMiddlewares };
