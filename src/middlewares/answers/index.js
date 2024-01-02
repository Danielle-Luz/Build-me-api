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

  static async doesQuestionsAlreadyHaveRightAnswer(
    request,
    response,
    nextMiddleware
  ) {
    let answerData = request.validatedData;
    const isUpdating = request.method == "PATCH";

    if (isUpdating) {
      answerData = await AnswersService.getAnswerById(request.params.id);
    }

    const { questionId, isRight } = answerData;

    if (questionId && isRight) {
      const existentRightAnswer =
        await AnswersService.getRightAnswerByQuestionId(questionId);

      if (existentRightAnswer)
        throw new DuplicatedInfoError(
          "This questions already has a right answer"
        );
    }

    return nextMiddleware();
  }
}

module.exports = { AnswersMiddlewares };
