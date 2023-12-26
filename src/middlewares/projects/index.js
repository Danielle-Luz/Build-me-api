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
}

module.exports = { ProjectsMiddlewares };
