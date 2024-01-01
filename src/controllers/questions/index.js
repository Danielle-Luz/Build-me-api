const { StatusCodes } = require("http-status-codes");
const { QuestionsService } = require("../../services");

class QuestionsController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdQuestion = await QuestionsService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdQuestion);
  }

  static async getAllQuestions(request, response) {
    const allQuestions = await QuestionsService.getAllQuestions();
    return response.status(StatusCodes.OK).json(allQuestions);
  }

  static async getQuestionById(request, response) {
    const id = request.params.id;

    const foundQuestion = await QuestionsService.getQuestionById(id);

    return response.status(StatusCodes.OK).json(foundQuestion);
  }

  static async getQuestionsByTechnologyId(request, response) {
    const technologyId = request.params.technologyId;

    const questionsByTechnology =
      await QuestionsService.getQuestionsByTechnologyId(technologyId);

    return response.status(StatusCodes.OK).json(questionsByTechnology);
  }

  static async getRandomQuestionsByTechnologyId(request, response) {
    const technologyId = request.params.technologyId;

    const randomQuestionsByTechnology =
      await QuestionsService.getRandomQuestionsByTechnologyId(technologyId);

    return response.status(StatusCodes.OK).json(randomQuestionsByTechnology);
  }

  static async update(request, response) {
    const { validatedData } = request;
    const id = request.params.id;

    const updatedQuestion = await QuestionsService.update(id, validatedData);

    return response.status(StatusCodes.OK).json(updatedQuestion);
  }

  static async delete(request, response) {
    const id = request.params.id;

    await QuestionsService.delete(id);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { QuestionsController };
