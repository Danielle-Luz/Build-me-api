const { VacancySubscriptionsService } = require("../../services");
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
      userId = vacancySubscription.userId.id;
    }

    return await UtilsMiddlewares.hasPermissionOnRoute(
      request,
      response,
      nextMiddleware,
      userId
    );
  }
}

module.exports = { VacancySubscriptionsMiddlewares };
