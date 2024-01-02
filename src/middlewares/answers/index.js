const { QuestionsService } = require("../../services");
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
}

module.exports = { AnswersMiddlewares };
