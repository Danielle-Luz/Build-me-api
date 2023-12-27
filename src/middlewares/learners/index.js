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

    const foundVacancy = await VacanciesService.getVacancyById(vacancyId);

    if (vacancyId && !foundVacancy) {
      throw new RecordNotFoundError(
        "No vacancy with the informed id was found"
      );
    }

    return nextMiddleware();
  }
}

module.exports = { LearnersMiddlewares };
