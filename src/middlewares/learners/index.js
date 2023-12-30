const { StatusCodes } = require("http-status-codes");
const { RecordNotFoundError, AppError } = require("../../errors");
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
    const isCreatingLearner = request.method == "POST";
    let vacancyId;

    if (isCreatingLearner) {
      vacancyId = request.validatedData.vacancyId;
    } else {
      vacancyId = request.params.vacancyId;
    }

    await VacanciesService.getVacancyById(vacancyId);

    return nextMiddleware();
  }

  static async isVacationsUnderLearnersLimit(
    request,
    response,
    nextMiddleware
  ) {
    const { vacancyId } = request.validatedData;
    const { learnersLimit } = await VacanciesService.getVacancyById(vacancyId);

    const { learnersCount } = await LearnersService.getLearnersCountByVacancyId(
      vacancyId
    );
    const learnersCountAfterInsert = learnersCount + 1;

    if (learnersCountAfterInsert > learnersLimit) {
      throw new AppError(
        `It's not possible to add a new learner, the limit of ${learnersLimit} learners related to this vacancy was already reached`,
        StatusCodes.TOO_MANY_REQUESTS
      );
    }

    return nextMiddleware();
  }
}

module.exports = { LearnersMiddlewares };
