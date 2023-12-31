const { DuplicatedInfoError } = require("../../errors");
const { QuestionsService, AnswersService } = require("../../services");

class TestsMiddlewares {
  static async isQuestionDuplicated(request, response, nextMiddleware) {
    const questionsIds = [];
    const duplicatedQuestionsIds = [];

    request.validatedData.forEach(({ questionId }) => {
      const isQuestionIdDuplicated = questionsIds.includes(questionId);

      questionsIds.push(questionId);

      if (isQuestionIdDuplicated) {
        duplicatedQuestionsIds.push(questionId);
      }
    });

    if (duplicatedQuestionsIds.length > 0) {
      throw new DuplicatedInfoError(
        `The question(s) with id(s) ${duplicatedQuestionsIds.join(
          ", "
        )} were answered more than once`
      );
    }

    return nextMiddleware();
  }
}

module.exports = { TestsMiddlewares };
