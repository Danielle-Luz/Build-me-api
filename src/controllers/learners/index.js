const { StatusCodes } = require("http-status-codes");
const { LearnersService } = require("../../services");

class LearnersController {
  static async create(request, response) {
    const { validatedData } = request;
    validatedData.candidateId = request.loggedUser.id;

    const createdLearner = await LearnersService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdLearner);
  }

  static async getAll(request, response) {
    const allLearners = await LearnersService.getAll();
    return response.status(StatusCodes.OK).json(allLearners);
  }

  static async getById(request, response) {
    const id = request.params.id;

    const foundLearner = await LearnersService.getById(id);

    return response.status(StatusCodes.OK).json(foundLearner);
  }

  static async getLearnersByVacancyId(request, response) {
    const { vacancyId } = request.params;

    const foundLearners = await LearnersService.getLearnersByVacancyId(
      vacancyId
    );

    return response.status(StatusCodes.OK).json(foundLearners);
  }

  static async getLearnersByCandidateId(request, response) {
    const { candidateId } = request.params;

    const foundLearners = await LearnersService.getLearnersByCandidateId(
      candidateId
    );

    return response.status(StatusCodes.OK).json(foundLearners);
  }

  static async delete(request, response) {
    const id = request.params.id;

    await LearnersService.delete(id);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { LearnersController };
