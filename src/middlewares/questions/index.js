const { TechnologiesService, QuestionsService } = require("../../services");
const { UtilsMiddlewares } = require("../utils");

class QuestionsMiddlewares {
  static async hasPermissionOnRoute(request, response, nextMiddleware) {
    const loggedUserId = request.loggedUser.id;

    return await UtilsMiddlewares.hasPermissionOnRoute(
      request,
      response,
      nextMiddleware,
      loggedUserId
    );
  }

  static async doesTechnologyExists(request, response, nextMiddleware) {
    const isGettingUserSkill = request.method == "GET";
    let technologyId;

    if (isGettingUserSkill) {
      technologyId = request.params.technologyId;
    } else {
      technologyId = request.validatedData.technologyId;
    }

    if (technologyId) {
      await TechnologiesService.getById(technologyId);
    }

    return nextMiddleware();
  }

  static async validateQuestionId({ questionId }) {
    try {
      await QuestionsService.getQuestionById(questionId);
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = { QuestionsMiddlewares };
