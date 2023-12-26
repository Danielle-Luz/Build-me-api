const { CloseDateError } = require("../../errors");
const { ProjectsService } = require("../../services");

class VacanciesMiddlewares {
  static async isRelatedProjectAlreadyClosed(
    request,
    response,
    nextMiddleware
  ) {
    const projectId = request.validatedData.projectId;
    const relatedProject = await ProjectsService.getProjectById(projectId);

    const actualDate = new Date();
    const projectCloseDate = new Date(relatedProject.closeDate);

    if (projectCloseDate < actualDate) {
      const errorMessage =
        "It's not possible to associate a vacancy with a project that has already been closed";
      throw new CloseDateError(errorMessage);
    }

    return nextMiddleware();
  }
}

module.exports = { VacanciesMiddlewares };
