const {
  DuplicatedInfoError,
  AssociationLimitReachedError,
} = require("../../errors");
const {
  LearnersService,
  VacanciesService,
  UsersService,
} = require("../../services");
const { UtilsMiddlewares } = require("../utils");
const { associationLimitsByEntity } = require("../../enumValues");

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

  static async doesCandidateExists(request, response, nextMiddleware) {
    const { candidateId } = request.params;

    await UsersService.getById(candidateId);

    return nextMiddleware();
  }

  static async isVacancyUnderLearnersLimit(request, response, nextMiddleware) {
    const { vacancyId } = request.validatedData;
    const { learnersLimit } = await VacanciesService.getVacancyById(vacancyId);

    const { learnersCount } = await LearnersService.getLearnersCountByVacancyId(
      vacancyId
    );
    const learnersCountAfterInsert = Number(learnersCount) + 1;

    if (learnersCountAfterInsert > learnersLimit) {
      throw new AssociationLimitReachedError(
        `It's not possible to add a new learner, the limit of ${learnersLimit} learners related to this vacancy was already reached`
      );
    }

    return nextMiddleware();
  }

  static async isUserAlreadyLearning(request, response, nextMiddleware) {
    const { vacancyId } = request.validatedData;
    const candidateId = request.loggedUser.id;

    const foundLearner = await LearnersService.getVacancyLearnerByCandidateId(
      vacancyId,
      candidateId
    );

    if (foundLearner) {
      throw new DuplicatedInfoError(
        "This user was already registered as a learner for this vacancy"
      );
    }

    return nextMiddleware();
  }

  static async hasReachedLearnerAssociationLimit(
    request,
    response,
    nextMiddleware
  ) {
    const candidateId = request.loggedUser.id;
    const maxLearnerAssociationLimit = associationLimitsByEntity.learner;

    const learnerAssociatedWithOpenProjects =
      await LearnersService.getLearnerCountByCandidateId(candidateId);

    if (
      learnerAssociatedWithOpenProjects.quantity == maxLearnerAssociationLimit
    ) {
      throw new AssociationLimitReachedError(
        `The user has already reached the limit of ${maxLearnerAssociationLimit} subscriptions as a learner that he is able to join simultaneously in open projects`
      );
    }

    return nextMiddleware();
  }
}

module.exports = { LearnersMiddlewares };
