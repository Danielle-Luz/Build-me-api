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
    const { page, quantity } = request.query;
    const projectVacancies =
      await VacanciesService.getOpenProjectsUnrelatedVacancies({
        page,
        quantity,
      });
      
    return response.status(StatusCodes.OK).json(projectVacancies);
  }

  static async getVacancyById(request, response) {
    const id = request.params.id;

    const foundVacancy = await VacanciesService.getVacancyById(id);

    return response.status(StatusCodes.OK).json(foundVacancy);
  }

  static async getVacanciesRelatedToUser(request, response) {
    const { page, quantity } = request.query;
    const userId = request.params.userId;

    const vacanciesRelatedToUser =
      await VacanciesService.getVacanciesRelatedToUser(userId, {
        page,
        quantity,
      });

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
    const { page, quantity } = request.query;

    const foundMathingVacancies =
      await VacanciesService.getAllVacanciesMatchingUserSkills(userId, {
        page,
        quantity,
      });

    return response.status(StatusCodes.OK).json(foundMathingVacancies);
  }

  static async isUserInProjectVacancy(request, response) {
    const loggedUserId = request.loggedUser.id;
    const projectId = request.params.projectId;

    const isUserInProjectVacancy =
      await VacanciesService.isUserInProjectVacancy(loggedUserId, projectId);

    return response
      .status(StatusCodes.OK)
      .json({ isProjectMember: isUserInProjectVacancy });
  }

  static async update(request, response) {
    const { validatedData } = request;
    const id = request.params.id;

    const updatedVacancy = await VacanciesService.update(id, validatedData);

    return response.status(StatusCodes.OK).json(updatedVacancy);
  }

  static async giveUpFromVacancy(request, response) {
    const { id: vacancyId } = request.params;
    const loggedUserId = request.loggedUser.id;

    const updatedVacancy = await VacanciesService.giveUpFromVacancy(
      vacancyId,
      loggedUserId
    );

    return response.status(StatusCodes.OK).json(updatedVacancy);
  }

  static async delete(request, response) {
    const id = request.params.id;

    await VacanciesService.delete(id);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { VacanciesController };
