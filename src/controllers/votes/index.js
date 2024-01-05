const { StatusCodes } = require("http-status-codes");
const { VotesService } = require("../../services");

class VotesController {
  static async create(request, response) {
    const { validatedData } = request;
    const { projectId } = request.foundVacancy;

    validatedData.voterId = request.loggedUser.id;

    const createdVote = await VotesService.create(validatedData, projectId);

    return response.status(StatusCodes.CREATED).json(createdVote);
  }

  static async getUserVote(request, response) {
    const { votationId } = request.params;
    const voterId = request.loggedUser.id;
    const foundVote = await VotesService.getUserVote(voterId, votationId);

    return response.status(StatusCodes.OK).json(foundVote);
  }

  static async delete(request, response) {
    const { voteId } = request.params;

    await VotesService.delete(voteId);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { VotesController };
