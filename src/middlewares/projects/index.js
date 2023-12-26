const { StatusCodes } = require("http-status-codes");
const { AppError } = require("../../errors");
const { ProjectsService } = require("../../services");
const { UtilsMiddlewares } = require("../utils");

class ProjectsMiddlewares {
  static async hasPermissionOnRoute(request, response, nextMiddleware) {
    const projectId = request.params.id;
    const foundProject = await ProjectsService.getProjectById(projectId);

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
    const actualDate = new Date();

    if (closeDate < actualDate) {
      const errorMessage =
        "The close date should be later than or equal to the current date";
      throw new AppError(errorMessage, StatusCodes.UNPROCESSABLE_ENTITY);
    }

    return nextMiddleware();
  }
}

module.exports = { ProjectsMiddlewares };
