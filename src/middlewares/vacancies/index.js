const { CloseDateError, RecordNotFoundError } = require("../../errors");
const {
  ProjectsService,
  VacanciesService,
  UsersService,
} = require("../../services");
const { UtilsMiddlewares } = require("../utils");

class VacanciesMiddlewares {
  static async hasPermissionOnRoute(request, response, nextMiddleware) {
    let relatedProjectId;

    if (request.method == "POST") {
      relatedProjectId = request.validatedData.projectId;
    } else {
      const vacancyId = request.params.id;
      const foundVacancy = await VacanciesService.getVacancyById(vacancyId);
      relatedProjectId = foundVacancy.projectId;
    }

    const relatedProject = await ProjectsService.getById(relatedProjectId);
    const projectCreatorId = relatedProject.createdById;

    return UtilsMiddlewares.hasPermissionOnRoute(
      request,
      response,
      nextMiddleware,
      projectCreatorId
    );
  }

  static async isRelatedProjectAlreadyClosed(
    request,
    response,
    nextMiddleware
  ) {
    const projectId = request.validatedData.projectId;
    const relatedProject = await ProjectsService.getById(projectId);

    const actualDate = new Date();
    const projectCloseDate = new Date(relatedProject.closeDate);

    if (projectCloseDate < actualDate) {
      const errorMessage =
        "It's not possible to associate a vacancy with a project that has already been closed";
      throw new CloseDateError(errorMessage);
    }

    return nextMiddleware();
  }

  static async doesCandidateExists(request, response, nextMiddleware) {
    const chosenCandidateId = request.validatedData.chosenCandidateId;

    if (chosenCandidateId) {
      try {
        await UsersService.getById(chosenCandidateId);
      } catch {
        throw new RecordNotFoundError(
          "No user with the informed candidate id was found"
        );
      }
    }

    return nextMiddleware();
  }

  static async doesProjectExists(request, response, nextMiddleware) {
    const projectId = request.validatedData.projectId;
    
    await ProjectsService.getById(projectId);

    return nextMiddleware();
  }
}

module.exports = { VacanciesMiddlewares };
