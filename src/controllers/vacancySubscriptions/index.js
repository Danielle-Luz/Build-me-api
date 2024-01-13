const { StatusCodes } = require("http-status-codes");
const { VacancySubscriptionsService } = require("../../services");

class VacancySubscriptionsController {
  static async create(request, response) {
    const { validatedData } = request;
    validatedData.userId = request.loggedUser.id;

    const newVacancySubscription = await VacancySubscriptionsService.create(
      validatedData
    );

    return response.status(StatusCodes.CREATED).json(newVacancySubscription);
  }

  static async getByVacancyId(request, response) {
    const { vacancyId } = request.params;
    const { page, quantity } = request.query;

    const vacancySubscriptions =
      await VacancySubscriptionsService.getByVacancyId(vacancyId, {
        page,
        quantity,
      });

    return response.status(StatusCodes.OK).json(vacancySubscriptions);
  }

  static async getByUserId(request, response) {
    const { userId } = request.params;
    const { page, quantity } = request.query;

    const userSubscriptions = await VacancySubscriptionsService.getByUserId(
      userId,
      { page, quantity }
    );

    return response.status(StatusCodes.OK).json(userSubscriptions);
  }

  static async getById(request, response) {
    const { id } = request.params;

    const vacancySubscription = await VacancySubscriptionsService.getById(id);

    return response.status(StatusCodes.OK).json(vacancySubscription);
  }

  static async delete(request, response) {
    const { id } = request.params;

    await VacancySubscriptionsService.delete(id);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { VacancySubscriptionsController };
