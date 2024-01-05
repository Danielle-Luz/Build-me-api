const { NoPermissionError } = require("../../errors");
const {
  VacanciesService,
  ProjectsService,
  VotationsService,
} = require("../../services");

class VotationsMiddlewares {
  static async doesVacancyExist(request, response, nextMiddleware) {
    const isCreating = request.method == "POST";
    let vacancyId;

    if (isCreating) {
      vacancyId = request.validatedData.vacancyId;
    } else {
      vacancyId = request.params.vacancyId
        ? request.params.vacancyId
        : request.params.id;
    }

    if (vacancyId) {
      const foundVacancy = await VacanciesService.getVacancyById(vacancyId);
      request.foundVacancy = foundVacancy;
    }

    return nextMiddleware();
  }

  static async doesProjectExist(request, response, nextMiddleware) {
    const projectId = request.params.projectId;

    await ProjectsService.getById(projectId);

    return nextMiddleware();
  }

  static async isVotationCreatorEqualToProjectOwner(
    request,
    response,
    nextMiddleware
  ) {
    const isCreating = request.method == "POST";
    let vacancyId;

    if (isCreating) {
      vacancyId = request.validatedData.vacancyId;
    } else {
      const { votationId } = request.params;
      const foundVotation = await VotationsService.getVotationById(votationId);
      vacancyId = foundVotation.vacancyId;
    }

    const foundProject = await VacanciesService.getVacancyProjectOwnerId(
      vacancyId
    );
    console.log("\nproject", foundProject);
    const projectOwnerId = foundProject.createdById;

    const isVotationCreatorEqualToProjectOwner =
      projectOwnerId == request.loggedUser.id;

    if (!isVotationCreatorEqualToProjectOwner) {
      throw new NoPermissionError(
        "Only the project creator can create a new votation"
      );
    }

    return nextMiddleware();
  }

  static async isVacancyProjectMember(request, response, nextMiddleware) {
    const voterId = request.loggedUser.id;
    const projectId = request.params.projectId;

    const projectMember = await VacanciesService.getProjectColleagues(
      projectId,
      [voterId]
    );

    const isProjectMember = projectMember.length > 0;

    if (!isProjectMember) {
      throw new NoPermissionError(
        "Only project members can see the open votations"
      );
    }

    return nextMiddleware();
  }
}

module.exports = { VotationsMiddlewares };
