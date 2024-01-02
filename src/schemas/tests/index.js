const z = require("zod");
const { TestsMiddlewares } = require("../../middlewares");

const newTestAnswers = z.array(
  z
    .object({
      questionId: z.number().int().positive(),
      answerId: z.number().int().positive(),
    })
    .refine(TestsMiddlewares.validateQuestionId, {
      message: "No question with the informed id was found",
    })
    .refine(TestsMiddlewares.validateAnswerId, {
      message: "No answer with the informed id was found",
    })
);

module.exports = { newTestAnswers };
