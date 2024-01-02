const { StatusCodes } = require("http-status-codes");
const { AnswersService } = require("../../services");

class AnswersController {
  static async create(request, response) {
    const { validatedData } = request;

    const createdAnswer = await AnswersService.create(validatedData);

    return response.status(StatusCodes.CREATED).json(createdAnswer);
  }

  static async getAnswersByQuestionId(request, response) {
    const questionId = request.params.questionId;

    const answers = await AnswersService.getAnswersByQuestionId(questionId);

    return response.status(StatusCodes.OK).json(answers);
  }

  static async getAnswerById(request, response) {
    const id = request.params.id;

    const foundAnswer = await AnswersService.getAnswerById(id);

    return response.status(StatusCodes.OK).json(foundAnswer);
  }

  static async update(request, response) {
    const { validatedData } = request;
    const id = request.params.id;

    const updatedAnswer = await AnswersService.update(id, validatedData);

    return response.status(StatusCodes.OK).json(updatedAnswer);
  }

  static async delete(request, response) {
    const id = request.params.id;

    await AnswersService.delete(id);

    return response.status(StatusCodes.NO_CONTENT).json();
  }
}

module.exports = { AnswersController };
