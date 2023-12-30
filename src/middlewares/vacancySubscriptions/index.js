const { StatusCodes } = require("http-status-codes");
const { AppError, DuplicatedInfoError } = require("../../errors");
const {
  VacancySubscriptionsService,
  VacanciesService,
  UsersService,
  VacancyRequirementsService,
} = require("../../services");
const { UtilsMiddlewares } = require("../utils");

class VacancySubscriptionsMiddlewares {
  static async hasPermissionOnRoute(request, response, nextMiddleware) {
    const isCreatingVacancySubscription = request.method == "POST";
    let userId = request.loggedUser.id;

    if (!isCreatingVacancySubscription) {
      const vacancySubscriptionId = request.params.id;
      const vacancySubscription = await VacancySubscriptionsService.getById(
        vacancySubscriptionId
      );
      userId = vacancySubscription.userId;
    }

    return await UtilsMiddlewares.hasPermissionOnRoute(
      request,
      response,
      nextMiddleware,
      userId
    );
  }

  static async doesVacancyExists(request, response, nextMiddleware) {
    const isCreatingVacancySubscription = request.method == "POST";
    let vacancyId;

    if (isCreatingVacancySubscription) {
      vacancyId = request.validatedData.vacancyId;
    } else {
      vacancyId = request.params.vacancyId;
    }

    const subscribedVacancy = await VacanciesService.getVacancyById(vacancyId);
    request.subscribedVacancy = subscribedVacancy;

    return nextMiddleware();
  }

  static async doesUserExists(request, response, nextMiddleware) {
    const { userId } = request.params;

    await UsersService.getById(userId);

    return nextMiddleware();
  }

  static async doesUserMeetVacationRequirements(
    request,
    response,
    nextMiddleware
  ) {
    const { vacancyId } = request.validatedData;
    const userId = request.loggedUser.id;

    const requirementsStatus =
      await VacancyRequirementsService.getRequirementsFulfillmentStatus(
        vacancyId,
        userId
      );

    if (requirementsStatus?.unmetRequirementsCount > 0) {
      throw new AppError(
        "The user can't apply to this vacancy because he doesn't meet the vacancy's requirements",
        StatusCodes.UNPROCESSABLE_ENTITY
      );
    }

    return nextMiddleware();
  }

  static async wasSubscriptionAlreadyDone(request, response, nextMiddleware) {
    const { vacancyId } = request.validatedData;
    const loggedUserId = request.loggedUser.id;

    const submittedSubscription =
      await VacancySubscriptionsService.getUserVacancySubscription(
        vacancyId,
        loggedUserId
      );

    if (submittedSubscription) {
      throw new DuplicatedInfoError(
        "This user already created a subscription to this vacancy"
      );
    }

    return nextMiddleware();
  }

  static async hasVacancyChosenCandidate(request, response, nextMiddleware) {
    const { subscribedVacancy } = request;

    const hasChosenCandidate = subscribedVacancy.chosenCandidateId != null;

    if (hasChosenCandidate) {
      throw new DuplicatedInfoError(
        "Vacancy is already assigned to a candidate"
      );
    }

    return nextMiddleware();
  }
}

module.exports = { VacancySubscriptionsMiddlewares };
