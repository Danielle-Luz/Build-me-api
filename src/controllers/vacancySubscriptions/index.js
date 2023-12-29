const { StatusCodes } = require("http-status-codes");
const { VacancySubscriptionsService } = require("../../services");

class VacancySubscriptionsController {
  static async create(request, response) {
    const { validatedData } = request;

    const newVacancySubscription = await VacancySubscriptionsService.create(
      validatedData
    );

    return response.status(StatusCodes.CREATED).json(newVacancySubscription);
  }

  static async getAllByVacancyId(request, response) {
    const { vacancyId } = request.params;

    const vacancySubscriptions =
      await VacancySubscriptionsService.getAllByVacancyId(vacancyId);

    return response.status(StatusCodes.OK).json(vacancySubscriptions);
  }

  static async getByUserId(request, response) {
    const { userId } = request.params;

    const userSubscriptions = await VacancySubscriptionsService.getByUserId(
      userId
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
