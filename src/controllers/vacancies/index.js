const { StatusCodes } = require("http-status-codes");
const { VacanciesService } = require("../../services");

class VacanciesController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdVacancy = await VacanciesService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdVacancy);
  }

  static async getAll(request, response) {
    const allVacancies = await VacanciesService.getAll();
    return response.status(StatusCodes.OK).json(allVacancies);
  }

  static async getProjectVacancies(request, response) {
    const projectId = request.params.projectId;

    const projectVacancies = await VacanciesService.getProjectVacancies(
      projectId
    );

    return response.status(StatusCodes.OK).json(projectVacancies);
  }

  static async getProjectVacanciesWithoutCandidate(request, response) {
    const projectId = request.params.projectId;

    const projectVacancies =
      await VacanciesService.getProjectVacanciesWithoutCandidate(projectId);

    return response.status(StatusCodes.OK).json(projectVacancies);
  }

  static async getOpenProjectsUnrelatedVacancies(request, response) {
    const projectVacancies =
      await VacanciesService.getOpenProjectsUnrelatedVacancies();
    return response.status(StatusCodes.OK).json(projectVacancies);
  }

  static async getVacancyById(request, response) {
    const id = request.params.id;

    const foundVacancy = await VacanciesService.getVacancyById(id);

    return response.status(StatusCodes.OK).json(foundVacancy);
  }

  static async getVacanciesRelatedToUser(request, response) {
    const userId = request.params.userId;

    const vacanciesRelatedToUser =
      await VacanciesService.getVacanciesRelatedToUser(userId);

    return response.status(StatusCodes.OK).json(vacanciesRelatedToUser);
  }

  static async getVacanciesMatchingUserSkillsForProject(request, response) {
    const { projectId, userId } = request.params;

    const foundMathingVacancies =
      await VacanciesService.getVacanciesMatchingUserSkillsForProject(
        projectId,
        userId
      );

    return response.status(StatusCodes.OK).json(foundMathingVacancies);
  }

  static async getAllVacanciesMatchingUserSkills(request, response) {
    const { userId } = request.params;

    const foundMathingVacancies =
      await VacanciesService.getAllVacanciesMatchingUserSkills(userId);

    return response.status(StatusCodes.OK).json(foundMathingVacancies);
  }

  static async update(request, response) {
    const { validatedData } = request;
    const id = request.params.id;

    const updatedVacancy = await VacanciesService.update(id, validatedData);

    return response.status(StatusCodes.OK).json(updatedVacancy);
  }

  static async giveUpFromVacancy(request, response) {
    const { id } = request.params;

    const updatedData = { chosenCandidateId: null };
    const updatedVacancy = await VacanciesService.update(id, updatedData);

    return response.status(StatusCodes.OK).json(updatedVacancy);
  }

  static async delete(request, response) {
    const id = request.params.id;

    await VacanciesService.delete(id);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { VacanciesController };
