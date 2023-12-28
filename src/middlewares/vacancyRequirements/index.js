const {
  VacanciesService,
  TechnologiesService,
  ProjectsService,
} = require("../../services");

class VacancyRequirementsMiddlewares {
  static async hasPermissionOnRoute(request, response, nextMiddleware) {
    const relatedVacancyId =
      request.method == "POST"
        ? request.validatedData.vacancyId
        : request.params.id;

    const relatedVacancy = await VacanciesService.getVacancyById(
      relatedVacancyId
    );
    const relatedProject = await ProjectsService.getById(
      relatedVacancy.projectId
    );
    const projectCreatorId = relatedProject.createdById;

    return UtilsMiddlewares.hasPermissionOnRoute(
      request,
      response,
      nextMiddleware,
      projectCreatorId
    );
  }

  static async doesVacancyExists(request, response, nextMiddleware) {
    const vacancyId = request.validatedData.vacancyId;

    await VacanciesService.getVacancyById(vacancyId);

    return nextMiddleware();
  }

  static async doesTechnologyExists(request, response, nextMiddleware) {
    const technologyId = request.validatedData.technologyId;

    await TechnologiesService.getById(technologyId);

    return nextMiddleware();
  }
}

module.exports = { VacancyRequirementsMiddlewares };
