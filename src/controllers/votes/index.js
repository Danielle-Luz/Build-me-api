const { StatusCodes } = require("http-status-codes");
const { VotesService } = require("../../services");

class VotesController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdVote = await VotesService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdVote);
  }
}

module.exports = { VotesController };
