const { StatusCodes } = require("http-status-codes");
const {
  VacancyRequirementsService,
} = require("../../services/vacancyRequirements");

class VacancyRequirementsController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdVacancyRequirement = await VacancyRequirementsService.create(
      validatedData
    );

    return response.status(StatusCodes.CREATED).json(createdVacancyRequirement);
  }

  static async getVacancyRequirementsByVacancyId(request, response) {
    const vacancyId = request.params.vacancyId;

    const foundVacancyRequirements =
      await VacancyRequirementsService.getVacancyRequirementsByVacancyId(
        vacancyId
      );

    return response.status(StatusCodes.OK).json(foundVacancyRequirements);
  }

  static async getVacancyRequirementById(request, response) {
    const id = request.params.id;

    const foundVacancyRequirement =
      await VacancyRequirementsService.getVacancyRequirementById(id);

    return response.status(StatusCodes.OK).json(foundVacancyRequirement);
  }

  static async update(request, response) {
    const { validatedData } = request;
    const id = request.params.id;

    const updatedVacancyRequirement = await VacancyRequirementsService.update(
      id,
      validatedData
    );

    return response.status(StatusCodes.OK).json(updatedVacancyRequirement);
  }

  static async delete(request, response) {
    const id = request.params.id;

    await VacancyRequirementsService.delete(id);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { VacancyRequirementsController };
