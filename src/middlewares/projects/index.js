const { CloseDateError, InvalidParamValueError } = require("../../errors");
const { ProjectsService, UsersService } = require("../../services");
const { UtilsMiddlewares } = require("../utils");
const { memberSelectionMethod } = require("../../enumValues");

class ProjectsMiddlewares {
  static async hasPermissionOnRoute(request, response, nextMiddleware) {
    const projectId = request.params.id;
    const foundProject = await ProjectsService.getById(projectId);

    return await UtilsMiddlewares.hasPermissionOnRoute(
      request,
      response,
      nextMiddleware,
      foundProject.createdById
    );
  }

  static async isCloseDateGreaterThanActualDate(
    request,
    response,
    nextMiddleware
  ) {
    const { validatedData } = request;

    const closeDate = new Date(validatedData.closeDate);
    const actualDateWithTime = new Date();
    const actualDate = new Date(actualDateWithTime.toISOString().split("T")[0]);

    if (closeDate <= actualDate) {
      const errorMessage =
        "The close date should be later than or equal to the current date";
      throw new CloseDateError(errorMessage);
    }

    return nextMiddleware();
  }

  static async doesUserExists(request, response, nextMiddleware) {
    const createdById = request.params.createdById;

    await UsersService.getById(createdById);

    return nextMiddleware();
  }

  static async isSelectionMethodValid(request, response, nextMiddleware) {
    const { selectionMethod: searchedSelectionMethod } = request.params;
    const isSelectionMethodValid = memberSelectionMethod.includes(
      searchedSelectionMethod
    );

    if (!isSelectionMethodValid) {
      throw new InvalidParamValueError(
        `Member selection method not found, the values available are: ${memberSelectionMethod.join(
          ", "
        )}`
      );
    }

    return nextMiddleware();
  }
}

module.exports = { ProjectsMiddlewares };
