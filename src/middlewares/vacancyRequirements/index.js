const { DuplicatedInfoError } = require("../../errors");
const {
  VacanciesService,
  TechnologiesService,
  ProjectsService,
  VacancyRequirementsService,
} = require("../../services");
const { UtilsMiddlewares } = require("../utils");

class VacancyRequirementsMiddlewares {
  static async hasPermissionOnRoute(request, response, nextMiddleware) {
    let relatedVacancyId;

    if (request.method == "POST") {
      relatedVacancyId = request.validatedData.vacancyId;
    } else {
      const vacancyRequirementId = request.params.id;
      const vacancyRequirement =
        await VacancyRequirementsService.getVacancyRequirementById(
          vacancyRequirementId
        );
      relatedVacancyId = vacancyRequirement.vacancyId;
    }

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
    const isGettingVacancyRequirement = request.method == "GET";
    let vacancyId;

    if (isGettingVacancyRequirement) {
      vacancyId = request.params.vacancyId;
    } else {
      vacancyId = request.validatedData.vacancyId;
    }

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

  static async isTechnologyAlreadyRelatedToVacancy(
    request,
    response,
    nextMiddleware
  ) {
    let relatedVacancyId;
    const relatedTechnologyId = request.validatedData.technologyId;

    if (!relatedTechnologyId) return nextMiddleware();

    if (request.method == "PATCH") {
      const vacancyRequirement =
        await VacancyRequirementsService.getVacancyRequirementById(
          request.params.id
        );
      relatedVacancyId = vacancyRequirement.vacancyId;
    } else {
      relatedVacancyId = request.validatedData.vacancyId;
    }

    const vacancyRequirements =
      await VacancyRequirementsService.getVacancyRequirementsByVacancyId(
        relatedVacancyId
      );

    const foundVacancyRequirementWithTechnology = vacancyRequirements.find(
      (requirement) => requirement.technologyId == relatedTechnologyId
    );

    if (foundVacancyRequirementWithTechnology) {
      throw new DuplicatedInfoError(
        "This technology is already related with the provided vacancy"
      );
    }

    return nextMiddleware();
  }
}

module.exports = { VacancyRequirementsMiddlewares };
