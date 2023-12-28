const {
  VacanciesService,
  TechnologiesService,
  ProjectsService,
  VacancyRequirementsService,
} = require("../../services");
const { UtilsMiddlewares } = require("../utils");

class VacancyRequirementsMiddlewares {
  static async hasPermissionOnRoute(request, response, nextMiddleware) {
    const relatedVacancyId =
      request.method == "POST"
        ? request.validatedData.vacancyId
        : request.params.id;

    const vacancyRequirement =
      await VacancyRequirementsService.getVacancyRequirementById(
        relatedVacancyId
      );

    const relatedVacancy = await VacanciesService.getVacancyById(
      vacancyRequirement.vacancyId
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

    if (vacancyId) {
      await VacanciesService.getVacancyById(vacancyId);
    }

    return nextMiddleware();
  }

  static async doesTechnologyExists(request, response, nextMiddleware) {
    const technologyId = request.validatedData.technologyId;

    if (technologyId) {
      await TechnologiesService.getById(technologyId);
    }

    return nextMiddleware();
  }
}

module.exports = { VacancyRequirementsMiddlewares };
