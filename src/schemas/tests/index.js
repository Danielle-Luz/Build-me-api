const z = require("zod");
const {
  QuestionsMiddlewares,
  AnswersMiddlewares,
} = require("../../middlewares");

const newTestAnswers = z.array(
  z
    .object({
      questionId: z.number().int().positive(),
      answerId: z.number().int().positive(),
    })
    .refine(QuestionsMiddlewares.validateQuestionId, {
      message: "No question with the informed id was found",
    })
    .refine(AnswersMiddlewares.validateAnswerId, {
      message: "No answer with the informed id was found",
    })
);

module.exports = { newTestAnswers };
