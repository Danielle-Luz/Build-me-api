const { ResourcesService } = require("../../services/index");
const { StatusCodes } = require("http-status-codes");

class ResourcesController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdResource = await ResourcesService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdResource);
  }

  static async getAll(request, response) {
    const allResources = await ResourcesService.getAll();
    return response.status(StatusCodes.OK).json(allResources);
  }
}

module.exports = { ResourcesController };
