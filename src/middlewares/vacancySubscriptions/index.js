const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../../errors");
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

    await VacanciesService.getVacancyById(vacancyId);

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

    if (requirementsStatus.unmetRequirementsCount > 0) {
      throw new AppError(
        "The user can't apply to this vacancy because he doesn't meet the vacancy's requirements",
        StatusCodes.UNPROCESSABLE_ENTITY
      );
    }

    return nextMiddleware();
  }
}

module.exports = { VacancySubscriptionsMiddlewares };
