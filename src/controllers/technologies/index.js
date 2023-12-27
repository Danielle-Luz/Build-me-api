const { StatusCodes } = require("http-status-codes");
const { TechnologiesService } = require("../../services");

class TechnologiesController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdTechnology = await TechnologiesService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdTechnology);
  }

  static async getAll(request, response) {
    const allTechnologies = await TechnologiesService.getAll();
    return response.status(StatusCodes.OK).json(allTechnologies);
  }

  static async getById(request, response) {
    const id = request.params.id;

    const foundTechnology = await TechnologiesService.getById(id);

    return response.status(StatusCodes.OK).json(foundTechnology);
  }

  static async update(request, response) {
    const { validatedData } = request;
    const id = request.params.id;

    const updatedTechnology = await TechnologiesService.update(
      id,
      validatedData
    );

    return response.status(StatusCodes.OK).json(updatedTechnology);
  }

  static async delete(request, response) {
    const id = request.params.id;

    await TechnologiesService.delete(id);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { TechnologiesController };
