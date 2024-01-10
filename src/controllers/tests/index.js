const { StatusCodes } = require("http-status-codes");
const { TestsService } = require("../../services");

class TestsController {
  static async evaluateAnswersAndGetTestScore(request, response) {
    const { validatedData } = request;
    const loggedUserId = request.loggedUser.id;

    const evaluatedAnswers = await TestsService.checkTestAnswers(
      validatedData,
      loggedUserId
    );

    return response.status(StatusCodes.OK).json(evaluatedAnswers);
  }

  static async getTestById(request, response) {
    const id = request.params.id;

    const foundTest = await TestsService.getTestById(id);

    return response.status(StatusCodes.OK).json(foundTest);
  }

  static async getTestsByTechnologyId(request, response) {
    const technologyId = request.params.technologyId;

    const testsByTechnology = await TestsService.getTestsByTechnologyId(
      technologyId
    );

    return response.status(StatusCodes.OK).json(testsByTechnology);
  }

  static async getTestsByUser(request, response) {
    const userId = request.params.userId;

    const testsByUser = await TestsService.getTestsByUser(userId);

    return response.status(StatusCodes.OK).json(testsByUser);
  }

  static async getTestsByUserAndTechnology(request, response) {
    const { userId, technologyId } = request.params;

    const testByUserAndTechnology =
      await TestsService.getTestsByUserAndTechnology(userId, technologyId);

    return response.status(StatusCodes.OK).json(testByUserAndTechnology);
  }
}

module.exports = { TestsController };
