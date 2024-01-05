const { DuplicatedInfoError } = require("../../errors");
const { QuestionsService, AnswersService } = require("../../services");
const { UtilsMiddlewares } = require("../utils");

class AnswersMiddlewares {
  static async hasPermissionOnRoute(request, response, nextMiddleware) {
    const loggedUserId = request.loggedUser.id;

    return await UtilsMiddlewares.hasPermissionOnRoute(
      request,
      response,
      nextMiddleware,
      loggedUserId
    );
  }

  static async doesQuestionExists(request, response, nextMiddleware) {
    const isGettingQuestion = request.method == "GET";
    let questionId;

    if (isGettingQuestion) {
      questionId = request.params.questionId;
    } else {
      questionId = request.validatedData.questionId;
    }

    if (questionId) {
      await QuestionsService.getQuestionById(questionId);
    }

    return nextMiddleware();
  }

  static async doesSingleQuestionAlreadyHaveRightAnswer(
    request,
    response,
    nextMiddleware
  ) {
    const { isRight } = request.validatedData;

    if (isRight) {
      const { questionId } = await AnswersService.getAnswerById(
        request.params.id
      );

      const existentRightAnswer =
        await AnswersService.getRightAnswerByQuestionId(questionId);

      if (existentRightAnswer)
        throw new DuplicatedInfoError(
          "This questions already has a right answer"
        );
    }

    return nextMiddleware();
  }

  static async doesVariousQuestionsAlreadyHaveRightAnswer({
    questionId,
    isRight,
  }) {
    const existentRightAnswer = await AnswersService.getRightAnswerByQuestionId(
      questionId
    );

    try {
      if (isRight && existentRightAnswer) {
        throw new DuplicatedInfoError(
          "This question already has a right answer"
        );
      }
      return true;
    } catch {
      return false;
    }
  }

  static async validateAnswerId({ answerId }) {
    try {
      await AnswersService.getAnswerById(answerId);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = { AnswersMiddlewares };
