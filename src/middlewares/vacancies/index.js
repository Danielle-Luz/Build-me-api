const { StatusCodes } = require("http-status-codes");
const {
  associationLimitsByEntity,
  projectStatus,
} = require("../../enumValues");
const {
  CloseDateError,
  RecordNotFoundError,
  AssociationLimitReachedError,
  DuplicatedInfoError,
  AppError,
  NoPermissionError,
} = require("../../errors");
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
      request.foundVacancy = foundVacancy;
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

  static async areRelatedProjectVacancySubscriptionsClosed(
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
        "It's not possible to associate a vacancy to a project if its vacancy subscriptions date limit was reached";
      throw new CloseDateError(errorMessage);
    }

    return nextMiddleware();
  }

  static async isRelatedProjectFinished(request, response, nextMiddleware) {
    const vacancyId = request.params.id;
    const foundVacancy = await VacanciesService.getVacancyById(vacancyId);
    const projectId = foundVacancy.projectId;
    request.foundVacancy = foundVacancy;

    const relatedProject = await ProjectsService.getById(projectId);
    const hasProjectStarted = relatedProject.status != projectStatus[0];

    if (hasProjectStarted) {
      const errorMessage =
        "It's not possible to modify a vacancy from a project that has already started";
      throw new CloseDateError(errorMessage);
    }

    return nextMiddleware();
  }

  static async doesCandidateExists(request, response, nextMiddleware) {
    const isCreatingVacancy = request.method == "POST";
    let chosenCandidateId;

    if (isCreatingVacancy) {
      chosenCandidateId = request.validatedData.chosenCandidateId;
    } else {
      chosenCandidateId = request.params.userId;
    }

    if (chosenCandidateId != undefined) {
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
    const isCreatingVacancy = request.method == "POST";
    let projectId;

    if (isCreatingVacancy) {
      projectId = request.validatedData.projectId;
    } else {
      projectId = request.params.projectId;
    }

    await ProjectsService.getById(projectId);

    return nextMiddleware();
  }

  static async hasReachedOpenProjectVacancyLimit(
    request,
    response,
    nextMiddleware
  ) {
    const { chosenCandidateId } = request.validatedData;
    const maxVacancyAssociationLimit = associationLimitsByEntity.vacancy;

    if (!chosenCandidateId) {
      return nextMiddleware();
    }

    const openProjectVacanciesRelatedToUser =
      await VacanciesService.getVacanciesFromOpenProjectsRelatedToUser(
        chosenCandidateId
      );

    if (
      openProjectVacanciesRelatedToUser.quantity >= maxVacancyAssociationLimit
    ) {
      throw new AssociationLimitReachedError(
        `The user has already reached the limit of ${maxVacancyAssociationLimit} open projects that he can join simultaneously`
      );
    }

    return nextMiddleware();
  }

  static isNewChosenCandidateEqualToPrevious(
    request,
    response,
    nextMiddleware
  ) {
    const { chosenCandidateId } = request.validatedData;

    const isNewChosenCandidateEqualToPrevious =
      chosenCandidateId == request.foundVacancy.chosenCandidateId;

    if (chosenCandidateId && isNewChosenCandidateEqualToPrevious) {
      throw new DuplicatedInfoError(
        "The new chosen candidate is the same as the old one"
      );
    }

    return nextMiddleware();
  }

  static doesVacancyHasChosenCandidate(request, response, nextMiddleware) {
    const { foundVacancy } = request;

    if (foundVacancy.chosenCandidateId != null) {
      throw new AppError(
        "It's not possible to delete the vacancy because it is already associated with a chosen user",
        StatusCodes.CONFLICT
      );
    }

    return nextMiddleware();
  }

  static async isLoggedUserEqualToChosenCandidate(
    request,
    response,
    nextMiddleware
  ) {
    const loggedUserId = request.loggedUser.id;
    const areUsersDifferent =
      loggedUserId != request.foundVacancy.chosenCandidateId;

    if (areUsersDifferent) {
      throw new NoPermissionError(
        "Only the chosen user can give up from the associated vacancy"
      );
    }

    return nextMiddleware();
  }
}

module.exports = { VacanciesMiddlewares };
