const { StatusCodes } = require("http-status-codes");
const { ProjectsService } = require("../../services");

class ProjectsController {
  static async create(request, response) {
    const { validatedData } = request;
    validatedData.createdById = request.loggedUser.id;

    const createdProject = await ProjectsService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdProject);
  }

  static async getAll(request, response) {
    const { page, quantity } = request.query;
    const allProjects = await ProjectsService.getAll({ page, quantity });
    return response.status(StatusCodes.OK).json(allProjects);
  }

  static async getById(request, response) {
    const id = request.params.id;

    const foundProject = await ProjectsService.getById(id);

    return response.status(StatusCodes.OK).json(foundProject);
  }

  static async getUserProjects(request, response) {
    const createdById = request.params.createdById;
    const { page, quantity } = request.query;

    const userProjects = await ProjectsService.getUserProjects(createdById, {
      page,
      quantity,
    });

    return response.status(StatusCodes.OK).json(userProjects);
  }

  static async getProjectsByFilter(request, response) {
    const value = request.params.value;
    const { page, quantity } = request.query;

    const foundProjects = await ProjectsService.getProjectsByFilter(value, {
      page,
      quantity,
    });

    return response.status(StatusCodes.OK).json(foundProjects);
  }

  static async getProjectsWithOpenVacancySubscriptions(request, response) {
    const { page, quantity } = request.query;
    const openProjects =
      await ProjectsService.getProjectsWithOpenVacancySubscriptions({
        page,
        quantity,
      });

    return response.status(StatusCodes.OK).json(openProjects);
  }

  static async getProjectsByMemberSelectionMethod(request, response) {
    const { page, quantity } = request.query;
    const memberSelectionMethod = request.params.selectionMethod;

    const foundProjects =
      await ProjectsService.getProjectsByMemberSelectionMethod(
        memberSelectionMethod,
        {
          page,
          quantity,
        }
      );

    return response.status(StatusCodes.OK).json(foundProjects);
  }

  static async getUnfinishedProjects(request, response) {
    const { page, quantity } = request.query;
    const foundProjects = await ProjectsService.getUnfinishedProjects({
      page,
      quantity,
    });

    return response.status(StatusCodes.OK).json(foundProjects);
  }

  static async update(request, response) {
    const { validatedData } = request;
    const id = request.params.id;

    const updatedProject = await ProjectsService.update(id, validatedData);

    return response.status(StatusCodes.OK).json(updatedProject);
  }

  static async delete(request, response) {
    const id = request.params.id;

    await ProjectsService.delete(id);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { ProjectsController };
