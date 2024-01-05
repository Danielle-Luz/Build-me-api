const { StatusCodes } = require("http-status-codes");
const { VotationsService } = require("../../services");

class VotationsController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdVotation = await VotationsService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdVotation);
  }

  static async getVotationsByProject(request, response) {
    const { projectId } = request.params;
    const foundVotations = await VotationsService.getVotationsByProject(
      projectId
    );

    return response.status(StatusCodes.OK).json(foundVotations);
  }

  static async update(request, response) {
    const { validatedData } = request;
    const { votationId } = request.params;

    const updatedVotation = await VotationsService.update(
      votationId,
      validatedData
    );

    return response.status(StatusCodes.OK).json(updatedVotation);
  }

  static async delete(request, response) {
    const { votationId } = request.params;

    await VotationsService.delete(votationId);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { VotationsController };
